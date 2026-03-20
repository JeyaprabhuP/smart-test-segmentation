import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { patients } from "@/data/patients";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

const mockResponses: Record<string, string> = {
  "help": "I can help with:\n• **Patient lookup** — try 'find patient Maria'\n• **Severity info** — 'what is critical severity?'\n• **Protocol queries** — 'triage protocol'\n• **Stats** — 'patient count'\n• **Navigation** — 'how to view labs?'",
  "patient count": `There are currently **${patients.length}** patients in the system.\n- 🔴 Critical: ${patients.filter(p => p.severity === "critical").length}\n- 🟡 Moderate: ${patients.filter(p => p.severity === "moderate").length}\n- 🟢 Stable: ${patients.filter(p => p.severity === "stable").length}`,
  "critical": "**Critical severity** means the patient requires immediate intervention. Vitals exceeding thresholds: HR >120, O₂ <90%, RR >30, or Temp >39°C. These patients are prioritized for ICU admission.",
  "moderate": "**Moderate severity** indicates close monitoring is needed. One or more vitals trending abnormal: HR >100, O₂ <94%, RR >24, or Temp >38°C. Follow-up assessments within 1 hour.",
  "stable": "**Stable severity** means standard monitoring protocols apply. All vitals within normal ranges. Patient may be eligible for discharge planning.",
  "triage": "**Triage Protocol:**\n1. Register patient with demographics & chief complaint\n2. Record initial vitals (HR, BP, Temp, O₂, RR)\n3. AI engine classifies severity automatically\n4. Assign to appropriate doctor based on severity\n5. Admit or place in waiting queue",
  "labs": "Navigate to the **Labs** tab in the clinician dashboard to view all lab reports. You can filter by status (completed/pending) and search by test name.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();

  // Patient lookup
  const patientMatch = patients.find(p => lower.includes(p.name.toLowerCase().split(" ")[0].toLowerCase()));
  if (patientMatch) {
    return `**${patientMatch.name}** (${patientMatch.age}y ${patientMatch.gender})\n- 📍 ${patientMatch.ward} · Bed ${patientMatch.bed}\n- 👨‍⚕️ ${patientMatch.doctor}\n- 🏥 Status: ${patientMatch.status}\n- ⚡ Severity: ${patientMatch.severity}\n- 🔬 Diagnosis: ${patientMatch.diagnosis}\n- ❤️ HR: ${patientMatch.vitals.heartRate} · O₂: ${patientMatch.vitals.oxygenSaturation}%`;
  }

  for (const [key, response] of Object.entries(mockResponses)) {
    if (lower.includes(key)) return response;
  }

  if (lower.includes("hello") || lower.includes("hi")) return "Hello! 👋 I'm the VitalTriage AI assistant. Type **help** to see what I can do.";
  if (lower.includes("thank")) return "You're welcome! Let me know if you need anything else. 😊";

  return "I'm not sure about that. Try asking about:\n• Patient names (e.g., 'find Maria')\n• Severity levels ('what is critical?')\n• Patient count or stats\n• Triage protocols\n\nType **help** for more options.";
};

const ChatbotWidget = () => {
  const { role, user } = useRole();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "bot", content: `Welcome${user ? `, ${user.name.split(" ")[0]}` : ""}! 👋 I'm the VitalTriage AI assistant. How can I help you today?\n\nType **help** to see available commands.`, timestamp: new Date().toLocaleTimeString() },
  ]);
  const [typing, setTyping] = useState(false);
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", content: input, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 800));

    const response = getResponse(input);
    const botMsg: Message = { id: `b-${Date.now()}`, role: "bot", content: response, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, botMsg]);
    setTyping(false);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[500px] bg-card rounded-2xl border border-border shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">VitalTriage AI</p>
                  <p className="text-[10px] text-primary-foreground/60">Always available</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-primary-foreground/10">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    msg.role === "bot" ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
                  }`}>
                    {msg.role === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>
                  <div className={`max-w-[75%] px-3 py-2 rounded-xl text-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm"
                  }`}>
                    {msg.content.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-1" : ""}>
                        {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                          part.startsWith("**") && part.endsWith("**")
                            ? <strong key={j}>{part.slice(2, -2)}</strong>
                            : part
                        )}
                      </p>
                    ))}
                    <p className={`text-[9px] mt-1 ${msg.role === "user" ? "text-primary-foreground/50" : "text-muted-foreground/50"}`}>{msg.timestamp}</p>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary/10 text-secondary flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEnd} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-border">
              <form onSubmit={e => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="w-9 h-9 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-secondary/90 disabled:opacity-40 transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
