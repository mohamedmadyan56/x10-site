'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function CTASection() {
  const { isArabic, dir } = useLocale();

  return (
    <section className="bg-dark-bg" dir={dir}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-3xl px-8 md:px-14 py-14 text-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(5,96,116,0.3) 0%, rgba(231,136,113,0.15) 100%)',
            border: '1px solid rgba(5,96,116,0.4)',
          }}
        >
          <div
            className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[300px] h-[300px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(5,96,116,0.3) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-text-light leading-tight mb-4 max-w-[600px] mx-auto">
              {isArabic ? 'جاهز لتجربة المسار الحقيقي؟' : 'Ready for the real path experience?'}
            </h2>
            <p className="text-base text-text-sub leading-relaxed max-w-[440px] mx-auto mb-8 text-center">
              {isArabic
                ? 'ابدأ من الموقع العام انتقل إلى الداشبورد وسجّل لنشاطك الحالي.'
                : 'Start from the public site, move to the dashboard, and register for your current activity.'}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-coral text-white border-none rounded-xl px-9 py-4 font-ar text-[17px] font-bold cursor-pointer transition-all no-underline hover:bg-coral-dark"
            >
              {isArabic ? 'افتح الداشبورد' : 'Open Dashboard'}
              <span>{isArabic ? '←' : '→'}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
