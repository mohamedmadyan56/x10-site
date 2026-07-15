'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const stepsAr = [
  { num: '١', title: 'يدخل الزائر من الموقع العام', desc: 'صفحة هبوط فاعلة للفهرسة، عربية أولًا، وتدعم الإنجليزية والتيم الداكن.' },
  { num: '٢', title: 'ينتقل إلى الداشبورد', desc: 'زر البداية يوجهه إلى تطبيق الداشبورد الحالي بدل إنشاء Auth مكرر داخل الموقع.' },
  { num: '٣', title: 'يتحقق عبر الهاتف', desc: 'تدفق الهاتف OTP والتسجيل يعمل من سطح Auth الحالي المتصل بالـ API.' },
  { num: '٤', title: 'يختار النشاط', desc: 'بعد الدخول، يتحقق الخادم من عضوية الـ tenant قبل عرض أي مساحة محمية.' },
];

const stepsEn = [
  { num: '01', title: 'Visitor enters from the public site', desc: 'An effective landing page for indexing, Arabic-first, with English and dark theme support.' },
  { num: '02', title: 'Moves to the dashboard', desc: 'The start button directs to the existing dashboard app instead of creating duplicate Auth within the site.' },
  { num: '03', title: 'Verifies via phone', desc: 'OTP phone flow and registration work from the existing Auth surface connected to the API.' },
  { num: '04', title: 'Selects an activity', desc: 'After entry, the server verifies tenant membership before displaying any protected space.' },
];

export default function JourneySection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? stepsAr : stepsEn;
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(visualRef, { once: false, margin: '-100px' });

  return (
    <section id="journey" className="bg-dark-surface" dir={dir}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-sm font-bold text-petrol-light uppercase tracking-wider mb-4 before:w-6 before:h-0.5 before:bg-petrol">
            {isArabic ? 'خطوات المسار' : 'Journey Steps'}
          </span>
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-text-light leading-tight mb-4">
            {isArabic ? (
              <>رحلة قصيرة من<br />الصفحة العامة إلى<br />مساحة العمل</>
            ) : (
              <>A short journey from<br />the public page to<br />the workspace</>
            )}
          </h2>
          <p className="text-base text-text-sub leading-relaxed max-w-[520px] mb-0">
            {isArabic
              ? 'هذه النسخة لا تخترع مُنتجًا أو تستقطب. هي تربط التسويق بالحقيق الموجود الآن.'
              : 'This version doesn\'t invent a product or attract. It connects marketing to what actually exists now.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="group flex gap-6 py-6 relative"
              >
                <motion.div
                  initial={{ opacity: 0, x: isArabic ? 80 : -80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                  className="flex flex-col items-center gap-0 shrink-0"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-petrol to-petrol-dark rounded-full flex items-center justify-center font-en font-bold text-sm text-white shrink-0 shadow-lg shadow-petrol/20 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-coral group-hover:to-coral-dark group-hover:shadow-coral/30 group-hover:scale-110">
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-[2px] flex-1 min-h-[32px] my-1 bg-gradient-to-b from-petrol to-transparent" />
                  )}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: isArabic ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: i * 0.15 + 0.1, ease: 'easeOut' }}
                  className="flex-1"
                >
                  <h3 className="text-[17px] font-bold text-text-light mb-1.5">{step.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{step.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="sticky top-20 bg-dark-card border border-white/10 rounded-[20px] p-8 flex items-center justify-center min-h-[380px] overflow-hidden"
          >
            <div className="w-full flex flex-col items-center gap-0">
              {[
                { icon: '🌐', label: isArabic ? 'الموقع العام' : 'Public Site', sub: 'Landing Page', active: false },
                { icon: '📱', label: isArabic ? 'Auth OTP' : 'Auth OTP', sub: 'Phone Verification', active: true },
                { icon: '🏢', label: isArabic ? 'اختيار النشاط' : 'Activity Selection', sub: 'Tenant Selection', active: false },
                { icon: '📊', label: isArabic ? 'الداشبورد' : 'Dashboard', sub: 'Workspace', active: false, borderColor: 'rgba(5,96,116,0.5)' },
              ].map((node, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`bg-dark-card2 border-2 rounded-xl px-6 py-3.5 text-center w-[200px] transition-all duration-300 hover:scale-105 hover:border-petrol ${node.active ? 'border-coral bg-coral/10' : 'border-white/10'} ${node.borderColor ? '' : ''}`}
                    style={node.borderColor ? { borderColor: node.borderColor } : {}}
                  >
                    <div className="text-[22px] mb-1.5">{node.icon}</div>
                    <div className="text-[13px] font-bold text-text-light">{node.label}</div>
                    <div className="text-[11px] text-text-muted mt-0.5">{node.sub}</div>
                  </div>
                  {i < 3 && (
                    <div className="w-[2px] h-8 relative my-0.5">
                      <div className="w-full h-full bg-gradient-to-b from-petrol to-petrol/30" />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-petrol" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
