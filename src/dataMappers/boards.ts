import database from '../database';

import type { Board } from '../typings';

export default {
  deleteBoard: async (userId: number, boardId: number) => {
    await database.query('DELETE FROM "board_view" WHERE "id" = $1 AND "userId" = $2', [boardId, userId]);
  },

  getBoard: async (userId: number, boardId: number): Promise<Board> => {
    const result = await database.query('SELECT * FROM "board_view" WHERE userId = $1 AND boardId = $2', [userId, boardId]);
    return result.rows[0];
  },

  insertBoard: async (userId: number): Promise<Board> => {
    const result = await database.query('INSERT INTO "board_view" ("userId") VALUE ($1) RETURNING *', [userId]);
    return result.rows[0];
  },

  updateBoard: async (userId: number, boardId: number, data: { dateEnd: Date }): Promise<Board> => {
    const sets = Object.keys(data).map((key, i) => `${key} = $${i + 2}`);
    const values = Object.values(data);

    const result = await database.query(`UPDATE "board_view" SET ${sets.join(', ')} RETURNING *;`, [userId, boardId, ...values]);
    return result.rows[0];
  },
};
