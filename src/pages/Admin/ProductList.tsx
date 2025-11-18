import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../apis";
import { Product } from "../../types";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const data = await mockApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Lỗi khi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number | string) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này không?")) {
      // Vì chỉ dùng mock API, không thể xóa thật, chỉ hiển thị thông báo
      alert("Chức năng xóa chỉ hoạt động với API thật. Đây là mock API nên không thể xóa.");
      // Nếu muốn xóa local state (chỉ để demo):
      // setProducts(products.filter(p => p.id !== id));
    }
  };

  if (loading) {
    return <div style={{ padding: "20px" }}>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="container">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="table-actions">
          <button
            className="btn green"
            onClick={() => navigate("/admin/edit/new")}
          >
            ➕ Thêm mới
          </button>
        </div>

        <div>
          <h2>Quản lý sản phẩm (Admin)</h2>

          <table className="product-table">
            <thead>
              <tr>
                <th>Hình ảnh</th>
                <th>Tên</th>
                <th>Giá</th>
                <th>Đánh giá</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td style={{ width: "100px" }}>
                    <img src={p.image} alt={p.title} className="thumb" />
                  </td>
                  <td style={{ width: "500px" }}>{p.title}</td>
                  <td>${p.price}</td>
                  <td>
                    ⭐ {p.rating?.rate || p.rating_rate || 0} (
                    {p.rating?.count || p.rating_count || 0})
                  </td>
                  <td style={{ width: "150px" }}>
                    <button
                      className="btn yellow"
                      onClick={() => navigate(`/admin/edit/${p.id}`)}
                    >
                      Sửa
                    </button>
                    <button
                      className="btn red"
                      onClick={() => handleDelete(p.id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;

