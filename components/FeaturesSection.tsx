'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const featuresAr = [
  { icon: '🎨', title: 'هوية X10 المشتركة', desc: 'الشعار يستخدم Tajawal للعربية والـ Poppins للإنجليزية والألوان المحددة الجاهزة.', tag: 'Design System' },
  { icon: '⚡', title: 'Next.js حيث يفيد فعلاً', desc: 'الموقع العام يشغّل Server Components مع دعم كامل للـ ISR. محدوداً في بيئة صغيرة.', tag: 'Next.js' },
  { icon: '🔐', title: 'تجربة صادقة', desc: 'لا توعد بأسعار أو POS أو RBAC قبل رؤية كيف تقبل الأنظمة الحالية التعامل معها.', tag: 'Authentic UX' },
  { icon: '🌍', title: 'دعم كامل للغتين', desc: 'الهيدر والفهرس والأقسام اتجاها متطابقان ويدعمان التبديل بين اللغتين والثيمات.', tag: 'i18n AR/EN' },
  { icon: '🏢', title: 'Multi-Tenant آمن', desc: 'كل نشاط تجاري معزول في tenant خاص. الخادم يتحقق من الصلاحية قبل أي وصول.', tag: 'Tenant Isolation' },
  { icon: '📱', title: 'هاتف أولاً', desc: 'التسجيل عبر OTP على الهاتف دون كلمة مرور. تجربة سلسة وسريعة من اللحظة الأولى.', tag: 'Phone Auth' },
];

const featuresEn = [
  { icon: '🎨', title: 'Shared X10 Identity', desc: 'The logo uses Tajawal for Arabic and Poppins for English with ready-defined colors.', tag: 'Design System' },
  { icon: '⚡', title: 'Next.js Where It Helps', desc: 'The public site runs Server Components with full ISR support. Limited in a small environment.', tag: 'Next.js' },
  { icon: '🔐', title: 'Honest Experience', desc: 'No promises of pricing, POS, or RBAC before seeing how current systems handle them.', tag: 'Authentic UX' },
  { icon: '🌍', title: 'Full Bilingual Support', desc: 'Header, index, and sections share the same direction and support language and theme switching.', tag: 'i18n AR/EN' },
  { icon: '🏢', title: 'Secure Multi-Tenant', desc: 'Each business activity is isolated in its own tenant. The server verifies access before any entry.', tag: 'Tenant Isolation' },
  { icon: '📱', title: 'Phone First', desc: 'Registration via OTP on phone without a password. A seamless and fast experience from the first moment.', tag: 'Phone Auth' },
];

export default function FeaturesSection() {
  const { isArabic, dir } = useLocale();
  const features = isArabic ? featuresAr : featuresEn;

  return (
    <section id="features" className="bg-dark-bg" dir={dir}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-end mb-12"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-petrol-light uppercase tracking-wider mb-4 before:w-6 before:h-0.5 before:bg-petrol">
              {isArabic ? 'لماذا X10' : 'Why X10'}
            </span>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-text-light leading-tight mb-4">
              {isArabic ? (
                <>أساس واجهة واحد<br />بدل نسخ متفرقة</>
              ) : (
                <>One interface foundation<br />instead of scattered copies</>
              )}
            </h2>
            <p className="text-base text-text-sub leading-relaxed max-w-[520px]">
              {isArabic
                ? 'الصفحة تستخدم المشترك والخطوط والألوان من حزمة الواجهة المشتركة.'
                : 'The page uses shared components, fonts, and colors from the shared interface package.'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-dark-card border border-white/10 rounded-2xl p-7 cursor-pointer relative overflow-hidden transition-all duration-300 hover:border-petrol/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-petrol/0 to-petrol/0 group-hover:from-petrol/15 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              <div className="w-12 h-12 bg-petrol/15 rounded-xl flex items-center justify-center text-[22px] mb-5 transition-colors duration-300 group-hover:bg-petrol/30">
                {feature.icon}
              </div>
              <h3 className="text-[17px] font-bold text-text-light mb-2">{feature.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{feature.desc}</p>
              <span className="inline-block mt-4 text-[11px] text-[#7dd4e0] bg-petrol/15 rounded-lg px-2.5 py-0.5 font-en">
                {feature.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
