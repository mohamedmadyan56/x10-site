'use client';

import { useRef, useEffect, useState } from 'react';
import { useLocale } from '@/context/LocaleContext';

interface StepNode {
  id: number;
  color: 'coral' | 'petrol';
  titleAr: string; titleEn: string;
  descAr: string; descEn: string;
  tagsAr: string[]; tagsEn: string[];
  shortAr: string; shortEn: string;
}

interface Node3D {
  id: number;
  x: number; y: number; z: number;
  tx: number; ty: number; tz: number;
  radius: number;
  color: 'coral' | 'petrol';
  isStep: boolean;
  stepIdx: number;
  sx: number; sy: number; sc: number; pz: number;
}

interface Pulse {
  fn: Node3D; tn: Node3D;
  prog: number; speed: number;
  color: 'coral' | 'petrol';
}

const STEPS: StepNode[] = [
  { id: 1, color: 'coral', titleAr: 'يدخل الزائر من الموقع العام', titleEn: 'Visitor enters the public site', descAr: 'واجهة حقيقية قابلة للتعريبة — عربية أولاً، تدعم الإنجليزية والثيم الداكن. تجربة بصرية ممتازة من أول لحظة.', descEn: 'A real localizable interface — Arabic-first, with English and dark theme support. A premium visual experience.', tagsAr: ['عربي أولاً', 'RTL كامل', 'داكن / فاتح'], tagsEn: ['Arabic-first', 'Full RTL', 'Dark / Light'], shortAr: 'الزائر', shortEn: 'Visitor' },
  { id: 2, color: 'petrol', titleAr: 'ينتقل إلى الداشبورد', titleEn: 'Redirects to the Dashboard', descAr: 'زر البداية يوجّه إلى تطبيق الداشبورد الحالي — بدل إنشاء auth مكرر، لوحة التحكم موجودة داخل الموقع مباشرة.', descEn: 'The start button redirects to the existing dashboard app instead of duplicating auth on-site.', tagsAr: ['بدون تسجيل مكرر', 'UX سلس', 'SSO داخلي'], tagsEn: ['No duplicate auth', 'Smooth UX', 'Internal SSO'], shortAr: 'الداشبورد', shortEn: 'Dashboard' },
  { id: 3, color: 'coral', titleAr: 'يتحقق عبر الهاتف', titleEn: 'Verifies via phone', descAr: 'OTP الهاتف والتسجيل يعمل من سطح auth الحالي المتصل بالـ API — أمان مزدوج بدون احتكاك.', descEn: 'Phone OTP and registration works from the existing auth surface connected to the API.', tagsAr: ['OTP هاتفي', 'API متصل', 'AES-256'], tagsEn: ['Phone OTP', 'API connected', 'AES-256'], shortAr: 'تحقق', shortEn: 'Verify' },
  { id: 4, color: 'petrol', titleAr: 'يختار النشاط النشط', titleEn: 'Selects the active business', descAr: 'بعد الدخول يتحقق الخادم من عضوية tenant قبل عرض أي مساحة محمية — صلاحيات دقيقة لكل نشاط.', descEn: 'After login, the server checks tenant membership before showing any protected workspace.', tagsAr: ['Tenant-based', 'صلاحيات دقيقة', 'مساحة محمية'], tagsEn: ['Tenant-based', 'Precise access', 'Protected space'], shortAr: 'النشاط', shortEn: 'Workspace' },
];

export default function NeonJourney3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<number | null>(null);
  const { isArabic } = useLocale();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  selectedRef.current = selectedIdx;

  const selected = selectedIdx !== null ? STEPS[selectedIdx] : null;

  const handlePrev = () => {
    setSelectedIdx(prev => prev === null ? 0 : (prev + 1) % 4);
  };
  const handleNext = () => {
    setSelectedIdx(prev => prev === null ? 3 : (prev + 3) % 4);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const card = cardRef.current;

    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', resize);

    const R = 220;
    const stepNodes: Node3D[] = STEPS.map((s, i) => {
      const theta = (i / 4) * Math.PI * 2 - Math.PI / 2;
      return {
        id: i, x: Math.cos(theta) * R, y: Math.sin(theta) * R * 0.55,
        z: Math.sin(theta + 0.6) * 130, tx: 0, ty: 0, tz: 0,
        radius: 18, color: s.color, isStep: true, stepIdx: i,
        sx: 0, sy: 0, sc: 1, pz: 0,
      };
    });
    stepNodes.forEach(n => { n.tx = n.x; n.ty = n.y; n.tz = n.z; });

    const satellites: Node3D[] = [
      { id: 4, x: 80, y: -180, z: -120, tx: 80, ty: -180, tz: -120, radius: 6, color: 'petrol' as const, isStep: false, stepIdx: -1, sx: 0, sy: 0, sc: 1, pz: 0 },
      { id: 5, x: -160, y: 100, z: 160, tx: -160, ty: 100, tz: 160, radius: 5, color: 'coral' as const, isStep: false, stepIdx: -1, sx: 0, sy: 0, sc: 1, pz: 0 },
      { id: 6, x: 200, y: 60, z: -200, tx: 200, ty: 60, tz: -200, radius: 6, color: 'petrol' as const, isStep: false, stepIdx: -1, sx: 0, sy: 0, sc: 1, pz: 0 },
      { id: 7, x: -100, y: -130, z: 200, tx: -100, ty: -130, tz: 200, radius: 6, color: 'coral' as const, isStep: false, stepIdx: -1, sx: 0, sy: 0, sc: 1, pz: 0 },
    ];
    const allNodes: Node3D[] = [...stepNodes, ...satellites];

    const connections = [
      { a: 0, b: 1, thick: 2.5, color: 'coral' as const },
      { a: 1, b: 2, thick: 2.5, color: 'coral' as const },
      { a: 2, b: 3, thick: 2.5, color: 'coral' as const },
      { a: 3, b: 0, thick: 1.5, color: 'petrol' as const },
      { a: 0, b: 4, thick: 1.2, color: 'petrol' as const },
      { a: 1, b: 5, thick: 1.2, color: 'coral' as const },
      { a: 2, b: 6, thick: 1.2, color: 'petrol' as const },
      { a: 3, b: 7, thick: 1.2, color: 'coral' as const },
      { a: 0, b: 6, thick: 0.8, color: 'petrol' as const },
      { a: 2, b: 4, thick: 0.8, color: 'coral' as const },
    ];

    const pulses: Pulse[] = [];
    const emitPulse = () => {
      connections.slice(0, 4).forEach(c => {
        if (Math.random() < 0.5) return;
        pulses.push({ fn: allNodes[c.a], tn: allNodes[c.b], prog: 0, speed: 0.008 + Math.random() * 0.01, color: c.color });
      });
    };
    const pulseInt = setInterval(emitPulse, 1600);
    emitPulse();

    const FOV = 450, CAM = 560;
    let aX = 0.28, aY = -0.5;
    let tAX = aX, tAY = aY;
    let autoRot = true;
    const ROT_SP = 0.0022;

    let localHovered: number | null = null;
    let fontsReady = false;
    document.fonts.ready.then(() => { fontsReady = true; });

    const proj = (n: Node3D) => {
      const cx = Math.cos(aX), sx = Math.sin(aX), cy = Math.cos(aY), sy = Math.sin(aY);
      const x1 = n.x * cy - n.z * sy, z1 = n.z * cy + n.x * sy;
      const y2 = n.y * cx - z1 * sx, z2 = z1 * cx + n.y * sx;
      const sc = FOV / (CAM + z2);
      return { sx: W / 2 + x1 * sc, sy: H / 2 + y2 * sc, sc, z2 };
    };

    const hitTest = (mx: number, my: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = mx - rect.left;
      const y = my - rect.top;

      for (const n of allNodes) {
        if (!n.sx) continue;
        const dx = x - n.sx, dy = y - n.sy;
        const r = n.isStep ? n.radius * n.sc + 14 : n.radius * n.sc + 8;
        if (dx * dx + dy * dy < r * r) return n;
      }
      return null;
    };

    const positionCard = (node: Node3D) => {
      if (!card) return;
      const sx = node.sx || W / 2;
      const sy = node.sy || H / 2;
      let left = sx + 30;
      let top = sy - 80;
      if (left + 310 > W) left = sx - 330;
      if (top < 10) top = 10;
      if (top + 340 > H) top = H - 350;
      card.style.left = left + 'px';
      card.style.top = top + 'px';
    };

    let drag = false, lx = 0, ly = 0;

    const md = (e: MouseEvent) => { drag = true; lx = e.clientX; ly = e.clientY; autoRot = false; };
    const mu = () => { drag = false; autoRot = true; };
    const mm = (e: MouseEvent) => {
      if (drag) {
        tAY += (e.clientX - lx) * 0.005;
        tAX += (e.clientY - ly) * 0.005;
        lx = e.clientX; ly = e.clientY;
      } else {
        const hit = hitTest(e.clientX, e.clientY);
        localHovered = hit && hit.isStep ? hit.stepIdx : null;
        canvas.style.cursor = hit ? 'pointer' : 'grab';
      }
    };
    const cl = (e: MouseEvent) => {
      const hit = hitTest(e.clientX, e.clientY);
      if (hit && hit.isStep) {
        const newVal = selectedRef.current === hit.stepIdx ? null : hit.stepIdx;
        selectedRef.current = newVal;
        setSelectedIdx(newVal);
      } else if (!hit) {
        selectedRef.current = null;
        setSelectedIdx(null);
      }
    };

    let lastTX = 0, lastTY = 0;
    const ts = (e: TouchEvent) => { autoRot = false; lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY; };
    const tm = (e: TouchEvent) => {
      e.preventDefault();
      const dx = e.touches[0].clientX - lastTX, dy = e.touches[0].clientY - lastTY;
      tAY += dx * 0.005; tAX += dy * 0.005;
      lastTX = e.touches[0].clientX; lastTY = e.touches[0].clientY;
    };
    const te = () => { autoRot = true; };

    canvas.addEventListener('mousedown', md);
    window.addEventListener('mouseup', mu);
    window.addEventListener('mousemove', mm);
    canvas.addEventListener('click', cl);
    canvas.addEventListener('touchstart', ts);
    canvas.addEventListener('touchmove', tm, { passive: false });
    canvas.addEventListener('touchend', te);

    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      aX += (tAX - aX) * 0.08;
      aY += (tAY - aY) * 0.08;
      if (autoRot && !drag) tAY += ROT_SP;

      allNodes.forEach(n => { const p = proj(n); n.sx = p.sx; n.sy = p.sy; n.sc = p.sc; n.pz = p.z2; });

      if (selectedRef.current !== null) {
        positionCard(stepNodes[selectedRef.current]);
      }

      const q: { t: string;[k: string]: unknown }[] = [];

      connections.forEach(c => {
        const na = allNodes[c.a], nb = allNodes[c.b];
        q.push({ t: 'e', na, nb, col: c.color, th: c.thick, z: (na.pz + nb.pz) / 2 });
      });

      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.prog += p.speed;
        if (p.prog >= 1) { pulses.splice(i, 1); continue; }
        const fn = p.fn, tn = p.tn;
        const cx = Math.cos(aX), sx = Math.sin(aX), cy = Math.cos(aY), sy = Math.sin(aY);
        const ix = fn.x + (tn.x - fn.x) * p.prog, iy = fn.y + (tn.y - fn.y) * p.prog, iz = fn.z + (tn.z - fn.z) * p.prog;
        const x1 = ix * cy - iz * sy, z1 = iz * cy + ix * sy;
        const y2 = iy * cx - z1 * sx, z2 = z1 * cx + iy * sx;
        const sc = FOV / (CAM + z2);
        q.push({ t: 'p', x: W / 2 + x1 * sc, y: H / 2 + y2 * sc, sc, z: z2, col: p.color });
      }

      allNodes.forEach(n => q.push({ t: 'n', n, z: n.pz }));
      q.sort((a, b) => (b.z as number) - (a.z as number));

      q.forEach(item => {
        if (item.t === 'e') {
          const na = item.na as Node3D, nb = item.nb as Node3D;
          const op = Math.max(0.06, 0.6 - ((item.z as number) + 300) / 1800);
          const rgb = item.col === 'coral' ? '255,107,74' : '20,180,218';
          const lw = (item.th as number) * Math.max(na.sc, nb.sc);
          const ci = connections.findIndex(c => c.a === allNodes.indexOf(na) && c.b === allNodes.indexOf(nb));
          const isJ = ci >= 0 && ci < 4;

          ctx.beginPath(); ctx.moveTo(na.sx, na.sy); ctx.lineTo(nb.sx, nb.sy);
          ctx.strokeStyle = `rgba(${rgb},${op * (isJ ? 0.22 : 0.1)})`;
          ctx.lineWidth = lw * (isJ ? 7 : 4); ctx.stroke();

          ctx.beginPath(); ctx.moveTo(na.sx, na.sy); ctx.lineTo(nb.sx, nb.sy);
          ctx.strokeStyle = `rgba(${rgb},${op * (isJ ? 0.9 : 0.55)})`;
          ctx.lineWidth = lw * (isJ ? 1.8 : 1);
          if (!isJ) ctx.setLineDash([4, 6]);
          ctx.stroke(); ctx.setLineDash([]);

        } else if (item.t === 'p') {
          const r = 6 * (item.sc as number);
          const fill = item.col === 'coral' ? '#ff6b4a' : '#14b4da';
          ctx.beginPath(); ctx.arc(item.x as number, item.y as number, r, 0, Math.PI * 2);
          ctx.fillStyle = fill; ctx.shadowColor = fill; ctx.shadowBlur = 18; ctx.fill(); ctx.shadowBlur = 0;

        } else if (item.t === 'n') {
          const n = item.n as Node3D;
          const isHov = localHovered !== null && n.isStep && n.stepIdx === localHovered;
          const isSel = selectedRef.current !== null && n.isStep && n.stepIdx === selectedRef.current;
          const op = Math.max(0.2, 0.95 - (n.pz + 300) / 1600);
          const rgb = n.color === 'coral' ? '255,107,74' : '20,180,218';
          const rad = n.radius * n.sc * (isHov || isSel ? 1.35 : 1);

          if (n.isStep) {
            const pls = 0.5 + 0.5 * Math.sin(Date.now() * 0.0025 + n.stepIdx * 1.3);
            ctx.beginPath(); ctx.arc(n.sx, n.sy, rad * 2.8 + pls * 6, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${rgb},${op * (isSel ? 0.35 : 0.12)})`;
            ctx.lineWidth = 1; ctx.stroke();
          }

          ctx.beginPath(); ctx.arc(n.sx, n.sy, rad * 1.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${op * (isSel ? 0.18 : 0.07)})`; ctx.fill();

          ctx.beginPath(); ctx.arc(n.sx, n.sy, rad, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(15,20,24,${isSel ? 0.95 : 0.88})`;
          ctx.strokeStyle = `rgba(${rgb},${op * (isSel ? 1 : 0.75)})`;
          ctx.lineWidth = n.isStep ? 2.2 * n.sc : 1.5 * n.sc;
          if (isSel) { ctx.shadowColor = n.color === 'coral' ? '#ff6b4a' : '#14b4da'; ctx.shadowBlur = 22; }
          ctx.fill(); ctx.stroke(); ctx.shadowBlur = 0;

          ctx.beginPath(); ctx.arc(n.sx, n.sy, rad * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${op * 0.9})`; ctx.fill();

          if (n.isStep && n.sc > 0.55 && fontsReady) {
            const nums = isArabic ? ['١', '٢', '٣', '٤'] : ['1', '2', '3', '4'];
            ctx.font = `900 ${Math.round(14 * n.sc)}px 'Poppins', system-ui, sans-serif`;
            ctx.fillStyle = `rgba(${rgb},${op * (isSel ? 1 : 0.8)})`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(nums[n.stepIdx], n.sx, n.sy); ctx.textBaseline = 'alphabetic';

            const shorts = STEPS.map(s => isArabic ? s.shortAr : s.shortEn);
            ctx.font = `700 ${Math.round(10 * n.sc)}px 'Tajawal', system-ui, sans-serif`;
            ctx.fillStyle = `rgba(244, 247, 246, ${op * (isSel ? 0.9 : 0.6)})`;
            ctx.fillText(shorts[n.stepIdx], n.sx, n.sy + rad + Math.round(14 * n.sc));
          }
        }
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(pulseInt);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mouseup', mu);
      window.removeEventListener('mousemove', mm);
      canvas.removeEventListener('mousedown', md);
      canvas.removeEventListener('click', cl);
      canvas.removeEventListener('touchstart', ts);
      canvas.removeEventListener('touchmove', tm);
      canvas.removeEventListener('touchend', te);
    };
  }, [isArabic]);

  const cardNum = selectedIdx !== null ? (isArabic
    ? ['٠١', '٠٢', '٠٣', '٠٤'][selectedIdx]
    : ['01', '02', '03', '04'][selectedIdx]
  ) : '';
  const cardLabel = selectedIdx !== null ? (isArabic
    ? ['الخطوة الأولى', 'الخطوة الثانية', 'الخطوة الثالثة', 'الخطوة الرابعة'][selectedIdx]
    : ['Step 1', 'Step 2', 'Step 3', 'Step 4'][selectedIdx]
  ) : '';

  return (
    <div className="neon-journey-3d" dir={isArabic ? 'rtl' : 'ltr'}>
      <canvas ref={canvasRef} className="neon-journey-canvas" />

      <div className="journey-pips">
        {STEPS.map((s, i) => (
          <div
            key={i}
            className={`journey-pip ${i === selectedIdx ? `active-${s.color}` : ''}`}
          />
        ))}
      </div>

      <button className="nav-btn nav-prev" onClick={handlePrev}>
        {isArabic ? '→' : '←'}
      </button>
      <button className="nav-btn nav-next" onClick={handleNext}>
        {isArabic ? '←' : '→'}
      </button>

      <div
        ref={cardRef}
        className={`detail-card ${selected ? `theme-${selected.color} visible` : ''}`}
      >
        {selected && (
          <>
            <div className="card-accent-bar" />
            <div className="card-body">
              <div className="card-step-num">{cardNum}</div>
              <div className="card-step-label">{cardLabel}</div>
              <h3 className="card-title">{isArabic ? selected.titleAr : selected.titleEn}</h3>
              <p className="card-desc">{isArabic ? selected.descAr : selected.descEn}</p>
              <div className="card-tags">
                {(isArabic ? selected.tagsAr : selected.tagsEn).map((tag, i) => (
                  <span key={i} className="card-tag">{tag}</span>
                ))}
              </div>
            </div>
            <p className="card-close-hint">
              {isArabic ? 'اضغط مرة أخرى للإغلاق' : 'Click again to close'}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
