export type Lang = "en" | "id";

const en = {
  nav: {
    about: "About", projects: "Projects", skills: "Skills", contact: "CONTACT",
  },
  hero: {
    badge: "AVAILABLE FOR WORK",
    subtitle: "Creative Developer · Real-Time 3D Artist",
    cta1: "View Projects", cta2: "Enter Experience",
    stat1: "YEARS XP", stat2: "IDEAS", scroll: "SCROLL",
  },
  about: {
    label: "ABOUT", h1: "The Mind", h2: "Behind the Work",
    p1: "I'm Rosyad Zain, a creative developer focused on modern web experiences and cinematic real-time 3D environments.",
    p2: "I build immersive digital products using modern frontend technologies and Unreal Engine — creating interactive worlds that blend technology, atmosphere, and storytelling.",
    p3: "From futuristic interfaces to cinematic environments, every project is crafted with a balance of aesthetics, performance, and experience.",
    cap_label: "CAPABILITIES", journey_label: "DIGITAL JOURNEY", edu_label: "EDUCATION",
    caps: [
      { title: "Web Development",       desc: "Building modern interactive websites using Next.js, React, and immersive frontend systems." },
      { title: "Real-Time 3D",          desc: "Creating cinematic environments and immersive worlds using Unreal Engine." },
      { title: "Interactive Experience",desc: "Combining motion, atmosphere, and storytelling into futuristic digital experiences." },
    ],
    journey: [
      { role: "Videographer & Multimedia Support", desc: "Produced visual content, motion graphics, and branding-focused multimedia experiences while developing storytelling and creative production workflows." },
      { role: "Multimedia & IT Specialist",        desc: "Developing company websites, digital systems, and visual branding materials while supporting modern business operations and multimedia production." },
      { role: "Multimedia & IT Specialist",        desc: "Handling multimedia production, digital branding, visual communication, and creative assets for healthcare-related products and campaigns." },
      { role: "Real-Time 3D Exploration",          desc: "Expanding into cinematic 3D environments and immersive world-building using Unreal Engine workflows." },
    ],
    edu: [
      { degree: "Master's Degree",            field: "Management Information Systems and Services" },
      { degree: "Bachelor of Applied Science", field: "Multimedia Engineering Technology" },
    ],
  },
  projects: {
    label: "PROJECTS", h1: "Selected", h2: "Works",
    sub: "A focused selection of live websites built for real clients.",
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
    sub: "A curated set of tools and technologies across web development, real-time 3D, and creative design.",
    groups: ["WEB DEVELOPMENT", "3D & REAL-TIME", "DESIGN & CREATIVE", "TOOLS & PLATFORMS"],
  },
  env: {
    label: "ENVIRONMENTS", h1: "Real-Time", h2: "Worlds",
    sub: "Exploring cinematic real-time environments and immersive world-building using Unreal Engine 5 — bridging the gap between game development and interactive storytelling.",
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
    about: "Tentang", projects: "Proyek", skills: "Keahlian", contact: "KONTAK",
  },
  hero: {
    badge: "TERSEDIA UNTUK PROYEK",
    subtitle: "Creative Developer · Seniman 3D Real-Time",
    cta1: "Lihat Proyek", cta2: "Mulai Jelajah",
    stat1: "TH PENGALAMAN", stat2: "IDE", scroll: "GULIR",
  },
  about: {
    label: "TENTANG", h1: "Pikiran di Balik", h2: "Karya Ini",
    p1: "Saya Rosyad Zain, seorang creative developer yang berfokus pada pengalaman web modern dan lingkungan 3D sinematik real-time.",
    p2: "Saya membangun produk digital imersif menggunakan teknologi frontend modern dan Unreal Engine — menciptakan dunia interaktif yang memadukan teknologi, atmosfer, dan storytelling.",
    p3: "Dari antarmuka futuristik hingga lingkungan sinematik, setiap proyek dirancang dengan keseimbangan estetika, performa, dan pengalaman.",
    cap_label: "KEMAMPUAN", journey_label: "PERJALANAN DIGITAL", edu_label: "PENDIDIKAN",
    caps: [
      { title: "Pengembangan Web",       desc: "Membangun website interaktif modern menggunakan Next.js, React, dan sistem frontend yang imersif." },
      { title: "Real-Time 3D",           desc: "Menciptakan lingkungan sinematik dan dunia imersif menggunakan Unreal Engine." },
      { title: "Pengalaman Interaktif",  desc: "Memadukan gerakan, atmosfer, dan storytelling menjadi pengalaman digital yang futuristik." },
    ],
    journey: [
      { role: "Videografer & Dukungan Multimedia", desc: "Memproduksi konten visual, motion graphics, dan pengalaman multimedia berbasis branding sambil mengembangkan alur kerja produksi kreatif." },
      { role: "Spesialis Multimedia & IT",         desc: "Mengembangkan website perusahaan, sistem digital, dan materi branding visual sambil mendukung operasional bisnis modern dan produksi multimedia." },
      { role: "Spesialis Multimedia & IT",         desc: "Menangani produksi multimedia, branding digital, komunikasi visual, dan aset kreatif untuk produk dan kampanye di bidang kesehatan." },
      { role: "Eksplorasi Real-Time 3D",           desc: "Memperluas kemampuan ke lingkungan 3D sinematik dan pembangunan dunia imersif menggunakan alur kerja Unreal Engine." },
    ],
    edu: [
      { degree: "Magister",        field: "Sistem dan Layanan Informasi Manajemen" },
      { degree: "Sarjana Terapan", field: "Teknologi Rekayasa Multimedia" },
    ],
  },
  projects: {
    label: "PROYEK", h1: "Karya", h2: "Pilihan",
    sub: "Seleksi website live yang dibangun untuk klien nyata.",
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
    sub: "Kumpulan alat dan teknologi pilihan di bidang pengembangan web, real-time 3D, dan desain kreatif.",
    groups: ["PENGEMBANGAN WEB", "3D & REAL-TIME", "DESAIN & KREATIF", "ALAT & PLATFORM"],
  },
  env: {
    label: "LINGKUNGAN", h1: "Dunia", h2: "Real-Time",
    sub: "Menjelajahi lingkungan real-time sinematik dan pembangunan dunia imersif menggunakan Unreal Engine 5 — menjembatani game development dan interactive storytelling.",
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
