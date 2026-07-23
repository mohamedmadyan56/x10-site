'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { useLocale } from '@/context/LocaleContext';

type Plan = {
  name: string;
  tag?: string;
  price: string;
  audience: string;
  tagline: string;
  cta: string;
  features: string[];
  accent: string;
  glow: string;
  featured?: boolean;
};

const plansAr: Plan[] = [
  {
    name: 'Starter',
    price: '149',
    audience: 'للأسر المنتجة والمتاجر الصغيرة',
    tagline: 'تشغيل بسيط من أول يوم',
    cta: 'ابدأ الآن',
    features: [
      'نقطة بيع POS',
      'إدارة المنتجات والمخزون الأساسية',
      'الفواتير والطباعة',
      'مستخدم واحد',
      'تقارير يومية أساسية',
      'دعم فني عبر الواتساب',
    ],
    accent: '#35d07f',
    glow: 'rgba(53,208,127,0.16)',
  },
  {
    name: 'Growth',
    tag: 'الأكثر مبيعًا',
    price: '249',
    audience: 'للمقاهي والمتاجر المتوسطة',
    tagline: 'كل ما تحتاجه للتوسع بثقة',
    cta: 'اختر Growth',
    features: [
      'كل مزايا Starter',
      'إدارة العملاء وبرنامج الولاء',
      'الموردون والمشتريات',
      'المحاسبة الأساسية والعروض',
      'مستخدمان إضافيان',
      'تقارير متقدمة ونسخ احتياطي تلقائي',
    ],
    accent: '#e78871',
    glow: 'rgba(231, 136, 113,0.2)',
    featured: true,
  },
  {
    name: 'Business',
    price: '399',
    audience: 'للأنشطة متعددة الفروع',
    tagline: 'إدارة موحدة لكل فروعك',
    cta: 'ابدأ التوسع',
    features: [
      'كل مزايا Growth',
      'حتى 3 فروع',
      'متجر إلكتروني مدمج',
      'إشعارات واتساب والحجوزات',
      'إدارة السائقين والتوصيل',
      'صلاحيات وتقارير تنفيذية متقدمة',
    ],
    accent: '#b06cff',
    glow: 'rgba(176,108,255,0.18)',
  },
  {
    name: 'Enterprise / AI',
    price: '699',
    audience: 'للشركات والمشاريع الكبيرة',
    tagline: 'ذكاء أعلى، قرارات أسرع',
    cta: 'تواصل مع المبيعات',
    features: [
      'كل مزايا Business',
      'فروع ومستخدمون غير محدودين',
      'تحليلات وتنبيهات مدعومة بالذكاء الاصطناعي',
      'اقتراح عروض ومبيعات',
      'ربط API خارجي',
      'مدير حساب ودعم أولوية عالية',
    ],
    accent: '#f2c94c',
    glow: 'rgba(242,201,76,0.16)',
  },
];

const plansEn: Plan[] = [
  {
    name: 'Starter',
    price: '149',
    audience: 'For home businesses and small stores',
    tagline: 'Simple to run from day one',
    cta: 'Start now',
    features: ['POS checkout', 'Products and basic inventory', 'Invoices and printing', 'One user', 'Basic daily reports', 'WhatsApp support'],
    accent: '#35d07f',
    glow: 'rgba(53,208,127,0.16)',
  },
  {
    name: 'Growth',
    tag: 'Best seller',
    price: '249',
    audience: 'For cafes and medium stores',
    tagline: 'Everything you need to scale',
    cta: 'Choose Growth',
    features: ['Everything in Starter', 'Customers and loyalty program', 'Suppliers and purchases', 'Basic accounting and offers', 'Two extra users', 'Advanced reports and auto backup'],
    accent: '#e78871',
    glow: 'rgba(231, 136, 113,0.2)',
    featured: true,
  },
  {
    name: 'Business',
    price: '399',
    audience: 'For multi-branch operations',
    tagline: 'Unified control for all branches',
    cta: 'Start scaling',
    features: ['Everything in Growth', 'Up to 3 branches', 'Integrated online store', 'WhatsApp alerts and bookings', 'Drivers and delivery', 'Advanced permissions and reports'],
    accent: '#b06cff',
    glow: 'rgba(176,108,255,0.18)',
  },
  {
    name: 'Enterprise / AI',
    price: '699',
    audience: 'For companies and large operations',
    tagline: 'Smarter insights, faster decisions',
    cta: 'Contact sales',
    features: ['Everything in Business', 'Unlimited branches and users', 'AI-powered analytics and alerts', 'Sales and offer suggestions', 'External API integration', 'Account manager and priority support'],
    accent: '#f2c94c',
    glow: 'rgba(242,201,76,0.16)',
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4.5 10.5 8.2 14 15.5 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlanGlyph({ index }: { index: number }) {
  const paths = [
    <path key="starter" d="M5 16h14M7 16V8h10v8M10 16v-5h4v5" />,
    <path key="growth" d="M5 17 10 12l3 3 6-7M15 8h4v4" />,
    <path key="business" d="M12 5v3M6 19v-3M18 19v-3M12 8 6 13M12 8l6 5M4 19h4M10 19h4M16 19h4M10 5h4" />,
    <path key="enterprise" d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9L12 3ZM18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15Z" />,
  ];

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[index] ?? paths[0]}
    </svg>
  );
}

function renderName(name: string): ReactNode {
  if (name.includes('/')) {
    const [main, rest] = name.split('/');
    return (
      <>
        {main.trim()} <span className="plan-name-accent">/ {rest.trim()}</span>
      </>
    );
  }
  return name;
}

function PricingCard({ plan, index, isArabic, isAnnual }: { plan: Plan; index: number; isArabic: boolean; isAnnual: boolean }) {
  const displayPrice = isAnnual ? Math.floor((Number(plan.price) * 10) / 12).toString() : plan.price;
  const priceLabel = isAnnual
    ? isArabic
      ? 'ريال / شهريًا عند الدفع السنوي'
      : 'SAR / mo billed annually'
    : isArabic
      ? 'ريال / شهريًا'
      : 'SAR / mo';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className={`plan-card ${plan.featured ? 'plan-card-featured' : ''}`}
      style={{
        '--plan-accent': plan.accent,
        '--plan-glow': plan.glow,
      } as CSSProperties}
    >
      <div className="plan-card-head">
        <div className="plan-head-text">
          {plan.featured ? (
            <span className="plan-badge">{plan.tag}</span>
          ) : (
            <h3>{renderName(plan.name)}</h3>
          )}
          <p className="plan-audience">{plan.audience}</p>
        </div>
        <span className="plan-icon">
          <PlanGlyph index={index} />
        </span>
      </div>

      <div className="plan-price">
        <div className="plan-price-row">
          <strong>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={displayPrice}
                initial={{ opacity: 0, y: -18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                transition={{ duration: 0.25 }}
              >
                {displayPrice}
              </motion.span>
            </AnimatePresence>
          </strong>
          <span className="plan-price-label">{priceLabel}</span>
        </div>
        <p className="plan-tagline">{plan.tagline}</p>
      </div>

      <ul className="plan-features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <span><CheckIcon /></span>
            {feature}
          </li>
        ))}
      </ul>

      <button className={`plan-cta ${plan.featured ? 'plan-cta-solid' : 'plan-cta-ghost'}`} type="button">
        {plan.cta}
      </button>
    </motion.article>
  );
}

export default function UnifiedBaseSection() {
  const { isArabic, dir } = useLocale();
  const [isAnnual, setIsAnnual] = useState(true);
  const plans = isArabic ? plansAr : plansEn;

  return (
    <section id="base" dir={dir} className="pricing-section">
      <div className="pricing-bg" aria-hidden="true">
        <motion.span
          className="pricing-glow pricing-glow-coral"
          animate={{ scale: [1, 1.12, 1], opacity: [0.42, 0.62, 0.42] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          className="pricing-glow pricing-glow-cyan"
          animate={{ scale: [1, 1.16, 1], opacity: [0.34, 0.56, 0.34] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </div>

      <div className="wrap pricing-wrap">
        <motion.div
          className="pricing-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">{isArabic ? 'باقات X10 POS' : 'X10 POS Plans'}</span>
          <h2>
            {isArabic ? (
              <>خطط مرنة تدعم<br />نمو مشروعك</>
            ) : (
              <>Flexible plans that power<br />your growth</>
            )}
          </h2>
          <p>
            {isArabic
              ? 'ابدأ بالأدوات الأساسية، وكبّر إمكانياتك وقت ما تحتاج. كل باقة مصممة لتخلّي التشغيل أسرع وأوضح.'
              : 'Start with the essentials and scale up whenever you need. Every plan is built to make operations faster and clearer.'}
          </p>

          <div className="billing-switch">
            <span className="billing-note">
              {isArabic ? 'وفر شهرين مع الاشتراك السنوي' : 'Get 2 months free with annual billing'}
            </span>
            <div className="billing-seg" role="group" aria-label="Billing period">
              <button
                type="button"
                className={!isAnnual ? 'active' : ''}
                onClick={() => setIsAnnual(false)}
              >
                {isArabic ? 'شهري' : 'Monthly'}
              </button>
              <button
                type="button"
                className={isAnnual ? 'active' : ''}
                onClick={() => setIsAnnual(true)}
              >
                {isArabic ? 'سنوي' : 'Annual'}
              </button>
            </div>
          </div>
        </motion.div>

        <div className="plan-grid">
          {plans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} isArabic={isArabic} isAnnual={isAnnual} />
          ))}
        </div>
      </div>
    </section>
  );
}
