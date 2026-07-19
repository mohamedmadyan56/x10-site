'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function HeroSection() {
  const { isArabic } = useLocale();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // ✅ الصورة تفضل ظاهرة طول الوقت — الإخفاء بيتحكم فيه ExperienceSection
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 1]);

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  return (
    <section ref={containerRef} className="hero-stage" aria-labelledby="hero-title">
      <div className="bg-lines" />
      <div className="dot-field dot-field-left" />
      <div className="dot-field dot-field-right" />

      <div className="hero-shell">
        {/* ✅ id موجود عشان ExperienceSection يلاقيه */}
        <div id="hero-image-source" className="hero-art" aria-hidden="true">
          <motion.div
            className="x-image-frame"
            style={{ y: imageY, scale: imageScale, opacity: imageOpacity }}
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png"
              alt=""
            />
          </motion.div>
        </div>

        <div className="divider-rail" aria-hidden="true">
          <span />
        </div>

        <motion.div
          className="copy-frame"
          style={{ opacity: contentOpacity, y: contentY }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="copy-panel">
            <span className="corner-fold" aria-hidden="true" />
            <h1 id="hero-title">
              {isArabic ? (
                <>
                  من أول تسجيل إلى
                  <br />
                  تشغيل يومي بثقة
                </>
              ) : (
                <>
                  From first signup to
                  <br />
                  trusted daily operation
                </>
              )}
            </h1>
            <p>
              {isArabic
                ? 'X10 يبدأ الآن من تجربة عامة واضحة، ثم يقود المستخدم إلى تسجيل الهاتف وإنشاء النشاط داخل الداشبورد، دون وعود تشغيلية غير منفذة.'
                : 'X10 now starts with a clear public experience, then guides users to phone registration and activity setup inside the dashboard.'}
            </p>
            <div className="hero-actions">
              <a href="#dashboard" className="hero-btn primary">
                {isArabic ? 'ابدأ من الداشبورد' : 'Start in dashboard'}
              </a>
              <a href="#path" className="hero-btn secondary">
                {isArabic ? 'اكتشف المسار' : 'Explore path'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}