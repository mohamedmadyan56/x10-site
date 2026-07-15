'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const featuresAr = [
  'هيدر رجّاحي يتحول عند التمرير دون قفز بصري',
  'نصوص AR/EN منفصلة عن المكونات',
  'Hero بصري بلا نص مدمج حتى تنبش الترجمة طبيعية',
];

const featuresEn = [
  'A responsive header that transitions on scroll without visual jumping',
  'AR/EN texts separate from components',
  'Visual hero with no embedded text so translation comes out natural',
];

export default function InterfaceSection() {
  const { isArabic, dir } = useLocale();
  const [activeLang, setActiveLang] = useState<'ar' | 'en'>('ar');
  const bullets = isArabic ? featuresAr : featuresEn;

  return (
    <section id="interface" className="bg-dark-surface overflow-hidden" dir={dir}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-sm font-bold text-petrol-light uppercase tracking-wider mb-4 before:w-6 before:h-0.5 before:bg-petrol">
              {isArabic ? 'التجربة' : 'Experience'}
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-text-light leading-tight mb-4">
              {isArabic ? (
                <>واجهة تصلح للعربية<br />والإنجليزية من<br />أول يوم</>
              ) : (
                <>An interface that works<br />for Arabic and English<br />from day one</>
              )}
            </h2>
            <p className="text-base text-text-sub leading-relaxed max-w-[520px] mb-0">
              {isArabic
                ? 'الهيدر والفهرس والأقسام اتجاهها متطابق ويدعمان التبديل بين اللغتين والثيمات دون إعادة بناء أي مكوّن.'
                : 'The header, index, and sections share the same direction and support switching between languages and themes without rebuilding any component.'}
            </p>

            <div className="flex flex-col gap-4 mt-6">
              {bullets.map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-3 p-4 bg-dark-card border border-white/10 rounded-xl transition-all duration-250 hover:border-petrol hover:-translate-x-1"
                >
                  <span className="w-2 h-2 bg-coral rounded-full shrink-0 mt-1.5" />
                  <span className="text-sm text-text-sub leading-relaxed">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-dark-card border border-white/10 rounded-xl overflow-hidden">
              <div className="flex bg-dark-card2 border-b border-white/10">
                {[
                  { key: 'ar' as const, label: 'AR / عربي' },
                  { key: 'en' as const, label: 'EN / English' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveLang(tab.key)}
                    className={`flex-1 py-2.5 text-center font-en text-xs cursor-pointer transition-all duration-200 border-b-2 ${
                      activeLang === tab.key
                        ? 'text-text-light border-b-coral bg-coral/5'
                        : 'text-text-muted border-b-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-5">
                <div className="bg-dark-card2 rounded-lg p-2.5 flex items-center gap-2 border border-white/10 mb-3">
                  <div className="flex gap-1.5">
                    <span className="w-[10px] h-[10px] rounded-full bg-[#e74c3c]" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#f39c12]" />
                    <span className="w-[10px] h-[10px] rounded-full bg-[#2ecc71]" />
                  </div>
                  <div className="flex-1 flex gap-4 justify-center">
                    <span className="text-xs text-text-muted">{isArabic ? 'المسار' : 'Journey'}</span>
                    <span className="text-xs text-text-muted">{isArabic ? 'الأساس' : 'Features'}</span>
                    <span className="text-xs text-text-sub border-b-[1.5px] border-coral pb-0.5">
                      {isArabic ? 'التجربة' : 'Experience'}
                    </span>
                  </div>
                  <div className="flex items-center font-en text-sm font-bold tracking-tight">
                    <span className="text-coral">X</span>
                    <span className="w-[2px] h-[14px] bg-text-muted mx-0.5" />
                    <div className="flex gap-0.5 scale-[0.7]">
                      <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
                      <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
                      <span className="w-[9px] h-[9px] bg-text-light rounded-sm" />
                      <span className="w-[9px] h-[9px] bg-coral rounded-sm" />
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2.5 text-sm text-text-muted transition-all duration-200 hover:border-petrol/40 relative overflow-hidden">
                  <span className="text-[10px] text-petrol-light font-bold block mb-1">{isArabic ? 'الاسم الكامل' : 'Full Name'}</span>
                  {isArabic ? 'أحمد محمد العتيبي' : 'Ahmed Mohammed Al-Otaibi'}
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-petrol scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </div>
                <div className="bg-white/5 border border-petrol/40 rounded-lg p-3 mb-2.5 text-sm text-text-muted transition-all duration-200 hover:border-petrol/40 relative overflow-hidden">
                  <span className="text-[10px] text-petrol-light font-bold block mb-1">{isArabic ? 'رقم الجوال' : 'Phone Number'}</span>
                  05X XXX XXXX
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-petrol scale-x-100" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2.5 text-sm text-text-muted transition-all duration-200 hover:border-petrol/40 relative overflow-hidden">
                  <span className="text-[10px] text-petrol-light font-bold block mb-1">{isArabic ? 'رمز التحقق OTP' : 'OTP Code'}</span>
                  <span className="text-text-muted">{isArabic ? 'أدخل الرمز المرسل...' : 'Enter the sent code...'}</span>
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-petrol scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </div>

                <button className="w-full bg-coral text-white border-none rounded-lg py-3 flex items-center justify-center gap-2 font-ar text-sm font-bold cursor-pointer transition-all mt-1 hover:bg-coral-dark">
                  {isArabic ? 'تحقق وادخل الداشبورد' : 'Verify & Enter Dashboard'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
