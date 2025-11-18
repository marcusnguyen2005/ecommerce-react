import { slugApi } from "../apis";
import { Slug } from "../types";

/**
 * Resolve a URL path (prefix/slug) to model and entity_id
 */
export const resolveSlug = async (
  prefix: string,
  slug: string
): Promise<{ model: Slug["model"]; entityId: number | string } | null> => {
  const slugData = await slugApi.findByPrefixAndSlug(prefix, slug);
  if (!slugData) {
    return null;
  }
  return {
    model: slugData.model,
    entityId: slugData.entity_id,
  };
};

/**
 * Generate URL from model and entity_id
 */
export const generateUrl = async (
  model: Slug["model"],
  entityId: number | string
): Promise<string | null> => {
  const slugData = await slugApi.findByModelAndEntityId(model, entityId);
  if (!slugData) {
    return null;
  }
  return `/${slugData.prefix}/${slugData.slug}`;
};

/**
 * Get slug for a model and entity_id (synchronous version using cached data)
 */
export const getSlugSync = (
  slugs: Slug[],
  model: Slug["model"],
  entityId: number | string
): Slug | null => {
  return (
    slugs.find(
      (s) => s.model === model && String(s.entity_id) === String(entityId)
    ) || null
  );
};

/**
 * Generate URL from slug data (synchronous)
 */
export const getUrlFromSlug = (slug: Slug): string => {
  return `/${slug.prefix}/${slug.slug}`;
};

