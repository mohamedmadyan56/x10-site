'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

export default function HeroSection() {
  const { isArabic } = useLocale();
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 500], [0, 80]);

  return (
    <section ref={sectionRef} className="hero relative pt-[72px] pb-[96px] overflow-hidden">
      <div className="grid-x" />
      <div
        className="glow"
        style={{
          width: '520px', height: '520px',
          background: 'oklch(55% 0.12 192 / 0.22)',
          top: '-140px', left: '-160px',
        }}
      />
      <div
        className="glow"
        style={{
          width: '420px', height: '420px',
          background: 'oklch(60% 0.14 42 / 0.14)',
          bottom: '-120px', right: '-120px',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1.05fr_1.15fr] gap-[60px] items-center"
          style={{ direction: isArabic ? 'rtl' : 'ltr' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">
              {isArabic ? 'منصة إدارة الفروع متعددة المستأجرين' : 'Multi-Tenant Branch Management Platform'}
            </span>
            <h1 className="text-[clamp(2.6rem,5.2vw,4.3rem)] font-black tracking-[-0.01em] my-[22px]">
              {isArabic ? (
                <>أدِر كل فروعك من <span style={{ color: 'var(--teal)' }}>لوحة واحدة</span>، لا فوضى ولا نسخ متفرقة</>
              ) : (
                <>Manage all your branches from <span style={{ color: 'var(--teal)' }}>one dashboard</span>, no chaos or scattered copies</>
              )}
            </h1>
            <p
              className="text-[1.24rem] leading-[1.85] mb-[36px]"
              style={{ color: 'var(--text-muted)', maxWidth: '52ch' }}
            >
              {isArabic
                ? 'X10 يربط فروعك، صلاحياتك، ومستخدميك في نظام واحد آمن. عزل كامل لكل مستأجر، تحكم دقيق في الأدوار، وتجربة عربية أصيلة من أول ثانية.'
                : 'X10 connects your branches, permissions, and users in one secure system. Full isolation per tenant, precise role control, and an authentic Arabic experience from the first second.'}
            </p>
            <div className="flex gap-[14px] flex-wrap mb-[40px]">
              <a href="#cta" className="btn btn-primary btn-lg">
                {isArabic ? 'جرّب مجاناً' : 'Try for Free'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7"/>
                </svg>
              </a>
              <a href="#platform" className="btn btn-ghost btn-lg">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="6 4 20 12 6 20 6 4"/>
                </svg>
                {isArabic ? 'شاهد العرض' : 'Watch Demo'}
              </a>
            </div>
            <div className="flex gap-[40px] flex-wrap">
              <div>
                <div className="font-[family-name:var(--font-en)] text-[2.05rem] font-bold tabular-nums" style={{ color: 'var(--text)' }}>
                  3,400<span style={{ color: 'var(--teal)' }}>+</span>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-faint)', marginTop: '2px' }}>
                  {isArabic ? 'فرع نشط على المنصة' : 'Active Branches'}
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-en)] text-[2.05rem] font-bold tabular-nums" style={{ color: 'var(--text)' }}>
                  99.9<span style={{ color: 'var(--teal)' }}>%</span>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-faint)', marginTop: '2px' }}>
                  {isArabic ? 'جاهزية التشغيل' : 'Uptime'}
                </div>
              </div>
              <div>
                <div className="font-[family-name:var(--font-en)] text-[2.05rem] font-bold tabular-nums" style={{ color: 'var(--text)' }}>
                  &lt;5<span style={{ color: 'var(--teal)' }}>د</span>
                </div>
                <div className="text-sm" style={{ color: 'var(--text-faint)', marginTop: '2px' }}>
                  {isArabic ? 'وقت الإعداد' : 'Setup Time'}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: imgY }}
          >
            <img
              src="/generated-image-7e678040-c54d-4cfc-9407-a606acdc5521.png"
              alt="لوحة تحكم X10"
              className="w-full rounded-[var(--r-lg)] block border"
              style={{
                borderColor: 'var(--border)',
                boxShadow: '0 40px 90px oklch(10% 0.02 205 / 0.7), 0 0 0 1px oklch(50% 0.06 192 / 0.15)',
              }}
            />
            <div
              className="absolute flex items-center gap-[10px] px-[15px] py-[11px] rounded-[14px] text-sm font-medium animate-[floaty_6s_ease-in-out_infinite]"
              style={{
                top: '-18px', right: '-14px',
                background: 'color-mix(in oklch, var(--surface-2) 82%, transparent)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                boxShadow: '0 16px 40px oklch(10% 0.02 205 / 0.5)',
              }}
            >
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'var(--green)' }} />
              {isArabic ? 'فرع الرياض' : 'Riyadh Branch'}
              <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                {isArabic ? 'نشط' : 'Active'}
              </span>
            </div>
            <div
              className="absolute flex items-center gap-[10px] px-[15px] py-[11px] rounded-[14px] text-sm font-medium animate-[floaty_6s_ease-in-out_infinite_1.5s]"
              style={{
                bottom: '40px', left: '-26px',
                background: 'color-mix(in oklch, var(--surface-2) 82%, transparent)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                boxShadow: '0 16px 40px oklch(10% 0.02 205 / 0.5)',
              }}
            >
              <span className="w-[9px] h-[9px] rounded-full" style={{ background: 'var(--teal)' }} />
              {isArabic ? '12 مستخدم متصل الآن' : '12 Users Online Now'}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
