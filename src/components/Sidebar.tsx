import { User, Info } from 'lucide-react';
import { Seat } from '../lib/types';

interface SidebarProps {
  seats: Seat[];
}

export function Sidebar({ seats }: SidebarProps) {
  return (
    <div className="space-y-6">
      {/* Menu Card */}
      <div className="bg-slate-900 p-8 text-white shadow-xl shadow-slate-200">
        <h3 className="text-xl font-bold mb-2 uppercase tracking-tighter">오늘의 메뉴</h3>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-6">2026년 4월 5일 일요일</p>
        <div className="space-y-4">
          <div className="bg-white/5 backdrop-blur-sm p-4 border border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Main</p>
            <p className="font-bold text-sm">수제 돈까스 & 스프</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 border border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase mb-1 tracking-widest">Side</p>
            <p className="font-bold text-sm">신선한 그린 샐러드</p>
          </div>
        </div>
        <button className="w-full mt-8 py-3 bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
          식단표 전체보기
        </button>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-8 border border-slate-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter">최근 예약 현황</h3>
        <div className="space-y-4">
          {seats.filter(s => s.status !== 'available').slice(0, 5).map(s => (
            <div key={s.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 gap-2">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 bg-slate-200 flex items-center justify-center text-slate-500 shrink-0">
                  <User size={20} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">
                    {s.userNickname || `사용자 ${s.id.replace('S', '')}`}
                  </p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider whitespace-nowrap">
                    {s.id.replace('S', '')}번 좌석 • {s.status === 'occupied' ? '이용 중' : '예약 중'}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest shrink-0 ${s.status === 'occupied' ? 'bg-slate-900 text-white' : 'bg-amber-100 text-amber-700'}`}>
                {s.status === 'occupied' ? '이용' : '예약'}
              </span>
            </div>
          ))}
          {seats.filter(s => s.status !== 'available').length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <Info className="mx-auto mb-2 opacity-20" size={48} />
              <p className="text-xs font-bold uppercase tracking-widest">현재 이용 중인 좌석이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
