'use client';

import { useLocale } from '@/context/LocaleContext';

const metricsAr = [
  { big: '3,400+', cap: 'فرع مُدار' },
  { big: '12ms', cap: 'زمن استجابة متوسط' },
  { big: 'SOC 2', cap: 'امتثال أمني' },
  { big: '24/7', cap: 'دعم فني بالعربية' },
];

const metricsEn = [
  { big: '3,400+', cap: 'Branches Managed' },
  { big: '12ms', cap: 'Avg Response Time' },
  { big: 'SOC 2', cap: 'Security Compliance' },
  { big: '24/7', cap: 'Arabic Tech Support' },
];

export default function MetricsSection() {
  const { isArabic } = useLocale();
  const metrics = isArabic ? metricsAr : metricsEn;

  return (
    <section className="pad-y">
      <div className="wrap grid grid-cols-2 md:grid-cols-4 gap-[30px] text-center">
        {metrics.map((m) => (
          <div key={m.big} className="reveal">
            <div
              className="font-[family-name:var(--font-en)] text-[2.9rem] font-extrabold tabular-nums leading-[1]"
              style={{ color: 'var(--teal)' }}
            >
              {m.big}
            </div>
            <div className="mt-[10px] text-[1rem]" style={{ color: 'var(--text-muted)' }}>
              {m.cap}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
