import React, { useState, useEffect, useRef } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { CameraMode, EvidenceCategory, QualityMetrics, Evidence } from '../../types/investigation';
import { CameraQualityGuidance } from './CameraQualityGuidance';
import { DocumentScannerCanvas } from './DocumentScannerCanvas';
import { EvidenceReviewModal } from './EvidenceReviewModal';
import {
  Camera,
  Video,
  FileText,
  CreditCard,
  Layers,
  Compass,
  Zap,
  Mic,
  X,
  RotateCw,
  Sun,
  Grid,
  Clock,
  Upload,
  AlertCircle,
  CheckCircle,
  Sliders
} from 'lucide-react';

export const EvidenceCameraModal: React.FC = () => {
  const { isCameraOpen, closeCamera, addEvidence, currentCase } = useInvestigation();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const [mode, setMode] = useState<CameraMode>('PHOTO');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [flash, setFlash] = useState<boolean>(false);
  const [grid, setGrid] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(1);
  const [timer, setTimer] = useState<number>(0);
  const [timerCountdown, setTimerCountdown] = useState<number | null>(null);
  const [exposure, setExposure] = useState<number>(0);

  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  // Focus point animation state
  const [focusPoint, setFocusPoint] = useState<{ x: number; y: number } | null>(null);

  // Flow states
  const [capturedMediaUrl, setCapturedMediaUrl] = useState<string | null>(null);
  const [isScanningDocument, setIsScanningDocument] = useState<boolean>(false);
  const [showReview, setShowReview] = useState<boolean>(false);

  // Simulated live quality metrics
  const [qualityMetrics, setQualityMetrics] = useState<QualityMetrics>({
    lighting: 'GOOD',
    blur: 'NONE',
    tiltAngle: 0.5,
    focusStable: true,
    score: 92
  });

  // Start / Stop Camera Stream
  useEffect(() => {
    if (!isCameraOpen) {
      stopCameraStream();
      return;
    }

    startCameraStream();

    return () => {
      stopCameraStream();
    };
  }, [isCameraOpen, facingMode, mode]);

  const startCameraStream = async () => {
    stopCameraStream();
    setCameraPermissionError(null);

    try {
      const constraints: MediaStreamConstraints = {
        video: mode !== 'AUDIO' ? {
          facingMode: facingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        } : false,
        audio: mode === 'AUDIO' || mode === 'VIDEO'
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      mediaStreamRef.current = stream;

      if (videoRef.current && mode !== 'AUDIO') {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Camera stream error:', err);
      setCameraPermissionError('Camera access is unavailable. Check permissions or select media from your device.');
    }
  };

  const stopCameraStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
  };

  // Flip Camera
  const toggleCameraFlip = () => {
    setFacingMode(prev => (prev === 'environment' ? 'user' : 'environment'));
  };

  // Tap to focus animation handler
  const handleTapToFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFocusPoint({ x, y });
    setTimeout(() => setFocusPoint(null), 1500);
  };

  // Shutter action
  const handleShutter = () => {
    if (timer > 0) {
      setTimerCountdown(timer);
      const interval = setInterval(() => {
        setTimerCountdown(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            executeCapture();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      executeCapture();
    }
  };

  const executeCapture = () => {
    if (mode === 'VIDEO') {
      if (isRecording) {
        stopVideoRecording();
      } else {
        startVideoRecording();
      }
      return;
    }

    if (mode === 'AUDIO') {
      if (isRecording) {
        stopAudioRecording();
      } else {
        startAudioRecording();
      }
      return;
    }

    // Capture photo frame from video canvas
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth || 1280;
      canvas.height = video.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedMediaUrl(dataUrl);

        if (mode === 'DOCUMENT' || mode === 'ID_CARD') {
          setIsScanningDocument(true);
        } else {
          setShowReview(true);
        }
      }
    } else {
      // Fallback SVG frame for demo/mock environment if camera stream disabled
      setCapturedMediaUrl(`data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" fill="%231e293b"><text x="200" y="300" fill="%23ffffff">FALLBACK EVIDENCE CAPTURE</text></svg>`);
      setShowReview(true);
    }
  };

  const startVideoRecording = () => {
    if (!mediaStreamRef.current) return;
    setIsRecording(true);
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(mediaStreamRef.current);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' });
      setCapturedMediaUrl(URL.createObjectURL(blob));
      setShowReview(true);
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
  };

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const startAudioRecording = () => {
    if (!mediaStreamRef.current) return;
    setIsRecording(true);
    const chunks: Blob[] = [];
    const recorder = new MediaRecorder(mediaStreamRef.current);
    recorder.ondataavailable = e => chunks.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/wav' });
      setCapturedMediaUrl(URL.createObjectURL(blob));
      setShowReview(true);
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // File Upload fallback
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        if (ev.target?.result) {
          setCapturedMediaUrl(ev.target.result as string);
          if (file.type.includes('pdf') || mode === 'DOCUMENT') {
            setIsScanningDocument(true);
          } else {
            setShowReview(true);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getCategoryFromMode = (): EvidenceCategory => {
    switch (mode) {
      case 'VIDEO': return 'VIDEO';
      case 'AUDIO': return 'AUDIO';
      case 'DOCUMENT': return 'DOCUMENT';
      case 'ID_CARD': return 'CARD';
      default: return 'IMAGE';
    }
  };

  // Final confirmation to context store
  const handleFinalConfirm = (data: { title: string; description: string; notes: string; tags: string[] }) => {
    if (!capturedMediaUrl) return;

    const evdId = `EVD-IN-${new Date().getFullYear()}-015-${Math.floor(100 + Math.random() * 900)}`;
    const category = getCategoryFromMode();

    const newEvd: Evidence = {
      id: `evd-captured-${Date.now()}`,
      evidenceId: evdId,
      caseId: currentCase.id,
      title: data.title,
      description: data.description || 'Captured via Hari Investigator Evidence Camera.',
      category,
      fileUrl: capturedMediaUrl,
      originalUrl: capturedMediaUrl,
      processedUrl: capturedMediaUrl,
      hash: Array.from(new Array(64), () => Math.floor(Math.random() * 16).toString(16)).join(''),
      status: 'NEEDS_REVIEW',
      level: 1,
      capturedAt: new Date().toLocaleDateString() + ' • ' + new Date().toLocaleTimeString() + ' IST',
      deviceTime: new Date().toLocaleDateString() + ' • ' + new Date().toLocaleTimeString() + ' IST',
      resolution: '1920x1080 FHD',
      fileSize: '2.4 MB',
      qualityMetrics,
      notes: data.notes ? [{
        id: `n-${Date.now()}`,
        author: 'Investigator',
        timestamp: new Date().toLocaleTimeString(),
        text: data.notes
      }] : [],
      tags: data.tags,
      capturedBy: 'Field Investigator'
    };

    addEvidence(newEvd);
    setShowReview(false);
    setIsScanningDocument(false);
    setCapturedMediaUrl(null);
    closeCamera();
  };

  if (!isCameraOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none">
      {/* Document Scanner Overlay View */}
      {isScanningDocument && capturedMediaUrl && (
        <DocumentScannerCanvas
          capturedImage={capturedMediaUrl}
          onConfirm={(processedImg) => {
            setCapturedMediaUrl(processedImg);
            setIsScanningDocument(false);
            setShowReview(true);
          }}
          onRetake={() => {
            setIsScanningDocument(false);
            setCapturedMediaUrl(null);
          }}
        />
      )}

      {/* Review Modal View */}
      {showReview && capturedMediaUrl && (
        <EvidenceReviewModal
          capturedMediaUrl={capturedMediaUrl}
          category={getCategoryFromMode()}
          qualityMetrics={qualityMetrics}
          onRetake={() => {
            setShowReview(false);
            setCapturedMediaUrl(null);
          }}
          onConfirm={handleFinalConfirm}
        />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 flex items-center justify-between text-white">
        <button
          onClick={closeCamera}
          className="p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Live Camera Quality HUD */}
        {!cameraPermissionError && (
          <CameraQualityGuidance metrics={qualityMetrics} mode={mode} />
        )}

        {/* Top Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFlash(!flash)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition ${
              flash ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
          >
            <Zap className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGrid(!grid)}
            className={`p-2.5 rounded-full backdrop-blur-md border transition ${
              grid ? 'bg-blue-500/20 border-blue-400 text-blue-300' : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTimer(t => (t === 0 ? 3 : t === 3 ? 10 : 0))}
            className={`px-3 py-1.5 rounded-full backdrop-blur-md text-xs font-mono border transition flex items-center gap-1 ${
              timer > 0 ? 'bg-blue-600 border-blue-400 text-white' : 'bg-slate-900/80 border-slate-700 text-slate-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            {timer > 0 ? `${timer}s` : 'Off'}
          </button>
        </div>
      </div>

      {/* Main Camera Preview Area */}
      <div
        className="relative flex-1 w-full h-full bg-slate-950 flex items-center justify-center cursor-crosshair overflow-hidden"
        onClick={handleTapToFocus}
      >
        {/* Permission Error State */}
        {cameraPermissionError ? (
          <div className="max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-100">Camera Access Unavailable</h3>
              <p className="text-xs text-slate-400 mt-1">{cameraPermissionError}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={startCameraStream}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl transition"
              >
                TRY AGAIN
              </button>
              <label className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-blue-400" /> UPLOAD FROM DEVICE
                <input type="file" onChange={handleFileUpload} accept="image/*,video/*,audio/*,.pdf" className="hidden" />
              </label>
            </div>
          </div>
        ) : mode === 'AUDIO' ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center border ${
              isRecording ? 'bg-red-500/20 border-red-500 animate-pulse' : 'bg-slate-900 border-slate-700'
            }`}>
              <Mic className={`w-10 h-10 ${isRecording ? 'text-red-400' : 'text-blue-400'}`} />
            </div>
            <p className="text-sm font-medium text-slate-300">
              {isRecording ? 'Recording Audio Evidence...' : 'Tap Shutter to Record Audio Evidence'}
            </p>
          </div>
        ) : (
          <video
            ref={videoRef}
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: `scale(${zoom})` }}
          />
        )}

        {/* Grid Overlay */}
        {grid && !cameraPermissionError && mode !== 'AUDIO' && (
          <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-white/10">
            <div className="border-r border-b border-white/10" />
            <div className="border-r border-b border-white/10" />
            <div className="border-b border-white/10" />
            <div className="border-r border-b border-white/10" />
            <div className="border-r border-b border-white/10" />
            <div className="border-b border-white/10" />
            <div className="border-r border-white/10" />
            <div className="border-r border-white/10" />
            <div />
          </div>
        )}

        {/* Level Indicator (Center crosshair) */}
        {!cameraPermissionError && mode !== 'AUDIO' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            </div>
          </div>
        )}

        {/* Tap to Focus Box Indicator */}
        {focusPoint && (
          <div
            className="absolute w-14 h-14 border-2 border-amber-400 rounded-md pointer-events-none animate-ping"
            style={{ left: focusPoint.x - 28, top: focusPoint.y - 28 }}
          />
        )}

        {/* Countdown Overlay */}
        {timerCountdown !== null && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <span className="text-8xl font-extrabold text-white animate-bounce">{timerCountdown}</span>
          </div>
        )}

        {/* Document Scanner Live Frame Box */}
        {(mode === 'DOCUMENT' || mode === 'ID_CARD') && !cameraPermissionError && (
          <div className="absolute inset-8 md:inset-20 border-2 border-emerald-400/80 rounded-xl pointer-events-none shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-950/90 text-emerald-400 text-[10px] font-mono rounded border border-emerald-800">
              ALIGN {mode === 'ID_CARD' ? 'ID CARD' : 'DOCUMENT'} IN FRAME
            </div>
            <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400/80 animate-scan" />
          </div>
        )}
      </div>

      {/* Camera Controls Footer Workspace */}
      <div className="relative z-40 bg-gradient-to-t from-black via-black/90 to-transparent p-4 flex flex-col items-center gap-4">
        {/* Preset Zoom Control Bar */}
        {!cameraPermissionError && mode !== 'AUDIO' && (
          <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800">
            {[1, 2, 3, 5].map(z => (
              <button
                key={z}
                onClick={() => setZoom(z)}
                className={`w-7 h-7 rounded-full text-xs font-mono font-semibold transition ${
                  zoom === z ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {z}×
              </button>
            ))}
          </div>
        )}

        {/* Mode Selector Swiper Bar */}
        <div className="w-full max-w-xl overflow-x-auto no-scrollbar flex items-center justify-center gap-4 text-xs font-semibold py-1">
          {[
            { id: 'PHOTO', label: 'PHOTO', icon: Camera },
            { id: 'VIDEO', label: 'VIDEO', icon: Video },
            { id: 'DOCUMENT', label: 'DOCUMENT', icon: FileText },
            { id: 'ID_CARD', label: 'ID CARD', icon: CreditCard },
            { id: 'MULTI_SHOT', label: 'MULTI-SHOT', icon: Layers },
            { id: 'PANORAMA', label: 'PANORAMA', icon: Compass },
            { id: 'AUDIO', label: 'AUDIO', icon: Mic }
          ].map(item => {
            const Icon = item.icon;
            const isActive = mode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setMode(item.id as CameraMode)}
                className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 whitespace-nowrap transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Primary Shutter Row */}
        <div className="w-full max-w-md flex items-center justify-between px-6 pt-1">
          {/* Gallery / Import Button */}
          <label className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition cursor-pointer" title="Import from Gallery">
            <Upload className="w-5 h-5" />
            <input type="file" onChange={handleFileUpload} accept="image/*,video/*,audio/*,.pdf" className="hidden" />
          </label>

          {/* Ergonomic Main Shutter Button */}
          <button
            onClick={handleShutter}
            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition active:scale-95 shadow-2xl ${
              isRecording
                ? 'border-red-500 bg-red-600/30'
                : 'border-white bg-slate-900/80 hover:bg-slate-800'
            }`}
          >
            <div
              className={`transition-all ${
                isRecording
                  ? 'w-7 h-7 bg-red-500 rounded-sm'
                  : mode === 'VIDEO'
                  ? 'w-14 h-14 bg-red-600 rounded-full'
                  : 'w-14 h-14 bg-white rounded-full'
              }`}
            />
          </button>

          {/* Flip Camera Button */}
          <button
            onClick={toggleCameraFlip}
            className="p-3.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition"
            title="Flip Camera"
          >
            <RotateCw className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
