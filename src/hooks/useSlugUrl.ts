import { useState, useEffect } from "react";
import { slugApi } from "../apis";
import { Slug } from "../types";
import { toSlug } from "../utils/slug";

/**
 * Hook to get slug URL for a model and entity_id
 * Returns URL in format: /san-pham/{slug} or /danh-muc/{slug}
 */
export const useSlugUrl = (
  model: Slug["model"],
  entityId: number | string,
  fallbackTitle?: string // Optional: title to generate slug if not found in database
): string | null => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const slug = await slugApi.findByModelAndEntityId(model, entityId);
      if (slug) {
        // Use slug from database
        setUrl(`/${slug.prefix}/${slug.slug}`);
      } else if (fallbackTitle && model === "product") {
        // Generate slug from title as fallback
        const generatedSlug = toSlug(fallbackTitle);
        setUrl(`/san-pham/${generatedSlug}`);
      } else if (fallbackTitle && model === "category") {
        // Generate slug from category name as fallback
        const generatedSlug = toSlug(fallbackTitle);
        setUrl(`/danh-muc/${generatedSlug}`);
      }
    };
    load();
  }, [model, entityId, fallbackTitle]);

  return url;
};

/**
 * Hook to get all slugs (for batch URL generation)
 */
export const useSlugs = (): Slug[] => {
  const [slugs, setSlugs] = useState<Slug[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await slugApi.getAll();
      setSlugs(data);
    };
    load();
  }, []);

  return slugs;
};

