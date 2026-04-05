import { useState, useMemo, useEffect } from "react";
import { INITIAL_SEATS } from "./lib/constants";
import { Seat, SeatStatus, UserInfo } from "./lib/types";
import { computeStats } from "./lib/utils";
import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { StatsBar } from "./components/StatsBar";
import { SeatMap } from "./components/SeatMap";
import { SeatModal } from "./components/SeatModal";
import { Sidebar } from "./components/Sidebar";

const STORAGE_KEY = "cafeteria_user";

function loadUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function App() {
  const [user, setUser] = useState<UserInfo | null>(loadUser);
  const [seats, setSeats] = useState<Seat[]>(INITIAL_SEATS);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
  const [view, setView] = useState<"map" | "dashboard">("map");

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const stats = useMemo(() => computeStats(seats), [seats]);

  const handleSeatAction = (seatId: string, action: SeatStatus) => {
    setSeats((prev) =>
      prev.map((s) =>
        s.id === seatId
          ? {
              ...s,
              status: action,
              userNickname:
                action === "available"
                  ? undefined
                  : (user?.nickname ?? undefined),
            }
          : s,
      ),
    );
    setSelectedSeat(null);
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header
        nickname={user.nickname}
        picture={user.picture}
        view={view}
        setView={setView}
        onLogout={() => setUser(null)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <StatsBar
          totalSeats={stats.totalSeats}
          occupiedSeats={stats.occupiedSeats}
          reservedSeats={stats.reservedSeats}
          availableSeats={stats.availableSeats}
        />

        {view === "map" ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <SeatMap seats={seats} onSeatClick={setSelectedSeat} />
            </div>
            <div className="lg:col-span-1">
              <Sidebar seats={seats} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Sidebar seats={seats} />
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white p-8 border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter">
                  시스템 정보
                </h3>
                <div className="space-y-4 text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
                  <p>• 본 시스템은 실시간 좌석 현황을 제공합니다.</p>
                  <p>• 예약은 최대 10분간 유지됩니다.</p>
                  <p>• 식사 후에는 반드시 퇴실 처리를 해주세요.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <SeatModal
        selectedSeat={selectedSeat}
        onClose={() => setSelectedSeat(null)}
        onAction={handleSeatAction}
      />

      <footer className="max-w-7xl mx-auto p-12 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest border-t border-slate-100 mt-12">
        <p>&copy; 2026 CAFETERIA Smart Dining System. All rights reserved.</p>
      </footer>
    </div>
  );
}
