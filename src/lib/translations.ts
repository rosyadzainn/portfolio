export type Lang = "en" | "id";

const en = {
  nav: {
    about: "About", projects: "Projects", skills: "Skills", process: "Process", contact: "CONTACT",
  },
  hero: {
    badge: "AVAILABLE FOR WORK",
    subtitle: "Creative Developer · 3D Environment · Modern Web",
    cta1: "View Projects", cta2: "Enter Experience",
    scroll: "SCROLL",
  },
  about: {
    label: "ABOUT", h1: "The Mind", h2: "Behind the Work",
    p1: "I design and direct cinematic web experiences — bridging premium visual design, 3D environment, and modern AI-augmented development workflows.",
    p2: "I'm Rosyad — a Creative Developer working at the intersection of design, 3D environment, and modern web. I help founders, agencies, and brands deliver digital experiences that don't just inform — they leave an impression.",
    p3: "From futuristic interfaces to cinematic environments, every project is crafted with a balance of aesthetics, performance, and experience.",
    cap_label: "CAPABILITIES", journey_label: "DIGITAL JOURNEY", edu_label: "EDUCATION",
    caps: [
      { title: "Design & Creative Direction", desc: "Designing design systems and brand identities in Figma, with cinematic vision and premium-level precision." },
      { title: "3D Environment",                desc: "Creating cinematic environments and immersive worlds using Unreal Engine 5 (Lumen, Nanite, Megascans)." },
      { title: "Modern Workflow",             desc: "Leading project development through AI-augmented modern workflows and collaboration with trusted technical partners." },
    ],
    journey: [
      { role: "Videographer & Multimedia Support", desc: "" },
      { role: "Creative Lead & Multimedia Director", desc: "" },
      { role: "3D Environment Exploration",          desc: "" },
    ],
    edu: [
      { degree: "Master's Degree",            field: "Management Information Systems and Services" },
      { degree: "Bachelor of Applied Science", field: "Multimedia Engineering Technology" },
    ],
  },
  projects: {
    label: "PROJECTS", h1: "Selected", h2: "Works",
    sub: "A focused selection of recent projects — design-led, delivery-focused.",
    visit: "VISIT SITE",
    items: [
      { subtitle: "Islamic Digital Platform",          desc: "A modern Islamic platform delivering curated content, digital resources, and a refined reading experience for a Muslim audience." },
      { subtitle: "Invoice Generator",                  desc: "A clean and efficient web application for generating professional invoices — fast, minimal, and built for modern workflows." },
      { subtitle: "Holding Company Digital Presence",  desc: "Digital presence for Pendi Group, a holding company — clean corporate branding, group profile, and modern multi-entity business presentation." },
      { subtitle: "Health Distribution Company",        desc: "Digital presence for PT. Pendi Hijau Berkah — a precision health distribution company, showcasing products, partnerships, and corporate profile." },
    ],
  },
  skills: {
    label: "SKILLS", h1: "Technical", h2: "Arsenal",
    sub: "A curated set of tools and disciplines across design, 3D environment, multimedia production, and modern creative workflow.",
    groups: ["DESIGN & DIRECTION", "3D ENVIRONMENT", "MULTIMEDIA & VISUAL", "MODERN WORKFLOW"],
  },
  services: {
    label: "PROCESS", h1: "How I", h2: "Work",
    sub: "A collaborative process built around clarity, craft, and delivery.",
    cta: "Start a conversation",
    cta_sub: "Every project begins with a conversation. No templates, no guesswork.",
    steps: [
      { num: "01", title: "DISCOVERY",  desc: "We start with a conversation. I learn about your vision, audience, and what makes your brand distinct — before anything is designed or built." },
      { num: "02", title: "DESIGN",     desc: "I build the full visual direction in Figma — design system, layout, identity — before a single line of code is written. You see it before it exists." },
      { num: "03", title: "BUILD",      desc: "Using AI-augmented workflows and trusted technical partners, the experience is brought to life with precision and creative control throughout." },
      { num: "04", title: "DELIVER",    desc: "Full QA, deployment, and handoff. I stay engaged until it's right — then make sure you know how to own it going forward." },
    ],
  },
  env: {
    label: "3D ENVIRONMENTS", h1: "3D", h2: "Environments",
    sub: "Exploring cinematic 3D environments and immersive world-building using Unreal Engine 5 — bridging the gap between game development and interactive storytelling.",
  },
  contact: {
    label: "CONTACT", h1: "Let's Build", h2: "Something Extraordinary",
    tagline: "Have a vision for the future? Let's make it real.",
    transmission: "TRANSMISSION", coords: "COORDINATES",
    location: "Indonesia", locationSub: "Remote-first · Open to relocation",
    network: "NETWORK NODES", available: "AVAILABLE FOR NEW PROJECTS",
    response: "Response time < 24 hours", initiate: "INITIATE TRANSMISSION",
    name_l: "NAME", email_l: "EMAIL", subject_l: "SUBJECT", message_l: "MESSAGE",
    name_ph: "Your name", subject_ph: "Project brief", message_ph: "Describe your vision...",
    send: "SEND TRANSMISSION", sending: "SENDING...",
    ok_title: "TRANSMISSION RECEIVED", ok_sub: "I'll be in touch within 24 hours.",
    err_rate: "Too many submissions. Please wait before trying again.",
    err_send: "Failed to send. Please try again or email directly.",
    cv: "CURRICULUM VITAE", footer_rights: "© 2026 ROSYAD ZAIN — ALL RIGHTS RESERVED",
    footer_built: "NEXT.JS · THREE.JS · FRAMER MOTION",
  },
};

const id: typeof en = {
  nav: {
    about: "Tentang", projects: "Proyek", skills: "Keahlian", process: "Proses", contact: "KONTAK",
  },
  hero: {
    badge: "TERSEDIA UNTUK PROYEK",
    subtitle: "Creative Developer · 3D Environment · Web Modern",
    cta1: "Lihat Proyek", cta2: "Mulai Jelajah",
    scroll: "GULIR",
  },
  about: {
    label: "TENTANG", h1: "Pikiran di Balik", h2: "Karya Ini",
    p1: "Saya merancang dan mengarahkan pengalaman web sinematik — menjembatani desain visual premium, 3D environment, dan alur kerja pengembangan modern berbasis AI.",
    p2: "Saya Rosyad — Creative Developer yang bekerja di persimpangan desain, 3D environment, dan web modern. Saya membantu founder, agency, dan brand mengirim pengalaman digital yang tidak hanya menginformasikan — tapi meninggalkan kesan.",
    p3: "Dari antarmuka futuristik hingga lingkungan sinematik, setiap proyek dirancang dengan keseimbangan estetika, performa, dan pengalaman.",
    cap_label: "KEMAMPUAN", journey_label: "PERJALANAN DIGITAL", edu_label: "PENDIDIKAN",
    caps: [
      { title: "Desain & Arah Kreatif", desc: "Merancang sistem desain dan identitas brand di Figma, dengan visi sinematik dan presisi tingkat premium." },
      { title: "3D Environment",          desc: "Menciptakan lingkungan sinematik dan dunia imersif menggunakan Unreal Engine 5 (Lumen, Nanite, Megascans)." },
      { title: "Alur Kerja Modern",     desc: "Memimpin pengembangan proyek lewat workflow modern berbasis AI dan kolaborasi dengan partner teknis terpercaya." },
    ],
    journey: [
      { role: "Videografer & Dukungan Multimedia", desc: "" },
      { role: "Creative Lead & Multimedia Director", desc: "" },
      { role: "Eksplorasi 3D Environment",           desc: "" },
    ],
    edu: [
      { degree: "Magister",        field: "Sistem dan Layanan Informasi Manajemen" },
      { degree: "Sarjana Terapan", field: "Teknologi Rekayasa Multimedia" },
    ],
  },
  projects: {
    label: "PROYEK", h1: "Karya", h2: "Pilihan",
    sub: "Seleksi proyek terkini — berbasis desain, fokus pada pengiriman.",
    visit: "KUNJUNGI SITUS",
    items: [
      { subtitle: "Platform Digital Islami",              desc: "Platform Islam modern yang menyajikan konten pilihan, sumber daya digital, dan pengalaman membaca yang elegan untuk audiens Muslim." },
      { subtitle: "Generator Invoice",                    desc: "Aplikasi web yang bersih dan efisien untuk membuat invoice profesional — cepat, minimal, dan dirancang untuk alur kerja modern." },
      { subtitle: "Kehadiran Digital Holding Company",   desc: "Kehadiran digital untuk Pendi Group, sebuah holding company — branding korporat yang bersih, profil grup, dan presentasi bisnis multi-entitas modern." },
      { subtitle: "Perusahaan Distribusi Kesehatan",      desc: "Kehadiran digital untuk PT. Pendi Hijau Berkah — perusahaan distribusi kesehatan presisi, menampilkan produk, kemitraan, dan profil korporat." },
    ],
  },
  skills: {
    label: "KEAHLIAN", h1: "Keahlian", h2: "Teknis",
    sub: "Kumpulan alat dan disiplin pilihan di bidang desain, 3D environment, produksi multimedia, dan alur kerja kreatif modern.",
    groups: ["DESAIN & ARAHAN", "3D ENVIRONMENT", "MULTIMEDIA & VISUAL", "ALUR KERJA MODERN"],
  },
  services: {
    label: "PROSES", h1: "Cara Saya", h2: "Bekerja",
    sub: "Proses kolaborasi yang dibangun di atas kejujuran, craft, dan pengiriman.",
    cta: "Mulai percakapan",
    cta_sub: "Setiap proyek dimulai dengan percakapan. Tanpa template, tanpa tebak-tebakan.",
    steps: [
      { num: "01", title: "DISCOVERY",  desc: "Kita mulai dengan percakapan. Saya pelajari visi, audiens, dan apa yang membuat brand kamu berbeda — sebelum apapun dirancang atau dibangun." },
      { num: "02", title: "DESIGN",     desc: "Saya bangun arah visual lengkap di Figma — sistem desain, layout, identitas — sebelum satu baris kode pun ditulis. Kamu lihat sebelum ada wujudnya." },
      { num: "03", title: "BUILD",      desc: "Dengan workflow berbasis AI dan partner teknis terpercaya, pengalaman diwujudkan dengan presisi dan kontrol kreatif penuh sepanjang prosesnya." },
      { num: "04", title: "DELIVER",    desc: "QA menyeluruh, deployment, dan serah terima. Saya tetap terlibat sampai hasilnya benar — lalu pastikan kamu tahu cara mengelolanya ke depan." },
    ],
  },
  env: {
    label: "3D ENVIRONMENTS", h1: "3D", h2: "Environments",
    sub: "Menjelajahi lingkungan 3D sinematik dan pembangunan dunia imersif menggunakan Unreal Engine 5 — menjembatani game development dan interactive storytelling.",
  },
  contact: {
    label: "KONTAK", h1: "Mari Wujudkan", h2: "Sesuatu yang Luar Biasa",
    tagline: "Punya visi untuk masa depan? Mari kita wujudkan.",
    transmission: "TRANSMISI", coords: "LOKASI",
    location: "Indonesia", locationSub: "Prioritas Remote · Terbuka Relokasi",
    network: "JARINGAN SOSIAL", available: "TERSEDIA UNTUK PROYEK BARU",
    response: "Respon < 24 jam", initiate: "MULAI TRANSMISI",
    name_l: "NAMA", email_l: "EMAIL", subject_l: "SUBJEK", message_l: "PESAN",
    name_ph: "Nama kamu", subject_ph: "Brief proyek", message_ph: "Ceritakan visimu...",
    send: "KIRIM PESAN", sending: "MENGIRIM...",
    ok_title: "PESAN TERKIRIM", ok_sub: "Saya akan menghubungi dalam 24 jam.",
    err_rate: "Terlalu banyak pengiriman. Tunggu sebentar sebelum mencoba lagi.",
    err_send: "Gagal mengirim. Coba lagi atau email langsung.",
    cv: "CURRICULUM VITAE", footer_rights: "© 2026 ROSYAD ZAIN — SEMUA HAK DILINDUNGI",
    footer_built: "NEXT.JS · THREE.JS · FRAMER MOTION",
  },
};

export const translations = { en, id };
export type T = typeof en;
