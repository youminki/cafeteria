import { Users, CheckCircle2 } from 'lucide-react';

interface StatsBarProps {
  totalSeats: number;
  occupiedSeats: number;
  reservedSeats: number;
  availableSeats: number;
}

export function StatsBar({ totalSeats, occupiedSeats, reservedSeats, availableSeats }: StatsBarProps) {
  return (
    <div className="bg-white border border-slate-200 p-2 flex flex-wrap items-center justify-between gap-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4 px-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-100 shrink-0">
          <Users size={14} className="text-slate-400 shrink-0" />
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">전체 {totalSeats}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 text-white shrink-0">
          <div className="w-2 h-2 bg-white animate-pulse shrink-0" />
          <span className="text-xs font-bold whitespace-nowrap">이용 중 {occupiedSeats}</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 border border-amber-100 shrink-0">
          <div className="w-2 h-2 bg-amber-400 shrink-0" />
          <span className="text-xs font-bold text-amber-700 whitespace-nowrap">예약 중 {reservedSeats}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 shadow-lg shadow-emerald-100 shrink-0">
        <CheckCircle2 size={16} className="shrink-0" />
        <span className="text-sm font-black whitespace-nowrap">이용 가능 {availableSeats}석</span>
      </div>
    </div>
  );
}
