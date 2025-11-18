export type SlugModel = "product" | "category";

export interface Slug {
  slug: string;
  prefix: string;
  model: SlugModel;
  entity_id: number | string;
}

