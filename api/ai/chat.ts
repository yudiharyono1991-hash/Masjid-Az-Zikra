import { GoogleGenAI } from "@google/genai";

// Smart rule-based fallback (used when API key missing or API fails)
function buildFallbackReply(msg: string, userName?: string): string {
  const m = msg.toLowerCase();
  const sapa = userName ? `Akhi/Ukhti **${userName}**, ` : 'Sahabat, ';

  // Moderation Check (Pornography, Racism, Hate Speech)
  const blockWords = ['porno', 'bokep', 'mesum', 'seks', 'sex', 'ngentot', 'rasis', 'kafir', 'bunuh', 'judi', 'slot', 'togel', 'mabuk', 'miras'];
  if (blockWords.some(word => m.includes(word))) {
    return `Astaghfirullah. Mohon maaf, sebagai Asisten Virtual Masjid Tazkia yang menjunjung nilai-nilai Syariah Islam, saya tidak dapat memproses pertanyaan atau pernyataan yang mengandung unsur tidak pantas, pornografi, kebencian, maupun pelanggaran syariat. Mari kita gunakan forum ini untuk kebaikan dan kebermanfaatan. Barakallahu fiikum.`;
  }

  if (m.includes('sewa') || m.includes('gedung') || m.includes('hall') || m.includes('ballroom') || m.includes('alhambra')) {
    return `${sapa}Alhamdulillah! Untuk informasi penyewaan **Alhambra Hall / Gedung Masjid Tazkia**, silakan:\n\n📞 Hubungi: **0858 1000 8899** (Sekretariat DKM)\n📧 Email: **masjidtazkia@tazkia.ac.id**\n🏛️ Atau gunakan fitur **Booking Gedung** di menu utama aplikasi ini.\n\nJazakallahu Khairan 🙏`;
  }
  if (m.includes('zakat') && (m.includes('hitung') || m.includes('kalkulat') || m.includes('berapa'))) {
    return `${sapa}untuk menghitung zakat, silakan gunakan **Kalkulator Zakat** yang tersedia di menu ZISWAF aplikasi ini.\n\nNisab zakat emas saat ini sekitar **Rp 1.350.000/gram** x 85 gram = **Rp 114.750.000**. Jika harta Anda telah mencapai nisab dan haul (1 tahun), wajib mengeluarkan zakat sebesar **2,5%** dari total harta. Allahu Akbar 🤲`;
  }
  if (m.includes('zakat')) {
    return `${sapa}Zakat adalah rukun Islam ke-4, kewajiban bagi setiap Muslim yang mampu. Jenis zakat:\n\n1. **Zakat Fitrah** — wajib setiap Ramadhan\n2. **Zakat Maal (Harta)** — 2,5% dari simpanan > nisab\n3. **Zakat Profesi** — dari penghasilan\n4. **Zakat Pertanian, Perniagaan, dll**\n\nGunakan fitur Kalkulator Zakat di menu ZISWAF untuk perhitungan tepat. Barakallahu fiikum 🕋`;
  }
  if (m.includes('infaq') || m.includes('sedekah') || m.includes('shadaqah') || m.includes('donasi')) {
    return `${sapa}Infaq & Sedekah adalah amalan mulia yang sangat dianjurkan. Bedanya:\n\n- **Zakat** → wajib, ada nisab & haul\n- **Infaq** → sunnah, tidak ada batasan minimum\n- **Sedekah** → lebih luas, bisa non-materi\n\nAnda bisa berdonasi langsung melalui:\n💳 BSI: **7130-2498-17** (a.n. DKM Masjid Tazkia)\n💳 BCA: **8820-1192-33** (a.n. Yayasan Tazkia)\n📸 QRIS tersedia di masjid\n\nSemoga Allah melipatgandakan rezeki Anda 🤲`;
  }
  if (m.includes('wakaf')) {
    return `${sapa}**Wakaf** adalah menahan harta pokok dan mengalirkan manfaatnya di jalan Allah.\n\nMasjid Tazkia menerima wakaf untuk:\n🕌 Pengembangan masjid\n📚 Sarana pendidikan\n🌱 Wakaf produktif\n\nInfo wakaf: **0858 1000 8899** atau masjidtazkia@tazkia.ac.id\n\n*"Apabila manusia meninggal dunia, maka terputuslah amalnya kecuali tiga perkara: sedekah jariyah (wakaf), ilmu yang bermanfaat, anak shaleh yang mendoakan."* (HR. Muslim) 🤲`;
  }
  if (m.includes('jadwal') || m.includes('shalat') || m.includes('solat') || m.includes('adzan')) {
    return `${sapa}Jadwal shalat tersedia di fitur **Jadwal Shalat & Adzan** pada menu Al-Qur'an Digital. Waktu shalat diperbarui otomatis berdasarkan lokasi Anda.\n\nShalat berjamaah di Masjid Tazkia: Subuh, Dzuhur, Ashar, Maghrib, Isya\n\nAllahu Akbar! Segera tunaikan shalat tepat waktu 🕌`;
  }
  if (m.includes('quran') || m.includes('qur\'an') || m.includes('alquran')) {
    return `${sapa}Fitur **Al-Qur'an Digital** tersedia di aplikasi ini! Anda bisa:\n\n📖 Membaca Al-Qur'an 30 juz\n🎧 Mendengarkan murattal MP3\n🔍 Mencari ayat\n\nKlik tombol **Al-Qur'an Digital** di halaman utama atau menu aplikasi. Semoga Allah mudahkan hafalan dan pemahaman Al-Qur'an kita 🤲`;
  }
  if (m.includes('kiblat') || m.includes('arah')) {
    return `${sapa}Fitur **Arah Kiblat** tersedia di aplikasi ini menggunakan kompas digital. Klik tombol **Arah Kiblat** di halaman utama.\n\nArah kiblat dari Bogor/Sentul: sekitar **295° Barat-Laut**. Semoga shalat kita diterima Allah SWT 🕌`;
  }
  if (m.includes('tazkia') || m.includes('masjid') || m.includes('sejarah') || m.includes('profil')) {
    return `${sapa}**Masjid Tazkia Islamic Center** berlokasi di Sentul City, Bogor, didirikan oleh Prof. Dr. M. Syafii Antonio.\n\n🕌 Hadir untuk melayani ibadah, kajian Islam, ZISWAF, dan pemberdayaan umat\n📍 Jl. Ir. H. Djuanda No. 78, Sentul City, Bogor\n📞 0858 1000 8899\n\nUntuk info lengkap, kunjungi menu **Tentang Kami** di aplikasi ini 🕋`;
  }
  if (m.includes('assalamualaikum') || m.includes('halo') || m.includes('hai') || m.includes('selamat')) {
    return `Wa'alaikumussalam Warahmatullahi Wabarakatuh 👳‍♂️\n\n${sapa}Ahlan wa Sahlan di **Tazkia AI Syariah Assistant**!\n\nSaya siap membantu Anda tentang:\n• 💰 ZISWAF & perhitungan zakat\n• 🏛️ Sewa gedung Alhambra Hall\n• 📖 Al-Qur'an & jadwal shalat\n• 🕌 Info Masjid Tazkia\n• 📜 Hukum Fiqh ibadah & muamalah\n\nSilakan tanyakan apa saja! 🤲`;
  }

  // Generic fallback
  return `${sapa}Barakallahu fiikum atas pertanyaannya.\n\nSaat ini saya dalam **mode asisten dasar** karena koneksi ke server AI sedang dalam konfigurasi. Untuk pertanyaan mendalam seputar fiqh atau syariah, silakan:\n\n📞 Hubungi pengurus: **0858 1000 8899**\n📧 Email: **masjidtazkia@tazkia.ac.id**\n\nAtau kunjungi kajian rutin di Masjid Tazkia Sentul. Semoga Allah memberkahi 🤲`;
}

export default async function handler(req: any, res: any) {
  // Hanya menerima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Jika tidak ada API key, gunakan rule-based fallback
    if (!apiKey || apiKey.trim() === '') {
      return res.json({ reply: buildFallbackReply(req.body.message || '', req.body.userName) });
    }

    const { message, history, userName } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong" });
    }

    const systemInstruction = `Anda adalah "Tazkia AI Syariah Assistant", asisten kecerdasan buatan islami yang ramah, santun, dan berwawasan luas untuk Masjid Tazkia.
Tugas Anda:
1. Menjawab pertanyaan jamaah mengenai ZISWAF (Zakat, Infaq, Shadaqah, Wakaf), hukum Fiqh ibadah/keuangan islam, perhitungan zakat, serta cara penyaluran dana di Masjid Tazkia.
2. Memberikan rekomendasi doa, ayat Al-Qur'an, dan hadis shahih yang relevan dengan pertanyaan jamaah.
3. Memberikan panduan penggunaan fitur aplikasi Masjid Tazkia.
4. Gunakan bahasa Indonesia yang santun, islami, jelas, dan dapat dipahami.
5. ${userName ? `Sapa penanya dengan sebutan Akhi/Ukhti ${userName} (sesuaikan sapaan secara umum jika gender tidak diketahui).` : `Sapa penanya dengan ramah.`}
6. Jika ada pertanyaan mengenai sewa gedung, arahkan penanya untuk menghubungi divisi Layanan & Aset di nomor 0812-3456-7890 atau gunakan fitur Booking Gedung di Portal DKM.
7. SANGAT PENTING: Anda adalah AI yang patuh pada Syariah Islam. Tolak dengan tegas dan sopan segala bentuk pertanyaan atau permintaan yang berunsur pornografi, kekerasan, ujaran kebencian, atau hal-hal yang melanggar syariat Islam.`;

    const formattedHistory = Array.isArray(history)
      ? history.map((item: { role: string; parts: Array<{ text: string }> }) => ({
          role: item.role === "user" ? "user" : "model",
          parts: [{ text: item.parts?.[0]?.text || "" }],
        }))
      : [];

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: message }] },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Maaf, tidak dapat memproses jawaban saat ini.";
    return res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Gemini API Error:", error.message || error);
    // Fall through to smart fallback if Gemini API fails (e.g. rate limit)
    return res.json({ reply: buildFallbackReply(req.body.message || '', req.body.userName) });
  }
}
