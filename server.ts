import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Dream Interpretation
  app.post("/api/interpret-dream", async (req, res) => {
    try {
      const { dream } = req.body;
      if (!dream) {
        return res.status(400).json({ error: "الرجاء إدخال تفاصيل الحلم" });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "لم يتم العثور على مفتاح API الخاص بـ Gemini." });
      }

      const prompt = `أنت مفسر أحلام خبير وحكيم. لديك معرفة عميقة بعلم النفس وتحليل الرموز.
قام أحدهم بمشاركة الحلم التالي معك:
"${dream}"

قم بتحليل الحلم بناءً على الرموز النفسية وأعطِ تفسيراً ملهماً، إيجابياً وعميقاً.
قسّم إجابتك لتكون بتنسيق JSON حصراً كالتالي:
{
  "title": "عنوان جذاب ومختصر للحلم",
  "symbolism": "تحليل لأهم الرموز في الحلم",
  "meaning": "التفسير النفسي والروحي الشامل",
  "advice": "نصيحة أو حكمة مستوحاة من الحلم",
  "luckScore": رقم من 1 إلى 100 يعبر عن الإيجابية أو الحظ
}

تأكد من أن تكون الإجابة بصيغة JSON صحيحة تماماً دون أي نص إضافي خارج الـ JSON.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      let responseText = response.text;
      
      // Clean markdown block if exists
      if (responseText && responseText.includes("\`\`\`")) {
        responseText = responseText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
      }

      const parsedResponse = JSON.parse(responseText || "{}");
      res.json(parsedResponse);
    } catch (error) {
      console.error("Error interpreting dream:", error);
      res.status(500).json({ error: "عذراً، حدث خطأ أثناء محاولة تفسير الحلم. يرجى المحاولة مرة أخرى." });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
