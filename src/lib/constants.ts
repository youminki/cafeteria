import { Seat, TableInfo } from './types';

// Re-export types for backward compatibility during migration
export type { Seat, SeatStatus, TableInfo } from './types';

export const TABLES_CONFIG: TableInfo[] = [
  // Column 1 (x=0): 4인석 4개, 8인석 1개 (Bottom)
  { id: 'T4-1', type: 4, x: 0, y: 0 },
  { id: 'T4-2', type: 4, x: 0, y: 1 },
  { id: 'T4-3', type: 4, x: 0, y: 2 },
  { id: 'T4-4', type: 4, x: 0, y: 3 },
  { id: 'T8-1', type: 8, x: 0, y: 4 },

  // Column 2 (x=1): 기둥 2개, 2인석 2개, 8인석 1개 (Bottom)
  { id: 'P1', type: 0, x: 1, y: 0, isPillar: true },
  { id: 'T2-1', type: 2, x: 1, y: 1 },
  { id: 'T2-2', type: 2, x: 1, y: 2 },
  { id: 'P2', type: 0, x: 1, y: 3, isPillar: true },
  { id: 'T8-5', type: 8, x: 1, y: 4 },

  // Column 3 (x=2): 8인석 3개 (Bottom 정렬)
  { id: 'T8-2', type: 8, x: 2, y: 2 },
  { id: 'T8-3', type: 8, x: 2, y: 3 },
  { id: 'T8-4', type: 8, x: 2, y: 4 },

  // Column 4 (x=3): 4인석 3개
  { id: 'T4-5', type: 4, x: 3, y: 1 },
  { id: 'T4-6', type: 4, x: 3, y: 2 },
  { id: 'T4-7', type: 4, x: 3, y: 3 },
];

function generateSeats(): Seat[] {
  let counter = 1;
  return TABLES_CONFIG.flatMap(table => {
    if (table.isPillar) return [];

    const seats: Seat[] = [];
    const seatCount = table.type;
    const cols = table.type === 2 ? 1 : 2;
    const rows = seatCount / cols;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        seats.push({ id: `S${counter++}`, tableId: table.id, status: 'available', row: r, col: c });
      }
    }
    return seats;
  });
}

export const INITIAL_SEATS: Seat[] = generateSeats();
