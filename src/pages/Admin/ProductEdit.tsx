import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../../apis";
import { Product } from "../../types";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../components/Toast";

interface ProductFormData {
  title: string;
  price: string | number;
  originalPrice?: string | number;
  discount?: string | number;
  onSale?: boolean;
  image: string;
  rating_rate: string | number;
  rating_count: string | number;
  description: string;
  category: string;
  categories?: string[];
}

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const [product, setProduct] = useState<ProductFormData>({
    title: "",
    price: "",
    originalPrice: "",
    discount: "",
    onSale: false,
    image: "",
    rating_rate: "",
    rating_count: "",
    description: "",
    category: "",
    categories: [],
  });

  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const data = await mockApi.getById(id);
          setProduct({
            title: data.title || "",
            price: data.price || "",
            originalPrice: data.originalPrice || "",
            discount: data.discount || "",
            onSale: data.onSale || false,
            image: data.image || "",
            rating_rate: data.rating?.rate || data.rating_rate || "",
            rating_count: data.rating?.count || data.rating_count || "",
            description: data.description || "",
            category: data.category || "",
            categories: data.categories || [],
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          showError("Lỗi khi tải thông tin sản phẩm!");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [id, isNew]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setProduct({ ...product, [name]: checked });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSave = async (exitAfterSave: boolean = false) => {
    try {
      setSaving(true);

      // Validate
      if (!product.title || !product.price) {
        showError("Vui lòng điền đầy đủ thông tin bắt buộc!");
        setSaving(false);
        return;
      }

      // Vì chỉ dùng mock API, không thể lưu thật
      if (isNew) {
        showSuccess("Sản phẩm đã được thêm thành công! (Mock API - không lưu thật)");
      } else {
        showSuccess("Sản phẩm đã được cập nhật thành công! (Mock API - không lưu thật)");
      }

      if (exitAfterSave) {
        setTimeout(() => {
          navigate("/admin/products");
        }, 1000);
      }
    } catch (error) {
      showError("Lỗi khi lưu sản phẩm!");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
        </h1>
        <p className="text-gray-600 mt-1">
          {isNew
            ? "Điền thông tin để thêm sản phẩm mới vào hệ thống"
            : "Cập nhật thông tin sản phẩm"}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave(false);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tên sản phẩm */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên sản phẩm <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={product.title || ""}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            {/* Giá */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Giá <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={product.price ?? ""}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            {/* Danh mục */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Danh mục
              </label>
              <input
                type="text"
                name="category"
                value={product.category || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập danh mục"
              />
            </div>

            {/* Hình ảnh */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL Hình ảnh
              </label>
              <input
                type="text"
                name="image"
                value={product.image || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              {product.image && (
                <div className="mt-2">
                  <img
                    src={product.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded border border-gray-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>

            {/* Mô tả */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mô tả sản phẩm"
              />
            </div>

            {/* Đánh giá */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đánh giá (0-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating_rate"
                value={product.rating_rate || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            {/* Số lượt đánh giá */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượt đánh giá
              </label>
              <input
                type="number"
                name="rating_count"
                value={product.rating_count || ""}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>

            {/* Giảm giá */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="onSale"
                    checked={product.onSale || false}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Đang giảm giá</span>
                </label>
              </div>
            </div>

            {product.onSale && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Giá gốc
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={product.originalPrice || ""}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phần trăm giảm (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={product.discount || ""}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Đang lưu..." : "Lưu và Thoát"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default ProductEdit;
