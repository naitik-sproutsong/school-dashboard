import { useState } from 'react';
import { CLASS_GRADES, type GradeItem } from '../../data/schoolData';
import { X, Users, Award, BookOpen } from 'lucide-react';

export default function ClassesSection() {
  const [selectedGrade, setSelectedGrade] = useState<GradeItem | null>(null);

  // Maximum value for bar scaling (100%)
  const maxScore = 100;

  return (
    <>
      <section className="bg-white rounded-[22px] p-6 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-sans tracking-tight">
              Class average grades
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Term 1 assessment scores across grades · Click bar for sections</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            Grades I – X
          </span>
        </div>

        {/* Bar Chart matching Reference 2 */}
        <div className="h-48 sm:h-52 flex items-end justify-between gap-2 sm:gap-4 px-2 pt-4 pb-2 border-b border-slate-100">
          {CLASS_GRADES.map((item) => {
            const heightPct = (item.avgGrade / maxScore) * 100;

            return (
              <div
                key={item.id}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onClick={() => setSelectedGrade(item)}
                title={`${item.grade}: ${item.avgGrade}% avg (Click for details)`}
              >
                {/* Score hover tooltip above bar */}
                <span className="text-[11px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity mb-1 font-sans">
                  {item.avgGrade}%
                </span>

                {/* Capsule bar */}
                <div className="w-full max-w-[28px] bg-slate-100 rounded-full h-full flex flex-col justify-end overflow-hidden p-0.5">
                  <div
                    className="w-full rounded-full transition-all duration-500 ease-out group-hover:brightness-110 group-hover:scale-y-[1.02] transform origin-bottom"
                    style={{
                      height: `${heightPct}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>

                {/* Roman Numeral Label */}
                <span className="mt-3 text-xs sm:text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors font-sans">
                  {item.roman}
                </span>
              </div>
            );
          })}
        </div>

        {/* Quick summary below */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Overall School Average: <strong className="text-slate-800 font-bold">80.6%</strong></span>
          <span className="text-[11px] text-slate-400">Tap any grade bar to view section roster &amp; teachers</span>
        </div>
      </section>

      {/* Grade Details Modal */}
      {selectedGrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/40 transition-opacity"
            onClick={() => setSelectedGrade(null)}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-100 z-10 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-sm"
                  style={{ backgroundColor: selectedGrade.color }}
                >
                  {selectedGrade.roman}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{selectedGrade.grade} Overview</h3>
                  <span className="text-xs text-slate-500">Term 1 Performance &amp; Roster</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedGrade(null)}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4 space-y-4">
              {/* Stat tiles */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Average Score</span>
                    <span className="block text-base font-extrabold text-slate-800">{selectedGrade.avgGrade}%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total Students</span>
                    <span className="block text-base font-extrabold text-slate-800">{selectedGrade.students}</span>
                  </div>
                </div>
              </div>

              {/* Sections & Teachers Table */}
              {selectedGrade.detailedSections && (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-3 py-2 font-bold text-slate-600">Section</th>
                        <th className="px-3 py-2 font-bold text-slate-600">Class Teacher</th>
                        <th className="px-3 py-2 font-bold text-slate-600 text-right">Pupils</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {selectedGrade.detailedSections.map((sec, i) => (
                        <tr key={i} className="hover:bg-slate-50/50">
                          <td className="px-3 py-2.5 font-semibold text-slate-800">
                            <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: selectedGrade.color }} />
                            {sec.section}
                          </td>
                          <td className="px-3 py-2.5 text-slate-600 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            {sec.classTeacher}
                          </td>
                          <td className="px-3 py-2.5 font-medium text-slate-600 text-right">
                            {sec.pupils}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedGrade(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
