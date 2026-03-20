import { useState } from "react";
import { motion } from "framer-motion";
import { Activity, Mail, Lock, Eye, EyeOff, Shield, BarChart3, Stethoscope, LogIn, AlertCircle, UserPlus } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { users } from "@/data/users";

const LoginPage = () => {
  const { setRole, setUser } = useRole();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const user = users.find(u => u.email === email && u.password === password);
    if (user) { setUser(user); setRole(user.role); }
    else { setError("Invalid email or password. Please try again."); }
    setIsLoading(false);
  };

  const quickLogin = (role: "admin" | "manager" | "clinician" | "triage_nurse") => {
    const user = users.find(u => u.role === role)!;
    setUser(user);
    setRole(user.role);
  };

  const roleInfo = [
    { role: "admin" as const, label: "Admin", icon: Shield, color: "bg-primary text-primary-foreground" },
    { role: "manager" as const, label: "Manager", icon: BarChart3, color: "bg-moderate text-moderate-foreground" },
    { role: "clinician" as const, label: "Clinician", icon: Stethoscope, color: "bg-secondary text-secondary-foreground" },
    { role: "triage_nurse" as const, label: "Triage Nurse", icon: UserPlus, color: "bg-stable text-stable-foreground" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-secondary blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-secondary blur-3xl" />
        </div>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10 max-w-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Activity className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-4xl font-extrabold text-primary-foreground tracking-tight">
              Vital<span className="text-secondary">Triage</span> AI
            </h1>
          </div>
          <p className="text-primary-foreground/80 text-xl leading-relaxed mb-8">
            Smart Patient Segmentation Platform powered by AI-driven triage classification.
          </p>
          <div className="space-y-4">
            {[
              { icon: Shield, text: "Rule-based classification engine" },
              { icon: Activity, text: "Real-time patient monitoring" },
              { icon: BarChart3, text: "Comprehensive analytics dashboard" },
              { icon: UserPlus, text: "AI-powered triage nurse workflow" },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-3 text-primary-foreground/70">
                <div className="w-8 h-8 rounded-lg bg-secondary/15 flex items-center justify-center"><item.icon className="w-4 h-4 text-secondary" /></div>
                <span className="text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center"><Activity className="w-6 h-6 text-primary-foreground" /></div>
            <h1 className="text-2xl font-extrabold text-foreground">Vital<span className="text-secondary">Triage</span> AI</h1>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground text-sm mb-8">Sign in to access your dashboard</p>

          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm mb-6">
              <AlertCircle className="w-4 h-4 shrink-0" />{error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium"><Mail className="w-4 h-4 text-muted-foreground" /> Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@vitaltriage.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium"><Lock className="w-4 h-4 text-muted-foreground" /> Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button type="submit" disabled={isLoading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11">
              {isLoading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <><LogIn className="w-4 h-4 mr-2" /> Sign In</>}
            </Button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-3 text-muted-foreground">Quick Demo Access</span></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {roleInfo.map(r => (
                <button key={r.role} onClick={() => quickLogin(r.role)} className="flex flex-col items-center gap-2 p-3 rounded-xl border border-border hover:border-secondary/50 hover:shadow-md transition-all group">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${r.color} group-hover:scale-110 transition-transform`}><r.icon className="w-5 h-5" /></div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">Demo: admin@vitaltriage.com / admin123</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
