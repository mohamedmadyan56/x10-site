'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@/context/LocaleContext';

const journeyStepsAr = [
  {
    id: 1,
    title: 'دخول الموقع العام',
    subtitle: 'استكشاف المنصة',
    description: 'تصفح صفحة X10 الرئيسية واطّلع على المزايا والحلول المتاحة قبل البدء',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: 'coral',
    mockup: {
      type: 'website',
      content: {
        title: 'X10 - إدارة الفروع',
        subtitle: 'منصة شاملة لإدارة شبكات الفروع',
        buttons: ['ابدأ الآن', 'تعرف أكثر']
      }
    }
  },
  {
    id: 2,
    title: 'الانتقال للداشبورد',
    subtitle: 'بداية التسجيل',
    description: 'اضغط على "ابدأ الآن" للانتقال مباشرة إلى صفحة تسجيل الدخول',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    color: 'cyan',
    mockup: {
      type: 'auth',
      content: {
        title: 'تسجيل الدخول',
        subtitle: 'أدخل رقم هاتفك للمتابعة',
        field: 'رقم الهاتف',
        button: 'إرسال الكود'
      }
    }
  },
  {
    id: 3,
    title: 'التحقق عبر الهاتف',
    subtitle: 'رمز التحقق (OTP)',
    description: 'استلم رمز التحقق على هاتفك وأدخله للتأكد من صحة رقم الهاتف',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    color: 'coral',
    mockup: {
      type: 'otp',
      content: {
        title: 'رمز التحقق',
        subtitle: 'أدخل الرمز المرسل إلى +966xxxxxxxx',
        fields: ['○', '○', '○', '○'],
        button: 'تأكيد'
      }
    }
  },
  {
    id: 4,
    title: 'إعداد النشاط التجاري',
    subtitle: 'بيانات العمل',
    description: 'أدخل معلومات نشاطك التجاري وابدأ استخدام لوحة التحكم الخاصة بك',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    color: 'cyan',
    mockup: {
      type: 'dashboard',
      content: {
        title: 'لوحة التحكم',
        stats: ['12 فرع', '1,284 مستخدم', '48.2K مبيعات'],
        menu: ['نظرة عامة', 'الفروع', 'التقارير']
      }
    }
  }
];

const journeyStepsEn = [
  {
    id: 1,
    title: 'Enter Public Site',
    subtitle: 'Platform Exploration',
    description: 'Browse features and general information about X10 before getting started',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    color: 'coral',
    mockup: {
      type: 'website',
      content: {
        title: 'X10 - Branch Management',
        subtitle: 'Complete platform for branch network management',
        buttons: ['Get Started', 'Learn More']
      }
    }
  },
  {
    id: 2,
    title: 'Go to Dashboard',
    subtitle: 'Registration Start',
    description: 'Clicking "Get Started" takes you directly to the registration screen',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    color: 'cyan',
    mockup: {
      type: 'auth',
      content: {
        title: 'Sign In',
        subtitle: 'Enter your phone number to continue',
        field: 'Phone Number',
        button: 'Send Code'
      }
    }
  },
  {
    id: 3,
    title: 'Phone Verification',
    subtitle: 'OTP Code',
    description: 'Receive and enter verification code to confirm identity',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    color: 'coral',
    mockup: {
      type: 'otp',
      content: {
        title: 'Verification Code',
        subtitle: 'Enter code sent to +966xxxxxxxx',
        fields: ['○', '○', '○', '○'],
        button: 'Verify'
      }
    }
  },
  {
    id: 4,
    title: 'Business Setup',
    subtitle: 'Business Data',
    description: 'Enter business information and start using the system',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    color: 'cyan',
    mockup: {
      type: 'dashboard',
      content: {
        title: 'Dashboard',
        stats: ['12 Branches', '1,284 Users', '48.2K Sales'],
        menu: ['Overview', 'Branches', 'Reports']
      }
    }
  }
];

function PhoneMockup({ step, isActive }: { step: any; isActive: boolean }) {
  const { isArabic } = useLocale();
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, rotateX: 14 }}
      whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      animate={{
        scale: isActive ? 1 : 0.9,
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width: 200,
        height: 380,
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(160deg, rgba(41,42,44,0.9), rgba(20,22,26,0.95))',
        borderRadius: 32,
        border: `2px solid ${isActive ? step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)' : 'rgba(255,255,255,0.1)'}`,
        boxShadow: isActive 
          ? `0 20px 60px ${step.color === 'coral' ? 'rgba(240,138,112,0.3)' : 'rgba(16,214,228,0.25)'}`
          : '0 10px 30px rgba(0,0,0,0.3)',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Status bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, padding: '0 4px' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', fontFamily: 'var(--font-en)' }}>
          10:24
        </span>
        <div style={{ display: 'flex', gap: 2 }}>
          <div style={{ width: 14, height: 8, borderRadius: 2, border: '1px solid var(--muted)', position: 'relative' }}>
            <div style={{ width: '70%', height: '100%', background: 'var(--cyan)', borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Content based on mockup type */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {step.mockup.type === 'website' && (
          <>
            <div style={{ textAlign: 'center', padding: '20px 8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: 'var(--coral)', marginBottom: 4, fontFamily: 'var(--font-en)' }}>
                X10
              </div>
              <h4 style={{ fontSize: '13px', fontWeight: 900, color: 'var(--text)', marginBottom: 6, lineHeight: 1.3 }}>
                {step.mockup.content.title}
              </h4>
              <p style={{ fontSize: '9px', color: 'var(--muted)', lineHeight: 1.4, marginBottom: 16 }}>
                {step.mockup.content.subtitle}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {step.mockup.content.buttons.map((btn: string, i: number) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 8,
                      background: i === 0 ? 'var(--coral)' : 'rgba(255,255,255,0.08)',
                      color: i === 0 ? '#241c19' : 'var(--text)',
                      fontSize: '10px',
                      fontWeight: 700,
                      textAlign: 'center',
                    }}
                  >
                    {btn}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {step.mockup.type === 'auth' && (
          <div style={{ padding: '20px 12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text)', marginBottom: 6 }}>
              {step.mockup.content.title}
            </h4>
            <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.4 }}>
              {step.mockup.content.subtitle}
            </p>
            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: '9px', color: 'var(--muted)', marginBottom: 6, display: 'block' }}>
                {step.mockup.content.field}
              </label>
              <div style={{ 
                height: 32, 
                border: '1px solid rgba(255,255,255,0.15)', 
                borderRadius: 8, 
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                padding: '0 10px'
              }}>
                <div style={{ width: '60%', height: 8, background: 'rgba(255,255,255,0.1)', borderRadius: 4 }} />
              </div>
            </div>
            <div style={{
              padding: '10px 12px',
              borderRadius: 8,
              background: 'var(--cyan)',
              color: '#241c19',
              fontSize: '10px',
              fontWeight: 700,
              textAlign: 'center',
            }}>
              {step.mockup.content.button}
            </div>
          </div>
        )}

        {step.mockup.type === 'otp' && (
          <div style={{ padding: '20px 12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: 900, color: 'var(--text)', marginBottom: 6 }}>
              {step.mockup.content.title}
            </h4>
            <p style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: 20, lineHeight: 1.4 }}>
              {step.mockup.content.subtitle}
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 20 }}>
              {step.mockup.content.fields.map((field: string, i: number) => (
                <div
                  key={i}
                  style={{
                    width: 36,
                    height: 36,
                    border: '2px solid rgba(255,255,255,0.15)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px',
                    color: 'var(--text)',
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {field}
                </div>
              ))}
            </div>
            <div style={{
              padding: '10px 12px',
              borderRadius: 8,
              background: 'var(--coral)',
              color: '#241c19',
              fontSize: '10px',
              fontWeight: 700,
              textAlign: 'center',
            }}>
              {step.mockup.content.button}
            </div>
          </div>
        )}

        {step.mockup.type === 'dashboard' && (
          <div style={{ padding: '12px 8px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text)', marginBottom: 12 }}>
              {step.mockup.content.title}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6, marginBottom: 16 }}>
              {step.mockup.content.stats.map((stat: string, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ fontSize: '8px', color: 'var(--muted)', marginBottom: 2 }}>
                    {stat.split(' ')[1] || stat.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 900, color: i === 0 ? 'var(--coral)' : i === 1 ? 'var(--cyan)' : 'var(--text)' }}>
                    {stat.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {step.mockup.content.menu.map((item: string, i: number) => (
                <div
                  key={i}
                  style={{
                    padding: '6px 8px',
                    borderRadius: 6,
                    background: i === 0 ? 'rgba(240,138,112,0.15)' : 'transparent',
                    color: i === 0 ? 'var(--coral)' : 'var(--muted)',
                    fontSize: '9px',
                    fontWeight: 600,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function InteractiveJourneySection() {
  const { isArabic, dir } = useLocale();
  const [activeStep, setActiveStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const steps = isArabic ? journeyStepsAr : journeyStepsEn;

  // Auto-play functionality - always running
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((current) => {
            const nextStep = current >= steps.length ? 1 : current + 1;
            return nextStep;
          });
          return 0;
        }
        return prev + 2; // Progress every 50ms (2% each time = 5 seconds total)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [steps.length]);

  // Handle manual step clicks - just change step, auto-play continues
  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setProgress(0);
  };

  return (
    <section
      id="journey-map"
      dir={dir}
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '110px 32px 120px',
        background: 'var(--panel)',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at 70% 20%, rgba(16,214,228,0.06), transparent 50%), radial-gradient(ellipse at 30% 80%, rgba(240,138,112,0.05), transparent 50%)',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        {/* Progress indicators only */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 6,
            marginBottom: 48,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.id}
              style={{
                width: 48,
                height: 4,
                borderRadius: 2,
                background: step.id === activeStep
                  ? `linear-gradient(90deg, ${step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)'} ${progress}%, rgba(255,255,255,0.15) ${progress}%)`
                  : step.id < activeStep
                  ? step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)'
                  : 'rgba(255,255,255,0.1)',
                transition: 'all 0.3s ease',
                boxShadow: step.id === activeStep 
                  ? `0 0 8px ${step.color === 'coral' ? 'rgba(240,138,112,0.4)' : 'rgba(16,214,228,0.3)'}`
                  : 'none',
              }}
            />
          ))}
        </motion.div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="max-lg:!grid-cols-1 max-lg:!gap-12"
        >
          {/* ── Left / Text + Timeline side ── */}
          <div style={{ order: isArabic ? 2 : 1 }} className="max-lg:!order-2">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginBottom: 48 }}
            >
              <span className="eyebrow">{isArabic ? 'رحلة المستخدم' : 'User Journey'}</span>
              
              <h2
                style={{
                  fontSize: 'clamp(2rem, 3.6vw, 3rem)',
                  fontWeight: 950,
                  lineHeight: 1.18,
                  marginTop: 4,
                  marginBottom: 24,
                }}
              >
                {isArabic ? (
                  <>
                    رحلة قصيرة من
                    <br />
                    <span
                      style={{
                        background: 'linear-gradient(135deg, var(--coral), #e84545)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      الصفحة العامة
                    </span>{' '}
                    إلى مساحة العمل
                  </>
                ) : (
                  <>
                    A short journey from
                    <br />
                    <span
                      style={{
                        background: 'linear-gradient(135deg, var(--coral), #e84545)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      the public page
                    </span>{' '}
                    to the workspace
                  </>
                )}
              </h2>

              <p
                style={{
                  color: 'var(--muted)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
                  fontWeight: 600,
                  lineHeight: 1.85,
                  maxWidth: 480,
                }}
              >
                {isArabic
                  ? 'مسار بسيط وواضح من تصفح الموقع حتى استخدام لوحة التحكم — انقر على أي خطوة لمشاهدة الشاشة.'
                  : 'A simple and clear path from browsing the site to using the dashboard — click any step to see the screen.'}
              </p>
            </motion.div>

            {/* Interactive Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {steps.map((step, index) => {
                const isActive = activeStep === step.id;
                const isLast = index === steps.length - 1;
                
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: 'flex', gap: 24, alignItems: 'stretch' }}
                  >
                    {/* Timeline indicator */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        flexShrink: 0,
                        width: 48,
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          boxShadow: isActive 
                            ? `0 0 20px ${step.color === 'coral' ? 'rgba(240,138,112,0.4)' : 'rgba(16,214,228,0.35)'}`
                            : '0 0 0px transparent',
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          display: 'grid',
                          placeItems: 'center',
                          background: isActive
                            ? step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)'
                            : 'rgba(255,255,255,0.08)',
                          color: isActive ? '#241c19' : 'var(--muted)',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          border: `2px solid ${isActive 
                            ? step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)'
                            : 'rgba(255,255,255,0.12)'}`,
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                        onClick={() => handleStepClick(step.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Progress ring for active step */}
                        {isActive && (
                          <motion.div
                            style={{
                              position: 'absolute',
                              inset: -2,
                              borderRadius: '50%',
                              background: `conic-gradient(${step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)'} ${progress * 3.6}deg, transparent 0deg)`,
                              zIndex: -1,
                            }}
                            initial={{ rotate: -90 }}
                            animate={{ rotate: -90 }}
                          />
                        )}
                        {step.icon}
                      </motion.div>
                      
                      {!isLast && (
                        <div
                          style={{
                            width: 2,
                            flex: 1,
                            minHeight: 60,
                            background: `linear-gradient(180deg, ${
                              step.color === 'coral' ? 'rgba(240,138,112,0.3)' : 'rgba(16,214,228,0.25)'
                            }, rgba(255,255,255,0.08))`,
                            marginTop: 8,
                          }}
                        />
                      )}
                    </div>

                    {/* Step content */}
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.7,
                        x: isActive ? 0 : -4,
                      }}
                      transition={{ duration: 0.3 }}
                      style={{
                        flex: 1,
                        paddingBottom: isLast ? 0 : 32,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleStepClick(step.id)}
                    >
                      <div style={{ marginBottom: 6 }}>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)',
                            fontFamily: 'var(--font-en)',
                          }}
                        >
                          Step {step.id}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontSize: '1.2rem',
                          fontWeight: 900,
                          color: 'var(--text)',
                          marginBottom: 4,
                          lineHeight: 1.4,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: step.color === 'coral' ? 'var(--coral)' : 'var(--cyan)',
                          marginBottom: 8,
                        }}
                      >
                        {step.subtitle}
                      </p>
                      <p
                        style={{
                          color: 'var(--muted)',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          lineHeight: 1.8,
                        }}
                      >
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Right / Phone Mockup side ── */}
          <div
            style={{ 
              order: isArabic ? 1 : 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: 500,
              position: 'sticky',
              top: 140,
              perspective: '1000px',
            }}
            className="max-lg:!order-1 max-lg:!position-static"
          >
            <AnimatePresence mode="wait">
              {steps.map((step) => (
                step.id === activeStep && (
                  <PhoneMockup
                    key={step.id}
                    step={step}
                    isActive={true}
                  />
                )
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}