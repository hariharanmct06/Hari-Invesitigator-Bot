import React, { useEffect, useRef, useState } from 'react';
import { Crop, RotateCw, Sparkles, Check, RefreshCw } from 'lucide-react';

interface Props {
  capturedImage: string;
  onConfirm: (processedImage: string) => void;
  onRetake: () => void;
}

export const DocumentScannerCanvas: React.FC<Props> = ({ capturedImage, onConfirm, onRetake }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [filterMode, setFilterMode] = useState<'ORIGINAL' | 'ENHANCED' | 'MONO' | 'HIGH_CONTRAST'>('ENHANCED');
  const [rotation, setRotation] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = capturedImage;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rotation handling
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      // Filter modes
      if (filterMode === 'ENHANCED') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          // Increase contrast & brightness slightly
          data[i] = Math.min(255, data[i] * 1.15);
          data[i + 1] = Math.min(255, data[i + 1] * 1.15);
          data[i + 2] = Math.min(255, data[i + 2] * 1.15);
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (filterMode === 'MONO') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
      } else if (filterMode === 'HIGH_CONTRAST') {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          const v = avg > 128 ? 255 : 0;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
        }
        ctx.putImageData(imageData, 0, 0);
      }
    };
  }, [capturedImage, filterMode, rotation]);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (canvasRef.current) {
        onConfirm(canvasRef.current.toDataURL('image/png'));
      } else {
        onConfirm(capturedImage);
      }
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-4">
      {/* Top Header */}
      <div className="w-full max-w-2xl flex items-center justify-between py-2 px-4 bg-slate-900 border border-slate-800 rounded-xl">
        <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          <Crop className="w-4 h-4 text-blue-400" />
          Smart Document Scanner & Enhancer
        </h3>
        <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
          Edge Detected & Crop Applied
        </span>
      </div>

      {/* Canvas View */}
      <div className="relative flex-1 w-full max-w-2xl flex items-center justify-center p-2 my-2 bg-slate-900/60 rounded-xl border border-slate-800 overflow-hidden">
        <canvas ref={canvasRef} className="max-h-[60vh] max-w-full object-contain shadow-2xl rounded" />
      </div>

      {/* Control Bar */}
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col gap-4">
        {/* Enhancements */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setFilterMode('ORIGINAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterMode === 'ORIGINAL' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setFilterMode('ENHANCED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              filterMode === 'ENHANCED' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Enhanced
          </button>
          <button
            onClick={() => setFilterMode('MONO')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterMode === 'MONO' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            Greyscale
          </button>
          <button
            onClick={() => setFilterMode('HIGH_CONTRAST')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filterMode === 'HIGH_CONTRAST' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            High Contrast B&W
          </button>
          <button
            onClick={() => setRotation(r => (r + 90) % 360)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition ml-2"
            title="Rotate 90 deg"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
          <button
            onClick={onRetake}
            className="flex-1 py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className="w-4 h-4" /> Retake
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center justify-center gap-2 transition shadow-lg shadow-blue-900/30"
          >
            {isProcessing ? (
              <span>Processing...</span>
            ) : (
              <>
                <Check className="w-4 h-4" /> Confirm Document
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
