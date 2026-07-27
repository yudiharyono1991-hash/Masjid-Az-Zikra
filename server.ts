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

      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong" });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `Anda adalah "Tazkia AI Syariah Assistant", asisten kecerdasan buatan islami yang ramah, santun, dan berwawasan luas untuk Masjid Tazkia.
Tugas Anda:
1. Menjawab pertanyaan jamaah mengenai ZISWAF (Zakat, Infaq, Shadaqah, Wakaf), hukum Fiqh ibadah/keuangan islam, perhitungan zakat, serta cara penyaluran dana di Masjid Tazkia.
2. Memberikan rekomendasi doa, ayat Al-Qur'an, dan hadis shahih yang relevan dengan pertanyaan jamaah.
3. Memberikan panduan penggunaan fitur aplikasi Masjid Tazkia (misal: Kalkulator Zakat, Donasi Otomatis, Laporan Transparansi Keuangan, Jadwal Salat & Kiblat, Al-Qur'an Digital, dan Mode TV Masjid).
4. Gunakan bahasa Indonesia yang santun, islami, jelas, dan dapat dipahami oleh jamaah umum. Sertakan salam "Assalamu'alaikum" saat memulai interaksi bila sesuai.`;

      const formattedHistory = Array.isArray(history)
        ? history.map((item: { role: string; parts: Array<{ text: string }> }) => ({
            role: item.role === "user" ? "user" : "model",
            parts: [{ text: item.parts?.[0]?.text || "" }],
          }))
        : [];

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
      return res.status(500).json({
        error: "Gagal menghubungi AI Assistant. " + (error?.message || "Terjadi kesalahan internal."),
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

