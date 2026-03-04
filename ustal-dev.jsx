import { useState, useEffect, useRef, useCallback } from "react";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const COLORS = {
  primary: "#0EA5E9",
  accent: "#F59E0B",
  dark: "#030712",
  darker: "#010409",
  glass: "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
};

const TRANSLATIONS = {
  en: {
    nav: { home: "Home", work: "Work", services: "Services", courses: "Courses", contact: "Contact", admin: "Admin" },
    hero: {
      badge: "Since 2023 · 14+ Systems Delivered",
      line1: "We Build",
      line2: "Intelligent",
      line3: "Digital Systems",
      sub: "From AI-powered mobile apps to enterprise web platforms — we engineer software that scales.",
      cta1: "Start a Project",
      cta2: "View Our Work",
      stat1: "Systems Delivered",
      stat2: "App Categories",
      stat3: "AI Models Built",
      stat4: "Years Active",
    },
    about: {
      title: "Who We Are",
      sub: "A boutique dev team obsessed with clean architecture and elegant code.",
      mission: "Mission",
      missionText: "Build scalable, AI-integrated digital systems that solve real-world problems with engineering precision.",
      vision: "Vision",
      visionText: "Become the go-to technical partner for startups and enterprises across MENA and beyond.",
      why: "Why Ustal.dev",
      reasons: [
        { icon: "⚡", t: "Speed", d: "Rapid delivery without cutting corners" },
        { icon: "🏗️", t: "Architecture", d: "Clean, scalable, maintainable systems" },
        { icon: "🧠", t: "AI-First", d: "AI integration baked in from day one" },
        { icon: "🔒", t: "Security", d: "Enterprise-grade security practices" },
      ],
    },
    portfolio: {
      title: "Our Work",
      sub: "14+ production systems across mobile, web, AI & desktop",
      filters: ["All", "Mobile", "Web", "AI", "Desktop"],
    },
    courses: {
      badge: "Coming Soon",
      title: "Flutter & Firebase",
      sub: "Mobile Development Masterclass",
      price: "$97",
      discount: "First 20 students get 40% off → $58",
      features: ["Live sessions via Google Meet", "Flutter from zero to hero", "Firebase backend integration", "Real project case studies", "Lifetime access to recordings", "Private Discord community"],
      cta: "Reserve My Spot",
      seats: "Only 20 discounted seats available",
    },
    contact: {
      title: "Start Your Project",
      sub: "Tell us what you're building. We'll get back within 24h.",
      name: "Full Name", company: "Company", budget: "Budget Range",
      timeline: "Timeline", type: "Project Type", desc: "Project Description",
      upload: "Attach Files", submit: "Send Request",
      budgets: ["< $1,000", "$1,000–$5,000", "$5,000–$20,000", "$20,000+"],
      timelines: ["< 1 month", "1–3 months", "3–6 months", "6+ months"],
      types: ["Mobile App", "Web Platform", "AI System", "Desktop App", "Full Stack"],
    },
    admin: {
      title: "Admin Dashboard",
      tabs: ["Overview", "Projects", "Requests", "Courses", "Content"],
    },
  },
  fr: {
    nav: { home: "Accueil", work: "Travaux", services: "Services", courses: "Cours", contact: "Contact", admin: "Admin" },
    hero: {
      badge: "Depuis 2023 · 14+ Systèmes Livrés",
      line1: "Nous Construisons",
      line2: "des Systèmes",
      line3: "Numériques Intelligents",
      sub: "Des applications mobiles IA aux plateformes web enterprise — nous développons des logiciels qui passent à l'échelle.",
      cta1: "Démarrer un Projet",
      cta2: "Voir Nos Travaux",
      stat1: "Systèmes Livrés",
      stat2: "Catégories App",
      stat3: "Modèles IA",
      stat4: "Années d'Activité",
    },
    about: { title: "Qui Sommes-Nous", sub: "Une équipe dev boutique obsédée par l'architecture propre.", mission: "Mission", missionText: "Construire des systèmes numériques évolutifs et intégrés à l'IA.", vision: "Vision", visionText: "Devenir le partenaire technique de référence pour les startups et entreprises.", why: "Pourquoi Ustal.dev", reasons: [{ icon: "⚡", t: "Rapidité", d: "Livraison rapide sans compromis" }, { icon: "🏗️", t: "Architecture", d: "Systèmes propres et maintenables" }, { icon: "🧠", t: "IA-First", d: "Intégration IA dès le premier jour" }, { icon: "🔒", t: "Sécurité", d: "Pratiques de sécurité enterprise" }] },
    portfolio: { title: "Nos Réalisations", sub: "14+ systèmes en production", filters: ["Tout", "Mobile", "Web", "IA", "Desktop"] },
    courses: { badge: "Bientôt", title: "Flutter & Firebase", sub: "Masterclass Développement Mobile", price: "97$", discount: "Les 20 premiers → 40% de réduction → 58$", features: ["Sessions live via Google Meet", "Flutter de zéro à héros", "Intégration Firebase", "Études de cas réels", "Accès à vie aux enregistrements", "Communauté Discord privée"], cta: "Réserver Ma Place", seats: "20 places réduites seulement" },
    contact: { title: "Démarrez Votre Projet", sub: "Décrivez votre projet. Réponse sous 24h.", name: "Nom Complet", company: "Entreprise", budget: "Budget", timeline: "Délai", type: "Type de Projet", desc: "Description", upload: "Joindre des Fichiers", submit: "Envoyer", budgets: ["< 1 000$", "1 000–5 000$", "5 000–20 000$", "20 000$+"], timelines: ["< 1 mois", "1–3 mois", "3–6 mois", "6+ mois"], types: ["App Mobile", "Plateforme Web", "Système IA", "App Desktop", "Full Stack"] },
    admin: { title: "Tableau de Bord Admin", tabs: ["Vue d'ensemble", "Projets", "Demandes", "Cours", "Contenu"] },
  },
  ar: {
    nav: { home: "الرئيسية", work: "أعمالنا", services: "الخدمات", courses: "الدورات", contact: "تواصل", admin: "الإدارة" },
    hero: {
      badge: "منذ 2023 · 14+ نظام مُسلَّم",
      line1: "نبني",
      line2: "الأنظمة الرقمية",
      line3: "الذكية",
      sub: "من تطبيقات الذكاء الاصطناعي إلى منصات الويب المؤسسية — نهندس برمجيات قابلة للتوسع.",
      cta1: "ابدأ مشروعك",
      cta2: "استعرض أعمالنا",
      stat1: "نظام مُسلَّم",
      stat2: "فئات التطبيقات",
      stat3: "نماذج ذكاء اصطناعي",
      stat4: "سنوات نشاط",
    },
    about: { title: "من نحن", sub: "فريق تطوير متخصص مهووس بالبنية النظيفة.", mission: "المهمة", missionText: "بناء أنظمة رقمية قابلة للتوسع ومدمجة مع الذكاء الاصطناعي.", vision: "الرؤية", visionText: "أن نكون الشريك التقني المفضل للشركات الناشئة والمؤسسات.", why: "لماذا Ustal.dev", reasons: [{ icon: "⚡", t: "السرعة", d: "تسليم سريع دون تنازلات" }, { icon: "🏗️", t: "البنية", d: "أنظمة نظيفة وقابلة للصيانة" }, { icon: "🧠", t: "الذكاء الاصطناعي", d: "تكامل الذكاء الاصطناعي من اليوم الأول" }, { icon: "🔒", t: "الأمان", d: "ممارسات أمان على مستوى المؤسسات" }] },
    portfolio: { title: "أعمالنا", sub: "14+ نظام في الإنتاج", filters: ["الكل", "موبايل", "ويب", "ذكاء اصطناعي", "سطح المكتب"] },
    courses: { badge: "قريباً", title: "Flutter & Firebase", sub: "دورة تطوير تطبيقات الجوال", price: "97$", discount: "أول 20 طالب → خصم 40% → 58$", features: ["جلسات مباشرة عبر Google Meet", "Flutter من الصفر للاحتراف", "تكامل Firebase", "دراسات حالة حقيقية", "وصول مدى الحياة", "مجتمع Discord خاص"], cta: "احجز مكانك", seats: "20 مقعداً بسعر مخفض فقط" },
    contact: { title: "ابدأ مشروعك", sub: "أخبرنا بما تبني. سنرد خلال 24 ساعة.", name: "الاسم الكامل", company: "الشركة", budget: "الميزانية", timeline: "الجدول الزمني", type: "نوع المشروع", desc: "وصف المشروع", upload: "إرفاق ملفات", submit: "إرسال الطلب", budgets: ["< 1,000$", "1,000–5,000$", "5,000–20,000$", "20,000$+"], timelines: ["< شهر", "1–3 أشهر", "3–6 أشهر", "6+ أشهر"], types: ["تطبيق موبايل", "منصة ويب", "نظام ذكاء اصطناعي", "تطبيق سطح مكتب", "Full Stack"] },
    admin: { title: "لوحة تحكم الإدارة", tabs: ["نظرة عامة", "المشاريع", "الطلبات", "الدورات", "المحتوى"] },
  },
};

const PROJECTS = [
  { id: 1, name: "Hiraf", cat: "Mobile", desc: "Social task marketplace connecting skilled professionals with local clients — think Allo Voisin for MENA.", stack: ["Flutter", "Firebase", "Node.js", "Maps API"], metrics: { users: "2,400+", rating: "4.7", tasks: "8,000+" }, color: "#6366F1" },
  { id: 2, name: "Maawa", cat: "Mobile", desc: "Dual-purpose platform: professional services marketplace + social sharing feed with rich media support.", stack: ["Flutter", "Firebase", "FFmpeg", "CloudFunctions"], metrics: { users: "1,800+", posts: "15,000+", services: "340+" }, color: "#EC4899" },
  { id: 3, name: "Maawachat", cat: "Mobile", desc: "Full-featured WhatsApp clone with encrypted messaging, voice/video calls, stories, and group chats.", stack: ["Flutter", "WebRTC", "Firebase RTDB", "AES-256"], metrics: { messages: "500K+", uptime: "99.9%", features: "All WhatsApp" }, color: "#10B981" },
  { id: 4, name: "AttendEd", cat: "Mobile", desc: "Smart university attendance system using QR + GPS verification. Prevents proxy attendance automatically.", stack: ["Flutter", "Firebase", "QR", "GPS"], metrics: { students: "3,200+", accuracy: "99.2%", universities: "4" }, color: "#F59E0B" },
  { id: 5, name: "Wlidi", cat: "Mobile", desc: "Parent-school bridge: live attendance, grade tracking, bulletin downloads, and push notifications.", stack: ["Flutter", "Firebase", "FCM", "PDF Gen"], metrics: { parents: "1,500+", schools: "12", notifs: "50K/mo" }, color: "#3B82F6" },
  { id: 6, name: "Sahaa Fit", cat: "Mobile", desc: "Comprehensive fitness app with AI-curated workout plans, calorie tracking, and progress analytics.", stack: ["Flutter", "Firebase", "ML Kit", "HealthKit"], metrics: { users: "900+", workouts: "200+", meals: "1,500+" }, color: "#EF4444" },
  { id: 7, name: "Mylab", cat: "Mobile", desc: "Lab locator with price comparison, appointment booking, and digital results delivery.", stack: ["Flutter", "Firebase", "Maps", "HL7"], metrics: { labs: "85+", tests: "400+", bookings: "3K+" }, color: "#8B5CF6" },
  { id: 8, name: "Docbip", cat: "Mobile", desc: "Patient-facing doctor appointment booking with insurance support and digital prescriptions.", stack: ["Flutter", "Firebase", "Stripe", "PDF"], metrics: { patients: "4,000+", doctors: "120+", bookings: "12K+" }, color: "#06B6D4" },
  { id: 9, name: "Docbip Doctor", cat: "Mobile", desc: "Doctor-side companion to Docbip: manage schedule, patient history, prescriptions, and consultations.", stack: ["Flutter", "Firebase", "FHIR", "E2E Enc"], metrics: { doctors: "120+", consultations: "8K+", rating: "4.8" }, color: "#0EA5E9" },
  { id: 10, name: "Ontime", cat: "Mobile", desc: "Full Uber-clone deployed in Libya: real-time driver tracking, surge pricing, and multi-payment.", stack: ["Flutter", "Firebase RTDB", "Google Maps", "Stripe"], metrics: { rides: "6,000+", drivers: "80+", cities: "3" }, color: "#F97316" },
  { id: 11, name: "Fast", cat: "Mobile", desc: "Second-generation ride-hailing platform with improved ETA prediction and driver incentive system.", stack: ["Flutter", "Firebase", "Directions API", "ML"], metrics: { rides: "4,200+", drivers: "60+", eta: "±90sec" }, color: "#84CC16" },
  { id: 12, name: "Dermustal", cat: "AI", desc: "AI-powered dermatology app detecting 7 types of skin cancer from a single photo upload with 91%+ accuracy.", stack: ["Flutter", "TensorFlow Lite", "Python", "FastAPI"], metrics: { accuracy: "91.4%", classes: "7", scans: "2,000+" }, color: "#A855F7" },
  { id: 13, name: "Maawa Panel", cat: "Web", desc: "Vendor/service provider dashboard for Maawa — manage listings, bookings, analytics, and payouts.", stack: ["Next.js", "Firebase", "Tailwind", "Chart.js"], metrics: { vendors: "200+", txns: "5K+", uptime: "99.8%" }, color: "#EC4899" },
  { id: 14, name: "Wlidi School", cat: "Web", desc: "School administration portal: manage classes, attendance, grades, and parent communications.", stack: ["Next.js", "Firebase", "TypeScript", "PDF"], metrics: { schools: "12", students: "4K+", reports: "3K+" }, color: "#3B82F6" },
  { id: 15, name: "Docusmart", cat: "AI", desc: "Enterprise document intelligence: auto-classify, tag, and route uploaded files using NLP models.", stack: ["Python", "FastAPI", "LangChain", "OpenAI", "React"], metrics: { accuracy: "94%", docs: "50K+", categories: "40+" }, color: "#F59E0B" },
  { id: 16, name: "Ustal Cabinet", cat: "Web", desc: "All-in-one clinic management: prescriptions, invoices, patient records, and appointment scheduling.", stack: ["Next.js", "Firebase", "TypeScript", "PDF Gen"], metrics: { clinics: "8+", patients: "2K+", invoices: "5K+" }, color: "#10B981" },
  { id: 17, name: "Moyah", cat: "Web", desc: "Full-stack delivery platform: orders, fleet tracking, zone management, and vendor portal.", stack: ["Next.js", "Firebase RTDB", "Maps", "Stripe"], metrics: { orders: "10K+", vendors: "45+", drivers: "90+" }, color: "#6366F1" },
  { id: 18, name: "UstalGS", cat: "Desktop", desc: "Stock & store management system: inventory tracking, purchase orders, POS, and financial reports.", stack: ["Electron", "React", "SQLite", "Chart.js"], metrics: { stores: "6+", items: "5K+", txns: "20K+" }, color: "#64748B" },
];

const ADMIN_REQUESTS = [
  { id: 1, name: "Ahmed Benali", company: "TechCorp DZ", type: "Mobile App", budget: "$5,000–$20,000", status: "Reviewed", date: "2025-06-01" },
  { id: 2, name: "Sara Mansouri", company: "StartupMA", type: "Web Platform", budget: "$1,000–$5,000", status: "Quotation Sent", date: "2025-06-03" },
  { id: 3, name: "Khalid Trabelsi", company: "MedTech LY", type: "AI System", budget: "$20,000+", status: "Approved", date: "2025-05-28" },
  { id: 4, name: "Nora Hadj", company: "EduStart", type: "Full Stack", budget: "$5,000–$20,000", status: "Pending", date: "2025-06-05" },
  { id: 5, name: "Youssef Khelil", company: "RetailPlus", type: "Desktop App", budget: "$1,000–$5,000", status: "Contacted", date: "2025-06-04" },
];

const STATUS_COLORS = { Pending: "#F59E0B", Reviewed: "#3B82F6", Contacted: "#8B5CF6", "Quotation Sent": "#06B6D4", Approved: "#10B981" };

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useCountUp(target, duration = 2000, trigger = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, trigger]);
  return val;
}

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Particle({ style }) {
  return (
    <div style={{
      position: "absolute",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(14,165,233,0.6), transparent)",
      animation: "float 8s ease-in-out infinite",
      ...style,
    }} />
  );
}

function GlowOrb({ x, y, size, color }) {
  return (
    <div style={{
      position: "absolute", left: x, top: y, width: size, height: size,
      borderRadius: "50%", background: color, filter: "blur(80px)",
      opacity: 0.15, pointerEvents: "none",
    }} />
  );
}

function Tag({ text, color }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 10px", borderRadius: 999,
      background: color + "22", border: `1px solid ${color}44`,
      color, fontSize: 11, fontWeight: 700, letterSpacing: 1,
    }}>{text}</span>
  );
}

function StatBox({ icon, value, label, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVis(true), { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const num = useCountUp(parseInt(value), 1800, vis);
  return (
    <div ref={ref} style={{
      background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
      borderRadius: 16, padding: "20px 24px", textAlign: "center",
      backdropFilter: "blur(12px)",
      animation: vis ? `fadeUp 0.6s ${delay}ms both` : "none",
    }}>
      <div style={{ fontSize: 28, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: COLORS.primary, fontFamily: "'Space Grotesk', sans-serif" }}>
        {num}+
      </div>
      <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4, letterSpacing: 0.5 }}>{label}</div>
    </div>
  );
}

function ProjectCard({ p, lang }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? `${p.color}11` : COLORS.glass,
        border: `1px solid ${hov ? p.color + "44" : COLORS.glassBorder}`,
        borderRadius: 20, padding: 24, cursor: "pointer",
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        transform: hov ? "translateY(-6px) scale(1.01)" : "none",
        backdropFilter: "blur(12px)",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -30, right: -30, width: 100, height: 100,
        borderRadius: "50%", background: p.color, filter: "blur(40px)",
        opacity: hov ? 0.3 : 0.1, transition: "opacity 0.35s",
      }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 18, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif" }}>{p.name}</div>
          <Tag text={p.cat} color={p.color} />
        </div>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: `linear-gradient(135deg, ${p.color}33, ${p.color}11)`,
          border: `1px solid ${p.color}44`, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>
          {p.cat === "Mobile" ? "📱" : p.cat === "Web" ? "🌐" : p.cat === "AI" ? "🧠" : "🖥️"}
        </div>
      </div>
      <p style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.6, marginBottom: 16 }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {p.stack.map(s => (
          <span key={s} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 6, background: "#1E293B", color: "#64748B", fontWeight: 600 }}>{s}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, borderTop: `1px solid ${COLORS.glassBorder}`, paddingTop: 12 }}>
        {Object.entries(p.metrics).map(([k, v]) => (
          <div key={k} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: p.color }}>{v}</div>
            <div style={{ fontSize: 10, color: "#475569", textTransform: "capitalize" }}>{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Navbar({ lang, setLang, section, setSection, onAdmin, t }) {
  const scrollY = useScrollY();
  const links = Object.entries(t.nav).filter(([k]) => k !== "admin");
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
      background: scrollY > 40 ? "rgba(3,7,18,0.85)" : "transparent",
      backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
      borderBottom: scrollY > 40 ? `1px solid ${COLORS.glassBorder}` : "none",
      transition: "all 0.4s",
      padding: "0 max(24px, calc(50% - 680px))",
      display: "flex", alignItems: "center", height: 64,
    }}>
      {/* Logo */}
      <div onClick={() => setSection("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, color: "#fff",
        }}>U</div>
        <span style={{ fontWeight: 800, fontSize: 18, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif" }}>
          Ustal<span style={{ color: COLORS.primary }}>.dev</span>
        </span>
      </div>
      {/* Links */}
      <div style={{ display: "flex", gap: 4, marginRight: 20 }}>
        {links.map(([k, v]) => (
          <button key={k} onClick={() => setSection(k)} style={{
            background: section === k ? `${COLORS.primary}22` : "transparent",
            border: section === k ? `1px solid ${COLORS.primary}44` : "1px solid transparent",
            borderRadius: 8, padding: "6px 14px", color: section === k ? COLORS.primary : "#94A3B8",
            fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
          }}>{v}</button>
        ))}
      </div>
      {/* Lang switcher */}
      <div style={{ display: "flex", gap: 4, marginRight: 12 }}>
        {["en", "fr", "ar"].map(l => (
          <button key={l} onClick={() => setLang(l)} style={{
            background: lang === l ? COLORS.primary : "transparent",
            border: `1px solid ${lang === l ? COLORS.primary : COLORS.glassBorder}`,
            borderRadius: 6, padding: "4px 10px", color: lang === l ? "#fff" : "#64748B",
            fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textTransform: "uppercase",
          }}>{l}</button>
        ))}
      </div>
      {/* Admin */}
      <button onClick={onAdmin} style={{
        background: "linear-gradient(135deg, #0EA5E9, #6366F1)",
        border: "none", borderRadius: 8, padding: "7px 16px",
        color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
      }}>{t.nav.admin}</button>
    </nav>
  );
}

function HeroSection({ t, setSection, lang }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const i = setInterval(() => setTick(x => x + 1), 60); return () => clearInterval(i); }, []);
  const particles = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 37 + 5) % 100}%`, top: `${(i * 53 + 10) % 100}%`,
    width: `${4 + (i % 4) * 3}px`, height: `${4 + (i % 4) * 3}px`,
    animationDelay: `${i * 0.4}s`, animationDuration: `${6 + i % 4}s`,
    opacity: 0.3 + (i % 5) * 0.1,
  }));
  const isRTL = lang === "ar";
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", flexDirection: "column",
      padding: "120px 24px 80px", textAlign: "center",
      direction: isRTL ? "rtl" : "ltr",
    }}>
      <GlowOrb x="10%" y="20%" size="500px" color="#0EA5E9" />
      <GlowOrb x="70%" y="60%" size="400px" color="#6366F1" />
      <GlowOrb x="50%" y="80%" size="300px" color="#F59E0B" />
      {particles.map((p, i) => <Particle key={i} style={p} />)}
      {/* Grid bg */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04,
        backgroundImage: "linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.3)",
          borderRadius: 999, padding: "8px 20px", marginBottom: 32,
          animation: "fadeDown 0.8s both",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981", display: "inline-block", boxShadow: "0 0 8px #10B981" }} />
          <span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 600 }}>{t.hero.badge}</span>
        </div>
        {/* Headline */}
        <h1 style={{ margin: "0 0 24px", lineHeight: 1.1 }}>
          <span style={{ display: "block", fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif", animation: "fadeDown 0.8s 0.1s both" }}>{t.hero.line1}</span>
          <span style={{ display: "block", fontSize: "clamp(42px,7vw,88px)", fontWeight: 900, background: "linear-gradient(135deg, #0EA5E9, #6366F1, #A855F7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", fontFamily: "'Space Grotesk', sans-serif", animation: "fadeDown 0.8s 0.2s both" }}>{t.hero.line2}</span>
          <span style={{ display: "block", fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif", animation: "fadeDown 0.8s 0.3s both" }}>{t.hero.line3}</span>
        </h1>
        <p style={{ fontSize: "clamp(15px,2vw,18px)", color: "#64748B", maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7, animation: "fadeDown 0.8s 0.4s both" }}>{t.hero.sub}</p>
        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeDown 0.8s 0.5s both" }}>
          <button onClick={() => setSection("contact")} style={{
            background: "linear-gradient(135deg, #0EA5E9, #6366F1)", border: "none",
            borderRadius: 12, padding: "14px 32px", color: "#fff",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 0 30px rgba(14,165,233,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 0 50px rgba(14,165,233,0.6)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(14,165,233,0.4)"; }}
          >{t.hero.cta1} →</button>
          <button onClick={() => setSection("work")} style={{
            background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
            borderRadius: 12, padding: "14px 32px", color: "#94A3B8",
            fontSize: 15, fontWeight: 700, cursor: "pointer",
            backdropFilter: "blur(12px)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0EA5E9"; e.currentTarget.style.color = "#F1F5F9"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.glassBorder; e.currentTarget.style.color = "#94A3B8"; }}
          >{t.hero.cta2}</button>
        </div>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginTop: 64, animation: "fadeUp 0.8s 0.7s both" }}>
          {[
            { icon: "🚀", v: 14, l: t.hero.stat1 },
            { icon: "📱", v: 4, l: t.hero.stat2 },
            { icon: "🧠", v: 2, l: t.hero.stat3 },
            { icon: "📅", v: 2, l: t.hero.stat4 },
          ].map((s, i) => <StatBox key={i} icon={s.icon} value={s.v} label={s.l} delay={i * 100} />)}
        </div>
      </div>
    </section>
  );
}

function AboutSection({ t, lang }) {
  const isRTL = lang === "ar";
  return (
    <section style={{ padding: "100px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <SectionTitle title={t.about.title} sub={t.about.sub} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
        {[
          { label: t.about.mission, text: t.about.missionText, icon: "🎯", color: "#0EA5E9" },
          { label: t.about.vision, text: t.about.visionText, icon: "🔭", color: "#6366F1" },
        ].map(c => (
          <div key={c.label} style={{
            background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
            borderRadius: 20, padding: 32, backdropFilter: "blur(12px)",
          }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: c.color, marginBottom: 12, fontFamily: "'Space Grotesk', sans-serif" }}>{c.label}</div>
            <p style={{ color: "#64748B", lineHeight: 1.7 }}>{c.text}</p>
          </div>
        ))}
      </div>
      <div>
        <div style={{ textAlign: "center", fontWeight: 700, fontSize: 22, color: "#94A3B8", marginBottom: 32, fontFamily: "'Space Grotesk', sans-serif" }}>{t.about.why}</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {t.about.reasons.map(r => (
            <div key={r.t} style={{
              background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
              borderRadius: 16, padding: "24px 20px", textAlign: "center",
              backdropFilter: "blur(12px)", transition: "transform 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "none"}
            >
              <div style={{ fontSize: 32, marginBottom: 10 }}>{r.icon}</div>
              <div style={{ fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{r.t}</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ title, sub }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h2>
      {sub && <p style={{ color: "#64748B", fontSize: 16 }}>{sub}</p>}
    </div>
  );
}

function PortfolioSection({ t, lang }) {
  const [filter, setFilter] = useState("All");
  const isRTL = lang === "ar";
  const filterKeys = { All: "All", Mobile: "Mobile", Web: "Web", AI: "AI", Desktop: "Desktop", Tout: "All", "Tout": "All", ويب: "Web", موبايل: "Mobile", "ذكاء اصطناعي": "AI", "سطح المكتب": "Desktop", IA: "AI" };
  const filtered = filter === "All" || filter === "Tout" || filter === "الكل" ? PROJECTS : PROJECTS.filter(p => p.cat === (filterKeys[filter] || filter));
  return (
    <section style={{ padding: "100px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionTitle title={t.portfolio.title} sub={t.portfolio.sub} />
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
          {t.portfolio.filters.map((f, i) => (
            <button key={i} onClick={() => setFilter(f)} style={{
              background: filter === f ? "linear-gradient(135deg, #0EA5E9, #6366F1)" : COLORS.glass,
              border: `1px solid ${filter === f ? "transparent" : COLORS.glassBorder}`,
              borderRadius: 999, padding: "8px 20px", color: filter === f ? "#fff" : "#94A3B8",
              fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              backdropFilter: "blur(12px)",
            }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
        {filtered.map(p => <ProjectCard key={p.id} p={p} lang={lang} />)}
      </div>
    </section>
  );
}

function AISection({ lang }) {
  const isRTL = lang === "ar";
  return (
    <section style={{ padding: "80px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 24, padding: 40, backdropFilter: "blur(12px)" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag text="AI Architecture" color="#A855F7" />
          <h3 style={{ fontSize: 28, fontWeight: 900, color: "#F1F5F9", marginTop: 12, fontFamily: "'Space Grotesk', sans-serif" }}>Dermustal AI Pipeline</h3>
          <p style={{ color: "#64748B" }}>7-class skin cancer detection · 91.4% accuracy · TensorFlow Lite</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, flexWrap: "wrap" }}>
          {[
            { icon: "📸", label: "Image Upload", sub: "PNG/JPG input" },
            { icon: "🔧", label: "Preprocessing", sub: "224×224 resize + normalize" },
            { icon: "🧠", label: "CNN Model", sub: "MobileNetV2 fine-tuned" },
            { icon: "📊", label: "Softmax", sub: "7 class probabilities" },
            { icon: "✅", label: "Diagnosis", sub: "Result + confidence" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)",
                borderRadius: 16, padding: "20px 16px", textAlign: "center", minWidth: 100,
              }}>
                <div style={{ fontSize: 28 }}>{s.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#F1F5F9", marginTop: 6 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#64748B", marginTop: 2 }}>{s.sub}</div>
              </div>
              {i < 4 && <div style={{ width: 32, height: 2, background: "linear-gradient(90deg, #A855F7, #6366F1)", margin: "0 2px" }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginTop: 40 }}>
          {["Melanoma", "Basal Cell\nCarcinoma", "Squamous\nCell CA", "Actinic\nKeratosis", "Benign\nKeratosis", "Dermatofibroma", "Vascular\nLesion"].map((c, i) => (
            <div key={i} style={{
              background: `rgba(168,85,247,${0.05 + i * 0.02})`, border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: 10, padding: "12px 8px", textAlign: "center", fontSize: 11, color: "#94A3B8",
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🔬</div>
              {c}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursesSection({ t, lang }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState({ d: 14, h: 6, m: 22, s: 45 });
  const isRTL = lang === "ar";
  useEffect(() => {
    const i = setInterval(() => setTime(prev => {
      let { d, h, m, s } = prev;
      s--; if (s < 0) { s = 59; m--; }
      if (m < 0) { m = 59; h--; }
      if (h < 0) { h = 23; d--; }
      if (d < 0) { d = 0; h = 0; m = 0; s = 0; }
      return { d, h, m, s };
    }), 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <section style={{ padding: "100px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <span style={{
          display: "inline-block", background: "linear-gradient(135deg, #F59E0B, #EF4444)",
          borderRadius: 999, padding: "6px 20px", color: "#fff", fontWeight: 800,
          fontSize: 13, marginBottom: 24, letterSpacing: 1,
        }}>{t.courses.badge}</span>
        <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#F1F5F9", marginBottom: 8, fontFamily: "'Space Grotesk', sans-serif" }}>{t.courses.title}</h2>
        <p style={{ fontSize: 20, color: "#64748B", marginBottom: 32 }}>{t.courses.sub}</p>
        {/* Countdown */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginBottom: 32 }}>
          {[["d", time.d], ["h", time.h], ["m", time.m], ["s", time.s]].map(([l, v]) => (
            <div key={l} style={{
              background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
              borderRadius: 12, padding: "16px 20px", minWidth: 64, backdropFilter: "blur(12px)",
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.primary, fontFamily: "monospace" }}>{String(v).padStart(2, "0")}</div>
              <div style={{ fontSize: 11, color: "#475569", marginTop: 4, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
        {/* Price */}
        <div style={{ marginBottom: 24 }}>
          <span style={{ fontSize: 48, fontWeight: 900, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif" }}>{t.courses.price}</span>
          <div style={{ color: "#F59E0B", fontWeight: 700, marginTop: 4 }}>{t.courses.discount}</div>
        </div>
        {/* Features */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32, textAlign: "left" }}>
          {t.courses.features.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 10, backdropFilter: "blur(8px)" }}>
              <span style={{ color: "#10B981", fontWeight: 800 }}>✓</span>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>{f}</span>
            </div>
          ))}
        </div>
        {/* Registration */}
        {!submitted ? (
          <div style={{ display: "flex", gap: 10, maxWidth: 420, margin: "0 auto" }}>
            <input
              value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={{
                flex: 1, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
                borderRadius: 10, padding: "12px 16px", color: "#F1F5F9", fontSize: 14,
                outline: "none",
              }}
            />
            <button onClick={() => email && setSubmitted(true)} style={{
              background: "linear-gradient(135deg, #F59E0B, #EF4444)", border: "none",
              borderRadius: 10, padding: "12px 20px", color: "#fff", fontWeight: 700,
              cursor: "pointer", whiteSpace: "nowrap", fontSize: 13,
            }}>{t.courses.cta}</button>
          </div>
        ) : (
          <div style={{ padding: "16px 24px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 12, color: "#10B981", fontWeight: 700 }}>
            ✅ You're on the list! We'll contact you soon.
          </div>
        )}
        <p style={{ marginTop: 12, fontSize: 12, color: "#475569" }}>⚡ {t.courses.seats}</p>
      </div>
    </section>
  );
}

function ContactSection({ t, lang }) {
  const [form, setForm] = useState({ name: "", company: "", budget: "", timeline: "", type: "", desc: "" });
  const [sent, setSent] = useState(false);
  const isRTL = lang === "ar";
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const inputStyle = {
    width: "100%", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`,
    borderRadius: 10, padding: "12px 16px", color: "#F1F5F9", fontSize: 14,
    outline: "none", boxSizing: "border-box",
  };
  return (
    <section style={{ padding: "100px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionTitle title={t.contact.title} sub={t.contact.sub} />
      </div>
      {!sent ? (
        <div style={{ maxWidth: 640, margin: "0 auto", background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 24, padding: 40, backdropFilter: "blur(12px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.name}</label>
              <input style={inputStyle} value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.company}</label>
              <input style={inputStyle} value={form.company} onChange={set("company")} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
            <div>
              <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.budget}</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.budget} onChange={set("budget")}>
                <option value="">Select...</option>
                {t.contact.budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.timeline}</label>
              <select style={{ ...inputStyle, appearance: "none" }} value={form.timeline} onChange={set("timeline")}>
                <option value="">Select...</option>
                {t.contact.timelines.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.type}</label>
            <select style={{ ...inputStyle, appearance: "none" }} value={form.type} onChange={set("type")}>
              <option value="">Select...</option>
              {t.contact.types.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>{t.contact.desc}</label>
            <textarea style={{ ...inputStyle, height: 100, resize: "vertical" }} value={form.desc} onChange={set("desc")} />
          </div>
          <button
            onClick={() => form.name && form.desc && setSent(true)}
            style={{
              width: "100%", background: "linear-gradient(135deg, #0EA5E9, #6366F1)", border: "none",
              borderRadius: 12, padding: "14px", color: "#fff", fontWeight: 700, fontSize: 15,
              cursor: "pointer", transition: "opacity 0.2s",
            }}
          >{t.contact.submit} →</button>
        </div>
      ) : (
        <div style={{ textAlign: "center", maxWidth: 480, margin: "0 auto" }}>
          <div style={{ fontSize: 60, marginBottom: 16 }}>🚀</div>
          <h3 style={{ color: "#F1F5F9", fontWeight: 800, fontSize: 24, fontFamily: "'Space Grotesk', sans-serif" }}>Request Received!</h3>
          <p style={{ color: "#64748B" }}>We'll review your project and get back within 24 hours with a tailored proposal.</p>
          <button onClick={() => setSent(false)} style={{ marginTop: 20, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 10, padding: "10px 24px", color: "#94A3B8", cursor: "pointer" }}>Submit Another</button>
        </div>
      )}
    </section>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(false);
  const inp = { background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 10, padding: "12px 16px", color: "#F1F5F9", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box" };
  const tryLogin = () => {
    if (u === "admin" && p === "ustal2024") onLogin();
    else setErr(true);
  };
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.darker, position: "relative" }}>
      <GlowOrb x="20%" y="30%" size="400px" color="#0EA5E9" />
      <GlowOrb x="70%" y="70%" size="300px" color="#6366F1" />
      <div style={{ width: 400, background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 24, padding: 40, backdropFilter: "blur(20px)", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #0EA5E9, #6366F1)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, fontWeight: 900, color: "#fff" }}>U</div>
          <h2 style={{ color: "#F1F5F9", fontWeight: 900, fontSize: 22, fontFamily: "'Space Grotesk', sans-serif", margin: 0 }}>Admin Access</h2>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 4 }}>Ustal.dev Control Panel</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>Username</label>
          <input style={inp} value={u} onChange={e => setU(e.target.value)} onKeyDown={e => e.key === "Enter" && tryLogin()} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 6 }}>Password</label>
          <input style={inp} type="password" value={p} onChange={e => setP(e.target.value)} onKeyDown={e => e.key === "Enter" && tryLogin()} />
        </div>
        {err && <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: "8px 12px", color: "#EF4444", fontSize: 13, marginBottom: 16 }}>Invalid credentials. Try admin / ustal2024</div>}
        <button onClick={tryLogin} style={{ width: "100%", background: "linear-gradient(135deg, #0EA5E9, #6366F1)", border: "none", borderRadius: 12, padding: "13px", color: "#fff", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>Login →</button>
        <p style={{ textAlign: "center", marginTop: 16, color: "#334155", fontSize: 12 }}>Demo: admin / ustal2024</p>
      </div>
    </div>
  );
}

function AdminDashboard({ t, onExit }) {
  const [tab, setTab] = useState(0);
  const [projects, setProjects] = useState(PROJECTS);
  const [requests, setRequests] = useState(ADMIN_REQUESTS);
  const [editing, setEditing] = useState(null);
  const tabs = t.admin.tabs;

  const metrics = [
    { label: "Total Projects", val: projects.length, icon: "🚀", color: "#0EA5E9" },
    { label: "Pending Requests", val: requests.filter(r => r.status === "Pending").length, icon: "📥", color: "#F59E0B" },
    { label: "Approved Deals", val: requests.filter(r => r.status === "Approved").length, icon: "✅", color: "#10B981" },
    { label: "Revenue Est.", val: "$68K+", icon: "💰", color: "#A855F7", raw: true },
  ];

  const updateStatus = (id, status) => setRequests(rs => rs.map(r => r.id === id ? { ...r, status } : r));

  return (
    <div style={{ minHeight: "100vh", background: COLORS.darker, display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: COLORS.glass, borderRight: `1px solid ${COLORS.glassBorder}`, backdropFilter: "blur(20px)", padding: "24px 0", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "0 20px 24px", borderBottom: `1px solid ${COLORS.glassBorder}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #0EA5E9, #6366F1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "#fff", fontSize: 14 }}>U</div>
            <span style={{ fontWeight: 800, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif" }}>Ustal.dev</span>
          </div>
        </div>
        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {tabs.map((tb, i) => (
            <button key={i} onClick={() => setTab(i)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              background: tab === i ? "rgba(14,165,233,0.15)" : "transparent",
              border: `1px solid ${tab === i ? "rgba(14,165,233,0.3)" : "transparent"}`,
              borderRadius: 8, padding: "10px 12px", color: tab === i ? COLORS.primary : "#64748B",
              fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 4, textAlign: "left",
              transition: "all 0.2s",
            }}>
              {["📊", "🗂️", "📥", "🎓", "⚙️"][i]} {tb}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 12px" }}>
          <button onClick={onExit} style={{ width: "100%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 8, padding: "10px", color: "#EF4444", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>← Exit Admin</button>
        </div>
      </div>
      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", padding: 32 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontWeight: 900, fontSize: 24, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif", margin: "0 0 4px" }}>{t.admin.title}</h1>
          <p style={{ color: "#475569", fontSize: 14 }}>Welcome back, Admin</p>
        </div>
        {tab === 0 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 32 }}>
              {metrics.map(m => (
                <div key={m.label} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 20, backdropFilter: "blur(12px)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ color: "#64748B", fontSize: 12, marginBottom: 6 }}>{m.label}</div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: m.color, fontFamily: "'Space Grotesk', sans-serif" }}>{m.raw ? m.val : m.val}</div>
                    </div>
                    <div style={{ fontSize: 28 }}>{m.icon}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* Recent Requests */}
            <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 24, backdropFilter: "blur(12px)" }}>
              <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 16, fontFamily: "'Space Grotesk', sans-serif" }}>Recent Project Requests</h3>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>{["Client", "Company", "Type", "Budget", "Status", "Date"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#475569", fontSize: 12, fontWeight: 700, borderBottom: `1px solid ${COLORS.glassBorder}` }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {requests.map(r => (
                    <tr key={r.id}>
                      {[r.name, r.company, r.type, r.budget].map((v, i) => <td key={i} style={{ padding: "12px 12px", color: "#94A3B8", fontSize: 13, borderBottom: `1px solid ${COLORS.glassBorder}` }}>{v}</td>)}
                      <td style={{ padding: "12px 12px", borderBottom: `1px solid ${COLORS.glassBorder}` }}>
                        <span style={{ background: STATUS_COLORS[r.status] + "22", border: `1px solid ${STATUS_COLORS[r.status]}44`, color: STATUS_COLORS[r.status], borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{r.status}</span>
                      </td>
                      <td style={{ padding: "12px 12px", color: "#475569", fontSize: 12, borderBottom: `1px solid ${COLORS.glassBorder}` }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {tab === 1 && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ color: "#F1F5F9", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif" }}>Projects ({projects.length})</h2>
              <button style={{ background: "linear-gradient(135deg, #0EA5E9, #6366F1)", border: "none", borderRadius: 8, padding: "8px 16px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13 }}>+ Add Project</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
              {projects.map(p => (
                <div key={p.id} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 12, padding: 16, backdropFilter: "blur(8px)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 14 }}>{p.name}</div>
                      <Tag text={p.cat} color={p.color} />
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 6, padding: "4px 8px", color: COLORS.primary, fontSize: 11, cursor: "pointer" }}>Edit</button>
                      <button style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, padding: "4px 8px", color: "#EF4444", fontSize: 11, cursor: "pointer" }}>Del</button>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B", marginTop: 8, lineHeight: 1.5 }}>{p.desc.slice(0, 80)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 2 && (
          <div>
            <h2 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>Project Requests</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {requests.map(r => (
                <div key={r.id} style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 14, padding: "20px 24px", backdropFilter: "blur(12px)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, color: "#F1F5F9", marginBottom: 4 }}>{r.name} — <span style={{ color: "#64748B", fontWeight: 500 }}>{r.company}</span></div>
                    <div style={{ fontSize: 13, color: "#64748B" }}>{r.type} · {r.budget} · {r.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ background: STATUS_COLORS[r.status] + "22", border: `1px solid ${STATUS_COLORS[r.status]}44`, color: STATUS_COLORS[r.status], borderRadius: 999, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{r.status}</span>
                    <select
                      value={r.status}
                      onChange={e => updateStatus(r.id, e.target.value)}
                      style={{ background: "#0F172A", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 8, padding: "4px 10px", color: "#94A3B8", fontSize: 12, cursor: "pointer", outline: "none" }}
                    >
                      {["Pending", "Reviewed", "Contacted", "Quotation Sent", "Approved"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button style={{ background: "rgba(14,165,233,0.1)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 8, padding: "6px 14px", color: COLORS.primary, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>📄 Generate PDF</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 3 && (
          <div>
            <h2 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>Flutter & Firebase Course</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 24, backdropFilter: "blur(12px)" }}>
                <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 16 }}>Course Settings</h3>
                {[["Price (USD)", "$97"], ["Discount Seats", "20"], ["Discount %", "40%"], ["Start Date", "2025-07-15"]].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, color: "#64748B", fontWeight: 600, display: "block", marginBottom: 4 }}>{l}</label>
                    <input defaultValue={v} style={{ width: "100%", background: "#0F172A", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 8, padding: "8px 12px", color: "#F1F5F9", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
                <button style={{ background: "linear-gradient(135deg, #0EA5E9, #6366F1)", border: "none", borderRadius: 10, padding: "10px 20px", color: "#fff", fontWeight: 700, cursor: "pointer" }}>Save Settings</button>
              </div>
              <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 24, backdropFilter: "blur(12px)" }}>
                <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 16 }}>Registered Students (4)</h3>
                {["Amira Hadj", "Karim Bouras", "Salma Tazi", "Mohamed Ali"].map((s, i) => (
                  <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.glassBorder}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: `hsl(${i * 60},70%,50%)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" }}>{s[0]}</div>
                      <span style={{ color: "#94A3B8", fontSize: 13 }}>{s}</span>
                    </div>
                    <span style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 999, padding: "2px 10px", fontSize: 11, color: "#10B981", fontWeight: 700 }}>Discounted</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === 4 && (
          <div>
            <h2 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 20, fontFamily: "'Space Grotesk', sans-serif" }}>Site Content & Translations</h2>
            <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 24, backdropFilter: "blur(12px)", marginBottom: 16 }}>
              <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 16 }}>Hero Section</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {["EN", "FR", "AR"].map(lang => (
                  <div key={lang}>
                    <label style={{ fontSize: 11, color: "#64748B", fontWeight: 700, display: "block", marginBottom: 6 }}>Headline — {lang}</label>
                    <input defaultValue={lang === "EN" ? "We Build Intelligent Digital Systems" : lang === "FR" ? "Nous Construisons des Systèmes Numériques" : "نبني الأنظمة الرقمية الذكية"} style={{ width: "100%", background: "#0F172A", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 8, padding: "8px 12px", color: "#F1F5F9", fontSize: 12, outline: "none", boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: COLORS.glass, border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 24, backdropFilter: "blur(12px)" }}>
              <h3 style={{ color: "#F1F5F9", fontWeight: 700, marginBottom: 16 }}>Role-Based Access</h3>
              <div style={{ display: "flex", gap: 12 }}>
                {[{ role: "Super Admin", perms: "Full access", color: "#EF4444" }, { role: "Content Editor", perms: "Content + Portfolio", color: "#F59E0B" }, { role: "Support", perms: "Requests only", color: "#3B82F6" }].map(r => (
                  <div key={r.role} style={{ flex: 1, background: `${r.color}11`, border: `1px solid ${r.color}33`, borderRadius: 12, padding: 16 }}>
                    <div style={{ fontWeight: 700, color: r.color, marginBottom: 4 }}>{r.role}</div>
                    <div style={{ fontSize: 12, color: "#64748B" }}>{r.perms}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ARCHITECTURE DOCS ────────────────────────────────────────────────────────
function ArchDocs() {
  const [activeDoc, setActiveDoc] = useState(0);
  const docs = [
    {
      title: "📁 Folder Structure",
      content: `ustal-dev/
├── apps/
│   └── web/                     # Next.js App Router
│       ├── app/
│       │   ├── (public)/
│       │   │   ├── page.tsx     # Home
│       │   │   ├── portfolio/
│       │   │   ├── courses/
│       │   │   └── contact/
│       │   ├── admin/
│       │   │   ├── layout.tsx   # Auth guard
│       │   │   ├── dashboard/
│       │   │   ├── projects/
│       │   │   ├── requests/
│       │   │   └── courses/
│       │   ├── api/
│       │   │   ├── projects/
│       │   │   ├── requests/
│       │   │   └── quotation/
│       │   └── layout.tsx
│       ├── components/
│       │   ├── ui/              # shadcn/ui components
│       │   ├── sections/        # Hero, About, Portfolio...
│       │   └── admin/           # Dashboard components
│       ├── lib/
│       │   ├── firebase.ts      # Firebase init
│       │   ├── auth.ts          # Auth utilities
│       │   └── db.ts            # Firestore helpers
│       └── types/
├── packages/
│   ├── ui/                      # Shared design system
│   ├── config/                  # Shared config
│   └── tsconfig/
└── docs/                        # Architecture docs`
    },
    {
      title: "🗄️ Firestore Schema",
      content: `// projects collection
projects/{id} {
  name: string
  category: "Mobile" | "Web" | "AI" | "Desktop"
  description: { en: string, fr: string, ar: string }
  stack: string[]
  metrics: Record<string, string>
  images: string[]        // Storage URLs
  order: number
  published: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

// requests collection  
requests/{id} {
  name: string
  company: string
  email: string
  budget: string
  timeline: string
  type: string
  description: string
  files: string[]
  status: "Pending" | "Reviewed" | "Contacted" | 
          "Quotation Sent" | "Approved"
  adminNotes: string
  quotationUrl: string
  createdAt: Timestamp
}

// courses collection
courses/{id} {
  title: string
  price: number
  discountPrice: number
  discountSeats: number
  seatsUsed: number
  startDate: Timestamp
  students: subcollection
}

// content collection (CMS)
content/hero {
  headline: { en: string, fr: string, ar: string }
  subheading: { en: string, fr: string, ar: string }
}

// users collection (admin roles)
users/{uid} {
  email: string
  role: "super_admin" | "editor" | "support"
  createdAt: Timestamp
}`
    },
    {
      title: "🔒 Firebase Security Rules",
      content: `rules_version = '2';
service cloud.firestore {
  match /databases/{db}/documents {

    // Public read for published projects
    match /projects/{id} {
      allow read: if resource.data.published == true;
      allow write: if isAdmin();
    }

    // Public create for requests
    match /requests/{id} {
      allow create: if validRequest();
      allow read, update: if isAdmin();
    }

    // Courses — public read, admin write
    match /courses/{id} {
      allow read: if true;
      allow write: if isAdmin();
      match /students/{sid} {
        allow create: if true;
        allow read: if isAdmin() || 
          request.auth.uid == sid;
      }
    }

    // CMS content — public read
    match /content/{doc} {
      allow read: if true;
      allow write: if isSuperAdmin();
    }

    // Admin users — super admin only
    match /users/{uid} {
      allow read: if request.auth.uid == uid;
      allow write: if isSuperAdmin();
    }

    function isAdmin() {
      return request.auth != null &&
        get(/users/$(request.auth.uid)).data.role in 
        ['super_admin', 'editor', 'support'];
    }

    function isSuperAdmin() {
      return request.auth != null &&
        get(/users/$(request.auth.uid)).data.role == 
        'super_admin';
    }

    function validRequest() {
      return request.resource.data.keys().hasAll(
        ['name', 'email', 'type', 'description']
      );
    }
  }
}`
    },
    {
      title: "🚀 Deployment Guide",
      content: `# Ustal.dev Deployment Guide

## Environment Variables (.env.local)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_GA_ID=
ADMIN_EMAIL=admin@ustal.dev
RESEND_API_KEY=               # Email notifications
OPENAI_API_KEY=               # Docusmart AI

## Firebase Hosting (firebase.json)
{
  "hosting": {
    "public": ".next",
    "rewrites": [{"source":"**","destination":"/index.html"}],
    "headers": [{
      "source": "**/*.@(js|css)",
      "headers": [{"key":"Cache-Control","value":"max-age=31536000"}]
    }]
  }
}

## GitHub Actions CI/CD (.github/workflows/deploy.yml)
on: push: branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: node-version: 18
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SA }}
          projectId: ustal-dev

## Performance Checklist ✅
□ next/image for all images
□ Static generation for portfolio pages
□ ISR (60s) for project listings  
□ Route prefetching enabled
□ Bundle analyzer: < 200KB first load
□ Lighthouse CI: target 95+
□ CDN: Firebase Hosting edge caching
□ Fonts: next/font (no layout shift)`
    },
    {
      title: "⚡ Performance Strategy",
      content: `# Performance Optimization (Lighthouse 95+)

## Core Web Vitals Targets
LCP (Largest Contentful Paint): < 1.5s
FID (First Input Delay):         < 50ms
CLS (Cumulative Layout Shift):   < 0.05
TTFB (Time to First Byte):       < 200ms

## Next.js Optimizations
// 1. Image optimization
import Image from 'next/image'
<Image 
  src={project.image} 
  priority={i === 0}    // LCP hero image
  placeholder="blur"
  blurDataURL={base64}
  sizes="(max-width:768px) 100vw, 50vw"
/>

// 2. ISR for portfolio
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map(p => ({ id: p.id }))
}
export const revalidate = 60  // seconds

// 3. Dynamic imports (code splitting)
const AdminDashboard = dynamic(
  () => import('@/components/admin/Dashboard'),
  { loading: () => <Skeleton />, ssr: false }
)

// 4. Font optimization
import { Space_Grotesk, Noto_Sans_Arabic } from 'next/font'
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] })
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'] })

## Bundle Size
- Framer Motion: import { motion } from 'framer-motion/client'
- Lodash: import debounce from 'lodash/debounce'
- Tree-shake Firebase: import specific SDKs only

## Caching Strategy
- Static assets: Cache-Control: max-age=31536000
- API routes: stale-while-revalidate=60
- Firestore: offline persistence enabled
- Service Worker: cache portfolio data offline`
    },
  ];

  return (
    <div style={{ padding: "80px max(24px, calc(50% - 780px))" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <SectionTitle title="Architecture Docs" sub="Production-ready technical documentation" />
      </div>
      <div style={{ display: "flex", gap: 24 }}>
        <div style={{ width: 220, flexShrink: 0 }}>
          {docs.map((d, i) => (
            <button key={i} onClick={() => setActiveDoc(i)} style={{
              width: "100%", background: activeDoc === i ? "rgba(14,165,233,0.15)" : COLORS.glass,
              border: `1px solid ${activeDoc === i ? "rgba(14,165,233,0.3)" : COLORS.glassBorder}`,
              borderRadius: 10, padding: "10px 14px", color: activeDoc === i ? COLORS.primary : "#64748B",
              fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "left",
              marginBottom: 6, backdropFilter: "blur(8px)", transition: "all 0.2s",
            }}>{d.title}</button>
          ))}
        </div>
        <div style={{ flex: 1, background: "#0F172A", border: `1px solid ${COLORS.glassBorder}`, borderRadius: 16, padding: 28, overflow: "auto" }}>
          <pre style={{ margin: 0, fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: 12.5, lineHeight: 1.7, color: "#94A3B8", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {docs[activeDoc].content}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ─── FLOATING ELEMENTS ────────────────────────────────────────────────────────
function WhatsApp() {
  return (
    <a href="https://wa.me/your-number" target="_blank" rel="noopener noreferrer" style={{
      position: "fixed", bottom: 28, right: 28, width: 52, height: 52,
      background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 20px rgba(37,211,102,0.5)", zIndex: 900, cursor: "pointer",
      transition: "transform 0.2s",
      textDecoration: "none", fontSize: 24,
    }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >💬</a>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer({ lang }) {
  const isRTL = lang === "ar";
  return (
    <footer style={{ background: "#010409", borderTop: `1px solid ${COLORS.glassBorder}`, padding: "48px max(24px, calc(50% - 680px))", direction: isRTL ? "rtl" : "ltr" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 20, color: "#F1F5F9", fontFamily: "'Space Grotesk', sans-serif", marginBottom: 4 }}>
            Ustal<span style={{ color: COLORS.primary }}>.dev</span>
          </div>
          <div style={{ color: "#334155", fontSize: 13 }}>Intelligent Digital Systems · Since 2023</div>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["GitHub", "LinkedIn", "Twitter", "Behance"].map(s => (
            <a key={s} href="#" style={{ color: "#475569", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = COLORS.primary}
              onMouseLeave={e => e.currentTarget.style.color = "#475569"}>{s}</a>
          ))}
        </div>
        <div style={{ color: "#334155", fontSize: 12 }}>© 2025 Ustal.dev · All rights reserved</div>
      </div>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("en");
  const [section, setSection] = useState("home");
  const [showAdmin, setShowAdmin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const t = TRANSLATIONS[lang];
  const isRTL = lang === "ar";

  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800;900&family=Fira+Code&display=swap";
    document.head.appendChild(font);
  }, [isRTL]);

  if (showAdmin) {
    if (!adminLoggedIn) return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    return <AdminDashboard t={t} onExit={() => { setShowAdmin(false); setAdminLoggedIn(false); }} />;
  }

  const scrollToSection = (s) => {
    setSection(s);
    const el = document.getElementById(`section-${s}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ background: COLORS.dark, minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", color: "#F1F5F9", overflowX: "hidden" }}>
      <style>{`
        @keyframes float { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.05); } }
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-24px); } to { opacity: 1; transform: none; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #010409; } ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }
        select option { background: #0F172A; color: #F1F5F9; }
      `}</style>

      <Navbar lang={lang} setLang={setLang} section={section} setSection={scrollToSection} onAdmin={() => setShowAdmin(true)} t={t} />

      <div id="section-home"><HeroSection t={t} setSection={scrollToSection} lang={lang} /></div>
      <div id="section-work" style={{ borderTop: `1px solid ${COLORS.glassBorder}` }}>
        <AboutSection t={t} lang={lang} />
        <PortfolioSection t={t} lang={lang} />
        <AISection lang={lang} />
      </div>
      <div id="section-courses" style={{ borderTop: `1px solid ${COLORS.glassBorder}` }}>
        <CoursesSection t={t} lang={lang} />
      </div>
      <div id="section-contact" style={{ borderTop: `1px solid ${COLORS.glassBorder}` }}>
        <ContactSection t={t} lang={lang} />
      </div>
      <div style={{ borderTop: `1px solid ${COLORS.glassBorder}` }}>
        <ArchDocs />
      </div>
      <Footer lang={lang} />
      <WhatsApp />
    </div>
  );
}
