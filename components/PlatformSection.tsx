'use client';

import { useLocale } from '@/context/LocaleContext';

export default function PlatformSection() {
  const { isArabic } = useLocale();

  return (
    <section id="platform" className="pad-y" style={{ background: 'var(--bg-2)', borderBlock: '1px solid var(--border-soft)' }}>
      <div className="wrap grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-center">
        <div className="reveal">
          <span className="eyebrow">
            {isArabic ? 'شبكة الفروع' : 'Branch Network'}
          </span>
          <h2 className="text-[clamp(1.9rem,3.4vw,2.7rem)] font-black my-[16px] mx-0">
            {isArabic
              ? 'شاهد شبكتك كلها في خريطة حية واحدة'
              : 'See your entire network in one live map'}
          </h2>
          <p className="text-[1.12rem] leading-[1.85]" style={{ color: 'var(--text-muted)' }}>
            {isArabic
              ? 'كل فرع عقدة على الخريطة، متصل بالمركز الرئيسي. تابع الحالة، المبيعات، والمستخدمين النشطين لحظياً.'
              : 'Each branch is a node on the map, connected to the main hub. Track status, sales, and active users in real time.'}
          </p>
          <div className="flex flex-col gap-[18px] mt-[28px]">
            {[
              {
                title: isArabic ? 'حالة تشغيل لحظية' : 'Live Operation Status',
                desc: isArabic ? 'تعرف فوراً أي فرع نشط، متوقف، أو يحتاج تدخل.' : 'Instantly know which branches are active, paused, or need attention.',
              },
              {
                title: isArabic ? 'تجميع تلقائي للبيانات' : 'Automatic Data Aggregation',
                desc: isArabic ? 'أرقام كل الفروع تتجمع في تقرير واحد دون تصدير يدوي.' : 'Numbers from all branches gather into one report without manual export.',
              },
              {
                title: isArabic ? 'إضافة فرع في دقائق' : 'Add a Branch in Minutes',
                desc: isArabic ? 'فرع جديد يرث الإعدادات والصلاحيات مباشرة من القالب.' : 'A new branch inherits settings and permissions directly from the template.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-[14px] items-start">
                <div
                  className="shrink-0 w-[30px] h-[30px] rounded-[9px] grid place-items-center mt-[2px]"
                  style={{ background: 'oklch(45% 0.06 192 / 0.2)', color: 'var(--teal)' }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[1.1rem] font-bold mb-[3px]">{item.title}</h4>
                  <p className="text-[0.98rem]" style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="reveal rounded-[var(--r-lg)] overflow-hidden border aspect-[4/3] relative"
          style={{
            borderColor: 'var(--border)',
            background: 'linear-gradient(160deg, var(--surface-2), var(--bg-2))',
            boxShadow: '0 30px 70px oklch(10% 0.02 205 / 0.55)',
          }}
        >
          <div className="absolute inset-0">
            <div
              className="absolute grid place-items-center rounded-[14px]"
              style={{
                width: 62, height: 62, top: '42%', left: '42%',
                background: 'linear-gradient(135deg, var(--teal-strong), var(--teal-dim))',
                color: 'var(--bg)',
                border: '1px solid var(--border)',
                boxShadow: '0 8px 24px oklch(10% 0.02 205 / 0.5)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                <path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>
              </svg>
            </div>

            {[
              { top: '14%', left: '16%', color: 'var(--teal)' },
              { top: '20%', right: '14%', color: 'var(--orange)' },
              { bottom: '16%', left: '22%', color: 'var(--teal)' },
              { bottom: '22%', right: '18%', color: 'var(--teal)' },
            ].map((node, i) => (
              <div
                key={i}
                className="absolute w-[54px] h-[54px] rounded-[14px] grid place-items-center"
                style={{
                  ...node,
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border)',
                  color: 'var(--teal)',
                  boxShadow: '0 8px 24px oklch(10% 0.02 205 / 0.5)',
                }}
              >
                <div
                  className="absolute w-[14px] h-[14px] rounded-[50%_50%_50%_0]"
                  style={{
                    top: -8,
                    background: node.color,
                    transform: 'rotate(45deg)',
                  }}
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
                  <path d="M3 21h18M5 21V8l7-5 7 5v13"/>
                </svg>
              </div>
            ))}

            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} fill="none" strokeWidth="2" strokeDasharray="4 6">
              <line x1="47%" y1="47%" x2="20%" y2="20%" stroke="var(--teal-dim)"/>
              <line x1="50%" y1="46%" x2="82%" y2="24%" stroke="oklch(60% 0.12 42 / 0.5)"/>
              <line x1="46%" y1="52%" x2="26%" y2="80%" stroke="var(--teal-dim)"/>
              <line x1="52%" y1="50%" x2="80%" y2="76%" stroke="var(--teal-dim)"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
