import { motion } from 'motion/react';
import { Seat } from '../lib/types';
import { getSeatColor } from '../lib/utils';

interface SeatButtonProps {
  seat: Seat;
  onClick: (seat: Seat) => void;
}

export function SeatButton({ seat, onClick }: SeatButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => onClick(seat)}
      className={`w-5 h-5 sm:w-10 sm:h-10 border flex items-center justify-center transition-all ${getSeatColor(seat.status)}`}
    >
      <span className="text-[6px] sm:text-[10px] font-bold opacity-60">{seat.id.replace('S', '')}</span>
    </motion.button>
  );
}
