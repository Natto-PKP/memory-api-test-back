import joi from 'joi';

export default {
  create: joi.object({
    size: joi.number()
      .integer()
      .positive()
      .multiple(2)
      .min(2)
      .max(10)
      .default(4),
  }).length(1),
};
