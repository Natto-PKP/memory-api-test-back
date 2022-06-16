import joi from 'joi';

export default {
  userPost: joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }).length(2).required(),
};
