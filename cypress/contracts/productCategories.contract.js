import Joi from "joi";

const productCategoriesSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  slug: Joi.string().required(),
  parent: Joi.number().required(),
  description: Joi.string().allow("").required(),
  display: Joi.string().required(),
  image: Joi.object({
    id: Joi.number().required(),
    date_created: Joi.string().isoDate().required(),
    date_created_gmt: Joi.string().isoDate().required(),
    date_modified: Joi.string().isoDate().required(),
    date_modified_gmt: Joi.string().isoDate().required(),
    src: Joi.string().required(),
    name: Joi.string().allow("").required(),
    alt: Joi.string().allow("").required(),
  }).required(),
  menu_order: Joi.number().required(),
  count: Joi.number().required(),
  _links: Joi.object({
    self: Joi.array().items(
      Joi.object({
        href: Joi.string().required(),
      })
    ),
    collection: Joi.array().items(
      Joi.object({
        href: Joi.string().required(),
      })
    ),
  }),
});

export default productCategoriesSchema;
