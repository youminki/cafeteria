import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Armchair, AlertCircle } from 'lucide-react';
import { Seat, SeatStatus } from '../lib/types';

interface SeatModalProps {
  selectedSeat: Seat | null;
  onClose: () => void;
  onAction: (seatId: string, action: SeatStatus) => void;
}

export function SeatModal({ selectedSeat, onClose, onAction }: SeatModalProps) {
  return (
    <AnimatePresence>
      {selectedSeat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={onClose} 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.9, y: 20 }} 
            className="relative w-full max-w-sm bg-white shadow-2xl overflow-hidden" 
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 tracking-tighter">{selectedSeat.id.replace('S', '')}번 좌석</h3>
                  <p className="text-slate-500 text-xs">좌석 상세 정보 및 예약</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 transition-colors">
                  <LogOut size={20} className="text-slate-400 rotate-90" />
                </button>
              </div>

              <div className="space-y-6">
                <div className={`p-6 border-2 flex flex-col items-center gap-4 transition-all ${
                  selectedSeat.status === 'available' ? 'border-slate-100 bg-slate-50' : 
                  selectedSeat.status === 'reserved' ? 'border-amber-100 bg-amber-50' : 
                  'border-slate-900 bg-slate-900 text-white'
                }`}>
                  <div className={`w-16 h-16 flex items-center justify-center ${
                    selectedSeat.status === 'available' ? 'bg-white text-slate-300 border border-slate-200' : 
                    selectedSeat.status === 'reserved' ? 'bg-amber-400 text-white' : 
                    'bg-white text-slate-900'
                  }`}>
                    <Armchair size={32} />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold ${selectedSeat.status === 'occupied' ? 'text-white' : 'text-slate-800'}`}>
                      {selectedSeat.status === 'available' ? '예약 가능' : 
                       selectedSeat.status === 'reserved' ? '예약 중' : '이용 중'}
                    </p>
                    <p className={`text-xs mt-1 ${selectedSeat.status === 'occupied' ? 'text-slate-400' : 'text-slate-500'}`}>
                      {selectedSeat.status === 'available' 
                        ? `${selectedSeat.id.replace('S', '')}번 좌석은 현재 비어있습니다.`
                        : `${selectedSeat.userNickname || '사용자'}님이 이용 중인 좌석입니다.`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {selectedSeat.status === 'available' ? (
                    <>
                      <button 
                        onClick={() => onAction(selectedSeat.id, 'occupied')}
                        className="w-full py-4 bg-slate-900 text-white font-bold shadow-lg shadow-slate-200 transition-all active:scale-95"
                      >
                        즉시 이용하기
                      </button>
                      <button 
                        onClick={() => onAction(selectedSeat.id, 'reserved')}
                        className="w-full py-4 bg-white border-2 border-amber-100 text-amber-600 font-bold hover:bg-amber-50 transition-all"
                      >
                        예약하기 (10분 유지)
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => onAction(selectedSeat.id, 'available')}
                      className="w-full py-4 bg-white border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                    >
                      퇴실 / 예약 취소
                    </button>
                  )}
                </div>

                <div className="bg-blue-50 p-4 flex gap-3 border border-blue-100">
                  <AlertCircle className="text-blue-500 shrink-0" size={20} />
                  <p className="text-[10px] text-blue-700 leading-relaxed">
                    좌석을 선택하시면 즉시 상태가 반영됩니다. 타인을 위해 식사 후에는 반드시 퇴실 처리를 해주세요.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
