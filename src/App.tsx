import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Moon, Sparkles, Send, Share2, Star } from 'lucide-react';
import type { DreamInterpretation } from './types';

export default function App() {
  const [dream, setDream] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<DreamInterpretation | null>(null);
  const [error, setError] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dream.trim()) {
      setError('أخبرني بما رأيته أولاً...');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/interpret-dream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dream }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'حدث خطأ غير متوقع');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'فشل الاتصال بالروح الكونية...');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `🔮 فسّرت حلمي باستخدام "أوراكل الأحلام":\n\n"${result.title}"\nالنسبة الإيجابية: ${result.luckScore}%\n\n✨ التفسير:\n${result.meaning}\n\nاكتشف رسالة أحلامك الآن!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'أوراكل الأحلام',
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        console.log('User canceled share');
      }
    } else {
      navigator.clipboard.writeText(shareText + "\n" + window.location.href);
      alert('تم نسخ النتيجة للحافظة! يمكنك مشاركتها الآن.');
    }
  };

  const resetForm = () => {
    setResult(null);
    setDream('');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-mystic-900 via-mystic-800 to-mystic-700 font-sans text-white selection:bg-gold-500/30">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-gold-500/10 blur-[100px]" />
      </div>

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 mb-6 shadow-2xl shadow-purple-500/20">
            <Moon className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-amber-200 mb-4 drop-shadow-sm">
            أوراكل الأحلام
          </h1>
          <p className="text-lg md:text-xl text-indigo-200/80 max-w-xl mx-auto font-medium">
            بوابة لفك شفرات عقلك الباطن. شارك حلمك، ودع الذكاء الاصطناعي يقرأ لك رسائل النجوم.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl"
            >
              <form onSubmit={handleSubmit} className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-gold-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-mystic-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl">
                  
                  <div className="mb-6 relative">
                    <textarea
                      ref={textareaRef}
                      value={dream}
                      onChange={(e) => setDream(e.target.value)}
                      placeholder="رأيت البارحة في منامي أنني أطير فوق مدينة من الكريستال..."
                      className="w-full h-40 bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-indigo-200/40 focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-none text-lg transition-all"
                      dir="rtl"
                    />
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-3 px-2"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {isSubmitting ? (
                      <>
                        <Sparkles className="w-5 h-5 animate-spin text-gold-400" />
                        <span>جاري قراءة النجوم...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>فسّر حلمي</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-mystic-800/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-mystic-900/50 to-purple-900/50 p-6 md:p-8 border-b border-white/5 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Star className="w-24 h-24 text-gold-500" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-gold-400 mb-2 relative z-10">
                    {result.title}
                  </h2>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-sm font-bold mt-2">
                    <Sparkles className="w-4 h-4" />
                    <span>مؤشر الإيجابية: {result.luckScore}%</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-indigo-300 border-r-4 border-indigo-500 pr-3">تحليل الرموز</h3>
                    <p className="text-indigo-100/90 leading-relaxed text-lg whitespace-pre-wrap">{result.symbolism}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-purple-300 border-r-4 border-purple-500 pr-3">التفسير الشامل</h3>
                    <p className="text-indigo-100/90 leading-relaxed text-lg whitespace-pre-wrap">{result.meaning}</p>
                  </div>

                  <div className="space-y-3 bg-white/5 rounded-2xl p-5 border border-white/5">
                    <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      <span>حكمة اليوم</span>
                    </h3>
                    <p className="text-amber-100/90 leading-relaxed font-medium whitespace-pre-wrap">{result.advice}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 bg-mystic-900/30 border-t border-white/5 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleShare}
                    className="flex-1 py-3 px-4 rounded-xl font-bold bg-white/10 hover:bg-white/15 text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>شارك النتيجة</span>
                  </button>
                  <button 
                    onClick={resetForm}
                    className="flex-1 py-3 px-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg transition-colors"
                  >
                    تفسير حلم آخر
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-16 text-center text-sm text-indigo-300/40">
          أوراكل الأحلام &copy; {new Date().getFullYear()} - التفسيرات بغرض الترفيه والإلهام
        </footer>
      </main>
    </div>
  );
}
