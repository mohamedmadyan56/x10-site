'use client';

import { useState } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { motion, AnimatePresence } from 'framer-motion';

const stepsAr = [
  {
    num: '01',
    title: 'زيارة الموقع العام',
    desc: 'صفحة خفيفة وسريعة التحميل، تدعم اللغتين والوضع الداكن، مصممة لتحويل الزوار إلى عملاء.',
  },
  {
    num: '02',
    title: 'الانتقال للداشبورد',
    desc: 'بضغطة زر واحدة، يتم توجيهك بسلاسة إلى لوحة التحكم دون الحاجة لإنشاء حسابات مكررة.',
  },
  {
    num: '03',
    title: 'التحقق عبر الهاتف',
    desc: 'نظام تسجيل دخول آمن وسريع عبر رسائل OTP لضمان حماية الحسابات وسهولة الوصول.',
  },
  {
    num: '04',
    title: 'اختيار النشاط التجاري',
    desc: 'بمجرد الدخول، يمكنك اختيار أو إدارة نشاطك التجاري من بين مساحات العمل المتاحة لك.',
  },
];

const stepsEn = [
  {
    num: '01',
    title: 'Visit Public Site',
    desc: 'A fast, lightweight page supporting dual languages and dark mode, designed for conversion.',
  },
  {
    num: '02',
    title: 'Redirect to Dashboard',
    desc: 'With a single click, smoothly transition to the control panel without redundant auth steps.',
  },
  {
    num: '03',
    title: 'Phone Verification',
    desc: 'Secure and blazing fast login via OTP ensuring account safety and seamless access.',
  },
  {
    num: '04',
    title: 'Select Workspace',
    desc: 'Once logged in, effortlessly choose or manage your business from your available workspaces.',
  },
];

export default function JourneyMapSection() {
  const { isArabic, dir } = useLocale();
  const steps = isArabic ? stepsAr : stepsEn;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="journey" dir={dir} style={{ position: 'relative', overflow: 'hidden', padding: '140px 32px', background: 'var(--bg-deep, #0b0c10)' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(231, 136, 113,0.1), transparent 60%)', filter: 'blur(80px)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{ position: 'absolute', bottom: '10%', left: '10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(15, 165, 184,0.1), transparent 60%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span className="eyebrow" style={{ padding: '8px 24px', borderRadius: '100px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {isArabic ? 'رحلة المستخدم' : 'User Journey'}
          </span>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 950, marginTop: '24px', lineHeight: 1.2 }}>
            {isArabic ? (
              <>تجربة سلسة من <span style={{ color: 'var(--coral)' }}>البداية</span> للنهاية</>
            ) : (
              <>A seamless experience from <span style={{ color: 'var(--coral)' }}>start</span> to finish</>
            )}
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }} className="max-lg:!grid-cols-1">
          
          {/* Left: Interactive Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: '32px',
                    borderRadius: '24px',
                    cursor: 'pointer',
                    background: isActive ? 'linear-gradient(145deg, rgba(40,42,48,0.8), rgba(20,22,26,0.9))' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${isActive ? 'var(--coral)' : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)' : 'none',
                    transition: 'all 0.4s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {isActive && (
                    <motion.div layoutId="activeGlow" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 0% 0%, rgba(231, 136, 113,0.15), transparent 70%)' }} />
                  )}
                  <div style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 900, 
                      color: isActive ? 'var(--coral)' : 'rgba(255,255,255,0.2)',
                      fontFamily: 'var(--font-en)',
                      transition: 'color 0.3s'
                    }}>
                      {step.num}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '12px', color: isActive ? '#fff' : 'rgba(255,255,255,0.6)' }}>
                        {step.title}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}
                          >
                            {step.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Dynamic UI Mockup */}
          <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* Mockup Outer Frame */}
            <motion.div
              style={{
                width: '100%',
                maxWidth: '500px',
                height: '400px',
                background: 'linear-gradient(145deg, rgba(30, 32, 38, 0.9) 0%, rgba(15, 17, 21, 1) 100%)',
                borderRadius: '32px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Chrome Header */}
              <div style={{ height: '48px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 24px', gap: '8px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '160px', height: '24px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }} />
                </div>
              </div>

              {/* Dynamic Content Area */}
              <div style={{ flex: 1, position: 'relative', padding: '32px' }}>
                <AnimatePresence mode="wait">
                  
                  {/* Step 0: Landing Page */}
                  {activeStep === 0 && (
                    <motion.div
                      key="step0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, var(--coral), #ff6b6b)', borderRadius: '12px' }} />
                        <div style={{ display: 'flex', gap: '16px' }}>
                          <div style={{ width: '40px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                          <div style={{ width: '40px', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                        </div>
                      </div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '80%', height: '24px', background: 'rgba(255,255,255,0.8)', borderRadius: '12px' }} />
                        <div style={{ width: '60%', height: '16px', background: 'rgba(255,255,255,0.4)', borderRadius: '8px' }} />
                        <motion.div 
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          style={{ width: '120px', height: '40px', background: 'var(--coral)', borderRadius: '20px', marginTop: '16px', boxShadow: '0 10px 20px rgba(231, 136, 113,0.3)' }} 
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Redirect Loading */}
                  {activeStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '32px' }}
                    >
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px solid rgba(255,255,255,0.1)', borderTopColor: 'var(--cyan)' }}
                      />
                      <div style={{ width: '140px', height: '12px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px' }} />
                    </motion.div>
                  )}

                  {/* Step 2: OTP Verification */}
                  {activeStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', gap: '40px' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '160px', height: '20px', background: 'rgba(255,255,255,0.8)', borderRadius: '10px' }} />
                        <div style={{ width: '100px', height: '12px', background: 'rgba(255,255,255,0.3)', borderRadius: '6px' }} />
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div 
                            key={i}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: i * 0.1 }}
                            style={{ 
                              width: '48px', height: '64px', 
                              background: 'rgba(255,255,255,0.05)', 
                              border: `2px solid ${i === 3 ? 'var(--coral)' : 'rgba(255,255,255,0.1)'}`, 
                              borderRadius: '12px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}
                          >
                            {i < 3 && <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fff' }} />}
                            {i === 3 && (
                              <motion.div 
                                animate={{ opacity: [1, 0, 1] }} 
                                transition={{ duration: 1, repeat: Infinity }}
                                style={{ width: '2px', height: '24px', background: 'var(--coral)' }} 
                              />
                            )}
                          </motion.div>
                        ))}
                      </div>
                      <div style={{ width: '200px', height: '48px', background: 'linear-gradient(135deg, var(--coral), #ff6b6b)', borderRadius: '24px', boxShadow: '0 10px 20px rgba(231, 136, 113,0.3)' }} />
                    </motion.div>
                  )}

                  {/* Step 3: Workspace Selection */}
                  {activeStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}
                    >
                      <div style={{ width: '140px', height: '20px', background: 'rgba(255,255,255,0.7)', borderRadius: '10px' }} />
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[1, 2].map((i) => (
                          <motion.div 
                            key={i}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: i * 0.15 }}
                            whileHover={{ scale: 1.02 }}
                            style={{ 
                              padding: '20px', 
                              background: i === 1 ? 'rgba(15, 165, 184,0.1)' : 'rgba(255,255,255,0.03)', 
                              border: `1px solid ${i === 1 ? 'var(--cyan)' : 'rgba(255,255,255,0.05)'}`, 
                              borderRadius: '16px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '16px'
                            }}
                          >
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: i === 1 ? 'var(--cyan)' : 'rgba(255,255,255,0.1)' }} />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                              <div style={{ width: '60%', height: '12px', background: i === 1 ? '#fff' : 'rgba(255,255,255,0.5)', borderRadius: '6px' }} />
                              <div style={{ width: '40%', height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px' }} />
                            </div>
                            {i === 1 && (
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: '12px', height: '12px' }}>
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
