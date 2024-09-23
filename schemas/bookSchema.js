import Joi from 'joi';

export const bookSchema = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  author: Joi.string().required(),
  imageUrl: Joi.string().uri().required(),
  totalPages: Joi.number().integer().min(1).required(),
  recommend: Joi.boolean().required()
});

export const resultsSchema = Joi.array().items(bookSchema);

export const mainSchema = Joi.object({
  results: resultsSchema.required(),
  totalPages: Joi.number().integer().min(1).required(),
  page: Joi.number().integer().min(1).required(),
  perPage: Joi.number().integer().min(1).required()
});










