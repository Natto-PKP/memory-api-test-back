export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Board {
  id: number;
  userId: number;
  dateStart: Date;
  dateEnd: Date;
}

export interface Card {
  id: number;
  boardId: number;
  value: string;
  posX: number;
  posY: number;
}

export interface Try {
  boardId: number;
  cardId: number;
  date: Date;
}
