import { Slug } from "../../types/slug";
import slugsData from "../../data/slugs.json";

export const slugApi = {
  /**
   * Get all slugs
   */
  getAll: async (): Promise<Slug[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return slugsData as Slug[];
  },

  /**
   * Find slug by prefix and slug
   * Normalizes prefix to handle both "sanpham"/"san-pham" and "danhmuc"/"danh-muc"
   */
  findByPrefixAndSlug: async (
    prefix: string,
    slug: string
  ): Promise<Slug | null> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // Normalize prefix: "sanpham" -> "san-pham", "danhmuc" -> "danh-muc"
    const normalizedPrefix = prefix
      .replace(/^sanpham$/i, "san-pham")
      .replace(/^danhmuc$/i, "danh-muc");
    
    const found = (slugsData as Slug[]).find(
      (s) => {
        const slugPrefix = s.prefix.toLowerCase();
        const searchPrefix = normalizedPrefix.toLowerCase();
        return slugPrefix === searchPrefix && s.slug === slug;
      }
    );
    return found || null;
  },

  /**
   * Find slug by model and entity_id
   */
  findByModelAndEntityId: async (
    model: Slug["model"],
    entityId: number | string
  ): Promise<Slug | null> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const found = (slugsData as Slug[]).find(
      (s) => s.model === model && String(s.entity_id) === String(entityId)
    );
    return found || null;
  },

  /**
   * Get all slugs by model
   */
  getByModel: async (model: Slug["model"]): Promise<Slug[]> => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return (slugsData as Slug[]).filter((s) => s.model === model);
  },
};

