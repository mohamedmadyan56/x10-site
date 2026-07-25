'use client';

import { useLocale } from '@/context/LocaleContext';

const stepsAr = [
  {
    num: 'سجّل برقم هاتفك',
    title: 'دخول بدون كلمة مرور',
    desc: 'أدخل رقمك، استلم رمز OTP، وادخل مباشرة. لا نماذج طويلة ولا تأكيد بريد.',
  },
  {
    num: 'أضف فروعك',
    title: 'ابنِ شبكتك',
    desc: 'أنشئ الفرع الرئيسي والفروع الفرعية، وكل فرع يرث الإعدادات تلقائياً.',
  },
  {
    num: 'وزّع الأدوار',
    title: 'تحكم كامل',
    desc: 'ادعُ فريقك وحدد صلاحيات كل دور من مصفوفة واحدة واضحة.',
  },
];

const stepsEn = [
  {
    num: 'Register with Phone',
    title: 'Passwordless Login',
    desc: 'Enter your number, receive an OTP, and jump right in. No long forms or email verification.',
  },
  {
    num: 'Add Branches',
    title: 'Build Your Network',
    desc: 'Create main and sub-branches, each inheriting settings automatically.',
  },
  {
    num: 'Assign Roles',
    title: 'Full Control',
    desc: 'Invite your team and set permissions for each role from one clear matrix.',
  },
];

export default function JourneySection() {
  const { isArabic } = useLocale();
  const steps = isArabic ? stepsAr : stepsEn;

  return (
    <section id="how" className="pad-y" style={{ background: 'var(--bg-2)', borderBlock: '1px solid var(--border-soft)' }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ maxWidth: 620, marginBottom: 56 }}>
          <span className="eyebrow">{isArabic ? 'كيف تبدأ' : 'How to Start'}</span>
          <h2 className="text-[clamp(2rem,3.8vw,2.9rem)] font-black tracking-[-0.01em] my-[16px] mx-0">
            {isArabic
              ? 'من التسجيل إلى أول فرع، في أقل من ٥ دقائق'
              : 'From registration to first branch, in under 5 minutes'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[28px]" style={{ counterReset: 's' }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal relative pt-[24px]"
              style={{
                '--step-num': String(i + 1).padStart(2, '0'),
              } as React.CSSProperties}
            >
              <div
                className="absolute top-0 right-0 w-full h-[2px]"
                style={{
                  background: 'linear-gradient(90deg, var(--teal-dim), transparent)',
                }}
              />
              <span
                className="font-[family-name:var(--font-en)] text-[0.85rem] font-bold inline-flex items-center gap-[10px] mb-[14px]"
                style={{ color: 'var(--orange)' }}
              >
                <span className="text-[1.4rem]">{String(i + 1).padStart(2, '0')}</span>
                {step.num}
              </span>
              <h3 className="text-[1.3rem] mb-[8px]">{step.title}</h3>
              <p style={{ color: 'var(--text-muted)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
