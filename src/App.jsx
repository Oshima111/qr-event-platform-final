import { useState, useEffect, useRef, useCallback } from "react"
import {
  Calendar, MapPin, Users, Clock, QrCode, Star, ArrowRight, ArrowLeft,
  CheckCircle2, MessageSquare, BarChart3, Settings, LogOut, Search,
  Plus, Download, Trash2, ScanLine, ChevronRight, ChevronDown, Award,
  FileText, Image as ImageIcon, CheckSquare, Square, Copy, Globe, Tag,
  TrendingUp, Percent, AlertCircle, X, Lock, UserCheck, Link as LinkIcon,
  RefreshCw, Mail, User, Send, MapPinned, Sparkles, Trophy, ClipboardList,
  Ticket, DollarSign, Building2, Instagram, Linkedin, Facebook,
  Shield, FileCheck, Upload, Eye, Wand2, Check, Minus,
  ChevronLeft, Hourglass, BadgeCheck, ExternalLink, Twitter, Briefcase,
  CalendarPlus, Share2, Pencil, Receipt, ImageDown, Search as SearchIcon, FileSpreadsheet, Clock3
} from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RPieChart, Pie, Cell } from "recharts"

const PIE_COLORS = ["#1a1a2e", "#e94560", "#f59e0b", "#0f9d8f", "#6d28d9"]

// ─── STORE ──────────────────────────────────────────────────────────────────
function createStore() {
  const ORG = {
    id: "org-001", name: "TechHub Manila", description: "A community of builders, designers, and founders hosting events across Metro Manila.",
    organizedBy: "Rimuel Salibio", email: "hello@techhub.ph", industry: "Technology",
    socials: { instagram: "techhubmnl", linkedin: "techhub-manila", facebook: "techhubmnl", website: "techhub.ph", twitter: "techhubmnl" },
    privacyPolicyUrl: "https://techhub.ph/privacy",
  }
  const EVENTS = [
    { id: "evt-001", title: "AI in Education Summit 2025", type: "Conference", isPrivate: false, slug: "ai-education-summit-2025", privateLink: null,
      description: "Exploring how AI and machine learning are reshaping academic institutions. Join keynote speakers, live demos, and hands-on workshops with leaders in EdTech.",
      venue: "Main Auditorium, BGC", location: "Taguig City, Metro Manila", date: "2025-08-15", startTime: "08:00", endTime: "17:00",
      organizedBy: "Dr. Maria Santos", industry: "Education", capacity: 150, status: "approved", feedbackEnabled: true,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80", requiresCertificate: true, pricing: "free", price: 0, allowWalkIns: true,
      socials: { instagram: "aisummit", linkedin: "ai-education-summit", website: "aisummit.ph" }, privacyPolicyUrl: "https://techhub.ph/privacy",
      customFields: [{ id: "cf1", label: "Dietary restrictions", type: "text", required: false }],
      tasks: [{ id: "t1", label: "Send invitations", done: true }, { id: "t2", label: "Confirm AV equipment", done: true }, { id: "t3", label: "Prepare name tags", done: false }, { id: "t4", label: "Print certificates", done: false }],
      createdAt: "2025-06-01T08:00:00", tags: ["AI", "Education"] },
    { id: "evt-002", title: "Founder Networking Night", type: "Networking", isPrivate: false, slug: "founder-networking-night", privateLink: null,
      description: "An intimate evening for startup founders to connect, share war stories, and find collaborators. Drinks and light bites included.",
      venue: "The Rooftop, Makati", location: "Makati City, Metro Manila", date: "2025-09-20", startTime: "18:00", endTime: "21:00",
      organizedBy: "TechHub Manila", industry: "Technology", capacity: 60, status: "approved", feedbackEnabled: true,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=80", requiresCertificate: false, pricing: "paid", price: 500, allowWalkIns: false,
      socials: { instagram: "techhubmnl", linkedin: "techhub-manila" }, privacyPolicyUrl: "https://techhub.ph/privacy",
      customFields: [{ id: "cf1", label: "Company / Startup name", type: "text", required: true }, { id: "cf2", label: "What are you building?", type: "text", required: false }],
      tasks: [{ id: "t1", label: "Book venue", done: true }, { id: "t2", label: "Arrange catering", done: false }, { id: "t3", label: "Confirm RSVP list", done: false }],
      createdAt: "2025-07-01T10:00:00", tags: ["Startup", "Networking"] },
    { id: "evt-003", title: "Cybersecurity Awareness Workshop", type: "Workshop", isPrivate: true, slug: "cybersecurity-workshop-2025", privateLink: "sec-access-7f3d",
      description: "Internal cybersecurity training for staff. Live threat demonstrations and best practices for keeping data safe.",
      venue: "ICT Training Center", location: "Pasig City, Metro Manila", date: "2025-07-10", startTime: "13:00", endTime: "17:00",
      organizedBy: "IT Department", industry: "Technology", capacity: 100, status: "completed", feedbackEnabled: true,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80", requiresCertificate: true, pricing: "walk-in", price: 0, allowWalkIns: true,
      socials: {}, privacyPolicyUrl: "https://techhub.ph/privacy", customFields: [],
      tasks: [{ id: "t1", label: "Prepare slides", done: true }, { id: "t2", label: "Test demo environment", done: true }, { id: "t3", label: "Issue certificates", done: true }],
      createdAt: "2025-06-15T14:00:00", tags: ["Security"] },
    { id: "evt-004", title: "Design Systems Meetup", type: "Meetup", isPrivate: false, slug: "design-systems-meetup", privateLink: null,
      description: "Monthly gathering for product designers. This month: scaling design tokens across teams.",
      venue: "Co-Lab Space, Ortigas", location: "Pasig City, Metro Manila", date: "2025-10-05", startTime: "14:00", endTime: "17:00",
      organizedBy: "Design Guild PH", industry: "Design", capacity: 40, status: "pending", feedbackEnabled: true,
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80", requiresCertificate: false, pricing: "free", price: 0, allowWalkIns: true,
      socials: { instagram: "designguildph" }, privacyPolicyUrl: "", customFields: [], tasks: [],
      createdAt: "2025-07-20T09:00:00", tags: ["Design"] },
  ]
  const REGISTRATIONS = [
    { id: "reg-001", eventId: "evt-001", name: "Juan Dela Cruz", email: "juan@edu.ph", customData: { cf1: "Vegetarian" }, qrCode: "QR-E001-P001", registeredAt: "2025-07-01T08:30:00", attended: false, checkInTime: null, feedbackSubmitted: false, isWalkIn: false, needsCertificate: true },
    { id: "reg-002", eventId: "evt-001", name: "Maria Garcia", email: "maria@edu.ph", customData: {}, qrCode: "QR-E001-P002", registeredAt: "2025-07-02T10:15:00", attended: false, checkInTime: null, feedbackSubmitted: false, isWalkIn: false, needsCertificate: false },
    { id: "reg-003", eventId: "evt-002", name: "Angela Torres", email: "angela@startup.ph", customData: { cf1: "Acme AI", cf2: "Developer tools" }, qrCode: "QR-E002-P001", registeredAt: "2025-08-05T09:00:00", attended: false, checkInTime: null, feedbackSubmitted: false, isWalkIn: false, needsCertificate: false },
    { id: "reg-004", eventId: "evt-003", name: "Roberto Santos", email: "roberto@edu.ph", customData: {}, qrCode: "QR-E003-P001", registeredAt: "2025-06-20T11:30:00", attended: true, checkInTime: "2025-07-10T13:05:00", feedbackSubmitted: true, isWalkIn: false, needsCertificate: true },
    { id: "reg-005", eventId: "evt-003", name: "Mark Lim", email: "mark@edu.ph", customData: {}, qrCode: "QR-E003-P002", registeredAt: "2025-06-22T13:00:00", attended: true, checkInTime: "2025-07-10T13:12:00", feedbackSubmitted: true, isWalkIn: false, needsCertificate: true },
    { id: "reg-006", eventId: "evt-003", name: "Walk-in Guest", email: "walkin-001@tmp", customData: {}, qrCode: "QR-E003-WI001", registeredAt: "2025-07-10T13:00:00", attended: true, checkInTime: "2025-07-10T13:00:00", feedbackSubmitted: false, isWalkIn: true, needsCertificate: false },
  ]
  const FEEDBACK = [
    { id: "fb-001", registrationId: "reg-004", eventId: "evt-003", q1: 5, q2: 5, q3: 4, q4: 5, q5: 5, comment: "Excellent workshop! The hands-on demos were eye-opening. Would love a follow-up session.", submittedAt: "2025-07-10T16:45:00", isHighlighted: true, badge: "⭐ Top Reviewer" },
    { id: "fb-002", registrationId: "reg-005", eventId: "evt-003", q1: 4, q2: 5, q3: 5, q4: 4, q5: 4, comment: "Very informative. The QR check-in was super smooth.", submittedAt: "2025-07-10T16:30:00", isHighlighted: false, badge: null },
  ]
  const TASK_TEMPLATES = [
    { id: "tmpl-001", name: "Conference Standard", tasks: ["Send invitations", "Confirm AV equipment", "Prepare name tags", "Print certificates", "Set up registration booth"] },
    { id: "tmpl-002", name: "Workshop Checklist", tasks: ["Book venue", "Prepare materials", "Send calendar invites", "Arrange refreshments"] },
    { id: "tmpl-003", name: "Meetup Basic", tasks: ["Confirm venue", "Post on socials", "Prepare sign-in sheet"] },
  ]
  let events = [...EVENTS], registrations = [...REGISTRATIONS], feedback = [...FEEDBACK], taskTemplates = [...TASK_TEMPLATES], org = { ...ORG }
  return {
    getEvents: () => events,
    getEvent: (id) => events.find(e => e.id === id),
    getPublicEvents: () => events.filter(e => !e.isPrivate && e.status === "approved"),
    addEvent: (ev) => {
      const id = `evt-${String(events.length + 1).padStart(3, "0")}`
      const slug = ev.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      const tasks = ev.taskTemplateId ? (taskTemplates.find(t => t.id === ev.taskTemplateId)?.tasks || []).map((label, i) => ({ id: `t${i+1}`, label, done: false })) : (ev.tasks || [])
      const newEv = { ...ev, id, slug, tasks, status: "pending", createdAt: new Date().toISOString() }
      events = [newEv, ...events]; return newEv
    },
    updateEvent: (id, upd) => { events = events.map(e => e.id === id ? { ...e, ...upd } : e) },
    approveEvent: (id) => { events = events.map(e => e.id === id ? { ...e, status: "approved" } : e) },
    rejectEvent: (id) => { events = events.map(e => e.id === id ? { ...e, status: "rejected" } : e) },
    toggleTask: (eventId, taskId) => { events = events.map(e => e.id === eventId ? { ...e, tasks: e.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t) } : e) },
    addTask: (eventId, label) => { events = events.map(e => e.id === eventId ? { ...e, tasks: [...e.tasks, { id: `t${Date.now()}`, label, done: false }] } : e) },
    deleteEvent: (id) => { events = events.filter(e => e.id !== id); registrations = registrations.filter(r => r.eventId !== id); feedback = feedback.filter(f => f.eventId !== id) },
    getRegistrations: (eventId) => eventId ? registrations.filter(r => r.eventId === eventId) : registrations,
    getRegistration: (id) => registrations.find(r => r.id === id),
    findRegistrationsByEmail: (email) => registrations.filter(r => r.email.toLowerCase() === email.toLowerCase().trim()),
    verifyPayment: (regId, approved) => { registrations = registrations.map(r => r.id === regId ? { ...r, paymentStatus: approved ? "verified" : "rejected" } : r) },
    addRegistration: (reg) => {
      const idx = registrations.filter(r => r.eventId === reg.eventId).length + 1
      const evNum = reg.eventId.replace("evt-", "")
      const prefix = reg.isWalkIn ? "WI" : "P"
      const newReg = { ...reg, id: `reg-${Date.now()}`, qrCode: `QR-E${evNum}-${prefix}${String(idx).padStart(3,"0")}`, registeredAt: new Date().toISOString(), attended: !!reg.isWalkIn, checkInTime: reg.isWalkIn ? new Date().toISOString() : null, feedbackSubmitted: false, paymentStatus: reg.paymentRef ? "pending" : "n/a" }
      registrations = [...registrations, newReg]; return newReg
    },
    markAttendance: (qr) => {
      const reg = registrations.find(r => r.qrCode === qr)
      if (!reg) return { success: false, type: "not_found" }
      if (reg.attended) return { success: false, type: "duplicate", registration: reg }
      registrations = registrations.map(r => r.id === reg.id ? { ...r, attended: true, checkInTime: new Date().toISOString() } : r)
      return { success: true, registration: registrations.find(r => r.id === reg.id) }
    },
    getFeedback: (eventId) => eventId ? feedback.filter(f => f.eventId === eventId) : feedback,
    addFeedback: (fb) => {
      const count = feedback.filter(f => f.eventId === fb.eventId).length
      const badge = count >= 2 ? "🏆 Super Reviewer" : count >= 1 ? "⭐ Top Reviewer" : null
      const newFb = { ...fb, id: `fb-${Date.now()}`, submittedAt: new Date().toISOString(), isHighlighted: (fb.q1+fb.q2+fb.q3+fb.q4+fb.q5)/5 >= 4.5 || fb.isImportant, badge }
      feedback = [...feedback, newFb]
      registrations = registrations.map(r => r.id === fb.registrationId ? { ...r, feedbackSubmitted: true } : r)
      return newFb
    },
    getTaskTemplates: () => taskTemplates,
    addTaskTemplate: (tmpl) => { const newT = { ...tmpl, id: `tmpl-${Date.now()}` }; taskTemplates = [...taskTemplates, newT]; return newT },
    getOrg: () => org,
    updateOrg: (upd) => { org = { ...org, ...upd } },
    getAnalytics: () => {
      const regs = registrations, att = regs.filter(r => r.attended), fb = feedback
      const avg = fb.length > 0 ? fb.reduce((s, f) => s + (f.q1+f.q2+f.q3+f.q4+f.q5)/5, 0) / fb.length : 0
      return { totalEvents: events.filter(e => e.status === "approved").length, totalRegistrations: regs.length, totalAttended: att.length, attendanceRate: regs.length > 0 ? ((att.length/regs.length)*100).toFixed(0) : 0, totalFeedback: fb.length, feedbackRate: att.length > 0 ? ((fb.length/att.length)*100).toFixed(0) : 0, avgSatisfaction: avg.toFixed(1), pendingApprovals: events.filter(e => e.status === "pending").length }
    },
  }
}
const store = createStore()

// ─── UTILITIES ──────────────────────────────────────────────────────────────
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric" }) : ""
const fmtDateLong = (d) => d ? new Date(d).toLocaleDateString("en-PH", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : ""
const fmtTime = (t) => { if (!t) return ""; const [h,m] = t.split(":"); const ampm = h >= 12 ? "PM" : "AM"; return `${h%12||12}:${m} ${ampm}` }
const cn = (...a) => a.filter(Boolean).join(" ")
const monthDay = (d) => { const dt = new Date(d); return { month: dt.toLocaleDateString("en-US", { month: "short" }).toUpperCase(), day: dt.getDate(), weekday: dt.toLocaleDateString("en-US", { weekday: "short" }) } }
const getUserLocale = () => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
  if (tz.includes("Manila")) return { city: "Metro Manila", region: "NCR", country: "Philippines", flag: "🇵🇭" }
  if (tz.includes("Singapore")) return { city: "Singapore", region: "Central", country: "Singapore", flag: "🇸🇬" }
  return { city: "Your Area", region: "Local", country: "Global", flag: "🌏" }
}
const locale = getUserLocale()
const generateDescription = async (title, type, industry) => {
  await new Promise(r => setTimeout(r, 1400))
  const t = [
    `Join us for ${title || "this event"}, a ${(type||"gathering").toLowerCase()} bringing together the brightest minds in ${industry || "the industry"}. Expect engaging sessions, hands-on learning, and meaningful connections with peers who share your passion. Whether you're a seasoned professional or just starting out, there's something here for everyone.`,
    `${title || "This event"} is a must-attend ${(type||"event").toLowerCase()} for anyone in ${industry || "the field"}. We've curated an experience packed with insights from industry leaders, interactive discussions, and networking opportunities. Come ready to learn, share, and grow alongside a vibrant community.`,
    `Discover what's next at ${title || "our event"}. This ${(type||"event").toLowerCase()} features inspiring speakers, practical workshops, and plenty of time to connect with like-minded individuals in ${industry || "your space"}. Don't miss your chance to be part of the conversation.`,
  ]
  return t[Math.floor(Math.random() * t.length)]
}

// Calendar (.ics) + share helpers
const pad2 = (n) => String(n).padStart(2, "0")
const toICSDate = (date, time) => {
  const [h, m] = (time || "00:00").split(":")
  const d = new Date(date)
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}T${pad2(+h)}${pad2(+m)}00`
}
const downloadICS = (event) => {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//QR-Attend//EN\nBEGIN:VEVENT\nUID:${event.id}@qr-attend\nDTSTAMP:${toICSDate(event.date, event.startTime)}\nDTSTART:${toICSDate(event.date, event.startTime)}\nDTEND:${toICSDate(event.date, event.endTime || event.startTime)}\nSUMMARY:${event.title}\nDESCRIPTION:${(event.description || "").replace(/\n/g, " ")}\nLOCATION:${event.venue}, ${event.location}\nEND:VEVENT\nEND:VCALENDAR`
  const blob = new Blob([ics], { type: "text/calendar" })
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `${event.slug}.ics`; a.click()
}
const googleCalUrl = (event) => {
  const dates = `${toICSDate(event.date, event.startTime)}/${toICSDate(event.date, event.endTime || event.startTime)}`
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${dates}&details=${encodeURIComponent(event.description || "")}&location=${encodeURIComponent(event.venue + ", " + event.location)}`
}
const shareEvent = async (event, toast) => {
  const url = `${window.location.origin}/events/${event.slug}`
  try { if (navigator.share) { await navigator.share({ title: event.title, text: `Check out ${event.title}`, url }); return } }
  catch (e) { return }
  try { await navigator.clipboard.writeText(url); toast?.("Link copied to clipboard", "success") }
  catch { toast?.("Couldn't share — copy the URL manually", "error") }
}

// ─── PRIMITIVES ─────────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", size = "md", icon: Icon, loading, disabled, className = "", type = "button", full }) => {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-4 py-2.5 text-sm", lg: "px-6 py-3.5 text-[15px]" }
  const variants = {
    primary: "bg-[#1a1a2e] text-white hover:bg-[#2d2d44] shadow-sm",
    accent: "bg-[#e94560] text-white hover:bg-[#d63651] shadow-sm shadow-rose-200",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50",
    ghost: "text-slate-600 hover:bg-slate-100",
    dark: "bg-white/10 text-white border border-white/15 hover:bg-white/20 backdrop-blur",
  }
  return <button type={type} onClick={onClick} disabled={disabled || loading} className={cn(base, sizes[size], variants[variant], full && "w-full", className)}>
    {loading ? <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : Icon ? <Icon size={size === "sm" ? 13 : 16} /> : null}{children}
  </button>
}
const Input = ({ label, value, onChange, placeholder, type = "text", icon: Icon, error, required, disabled, hint }) => (
  <div>
    {label && <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</label>}
    <div className="relative">
      {Icon && <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} disabled={disabled}
        className={cn("w-full rounded-xl border text-sm px-3.5 py-2.5 outline-none transition-all", Icon && "pl-9", error ? "border-rose-300 bg-rose-50" : "border-slate-200 bg-white focus:border-[#1a1a2e] focus:ring-2 focus:ring-slate-100", disabled && "opacity-60 bg-slate-50 cursor-not-allowed")} />
    </div>
    {hint && !error && <p className="text-[11px] text-slate-400 mt-1">{hint}</p>}
    {error && <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
  </div>
)
const Select = ({ label, value, onChange, options, required }) => (
  <div>
    {label && <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</label>}
    <select value={value} onChange={onChange} className="w-full rounded-xl border border-slate-200 bg-white text-sm px-3.5 py-2.5 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-slate-100 transition-all">
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
)
const Textarea = ({ label, value, onChange, placeholder, rows = 3, required }) => (
  <div>
    {label && <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">{label}{required && <span className="text-rose-500 ml-0.5">*</span>}</label>}
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} className="w-full rounded-xl border border-slate-200 bg-white text-sm px-3.5 py-2.5 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-slate-100 transition-all resize-none" />
  </div>
)
const Toggle = ({ checked, onChange, label, desc, icon: Icon, color = "#1a1a2e" }) => (
  <button type="button" onClick={() => onChange(!checked)} className={cn("w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left", checked ? "border-slate-300 bg-slate-50" : "border-slate-200 bg-white hover:border-slate-300")}>
    {Icon && <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0", checked ? "text-white" : "bg-slate-100 text-slate-400")} style={checked ? { background: color } : {}}><Icon size={16} /></div>}
    <div className="flex-1 min-w-0">
      <p className="text-[13px] font-semibold text-slate-800">{label}</p>
      {desc && <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>}
    </div>
    <div className={cn("w-10 h-6 rounded-full p-0.5 transition-all flex-shrink-0", checked ? "bg-[#1a1a2e]" : "bg-slate-200")}>
      <div className={cn("w-5 h-5 rounded-full bg-white shadow transition-all", checked && "translate-x-4")} />
    </div>
  </button>
)
const Badge = ({ children, color = "slate", size = "sm" }) => {
  const cls = { slate: "bg-slate-100 text-slate-600", green: "bg-emerald-50 text-emerald-700", amber: "bg-amber-50 text-amber-700", rose: "bg-rose-50 text-rose-700", violet: "bg-violet-50 text-violet-700", blue: "bg-blue-50 text-blue-700", dark: "bg-[#1a1a2e] text-white" }
  return <span className={cn("inline-flex items-center gap-1 rounded-full font-medium", size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]", cls[color])}>{children}</span>
}
const Card = ({ children, className = "", onClick, hover }) => (
  <div onClick={onClick} className={cn("bg-white rounded-2xl border border-slate-200/70", hover && "hover:border-slate-300 hover:shadow-md transition-all cursor-pointer", className)}>{children}</div>
)
const StarRating = ({ value, onChange, readonly, size = 22 }) => (
  <div className="flex gap-1">
    {[1,2,3,4,5].map(n => <button key={n} type="button" onClick={() => !readonly && onChange?.(n)} className={cn("transition-transform", !readonly && "hover:scale-110")}>
      <Star size={size} className={n <= value ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-100"} />
    </button>)}
  </div>
)
const Modal = ({ open, onClose, children, size = "md", title }) => {
  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "" } }
  }, [open])
  if (!open) return null
  const maxW = { sm: "max-w-md", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-3xl" }
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm" />
      <div className={cn("relative bg-white rounded-2xl shadow-2xl w-full my-8 animate-modal", maxW[size])} onClick={e => e.stopPropagation()}>
        {title && <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h3 className="font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
        </div>}
        {children}
      </div>
    </div>
  )
}
const KPI = ({ icon: Icon, label, value, sub, color = "#1a1a2e" }) => (
  <Card className="p-5">
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: color }}><Icon size={16} /></div>
      <p className="text-[12px] font-semibold text-slate-500">{label}</p>
    </div>
    <p className="text-2xl font-extrabold text-slate-800">{value}</p>
    {sub && <p className="text-[11px] text-slate-400 mt-0.5">{sub}</p>}
  </Card>
)
const PriceTag = ({ event }) => {
  if (event.pricing === "free") return <Badge color="green"><Ticket size={10} />Free</Badge>
  if (event.pricing === "walk-in") return <Badge color="blue"><UserCheck size={10} />Walk-in</Badge>
  return <Badge color="dark"><DollarSign size={10} />₱{event.price}</Badge>
}

// ─── VIEWS ──────────────────────────────────────────────────────────────────
const V = {
  HOME: "home", EVENT: "event", REGISTER: "register", CONFIRM: "confirm", PASS: "pass", FEEDBACK: "feedback", FB_DONE: "fb_done",
  FIND_PASS: "find_pass",
  ORG_DASH: "org_dash", ORG_EVENT: "org_event", ORG_SCAN: "org_scan", ORG_FEEDBACK: "org_feedback", ORG_REPORTS: "org_reports",
  ORG_TEMPLATES: "org_templates", ORG_PROFILE: "org_profile", ORG_APPROVALS: "org_approvals", ORG_EDIT: "org_edit",
}

export default function App() {
  const [view, setView] = useState(V.HOME)
  const [params, setParams] = useState({})
  const [mode, setMode] = useState("public") // public | organizer
  const [toasts, setToasts] = useState([])
  const [, force] = useState(0)
  const [createOpen, setCreateOpen] = useState(false)
  const refresh = () => force(x => x + 1)
  const nav = useCallback((v, p = {}) => { setView(v); setParams(p); window.scrollTo(0, 0) }, [])
  const toast = useCallback((msg, type = "success") => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, msg, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500)
  }, [])
  const enterOrganizer = () => { setMode("organizer"); nav(V.ORG_DASH) }
  const exitOrganizer = () => { setMode("public"); nav(V.HOME) }

  return (
    <div style={{ fontFamily: "'Inter',system-ui,sans-serif" }} className="min-h-screen bg-[#fafafa] text-slate-800">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .animate-fade{animation:fade .3s ease}.animate-up{animation:up .35s cubic-bezier(.16,1,.3,1)}
        .animate-modal{animation:modal .25s cubic-bezier(.16,1,.3,1)}
        @keyframes fade{from{opacity:0}to{opacity:1}}
        @keyframes up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes modal{from{opacity:0;transform:translateY(16px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
        .line-clamp-3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
        input,select,textarea,button{font-family:inherit}
        ::-webkit-scrollbar{width:8px;height:8px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
      `}</style>

      {/* Toasts */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map(t => <div key={t.id} className="animate-up px-4 py-2.5 rounded-xl text-[13px] font-semibold text-white shadow-lg flex items-center gap-2 min-w-[200px]" style={{ background: t.type === "error" ? "#e94560" : t.type === "info" ? "#1a1a2e" : "#0f9d8f" }}>
          {t.type === "error" ? <AlertCircle size={15} /> : <CheckCircle2 size={15} />}{t.msg}
        </div>)}
      </div>

      {mode === "public"
        ? <PublicShell nav={nav} view={view} onOrganize={enterOrganizer} setCreateOpen={setCreateOpen}>
            {view === V.HOME && <Home nav={nav} setCreateOpen={setCreateOpen} />}
            {view === V.EVENT && <EventPage nav={nav} params={params} toast={toast} />}
            {view === V.REGISTER && <RegisterPage nav={nav} params={params} toast={toast} refresh={refresh} />}
            {view === V.CONFIRM && <ConfirmPage nav={nav} params={params} />}
            {view === V.PASS && <PassPage nav={nav} params={params} />}
            {view === V.FEEDBACK && <FeedbackPage nav={nav} params={params} toast={toast} refresh={refresh} />}
            {view === V.FB_DONE && <FeedbackDone nav={nav} params={params} />}
            {view === V.FIND_PASS && <FindPassPage nav={nav} toast={toast} />}
          </PublicShell>
        : <OrgShell nav={nav} view={view} onExit={exitOrganizer} setCreateOpen={setCreateOpen} toast={toast}>
            {view === V.ORG_DASH && <OrgDashboard nav={nav} setCreateOpen={setCreateOpen} />}
            {view === V.ORG_EVENT && <OrgEventDetail nav={nav} params={params} toast={toast} refresh={refresh} />}
            {view === V.ORG_EDIT && <OrgEditEvent nav={nav} params={params} toast={toast} refresh={refresh} />}
            {view === V.ORG_SCAN && <OrgScanner nav={nav} params={params} toast={toast} refresh={refresh} />}
            {view === V.ORG_FEEDBACK && <OrgFeedback nav={nav} />}
            {view === V.ORG_REPORTS && <OrgReports nav={nav} toast={toast} />}
            {view === V.ORG_TEMPLATES && <OrgTemplates nav={nav} toast={toast} refresh={refresh} />}
            {view === V.ORG_PROFILE && <OrgProfile nav={nav} toast={toast} refresh={refresh} />}
            {view === V.ORG_APPROVALS && <OrgApprovals nav={nav} toast={toast} refresh={refresh} />}
          </OrgShell>}

      <CreateEventModal open={createOpen} onClose={() => setCreateOpen(false)} toast={toast} refresh={refresh} nav={nav} mode={mode} />
    </div>
  )
}

// ─── PUBLIC SHELL (Luma-style top nav) ──────────────────────────────────────
function PublicShell({ children, nav, view, onOrganize, setCreateOpen }) {
  return (
    <div>
      <header className="sticky top-0 z-40 bg-[#fafafa]/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
          <button onClick={() => nav(V.HOME)} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center"><QrCode size={17} className="text-white" /></div>
            <span className="font-extrabold text-[17px] tracking-tight">QR-Attend</span>
          </button>
          <div className="flex items-center gap-2">
            <button onClick={() => nav(V.FIND_PASS)} className={cn("px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all hidden sm:block", view === V.FIND_PASS ? "bg-white border border-slate-200 text-slate-800" : "text-slate-600 hover:bg-slate-100")}>My Pass</button>
            <button onClick={() => nav(V.HOME)} className={cn("px-3.5 py-2 rounded-xl text-[13px] font-semibold transition-all", view === V.HOME ? "bg-white border border-slate-200 text-slate-800" : "text-slate-600 hover:bg-slate-100")}>Browse Events</button>
            <Btn variant="accent" size="md" icon={Plus} onClick={onOrganize}>Organize an Event</Btn>
          </div>
        </div>
      </header>
      <div className="animate-fade">{children}</div>
      <footer className="max-w-5xl mx-auto px-5 py-10 mt-10 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[12px] text-slate-400">QR-Attend · Event attendance & feedback, automated · {locale.flag} {locale.city}</p>
        <button onClick={onOrganize} className="text-[12px] font-semibold text-slate-600 hover:text-[#e94560] flex items-center gap-1.5">Organize an Event <ArrowRight size={13} /></button>
      </footer>
    </div>
  )
}

// ─── HOME (events first, no hero) ───────────────────────────────────────────
function Home({ nav, setCreateOpen }) {
  const [q, setQ] = useState("")
  const [filter, setFilter] = useState("upcoming")
  const all = store.getPublicEvents()
  const now = new Date()
  let events = all.filter(e => !q || e.title.toLowerCase().includes(q.toLowerCase()) || e.tags.some(t => t.toLowerCase().includes(q.toLowerCase())))
  if (filter === "upcoming") events = events.filter(e => new Date(e.date) >= new Date(now.toDateString()))
  events = events.sort((a, b) => new Date(a.date) - new Date(b.date))

  // group by date
  const groups = {}
  events.forEach(e => { (groups[e.date] = groups[e.date] || []).push(e) })
  const suggested = all.slice(0, 3)

  return (
    <div className="max-w-5xl mx-auto px-5 py-8">
      {/* Top bar: title + browse + search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Events</h1>
          <p className="text-[13px] text-slate-500 mt-0.5 flex items-center gap-1.5"><MapPinned size={13} />Happening near {locale.city} {locale.flag}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search events…" className="w-full sm:w-56 pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-slate-100" />
          </div>
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-7">
        {[["upcoming", "Upcoming"], ["all", "All Events"]].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={cn("px-4 py-2 rounded-full text-[13px] font-semibold transition-all", filter === k ? "bg-[#1a1a2e] text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300")}>{l}</button>
        ))}
      </div>

      {/* Suggested (locale based) */}
      {!q && filter === "upcoming" && suggested.length > 0 && (
        <div className="mb-9">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={15} className="text-[#e94560]" />
            <p className="text-[13px] font-bold text-slate-700">Suggested for you</p>
            <span className="text-[11px] text-slate-400">· based on your location</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {suggested.map(e => <SuggestCard key={e.id} event={e} nav={nav} />)}
          </div>
        </div>
      )}

      {/* Timeline grouped by date */}
      {Object.keys(groups).length === 0 ? (
        <div className="text-center py-20">
          <Calendar size={40} className="mx-auto text-slate-300 mb-3" />
          <p className="font-semibold text-slate-500">No events found</p>
          <p className="text-[13px] text-slate-400 mt-1">Try a different search or check back soon.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {Object.entries(groups).map(([date, evs]) => {
            const md = monthDay(date)
            return (
              <div key={date} className="flex gap-5">
                {/* date rail */}
                <div className="flex flex-col items-center pt-1 w-14 flex-shrink-0">
                  <span className="text-[11px] font-bold text-slate-400">{md.month}</span>
                  <span className="text-2xl font-extrabold text-slate-800 leading-none">{md.day}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5">{md.weekday}</span>
                  <div className="w-px flex-1 bg-slate-200 mt-3" />
                </div>
                {/* events for the day */}
                <div className="flex-1 space-y-4 pb-2">
                  {evs.map(e => <EventRow key={e.id} event={e} nav={nav} />)}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Sticky create button */}
      <button onClick={() => setCreateOpen(true)} className="fixed bottom-6 right-6 z-30 flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#e94560] text-white font-bold text-sm shadow-xl shadow-rose-300/40 hover:bg-[#d63651] active:scale-95 transition-all">
        <Plus size={18} />Create Event
      </button>
    </div>
  )
}

function SuggestCard({ event, nav }) {
  return (
    <Card hover onClick={() => nav(V.EVENT, { id: event.id })} className="overflow-hidden">
      <div className="h-28 bg-slate-100 relative">
        {event.image && <img src={event.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = "none"} />}
        <div className="absolute top-2 left-2"><PriceTag event={event} /></div>
      </div>
      <div className="p-3">
        <p className="text-[13px] font-bold text-slate-800 line-clamp-2 leading-snug">{event.title}</p>
        <p className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1"><Calendar size={10} />{fmtDate(event.date)} · {fmtTime(event.startTime)}</p>
      </div>
    </Card>
  )
}

function EventRow({ event, nav }) {
  const regs = store.getRegistrations(event.id)
  return (
    <Card hover onClick={() => nav(V.EVENT, { id: event.id })} className="p-4 flex gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <PriceTag event={event} />
          <Badge color="slate" size="xs">{event.type}</Badge>
        </div>
        <h3 className="font-bold text-[16px] text-slate-800 leading-snug line-clamp-2">{event.title}</h3>
        <div className="mt-2 space-y-1">
          <p className="text-[12px] text-slate-500 flex items-center gap-1.5"><Clock size={12} />{fmtTime(event.startTime)} – {fmtTime(event.endTime)}</p>
          <p className="text-[12px] text-slate-500 flex items-center gap-1.5"><MapPin size={12} />{event.venue}</p>
          <p className="text-[12px] text-slate-400 flex items-center gap-1.5"><Users size={12} />{regs.length} going · by {event.organizedBy}</p>
        </div>
      </div>
      <div className="w-28 sm:w-36 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 self-stretch min-h-[96px]">
        {event.image && <img src={event.image} alt="" className="w-full h-full object-cover" onError={e => e.target.style.display = "none"} />}
      </div>
    </Card>
  )
}

// ─── EVENT PAGE (Luma cover-first) ──────────────────────────────────────────
function EventPage({ nav, params, toast }) {
  const event = store.getEvent(params.id)
  if (!event) return <div className="text-center py-20 text-slate-500">Event not found.</div>
  // Private event gating: require matching access token (passed via params.access)
  if (event.isPrivate && params.access !== event.privateLink) {
    return (
      <div className="max-w-md mx-auto px-5 py-16 text-center">
        <Card className="p-8">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-4"><Lock size={30} className="text-[#e94560]" /></div>
          <h2 className="text-xl font-extrabold mb-1">Private Event</h2>
          <p className="text-[13px] text-slate-500 mb-6">This event is invite-only. You need the access link from the organizer to view and register.</p>
          <Btn variant="secondary" full icon={ArrowLeft} onClick={() => nav(V.HOME)}>Back to Events</Btn>
        </Card>
      </div>
    )
  }
  const regs = store.getRegistrations(event.id)
  const isFull = regs.length >= event.capacity
  const isPast = event.status === "completed" || new Date(event.date) < new Date(new Date().toDateString())
  const SOC = [["instagram", Instagram], ["linkedin", Linkedin], ["facebook", Facebook], ["twitter", Twitter], ["website", Globe]]

  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <button onClick={() => nav(V.HOME)} className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800 mb-4 font-medium"><ArrowLeft size={15} />Events</button>

      <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[2/1] mb-5 relative">
        {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover" onError={e => e.target.style.display = "none"} />}
        <div className="absolute top-3 left-3 flex gap-2">
          <PriceTag event={event} />
          {event.isPrivate && <Badge color="rose"><Lock size={10} />Private</Badge>}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-6 items-start">
        <div>
          <div className="flex items-center gap-2 mb-3"><Badge color="slate">{event.type}</Badge><Badge color="blue"><Briefcase size={10} />{event.industry}</Badge>{event.requiresCertificate && <Badge color="violet"><Award size={10} />Certificate</Badge>}</div>
          <h1 className="text-[26px] font-extrabold tracking-tight leading-tight mb-4">{event.title}</h1>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex flex-col items-center justify-center flex-shrink-0">
                <span className="text-[9px] font-bold text-slate-400 leading-none">{monthDay(event.date).month}</span>
                <span className="text-[15px] font-extrabold leading-none">{monthDay(event.date).day}</span>
              </div>
              <div><p className="text-[14px] font-semibold text-slate-800">{fmtDateLong(event.date)}</p><p className="text-[12px] text-slate-500">{fmtTime(event.startTime)} – {fmtTime(event.endTime)}</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0"><MapPin size={17} className="text-slate-500" /></div>
              <div><p className="text-[14px] font-semibold text-slate-800">{event.venue}</p><p className="text-[12px] text-slate-500">{event.location}</p></div>
            </div>
          </div>

          {/* Organized by */}
          <div className="rounded-xl border border-slate-200 p-4 mb-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">Organized by</p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#e94560] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{event.organizedBy[0]}</div>
              <div className="flex-1"><p className="text-[14px] font-semibold text-slate-800">{event.organizedBy}</p></div>
            </div>
            {Object.values(event.socials || {}).some(Boolean) && <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
              {SOC.map(([k, Icon]) => event.socials?.[k] ? <a key={k} href="#" onClick={e => e.preventDefault()} className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all"><Icon size={14} /></a> : null)}
            </div>}
          </div>

          <div className="prose-sm">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide mb-2">About this event</p>
            <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>

          {event.privacyPolicyUrl && <a href={event.privacyPolicyUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[12px] text-slate-500 hover:text-slate-800 mt-5 font-medium"><Shield size={12} />Privacy Policy <ExternalLink size={11} /></a>}
        </div>

        {/* Register rail */}
        <div className="md:sticky md:top-20">
          <Card className="p-5 shadow-sm">
            {isPast ? <div className="text-center py-3"><Badge color="slate">This event has ended</Badge></div> : (
              <>
                <div className="flex items-baseline justify-between mb-3">
                  <p className="text-[13px] font-semibold text-slate-500">Registration</p>
                  {event.pricing === "paid" ? <span className="text-xl font-extrabold">₱{event.price}</span> : <span className="text-[15px] font-bold text-emerald-600">Free</span>}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-[11px] mb-1.5"><span className="text-slate-500">{regs.length} registered</span><span className="font-semibold">{event.capacity} cap</span></div>
                  <div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full bg-[#1a1a2e] transition-all" style={{ width: `${Math.min(100, (regs.length / event.capacity) * 100)}%` }} /></div>
                </div>
                {isFull ? <div className="text-center py-2 rounded-xl bg-amber-50 text-amber-700 text-[13px] font-semibold">Event is full</div> : (
                  <div className="space-y-2">
                    <Btn variant="accent" size="lg" full icon={Ticket} onClick={() => nav(V.REGISTER, { id: event.id })}>{event.pricing === "paid" ? "Register & Pay" : "Register"}</Btn>
                    {event.allowWalkIns && <Btn variant="secondary" size="md" full icon={UserCheck} onClick={() => nav(V.REGISTER, { id: event.id, walkIn: true })}>Walk-in (skip form)</Btn>}
                  </div>
                )}
                {event.isPrivate && <p className="text-[10px] text-slate-400 text-center mt-3 flex items-center justify-center gap-1"><Lock size={10} />Private · invite-only link</p>}
                {!event.allowWalkIns && !isFull && <p className="text-[10px] text-slate-400 text-center mt-3">Walk-ins not accepted for this event</p>}
              </>
            )}
          </Card>

          {/* Add to calendar + share */}
          <div className="mt-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <a href={googleCalUrl(event)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[12px] font-semibold text-slate-700 transition-all"><CalendarPlus size={14} />Google</a>
              <button onClick={() => downloadICS(event)} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[12px] font-semibold text-slate-700 transition-all"><CalendarPlus size={14} />.ics</button>
            </div>
            <button onClick={() => shareEvent(event, toast)} className="w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[12px] font-semibold text-slate-700 transition-all"><Share2 size={14} />Share event</button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── CREATE EVENT MODAL ─────────────────────────────────────────────────────
function CreateEventModal({ open, onClose, toast, refresh, nav, mode }) {
  const templates = store.getTaskTemplates()
  const blank = {
    title: "", type: "Meetup", description: "", venue: "", location: "", date: "", startTime: "", endTime: "",
    organizedBy: store.getOrg().organizedBy, industry: "Technology", capacity: "50",
    image: "", pricing: "free", price: "", allowWalkIns: true, isPrivate: false, requiresCertificate: false,
    feedbackEnabled: true, privacyPolicyUrl: store.getOrg().privacyPolicyUrl || "", taskTemplateId: "",
    socials: { instagram: "", linkedin: "", facebook: "", website: "" },
    customFields: [], tags: "",
  }
  const [form, setForm] = useState(blank)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genLoading, setGenLoading] = useState(false)
  const [imgError, setImgError] = useState("")
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const upSocial = (k, v) => setForm(f => ({ ...f, socials: { ...f.socials, [k]: v } }))

  useEffect(() => { if (open) { setForm(blank); setStep(1); setImgError("") } }, [open])

  const genDesc = async () => {
    setGenLoading(true)
    const d = await generateDescription(form.title, form.type, form.industry)
    up("description", d); setGenLoading(false)
    toast("Description generated with Gemini ✨", "info")
  }

  const checkImage = (url) => {
    setImgError("")
    if (!url) return
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      // pubmat ideal ~2:1 landscape; warn if too far off or too small
      if (img.width < 800) setImgError(`Image is ${img.width}px wide — use at least 800px for crisp pubmats`)
      else if (ratio < 1.3 || ratio > 2.6) setImgError(`Aspect ratio ${ratio.toFixed(2)}:1 — recommended 2:1 landscape (e.g. 1200×600)`)
      else setImgError("")
    }
    img.onerror = () => setImgError("Couldn't load that image URL")
    img.src = url
  }

  const addField = () => up("customFields", [...form.customFields, { id: `cf${Date.now()}`, label: "", type: "text", required: false }])
  const updField = (id, k, v) => up("customFields", form.customFields.map(f => f.id === id ? { ...f, [k]: v } : f))
  const delField = (id) => up("customFields", form.customFields.filter(f => f.id !== id))

  const submit = () => {
    if (!form.title || !form.venue || !form.date) { toast("Fill in title, venue and date", "error"); return }
    setLoading(true)
    setTimeout(() => {
      const privateLink = form.isPrivate ? Math.random().toString(36).slice(2, 10) : null
      store.addEvent({
        ...form, capacity: parseInt(form.capacity) || 50, price: form.pricing === "paid" ? (parseInt(form.price) || 0) : 0,
        privateLink, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
      })
      refresh(); setLoading(false); onClose()
      toast("Event submitted for approval!", "success")
      if (mode === "organizer") nav(V.ORG_APPROVALS)
    }, 900)
  }

  const steps = ["Details", "Settings", "Registration"]

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="px-6 py-4 border-b border-slate-100 sticky top-0 bg-white rounded-t-2xl z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-800">Create Event</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400"><X size={18} /></button>
        </div>
        <div className="flex items-center gap-1.5">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5 flex-1">
              <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all", step === i + 1 ? "bg-[#1a1a2e] text-white" : step > i + 1 ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                {step > i + 1 ? <Check size={11} /> : <span>{i + 1}</span>}{s}
              </div>
              {i < steps.length - 1 && <div className={cn("h-px flex-1", step > i + 1 ? "bg-emerald-300" : "bg-slate-200")} />}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 max-h-[60vh] overflow-y-auto">
        {step === 1 && (
          <div className="space-y-4">
            <Input label="Event Title" value={form.title} onChange={e => up("title", e.target.value)} placeholder="Founder Networking Night" required />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Type" value={form.type} onChange={e => up("type", e.target.value)} options={["Meetup","Conference","Workshop","Seminar","Networking","Training"].map(v => ({ value: v, label: v }))} />
              <Select label="Industry" value={form.industry} onChange={e => up("industry", e.target.value)} options={["Technology","Education","Design","Finance","Healthcare","Marketing","Real Estate","Other"].map(v => ({ value: v, label: v }))} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[12px] font-semibold text-slate-600">Description</label>
                <button onClick={genDesc} disabled={genLoading} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#6d28d9] hover:text-[#5b21b6] disabled:opacity-50">
                  {genLoading ? <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Wand2 size={12} />}
                  {genLoading ? "Generating…" : "Generate with Gemini"}
                </button>
              </div>
              <textarea value={form.description} onChange={e => up("description", e.target.value)} rows={4} placeholder="Describe your event, or let Gemini draft it for you…" className="w-full rounded-xl border border-slate-200 bg-white text-sm px-3.5 py-2.5 outline-none focus:border-[#1a1a2e] focus:ring-2 focus:ring-slate-100 resize-none" />
            </div>
            <Input label="Venue" value={form.venue} onChange={e => up("venue", e.target.value)} icon={MapPin} placeholder="The Rooftop, Makati" required />
            <Input label="Location / City" value={form.location} onChange={e => up("location", e.target.value)} icon={MapPinned} placeholder="Makati City, Metro Manila" />
            <div className="grid grid-cols-3 gap-3">
              <Input label="Date" value={form.date} onChange={e => up("date", e.target.value)} type="date" required />
              <Input label="Start" value={form.startTime} onChange={e => up("startTime", e.target.value)} type="time" />
              <Input label="End" value={form.endTime} onChange={e => up("endTime", e.target.value)} type="time" />
            </div>
            <div>
              <Input label="Cover / Pubmat Image URL" value={form.image} onChange={e => { up("image", e.target.value); checkImage(e.target.value) }} icon={ImageIcon} placeholder="https://… (1200×600 recommended)" hint="Recommended: 2:1 landscape, min 800px wide, for crisp pubmats" />
              {imgError && <p className="text-[11px] text-amber-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{imgError}</p>}
              {form.image && !imgError && <div className="mt-2 rounded-lg overflow-hidden border border-slate-200 aspect-[2/1] bg-slate-50"><img src={form.image} alt="preview" className="w-full h-full object-cover" onError={e => e.target.style.display = "none"} /></div>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">Pricing</p>
              <div className="grid grid-cols-3 gap-2">
                {[["free", "Free", Ticket], ["paid", "Paid", DollarSign], ["walk-in", "Walk-in", UserCheck]].map(([k, l, Icon]) => (
                  <button key={k} onClick={() => up("pricing", k)} className={cn("flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all", form.pricing === k ? "border-[#1a1a2e] bg-slate-50" : "border-slate-200 hover:border-slate-300")}>
                    <Icon size={18} className={form.pricing === k ? "text-[#1a1a2e]" : "text-slate-400"} />
                    <span className={cn("text-[12px] font-semibold", form.pricing === k ? "text-slate-800" : "text-slate-500")}>{l}</span>
                  </button>
                ))}
              </div>
              {form.pricing === "paid" && <div className="mt-3"><Input label="Price (₱)" value={form.price} onChange={e => up("price", e.target.value)} type="number" icon={DollarSign} placeholder="500" /></div>}
            </div>

            <div className="space-y-2.5">
              <Toggle checked={form.allowWalkIns} onChange={v => up("allowWalkIns", v)} icon={UserCheck} label="Allow walk-ins" desc="Let guests register on-site without filling the form" color="#0f9d8f" />
              <Toggle checked={form.isPrivate} onChange={v => up("isPrivate", v)} icon={Lock} label="Private event" desc="Only people with the invite link can view & register" color="#e94560" />
              <Toggle checked={form.requiresCertificate} onChange={v => up("requiresCertificate", v)} icon={Award} label="Certificate of attendance" desc="Attendees can request a certificate" color="#6d28d9" />
              <Toggle checked={form.feedbackEnabled} onChange={v => up("feedbackEnabled", v)} icon={MessageSquare} label="Collect feedback" desc="Enable post-event ratings & comments" color="#1a1a2e" />
            </div>

            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">Organizer socials</p>
              <div className="grid grid-cols-2 gap-2">
                <Input value={form.socials.instagram} onChange={e => upSocial("instagram", e.target.value)} icon={Instagram} placeholder="instagram" />
                <Input value={form.socials.linkedin} onChange={e => upSocial("linkedin", e.target.value)} icon={Linkedin} placeholder="linkedin" />
                <Input value={form.socials.facebook} onChange={e => upSocial("facebook", e.target.value)} icon={Facebook} placeholder="facebook" />
                <Input value={form.socials.website} onChange={e => upSocial("website", e.target.value)} icon={Globe} placeholder="website.com" />
              </div>
            </div>

            <Input label="Privacy Policy URL" value={form.privacyPolicyUrl} onChange={e => up("privacyPolicyUrl", e.target.value)} icon={Shield} placeholder="https://yoursite.com/privacy" hint="Linked on your event & registration pages" />

            <div>
              <p className="text-[12px] font-bold text-slate-700 mb-2">Checklist / To-do template</p>
              <Select value={form.taskTemplateId} onChange={e => up("taskTemplateId", e.target.value)} options={[{ value: "", label: "None — I'll add tasks later" }, ...templates.map(t => ({ value: t.id, label: `${t.name} (${t.tasks.length} tasks)` }))]} />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-[12px] font-bold text-slate-700 mb-1">Default registration fields</p>
              <p className="text-[11px] text-slate-500 mb-3">Every attendee provides these. Phone, affiliation & type live in their profile — not here.</p>
              <div className="flex gap-2">
                <Badge color="dark"><User size={10} />Name</Badge>
                <Badge color="dark"><Mail size={10} />Email</Badge>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-bold text-slate-700">Custom fields</p>
                <button onClick={addField} className="text-[11px] font-semibold text-[#e94560] flex items-center gap-1"><Plus size={12} />Add field</button>
              </div>
              {form.customFields.length === 0 ? <p className="text-[12px] text-slate-400 py-3 text-center bg-slate-50 rounded-xl">No custom fields. Add one to collect extra info (e.g. company name).</p> : (
                <div className="space-y-2">
                  {form.customFields.map(f => (
                    <div key={f.id} className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200">
                      <input value={f.label} onChange={e => updField(f.id, "label", e.target.value)} placeholder="Field label" className="flex-1 text-sm px-2.5 py-1.5 rounded-lg border border-slate-200 outline-none focus:border-[#1a1a2e]" />
                      <button onClick={() => updField(f.id, "required", !f.required)} className={cn("text-[11px] font-semibold px-2.5 py-1.5 rounded-lg", f.required ? "bg-[#1a1a2e] text-white" : "bg-slate-100 text-slate-500")}>{f.required ? "Required" : "Optional"}</button>
                      <button onClick={() => delField(f.id)} className="p-1.5 text-slate-400 hover:text-rose-500"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Input label="Tags" value={form.tags} onChange={e => up("tags", e.target.value)} icon={Tag} placeholder="AI, Networking (comma separated)" />

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <Hourglass size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-amber-700">Your event will be submitted for <b>approval</b> before going live publicly.</p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between sticky bottom-0 bg-white rounded-b-2xl">
        {step > 1 ? <Btn variant="ghost" icon={ChevronLeft} onClick={() => setStep(step - 1)}>Back</Btn> : <span />}
        {step < 3 ? <Btn variant="primary" onClick={() => setStep(step + 1)}>Continue <ChevronRight size={15} /></Btn>
          : <Btn variant="accent" icon={Send} loading={loading} onClick={submit}>Submit for Approval</Btn>}
      </div>
    </Modal>
  )
}

// ─── REGISTER PAGE ──────────────────────────────────────────────────────────
function RegisterPage({ nav, params, toast, refresh }) {
  const event = store.getEvent(params.id)
  const isWalkIn = params.walkIn === true
  const [step, setStep] = useState("form") // form | payment
  const [form, setForm] = useState({ name: "", email: "", customData: {} })
  const [pay, setPay] = useState({ ref: "", screenshot: null, screenshotName: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const ranWalkIn = useRef(false)
  const org = store.getOrg()

  useEffect(() => {
    if (isWalkIn && event && !ranWalkIn.current) {
      ranWalkIn.current = true
      const reg = store.addRegistration({ eventId: event.id, name: "Walk-in Guest", email: `walkin-${Date.now()}@tmp`, customData: {}, isWalkIn: true, needsCertificate: false })
      refresh()
      nav(V.CONFIRM, { regId: reg.id })
    }
  }, [])

  if (!event) return null
  if (isWalkIn) return <div className="text-center py-24"><div className="w-10 h-10 border-[3px] border-[#1a1a2e] border-t-transparent rounded-full animate-spin mx-auto mb-3" /><p className="text-slate-500 text-sm">Checking you in…</p></div>

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = "Required"
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required"
    event.customFields?.forEach(cf => { if (cf.required && !form.customData[cf.id]?.trim()) e[cf.id] = "Required" })
    setErrors(e); return Object.keys(e).length === 0
  }

  const proceedFromForm = () => {
    if (!validate()) return
    if (event.pricing === "paid") setStep("payment")
    else doRegister(null)
  }

  const doRegister = (paymentData) => {
    setLoading(true)
    setTimeout(() => {
      const reg = store.addRegistration({ eventId: event.id, name: form.name, email: form.email, customData: form.customData, isWalkIn: false, needsCertificate: !!form.needsCertificate, paymentRef: paymentData?.ref || null, paymentScreenshot: paymentData?.screenshot || null })
      refresh()
      toast(event.pricing === "paid" ? "Payment submitted for verification!" : "You're registered!", "success")
      nav(V.CONFIRM, { regId: reg.id })
    }, 700)
  }

  const submitPayment = () => {
    const e = {}
    if (!pay.ref.trim()) e.ref = "Reference number required"
    if (!pay.screenshot) e.screenshot = "Upload your payment screenshot"
    setErrors(e)
    if (Object.keys(e).length) return
    doRegister(pay)
  }

  const onFile = (file) => {
    if (!file) return
    if (!file.type.startsWith("image/")) { toast("Please upload an image", "error"); return }
    if (file.size > 5 * 1024 * 1024) { toast("Image must be under 5MB", "error"); return }
    const reader = new FileReader()
    reader.onload = () => setPay(p => ({ ...p, screenshot: reader.result, screenshotName: file.name }))
    reader.readAsDataURL(file)
  }

  return (
    <div className="max-w-md mx-auto px-5 py-8">
      <button onClick={() => step === "payment" ? setStep("form") : nav(V.EVENT, { id: event.id })} className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800 mb-4 font-medium"><ArrowLeft size={15} />Back</button>
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100">
          <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">{event.image && <img src={event.image} alt="" className="w-full h-full object-cover" />}</div>
          <div><h2 className="font-bold text-[15px] leading-snug line-clamp-2">{event.title}</h2><p className="text-[12px] text-slate-500 mt-0.5">{fmtDate(event.date)} · {fmtTime(event.startTime)}</p></div>
        </div>

        {step === "form" && (
          <div className="space-y-4">
            {event.pricing === "paid" && <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200"><span className="text-[13px] font-semibold text-slate-600">Ticket price</span><span className="text-lg font-extrabold">₱{event.price}</span></div>}
            <Input label="Full Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} icon={User} placeholder="Juan Dela Cruz" error={errors.name} required />
            <Input label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} icon={Mail} type="email" placeholder="juan@email.com" error={errors.email} required />
            {event.customFields?.map(cf => (
              <Input key={cf.id} label={cf.label} value={form.customData[cf.id] || ""} onChange={e => setForm(f => ({ ...f, customData: { ...f.customData, [cf.id]: e.target.value } }))} error={errors[cf.id]} required={cf.required} />
            ))}
            {event.requiresCertificate && <Toggle checked={!!form.needsCertificate} onChange={v => setForm(f => ({ ...f, needsCertificate: v }))} icon={Award} label="I need a Certificate of Attendance" desc="Prepared for qualifying attendees" color="#6d28d9" />}
            <Btn variant="accent" size="lg" full icon={event.pricing === "paid" ? ArrowRight : Ticket} loading={loading} onClick={proceedFromForm}>{event.pricing === "paid" ? "Continue to Payment" : "Complete Registration"}</Btn>
            {event.privacyPolicyUrl && <p className="text-[11px] text-slate-400 text-center">By registering you agree to the <a href={event.privacyPolicyUrl} target="_blank" rel="noreferrer" className="underline hover:text-slate-600">privacy policy</a>.</p>}
          </div>
        )}

        {step === "payment" && (
          <div className="space-y-4">
            <div className="rounded-xl bg-[#1a1a2e] text-white p-4">
              <p className="text-[11px] text-slate-300 uppercase tracking-wide font-bold mb-1">Amount due</p>
              <p className="text-3xl font-extrabold">₱{event.price}</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-[12px] font-bold text-slate-700 mb-2">How to pay</p>
              <ol className="text-[12px] text-slate-600 space-y-1.5 list-decimal list-inside">
                <li>Send ₱{event.price} to the organizer's account</li>
                <li>Take a screenshot of your payment confirmation</li>
                <li>Enter the reference number & upload the screenshot below</li>
              </ol>
              <p className="text-[11px] text-slate-400 mt-2">Pay to: <b className="text-slate-600">{org.name}</b> · {org.email}</p>
            </div>

            <Input label="Payment Reference Number" value={pay.ref} onChange={e => setPay(p => ({ ...p, ref: e.target.value }))} icon={Receipt} placeholder="e.g. 0029384756" error={errors.ref} required />

            <div>
              <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">Payment Screenshot<span className="text-rose-500 ml-0.5">*</span></label>
              {pay.screenshot ? (
                <div className="relative rounded-xl overflow-hidden border border-slate-200">
                  <img src={pay.screenshot} alt="proof" className="w-full max-h-48 object-contain bg-slate-50" />
                  <button onClick={() => setPay(p => ({ ...p, screenshot: null, screenshotName: "" }))} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 text-white flex items-center justify-center"><X size={14} /></button>
                  <div className="px-3 py-2 bg-white border-t border-slate-100 text-[11px] text-slate-500 truncate flex items-center gap-1.5"><ImageDown size={12} />{pay.screenshotName}</div>
                </div>
              ) : (
                <label className={cn("flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed cursor-pointer transition-all", errors.screenshot ? "border-rose-300 bg-rose-50" : "border-slate-200 hover:border-slate-300 bg-slate-50")}>
                  <Upload size={22} className="text-slate-400" />
                  <span className="text-[12px] font-semibold text-slate-500">Tap to upload screenshot</span>
                  <span className="text-[10px] text-slate-400">PNG or JPG, max 5MB</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => onFile(e.target.files?.[0])} />
                </label>
              )}
              {errors.screenshot && <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.screenshot}</p>}
            </div>

            <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
              <Clock3 size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-[12px] text-amber-700">Your spot is reserved once submitted. The organizer will verify your payment — you'll still get your QR pass right away.</p>
            </div>

            <Btn variant="accent" size="lg" full icon={Send} loading={loading} onClick={submitPayment}>Submit Payment Proof</Btn>
          </div>
        )}
      </Card>
    </div>
  )
}

// ─── CONFIRM PAGE ───────────────────────────────────────────────────────────
function ConfirmPage({ nav, params }) {
  const reg = store.getRegistration(params.regId)
  const event = reg && store.getEvent(reg.eventId)
  if (!reg || !event) return null
  return (
    <div className="max-w-md mx-auto px-5 py-10 text-center">
      <Card className="p-8">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-emerald-500" /></div>
        <h2 className="text-xl font-extrabold mb-1">You're in! 🎉</h2>
        <p className="text-[13px] text-slate-500 mb-6">{reg.isWalkIn ? "Walk-in registered & checked in." : "Your spot is confirmed."}</p>
        {reg.paymentStatus === "pending" && <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 mb-4 flex items-start gap-2 text-left"><Clock3 size={15} className="text-amber-600 flex-shrink-0 mt-0.5" /><p className="text-[12px] text-amber-700">Payment under review. Your pass works now — the organizer will confirm your payment shortly.</p></div>}
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-left space-y-2 mb-6">
          {[["Name", reg.name], ["Event", event.title], ["Date", fmtDate(event.date)], ["Pass", reg.qrCode], ...(reg.paymentRef ? [["Payment Ref", reg.paymentRef]] : []), ...(reg.needsCertificate ? [["Certificate", "Requested ✓"]] : [])].map(([k, v]) => (
            <div key={k} className="flex justify-between text-[12px]"><span className="text-slate-400">{k}</span><span className="font-semibold text-slate-700 text-right ml-3">{v}</span></div>
          ))}
        </div>
        <div className="space-y-2">
          <Btn variant="primary" size="lg" full icon={QrCode} onClick={() => nav(V.PASS, { regId: reg.id })}>View QR Pass</Btn>
          <div className="grid grid-cols-2 gap-2">
            <a href={googleCalUrl(event)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[12px] font-semibold text-slate-700 transition-all"><CalendarPlus size={14} />Google Cal</a>
            <button onClick={() => downloadICS(event)} className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 text-[12px] font-semibold text-slate-700 transition-all"><CalendarPlus size={14} />.ics file</button>
          </div>
          <Btn variant="ghost" full onClick={() => nav(V.HOME)}>Back to Events</Btn>
        </div>
      </Card>
    </div>
  )
}

// ─── QR PASS ────────────────────────────────────────────────────────────────
function PassPage({ nav, params }) {
  const reg = store.getRegistration(params.regId)
  const event = reg && store.getEvent(reg.eventId)
  if (!reg || !event) return null
  const QR = ({ code }) => (
    <svg viewBox="0 0 120 120" width={180} height={180} className="mx-auto">
      <rect width={120} height={120} fill="white" rx={8} />
      {[...Array(11)].map((_, r) => [...Array(11)].map((_, c) => {
        const seed = (code.charCodeAt((r * 11 + c) % code.length) + r * 7 + c * 13) % 4
        return seed === 0 ? <rect key={`${r}-${c}`} x={6 + c * 10} y={6 + r * 10} width={9} height={9} fill="#1a1a2e" rx={1} /> : null
      }))}
      {[[6,6],[81,6],[6,81]].map(([x,y],i) => <g key={i}><rect x={x} y={y} width={29} height={29} fill="none" stroke="#1a1a2e" strokeWidth={3} rx={2} /><rect x={x+5} y={y+5} width={19} height={19} fill="#1a1a2e" rx={2} /></g>)}
    </svg>
  )
  return (
    <div className="max-w-sm mx-auto px-5 py-8 text-center">
      <button onClick={() => nav(V.HOME)} className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800 mb-4 font-medium mx-auto"><ArrowLeft size={15} />Events</button>
      <Card className="p-6 overflow-hidden">
        <div className="-mx-6 -mt-6 mb-5 h-1.5 bg-gradient-to-r from-[#1a1a2e] to-[#e94560]" />
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">QR Event Pass</p>
        <h3 className="font-extrabold text-[17px]">{reg.name}</h3>
        <p className="text-[12px] text-slate-500 mb-5">{event.title}</p>
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 mb-4">
          <QR code={reg.qrCode} />
          <p className="text-[10px] font-mono text-slate-400 mt-2">{reg.qrCode}</p>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-left space-y-1.5 mb-4">
          {[["Date", fmtDate(event.date)], ["Time", fmtTime(event.startTime)], ["Venue", event.venue]].map(([k, v]) => <div key={k} className="flex justify-between text-[11px]"><span className="text-emerald-600/70">{k}</span><span className="font-semibold text-emerald-800 text-right ml-2">{v}</span></div>)}
          {reg.needsCertificate && <div className="pt-1.5 border-t border-emerald-100 flex items-center gap-1.5 text-[11px] text-violet-700 font-semibold"><Award size={11} />Certificate requested</div>}
        </div>
        {event.feedbackEnabled && <Btn variant="accent" size="md" full icon={MessageSquare} onClick={() => nav(V.FEEDBACK, { regId: reg.id })}>Leave Feedback</Btn>}
      </Card>
    </div>
  )
}

// ─── FEEDBACK PAGE ──────────────────────────────────────────────────────────
function FeedbackPage({ nav, params, toast, refresh }) {
  const reg = store.getRegistration(params.regId)
  const event = reg && store.getEvent(reg.eventId)
  const [r, setR] = useState({ q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 })
  const [comment, setComment] = useState("")
  const [important, setImportant] = useState(false)
  const [loading, setLoading] = useState(false)
  if (!reg || !event) return <div className="text-center py-20 text-slate-500">Not found.</div>
  if (reg.feedbackSubmitted) return (
    <div className="max-w-sm mx-auto px-5 py-16 text-center"><Card className="p-8"><CheckCircle2 size={36} className="text-emerald-500 mx-auto mb-3" /><h3 className="font-bold">Already submitted</h3><p className="text-[13px] text-slate-500 mt-1 mb-5">Thanks for your feedback!</p><Btn variant="secondary" full onClick={() => nav(V.PASS, { regId: reg.id })}>Back to Pass</Btn></Card></div>
  )
  const qs = ["Check-in experience", "Event organization", "Content quality", "Venue & facilities", "Overall satisfaction"]
  const avg = Object.values(r).some(v => v > 0) ? (Object.values(r).reduce((a, b) => a + b, 0) / 5).toFixed(1) : 0
  const count = store.getFeedback(event.id).length
  const badge = count >= 2 ? "🏆 Super Reviewer" : count >= 1 ? "⭐ Top Reviewer" : null
  const submit = () => {
    if (Object.values(r).some(v => v === 0)) { toast("Please rate all 5 questions", "error"); return }
    setLoading(true)
    setTimeout(() => {
      store.addFeedback({ registrationId: reg.id, eventId: event.id, ...r, comment, isImportant: important })
      refresh(); nav(V.FB_DONE, { regId: reg.id, badge, rating: avg })
    }, 700)
  }
  return (
    <div className="max-w-md mx-auto px-5 py-8">
      <button onClick={() => nav(V.PASS, { regId: reg.id })} className="flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-slate-800 mb-4 font-medium"><ArrowLeft size={15} />Back</button>
      <Card className="p-6">
        <div className="text-center mb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mx-auto mb-2"><MessageSquare size={22} className="text-[#e94560]" /></div>
          <h2 className="font-extrabold text-lg">How was it?</h2>
          <p className="text-[12px] text-slate-500">{event.title}</p>
          {badge && <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-[11px] font-semibold text-amber-700"><Trophy size={11} />Complete to earn {badge}</div>}
        </div>
        <div className="space-y-3">
          {qs.map((q, i) => (
            <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="text-[13px] font-medium text-slate-700">{q}</span>
              <StarRating size={18} value={r[`q${i + 1}`]} onChange={v => setR(s => ({ ...s, [`q${i + 1}`]: v }))} />
            </div>
          ))}
          <Textarea label="Comments & suggestions" value={comment} onChange={e => setComment(e.target.value)} rows={3} placeholder="What stood out? What could be better?" />
          <Toggle checked={important} onChange={setImportant} icon={Star} label="Flag as important for organizer" desc="Highlights this in their HQ report" color="#f59e0b" />
          {avg > 0 && <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-100"><span className="text-[13px] font-semibold text-emerald-700">Your average</span><span className="font-extrabold text-emerald-700">{avg} / 5</span></div>}
          <Btn variant="accent" size="lg" full icon={Send} loading={loading} onClick={submit}>Submit Feedback</Btn>
        </div>
      </Card>
    </div>
  )
}

function FeedbackDone({ nav, params }) {
  const { badge, rating } = params
  return (
    <div className="max-w-sm mx-auto px-5 py-16 text-center">
      <Card className="p-8">
        {badge ? <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center mx-auto mb-4 text-4xl">🏆</div>
          : <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4"><CheckCircle2 size={32} className="text-emerald-500" /></div>}
        <h2 className="text-xl font-extrabold mb-2">Thank you!</h2>
        {badge && <div className="inline-flex items-center gap-1.5 mb-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white font-bold text-[13px]"><Trophy size={14} />{badge}</div>}
        <p className="text-[13px] text-slate-500 mb-1">Your feedback helps improve future events.</p>
        {rating > 0 && <p className="text-[13px] text-slate-400 mb-6">You rated this {rating}/5</p>}
        <Btn variant="primary" size="lg" full icon={Calendar} onClick={() => nav(V.HOME)}>Browse More Events</Btn>
      </Card>
    </div>
  )
}

// ─── FIND MY PASS ───────────────────────────────────────────────────────────
function FindPassPage({ nav, toast }) {
  const [email, setEmail] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const search = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { toast("Enter a valid email", "error"); return }
    setLoading(true)
    setTimeout(() => {
      const regs = store.findRegistrationsByEmail(email).filter(r => !r.isWalkIn)
      setResults(regs); setLoading(false)
    }, 600)
  }
  return (
    <div className="max-w-md mx-auto px-5 py-10">
      <div className="text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-[#1a1a2e] flex items-center justify-center mx-auto mb-3"><QrCode size={26} className="text-white" /></div>
        <h1 className="text-xl font-extrabold">Find My Pass</h1>
        <p className="text-[13px] text-slate-500 mt-1">Enter the email you registered with to pull up your QR passes.</p>
      </div>
      <Card className="p-6">
        <div className="flex gap-2">
          <div className="flex-1"><Input value={email} onChange={e => setEmail(e.target.value)} icon={Mail} type="email" placeholder="you@email.com" /></div>
          <Btn variant="primary" icon={SearchIcon} loading={loading} onClick={search}>Find</Btn>
        </div>
        {results !== null && (
          <div className="mt-5">
            {results.length === 0 ? (
              <div className="text-center py-8"><Search size={28} className="text-slate-300 mx-auto mb-2" /><p className="text-[13px] font-semibold text-slate-500">No passes found</p><p className="text-[12px] text-slate-400 mt-1">Double-check the email, or register for an event first.</p></div>
            ) : (
              <div className="space-y-2">
                <p className="text-[12px] font-semibold text-slate-500 mb-2">{results.length} pass{results.length > 1 ? "es" : ""} found</p>
                {results.map(r => { const ev = store.getEvent(r.eventId); return (
                  <button key={r.id} onClick={() => nav(V.PASS, { regId: r.id })} className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left">
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">{ev?.image && <img src={ev.image} alt="" className="w-full h-full object-cover" />}</div>
                    <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold truncate">{ev?.title}</p><p className="text-[11px] text-slate-400">{fmtDate(ev?.date)} · {r.attended ? "Checked in" : "Registered"}</p></div>
                    <ChevronRight size={16} className="text-slate-300" />
                  </button>
                )})}
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  )
}

// ─── ORGANIZER SHELL ────────────────────────────────────────────────────────
function OrgShell({ children, nav, view, onExit, setCreateOpen, toast }) {
  const org = store.getOrg()
  const analytics = store.getAnalytics()
  const items = [
    { icon: BarChart3, label: "Dashboard", v: V.ORG_DASH },
    { icon: Hourglass, label: "Approvals", v: V.ORG_APPROVALS, badge: analytics.pendingApprovals },
    { icon: ScanLine, label: "Scanner", v: V.ORG_SCAN },
    { icon: MessageSquare, label: "Feedback", v: V.ORG_FEEDBACK },
    { icon: FileText, label: "Reports", v: V.ORG_REPORTS },
    { icon: ClipboardList, label: "Checklists", v: V.ORG_TEMPLATES },
    { icon: Building2, label: "Profile", v: V.ORG_PROFILE },
  ]
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 bg-[#1a1a2e] flex flex-col sticky top-0 h-screen flex-shrink-0">
        <div className="px-5 h-16 flex items-center gap-2 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-[#e94560] flex items-center justify-center"><QrCode size={17} className="text-white" /></div>
          <span className="font-extrabold text-white text-[15px]">QR-Attend</span>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map(({ icon: Icon, label, v, badge }) => (
            <button key={v} onClick={() => nav(v)} className={cn("w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13px] font-semibold transition-all", view === v ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5")}>
              <Icon size={17} /><span className="flex-1 text-left">{label}</span>
              {badge > 0 && <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#e94560] text-white text-[10px] font-bold flex items-center justify-center">{badge}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e94560] to-[#6d28d9] flex items-center justify-center text-white font-bold text-[13px]">{org.name[0]}</div>
            <div className="min-w-0"><p className="text-[12px] font-semibold text-white truncate">{org.name}</p><p className="text-[10px] text-slate-400 truncate">{org.organizedBy}</p></div>
          </div>
          <button onClick={onExit} className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-[12px] text-slate-400 hover:text-white hover:bg-white/5"><LogOut size={15} />Exit to public site</button>
        </div>
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <span />
          <Btn variant="accent" size="md" icon={Plus} onClick={() => setCreateOpen(true)}>Create Event</Btn>
        </header>
        <main className="flex-1 p-6 max-w-6xl w-full animate-fade">{children}</main>
      </div>
    </div>
  )
}

// ─── ORG DASHBOARD ──────────────────────────────────────────────────────────
function OrgDashboard({ nav, setCreateOpen }) {
  const a = store.getAnalytics()
  const events = store.getEvents().filter(e => e.status === "approved" || e.status === "completed")
  const regs = store.getRegistrations()
  const typeData = ["Conference", "Workshop", "Networking", "Meetup", "Seminar"].map(t => ({ name: t, value: store.getEvents().filter(e => e.type === t).length })).filter(d => d.value > 0)
  const chartData = events.map(e => { const r = store.getRegistrations(e.id); return { name: e.title.slice(0, 14) + "…", reg: r.length, att: r.filter(x => x.attended).length } })
  const recent = [...regs].sort((x, y) => new Date(y.registeredAt) - new Date(x.registeredAt)).slice(0, 5)
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Dashboard</h1><p className="text-[13px] text-slate-500">Your events at a glance · {locale.flag} {locale.city}</p></div>
      </div>
      {a.pendingApprovals > 0 && (
        <Card className="p-4 flex items-center gap-3 bg-amber-50 border-amber-200" hover onClick={() => nav(V.ORG_APPROVALS)}>
          <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center text-white"><Hourglass size={17} /></div>
          <div className="flex-1"><p className="text-[13px] font-bold text-amber-800">{a.pendingApprovals} event{a.pendingApprovals > 1 ? "s" : ""} awaiting approval</p><p className="text-[11px] text-amber-600">Review and publish them to go live.</p></div>
          <ChevronRight size={18} className="text-amber-500" />
        </Card>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={Calendar} label="Live Events" value={a.totalEvents} color="#1a1a2e" />
        <KPI icon={Users} label="Registrations" value={a.totalRegistrations} color="#0f9d8f" />
        <KPI icon={CheckCircle2} label="Attendance" value={`${a.attendanceRate}%`} sub={`${a.totalAttended} checked in`} color="#6d28d9" />
        <KPI icon={Star} label="Satisfaction" value={`${a.avgSatisfaction}/5`} sub={`${a.totalFeedback} reviews`} color="#f59e0b" />
      </div>
      <div className="grid lg:grid-cols-[2fr_1fr] gap-5">
        <Card className="p-5">
          <h3 className="font-bold text-[14px] mb-4">Registrations vs Attendance</h3>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart data={chartData} barSize={16}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }} />
              <Bar dataKey="reg" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Registered" />
              <Bar dataKey="att" fill="#1a1a2e" radius={[4, 4, 0, 0]} name="Attended" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-5">
          <h3 className="font-bold text-[14px] mb-4">Event Types</h3>
          {typeData.length > 0 ? <>
            <ResponsiveContainer width="100%" height={150}>
              <RPieChart><Pie data={typeData} dataKey="value" cx="50%" cy="50%" outerRadius={58} paddingAngle={3}>{typeData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}</Pie></RPieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-x-3 gap-y-1 justify-center mt-2">{typeData.map((d, i) => <span key={d.name} className="text-[10px] text-slate-500 flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />{d.name}</span>)}</div>
          </> : <p className="text-center text-slate-400 text-[12px] py-10">No data</p>}
        </Card>
      </div>
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-[14px]">Your Events</h3></div>
        <div className="space-y-2.5">
          {events.map(e => {
            const r = store.getRegistrations(e.id), done = e.tasks.filter(t => t.done).length
            return (
              <div key={e.id} onClick={() => nav(V.ORG_EVENT, { id: e.id })} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 cursor-pointer transition-all">
                <div className="w-11 h-11 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">{e.image && <img src={e.image} alt="" className="w-full h-full object-cover" />}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate">{e.title}</p>
                  <p className="text-[11px] text-slate-400">{fmtDate(e.date)} · {r.length} reg · {done}/{e.tasks.length} tasks</p>
                </div>
                {e.status === "completed" ? <Badge color="slate">Done</Badge> : <Badge color="green">Live</Badge>}
                <ChevronRight size={16} className="text-slate-300" />
              </div>
            )
          })}
          {events.length === 0 && <button onClick={() => setCreateOpen(true)} className="w-full py-8 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 text-[13px] hover:border-slate-300 hover:text-slate-500">+ Create your first event</button>}
        </div>
      </Card>
    </div>
  )
}

// ─── ORG APPROVALS ──────────────────────────────────────────────────────────
function OrgApprovals({ nav, toast, refresh }) {
  const pending = store.getEvents().filter(e => e.status === "pending")
  const approve = (id) => { store.approveEvent(id); refresh(); toast("Event approved & published!", "success") }
  const reject = (id) => { store.rejectEvent(id); refresh(); toast("Event rejected", "info") }
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-extrabold">Approvals</h1><p className="text-[13px] text-slate-500">Review events before they go live</p></div>
      {pending.length === 0 ? (
        <Card className="p-12 text-center"><BadgeCheck size={40} className="text-emerald-400 mx-auto mb-3" /><p className="font-semibold text-slate-600">All caught up</p><p className="text-[13px] text-slate-400 mt-1">No events waiting for approval.</p></Card>
      ) : (
        <div className="space-y-3">
          {pending.map(e => (
            <Card key={e.id} className="overflow-hidden">
              <div className="flex">
                <div className="w-40 bg-slate-100 flex-shrink-0">{e.image && <img src={e.image} alt="" className="w-full h-full object-cover" />}</div>
                <div className="flex-1 p-4">
                  <div className="flex items-center gap-2 mb-1.5"><Badge color="amber"><Hourglass size={10} />Pending</Badge><PriceTag event={e} /><Badge color="slate" size="xs">{e.type}</Badge></div>
                  <h3 className="font-bold text-[15px]">{e.title}</h3>
                  <p className="text-[12px] text-slate-500 mt-1 line-clamp-2">{e.description}</p>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-3"><span className="flex items-center gap-1"><Calendar size={11} />{fmtDate(e.date)}</span><span className="flex items-center gap-1"><MapPin size={11} />{e.venue}</span><span className="flex items-center gap-1"><User size={11} />{e.organizedBy}</span></p>
                  <div className="flex items-center gap-2 mt-3">
                    <Btn variant="primary" size="sm" icon={Check} onClick={() => approve(e.id)}>Approve & Publish</Btn>
                    <Btn variant="secondary" size="sm" icon={Eye} onClick={() => nav(V.ORG_EVENT, { id: e.id })}>Preview</Btn>
                    <Btn variant="ghost" size="sm" icon={X} onClick={() => reject(e.id)}>Reject</Btn>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── ORG EVENT DETAIL ───────────────────────────────────────────────────────
function OrgEventDetail({ nav, params, toast, refresh }) {
  const [, force] = useState(0)
  const rr = () => { refresh(); force(x => x + 1) }
  const event = store.getEvent(params.id)
  const [tab, setTab] = useState("overview")
  const [newTask, setNewTask] = useState("")
  const [guestSearch, setGuestSearch] = useState("")
  const [guestFilter, setGuestFilter] = useState("all")
  const [proofModal, setProofModal] = useState(null)
  if (!event) return null
  const regs = store.getRegistrations(event.id), att = regs.filter(r => r.attended), fb = store.getFeedback(event.id)
  const done = event.tasks.filter(t => t.done).length, total = event.tasks.length
  const avg = fb.length ? (fb.reduce((s, f) => s + (f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5, 0) / fb.length).toFixed(1) : "—"
  const highlighted = fb.filter(f => f.isHighlighted)
  const pendingPayments = regs.filter(r => r.paymentStatus === "pending")

  const exportGuests = () => {
    let csv = `Name,Email,Status,Check-in,Needs Cert,Feedback,Payment Ref,Payment Status\n`
    regs.forEach(r => { csv += `"${r.name}","${r.email}","${r.attended ? "Checked in" : "Registered"}","${r.checkInTime || ""}","${r.needsCertificate ? "Yes" : "No"}","${r.feedbackSubmitted ? "Yes" : "No"}","${r.paymentRef || ""}","${r.paymentStatus || "n/a"}"\n` })
    const blob = new Blob([csv], { type: "text/csv" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `guests-${event.slug}.csv`; a.click()
    toast("Guest list exported!", "success")
  }

  const exportReport = () => {
    let csv = `POST-EVENT REPORT\n${event.title}\n\nDate,${fmtDateLong(event.date)}\nVenue,${event.venue}\nLocation,${event.location}\nOrganized by,${event.organizedBy}\nLocale,${locale.city} (${locale.region}, ${locale.country})\n\nMETRICS\nRegistered,${regs.length}\nAttended,${att.length}\nAttendance Rate,${regs.length ? ((att.length / regs.length) * 100).toFixed(1) : 0}%\nFeedback,${fb.length}\nAvg Satisfaction,${avg}\nCertificates needed,${regs.filter(r => r.needsCertificate && r.attended).length}\n\nIMPORTANT COMMENTS\n`
    highlighted.forEach(f => { const r = store.getRegistration(f.registrationId); csv += `"${r?.name}","${f.comment}",${((f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5).toFixed(1)}\n` })
    csv += `\nATTENDANCE\nName,Email,Check-in,Needs Cert,Feedback\n`
    regs.forEach(r => { csv += `"${r.name}","${r.email}","${r.checkInTime || ""}","${r.needsCertificate ? "Yes" : "No"}","${r.feedbackSubmitted ? "Yes" : "No"}"\n` })
    const blob = new Blob([csv], { type: "text/csv" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = `report-${event.slug}.csv`; a.click()
    toast("Report downloaded!", "success")
  }
  const tabs = ["overview", "checklist", "guests", ...(event.pricing === "paid" ? ["payments"] : []), "feedback", "report"]
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => nav(V.ORG_DASH)} className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50"><ArrowLeft size={16} /></button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            {event.status === "pending" ? <Badge color="amber"><Hourglass size={10} />Pending</Badge> : event.status === "completed" ? <Badge color="slate">Completed</Badge> : <Badge color="green">Live</Badge>}
            {event.isPrivate && <Badge color="rose"><Lock size={10} />Private</Badge>}<PriceTag event={event} />
          </div>
          <h1 className="text-xl font-extrabold truncate">{event.title}</h1>
        </div>
        <Btn variant="secondary" size="sm" icon={Pencil} onClick={() => nav(V.ORG_EDIT, { id: event.id })}>Edit</Btn>
        <Btn variant="secondary" size="sm" icon={ScanLine} onClick={() => nav(V.ORG_SCAN, { id: event.id })}>Scan</Btn>
        <Btn variant="primary" size="sm" icon={Download} onClick={exportReport}>Report</Btn>
      </div>

      <div className="flex gap-1 border-b border-slate-200 overflow-x-auto">
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={cn("px-4 py-2.5 text-[13px] font-semibold capitalize whitespace-nowrap border-b-2 -mb-px transition-all", tab === t ? "border-[#1a1a2e] text-[#1a1a2e]" : "border-transparent text-slate-400 hover:text-slate-600")}>{t}</button>)}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPI icon={Users} label="Registered" value={regs.length} sub={`of ${event.capacity}`} color="#1a1a2e" />
            <KPI icon={CheckCircle2} label="Attended" value={att.length} sub={`${regs.length ? ((att.length / regs.length) * 100).toFixed(0) : 0}%`} color="#0f9d8f" />
            <KPI icon={MessageSquare} label="Feedback" value={fb.length} color="#6d28d9" />
            <KPI icon={Star} label="Avg Rating" value={avg} color="#f59e0b" />
          </div>
          {event.isPrivate && event.privateLink && (
            <Card className="p-4">
              <p className="text-[12px] font-bold mb-2 flex items-center gap-1.5"><Lock size={13} className="text-[#e94560]" />Private invite link</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-[11px] bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 truncate">/events/{event.slug}?access={event.privateLink}</code>
                <button onClick={() => { navigator.clipboard?.writeText(`/events/${event.slug}?access=${event.privateLink}`); toast("Copied!", "success") }} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200"><Copy size={14} /></button>
              </div>
            </Card>
          )}
          <Card className="p-5">
            <p className="text-[12px] font-bold mb-3">Event details</p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {[["Date", fmtDateLong(event.date)], ["Time", `${fmtTime(event.startTime)} – ${fmtTime(event.endTime)}`], ["Venue", event.venue], ["Industry", event.industry], ["Organized by", event.organizedBy], ["Capacity", event.capacity]].map(([k, v]) => (
                <div key={k} className="p-2.5 rounded-lg bg-slate-50"><p className="text-[10px] font-bold text-slate-400 uppercase">{k}</p><p className="text-[13px] font-medium text-slate-700 mt-0.5">{v}</p></div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "checklist" && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div><p className="font-bold text-[14px]">Checklist / To-do</p><p className="text-[11px] text-slate-400">{done}/{total} done</p></div>
            <div className="relative w-12 h-12">
              <svg viewBox="0 0 48 48" className="w-12 h-12"><circle cx={24} cy={24} r={20} fill="none" stroke="#e2e8f0" strokeWidth={5} /><circle cx={24} cy={24} r={20} fill="none" stroke={done === total && total ? "#0f9d8f" : "#1a1a2e"} strokeWidth={5} strokeDasharray={`${(done / Math.max(total, 1)) * 125.6} 125.6`} strokeLinecap="round" transform="rotate(-90 24 24)" /><text x={24} y={28} textAnchor="middle" fontSize={11} fontWeight={700} fill="#1a1a2e">{total ? Math.round((done / total) * 100) : 0}%</text></svg>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            {event.tasks.map(t => (
              <button key={t.id} onClick={() => { store.toggleTask(event.id, t.id); rr() }} className={cn("w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all", t.done ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200 hover:border-slate-300")}>
                {t.done ? <CheckSquare size={17} className="text-emerald-500" /> : <Square size={17} className="text-slate-300" />}
                <span className={cn("text-[13px] flex-1", t.done ? "line-through text-emerald-700" : "text-slate-700")}>{t.label}</span>
              </button>
            ))}
            {total === 0 && <p className="text-center text-slate-400 text-[12px] py-4">No tasks yet — add some below.</p>}
          </div>
          <div className="flex gap-2">
            <input value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => { if (e.key === "Enter" && newTask.trim()) { store.addTask(event.id, newTask); setNewTask(""); rr() } }} placeholder="Add a task…" className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm outline-none focus:border-[#1a1a2e]" />
            <Btn variant="primary" icon={Plus} onClick={() => { if (newTask.trim()) { store.addTask(event.id, newTask); setNewTask(""); rr() } }}>Add</Btn>
          </div>
        </Card>
      )}

      {tab === "guests" && (() => {
        let list = regs
        if (guestSearch) list = list.filter(r => r.name.toLowerCase().includes(guestSearch.toLowerCase()) || r.email.toLowerCase().includes(guestSearch.toLowerCase()))
        if (guestFilter === "checked-in") list = list.filter(r => r.attended)
        if (guestFilter === "not-in") list = list.filter(r => !r.attended)
        if (guestFilter === "cert") list = list.filter(r => r.needsCertificate)
        if (guestFilter === "walk-in") list = list.filter(r => r.isWalkIn)
        return (
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4 gap-2">
              <p className="font-bold text-[14px] whitespace-nowrap">Guests ({list.length})</p>
              <div className="flex items-center gap-2">
                <Btn variant="secondary" size="sm" icon={FileSpreadsheet} onClick={exportGuests}>Export</Btn>
                <Btn variant="secondary" size="sm" icon={ScanLine} onClick={() => nav(V.ORG_SCAN, { id: event.id })}>Scan</Btn>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <div className="relative flex-1 min-w-[180px]">
                <SearchIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={guestSearch} onChange={e => setGuestSearch(e.target.value)} placeholder="Search name or email…" className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] outline-none focus:border-[#1a1a2e]" />
              </div>
              <select value={guestFilter} onChange={e => setGuestFilter(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-200 bg-white text-[13px] outline-none">
                <option value="all">All</option><option value="checked-in">Checked in</option><option value="not-in">Not checked in</option><option value="cert">Needs certificate</option><option value="walk-in">Walk-ins</option>
              </select>
            </div>
            <div className="space-y-2">
              {list.map(r => (
                <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
                  <div className={cn("w-9 h-9 rounded-full flex items-center justify-center font-bold text-[13px]", r.attended ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400")}>{r.name[0]}</div>
                  <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold truncate">{r.name} {r.isWalkIn && <Badge color="blue" size="xs">Walk-in</Badge>}</p><p className="text-[11px] text-slate-400 truncate">{r.email}</p></div>
                  <div className="flex items-center gap-1.5">
                    {r.paymentStatus === "pending" && <Badge color="amber" size="xs"><Clock3 size={9} />Pay?</Badge>}
                    {r.paymentStatus === "verified" && <Badge color="green" size="xs"><Check size={9} />Paid</Badge>}
                    {r.needsCertificate && <Badge color="violet" size="xs"><Award size={9} />Cert</Badge>}
                    {r.attended ? <Badge color="green" size="xs"><CheckCircle2 size={9} />In</Badge> : <Badge color="slate" size="xs">Not in</Badge>}
                    {r.feedbackSubmitted && <Badge color="amber" size="xs"><Star size={9} />FB</Badge>}
                  </div>
                </div>
              ))}
              {list.length === 0 && <p className="text-center text-slate-400 text-[12px] py-6">No guests match.</p>}
            </div>
          </Card>
        )
      })()}

      {tab === "payments" && (
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div><p className="font-bold text-[14px]">Payment Verification</p><p className="text-[11px] text-slate-400">{pendingPayments.length} awaiting review · ₱{event.price} each</p></div>
          </div>
          <div className="space-y-2">
            {regs.filter(r => r.paymentRef).map(r => (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate">{r.name}</p>
                  <p className="text-[11px] text-slate-400">Ref: <span className="font-mono">{r.paymentRef}</span></p>
                </div>
                {r.paymentScreenshot && <button onClick={() => setProofModal(r)} className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-semibold text-slate-600 flex items-center gap-1.5"><Eye size={12} />Proof</button>}
                {r.paymentStatus === "pending" ? (
                  <div className="flex gap-1.5">
                    <button onClick={() => { store.verifyPayment(r.id, true); rr(); toast("Payment verified", "success") }} className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-white text-[11px] font-semibold flex items-center gap-1"><Check size={12} />Verify</button>
                    <button onClick={() => { store.verifyPayment(r.id, false); rr(); toast("Payment rejected", "info") }} className="px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-500 text-[11px] font-semibold flex items-center gap-1"><X size={12} />Reject</button>
                  </div>
                ) : r.paymentStatus === "verified" ? <Badge color="green"><Check size={10} />Verified</Badge> : <Badge color="rose"><X size={10} />Rejected</Badge>}
              </div>
            ))}
            {regs.filter(r => r.paymentRef).length === 0 && <p className="text-center text-slate-400 text-[12px] py-6">No payments submitted yet.</p>}
          </div>
          <Modal open={!!proofModal} onClose={() => setProofModal(null)} title={proofModal ? `${proofModal.name} — Payment Proof` : ""} size="md">
            {proofModal && <div className="p-5">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 mb-3"><p className="text-[12px]"><span className="text-slate-400">Reference:</span> <span className="font-mono font-semibold">{proofModal.paymentRef}</span></p></div>
              <img src={proofModal.paymentScreenshot} alt="payment proof" className="w-full rounded-xl border border-slate-200" />
              <div className="flex gap-2 mt-4">
                <Btn variant="primary" full icon={Check} onClick={() => { store.verifyPayment(proofModal.id, true); rr(); toast("Payment verified", "success"); setProofModal(null) }}>Verify Payment</Btn>
                <Btn variant="secondary" icon={X} onClick={() => { store.verifyPayment(proofModal.id, false); rr(); toast("Rejected", "info"); setProofModal(null) }}>Reject</Btn>
              </div>
            </div>}
          </Modal>
        </Card>
      )}

      {tab === "feedback" && (
        <div className="space-y-3">
          {highlighted.length > 0 && (
            <Card className="p-5 bg-amber-50 border-amber-200">
              <p className="text-[13px] font-bold text-amber-800 mb-3 flex items-center gap-1.5"><Star size={14} />Important comments ({highlighted.length})</p>
              <div className="space-y-2">
                {highlighted.map(f => { const r = store.getRegistration(f.registrationId); return (
                  <div key={f.id} className="p-3 rounded-xl bg-white border border-amber-200">
                    <div className="flex justify-between mb-1"><span className="text-[12px] font-semibold">{r?.name} {f.badge && <span>{f.badge}</span>}</span><span className="text-[11px] font-bold text-amber-600">★ {((f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5).toFixed(1)}</span></div>
                    <p className="text-[12px] text-slate-600">{f.comment}</p>
                  </div>
                )})}
              </div>
            </Card>
          )}
          {fb.map(f => { const r = store.getRegistration(f.registrationId); const av = ((f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5).toFixed(1); return (
            <Card key={f.id} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[12px] font-bold text-slate-600">{r?.name?.[0]}</div><div><p className="text-[12px] font-semibold">{r?.name} {f.badge && <span className="text-[10px]">{f.badge}</span>}</p><p className="text-[10px] text-slate-400">{new Date(f.submittedAt).toLocaleDateString()}</p></div></div>
                <StarRating size={15} value={Math.round(av)} readonly />
              </div>
              {f.comment && <p className="text-[12px] text-slate-600 pl-10">{f.comment}</p>}
            </Card>
          )})}
          {fb.length === 0 && <Card className="p-10 text-center"><MessageSquare size={32} className="text-slate-300 mx-auto mb-2" /><p className="text-[13px] text-slate-400">No feedback yet</p></Card>}
        </div>
      )}

      {tab === "report" && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-5"><div><h3 className="font-extrabold text-[16px]">Post-Event Report</h3><p className="text-[12px] text-slate-400">Summary for HQ reporting</p></div><Btn variant="primary" icon={Download} onClick={exportReport}>Download CSV</Btn></div>
          <div className="grid sm:grid-cols-2 gap-2.5 mb-5">
            {[["Event", event.title], ["Date", fmtDate(event.date)], ["Venue", event.venue], ["Locale", `${event.location} · ${locale.region}`], ["Registered", regs.length], ["Attended", `${att.length} (${regs.length ? ((att.length / regs.length) * 100).toFixed(0) : 0}%)`], ["Certificates", regs.filter(r => r.needsCertificate && r.attended).length], ["Feedback", fb.length], ["Avg Satisfaction", avg]].map(([k, v]) => (
              <div key={k} className="p-3 rounded-lg bg-slate-50 border border-slate-200"><p className="text-[10px] font-bold text-slate-400 uppercase">{k}</p><p className="text-[13px] font-semibold text-slate-700 mt-0.5">{String(v)}</p></div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-[#1a1a2e] text-white">
            <p className="text-[12px] font-bold mb-1 flex items-center gap-1.5"><MapPinned size={13} />Locale metrics for HQ</p>
            <p className="text-[12px] text-slate-300">{locale.city}, {locale.region}, {locale.country} {locale.flag} · Attendance {regs.length ? ((att.length / regs.length) * 100).toFixed(1) : 0}% · Feedback {att.length ? ((fb.length / att.length) * 100).toFixed(1) : 0}%</p>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── ORG SCANNER ────────────────────────────────────────────────────────────
// ─── ORG EDIT EVENT ─────────────────────────────────────────────────────────
function OrgEditEvent({ nav, params, toast, refresh }) {
  const event = store.getEvent(params.id)
  const [form, setForm] = useState(() => event ? { ...event, capacity: String(event.capacity), price: String(event.price || ""), tags: (event.tags || []).join(", "), socials: { ...event.socials } } : null)
  const [loading, setLoading] = useState(false)
  if (!event || !form) return null
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const upS = (k, v) => setForm(f => ({ ...f, socials: { ...f.socials, [k]: v } }))
  const save = () => {
    if (!form.title || !form.venue || !form.date) { toast("Title, venue and date are required", "error"); return }
    setLoading(true)
    setTimeout(() => {
      store.updateEvent(event.id, { ...form, capacity: parseInt(form.capacity) || 50, price: form.pricing === "paid" ? (parseInt(form.price) || 0) : 0, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) })
      refresh(); setLoading(false); toast("Event updated!", "success"); nav(V.ORG_EVENT, { id: event.id })
    }, 700)
  }
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <button onClick={() => nav(V.ORG_EVENT, { id: event.id })} className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50"><ArrowLeft size={16} /></button>
        <div><h1 className="text-xl font-extrabold">Edit Event</h1><p className="text-[13px] text-slate-500">Update details — changes go live immediately</p></div>
      </div>
      <Card className="p-6 space-y-4">
        <p className="font-bold text-[13px]">Details</p>
        <Input label="Title" value={form.title} onChange={e => up("title", e.target.value)} required />
        <div className="grid grid-cols-2 gap-3">
          <Select label="Type" value={form.type} onChange={e => up("type", e.target.value)} options={["Meetup", "Conference", "Workshop", "Seminar", "Networking", "Training"].map(v => ({ value: v, label: v }))} />
          <Select label="Industry" value={form.industry} onChange={e => up("industry", e.target.value)} options={["Technology", "Education", "Design", "Finance", "Healthcare", "Marketing", "Real Estate", "Other"].map(v => ({ value: v, label: v }))} />
        </div>
        <Textarea label="Description" value={form.description} onChange={e => up("description", e.target.value)} rows={4} />
        <Input label="Venue" value={form.venue} onChange={e => up("venue", e.target.value)} icon={MapPin} required />
        <Input label="Location / City" value={form.location} onChange={e => up("location", e.target.value)} icon={MapPinned} />
        <div className="grid grid-cols-3 gap-3">
          <Input label="Date" value={form.date} onChange={e => up("date", e.target.value)} type="date" required />
          <Input label="Start" value={form.startTime} onChange={e => up("startTime", e.target.value)} type="time" />
          <Input label="End" value={form.endTime} onChange={e => up("endTime", e.target.value)} type="time" />
        </div>
        <Input label="Cover Image URL" value={form.image} onChange={e => up("image", e.target.value)} icon={ImageIcon} />
        <Input label="Capacity" value={form.capacity} onChange={e => up("capacity", e.target.value)} type="number" icon={Users} />
      </Card>
      <Card className="p-6 space-y-4">
        <p className="font-bold text-[13px]">Pricing & Settings</p>
        <div className="grid grid-cols-3 gap-2">
          {[["free", "Free", Ticket], ["paid", "Paid", DollarSign], ["walk-in", "Walk-in", UserCheck]].map(([k, l, Icon]) => (
            <button key={k} onClick={() => up("pricing", k)} className={cn("flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all", form.pricing === k ? "border-[#1a1a2e] bg-slate-50" : "border-slate-200 hover:border-slate-300")}>
              <Icon size={18} className={form.pricing === k ? "text-[#1a1a2e]" : "text-slate-400"} /><span className={cn("text-[12px] font-semibold", form.pricing === k ? "text-slate-800" : "text-slate-500")}>{l}</span>
            </button>
          ))}
        </div>
        {form.pricing === "paid" && <Input label="Price (₱)" value={form.price} onChange={e => up("price", e.target.value)} type="number" icon={DollarSign} />}
        <Toggle checked={form.allowWalkIns} onChange={v => up("allowWalkIns", v)} icon={UserCheck} label="Allow walk-ins" color="#0f9d8f" />
        <Toggle checked={form.isPrivate} onChange={v => up("isPrivate", v)} icon={Lock} label="Private event" color="#e94560" />
        <Toggle checked={form.requiresCertificate} onChange={v => up("requiresCertificate", v)} icon={Award} label="Certificate of attendance" color="#6d28d9" />
        <Toggle checked={form.feedbackEnabled} onChange={v => up("feedbackEnabled", v)} icon={MessageSquare} label="Collect feedback" color="#1a1a2e" />
        <Input label="Tags" value={form.tags} onChange={e => up("tags", e.target.value)} icon={Tag} placeholder="AI, Networking" />
      </Card>
      <div className="flex items-center justify-between">
        <Btn variant="ghost" onClick={() => nav(V.ORG_EVENT, { id: event.id })}>Cancel</Btn>
        <Btn variant="accent" size="lg" icon={Check} loading={loading} onClick={save}>Save Changes</Btn>
      </div>
    </div>
  )
}

function OrgScanner({ nav, params, toast, refresh }) {
  const events = store.getEvents().filter(e => e.status !== "rejected")
  const [eventId, setEventId] = useState(() => params.id || events.find(e => e.status !== 'completed')?.id || events[0]?.id || "")
  const [input, setInput] = useState("")
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const scan = () => {
    if (!input.trim()) return
    const res = store.markAttendance(input.trim())
    if (res.success) { toast(`✓ ${res.registration.name} checked in`, "success"); refresh() }
    else if (res.type === "duplicate") toast(`Already in: ${res.registration.name}`, "error")
    else toast("QR not found", "error")
    setResult(res); setHistory(h => [{ ...res, qr: input.trim(), time: new Date() }, ...h.slice(0, 7)]); setInput("")
  }
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">QR Scanner</h1><p className="text-[13px] text-slate-500">Check guests in by scanning their pass</p></div>
      </div>
      {(() => {
        const r = store.getRegistrations(eventId), inCount = r.filter(x => x.attended).length
        const pct = r.length ? (inCount / r.length) * 100 : 0
        return (
          <Card className="p-5 bg-[#1a1a2e] text-white">
            <div className="flex items-center justify-between mb-3">
              <div><p className="text-[11px] text-slate-300 uppercase tracking-wide font-bold">Live check-in</p><p className="text-3xl font-extrabold mt-1">{inCount}<span className="text-slate-400 text-lg"> / {r.length}</span></p></div>
              <div className="text-right"><p className="text-2xl font-extrabold text-emerald-400">{pct.toFixed(0)}%</p><p className="text-[11px] text-slate-400">checked in</p></div>
            </div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} /></div>
          </Card>
        )
      })()}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5">
          <p className="font-bold text-[14px] mb-3">Scan / enter code</p>
          <Select label="Event" value={eventId} onChange={e => setEventId(e.target.value)} options={events.map(e => ({ value: e.id, label: e.title }))} />
          <div className="mt-3"><Input label="QR Code" value={input} onChange={e => setInput(e.target.value)} icon={QrCode} placeholder="QR-E001-P001" /></div>
          <div className="flex gap-2 mt-3">
            <Btn variant="primary" icon={ScanLine} onClick={scan}>Verify</Btn>
            <Btn variant="secondary" icon={RefreshCw} onClick={() => { const r = store.getRegistrations(eventId).find(x => !x.attended); if (r) setInput(r.qrCode); else toast("All checked in", "info") }}>Demo code</Btn>
          </div>
        </Card>
        {result && (
          <Card className={cn("p-5 flex flex-col items-center justify-center text-center", result.success ? "bg-emerald-50 border-emerald-200" : result.type === "duplicate" ? "bg-amber-50 border-amber-200" : "bg-rose-50 border-rose-200")}>
            <div className="text-4xl mb-2">{result.success ? "✅" : result.type === "duplicate" ? "⚠️" : "❌"}</div>
            <p className={cn("font-extrabold", result.success ? "text-emerald-700" : result.type === "duplicate" ? "text-amber-700" : "text-rose-700")}>{result.success ? "Checked in!" : result.type === "duplicate" ? "Already in" : "Not found"}</p>
            {result.registration && <div className="mt-2"><p className="text-[14px] font-semibold">{result.registration.name}</p><p className="text-[12px] text-slate-500">{result.registration.email}</p>{result.registration.needsCertificate && <div className="mt-1.5"><Badge color="violet" size="xs"><Award size={9} />Needs certificate</Badge></div>}</div>}
          </Card>
        )}
      </div>
      {history.length > 0 && (
        <Card className="p-5">
          <p className="font-bold text-[14px] mb-3">Recent scans</p>
          <div className="space-y-1.5">
            {history.map((h, i) => (
              <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0">
                <span className="text-lg">{h.success ? "✅" : h.type === "duplicate" ? "⚠️" : "❌"}</span>
                <div className="flex-1"><p className="text-[12px] font-semibold">{h.registration?.name || h.qr}</p><p className="text-[10px] text-slate-400">{h.time.toLocaleTimeString()}</p></div>
                {h.registration?.needsCertificate && <Badge color="violet" size="xs">Cert</Badge>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}

// ─── ORG FEEDBACK ───────────────────────────────────────────────────────────
function OrgFeedback({ nav }) {
  const events = store.getEvents()
  const [filter, setFilter] = useState("")
  const fb = store.getFeedback(filter || undefined)
  const att = store.getRegistrations(filter || undefined).filter(r => r.attended)
  const rate = att.length ? ((fb.length / att.length) * 100).toFixed(0) : 0
  const avg = fb.length ? (fb.reduce((s, f) => s + (f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5, 0) / fb.length).toFixed(1) : "0"
  const highlighted = fb.filter(f => f.isHighlighted)
  const qLabels = ["Check-in experience", "Event organization", "Content quality", "Venue & facilities", "Overall satisfaction"]
  const qScores = ["q1", "q2", "q3", "q4", "q5"].map((k, i) => ({ label: qLabels[i], value: fb.length ? parseFloat((fb.reduce((s, f) => s + (f[k] || 0), 0) / fb.length).toFixed(1)) : 0 }))
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Feedback</h1><p className="text-[13px] text-slate-500">Participant satisfaction insights</p></div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-[13px] outline-none"><option value="">All events</option>{events.map(e => <option key={e.id} value={e.id}>{e.title}</option>)}</select>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <KPI icon={MessageSquare} label="Responses" value={fb.length} color="#1a1a2e" />
        <KPI icon={Percent} label="Response Rate" value={`${rate}%`} sub={`${fb.length} of ${att.length} attendees`} color="#0f9d8f" />
        <KPI icon={Star} label="Avg Rating" value={`${avg}/5`} color="#f59e0b" />
      </div>
      {highlighted.length > 0 && (
        <Card className="p-5 bg-amber-50 border-amber-200">
          <p className="text-[13px] font-bold text-amber-800 mb-3">⭐ Important comments ({highlighted.length})</p>
          <div className="space-y-2">{highlighted.map(f => { const r = store.getRegistration(f.registrationId), ev = store.getEvent(f.eventId); return (
            <div key={f.id} className="p-3 rounded-xl bg-white border border-amber-200"><div className="flex justify-between mb-1"><span className="text-[12px] font-semibold">{r?.name} {f.badge && <span>{f.badge}</span>}</span><span className="text-[10px] text-slate-400">{ev?.title?.slice(0, 22)}</span></div><p className="text-[12px] text-slate-600">{f.comment}</p></div>
          )})}</div>
        </Card>
      )}
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <p className="font-bold text-[14px] mb-4">Score by question</p>
          {fb.length === 0 ? <p className="text-center text-slate-400 text-[12px] py-8">No feedback yet</p> : (
            <div className="space-y-3.5">
              {qScores.map(q => (
                <div key={q.label}>
                  <div className="flex items-center justify-between mb-1"><span className="text-[12px] font-medium text-slate-600">{q.label}</span><span className="text-[12px] font-bold text-slate-800">{q.value.toFixed(1)}</span></div>
                  <div className="h-2 rounded-full bg-slate-100"><div className="h-full rounded-full transition-all" style={{ width: `${(q.value / 5) * 100}%`, background: q.value >= 4 ? "#0f9d8f" : q.value >= 3 ? "#f59e0b" : "#e94560" }} /></div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-5">
          <p className="font-bold text-[14px] mb-3">All feedback</p>
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {fb.map(f => { const r = store.getRegistration(f.registrationId), av = ((f.q1 + f.q2 + f.q3 + f.q4 + f.q5) / 5).toFixed(1); return (
              <div key={f.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200"><div className="flex justify-between"><span className="text-[12px] font-semibold">{r?.name} {f.badge && <span>{f.badge}</span>}</span><span className="text-[11px] font-bold text-amber-500">★ {av}</span></div>{f.comment && <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{f.comment}</p>}</div>
            )})}
            {fb.length === 0 && <p className="text-center text-slate-400 text-[12px] py-8">No feedback yet</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ─── ORG REPORTS ────────────────────────────────────────────────────────────
function OrgReports({ nav, toast }) {
  const events = store.getEvents().filter(e => e.status !== "rejected")
  const a = store.getAnalytics()
  const exportEvent = (id) => {
    const ev = store.getEvent(id), regs = store.getRegistrations(id), fb = store.getFeedback(id), att = regs.filter(r => r.attended)
    let csv = `REPORT,${ev.title}\nLocale,${locale.city} ${locale.region} ${locale.country}\nRegistered,${regs.length}\nAttended,${att.length}\nAttendance,${regs.length ? ((att.length / regs.length) * 100).toFixed(1) : 0}%\nFeedback,${fb.length}\n\nName,Email,Attended,Cert,Feedback\n`
    regs.forEach(r => { csv += `"${r.name}","${r.email}","${r.attended}","${r.needsCertificate}","${r.feedbackSubmitted}"\n` })
    const blob = new Blob([csv], { type: "text/csv" }); const el = document.createElement("a"); el.href = URL.createObjectURL(blob); el.download = `report-${ev.slug}.csv`; el.click()
    toast("Report downloaded!", "success")
  }
  const chartData = events.filter(e => e.status === "approved" || e.status === "completed").map(e => { const r = store.getRegistrations(e.id); return { name: e.title.slice(0, 12) + "…", reg: r.length, att: r.filter(x => x.attended).length } })
  return (
    <div className="space-y-5">
      <div><h1 className="text-2xl font-extrabold">Reports</h1><p className="text-[13px] text-slate-500">Download per-event reports for HQ · {locale.flag} {locale.region}</p></div>
      <Card className="p-5 bg-[#1a1a2e] text-white">
        <p className="text-[13px] font-bold mb-1 flex items-center gap-1.5"><MapPinned size={14} />Locale metrics for HQ</p>
        <p className="text-[12px] text-slate-300">{locale.city}, {locale.region}, {locale.country} {locale.flag} · Overall attendance {a.attendanceRate}% · Avg satisfaction {a.avgSatisfaction}/5 · {a.totalFeedback} reviews</p>
      </Card>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI icon={Calendar} label="Events" value={a.totalEvents} color="#1a1a2e" />
        <KPI icon={Users} label="Registrations" value={a.totalRegistrations} color="#0f9d8f" />
        <KPI icon={CheckCircle2} label="Attendance" value={`${a.attendanceRate}%`} color="#6d28d9" />
        <KPI icon={Star} label="Satisfaction" value={`${a.avgSatisfaction}/5`} color="#f59e0b" />
      </div>
      <Card className="p-5">
        <p className="font-bold text-[14px] mb-4">Per-event performance</p>
        <ResponsiveContainer width="100%" height={220}><BarChart data={chartData} barSize={18}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="name" tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 11 }} /><Bar dataKey="reg" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Registered" /><Bar dataKey="att" fill="#1a1a2e" radius={[4, 4, 0, 0]} name="Attended" /></BarChart></ResponsiveContainer>
      </Card>
      <Card className="p-5">
        <p className="font-bold text-[14px] mb-3">Download by event</p>
        <div className="space-y-2">
          {events.map(e => { const r = store.getRegistrations(e.id), att = r.filter(x => x.attended), fb = store.getFeedback(e.id); return (
            <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200">
              <div className="flex-1 min-w-0"><p className="text-[13px] font-semibold truncate">{e.title}</p><p className="text-[11px] text-slate-400">{fmtDate(e.date)} · {att.length}/{r.length} attended · {fb.length} feedback</p></div>
              {e.status === "pending" ? <Badge color="amber">Pending</Badge> : e.status === "completed" ? <Badge color="slate">Done</Badge> : <Badge color="green">Live</Badge>}
              <Btn variant="secondary" size="sm" icon={Download} onClick={() => exportEvent(e.id)}>Export</Btn>
            </div>
          )})}
        </div>
      </Card>
    </div>
  )
}

// ─── ORG TEMPLATES ──────────────────────────────────────────────────────────
function OrgTemplates({ nav, toast, refresh }) {
  const [templates, setTemplates] = useState(store.getTaskTemplates())
  const [name, setName] = useState(""), [tasks, setTasks] = useState(""), [show, setShow] = useState(false)
  const create = () => {
    if (!name.trim()) return
    store.addTaskTemplate({ name, tasks: tasks.split("\n").map(t => t.trim()).filter(Boolean) })
    setTemplates(store.getTaskTemplates()); setName(""); setTasks(""); setShow(false); toast("Checklist created!", "success")
  }
  return (
    <div className="space-y-5 max-w-3xl">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-extrabold">Checklists</h1><p className="text-[13px] text-slate-500">Reusable to-do templates for events</p></div>
        <Btn variant="primary" size="sm" icon={Plus} onClick={() => setShow(!show)}>New Checklist</Btn>
      </div>
      {show && (
        <Card className="p-5">
          <p className="font-bold text-[14px] mb-3">Create checklist</p>
          <div className="space-y-3">
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} placeholder="Conference Standard" />
            <Textarea label="Tasks (one per line)" value={tasks} onChange={e => setTasks(e.target.value)} rows={5} placeholder={"Send invitations\nConfirm AV\nPrint certificates"} />
            <div className="flex gap-2"><Btn variant="primary" icon={Check} onClick={create}>Create</Btn><Btn variant="ghost" onClick={() => setShow(false)}>Cancel</Btn></div>
          </div>
        </Card>
      )}
      <div className="space-y-3">
        {templates.map(t => (
          <Card key={t.id} className="p-5">
            <div className="flex items-center gap-3 mb-3"><div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center"><ClipboardList size={16} className="text-[#1a1a2e]" /></div><div><p className="font-bold text-[14px]">{t.name}</p><p className="text-[11px] text-slate-400">{t.tasks.length} tasks</p></div></div>
            <div className="space-y-1">{t.tasks.map((task, i) => <div key={i} className="flex items-center gap-2 text-[12px] text-slate-600 py-1"><Square size={11} className="text-slate-300" />{task}</div>)}</div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─── ORG PROFILE ────────────────────────────────────────────────────────────
function OrgProfile({ nav, toast, refresh }) {
  const org = store.getOrg()
  const [form, setForm] = useState({ ...org, socials: { ...org.socials } })
  const up = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const upS = (k, v) => setForm(f => ({ ...f, socials: { ...f.socials, [k]: v } }))
  const save = () => { store.updateOrg(form); refresh(); toast("Profile saved!", "success") }
  return (
    <div className="space-y-5 max-w-2xl">
      <div><h1 className="text-2xl font-extrabold">Organization Profile</h1><p className="text-[13px] text-slate-500">How your organization appears on events</p></div>
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#e94560] flex items-center justify-center text-white font-extrabold text-2xl">{form.name[0]}</div>
          <div><p className="font-bold text-[16px]">{form.name}</p><p className="text-[12px] text-slate-500">Organized by {form.organizedBy}</p></div>
        </div>
        <div className="space-y-4">
          <Input label="Organization Name" value={form.name} onChange={e => up("name", e.target.value)} icon={Building2} />
          <Textarea label="Organization Description" value={form.description} onChange={e => up("description", e.target.value)} rows={3} placeholder="Tell people about your organization…" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Organized by" value={form.organizedBy} onChange={e => up("organizedBy", e.target.value)} icon={User} />
            <Select label="Industry" value={form.industry} onChange={e => up("industry", e.target.value)} options={["Technology", "Education", "Design", "Finance", "Healthcare", "Marketing", "Other"].map(v => ({ value: v, label: v }))} />
          </div>
          <Input label="Contact Email" value={form.email} onChange={e => up("email", e.target.value)} icon={Mail} type="email" />
        </div>
      </Card>
      <Card className="p-6">
        <p className="font-bold text-[14px] mb-3">Social media</p>
        <div className="grid sm:grid-cols-2 gap-3">
          <Input value={form.socials.instagram} onChange={e => upS("instagram", e.target.value)} icon={Instagram} placeholder="instagram" />
          <Input value={form.socials.linkedin} onChange={e => upS("linkedin", e.target.value)} icon={Linkedin} placeholder="linkedin" />
          <Input value={form.socials.facebook} onChange={e => upS("facebook", e.target.value)} icon={Facebook} placeholder="facebook" />
          <Input value={form.socials.twitter} onChange={e => upS("twitter", e.target.value)} icon={Twitter} placeholder="twitter / x" />
          <Input value={form.socials.website} onChange={e => upS("website", e.target.value)} icon={Globe} placeholder="website.com" />
        </div>
      </Card>
      <Card className="p-6">
        <p className="font-bold text-[14px] mb-1">Privacy & compliance</p>
        <p className="text-[12px] text-slate-400 mb-3">Linked on your events and registration pages</p>
        <Input label="Privacy Policy URL" value={form.privacyPolicyUrl} onChange={e => up("privacyPolicyUrl", e.target.value)} icon={Shield} placeholder="https://yoursite.com/privacy" />
      </Card>
      <div className="flex justify-end"><Btn variant="accent" size="lg" icon={Check} onClick={save}>Save Profile</Btn></div>
    </div>
  )
}
