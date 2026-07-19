'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const bulletsAr = [
  'دعم كامل للغة العربية مع خط Cairo المحسّن',
  'نفس التجربة بالضبط مع اللغة الإنجليزية',
  'تبديل فوري بين اللغتين بدون إعادة تحميل',
];

const bulletsEn = [
  'Full support for Arabic with the optimized Cairo font',
  'The exact same experience with English',
  'Instant switching between languages without reload',
];

export default function BilingualSection() {
  const { isArabic, dir } = useLocale();
  const bullets = isArabic ? bulletsAr : bulletsEn;

  return (
    <section id="bilingual" className="py-24 bg-[#141414]" dir={dir}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-right order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              {isArabic ? (
                <>واجهة تصلح للعربية<br/>والإنجليزية <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#FF6B35] to-[#E84545]">من أول يوم</span></>
              ) : (
                <>An interface that works<br/>for Arabic and English <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#E84545]">from day one</span></>
              )}
            </h2>
            <ul className="space-y-4 mb-0">
              {bullets.map((bullet, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-center gap-3 text-[#8B8B9A] text-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-[#FF6B35] shrink-0" />
                  {bullet}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full max-w-md mx-auto lg:mx-0 order-1 lg:order-2">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-xl bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                </div>
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 text-xs rounded bg-[#FF6B35]/20 text-[#FF6B35] font-medium">AR</span>
                  <span className="px-2 py-0.5 text-xs rounded bg-[#2a2a3a] text-[#8B8B9A] font-medium">EN</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white text-sm font-medium">{isArabic ? 'الإعدادات' : 'Settings'}</span>
                  <span className="text-[#FF6B35] text-xs">{isArabic ? 'عربي' : 'Arabic'}</span>
                </div>
                <div className="h-8 rounded-lg bg-[#141414] flex items-center px-3">
                  <div className="h-3 w-24 rounded bg-[#2a2a3a]" />
                </div>
                <div className="h-8 rounded-lg bg-[#141414] flex items-center px-3">
                  <div className="h-3 w-32 rounded bg-[#2a2a3a]" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-16 rounded bg-[#2a2a3a]" />
                  <div className="h-5 w-5 rounded-full bg-[#FF6B35]/30" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
