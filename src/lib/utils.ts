import { Seat, SeatStatus } from './types';

export function getSeatColor(status: SeatStatus): string {
  switch (status) {
    case 'occupied': return 'bg-slate-900 text-white border-slate-800 shadow-inner';
    case 'reserved': return 'bg-amber-400 text-white border-amber-500 shadow-inner';
    default: return 'bg-white text-slate-400 border-slate-200 hover:border-slate-900 hover:bg-slate-50';
  }
}

export function computeStats(seats: Seat[]) {
  let occupiedSeats = 0;
  let reservedSeats = 0;
  let availableSeats = 0;

  for (const s of seats) {
    switch (s.status) {
      case 'occupied': occupiedSeats++; break;
      case 'reserved': reservedSeats++; break;
      default: availableSeats++; break;
    }
  }

  return { totalSeats: seats.length, occupiedSeats, reservedSeats, availableSeats };
}
