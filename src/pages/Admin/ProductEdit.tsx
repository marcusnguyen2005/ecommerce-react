import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockApi } from "../../apis";
import { Product } from "../../types";

interface ProductFormData {
  title: string;
  price: string | number;
  image: string;
  rating_rate: string | number;
  rating_count: string | number;
  description: string;
  category: string;
}

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductFormData>({
    title: "",
    price: "",
    image: "",
    rating_rate: "",
    rating_count: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(!isNew);

  useEffect(() => {
    if (!isNew && id) {
      const fetchProduct = async () => {
        try {
          const data = await mockApi.getById(id);
          setProduct({
            title: data.title || "",
            price: data.price || "",
            image: data.image || "",
            rating_rate: data.rating_rate || "",
            rating_count: data.rating_count || "",
            description: data.description || "",
            category: data.category || "",
          });
        } catch (error) {
          console.error("Error fetching product:", error);
          alert("Lỗi khi tải thông tin sản phẩm!");
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vì chỉ dùng mock API, không thể lưu thật, chỉ hiển thị thông báo
    if (isNew) {
      alert("Chức năng thêm mới chỉ hoạt động với API thật. Đây là mock API nên không thể lưu.");
    } else {
      alert("Chức năng cập nhật chỉ hoạt động với API thật. Đây là mock API nên không thể lưu.");
    }
    
    // navigate("/admin/products");
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <h2>{isNew ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="form">
            <label>
              Tên sản phẩm:
              <input
                type="text"
                name="title"
                value={product.title || ""}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Giá:
              <input
                type="number"
                name="price"
                value={product.price ?? ""}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Hình ảnh (URL):
              <input
                type="text"
                name="image"
                value={product.image || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Mô tả:
              <textarea
                name="description"
                value={product.description || ""}
                onChange={handleChange}
                rows={4}
              />
            </label>

            <label>
              Danh mục:
              <input
                type="text"
                name="category"
                value={product.category || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Đánh giá (0–5):
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                name="rating_rate"
                value={product.rating_rate || ""}
                onChange={handleChange}
              />
            </label>

            <label>
              Số lượt đánh giá:
              <input
                type="number"
                name="rating_count"
                value={product.rating_count || ""}
                onChange={handleChange}
              />
            </label>

            <div className="actions">
              <button
                type="button"
                className="btn gray"
                onClick={() => navigate("/admin/products")}
              >
                Hủy
              </button>
              <button type="submit" className="btn blue">
                {isNew ? "Thêm" : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEdit;

