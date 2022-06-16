import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { Request, Response } from 'express';

import dataMapper from '../dataMappers/users';
import APIError from '../errors/APIError';

export default {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await dataMapper.getUserByEmail(email);

    if (!result) throw new APIError('email or password invalid', 400);
    if (!(await bcrypt.compare(password, <string>result.password))) throw new APIError('email or password invalid', 400);

    const token = jwt.sign({ ms: Date.now(), id: result.id }, <string>process.env.JWT_SECRET);
    res.status(201).json({ id: result.id, token });
  },

  register: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!(await dataMapper.getUserByEmail(email))) throw new APIError('email is already taken', 400);

    const result = await dataMapper.insertUser(email, await bcrypt.hash(password, 10));
    delete result.password;

    res.status(201).json(result);
  },
};
