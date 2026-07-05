import { useState } from "react";
import { MessageCircle, Phone, Bot, X, Send, Home } from "lucide-react";

const PHONE = "+919840455557";
const WA_NUMBER = "919840455557";
const WA_MESSAGE = encodeURIComponent(
  "Hello I am interested in your service, Please call me back"
);

type Msg = { from: "bot" | "user"; text: string; menu?: boolean };

const MAIN_MENU_TEXT =
  "How can we help you today? Choose an option below or type your question:";

const MENU_OPTIONS = [
  "Fire Extinguishers",
  "Fire Alarm Systems",
  "Hydrant & Sprinkler",
  "AMC & Refilling",
  "Request a Quote",
  "Contact Us",
];

const EXIT_WORDS = ["thank you", "thanks", "goodbye", "bye", "nothing", "fine", "okay", "ok"];

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { from: "bot", text: "Hi! Welcome to Global Safety Enterprises." },
    { from: "bot", text: MAIN_MENU_TEXT, menu: true },
  ]);
  const [input, setInput] = useState("");

  const pushBot = (text: string, menu = false) =>
    setMessages((m) => [...m, { from: "bot", text, menu }]);

  const showMainMenu = () => {
    setMessages((m) => [
      ...m,
      { from: "bot", text: MAIN_MENU_TEXT, menu: true },
    ]);
  };

  const handleText = (text: string) => {
    const lower = text.toLowerCase().trim();

    // Polite exit
    if (EXIT_WORDS.some((w) => lower === w || lower === w + "." || lower === w + "!")) {
      pushBot("Goodbye, see you later.");
      setTimeout(() => {
        setChatOpen(false);
        setMessages([
          { from: "bot", text: "Hi! Welcome to Global Safety Enterprises." },
          { from: "bot", text: MAIN_MENU_TEXT, menu: true },
        ]);
      }, 1200);
      return;
    }


    let reply =
      "Thanks for reaching out! Our team will get back to you shortly. For immediate help, please call +91 98404 55557 or WhatsApp us.";
    if (lower.includes("extinguisher"))
      reply =
        "We supply ABC, CO2, Water, Foam, Clean Agent and Kitchen extinguishers in all capacities. Want a quote?";
    else if (lower.includes("alarm"))
      reply =
        "We offer Conventional & Addressable Fire Alarm panels, detectors, sounders and PA systems. Shall we schedule a site visit?";
    else if (lower.includes("hydrant") || lower.includes("sprinkler"))
      reply =
        "Our hydrant & sprinkler systems include valves, hose reels, branch pipes, sprinklers and fire brigade inlets — fully installed and maintained.";
    else if (lower.includes("amc") || lower.includes("refill"))
      reply =
        "We offer Annual Maintenance Contracts and refilling for all types of fire extinguishers as per IS standards.";
    else if (lower.includes("price") || lower.includes("quote") || lower.includes("cost"))
      reply =
        "Please share your location and requirement, or call us at +91 98404 55557 for an instant quote.";
    else if (lower.includes("contact") || lower.includes("address") || lower.includes("location"))
      reply =
        "📞 +91 98404 55557\n📧 info@globalsafetyenterprises.in\nOffices in Chennai, Coimbatore & Tirupur.";
    else if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey"))
      reply =
        "Hello! Tell us a bit about your facility — industrial, commercial or residential — and what you need.";

    pushBot(reply);
    setTimeout(() => pushBot("🏠 Back to Main Menu", true), 500);
  };

  const send = (override?: string) => {
    const text = (override ?? input).trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTimeout(() => handleText(text), 500);
  };

  return (
    <>
      {/* Floating buttons stack — chatbot at bottom */}
      <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-50 flex flex-col gap-3 items-end">
        {/* WhatsApp */}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-[oklch(0.65_0.17_150)] text-white grid place-items-center shadow-elegant hover:scale-105 transition pulse-ring"
        >
          <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
        </a>

        {/* Phone */}
        <a
          href={`tel:${PHONE}`}
          aria-label="Call us"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full bg-navy text-white grid place-items-center shadow-elegant hover:scale-105 transition"
        >
          <Phone className="h-5 w-5 md:h-6 md:w-6" />
        </a>

        {/* Chatbot (kept at the bottom) */}
        <button
          onClick={() => setChatOpen((v) => !v)}
          aria-label="Open chatbot"
          className="h-12 w-12 md:h-14 md:w-14 rounded-full gradient-fire text-white grid place-items-center shadow-fire hover:scale-105 transition"
        >
          {chatOpen ? <X className="h-5 w-5" /> : <Bot className="h-5 w-5 md:h-6 md:w-6" />}
        </button>
      </div>

      {/* Chatbot window */}
      {chatOpen && (
        <div className="fixed right-4 bottom-24 md:right-6 md:bottom-28 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[75vh] flex flex-col bg-card border border-border rounded-xl shadow-elegant overflow-hidden">
          <div className="gradient-fire text-white px-4 py-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-white/20 grid place-items-center">
              <Bot className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-sm">GSE Assistant</div>
              <div className="text-xs opacity-90">Typically replies instantly</div>
            </div>
            <button
              onClick={showMainMenu}
              aria-label="Back to main menu"
              className="text-xs bg-white/15 hover:bg-white/25 transition px-2 py-1 rounded-md flex items-center gap-1"
            >
              <Home className="h-3.5 w-3.5" /> Menu
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/30">
            {messages.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-line ${
                      m.from === "user"
                        ? "bg-navy text-white rounded-br-sm"
                        : "bg-card border border-border text-foreground rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
                {m.menu && m.from === "bot" && (
                  <div className="flex flex-wrap gap-2 pl-1">
                    {MENU_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => send(opt)}
                        className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-accent hover:text-accent-foreground transition"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="border-t border-border p-2 flex gap-2 bg-card"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 px-3 py-2 text-sm bg-background border border-border rounded-md outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              className="px-3 py-2 gradient-fire text-white rounded-md"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
