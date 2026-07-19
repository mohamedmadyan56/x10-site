'use client';

import { useLocale } from '@/context/LocaleContext';
import Reveal from '@/components/animations/Reveal';

const stepsAr = [
  {
    num: '1',
    title: 'يدخل الزائر من الموقع العام',
    desc: 'صفحة خفيفة قابلة للتعريبة، عربية أولاً، وتدعم الإنجليزية والتيم الداكن',
  },
  {
    num: '2',
    title: 'ينتقل إلى الداشبورد',
    desc: 'زر البداية يوجه إلى تطبيق الداشبورد الحالي بدل إنشاء auth مكرر داخل الموقع',
  },
  {
    num: '3',
    title: 'يتحقق عبر الهاتف',
    desc: 'تدفق الهاتف OTP والتسجيل يعمل من سطح auth الحالي المتصل بالـ API',
  },
  {
    num: '4',
    title: 'يختار النشاط النشط',
    desc: 'بعد الدخول، يتحقق الخادم من عضوية tenant قبل عرض أي مساحة محمية',
  },
];

const stepsEn = [
  {
    num: '1',
    title: 'Visitor enters the public site',
    desc: 'A lightweight, localizable page — Arabic-first, supporting English and dark theme',
  },
  {
    num: '2',
    title: 'Redirects to the Dashboard',
    desc: 'The start button redirects to the existing dashboard app instead of duplicating auth on-site',
  },
  {
    num: '3',
    title: 'Verifies via phone',
    desc: 'The phone OTP and registration flow works from the existing auth surface connected to the API',
  },
  {
    num: '4',
    title: 'Selects the active business',
    desc: 'After login, the server checks tenant membership before showing any protected workspace',
  },
];

export default function JourneyMapSection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? stepsAr : stepsEn;

  return (
    <section id="journey-map" className="journey-map-stage" dir={dir}>
      <div className="journey-map-shell">
        {/* Right side - Title & Description */}
        <Reveal>
          <div className="journey-map-info">
            <h2>
              {isArabic
                ? <>رحلة قصيرة من<br />الصفحة العامة<br />إلى مساحة العمل</>
                : <>A short journey from<br />the public page<br />to the workspace</>}
            </h2>
            <p>
              {isArabic
                ? 'هذه النسخة لا تخترع متجراً أو أسعاراً، هي تربط التسويق بالتسجيل الحقيقي الموجود الآن'
                : 'This version doesn\'t invent a store or pricing — it connects marketing to the real registration that exists now'}
            </p>
          </div>
        </Reveal>

        {/* Left side - Steps Timeline */}
        <div className="journey-map-timeline">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 100}>
              <div className="journey-map-step">
                <div className="journey-map-step-indicator">
                  <span className="journey-map-dot">{step.num}</span>
                  {i < steps.length - 1 && <div className="journey-map-line" />}
                </div>
                <div className="journey-map-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
