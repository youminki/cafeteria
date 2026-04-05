import { LogOut } from 'lucide-react';
import { TABLES_CONFIG, Seat } from '../lib/constants';
import { TableInfo } from '../lib/types';
import { SeatButton } from './SeatButton';

interface SeatMapProps {
  seats: Seat[];
  onSeatClick: (seat: Seat) => void;
}

const TABLE_SIZE_CLASS: Record<number, string> = {
  2: 'w-4 h-8 sm:w-10 sm:h-16',
  4: 'w-10 h-10 sm:w-24 sm:h-24',
  8: 'w-10 h-20 sm:w-24 sm:h-48',
};

function Pillar() {
  return (
    <div className="w-8 h-8 sm:w-20 sm:h-20 bg-slate-200 border border-slate-300 flex items-center justify-center relative group">
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-1 py-0.5 bg-slate-400 text-[6px] sm:text-[8px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity">PILLAR</div>
      <div className="w-2 h-2 sm:w-8 sm:h-8 border border-slate-300 opacity-30" />
    </div>
  );
}

function TableBlock({ table, seats, onSeatClick }: { table: TableInfo; seats: Seat[]; onSeatClick: (seat: Seat) => void }) {
  const tableSeats = seats.filter(s => s.tableId === table.id);
  const gridCols = table.type === 2 ? 'grid-cols-1' : 'grid-cols-2';

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative p-1 sm:p-4 bg-white border border-slate-100 shadow-sm flex items-center justify-center group hover:border-slate-900 transition-all hover:shadow-md">
        <div className={`absolute z-0 bg-slate-50 border border-slate-100 ${TABLE_SIZE_CLASS[table.type] ?? 'w-10 h-10 sm:w-24 sm:h-24'}`} />
        <div className={`relative z-10 grid gap-1 sm:gap-3 ${gridCols}`}>
          {tableSeats.map(seat => (
            <SeatButton key={seat.id} seat={seat} onClick={onSeatClick} />
          ))}
        </div>
      </div>
      <span className="text-[7px] sm:text-[10px] font-bold text-slate-400">{table.type}인</span>
    </div>
  );
}

export function SeatMap({ seats, onSeatClick }: SeatMapProps) {
  return (
    <div className="bg-white border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-slate-900" />
          <h2 className="text-lg font-bold text-slate-800 tracking-tighter uppercase">좌석 선택</h2>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-white border border-slate-200" /> 가능</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-amber-400" /> 예약</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-slate-900" /> 이용</div>
        </div>
      </div>

      <div className="p-1 sm:p-8 bg-slate-50/30 overflow-x-auto sm:overflow-x-visible scrollbar-hide">
        <div className="min-w-full sm:min-w-[900px] flex flex-col gap-4 sm:gap-8">
          {/* Column Headers */}
          <div className="flex gap-1 sm:gap-6 justify-center">
            {[0, 1, 2, 3].map(colIdx => (
              <div key={colIdx} className="w-[24%] sm:w-[180px] text-center">
                <span className="text-[8px] sm:text-[11px] font-black text-slate-300 uppercase tracking-widest">{colIdx + 1}열</span>
              </div>
            ))}
          </div>

          {/* Seat Grid */}
          <div className="flex gap-1 sm:gap-6 justify-center items-stretch min-h-[450px] sm:min-h-[700px]">
            {[0, 1, 2, 3].map(colIdx => {
              const colTables = TABLES_CONFIG.filter(t => t.x === colIdx).sort((a, b) => a.y - b.y);
              const topTables = colTables.filter(t => t.y < 4);
              const bottomTable = colTables.find(t => t.y === 4);

              return (
                <div key={colIdx} className="w-[24%] sm:w-[180px] flex flex-col gap-3 sm:gap-6">
                  <div className="flex flex-col gap-3 sm:gap-6">
                    {topTables.map(table => (
                      <div key={table.id} className="flex flex-col items-center">
                        {table.isPillar ? (
                          <Pillar />
                        ) : (
                          <TableBlock table={table} seats={seats} onSeatClick={onSeatClick} />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex-grow" />

                  {bottomTable && (
                    <TableBlock table={bottomTable} seats={seats} onSeatClick={onSeatClick} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-3 border-t border-slate-100 flex justify-center">
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
          <LogOut size={12} className="rotate-180" />
          Entrance
        </div>
      </div>
    </div>
  );
}
