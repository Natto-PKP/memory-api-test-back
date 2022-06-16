import type { Request, Response } from 'express';

import dataMapperBoard from '../dataMappers/boards';
import dataMapperCard from '../dataMappers/cards';

const emojisArray = ['😀', '😈', '💩', '🤡', '👻', '👾', '💌', '💔', '💣', '🖕', '🧠', '🦴', '🦊', '🦝', '🦄', '🐸', '🐢', '🍉', '🍎', '🥥', '🍡', '🍨', '🍺', '🧊', '🚀', '🏓'];

export default {
  create: async (req: Request, res: Response) => {
    const size = Number(req.query.size);
    const emojiSize = (size * size) / 2;

    const selectedEmojis = <string[]>[];
    while (selectedEmojis.length < emojiSize) {
      const randomEmoji = emojisArray[Math.floor(Math.random() * emojisArray.length)];
      if (!selectedEmojis.includes(randomEmoji)) selectedEmojis.push(randomEmoji);
    }

    const emojis = [...selectedEmojis, ...selectedEmojis].sort(() => Math.random() - 0.5);

    const table = <{ value: string, x: number, y: number }[][]>[];
    for (let i = 0, y = 0; i < emojis.length; i += 1) {
      if (!table[y]) table.push([]);
      if (i && i % size === 0) { table.push([]); y += 1; }
      table[y].push({ value: emojis[i], x: i % size, y });
    }

    const board = await dataMapperBoard.insertBoard(Number(req.params.userId), size);
    const cards = await dataMapperCard.insertMultipleCards(board.id, table.flat());

    res.status(201).json({ ...board, cards: cards.map(({ id }) => id) });
  },
};
