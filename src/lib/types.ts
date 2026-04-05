export type SeatStatus = 'available' | 'reserved' | 'occupied';

export interface Seat {
  id: string;
  tableId: string;
  status: SeatStatus;
  row: number;
  col: number;
  userNickname?: string;
}

export interface TableInfo {
  id: string;
  type: 0 | 2 | 4 | 8; // 0 for Pillar
  x: number; // Column index
  y: number; // Row index
  isPillar?: boolean;
}

export interface UserInfo {
  nickname: string;
  email?: string;
  picture?: string;
  provider: 'local' | 'google';
}
