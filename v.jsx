import { useState, useEffect, useCallback } from "react";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ─── Supabase Configuration ─────────────────────────────────────────────────
const SUPABASE_URL = "https://sicjuoahqjlngqeuzwmj.supabase.co";
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNpY2p1b2FocWpsbmdxZXV6d21qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1NzA1MTQsImV4cCI6MjA5NDE0NjUxNH0.PFJS9_SlEbG1MZwJqmcOHyaugJw_rMjuDnAJnqGWZ_o";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ─── Theme Colors ──────────────────────────────────────────────────────────
const C = {
  bg: "#0a0a0f",
  bgGradient: "radial-gradient(ellipse at 50% 30%, rgba(91, 91, 214, 0.08) 0%, rgba(10, 10, 15, 0) 70%)",
  surface: "rgba(18, 18, 28, 0.85)",
  surfaceSolid: "#12121c",
  card: "rgba(22, 22, 34, 0.95)",
  cardSolid: "#161622",
  border: "rgba(55, 55, 85, 0.5)",
  borderHover: "rgba(91, 91, 214, 0.5)",
  accent: "#8b5cf6",
  accentLight: "#a78bfa",
  accentGlow: "rgba(139, 92, 246, 0.4)",
  green: "#10b981",
  gold: "#f59e0b",
  red: "#ef4444",
  text: "#f1f5f9",
  textSecondary: "#94a3b8",
  muted: "#64748b",
  white: "#ffffff",
};

const CATEGORIES = ["Real Estate", "SEO", "Technology", "Research", "Finance", "Marketing", "Other"];
const LINK_TYPES = ["dofollow", "nofollow", "sponsored"];

// ─── Global CSS with Modern Effects ────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700;14..32,800&family=Calistoga&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background: ${C.bg};
    color: ${C.text};
    overflow-x: hidden;
  }
  
  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${C.bg};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${C.accent};
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background: ${C.accentLight};
  }
  
  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes borderGlow {
    0%, 100% { border-color: ${C.border}; box-shadow: 0 0 0 0 ${C.accentGlow}; }
    50% { border-color: ${C.accent}; box-shadow: 0 0 20px ${C.accentGlow}; }
  }
  
  .fade-in { animation: fadeIn 0.5s ease forwards; }
  .slide-up { animation: slideUp 0.5s ease forwards; }
  .slide-in-left { animation: slideInLeft 0.5s ease forwards; }
  .slide-in-right { animation: slideInRight 0.5s ease forwards; }
  .scale-in { animation: scaleIn 0.3s ease forwards; }
  
  /* Glassmorphism */
  .glass {
    background: ${C.surface};
    backdrop-filter: blur(12px);
    border: 1px solid ${C.border};
  }
  
  .glass-card {
    background: ${C.card};
    backdrop-filter: blur(12px);
    border: 1px solid ${C.border};
    border-radius: 20px;
  }
  
  /* Button Styles */
  .btn {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 14px;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, ${C.accent}, ${C.accentLight});
    color: white;
    padding: 12px 24px;
    box-shadow: 0 4px 15px ${C.accentGlow};
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${C.accentGlow};
  }
  
  .btn-primary:active {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background: rgba(139, 92, 246, 0.15);
    color: ${C.accentLight};
    border: 1px solid ${C.accent};
    padding: 11px 23px;
  }
  
  .btn-secondary:hover {
    background: rgba(139, 92, 246, 0.25);
    transform: translateY(-1px);
  }
  
  .btn-ghost {
    background: transparent;
    color: ${C.textSecondary};
    border: 1px solid ${C.border};
    padding: 11px 22px;
  }
  
  .btn-ghost:hover {
    border-color: ${C.accent};
    color: ${C.accentLight};
    background: rgba(139, 92, 246, 0.05);
  }
  
  .btn-danger {
    background: rgba(239, 68, 68, 0.15);
    color: ${C.red};
    border: 1px solid rgba(239, 68, 68, 0.3);
    padding: 11px 22px;
  }
  
  .btn-danger:hover {
    background: rgba(239, 68, 68, 0.25);
    border-color: ${C.red};
  }
  
  /* Input Styles */
  .input-group {
    position: relative;
    margin-bottom: 20px;
  }
  
  .input-group label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: ${C.textSecondary};
    margin-bottom: 8px;
  }
  
  .input {
    width: 100%;
    padding: 12px 16px;
    background: rgba(10, 10, 15, 0.6);
    border: 1px solid ${C.border};
    border-radius: 12px;
    color: ${C.text};
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    transition: all 0.2s ease;
    outline: none;
  }
  
  .input:hover {
    border-color: ${C.accent};
  }
  
  .input:focus {
    border-color: ${C.accent};
    box-shadow: 0 0 0 3px ${C.accentGlow};
    background: rgba(10, 10, 15, 0.8);
  }
  
  textarea.input {
    resize: vertical;
    min-height: 100px;
  }
  
  select.input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364748b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 20px;
  }
  
  /* Badge Styles */
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    gap: 6px;
  }
  
  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid ${C.border};
    border-top-color: ${C.accent};
    border-radius: 50%;
    display: inline-block;
    animation: spin 0.7s linear infinite;
  }
  
  .spinner-lg {
    width: 40px;
    height: 40px;
    border-width: 3px;
  }
  
  /* Modal Overlay */
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(12px);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  }
  
  /* Hover Card Effect */
  .hover-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .hover-card:hover {
    transform: translateY(-4px);
    border-color: ${C.accent};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px ${C.accent}20;
  }
  
  /* Gradient Text */
  .gradient-text {
    background: linear-gradient(135deg, ${C.accent}, ${C.accentLight}, #c084fc);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  /* Stats Card Pulse */
  .stat-card {
    position: relative;
    overflow: hidden;
  }
  
  .stat-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.1), transparent);
    transition: left 0.5s ease;
  }
  
  .stat-card:hover::before {
    left: 100%;
  }
`;

// ─── Helper Functions ───────────────────────────────────────────────────────
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function timeAgo(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// ─── Badge Component ────────────────────────────────────────────────────────
function Badge({ type, size = "sm" }) {
  const badges = {
    blog: { bg: "rgba(139, 92, 246, 0.15)", color: C.accentLight, icon: "📄", label: "Blog" },
    pdf: { bg: "rgba(245, 158, 11, 0.15)", color: C.gold, icon: "📑", label: "PDF" },
    dofollow: { bg: "rgba(16, 185, 129, 0.15)", color: C.green, icon: "🔗", label: "DoFollow" },
    nofollow: { bg: "rgba(100, 116, 139, 0.15)", color: C.muted, icon: "🚫", label: "NoFollow" },
    sponsored: { bg: "rgba(239, 68, 68, 0.15)", color: C.red, icon: "💼", label: "Sponsored" },
    published: { bg: "rgba(16, 185, 129, 0.15)", color: C.green, icon: "●", label: "Live" },
  };
  const b = badges[type] || { bg: "rgba(139, 92, 246, 0.15)", color: C.accentLight, icon: "📌", label: type };
  const padding = size === "sm" ? "4px 10px" : "6px 14px";
  const fontSize = size === "sm" ? "11px" : "13px";
  
  return (
    <span className="badge" style={{ background: b.bg, color: b.color, padding, fontSize }}>
      <span>{b.icon}</span> {b.label}
    </span>
  );
}

// ─── Loader Component ───────────────────────────────────────────────────────
function Loader({ text = "Loading..." }) {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "400px",
      gap: 20 
    }}>
      <div className="spinner spinner-lg" />
      <p style={{ color: C.textSecondary, fontSize: 14 }}>{text}</p>
    </div>
  );
}

// ─── Auth Screen ────────────────────────────────────────────────────────────
function AuthScreen() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleEmailAuth = async () => {
    setLoading(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: name } }
        });
        if (error) throw error;
        setMsg({ type: "success", text: "✨ Check your email to confirm your account!" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (e) {
      setMsg({ type: "error", text: e.message });
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href }
    });
    if (error) {
      setMsg({ type: "error", text: error.message });
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      background: C.bg,
      position: "relative",
      overflow: "hidden"
    }}>
      <style>{GLOBAL_CSS}</style>
      
      {/* Animated Background */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "800px",
        height: "800px",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        animation: "pulse 4s ease-in-out infinite",
      }} />
      
      <div className="slide-up" style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ 
            fontFamily: "Calistoga, cursive", 
            fontSize: 48, 
            background: "linear-gradient(135deg, #8b5cf6, #c084fc)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 8
          }}>
            RankForge
          </div>
          <p style={{ color: C.textSecondary, fontSize: 14 }}>SEO Publishing Platform</p>
        </div>

        {/* Auth Card */}
        <div className="glass-card" style={{ padding: 40 }}>
          {/* Mode Toggle */}
          <div style={{ 
            display: "flex", 
            gap: 8, 
            marginBottom: 32,
            background: "rgba(10, 10, 15, 0.6)",
            borderRadius: 14,
            padding: 4
          }}>
            {["login", "signup"].map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: 10,
                  border: "none",
                  cursor: "pointer",
                  background: mode === m ? C.accent : "transparent",
                  color: mode === m ? "white" : C.textSecondary,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  transition: "all 0.2s"
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Form Fields */}
          {mode === "signup" && (
            <div className="input-group">
              <label>Full Name</label>
              <input
                className="input"
                placeholder="John Doe"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}
          
          <div className="input-group">
            <label>Email Address</label>
            <input
              className="input"
              type="email"
              placeholder="hello@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleEmailAuth()}
            />
          </div>

          {/* Message */}
          {msg && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 12,
              marginBottom: 20,
              fontSize: 13,
              background: msg.type === "error" ? "rgba(239, 68, 68, 0.15)" : "rgba(16, 185, 129, 0.15)",
              color: msg.type === "error" ? C.red : C.green,
              border: `1px solid ${msg.type === "error" ? "rgba(239, 68, 68, 0.3)" : "rgba(16, 185, 129, 0.3)"}`
            }}>
              {msg.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            className="btn btn-primary"
            onClick={handleEmailAuth}
            disabled={loading}
            style={{ width: "100%", marginBottom: 16 }}
          >
            {loading ? <span className="spinner" /> : mode === "login" ? "Sign In" : "Create Account"}
          </button>

          {/* Divider */}
          <div style={{ 
            textAlign: "center", 
            color: C.muted, 
            fontSize: 12, 
            marginBottom: 16,
            position: "relative",
            padding: "0 20px"
          }}>
            <span style={{ background: C.cardSolid, padding: "0 12px", position: "relative", zIndex: 1 }}>or continue with</span>
            <div style={{ 
              position: "absolute", 
              top: "50%", 
              left: 0, 
              right: 0, 
              height: 1, 
              background: C.border,
              transform: "translateY(-50%)"
            }} />
          </div>

          {/* Google Button */}
          <button
            className="btn btn-secondary"
            onClick={handleGoogleAuth}
            disabled={loading}
            style={{ width: "100%" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: C.muted }}>
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}

// ─── Publish Modal ──────────────────────────────────────────────────────────
function PublishModal({ user, onClose, onPublished }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    type: "blog",
    title: "",
    category: "Real Estate",
    tags: "",
    excerpt: "",
    content: "",
    link_type: "dofollow",
    outbound_url: "",
    anchor_text: "",
  });

  const updateForm = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const generateAIExcerpt = async () => {
    if (!form.title) return;
    setAiLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          messages: [{
            role: "user",
            content: `Write a compelling SEO-optimized excerpt (2-3 sentences) for a ${form.type} titled: "${form.title}". Category: ${form.category}. Make it engaging and professional. Only output the excerpt.`
          }]
        })
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      updateForm("excerpt", text.trim());
    } catch {
      setError("AI generation failed. Please write your excerpt manually.");
    }
    setAiLoading(false);
  };

  const handlePublish = async () => {
    if (!form.title.trim()) return setError("Title is required");
    setLoading(true);
    setError("");
    try {
      const slug = slugify(form.title) + "-" + Date.now().toString(36);
      const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
      const { data, error: err } = await supabase.from("posts").insert([{
        user_id: user.id,
        type: form.type,
        title: form.title.trim(),
        slug,
        excerpt: form.excerpt.trim(),
        content: form.content.trim(),
        category: form.category,
        tags,
        link_type: form.link_type,
        outbound_url: form.outbound_url.trim(),
        anchor_text: form.anchor_text.trim(),
        status: "published",
        views: 0,
      }]).select().single();
      if (err) throw err;
      onPublished(data);
      onClose();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="scale-in" style={{
        background: C.cardSolid,
        borderRadius: 24,
        width: "100%",
        maxWidth: 620,
        maxHeight: "90vh",
        overflowY: "auto",
        border: `1px solid ${C.accent}`,
        boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px ${C.accent}40`
      }}>
        <div style={{ padding: 32 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: C.white }}>
                {step === 1 && "📝 Content Details"}
                {step === 2 && "🔗 SEO & Backlinks"}
                {step === 3 && "🚀 Review & Publish"}
              </h2>
              <p style={{ fontSize: 13, color: C.textSecondary, marginTop: 4 }}>Step {step} of 3</p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                color: C.muted,
                fontSize: 20,
                cursor: "pointer",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
            >
              ×
            </button>
          </div>

          {/* Progress Steps */}
          <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
            {[1, 2, 3].map(s => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 3,
                  background: s <= step ? C.accent : C.border,
                  transition: "all 0.3s"
                }}
              />
            ))}
          </div>

          {/* Step 1: Content Details */}
          {step === 1 && (
            <div>
              <div className="input-group">
                <label>Content Type</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["blog", "pdf"].map(t => (
                    <button
                      key={t}
                      onClick={() => updateForm("type", t)}
                      style={{
                        flex: 1,
                        padding: "14px",
                        borderRadius: 12,
                        cursor: "pointer",
                        border: `2px solid ${form.type === t ? C.accent : C.border}`,
                        background: form.type === t ? "rgba(139, 92, 246, 0.1)" : "rgba(10, 10, 15, 0.6)",
                        color: form.type === t ? C.accentLight : C.textSecondary,
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 600,
                        fontSize: 14,
                        transition: "all 0.2s"
                      }}
                    >
                      {t === "blog" ? "📄 Blog Post" : "📑 PDF Document"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Title *</label>
                <input
                  className="input"
                  placeholder="e.g., The Ultimate Guide to Real Estate SEO"
                  value={form.title}
                  onChange={e => updateForm("title", e.target.value)}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="input-group">
                  <label>Category</label>
                  <select className="input" value={form.category} onChange={e => updateForm("category", e.target.value)}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="input-group">
                  <label>Tags (comma separated)</label>
                  <input
                    className="input"
                    placeholder="seo, marketing, growth"
                    value={form.tags}
                    onChange={e => updateForm("tags", e.target.value)}
                  />
                </div>
              </div>

              <div className="input-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <label style={{ margin: 0 }}>Excerpt / Summary</label>
                  <button
                    className="btn btn-secondary"
                    onClick={generateAIExcerpt}
                    disabled={aiLoading || !form.title}
                    style={{ padding: "6px 14px", fontSize: 12 }}
                  >
                    {aiLoading ? <span className="spinner" /> : "✨ Generate with AI"}
                  </button>
                </div>
                <textarea
                  className="input"
                  placeholder="Write a compelling summary of your content..."
                  value={form.excerpt}
                  onChange={e => updateForm("excerpt", e.target.value)}
                  rows={3}
                />
              </div>

              {form.type === "blog" && (
                <div className="input-group">
                  <label>Article Content</label>
                  <textarea
                    className="input"
                    placeholder="Write your article here..."
                    value={form.content}
                    onChange={e => updateForm("content", e.target.value)}
                    rows={8}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 2: SEO & Backlinks */}
          {step === 2 && (
            <div>
              <div className="input-group">
                <label>Link Type</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {LINK_TYPES.map(t => (
                    <button
                      key={t}
                      onClick={() => updateForm("link_type", t)}
                      style={{
                        flex: 1,
                        padding: "12px",
                        borderRadius: 10,
                        cursor: "pointer",
                        border: `2px solid ${form.link_type === t ? C.accent : C.border}`,
                        background: form.link_type === t ? "rgba(139, 92, 246, 0.1)" : "transparent",
                        color: form.link_type === t ? C.accentLight : C.textSecondary,
                        fontFamily: "Inter, sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        textTransform: "capitalize"
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="input-group">
                <label>Outbound URL (Backlink Target)</label>
                <input
                  className="input"
                  placeholder="https://clientwebsite.com/target-page"
                  value={form.outbound_url}
                  onChange={e => updateForm("outbound_url", e.target.value)}
                />
              </div>

              <div className="input-group">
                <label>Anchor Text</label>
                <input
                  className="input"
                  placeholder="best real estate insights"
                  value={form.anchor_text}
                  onChange={e => updateForm("anchor_text", e.target.value)}
                />
              </div>

              {form.outbound_url && (
                <div style={{
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(139, 92, 246, 0.05))",
                  borderRadius: 16,
                  padding: 20,
                  marginTop: 16,
                  border: `1px solid ${C.accent}40`
                }}>
                  <p style={{ fontSize: 12, color: C.textSecondary, marginBottom: 8 }}>🔍 Backlink Preview</p>
                  <div style={{ fontSize: 14, color: C.text, lineHeight: 1.6 }}>
                    ...check out{" "}
                    <a href="#" style={{ color: C.accentLight, textDecoration: "none", fontWeight: 600 }}>
                      {form.anchor_text || form.outbound_url}
                    </a>{" "}
                    for more insights...
                    <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>rel="{form.link_type}"</span>
                  </div>
                </div>
              )}

              <div style={{
                background: "rgba(16, 185, 129, 0.1)",
                borderRadius: 12,
                padding: 16,
                marginTop: 20,
                border: `1px solid ${C.green}40`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>✓</span>
                  <span style={{ fontSize: 13, color: C.green }}>
                    Your post will be indexed at: <strong>rankforge.io/blog/{slugify(form.title) || "your-slug"}</strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div style={{
                background: "rgba(10, 10, 15, 0.6)",
                borderRadius: 16,
                padding: 24,
                marginBottom: 20,
                border: `1px solid ${C.border}`
              }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 12 }}>
                  {form.title || "Untitled"}
                </h3>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, marginBottom: 16 }}>
                  {form.excerpt || "No excerpt provided."}
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Badge type={form.type} size="md" />
                  <Badge type={form.link_type} size="md" />
                  <span className="badge" style={{ background: "rgba(245, 158, 11, 0.15)", color: C.gold }}>
                    {form.category}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  ["Author", user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Anonymous"],
                  ["Link Type", form.link_type],
                  ["Category", form.category],
                  ["Tags", form.tags || "None"]
                ].map(([k, v]) => (
                  <div key={k} style={{
                    background: "rgba(10, 10, 15, 0.4)",
                    borderRadius: 12,
                    padding: 14
                  }}>
                    <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 12,
              marginBottom: 20,
              fontSize: 13,
              background: "rgba(239, 68, 68, 0.15)",
              color: C.red,
              border: `1px solid ${C.red}40`
            }}>
              {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 24 }}>
            {step > 1 && (
              <button className="btn btn-ghost" onClick={() => setStep(s => s - 1)}>
                ← Back
              </button>
            )}
            {step < 3 ? (
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!form.title.trim()) {
                    setError("Title is required");
                    return;
                  }
                  setError("");
                  setStep(s => s + 1);
                }}
              >
                Next →
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handlePublish} disabled={loading}>
                {loading ? <span className="spinner" /> : "🚀 Publish Now"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Post Detail Modal ──────────────────────────────────────────────────────
function PostDetail({ post, user, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const isOwner = user && post.user_id === user.id;

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post permanently?")) return;
    setDeleting(true);
    await supabase.from("posts").delete().eq("id", post.id);
    onDeleted(post.id);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="scale-in" style={{
        background: C.cardSolid,
        borderRadius: 24,
        width: "100%",
        maxWidth: 680,
        maxHeight: "90vh",
        overflowY: "auto",
        border: `1px solid ${C.border}`
      }}>
        <div style={{ padding: 32 }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Badge type={post.type} size="md" />
              <Badge type={post.link_type} size="md" />
              <Badge type={post.status} size="md" />
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.05)",
                border: "none",
                color: C.muted,
                fontSize: 24,
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 16, lineHeight: 1.3 }}>
            {post.title}
          </h2>

          {/* Excerpt */}
          <div style={{
            fontSize: 15,
            color: C.textSecondary,
            lineHeight: 1.7,
            marginBottom: 24,
            paddingBottom: 24,
            borderBottom: `1px solid ${C.border}`
          }}>
            {post.excerpt}
          </div>

          {/* Content */}
          {post.content && (
            <div style={{
              background: "rgba(10, 10, 15, 0.6)",
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
              fontSize: 14,
              color: C.text,
              lineHeight: 1.8,
              maxHeight: 300,
              overflowY: "auto"
            }}>
              {post.content}
            </div>
          )}

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
            {[
              ["👁 Views", formatNumber(post.views || 0)],
              ["🔗 Backlinks", post.outbound_url ? "Active" : "None"],
              ["📅 Published", timeAgo(post.created_at)]
            ].map(([label, value]) => (
              <div key={label} style={{
                background: "rgba(10, 10, 15, 0.4)",
                borderRadius: 14,
                padding: 16,
                textAlign: "center"
              }}>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.white, marginBottom: 4 }}>{value}</div>
                <div style={{ fontSize: 12, color: C.muted }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Backlink Info */}
          {post.outbound_url && (
            <div style={{
              background: "rgba(139, 92, 246, 0.08)",
              borderRadius: 16,
              padding: 18,
              marginBottom: 24,
              border: `1px solid ${C.accent}30`
            }}>
              <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 8 }}>🔗 Outbound Link</div>
              <a
                href={post.outbound_url}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 14, color: C.accentLight, wordBreak: "break-all", textDecoration: "none" }}
              >
                {post.outbound_url}
              </a>
              <span style={{ fontSize: 12, color: C.muted, marginLeft: 12 }}>rel="{post.link_type}"</span>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: "flex", gap: 12 }}>
            {isOwner && (
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleting}>
                {deleting ? <span className="spinner" /> : "🗑 Delete Post"}
              </button>
            )}
            <button
              className="btn btn-secondary"
              onClick={() => navigator.clipboard.writeText(`${window.location.href}#${post.slug}`)}
            >
              📋 Copy Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Navigation ─────────────────────────────────────────────────────
function Sidebar({ view, setView, user, onSignOut, onPublish }) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "posts", icon: "📄", label: "All Posts" },
    { id: "mine", icon: "✏️", label: "My Posts" },
    { id: "backlinks", icon: "🔗", label: "Backlinks" },
    { id: "analytics", icon: "📈", label: "Analytics" },
  ];

  return (
    <div style={{
      width: 260,
      flexShrink: 0,
      background: "rgba(10, 10, 15, 0.95)",
      backdropFilter: "blur(20px)",
      borderRight: `1px solid ${C.border}`,
      height: "100vh",
      position: "sticky",
      top: 0,
      display: "flex",
      flexDirection: "column"
    }}>
      {/* Logo */}
      <div style={{ padding: "32px 24px 24px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontFamily: "Calistoga, cursive", fontSize: 28, marginBottom: 4 }}>
          <span className="gradient-text">RankForge</span>
        </div>
        <p style={{ fontSize: 11, color: C.muted }}>SEO Publishing Network</p>
      </div>

      {/* Navigation */}
      <nav style={{ padding: "20px 16px", flex: 1 }}>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              marginBottom: 6,
              cursor: "pointer",
              background: view === item.id ? `linear-gradient(135deg, ${C.accent}20, ${C.accent}10)` : "transparent",
              color: view === item.id ? C.accentLight : C.textSecondary,
              fontFamily: "Inter, sans-serif",
              fontSize: 14,
              fontWeight: view === item.id ? 600 : 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              if (view !== item.id) e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={e => {
              if (view !== item.id) e.currentTarget.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User Section */}
      <div style={{ padding: "20px 16px", borderTop: `1px solid ${C.border}` }}>
        <button className="btn btn-primary" onClick={onPublish} style={{ width: "100%", marginBottom: 16 }}>
          ✨ Publish Content
        </button>

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "8px 4px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.03)"
        }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C.accent}, ${C.accentLight})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 700,
            color: C.white,
            flexShrink: 0
          }}>
            {(user?.user_metadata?.full_name || user?.email || "U")[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.user_metadata?.full_name?.split(" ")[0] || "User"}
            </div>
            <div style={{ fontSize: 11, color: C.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.email}
            </div>
          </div>
          <button
            onClick={onSignOut}
            title="Sign out"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "none",
              color: C.muted,
              cursor: "pointer",
              padding: "8px",
              borderRadius: 8,
              fontSize: 14,
              transition: "all 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Stat Card Component ────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="glass-card stat-card hover-card" style={{ padding: "24px", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{
          width: 52,
          height: 52,
          borderRadius: 16,
          background: `linear-gradient(135deg, ${color}20, ${color}10)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: 13, color: C.textSecondary, marginBottom: 4 }}>{label}</div>
          <div style={{ fontSize: 32, fontWeight: 800, color: C.white, lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12, color: C.green, marginTop: 6 }}>{sub}</div>}
        </div>
      </div>
    </div>
  );
}

// ─── Post Card Component ────────────────────────────────────────────────────
function PostCard({ post, onClick }) {
  return (
    <div className="glass-card hover-card" onClick={onClick} style={{ padding: 24, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge type={post.type} />
          <Badge type={post.link_type} />
        </div>
        <span style={{ fontSize: 12, color: C.muted }}>{timeAgo(post.created_at)}</span>
      </div>
      
      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 10, lineHeight: 1.4 }}>
        {post.title}
      </h3>
      
      <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, marginBottom: 16, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
        {post.excerpt}
      </p>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ fontSize: 13, color: C.textSecondary }}>👁 {formatNumber(post.views || 0)}</span>
          {post.outbound_url && <span style={{ fontSize: 13, color: C.accentLight }}>🔗 1 link</span>}
          <span style={{ fontSize: 13, color: C.gold }}>{post.category}</span>
        </div>
        <span style={{ fontSize: 12, color: C.muted }}>{post.profiles?.full_name || "Anonymous"}</span>
      </div>
    </div>
  );
}

// ─── Dashboard View ─────────────────────────────────────────────────────────
function DashboardView({ posts, user, setView }) {
  const myPosts = posts.filter(p => p.user_id === user?.id);
  const totalViews = posts.reduce((a, b) => a + (b.views || 0), 0);
  const totalLinks = posts.filter(p => p.outbound_url).length;
  const myViews = myPosts.reduce((a, b) => a + (b.views || 0), 0);

  const stats = [
    { icon: "📄", label: "Total Posts", value: posts.length, sub: `${myPosts.length} yours`, color: C.accent },
    { icon: "👁", label: "Platform Views", value: formatNumber(totalViews), sub: "All time", color: C.green },
    { icon: "🔗", label: "Backlinks", value: totalLinks, sub: "Active links", color: C.gold },
    { icon: "✏️", label: "My Views", value: formatNumber(myViews), sub: "Your content", color: C.accentLight },
  ];

  const topPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div style={{ padding: 40 }}>
      <div className="slide-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.white, marginBottom: 8 }}>
          Welcome back, {user?.user_metadata?.full_name?.split(" ")[0] || "there"} 👋
        </h1>
        <p style={{ fontSize: 15, color: C.textSecondary }}>Here's what's happening on your platform today.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
        {stats.map((stat, i) => (
          <div key={i} className="slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 0.8fr", gap: 24 }}>
        {/* Recent Posts */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 16 }}>🔥 Recent Posts</h2>
          {posts.length === 0 ? (
            <div className="glass-card" style={{ padding: 60, textAlign: "center" }}>
              <p style={{ color: C.textSecondary }}>No posts yet. Be the first to publish!</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {posts.slice(0, 5).map(p => (
                <div
                  key={p.id}
                  className="glass-card hover-card"
                  style={{ padding: "18px 20px", cursor: "pointer" }}
                  onClick={() => document.dispatchEvent(new CustomEvent("openPost", { detail: p }))}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 600, color: C.white, marginBottom: 6 }}>{p.title}</div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <Badge type={p.type} />
                        <Badge type={p.link_type} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 700, color: C.accentLight }}>{formatNumber(p.views || 0)}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>views</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Breakdown */}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: C.white, marginBottom: 16 }}>📊 Content Breakdown</h2>
          <div className="glass-card" style={{ padding: 24 }}>
            {[
              { label: "Blog Posts", count: posts.filter(p => p.type === "blog").length, color: C.accentLight },
              { label: "PDFs", count: posts.filter(p => p.type === "pdf").length, color: C.gold },
              { label: "DoFollow", count: posts.filter(p => p.link_type === "dofollow").length, color: C.green },
              { label: "Sponsored", count: posts.filter(p => p.link_type === "sponsored").length, color: C.red },
              { label: "NoFollow", count: posts.filter(p => p.link_type === "nofollow").length, color: C.muted },
            ].map(item => {
              const percentage = posts.length ? (item.count / posts.length) * 100 : 0;
              return (
                <div key={item.label} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 8 }}>
                    <span style={{ color: C.textSecondary }}>{item.label}</span>
                    <span style={{ color: C.white, fontWeight: 600 }}>{item.count}</span>
                  </div>
                  <div style={{ height: 6, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 6,
                        background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
                        width: `${percentage}%`,
                        transition: "width 1s ease-out"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Tip */}
          <div className="glass-card" style={{ padding: 20, marginTop: 20, background: `linear-gradient(135deg, ${C.accent}15, transparent)` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.accentLight, marginBottom: 8 }}>💡 Pro Tip</div>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>
              Posts with dofollow backlinks get 3x more engagement. Try adding relevant outbound links to boost your SEO!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Posts View ─────────────────────────────────────────────────────────────
function PostsView({ posts, onOpen, mineOnly, user }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredPosts = posts.filter(p => {
    if (mineOnly && p.user_id !== user?.id) return false;
    if (filterType !== "all" && p.type !== filterType) return false;
    if (filterCategory !== "All" && p.category !== filterCategory) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.excerpt?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ padding: 40 }}>
      <div className="slide-up" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.white, marginBottom: 8 }}>
          {mineOnly ? "My Posts" : "All Posts"}
        </h1>
        <p style={{ fontSize: 14, color: C.textSecondary }}>{filteredPosts.length} posts found</p>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <input
            className="input"
            placeholder="🔍 Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["all", "blog", "pdf"].map(t => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              style={{
                padding: "10px 20px",
                borderRadius: 10,
                cursor: "pointer",
                border: `1px solid ${filterType === t ? C.accent : C.border}`,
                background: filterType === t ? `linear-gradient(135deg, ${C.accent}20, ${C.accent}10)` : "rgba(10, 10, 15, 0.6)",
                color: filterType === t ? C.accentLight : C.textSecondary,
                fontFamily: "Inter, sans-serif",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.2s"
              }}
            >
              {t === "all" ? "All" : t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
        {["All", ...CATEGORIES].map(c => (
          <button
            key={c}
            onClick={() => setFilterCategory(c)}
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              cursor: "pointer",
              border: `1px solid ${filterCategory === c ? C.accent : C.border}`,
              background: filterCategory === c ? `linear-gradient(135deg, ${C.accent}20, ${C.accent}10)` : "transparent",
              color: filterCategory === c ? C.accentLight : C.textSecondary,
              fontSize: 12,
              fontWeight: 500,
              transition: "all 0.2s"
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 20 }}>
        {filteredPosts.map((post, i) => (
          <div key={post.id} className="slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
            <PostCard post={post} onClick={() => onOpen(post)} />
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="glass-card" style={{ padding: 80, textAlign: "center" }}>
          <p style={{ fontSize: 16, color: C.textSecondary }}>
            {mineOnly ? "You haven't published any posts yet." : "No posts found."}
          </p>
          {mineOnly && (
            <p style={{ fontSize: 14, color: C.muted, marginTop: 12 }}>
              Click the "Publish Content" button to create your first post!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Backlinks View ─────────────────────────────────────────────────────────
function BacklinksView({ posts }) {
  const linkedPosts = posts.filter(p => p.outbound_url);
  const dofollowCount = linkedPosts.filter(p => p.link_type === "dofollow").length;
  const nofollowCount = linkedPosts.filter(p => p.link_type === "nofollow").length;
  const sponsoredCount = linkedPosts.filter(p => p.link_type === "sponsored").length;

  return (
    <div style={{ padding: 40 }}>
      <div className="slide-up" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.white, marginBottom: 8 }}>🔗 Backlink Network</h1>
        <p style={{ fontSize: 14, color: C.textSecondary }}>{linkedPosts.length} active backlinks across the platform</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        {[
          { label: "DoFollow", count: dofollowCount, color: C.green, icon: "🔗" },
          { label: "NoFollow", count: nofollowCount, color: C.muted, icon: "🚫" },
          { label: "Sponsored", count: sponsoredCount, color: C.gold, icon: "💼" }
        ].map(stat => (
          <div key={stat.label} className="glass-card stat-card" style={{ padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 42, fontWeight: 800, color: stat.color, marginBottom: 8 }}>{stat.count}</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: C.textSecondary }}>
              {stat.icon} {stat.label} Links
            </div>
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ overflow: "hidden" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 0.8fr 2fr 0.8fr",
          gap: 12,
          padding: "16px 24px",
          background: "rgba(139, 92, 246, 0.05)",
          borderBottom: `1px solid ${C.border}`,
          fontWeight: 600,
          fontSize: 12,
          color: C.muted,
          textTransform: "uppercase",
          letterSpacing: 1
        }}>
          <div>Post Title</div>
          <div>Type</div>
          <div>Target URL</div>
          <div>Views</div>
        </div>

        {linkedPosts.length === 0 ? (
          <div style={{ padding: 60, textAlign: "center" }}>
            <p style={{ color: C.textSecondary }}>No backlinks yet. Publish content with outbound URLs!</p>
          </div>
        ) : (
          linkedPosts.map((post, i) => (
            <div
              key={post.id}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 0.8fr 2fr 0.8fr",
                gap: 12,
                padding: "14px 24px",
                borderBottom: i < linkedPosts.length - 1 ? `1px solid ${C.border}` : "none",
                transition: "background 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>{post.title}</div>
              <div><Badge type={post.link_type} /></div>
              <a
                href={post.outbound_url}
                target="_blank"
                rel="noreferrer"
                style={{ fontSize: 13, color: C.accentLight, textDecoration: "none", wordBreak: "break-all" }}
              >
                {post.outbound_url}
              </a>
              <div style={{ fontSize: 14, color: C.white, fontWeight: 600 }}>{formatNumber(post.views || 0)}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ─── Analytics View ─────────────────────────────────────────────────────────
function AnalyticsView({ posts, user }) {
  const myPosts = posts.filter(p => p.user_id === user?.id);
  const totalViews = posts.reduce((a, b) => a + (b.views || 0), 0);
  const myViews = myPosts.reduce((a, b) => a + (b.views || 0), 0);
  const sortedPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0));
  const maxViews = sortedPosts[0]?.views || 1;

  return (
    <div style={{ padding: 40 }}>
      <div className="slide-up" style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: C.white, marginBottom: 8 }}>📈 Analytics</h1>
        <p style={{ fontSize: 14, color: C.textSecondary }}>Real-time view counts from your Supabase database</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 40 }}>
        {[
          { icon: "👁", label: "Total Views", value: formatNumber(totalViews), color: C.accent },
          { icon: "📄", label: "Total Posts", value: posts.length, color: C.green },
          { icon: "✏️", label: "My Posts", value: myPosts.length, color: C.gold },
          { icon: "👤", label: "My Views", value: formatNumber(myViews), color: C.accentLight }
        ].map((stat, i) => (
          <div key={i} className="slide-in-left" style={{ animationDelay: `${i * 0.1}s` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Top Posts Chart */}
      <div className="glass-card" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: C.white, marginBottom: 24 }}>🏆 Top Performing Posts</h2>
        
        {sortedPosts.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center" }}>
            <p style={{ color: C.textSecondary }}>No posts yet. Publish something to see analytics!</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {sortedPosts.map((post, index) => (
              <div key={post.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: index < 3 ? `linear-gradient(135deg, ${C.gold}, ${C.accent})` : "rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      fontWeight: 700,
                      color: index < 3 ? C.bg : C.text
                    }}>
                      {index + 1}
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{post.title}</span>
                  </div>
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.accentLight }}>{formatNumber(post.views || 0)} views</span>
                </div>
                <div style={{ height: 8, background: C.border, borderRadius: 6, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      borderRadius: 6,
                      background: `linear-gradient(90deg, ${C.accent}, ${C.accentLight})`,
                      width: `${((post.views || 0) / maxViews) * 100}%`,
                      transition: "width 1s ease-out"
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>
                  {post.category} • {post.profiles?.full_name || "Anonymous"} • {timeAgo(post.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main App Component ─────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load posts
  const loadPosts = useCallback(async () => {
    if (!session) return;
    setPostsLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*, profiles(full_name, email, avatar_url)")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (!error && data) setPosts(data);
    setPostsLoading(false);
  }, [session]);

  useEffect(() => {
    if (session) loadPosts();
  }, [session, loadPosts]);

  // Event listeners for post opening
  useEffect(() => {
    const handler = (e) => setSelectedPost(e.detail);
    document.addEventListener("openPost", handler);
    return () => document.removeEventListener("openPost", handler);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setPosts([]);
  };

  const handlePostPublished = (newPost) => {
    setPosts(prev => [newPost, ...prev]);
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg }}>
        <style>{GLOBAL_CSS}</style>
        <Loader text="Loading RankForge..." />
      </div>
    );
  }

  if (!session) return <AuthScreen />;

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: C.bg }}>
        <Sidebar
          view={currentView}
          setView={setCurrentView}
          user={session.user}
          onSignOut={handleSignOut}
          onPublish={() => setShowPublishModal(true)}
        />
        
        <div style={{ flex: 1, overflowY: "auto", position: "relative" }}>
          {/* Background gradient */}
          <div style={{
            position: "fixed",
            top: "20%",
            right: "10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0
          }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            {postsLoading ? (
              <Loader text="Loading posts..." />
            ) : (
              <>
                {currentView === "dashboard" && <DashboardView posts={posts} user={session.user} setView={setCurrentView} />}
                {currentView === "posts" && <PostsView posts={posts} onOpen={setSelectedPost} mineOnly={false} user={session.user} />}
                {currentView === "mine" && <PostsView posts={posts} onOpen={setSelectedPost} mineOnly={true} user={session.user} />}
                {currentView === "backlinks" && <BacklinksView posts={posts} />}
                {currentView === "analytics" && <AnalyticsView posts={posts} user={session.user} />}
              </>
            )}
          </div>
        </div>
      </div>

      {showPublishModal && (
        <PublishModal
          user={session.user}
          onClose={() => setShowPublishModal(false)}
          onPublished={handlePostPublished}
        />
      )}
      
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          user={session.user}
          onClose={() => setSelectedPost(null)}
          onDeleted={handlePostDeleted}
        />
      )}
    </>
  );
}
