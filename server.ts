import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "Masjid Tazkia Platform" });
  });

  // Server-side Gemini AI Syariah Assistant Endpoint
  app.post("/api/ai/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({
          error: "GEMINI_API_KEY belum dikonfigurasi. Silakan tambahkan API key di pengaturan.",
        });
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
      console.error("Gemini API Error:", error);
      
      // MOCK FALLBACK IF INVALID_ARGUMENT or other errors occur (for robust testing)
      let mockReply = "Maaf, sistem AI sedang dalam pemeliharaan atau kunci API tidak valid. ";
      const msgLower = req.body.message?.toLowerCase() || '';
      
      if (msgLower.includes('sewa') || msgLower.includes('gedung')) {
        mockReply = `${req.body.userName ? `Akhi/Ukhti ${req.body.userName}` : 'Sahabat'}, untuk informasi penyewaan gedung, silakan menghubungi divisi Layanan & Aset Masjid Tazkia di nomor WA: 0812-3456-7890.`;
      } else if (msgLower.includes('zakat')) {
        mockReply = `Untuk perhitungan zakat, Anda bisa menggunakan fitur Kalkulator Zakat di aplikasi ini, atau berdonasi langsung melalui Portal Jamaah.`;
      } else {
        mockReply = `${req.body.userName ? `Akhi/Ukhti ${req.body.userName}` : 'Sahabat'}, saat ini saya berjalan dalam mode offline/mock karena ada kendala koneksi ke server AI utama. Silakan hubungi admin untuk perbaikan.`;
      }

      return res.json({ reply: mockReply });
    }
  });

  // YouTube Latest Videos Proxy (RSS Feed - no API key needed)
  app.get("/api/youtube/latest", async (_req, res) => {
    try {
      // Masjid Tazkia YouTube Channel RSS feed
      const channelId = "UC5107eQh328s76H_mZ34Sog";
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      
      const response = await fetch(rssUrl);
      if (!response.ok) {
        throw new Error(`RSS fetch failed: ${response.status}`);
      }
      
      const xml = await response.text();
      
      // Parse video IDs and titles from XML
      const videoMatches = [...xml.matchAll(/<yt:videoId>([^<]+)<\/yt:videoId>/g)];
      const titleMatches = [...xml.matchAll(/<title>([^<]+)<\/title>/g)];
      const thumbMatches = [...xml.matchAll(/<media:thumbnail[^>]+url="([^"]+)"/g)];
      
      const videos = videoMatches.slice(0, 6).map((m, i) => ({
        id: m[1],
        title: titleMatches[i + 1]?.['1'] || `Video ${i + 1}`,
        thumbnail: thumbMatches[i]?.['1'] || `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg`,
      }));
      
      res.set('Cache-Control', 'public, max-age=1800'); // cache 30 min
      return res.json({ videos, channelId });
    } catch (err: any) {
      console.error("YouTube RSS fetch error:", err.message);
      // Return fallback hardcoded videos if fetch fails
      return res.json({ 
        videos: [
          { id: "UBxFbTbs8i4", title: "Kajian Rutin Masjid Tazkia", thumbnail: `https://img.youtube.com/vi/UBxFbTbs8i4/hqdefault.jpg` },
          { id: "UBxFbTbs8i4", title: "Video Terbaru Masjid Tazkia", thumbnail: `https://img.youtube.com/vi/UBxFbTbs8i4/maxresdefault.jpg` },
        ],
        fallback: true
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`\n  🚀 Masjid Tazkia Platform ready!`);
    console.log(`  ➜  Local:   http://localhost:${PORT}/`);
    console.log(`  ➜  Network: http://0.0.0.0:${PORT}/\n`);
  });
}

startServer();

