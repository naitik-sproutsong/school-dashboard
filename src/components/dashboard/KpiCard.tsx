import type { ReactNode } from 'react';

interface Props {
  label: string;
  cornerColor?: string; // e.g. '#E8F4FD', '#EAF7EE', '#FEF6E9', '#E7F8F7'
  children: ReactNode;
}

export default function KpiCard({ label, cornerColor = '#F1F5F9', children }: Props) {
  return (
    <div className="relative bg-white rounded-[22px] p-5.5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col justify-between min-h-[148px]">
      {/* Decorative corner bubble per reference screenshot */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none transition-transform group-hover:scale-110"
        style={{ backgroundColor: cornerColor }}
        aria-hidden="true"
      />

      {/* Label */}
      <div className="relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block font-sans">
          {label}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 mt-3 flex-1 flex flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

// Helper SVG Ring Chart for attendance cards
interface RingProps {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  hoverDetail?: ReactNode;
}

export function ProgressRing({ percentage, color, size = 76, strokeWidth = 7.5, hoverDetail }: RingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F1F5F9"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress bar */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {/* Centered label */}
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hoverDetail ? 'group-hover:opacity-0' : ''}`}>
        <span className="text-lg font-extrabold text-slate-800 font-sans">
          {percentage}%
        </span>
      </div>
      
      {hoverDetail && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full flex-col">
          {hoverDetail}
        </div>
      )}
    </div>
  );
}
