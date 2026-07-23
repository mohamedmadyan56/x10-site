'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

type JourneyStep = {
  id: string;
  title: string;
  description: string;
};

const journeyStepsAr: JourneyStep[] = [
  {
    id: '01',
    title: 'إدارة المنتجات والكاتالوج',
    description: 'منتجات وتصنيفات ومتغيرات ووحدات قطع ضمن كتالوج واحد.',
  },
  {
    id: '02',
    title: 'الفروع ومواقع المخزون',
    description: 'فروع وإشراف ومواقع تخزين مرتبطة بإعدادات النشاط.',
  },
  {
    id: '03',
    title: 'المخزون والتحويل والجرد',
    description: 'أرصدة وحركات وتنبيهات ومنتجات وجلسات جرد دورية.',
  },
  {
    id: '04',
    title: 'المشتريات والمستلم',
    description: 'موردون وأوامر شراء واستلام جزئي أو كامل يحدث المخزون.',
  },
  {
    id: '05',
    title: 'نقطة البيع النقدية',
    description: 'تشغيل كاشير فعلي وجلسات مبيعات وإصلاحات ضمن النشاط المحدد.',
  },
  {
    id: '06',
    title: 'واجهة المتجر والنشر',
    description: 'مسودة ومعاينة ونشر سريع لكتالوج المتجر العام.',
  },
  {
    id: '07',
    title: 'هوية النشاط والصلاحيات',
    description: 'حدود tenant وعضوية وصلاحيات وطلبات تغيير هوية النشاط.',
  },
];

const journeyStepsEn: JourneyStep[] = [
  {
    id: '01',
    title: 'Products and catalog',
    description: 'Products, categories, variants, units, and pieces inside one catalog.',
  },
  {
    id: '02',
    title: 'Branches and stock locations',
    description: 'Branches, supervision, and storage sites connected to business settings.',
  },
  {
    id: '03',
    title: 'Inventory, transfers, and counts',
    description: 'Balances, movements, alerts, product flows, and recurring count sessions.',
  },
  {
    id: '04',
    title: 'Purchasing and receiving',
    description: 'Suppliers, purchase orders, and partial or full receiving that updates stock.',
  },
  {
    id: '05',
    title: 'Cash point of sale',
    description: 'Real cashier operation, sales sessions, and adjustments under the selected activity.',
  },
  {
    id: '06',
    title: 'Storefront and publishing',
    description: 'Draft, preview, and fast publishing for the public store catalog.',
  },
  {
    id: '07',
    title: 'Activity identity and permissions',
    description: 'Tenant boundaries, memberships, permissions, and activity identity change requests.',
  },
];

function StepCopy({
  step,
  index,
  progress,
  side,
}: {
  step: JourneyStep;
  index: number;
  progress: MotionValue<number>;
  side: 'left' | 'right';
}) {
  const start = (index / 7) * 0.75;
  const reveal = ((index + 0.5) / 7) * 0.75;
  const hiddenOffset = side === 'left' ? -34 : 34;
  // Reveal one step at a time and keep it visible afterwards (cumulative).
  const appearStart = Math.max(0, reveal - 0.07);
  const opacity = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [0, 1, 1, 0]);
  const x = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [hiddenOffset, 0, 0, hiddenOffset]);
  const scale = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [0.96, 1, 1, 0.96]);
  const lineScale = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [0.4, 1, 1, 0.4]);

  return (
    <motion.article
      className={`journey-scroll-step journey-scroll-step-${side}`}
      style={{ opacity, x, scale }}
    >
      <div className="journey-step-num">{step.id}</div>
      <div className="journey-step-line" aria-hidden="true">
        <motion.span style={{ scaleX: lineScale }} />
      </div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </motion.article>
  );
}

function CenterRail({ progress }: { progress: MotionValue<number> }) {
  const fillHeight = useTransform(progress, [0, 0.75], ['0%', '100%']);
  
  const railWidth = useTransform(progress, [0.85, 1], ['112px', 'min(100%, 1000px)']);
  const railBottom = useTransform(progress, [0.85, 1], ['0px', '100px']);
  const railTop = useTransform(progress, [0.85, 1], ['0px', '100px']);
  const railBorderRadius = useTransform(progress, [0.85, 1], ['28px', '40px']);

  const videoOpacity = useTransform(progress, [0.92, 1], [0, 1]);
  const glowOpacity = useTransform(progress, [0.85, 0.95], [1, 0]);

  return (
    <motion.div 
      className="journey-center" 
      aria-hidden="true"
      style={{
        width: railWidth,
        bottom: railBottom,
        top: railTop,
        borderRadius: railBorderRadius,
        overflow: 'hidden'
      }}
    >
      <div className="journey-center-fill">
        <motion.span style={{ height: fillHeight }} />
      </div>
      <motion.div className="journey-center-glow" style={{ opacity: glowOpacity }} />
      {journeyStepsAr.map((step, index) => (
        <CenterDot key={step.id} index={index} progress={progress} />
      ))}
      <motion.div 
        style={{ 
          position: 'absolute', 
          inset: 0, 
          opacity: videoOpacity,
          background: '#020305',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10
        }}
      >
        <video 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          autoPlay 
          muted 
          loop 
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </motion.div>
    </motion.div>
  );
}

function CenterDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const reveal = ((index + 0.5) / 7) * 0.75;
  const appearStart = Math.max(0, reveal - 0.07);
  // Light up as the scroll reaches this step and stay lit afterwards.
  const dotOpacity = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [0.18, 1, 1, 0]);
  const dotScale = useTransform(progress, [appearStart, reveal, 0.75, 0.82], [0.7, 1.1, 1.1, 0.7]);

  return (
    <motion.span
      className="journey-center-dot"
      style={{
        top: `${reveal * 100}%`,
        opacity: dotOpacity,
        scale: dotScale,
      }}
    />
  );
}

export default function InteractiveJourneySection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? journeyStepsAr : journeyStepsEn;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="journey-map"
      ref={sectionRef}
      dir={dir}
      className="journey-scroll-section"
    >
      <div className="journey-scroll-sticky">
        <div className="journey-scroll-bg" aria-hidden="true" />
        <div className="journey-scroll-shell">
          <motion.div
            className="journey-scroll-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="eyebrow">{isArabic ? 'رحلة المستخدم' : 'User Journey'}</span>
          </motion.div>

          <div className="journey-scroll-map">
            <CenterRail progress={scrollYProgress} />

            {steps.map((step, index) => {
              const isLeft = index % 2 === 1;
              return (
                <div
                  key={step.id}
                  className={`journey-scroll-slot journey-scroll-slot-${index + 1} ${isLeft ? 'is-left' : 'is-right'}`}
                >
                  <StepCopy
                    step={step}
                    index={index}
                    progress={scrollYProgress}
                    side={isLeft ? 'left' : 'right'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
