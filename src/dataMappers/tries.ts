import database from '../database';

import type { Card, Try } from '../typings';

export default {
  deleteTry: async (userId: number, boardId: number, cardId: number): Promise<Try> => {
    const result = await database.query(`
      DELETE FROM "try"
      WHERE 
        "cardId" = $3
        AND
        "boardId" = (
          SELECT "id"
          FROM "board_view"
          WHERE "id" = $2 AND "userId" = $1
        );
    `, [userId, boardId, cardId]);

    return result.rows[0];
  },

  getLatestCard: async (userId: number, boardId: number): Promise<Card> => {
    const result = await database.query(`
      SELECT *
      FROM "card_view"
      WHERE "id" = (
        SELECT "cardId"
        FROM "try_view"
        WHERE boardId = (
          SELECT "id"
          FROM "board_view"
          WHERE "id" = $2 AND "userId" = $1
        )
        ORDER BY date DESC
        LIMIT 1
      );
    `, [userId, boardId]);

    return result.rows[0];
  },

  getLatestTry: async (userId: number, boardId: number): Promise<Try> => {
    const result = await database.query(`
      SELECT *
      FROM "try_view"
      WHERE boardId = (
        SELECT "id"
        FROM "board_view"
        WHERE "id" = $2 AND "userId" = $1
      )
      ORDER BY date DESC
      LIMIT 1;
    `, [userId, boardId]);

    return result.rows[0];
  },

  getTry: async (userId: number, boardId: number, cardId: number): Promise<Try> => {
    const result = await database.query(`
      SELECT *
      FROM "try_view"
      WHERE 
        cardId = $3
        AND
        boardId = (
          SELECT "id"
          FROM "board_view"
          WHERE "id" = $2 AND "userId" = $1
        );
    `, [userId, boardId, cardId]);

    return result.rows[0];
  },

  getTries: async (userId: number, boardId: number): Promise<Try[]> => {
    const result = await database.query(`
      SELECT *
      FROM "try_view"
      WHERE boardId = (
        SELECT "id"
        FROM "board_view"
        WHERE "id" = $2 AND "userId" = $1
      )
      ORDER BY date DESC;
    `, [userId, boardId]);

    return result.rows;
  },

  getTriesWithCards: async (userId: number, boardId: number): Promise<Array<Try & Card>> => {
    const result = await database.query(`
      SELECT *
      FROM "try_view"
      JOIN "card_view" ON "try_view"."cardId" = "card_view"."id"
      WHERE boardId = (
        SELECT "id"
        FROM "board_view"
        WHERE "id" = $2 AND "userId" = $1
      )
      ORDER BY date DESC;
    `, [userId, boardId]);

    return result.rows;
  },

  insertTry: async (boardId: number, cardId: number): Promise<Try> => {
    const result = await database.query('INSERT INTO "try_view" ("boardId", "cardId") VALUES ($1, $2) RETURNING *', [boardId, cardId]);
    return result.rows[0];
  },
};
