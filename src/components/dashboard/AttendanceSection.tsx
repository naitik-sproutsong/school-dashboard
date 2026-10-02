import { useState } from 'react';
import { 
  ATTENDANCE_WEEKLY, 
  ATTENDANCE_MONTHLY,
  ATTENDANCE_3MONTHS,
  ATTENDANCE_6MONTHS,
  ATTENDANCE_1YEAR
} from '../../data/schoolData';
import { ChevronDown } from 'lucide-react';

// Map 70–100 data values to SVG coordinates (viewBox 0 0 600 200, chart area: y=25..165)
function valToY(v: number, min = 70, max = 100, top = 25, bottom = 165): number {
  const clamped = Math.max(min, Math.min(max, v));
  return bottom - ((clamped - min) / (max - min)) * (bottom - top);
}

// Generate smooth cubic bezier SVG path
function buildSpline(xCoords: number[], values: number[]): string {
  if (values.length === 0) return '';
  const pts = values.map((v, i) => [xCoords[i], valToY(v)] as [number, number]);
  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const cpx1 = px + (cx - px) / 2;
    const cpx2 = cx - (cx - px) / 2;
    d += ` C ${cpx1} ${py}, ${cpx2} ${cy}, ${cx} ${cy}`;
  }
  return d;
}

function buildAreaSpline(xCoords: number[], values: number[]): string {
  const line = buildSpline(xCoords, values);
  const lastX = xCoords[values.length - 1];
  const firstX = xCoords[0];
  return `${line} L ${lastX} 175 L ${firstX} 175 Z`;
}

export default function AttendanceSection() {
  const [mode, setMode] = useState<string>('1 Month');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  let data: any;
  switch (mode) {
    case '1 Week': data = ATTENDANCE_WEEKLY; break;
    case '1 Month': data = ATTENDANCE_MONTHLY; break;
    case '3 Months': data = ATTENDANCE_3MONTHS; break;
    case '6 Months': data = ATTENDANCE_6MONTHS; break;
    case '1 Year': data = ATTENDANCE_1YEAR; break;
    default: data = ATTENDANCE_MONTHLY;
  }

  const labels: string[] = data.days || data.months;
  const studentVals: number[] = data.students;
  const staffVals: number[] = data.staff;

  // Dynamically calculate X coordinates based on labels length
  const startX = 65;
  const endX = 555;
  const chartX = labels.map((_, i) => {
    if (labels.length <= 1) return startX;
    return startX + (i * (endX - startX) / (labels.length - 1));
  });

  const yTicks = [100, 86, 78, 70];

  const studentAvg = (studentVals.reduce((a, b) => a + b, 0) / studentVals.length).toFixed(1);
  const staffAvg = (staffVals.reduce((a, b) => a + b, 0) / staffVals.length).toFixed(1);

  return (
    <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight mb-1.5">Attendance</h2>
          
          <div className="relative inline-flex items-center">
            <select 
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-lg pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer transition-colors"
            >
              <option value="1 Week">1 Week</option>
              <option value="1 Month">1 Month</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="1 Year">1 Year</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
            <span className="font-semibold text-slate-500">Staff <span className="text-slate-900 font-bold ml-1">{staffAvg}%</span></span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
            <span className="font-semibold text-slate-500">Students <span className="text-slate-900 font-bold ml-1">{studentAvg}%</span></span>
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full h-56 sm:h-64 select-none">
        <svg
          viewBox="0 0 580 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Amber gradient for staff */}
            <linearGradient id="amberAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="85%" stopColor="#F59E0B" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </linearGradient>

            {/* Blue gradient for students */}
            <linearGradient id="blueAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.22" />
              <stop offset="85%" stopColor="#3B82F6" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines & Y labels */}
          {yTicks.map((val) => {
            const y = valToY(val);
            return (
              <g key={val}>
                <line
                  x1="50"
                  y1={y}
                  x2="565"
                  y2={y}
                  stroke="#F1F5F9"
                  strokeWidth="1.2"
                />
                <text
                  x="42"
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fontWeight="600"
                  fill="#94A3B8"
                  fontFamily="Nunito Sans, sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area fills */}
          <path
            d={buildAreaSpline(chartX, staffVals)}
            fill="url(#amberAreaGrad)"
          />
          <path
            d={buildAreaSpline(chartX, studentVals)}
            fill="url(#blueAreaGrad)"
          />

          {/* Smooth Line strokes */}
          <path
            d={buildSpline(chartX, staffVals)}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={buildSpline(chartX, studentVals)}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* X Axis Labels */}
          {labels.map((lbl, i) => (
            <text
              key={lbl + i}
              x={chartX[i]}
              y="192"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="600"
              fill="#94A3B8"
              fontFamily="Nunito Sans, sans-serif"
            >
              {lbl}
            </text>
          ))}

          {/* Interactive hover points & indicators */}
          {labels.map((_, i) => {
            const x = chartX[i];
            const yStaff = valToY(staffVals[i]);
            const yStudent = valToY(studentVals[i]);
            const isHovered = hoverIndex === i;

            return (
              <g key={i} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
                {/* Invisible hover trigger column */}
                <rect
                  x={x - (chartX[1] - chartX[0]) / 2}
                  y="15"
                  width={chartX[1] - chartX[0]}
                  height="165"
                  fill="transparent"
                  className="cursor-pointer"
                />

                {isHovered && (
                  <line
                    x1={x}
                    y1="25"
                    x2={x}
                    y2="175"
                    stroke="#CBD5E1"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                )}

                {/* Staff point */}
                <circle
                  cx={x}
                  cy={yStaff}
                  r={isHovered ? 6 : 4}
                  fill="#F59E0B"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />

                {/* Student point */}
                <circle
                  cx={x}
                  cy={yStudent}
                  r={isHovered ? 6 : 4}
                  fill="#3B82F6"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip Card */}
        {hoverIndex !== null && (
          <div
            className="absolute bg-slate-900/90 text-white px-3 py-2 rounded-xl text-xs shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mb-3 z-30 border border-slate-700 font-sans"
            style={{
              left: `${(chartX[hoverIndex] / 580) * 100}%`,
              top: `${(Math.min(valToY(staffVals[hoverIndex]), valToY(studentVals[hoverIndex])) / 200) * 100}%`,
            }}
          >
            <div className="font-bold text-slate-300 pb-1 border-b border-slate-700/60 mb-1">
              {labels[hoverIndex]}
            </div>
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-amber-400 font-medium">Staff:</span>
              <span className="font-bold">{staffVals[hoverIndex]}%</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-[11px]">
              <span className="text-blue-400 font-medium">Students:</span>
              <span className="font-bold">{studentVals[hoverIndex]}%</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
