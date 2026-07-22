'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';
import gsap from 'gsap';

export default function HeroSection() {
  const { isArabic } = useLocale();
  const containerRef = useRef<HTMLElement>(null);
  const bgLinesRef = useRef<HTMLDivElement>(null);
  const dotLeftRef = useRef<HTMLDivElement>(null);
  const dotRightRef = useRef<HTMLDivElement>(null);
  const dividerRailRef = useRef<HTMLDivElement>(null);
  const cornerFoldRef = useRef<HTMLSpanElement>(null);
  const titleLinesRef = useRef<(HTMLSpanElement | null)[]>([]);
  const descRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, -60]);

  // Entrance timeline & floating ambient animations with GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Continuous subtle floating animations for background & decorative elements
      if (dotLeftRef.current) {
        gsap.to(dotLeftRef.current, {
          y: -15,
          x: 8,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (dotRightRef.current) {
        gsap.to(dotRightRef.current, {
          y: 15,
          x: -8,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 0.5,
        });
      }

      if (cornerFoldRef.current) {
        gsap.to(cornerFoldRef.current, {
          opacity: 0.9,
          scale: 1.05,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (bgLinesRef.current) {
        gsap.to(bgLinesRef.current, {
          y: -8,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      if (dividerRailRef.current) {
        gsap.to(dividerRailRef.current, {
          y: -6,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // 2. Master entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Ambient background reveal
      tl.fromTo(
        [bgLinesRef.current, dotLeftRef.current, dotRightRef.current, dividerRailRef.current],
        { opacity: 0 },
        { opacity: 1, duration: 1, stagger: 0.12 }
      );

      // Hero Title lines stagger (Fade in + Blur to sharp + Translate Y)
      const validTitleLines = titleLinesRef.current.filter(Boolean);
      if (validTitleLines.length > 0) {
        tl.fromTo(
          validTitleLines,
          {
            opacity: 0,
            y: 45,
            filter: 'blur(14px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.18,
            ease: 'power4.out',
          },
          '-=0.7'
        );
      }

      // Description reveal
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          {
            opacity: 0,
            y: 30,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.6'
        );
      }

      // CTA Buttons reveal
      if (actionsRef.current) {
        const buttons = Array.from(actionsRef.current.children);
        tl.fromTo(
          buttons,
          {
            opacity: 0,
            y: 25,
            scale: 0.94,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.5'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isArabic]);

  // Magnetic hover and dynamic glow handlers for buttons
  const handleBtnMouseMove = (e: React.MouseEvent<HTMLAnchorElement>, isPrimary: boolean) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.28,
      y: y * 0.28,
      duration: 0.3,
      ease: 'power2.out',
      boxShadow: isPrimary
        ? '0 20px 45px rgba(240, 138, 112, 0.5), 0 0 30px rgba(240, 138, 112, 0.35)'
        : '0 16px 36px rgba(16, 214, 228, 0.3), 0 0 25px rgba(16, 214, 228, 0.25)',
      borderColor: isPrimary ? 'rgba(240, 138, 112, 0.9)' : 'rgba(16, 214, 228, 0.6)',
    });
  };

  const handleBtnMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>, isPrimary: boolean) => {
    const btn = e.currentTarget;
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
      boxShadow: isPrimary
        ? '0 14px 30px rgba(240, 138, 112, 0.23)'
        : '0 0 0 rgba(0, 0, 0, 0)',
      borderColor: isPrimary ? 'rgba(240, 138, 112, 0.7)' : 'rgba(255, 255, 255, 0.14)',
    });
  };

  return (
    <section ref={containerRef} className="hero-stage" aria-labelledby="hero-title">
      <div ref={bgLinesRef} className="bg-lines" />
      <div ref={dotLeftRef} className="dot-field dot-field-left" />
      <div ref={dotRightRef} className="dot-field dot-field-right" />

      <div className="hero-shell">
        {/* ✅ id मौजूद عشان ExperienceSection و GlobalScrollImage يلاقيه */}
        <div id="hero-image-source" className="hero-art" aria-hidden="true" style={{ visibility: 'hidden' }}>
          <div className="x-image-frame" />
        </div>

        <div ref={dividerRailRef} className="divider-rail" aria-hidden="true">
          <span />
        </div>

        <motion.div
          className="copy-frame"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          <div className="copy-panel">
            <span ref={cornerFoldRef} className="corner-fold" aria-hidden="true" />
            <h1 id="hero-title">
              {isArabic ? (
                <>
                  <span
                    ref={(el) => { titleLinesRef.current[0] = el; }}
                    className="hero-title-line block"
                  >
                    من أول تسجيل إلى
                  </span>
                  <span
                    ref={(el) => { titleLinesRef.current[1] = el; }}
                    className="hero-title-line block"
                  >
                    تشغيل يومي بثقة
                  </span>
                </>
              ) : (
                <>
                  <span
                    ref={(el) => { titleLinesRef.current[0] = el; }}
                    className="hero-title-line block"
                  >
                    From first signup to
                  </span>
                  <span
                    ref={(el) => { titleLinesRef.current[1] = el; }}
                    className="hero-title-line block"
                  >
                    trusted daily operation
                  </span>
                </>
              )}
            </h1>
            <p ref={descRef}>
              {isArabic
                ? 'X10 يبدأ الآن من تجربة عامة واضحة، ثم يقود المستخدم إلى تسجيل الهاتف وإنشاء النشاط داخل الداشبورد، دون وعود تشغيلية غير منفذة.'
                : 'X10 now starts with a clear public experience, then guides users to phone registration and activity setup inside the dashboard.'}
            </p>
            <div ref={actionsRef} className="hero-actions">
              <a
                href="#dashboard"
                className="hero-btn primary"
                onMouseMove={(e) => handleBtnMouseMove(e, true)}
                onMouseLeave={(e) => handleBtnMouseLeave(e, true)}
              >
                {isArabic ? 'ابدأ من الداشبورد' : 'Start in dashboard'}
              </a>
              <a
                href="#path"
                className="hero-btn secondary"
                onMouseMove={(e) => handleBtnMouseMove(e, false)}
                onMouseLeave={(e) => handleBtnMouseLeave(e, false)}
              >
                {isArabic ? 'اكتشف المسار' : 'Explore path'}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}