import { Utensils, Map as MapIcon, LayoutDashboard, LogOut, User } from 'lucide-react';

interface HeaderProps {
  nickname: string;
  picture?: string;
  view: 'map' | 'dashboard';
  setView: (view: 'map' | 'dashboard') => void;
  onLogout: () => void;
}

export function Header({ nickname, picture, view, setView, onLogout }: HeaderProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4 sm:h-20 sm:gap-0">
          {/* Logo Section */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200 group-hover:rotate-12 transition-transform">
              <Utensils className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-900 tracking-tighter uppercase">cafeteria</h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Smart Dining System</p>
            </div>
          </div>
          
          {/* View Toggles */}
          <div className="flex bg-slate-100 p-1 w-full sm:w-auto">
            <button 
              onClick={() => setView('map')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold transition-all ${
                view === 'map' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <MapIcon size={18} />
              배치도
            </button>
            <button 
              onClick={() => setView('dashboard')}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold transition-all ${
                view === 'dashboard' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <LayoutDashboard size={18} />
              현황판
            </button>
          </div>

          {/* User Info Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 max-w-[150px] sm:max-w-[200px]">
              {picture ? (
                <img src={picture} alt="" className="w-5 h-5 rounded-full shrink-0" referrerPolicy="no-referrer" />
              ) : (
                <User size={16} className="text-slate-400 shrink-0" />
              )}
              <span className="text-sm font-bold text-slate-700 truncate">{nickname}</span>
            </div>
            <button 
              onClick={onLogout}
              className="p-2.5 bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all"
              title="로그아웃"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
