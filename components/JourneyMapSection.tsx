'use client';

import { useLocale } from '@/context/LocaleContext';
import { motion } from 'framer-motion';
import Reveal from '@/components/animations/Reveal';

const stepsAr = [
  {
    num: '01',
    title: 'يدخل الزائر من الموقع العام',
    desc: 'صفحة خفيفة قابلة للتعريبة، عربية أولاً، وتدعم الإنجليزية والتم الداكن',
  },
  {
    num: '02',
    title: 'ينتقل إلى الداشبورد',
    desc: 'زر البداية يوجه إلى تطبيق الداشبورد الحالي بدل إنشاء auth مكرر داخل الموقع',
  },
  {
    num: '03',
    title: 'يتحقق عبر الهاتف',
    desc: 'تدفق الهاتف OTP والتسجيل يعمل من سطح auth الحالي المتصل بالـ API',
  },
  {
    num: '04',
    title: 'يختار النشاط النشط',
    desc: 'بعد الدخول، يتحقق الخادم من عضوية tenant قبل عرض أي مساحة محمية',
  },
];

const stepsEn = [
  {
    num: '01',
    title: 'Visitor enters the public site',
    desc: 'A lightweight, localizable page — Arabic-first, supporting English and dark theme',
  },
  {
    num: '02',
    title: 'Redirects to the Dashboard',
    desc: 'The start button redirects to the existing dashboard app instead of duplicating auth on-site',
  },
  {
    num: '03',
    title: 'Verifies via phone',
    desc: 'The phone OTP and registration flow works from the existing auth surface connected to the API',
  },
  {
    num: '04',
    title: 'Selects the active business',
    desc: 'After login, the server checks tenant membership before showing any protected workspace',
  },
];

export default function JourneyMapSection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? stepsAr : stepsEn;

  return (
    <section id="journey-map" className="journey-map-stage" dir={dir}>
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,_rgba(240,138,112,0.06),_transparent_60%)]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,_rgba(16,214,228,0.05),_transparent_60%)]" />
      </div>

      <div className="journey-map-shell relative z-10">
        <Reveal>
          <div className="journey-map-info">
            <span className="journey-map-eyebrow">{isArabic ? 'الرحلة' : 'The Journey'}</span>
            <h2>
              {isArabic
                ? <>رحلة قصيرة من<br />الصفحة العامة<br />إلى مساحة العمل</>
                : <>A short journey from<br />the public page<br />to the workspace</>}
            </h2>
            <p>
              {isArabic
                ? 'هذه النسخة لا تخترع متجراً أو أسعاراً، هي تربط التسويق بالتسجيل الحقيقي الموجود الآن'
                : "This version doesn't invent a store or pricing — it connects marketing to the real registration that exists now"}
            </p>
          </div>
        </Reveal>

        <div className="journey-map-timeline">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 120}>
              <motion.div
                className="journey-map-step group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="journey-map-step-indicator">
                  <span className="journey-map-num">{step.num}</span>
                  {i < steps.length - 1 && (
                    <div className="journey-map-line">
                      <div className="journey-map-line-glow" />
                    </div>
                  )}
                </div>
                <div className="journey-map-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
