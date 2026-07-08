const dreamDictionary = [
  {
    keywords: ["طير", "حلق", "سما", "فضاء"],
    title: "رمز التحليق",
    symbolism: "الطيران يرمز إلى التحرر من القيود والانطلاق نحو آفاق جديدة.",
    meaning: "يدل هذا الحلم على رغبتك العميقة في التخلص من الضغوطات، وتوقك للحرية والنجاح.",
    advice: "استمر في السعي وراء طموحاتك ولا تدع العقبات توقفك.",
    luckScore: 85
  },
  {
    keywords: ["سقط", "وقوع", "هاوي", "انهيار"],
    title: "رمز السقوط",
    symbolism: "السقوط يعكس الشعور بفقدان السيطرة والقلق الداخلي.",
    meaning: "قد تمر بفترة من عدم اليقين أو تواجه تحديات تجعلك تشعر بعدم الاستقرار.",
    advice: "تذكر أن بعد كل سقوط هناك نهوض. ركز على ما يمكنك التحكم به.",
    luckScore: 40
  },
  {
    keywords: ["ماء", "بحر", "محيط", "نهر", "غرق", "سباح", "مطر", "شلال"],
    title: "رمز الماء والمشاعر",
    symbolism: "الماء يمثل العواطف، اللاوعي، وحالة الروح الحالية.",
    meaning: "حالتك العاطفية عميقة. قد تكون تمر بفترة من التطهير الروحي أو تواجه مشاعر دفينة.",
    advice: "لا تقاوم مشاعرك بل افهمها واسمح لنفسك بالتعبير عنها بصدق.",
    luckScore: 70
  },
  {
    keywords: ["ثعبان", "حيه", "حية", "افعى", "أفعى", "عقرب", "عنكبوت", "وحش"],
    title: "رمز المواجهة",
    symbolism: "الزواحف والوحوش ترمز للتحول، الشفاء، أو وجود تحديات خفية.",
    meaning: "هناك تغيير جذري يحدث في حياتك، أو مخاوف دفينة تحتاج إلى مواجهتها.",
    advice: "كن حذراً، ولكن لا تخف من التغيير فهو ضروري للنمو.",
    luckScore: 55
  },
  {
    keywords: ["موت", "جناز", "قبر", "ميت", "وفاة"],
    title: "رمز النهايات والبدايات",
    symbolism: "الموت في الأحلام يرمز للنهايات والبدايات الجديدة.",
    meaning: "أنت تودع مرحلة من حياتك لتبدأ فصلاً جديداً ومختلفاً.",
    advice: "تقبل التغيير وافتح قلبك للفرص الجديدة التي تنتظرك.",
    luckScore: 75
  },
  {
    keywords: ["سن", "اسنان", "أسنان", "ضرس", "اضراس"],
    title: "رمز القوة",
    symbolism: "الأسنان ترتبط بالقوة، الثقة بالنفس، والصحة.",
    meaning: "قد تشعر بالقلق بشأن صورتك أمام الآخرين أو تمر بموقف يختبر قوتك.",
    advice: "ثقتك تنبع من داخلك. كن فخوراً بما أنت عليه.",
    luckScore: 60
  },
  {
    keywords: ["سيار", "قياد", "طريق", "سفر", "قطار", "طائر", "طائرة"],
    title: "رمز الرحلة",
    symbolism: "وسائل النقل تمثل مسار حياتك وقدرتك على التحكم في اتجاهاتك.",
    meaning: "أنت في رحلة نحو تحقيق أهدافك، وسرعتك تعكس مدى تحكمك في حياتك.",
    advice: "امسك بزمام المبادرة وحدد وجهتك بوضوح لضمان الوصول بأمان.",
    luckScore: 80
  },
  {
    keywords: ["هرب", "ركض", "طارد", "خوف", "ملاحق", "لص", "حرامي"],
    title: "رمز الهروب",
    symbolism: "الهروب يشير إلى تجنب المواجهة والقلق.",
    meaning: "هناك مشكلة أو التزام تحاول تجنبه بدلاً من مواجهته.",
    advice: "المواجهة هي الحل الأمثل. تراجع خطوة ثم واجه مخاوفك بشجاعة.",
    luckScore: 45
  },
  {
    keywords: ["امتحان", "اختبار", "مدرس", "جامع", "نجاح", "رسوب", "دراسة"],
    title: "رمز التقييم",
    symbolism: "الامتحانات تعكس التقييم الذاتي وتحديات الحياة.",
    meaning: "تشعر بضغط لإثبات نفسك في مرحلة معينة من حياتك.",
    advice: "ثق بقدراتك وما تعلمته، ولا تدع الخوف يعيقك عن التقدم.",
    luckScore: 65
  },
  {
    keywords: ["نار", "حريق", "لهب", "نور", "شمس"],
    title: "رمز الطاقة والتحول",
    symbolism: "النار ترمز للشغف، أو التطهير والتحول القوي.",
    meaning: "هناك طاقة مكبوتة داخلك، إما حماس عارم أو شغف قوي نحو هدف ما.",
    advice: "استخدم هذه الطاقة بحكمة لتبني وتحقق أهدافك.",
    luckScore: 75
  },
  {
    keywords: ["مال", "نقود", "ذهب", "فلوس", "غنى", "كنز", "ربح"],
    title: "رمز القيمة",
    symbolism: "المال والذهب يرمزان للقيمة الذاتية، الثقة، والفرص الثمينة.",
    meaning: "أنت تكتشف قدراتك الحقيقية، وهناك فرص قادمة لزيادة مواردك أو معرفتك.",
    advice: "استثمر في نفسك واستغل الفرص المتاحة بحكمة.",
    luckScore: 85
  },
  {
    keywords: ["طفل", "رضيع", "حمل", "ولاد", "بنت", "ولد"],
    title: "رمز البراءة والبدايات",
    symbolism: "الأطفال يرمزون للبراءة، المشاريع الجديدة، والنمو الروحي.",
    meaning: "هناك بداية جديدة أو فكرة مبدعة تنمو داخلك وتنتظر الرعاية.",
    advice: "اعتنِ بأفكارك الجديدة وامنحها الوقت لتكبر وتزدهر.",
    luckScore: 90
  },
  {
    keywords: ["حب", "زواج", "عرس", "عروس", "خاتم"],
    title: "رمز الارتباط",
    symbolism: "الزواج والارتباط يرمزان للالتزام والاتحاد الداخلي.",
    meaning: "أنت تبحث عن الاستقرار أو تتصالح مع جوانب مختلفة من شخصيتك.",
    advice: "ركز على علاقاتك الإيجابية واسعَ لإيجاد التوازن في حياتك.",
    luckScore: 85
  }
];

function interpretDreamOffline(dreamText: string) {
  const text = dreamText.toLowerCase();
  let matchedEntries = [];
  
  for (const entry of dreamDictionary) {
    if (entry.keywords.some(kw => text.includes(kw))) {
      matchedEntries.push(entry);
    }
  }

  if (matchedEntries.length === 0) {
    return {
      title: "رسالة غامضة من عقلك الباطن",
      symbolism: "الحلم يحمل رموزاً فريدة وشخصية جداً ترتبط بتجاربك اليومية.",
      meaning: "عقلك الباطن يقوم بمعالجة الأحداث الأخيرة التي مررت بها. هذا الحلم هو انعكاس لتفكيرك الداخلي وحاجتك للراحة والهدوء النفسي.",
      advice: "استمع إلى حدسك الداخلي، وخذ وقتاً للاسترخاء والتأمل في حياتك. الإجابات التي تبحث عنها موجودة بداخلك.",
      luckScore: 70
    };
  }

  // Combine matches
  const titles = ["رؤيا مركبة", "رسائل متعددة", "تلاقي الرموز", "رؤيا عميقة"];
  const randomTitle = titles[Math.floor(Math.random() * titles.length)];
  
  const combinedSymbolism = matchedEntries.map(e => "• " + e.symbolism).join("\\n");
  const combinedMeaning = matchedEntries.map(e => "• " + e.meaning).join("\\n");
  const combinedAdvice = matchedEntries.map(e => "• " + e.advice).join("\\n");
  const avgLuck = Math.round(matchedEntries.reduce((acc, e) => acc + e.luckScore, 0) / matchedEntries.length);

  let title = matchedEntries.length === 1 
    ? matchedEntries[0].title 
    : randomTitle;

  return {
    title: title,
    symbolism: combinedSymbolism,
    meaning: combinedMeaning,
    advice: combinedAdvice,
    luckScore: avgLuck
  };
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { dream } = req.body;

    if (!dream) {
      return res.status(400).json({ error: "الرجاء إدخال تفاصيل الحلم" });
    }

    const parsedResponse = interpretDreamOffline(dream);
    
    // Simulate slight processing time to make it feel natural
    await new Promise(resolve => setTimeout(resolve, 800));

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("Error interpreting dream:", error);
    res.status(500).json({ error: "عذراً، حدث خطأ أثناء محاولة تفسير الحلم. يرجى المحاولة مرة أخرى." });
  }
}
