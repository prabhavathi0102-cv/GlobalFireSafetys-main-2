import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(1).max(40),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(200).optional().default(""),
  product: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(2000),
});

const DEFAULT_TAB = "Enquiries";
const HEADERS = [
  "Submitted At",
  "Name",
  "Phone",
  "Email",
  "Company",
  "Product Interested",
  "Requirement",
];

// ---------- Google service-account auth (Web Crypto, edge-compatible) ----------

function base64UrlEncode(bytes: Uint8Array | string): string {
  const bin =
    typeof bytes === "string"
      ? bytes
      : Array.from(bytes)
          .map((b) => String.fromCharCode(b))
          .join("");
  // btoa is available in edge/worker/Vercel runtimes
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function pemToPkcs8(pem: string): ArrayBuffer {
  const cleaned = pem
    .replace(/\\n/g, "\n")
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const bin = atob(cleaned);
  const buf = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) buf[i] = bin.charCodeAt(i);
  return buf.buffer;
}

let cachedToken: { token: string; exp: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.token;

  const clientEmail = "lovable-service@sonorous-dragon-501510-a8.iam.gserviceaccount.com";
  const privateKeyPem = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDWZufRuygfT/JV\nsYRaxyccWa8cdI6KEwHfYXXf65cRtzOl5MdgfUBohBVsjAu5F76pjMzFIZtIuS4j\n7U18kxvFLg5k2ygZNx0Ig2wLHnrcOy5Jj5FsVqJofAbMO4Pv7eicZ6SKtWDYrU2c\n19Am+wzpNV2LOQcXBCek7WfOIyN+xBG+s6TwGuKaIpAzU4Seo+RtKB69I8ZG99ST\nC9daNUlbp/NC/KfdqZotN58fGka0y2oOsZhciPmSwoHFdWuTrF1azS0Fb+BvG8vv\nyTD5Y6EwD5VXgB6YxJxdTsns6Qn3dX703aNFezrk9AXmoE7KQvN3pOwGEgcCvztj\ndXVwBTMPAgMBAAECggEADW04AvOLBtxNVfN+JpHb5P5yz7/hi0u3GCOfgPcyfeVb\nV9NqGaSjth02GuxG8apHLOazONHVdSpE9Z1Z9xK0BaxQMh24DE2IxRc3MBe9DvH/\n1eh77W0cJ5nuHQ0fF+qYthlsKFRFLTHmhIt5WW+VtpG6espb+M4wTgz2ArvtmvW+\nt1LYbVicitzcSqnYebSSeazLF9LuD6Bk9OmsEkHnNwF4R5AzZJ0/X6xXWWk28uVy\ng9BDM/nzHK6xEyGQA4B4dO1kbfVuYM91aaSVAve8YI6iIVYQ2fMIIeN7e+kxaSHq\nLF7qXG66j5/csdtIW63V4h4kegdmDmzCTcaeMHJDKQKBgQDw1JGpuBxweV9pgGUK\neCbchEhnv9ijV4d6IzM+4X8PVpEzLQu7g7qToKKnNOItcaglG/lYQPnddRQMfvEz\nApyRgGvWhsLpbMsRlr3+zZZCzH7YTAtd1YEsNu0au7H0WqMVWPazkrR1LDXCSYus\n2YDXB2rMj2lXSiki/8R84iCStwKBgQDj6CypwS0kE64MVVa4DhNlmm4fWNFi6zXk\nRz3tAVuOE6Rd54ZDfb/UKju6cDqs21yRH6o0WGhGhexkN2RpJztmQolBvlFgXgHf\nB1z4oGCTEVKMdL6Kw+pPAJMlUUvghWEr2YYQGgClniUSCDj5Sh68Kh1/OwkdI4/H\n9DB4CSEqaQKBgENzFZTWJsjthWZz+liTTDcIqYq9NXySADSZ9TlQSJjQIvyVSirr\neu7r14JDEnGt2m0CR7SLBjAbIVFaoE0sFxO9RvafaamcucckU/QwOjxdL81+htRx\n/qqWe5O4K+AHHpPVBctHdFk415mhpYf0ptwSjLvcEqHK+Hh/79UWNA9DAoGAYMwM\npDDa9laxdqWMRnIcBOxZV1EG5aeW5RTpFU+dTjPDfOrH2MSBBCDH64CdOyuUHkM/\nrCncaA+bflkUeaDjFqSt3VFzCKYEz3A2KZccTXpvAB7ZiuB5FQLefFwSCRM9WT1z\nNkWE/tKzVfxODntPoIWWr6IoVcrz1248Y88k2fkCgYEAy9gOrIe7JCnFMGaSngM6\nPW8oObhA+BHvYhSj3eaJ+neRIRAYCGGmgBIb4xD/DvSBWN2JFRt4l/u/QxzIsiHI\nLbyIedNETBZ8q8IPZ+dc7sCQimN7e6v3lBikhEJWh3nPKQ+NZqAPN56osbt9DdQE\nhpPaNaorjnWa3i2ZZ55kpks=\n-----END PRIVATE KEY-----\n";
  if (!clientEmail || !privateKeyPem) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
    );
  }

  const header = { alg: "RS256", typ: "JWT" };
  const claim = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  };
  const encoder = new TextEncoder();
  const signingInput = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(
    JSON.stringify(claim),
  )}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToPkcs8(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sigBuf = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    encoder.encode(signingInput),
  );
  const jwt = `${signingInput}.${base64UrlEncode(new Uint8Array(sigBuf))}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!tokenRes.ok) {
    const text = await tokenRes.text();
    throw new Error(`Google token exchange failed (${tokenRes.status}): ${text.slice(0, 300)}`);
  }
  const json = (await tokenRes.json()) as { access_token: string; expires_in: number };
  cachedToken = { token: json.access_token, exp: now + json.expires_in };
  return json.access_token;
}

// ---------- Sheets helpers ----------

async function ensureHeaderRow(
  accessToken: string,
  spreadsheetId: string,
  tab: string,
): Promise<void> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    tab,
  )}!A1:G1`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) return; // don't block append on header check
  const json = (await res.json()) as { values?: string[][] };
  const hasHeader = json.values?.[0]?.length === HEADERS.length;
  if (hasHeader) return;
  await fetch(
    `${url}?valueInputOption=RAW`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [HEADERS] }),
    },
  );
}

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => EnquirySchema.parse(data))
  .handler(async ({ data }) => {
    const spreadsheetId = "https://docs.google.com/spreadsheets/d/1E9MOtc3GCXpH67uTu8OpesNg2PL9sZKiLhGduYl1BOs/edit";
    if (!spreadsheetId) {
      throw new Error("Missing GOOGLE_SHEET_ID environment variable");
    }
    const tab = process.env.GOOGLE_SHEET_TAB || DEFAULT_TAB;

    const accessToken = await getAccessToken();
    await ensureHeaderRow(accessToken, spreadsheetId, tab);

    const row = [
      new Date().toISOString(),
      data.name,
      data.phone,
      data.email,
      data.company,
      data.product,
      data.message,
    ];

    const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
      tab,
    )}!A:G:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;
    const appendRes = await fetch(appendUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [row] }),
    });
    if (!appendRes.ok) {
      const text = await appendRes.text();
      throw new Error(`Sheets append failed (${appendRes.status}): ${text.slice(0, 300)}`);
    }

    return { ok: true as const };
  });
