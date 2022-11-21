import Joi from "joi";

const productsSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
  slug: Joi.string().required(),
  permalink: Joi.string().required(),
  date_created: Joi.string().isoDate().required(),
  date_created_gmt: Joi.string().isoDate().required(),
  date_modified: Joi.string().isoDate().required(),
  date_modified_gmt: Joi.string().isoDate().required(),
  type: Joi.string().required(),
  status: Joi.string().required(),
  featured: Joi.boolean().required(),
  catalog_visibility: Joi.string().required(),
  description: Joi.string().allow("").required(),
  short_description: Joi.string().allow("").required(),
  sku: Joi.string().allow("").required(),
  price: Joi.string().allow("").required(),
  regular_price: Joi.string().allow("").required(),
  sale_price: Joi.string().allow("").required(),
  date_on_sale_from: Joi.string().allow(null).isoDate().required(),
  date_on_sale_from_gmt: Joi.string().allow(null).isoDate().required(),
  date_on_sale_to: Joi.string().allow(null).isoDate().required(),
  date_on_sale_to_gmt: Joi.string().allow(null).isoDate().required(),
  price_html: Joi.string().allow("").required(),
  on_sale: Joi.boolean().required(),
  purchasable: Joi.boolean().required(),
  total_sales: Joi.number().required(),
  virtual: Joi.boolean().required(),
  downloadable: Joi.boolean().required(),
  downloads: Joi.array().items(Joi.object({})),
  download_limit: Joi.number().required(),
  download_expiry: Joi.number().required(),
  external_url: Joi.string().allow("").required(),
  button_text: Joi.string().allow("").required(),
  tax_status: Joi.string().allow("").required(),
  tax_class: Joi.string().allow("").required(),
  manage_stock: Joi.boolean().required(),
  stock_quantity: Joi.number().allow(null).required(),
  stock_status: Joi.string().allow("").required(),
  backorders: Joi.string().allow("").required(),
  backorders_allowed: Joi.boolean().required(),
  backordered: Joi.boolean().required(),
  sold_individually: Joi.boolean().required(),
  weight: Joi.string().allow("").required(),
  dimensions: Joi.object({
    length: Joi.string().allow("").required(),
    width: Joi.string().allow("").required(),
    height: Joi.string().allow("").required(),
  }),
  shipping_required: Joi.boolean().required(),
  shipping_taxable: Joi.boolean().required(),
  shipping_class: Joi.string().allow("").required(),
  shipping_class_id: Joi.number().required(),
  reviews_allowed: Joi.boolean().required(),
  average_rating: Joi.string().allow("").required(),
  rating_count: Joi.number().required(),
  related_ids: Joi.array().items(Joi.number()),
  upsell_ids: Joi.array().items(Joi.number()),
  cross_sell_ids: Joi.array().items(Joi.number()),
  parent_id: Joi.number().required(),
  purchase_note: Joi.string().allow("").required(),
  categories: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        slug: Joi.string().required(),
      })
    )
    .allow(null)
    .required(),
  tags: Joi.array().items(Joi.number()),
  images: Joi.array()
    .items(
      Joi.object({
        id: Joi.number().required(),
        date_created: Joi.string().isoDate().required(),
        date_created_gmt: Joi.string().isoDate().required(),
        date_modified: Joi.string().isoDate().required(),
        date_modified_gmt: Joi.string().isoDate().required(),
        src: Joi.string().required(),
        name: Joi.string().allow("").required(),
        alt: Joi.string().allow("").required(),
      })
    )
    .allow(null)
    .required(),
  low_stock_amount: Joi.number().allow(null).required(),
  attributes: Joi.array().items(),
  default_attributes: Joi.array().items(),
  variations: Joi.array().items(),
  grouped_products: Joi.array().items(),
  has_options: Joi.boolean().required(),
  menu_order: Joi.number().required(),
  meta_data: Joi.array().items(),

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

export default productsSchema;
