import database from '../database';

import type { User } from '../typings';

export default {
  deleteUser: async (userId: number) => {
    await database.query('DELETE FROM "user" WHERE "id" = $1', [userId]);
  },

  insertUser: async (email: string, password: string): Promise<User> => {
    const result = await database.query('INSERT INTO "user" ("email", "password") VALUES ($1, $2) RETURNING *', [email, password]);
    return result.rows[0];
  },

  getUser: async (userId: number): Promise<User> => {
    const result = await database.query('SELECT * FROM "user" WHERE "id" = $1', [userId]);
    return result.rows[0];
  },

  getUserByEmail: async (email: string): Promise<User> => {
    const result = await database.query('SELECT * FROM "user" WHERE "email" = $1', [email]);
    return result.rows[0];
  },
};
