import database from '../database';

import type { Card } from '../typings';

export default {
  getCard: async (userId: number, boardId: number, cardId: number): Promise<Card> => {
    const result = await database.query(`
      SELECT *
      FROM "card_view"
      WHERE 
        "id" = $1 
        AND 
        "card_view"."boardId" = (
          SELECT "id" 
          FROM "board_view"
          WHERE "id" = $2 AND "userId" = $3
        );
    `, [cardId, boardId, userId]);

    return result.rows[0];
  },

  getCards: async (userId: number, boardId: number): Promise<Card[]> => {
    const result = await database.query(`
      SELECT *
      FROM "card_view"
      WHERE "boardId" = (
        SELECT "id" 
        FROM "board_view"
        WHERE "id" = $1 AND "userId" = $2
      );
    `, [boardId, userId]);

    return result.rows;
  },

  insertMultipleCards: async (
    boardId: number,
    cards: { x: number, y: number, value: string }[],
  ): Promise<Card[]> => {
    const values = cards.map(({ x, y, value }) => `(${boardId}, '${value}', ${x}, ${y})`);
    const result = await database.query(`INSERT INTO "card_view" ("boardId", "value", "posX", "posY") VALUES ${values.join(', ')} RETURNING *;`);
    return result.rows;
  },
};
