'use client';

import ScaleIn from './animations/ScaleIn';
import { useLocale } from '@/context/LocaleContext';

const featuresAr = [
  {
    title: 'هوية X10 المشتركة',
    desc: 'واجهة موحدة بتصميم نظيف ومتسق باستخدام Tailwind، تعطي نفس الانطباع في كل مكان.',
    icon: '◈',
  },
  {
    title: 'Next.js حيث يفيد فعلاً',
    desc: 'Server Components و SSR لأداء فائق وتجربة سريعة من أول زيارة.',
    icon: '◆',
  },
  {
    title: 'تجربة صادقة',
    desc: 'لا RBAC مزيف، لا صلاحيات وهمية — كل شيء يعمل فعلياً من اليوم الأول.',
    icon: '○',
  },
];

const featuresEn = [
  {
    title: 'Shared X10 Identity',
    desc: 'A unified interface with a clean, consistent design using Tailwind, giving the same impression everywhere.',
    icon: '◈',
  },
  {
    title: 'Next.js Where It Actually Helps',
    desc: 'Server Components and SSR for superior performance and a fast experience from the first visit.',
    icon: '◆',
  },
  {
    title: 'Honest Experience',
    desc: 'No fake RBAC, no imaginary permissions — everything works from day one.',
    icon: '○',
  },
];

export default function UnifiedBaseSection() {
  const { isArabic, dir } = useLocale();
  const features = isArabic ? featuresAr : featuresEn;

  return (
    <section id="base" className="py-24 bg-[#0d0d0d]" dir={dir}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {features.map((feature, i) => (
                <ScaleIn key={feature.title} delay={i * 0.1}>
                  <div className="group p-6 rounded-xl bg-[#1a1a1a] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,107,53,0.3)] transition-all duration-200 h-full">
                    <div className="text-2xl mb-4 text-[#FF6B35]">{feature.icon}</div>
                    <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-[#8B8B9A] text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </ScaleIn>
              ))}
            </div>
          </div>

          <div className="flex-1 text-center lg:text-right">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              {isArabic ? (
                <>أساس واجهة واحد<br />بدل نسخ <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#FF6B35] to-[#E84545]">متفرقة</span></>
              ) : (
                <>One interface foundation<br />instead of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#E84545]">scattered copies</span></>
              )}
            </h2>
            <p className="text-[#8B8B9A] text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
              {isArabic
                ? 'منصة واحدة، تجربة واحدة، تصميم واحد. لا مزيد من النسخ المتفرقة أو الواجهات المبعثرة.'
                : 'One platform, one experience, one design. No more scattered copies or fragmented interfaces.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
