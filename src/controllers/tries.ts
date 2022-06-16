import type { Request, Response } from 'express';

import dataMapperBoards from '../dataMappers/boards';
import dataMapperCards from '../dataMappers/cards';
import dataMapperTries from '../dataMappers/tries';
import APIError from '../errors/APIError';

export default {
  try: async (req: Request, res: Response) => {
    const boardId = Number(req.params.boardId);
    const userId = Number(req.params.userId);
    const cardId = Number(req.params.tryId);

    const board = await dataMapperBoards.getBoard(userId, boardId);
    if (board.dateEnd) return res.status(409).json({ code: 409, message: 'Board is already finished' }); // 403 ?

    const current = await dataMapperCards.getCard(userId, boardId, cardId);
    if (!current) throw new APIError('card not found', 404);

    const latest = await dataMapperTries.getLatestCard(userId, boardId);

    await dataMapperTries.insertTry(boardId, cardId);
    if (latest.value === current.value) {
      const cards = await dataMapperTries.getTriesWithCards(userId, boardId);
      const results = [];
      for (let i = 0; i < cards.length; i += 2) {
        const [a, b] = [cards[i], cards[i + 1]];
        if (a && b && a.value === b.value) results.push(a.value);
      }

      if (results.length === (board.size * board.size) / 2) {
        return res.status(200).json({ code: 200, card: current, end: true });
      } return res.status(200).json({ code: 200, card: current, end: false });
    } return res.status(200).json({ code: 200, card: current, end: false });
  },
};
