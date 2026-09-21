import { useEffect, useRef, useState } from 'react';
import { Check, Download, LoaderCircle, Pause, Play } from 'lucide-react';

type Palette = {
  name: string;
  swatch: string;
  background: string;
  light: string;
  middle: string;
  dark: string;
  ink: string;
  paper: string;
};

const palettes: Palette[] = [
  { name: 'Lime', swatch: '#c8df69', background: '#eeeede', light: '#edfaab', middle: '#c4db58', dark: '#70892d', ink: '#35432a', paper: '#d6cce1' },
  { name: 'Lilac', swatch: '#b7a4d5', background: '#efeaed', light: '#e3d5fb', middle: '#b6a0d7', dark: '#745794', ink: '#44384e', paper: '#d9e3b3' },
  { name: 'Tangerine', swatch: '#e89869', background: '#f4e8d8', light: '#ffc796', middle: '#ed9561', dark: '#ae583b', ink: '#593c30', paper: '#e3dbaf' },
];

type Point = { x: number; y: number };
type Recording = { recorder: MediaRecorder; stream: MediaStream; started: number; stopped: boolean };

function flowerPath() {
  const path = new Path2D();
  const steps = 240;
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const radius = 176 + 71 * Math.cos(6 * angle);
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) path.moveTo(x, y);
    else path.lineTo(x, y);
  }
  path.closePath();
  return path;
}

const flower = flowerPath();

function drawScene(ctx: CanvasRenderingContext2D, phase: number, palette: Palette, pointer: Point) {
  const width = 1600;
  const height = 860;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);

  const sun = ctx.createLinearGradient(0, 0, width, height);
  sun.addColorStop(0, 'rgba(255,255,245,0.52)');
  sun.addColorStop(0.65, 'rgba(255,250,230,0)');
  sun.addColorStop(1, 'rgba(111,100,65,0.09)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, width, height);

  // Every animated value is periodic, keeping the exported six-second loop seamless.
  const drift = Math.sin(phase) * 32;
  ctx.save();
  ctx.filter = 'blur(14px)';
  ctx.fillStyle = 'rgba(255,255,247,0.28)';
  ctx.beginPath();
  ctx.moveTo(800 + drift, 0);
  ctx.lineTo(1010 + drift, 0);
  ctx.lineTo(560 + drift, height);
  ctx.lineTo(320 + drift, height);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.fillStyle = palette.ink;
  ctx.font = '400 13px "DM Mono", monospace';
  ctx.fillText('OTHERLY / A STUDY IN CURIOSITY', 110, 105);
  ctx.font = 'italic 154px "Instrument Serif", Georgia, serif';
  ctx.fillText('Stay', 106, 345);
  ctx.fillText('curious.', 106, 493);
  ctx.strokeStyle = `${palette.ink}45`;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(110, 674);
  ctx.lineTo(407, 674);
  ctx.stroke();
  ctx.font = '400 12px "DM Mono", monospace';
  ctx.fillText('GOOD THINGS START WITH "WHAT IF?"', 110, 707);
  ctx.fillText('001', 1470, 796);

  const centerX = 1078 + pointer.x * 23;
  const centerY = 421 + Math.cos(phase) * 14 + pointer.y * 12;
  ctx.save();
  ctx.filter = 'blur(23px)';
  ctx.fillStyle = 'rgba(70,62,38,0.18)';
  ctx.beginPath();
  ctx.ellipse(1160, 704, 261, 37 + Math.sin(phase) * 4, -0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(1280 + pointer.x * 10, 356 + Math.sin(phase + 0.8) * 8);
  ctx.rotate(-0.17 + Math.sin(phase + 0.6) * 0.045);
  const chrome = ctx.createLinearGradient(-105, 0, 105, 0);
  chrome.addColorStop(0, '#64675f');
  chrome.addColorStop(0.14, '#fafff3');
  chrome.addColorStop(0.25, '#969c8e');
  chrome.addColorStop(0.45, '#fafbf4');
  chrome.addColorStop(0.57, '#73786c');
  chrome.addColorStop(0.78, '#ebeee5');
  chrome.addColorStop(1, '#777c70');
  ctx.lineWidth = 26;
  ctx.strokeStyle = chrome;
  ctx.shadowColor = 'rgba(75,72,49,0.12)';
  ctx.shadowBlur = 17;
  ctx.shadowOffsetX = 14;
  ctx.shadowOffsetY = 16;
  ctx.beginPath();
  ctx.ellipse(0, 0, 89, 241, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.shadowColor = 'transparent';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,248,0.85)';
  ctx.beginPath();
  ctx.ellipse(-4, -2, 90, 242, 0, Math.PI * 0.58, Math.PI * 1.42);
  ctx.stroke();
  ctx.restore();

  ctx.save();
  ctx.fillStyle = palette.paper;
  ctx.shadowColor = 'rgba(66,53,39,0.15)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetY = 13;
  ctx.beginPath();
  ctx.moveTo(804, 664);
  ctx.lineTo(1196, 620);
  ctx.lineTo(1395, 731);
  ctx.lineTo(1051, 797);
  ctx.closePath();
  ctx.fill();
  ctx.shadowColor = 'transparent';
  ctx.fillStyle = 'rgba(255,255,255,0.14)';
  ctx.beginPath();
  ctx.moveTo(804, 664);
  ctx.lineTo(1136, 648);
  ctx.lineTo(1051, 797);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(-0.11 + Math.sin(phase) * 0.13 + pointer.x * 0.045);
  ctx.scale(1 + Math.sin(phase) * 0.012, 0.96);
  ctx.shadowColor = 'rgba(65,77,27,0.14)';
  ctx.shadowBlur = 25;
  ctx.shadowOffsetX = 28;
  ctx.shadowOffsetY = 35;
  ctx.fillStyle = palette.dark;
  ctx.save();
  ctx.translate(15, 18);
  ctx.fill(flower);
  ctx.restore();
  ctx.shadowColor = 'transparent';
  for (let layer = 12; layer > 0; layer--) {
    ctx.save();
    ctx.translate(layer * 1.1, layer * 1.2);
    ctx.fillStyle = palette.middle;
    ctx.fill(flower);
    ctx.fillStyle = `rgba(33,49,14,${0.15 + layer * 0.008})`;
    ctx.fill(flower);
    ctx.restore();
  }
  const material = ctx.createLinearGradient(-200, -260, 230, 270);
  material.addColorStop(0, palette.light);
  material.addColorStop(0.32, palette.middle);
  material.addColorStop(0.68, palette.middle);
  material.addColorStop(1, palette.dark);
  ctx.fillStyle = material;
  ctx.fill(flower);
  ctx.save();
  ctx.clip(flower);
  const highlight = ctx.createRadialGradient(-130, -153, 3, -40, -40, 300);
  highlight.addColorStop(0, 'rgba(255,255,228,0.74)');
  highlight.addColorStop(0.27, 'rgba(255,255,236,0.19)');
  highlight.addColorStop(1, 'rgba(255,255,236,0)');
  ctx.fillStyle = highlight;
  ctx.fillRect(-270, -270, 540, 540);
  ctx.restore();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgba(255,255,218,0.22)';
  ctx.stroke(flower);
  const hole = ctx.createRadialGradient(5, 7, 8, 0, 0, 31);
  hole.addColorStop(0, palette.background);
  hole.addColorStop(0.62, palette.background);
  hole.addColorStop(0.75, palette.dark);
  hole.addColorStop(1, palette.middle);
  ctx.fillStyle = hole;
  ctx.beginPath();
  ctx.arc(0, 0, 31, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const orbX = 1385 + Math.sin(phase + 1) * 9;
  const orbY = 685 + Math.cos(phase) * 3;
  ctx.save();
  ctx.fillStyle = 'rgba(120,57,23,0.16)';
  ctx.filter = 'blur(8px)';
  ctx.beginPath();
  ctx.ellipse(orbX + 14, orbY + 41, 51, 13, -0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
  const orb = ctx.createRadialGradient(orbX - 17, orbY - 21, 3, orbX + 2, orbY + 4, 50);
  orb.addColorStop(0, '#ffe2b6');
  orb.addColorStop(0.15, '#eea063');
  orb.addColorStop(0.5, '#cf642f');
  orb.addColorStop(1, '#893b21');
  ctx.fillStyle = orb;
  ctx.beginPath();
  ctx.arc(orbX, orbY, 44, 0, Math.PI * 2);
  ctx.fill();
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function MotionStudy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [canRecord, setCanRecord] = useState(false);
  const [recording, setRecording] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');
  const paletteRef = useRef(palettes[0]);
  const playingRef = useRef(playing);
  const pointerRef = useRef<Point>({ x: 0, y: 0 });
  const smoothPointerRef = useRef<Point>({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const recordingRef = useRef<Recording | null>(null);
  const dirtyRef = useRef(true);
  const mountedRef = useRef(true);
  const timeoutRef = useRef<number | null>(null);
  paletteRef.current = palettes[paletteIndex];
  playingRef.current = playing;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: false });
    if (!canvas || !ctx) return;
    mountedRef.current = true;
    setCanRecord(typeof MediaRecorder !== 'undefined' && typeof canvas.captureStream === 'function' &&
      ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'].some((type) => MediaRecorder.isTypeSupported(type)));
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
      dirtyRef.current = true;
    }, { rootMargin: '100px' });
    observer.observe(canvas);
    document.fonts.ready.then(() => { dirtyRef.current = true; });

    let frame = 0;
    let elapsed = 0;
    let previousTime = 0;
    let previousProgress = -1;
    const render = (now: number) => {
      const delta = previousTime ? Math.min(now - previousTime, 48) : 0;
      previousTime = now;
      const capture = recordingRef.current;
      const isCapturing = capture && !capture.stopped;
      if (visibleRef.current || isCapturing || dirtyRef.current) {
        if (playingRef.current && visibleRef.current) elapsed += delta;
        const target = isCapturing ? { x: 0, y: 0 } : pointerRef.current;
        const point = smoothPointerRef.current;
        point.x += (target.x - point.x) * 0.055;
        point.y += (target.y - point.y) * 0.055;
        const movingPointer = Math.abs(target.x - point.x) + Math.abs(target.y - point.y) > 0.001;
        const phase = isCapturing ? ((now - capture.started) / 6000) * Math.PI * 2 : (elapsed / 9000) * Math.PI * 2;
        if (playingRef.current || isCapturing || dirtyRef.current || movingPointer) {
          drawScene(ctx, phase, paletteRef.current, isCapturing ? { x: 0, y: 0 } : point);
          dirtyRef.current = false;
        }
        if (isCapturing) {
          const nextProgress = Math.min(100, Math.floor(((now - capture.started) / 6000) * 100));
          if (nextProgress !== previousProgress) {
            previousProgress = nextProgress;
            setProgress(nextProgress);
          }
          if (now - capture.started >= 6000) {
            capture.stopped = true;
            if (capture.recorder.state === 'recording') capture.recorder.stop();
          }
        }
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handlePreference = () => { setPlaying(!motionPreference.matches); dirtyRef.current = true; };
    motionPreference.addEventListener('change', handlePreference);
    return () => {
      mountedRef.current = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      motionPreference.removeEventListener('change', handlePreference);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      const capture = recordingRef.current;
      if (capture) {
        if (capture.recorder.state !== 'inactive') capture.recorder.stop();
        capture.stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const exportStudy = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mimeType = typeof MediaRecorder !== 'undefined'
      ? ['video/webm;codecs=vp9', 'video/webm;codecs=vp8', 'video/webm', 'video/mp4'].find((type) => MediaRecorder.isTypeSupported(type))
      : undefined;

    if (!canRecord || !mimeType) {
      canvas.toBlob((blob) => {
        if (!blob) { setStatus('The artwork could not be saved. Please try again.'); return; }
        downloadBlob(blob, `otherly-curiosity-${palettes[paletteIndex].name.toLowerCase()}.png`);
        setStatus('Artwork saved. Video recording is not supported by this browser.');
      }, 'image/png');
      return;
    }

    let captureStream: MediaStream | null = null;
    try {
      const stream = canvas.captureStream(30);
      captureStream = stream;
      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 6500000 });
      const chunks: Blob[] = [];
      const selectedPalette = palettes[paletteIndex].name.toLowerCase();
      let failed = false;
      recorder.ondataavailable = (event) => { if (event.data.size > 0) chunks.push(event.data); };
      recorder.onstop = () => {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        stream.getTracks().forEach((track) => track.stop());
        recordingRef.current = null;
        if (!mountedRef.current) return;
        setRecording(false);
        if (failed) {
          setCanRecord(false);
          setStatus('Video encoding is unavailable. Use Save artwork to take a still with you.');
          return;
        }
        if (chunks.length) {
          downloadBlob(new Blob(chunks, { type: mimeType }), `otherly-curiosity-${selectedPalette}.${mimeType.includes('mp4') ? 'mp4' : 'webm'}`);
          setStatus('Your original 6-second motion loop is ready. Stay curious.');
        } else {
          setStatus('The browser could not finish recording. Try again or save a still.');
        }
      };
      recorder.onerror = () => {
        failed = true;
        if (recorder.state !== 'inactive') recorder.stop();
        stream.getTracks().forEach((track) => track.stop());
        if (mountedRef.current) { setRecording(false); setStatus('Recording is unavailable. Try a different browser.'); }
      };
      const started = performance.now();
      const ctx = canvas.getContext('2d');
      if (ctx) drawScene(ctx, 0, palettes[paletteIndex], { x: 0, y: 0 });
      recordingRef.current = { recorder, stream, started, stopped: false };
      setProgress(0);
      setRecording(true);
      setStatus('Creating your loop. Keep this tab open for six seconds.');
      recorder.start();
      timeoutRef.current = window.setTimeout(() => {
        if (recorder.state === 'recording') {
          if (recordingRef.current) recordingRef.current.stopped = true;
          recorder.stop();
        }
      }, 6400);
    } catch {
      setRecording(false);
      setCanRecord(false);
      captureStream?.getTracks().forEach((track) => track.stop());
      recordingRef.current?.stream.getTracks().forEach((track) => track.stop());
      recordingRef.current = null;
      setStatus('This browser cannot export video. Use Save artwork to take a still with you.');
    }
  };

  return (
    <figure className="motion-study">
      <div className="motion-canvas-wrap" style={{ background: palettes[paletteIndex].background }}>
        <canvas
          ref={canvasRef}
          width={1600}
          height={860}
          role="img"
          aria-label={`Original ${palettes[paletteIndex].name.toLowerCase()} sculptural flower, a chrome loop, and a tangerine sphere in a sunlit studio. ${playing ? 'The artwork is gently animated.' : 'Animation paused.'}`}
          onPointerMove={(event) => {
            if (event.pointerType === 'touch' || !playingRef.current) return;
            const rect = event.currentTarget.getBoundingClientRect();
            pointerRef.current = { x: ((event.clientX - rect.left) / rect.width - 0.5) * 2, y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 };
            dirtyRef.current = true;
          }}
          onPointerLeave={() => { pointerRef.current = { x: 0, y: 0 }; dirtyRef.current = true; }}
        >An original animated sculpture. Use the controls below to change its palette, pause the motion, or export the artwork.</canvas>
        {recording && <div className="recording-progress" style={{ width: `${progress}%` }} />}
      </div>
      <figcaption className="motion-toolbar">
        <div className="motion-caption"><h3>The shape of curiosity</h3><p>A living little experiment. Move your cursor.</p></div>
        <div className="motion-controls">
          <div className="palette-controls" role="group" aria-label="Artwork color palette">
            {palettes.map((palette, index) => <button key={palette.name} className={`palette-button ${index === paletteIndex ? 'is-selected' : ''}`} style={{ background: palette.swatch }} aria-label={`${palette.name} palette`} title={palette.name} aria-pressed={index === paletteIndex} disabled={recording} onClick={() => { setPaletteIndex(index); dirtyRef.current = true; setStatus(''); }}>{index === paletteIndex && <Check size={13} strokeWidth={2} />}</button>)}
          </div>
          <span className="control-divider" />
          <button className="icon-button motion-play" onClick={() => { setPlaying(!playing); dirtyRef.current = true; }} disabled={recording} aria-label={playing ? 'Pause motion study' : 'Play motion study'} title={playing ? 'Pause animation' : 'Play animation'}>{playing ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}</button>
          <button className="motion-export text-link" onClick={exportStudy} disabled={recording}>{recording ? <><LoaderCircle size={17} className="spin" />Creating {progress}%</> : <>{canRecord ? 'Take a little loop' : 'Save artwork'}<Download size={17} /></>}</button>
        </div>
      </figcaption>
      <p className={`motion-status ${status ? 'has-status' : ''}`} role="status" aria-live="polite">{status}</p>
    </figure>
  );
}