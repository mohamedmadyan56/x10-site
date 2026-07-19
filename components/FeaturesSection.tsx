'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from '@/context/LocaleContext';

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = parseInt(el.dataset.d || '0', 10);
            el.style.transitionDelay = delay + 'ms';
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.14 }
    );
    document.querySelectorAll('.reveal').forEach((el, i) => {
      const parent = el.parentElement;
      if (parent) {
        const sibs = [...parent.querySelectorAll(':scope > .reveal')];
        (el as HTMLElement).dataset.d = String(Math.min(sibs.indexOf(el) * 80, 320));
      }
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
      <path d="M18 6 6 18M6 6l12 12"/>
    </svg>
  );
}

export default function FeaturesSection() {
  const { isArabic } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  useReveal();

  return (
    <section id="features" className="pad-y" ref={ref}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 620, marginBottom: 56 }}>
          <span className="eyebrow">{isArabic ? 'لماذا X10' : 'Why X10'}</span>
          <h2 className="text-[clamp(2rem,3.8vw,2.9rem)] font-black tracking-[-0.01em] my-[16px] mx-0">
            {isArabic
              ? 'كل ما تحتاجه لتشغيل شبكة فروع، في مكان واحد'
              : 'Everything you need to run a branch network, in one place'}
          </h2>
          <p className="text-[1.15rem] leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
            {isArabic
              ? 'مبني على أساس واجهة موحّد، مع تقنيات حديثة تخدم التجربة فعلاً لا للاستعراض.'
              : 'Built on a unified interface foundation, with modern technologies that serve the experience, not just for show.'}
          </p>
        </div>

        <div className="grid grid-cols-6 gap-[20px] auto-rows-[minmax(210px,auto)]">
          <div
            className="cell col-span-4 row-span-2 p-0 reveal"
            style={{
              background: 'var(--surface-1)',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--r-md)',
              overflow: 'hidden',
              position: 'relative',
              transition: 'transform 0.4s var(--ease-out-quint), border-color 0.4s, background 0.4s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'var(--teal-dim)';
              e.currentTarget.style.background = 'var(--surface-2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.background = '';
            }}
          >
            <div className="p-[34px] flex flex-col h-full">
              <div
                className="w-[48px] h-[48px] rounded-[13px] grid place-items-center mb-[18px]"
                style={{ background: 'oklch(45% 0.06 192 / 0.2)', color: 'var(--teal)' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
                </svg>
              </div>
              <h3 className="text-[1.35rem] mb-[10px]">{isArabic ? 'مصفوفة صلاحيات دقيقة (RBAC)' : 'Precise Permissions Matrix (RBAC)'}</h3>
              <p className="text-[1rem] leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
                {isArabic
                  ? 'حدد بالضبط من يرى، يعدّل، وينشئ، ويحذف. كل دور معزول، وكل فرع بحدوده الخاصة.'
                  : 'Specify exactly who sees, edits, creates, and deletes. Each role is isolated, each branch with its own boundaries.'}
              </p>
              <div
                className="mt-auto rounded-[var(--r-sm)] overflow-hidden border flex-1 min-h-[200px] relative"
                style={{
                  borderColor: 'var(--border)',
                  marginTop: 24,
                  background:
                    'radial-gradient(circle at 30% 20%, oklch(50% 0.08 192 / 0.25), transparent 55%), linear-gradient(160deg, var(--surface-2), var(--bg-2))',
                }}
              >
                <div className="p-[26px] grid gap-[12px]">
                  <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-[8px]">
                    <span></span>
                    <span className="text-[0.72rem] text-center font-[family-name:var(--font-en)]" style={{ color: 'var(--text-faint)' }}>
                      {isArabic ? 'عرض' : 'View'}
                    </span>
                    <span className="text-[0.72rem] text-center font-[family-name:var(--font-en)]" style={{ color: 'var(--text-faint)' }}>
                      {isArabic ? 'تعديل' : 'Edit'}
                    </span>
                    <span className="text-[0.72rem] text-center font-[family-name:var(--font-en)]" style={{ color: 'var(--text-faint)' }}>
                      {isArabic ? 'إنشاء' : 'Create'}
                    </span>
                    <span className="text-[0.72rem] text-center font-[family-name:var(--font-en)]" style={{ color: 'var(--text-faint)' }}>
                      {isArabic ? 'حذف' : 'Delete'}
                    </span>
                  </div>
                  {[
                    { role: isArabic ? 'المدير العام' : 'General Manager', checks: [true, true, true, true] },
                    { role: isArabic ? 'مدير الفرع' : 'Branch Manager', checks: [true, true, true, false] },
                    { role: isArabic ? 'المحاسب' : 'Accountant', checks: [true, true, false, false] },
                  ].map((row) => (
                    <div key={row.role} className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center gap-[8px]">
                      <span className="text-[0.92rem] font-medium" style={{ color: 'var(--text-muted)' }}>
                        {row.role}
                      </span>
                      {row.checks.map((check, i) => (
                        <div key={i} className="grid place-items-center">
                          <div
                            className="w-[22px] h-[22px] rounded-[7px] grid place-items-center"
                            style={{
                              background: check
                                ? 'oklch(45% 0.06 192 / 0.25)'
                                : 'oklch(45% 0.08 42 / 0.2)',
                              color: check ? 'var(--teal)' : 'var(--orange)',
                            }}
                          >
                            {check ? <CheckIcon /> : <XIcon />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
                </svg>
              ),
              title: isArabic ? 'الهاتف أولاً' : 'Phone First',
              desc: isArabic
                ? 'تسجيل دخول عبر OTP دون كلمات مرور. سلس وسريع من اللحظة الأولى.'
                : 'OTP login without passwords. Smooth and fast from the first moment.',
              tag: 'Phone Auth',
              accent: true,
              colSpan: 2,
              rowSpan: 1,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              ),
              title: isArabic ? 'سريع بشكل حقيقي' : 'Truly Fast',
              desc: isArabic
                ? 'Server Components حيث تفيد، وذاكرة تخزين ذكية للبيانات المتكررة.'
                : 'Server Components where useful, smart caching for repeated data.',
              tag: 'Next.js',
              accent: false,
              colSpan: 2,
              rowSpan: 1,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>
                </svg>
              ),
              title: isArabic ? 'دعم كامل للغتين' : 'Full Bilingual Support',
              desc: isArabic
                ? 'عربي وإنجليزي باتجاه صحيح، تبديل فوري دون إعادة تحميل.'
                : 'Arabic and English with correct direction, instant switch without reload.',
              tag: 'i18n AR/EN',
              accent: false,
              colSpan: 2,
              rowSpan: 1,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
              title: isArabic ? 'عزل آمن لكل مستأجر' : 'Secure Per-Tenant Isolation',
              desc: isArabic
                ? 'كل نشاط تجاري في مساحته الخاصة تماماً. البيانات لا تتقاطع.'
                : 'Each business in its own space. Data never crosses.',
              tag: 'Multi-Tenant',
              accent: true,
              colSpan: 3,
              rowSpan: 1,
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17-2 2"/>
                </svg>
              ),
              title: isArabic ? 'هوية X10 مشتركة' : 'Shared X10 Identity',
              desc: isArabic
                ? 'نظام تصميم موحّد: خطوط Tajawal وSora، وألوان محددة تنعكس على كل شاشة.'
                : 'Unified design system: Tajawal & Sora fonts, consistent colors across every screen.',
              tag: 'Design System',
              accent: false,
              colSpan: 3,
              rowSpan: 1,
            },
          ].map((feature, i) => {
            const colSpanClass = `col-span-${feature.colSpan}`;
            return (
              <div
                key={i}
                className={`cell reveal`}
                style={{
                  gridColumn: `span ${feature.colSpan}`,
                  gridRow: feature.rowSpan > 1 ? `span ${feature.rowSpan}` : 'auto',
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-soft)',
                  borderRadius: 'var(--r-md)',
                  padding: 30,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'transform 0.4s var(--ease-out-quint), border-color 0.4s, background 0.4s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--teal-dim)';
                  e.currentTarget.style.background = 'var(--surface-2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = '';
                  e.currentTarget.style.borderColor = '';
                  e.currentTarget.style.background = '';
                }}
              >
                <div
                  className="w-[48px] h-[48px] rounded-[13px] grid place-items-center mb-[18px]"
                  style={{
                    background: feature.accent
                      ? 'oklch(55% 0.1 42 / 0.18)'
                      : 'oklch(45% 0.06 192 / 0.2)',
                    color: feature.accent ? 'var(--orange)' : 'var(--teal)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-[1.35rem] mb-[10px]">{feature.title}</h3>
                <p className="text-[1rem] leading-[1.8]" style={{ color: 'var(--text-muted)' }}>
                  {feature.desc}
                </p>
                <span
                  className="mt-auto pt-[16px] font-[family-name:var(--font-en)] text-[0.82rem] font-semibold tracking-[0.02em]"
                  style={{ color: 'var(--teal)' }}
                >
                  {feature.tag}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
