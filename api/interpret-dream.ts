import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });
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
    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("Error interpreting dream:", error);
    res.status(500).json({ error: "عذراً، حدث خطأ أثناء محاولة تفسير الحلم. يرجى المحاولة مرة أخرى." });
  }
}
