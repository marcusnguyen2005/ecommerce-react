import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../../apis";
import { Product } from "../../types";
import DataTable, { Column } from "../../components/DataTable";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    product: Product | null;
  }>({ isOpen: false, product: null });
  const navigate = useNavigate();
  const { toasts, showSuccess, showError, removeToast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showError("Lỗi khi tải danh sách sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (product: Product) => {
    setDeleteDialog({ isOpen: true, product });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.product) return;

    try {
      // Vì chỉ dùng mock API, không thể xóa thật
      showError("Chức năng xóa chỉ hoạt động với API thật. Đây là mock API nên không thể xóa.");
      setDeleteDialog({ isOpen: false, product: null });
    } catch (error) {
      showError("Lỗi khi xóa sản phẩm!");
    }
  };

  const handleEdit = (product: Product) => {
    navigate(`/admin/edit/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const columns: Column<Product>[] = [
    {
      header: "Hình ảnh",
      accessor: (row: Product) => (
        <img
          src={row.image}
          alt={row.title}
          className="w-16 h-16 object-cover rounded"
        />
      ),
      width: "100px",
    },
    {
      header: "Tên sản phẩm",
      accessor: "title",
      sortable: true,
    },
    {
      header: "Giá",
      accessor: (row: Product) => (
        <span className="font-semibold text-gray-900">
          {formatPrice(row.price)}
        </span>
      ),
      sortable: true,
    },
    {
      header: "Danh mục",
      accessor: (row: Product) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {row.category || "Chưa phân loại"}
        </span>
      ),
    },
    {
      header: "Đánh giá",
      accessor: (row: Product) => (
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500">⭐</span>
          <span className="font-medium">
            {row.rating?.rate || row.rating_rate || 0}
          </span>
          <span className="text-gray-500 text-sm">
            ({row.rating?.count || row.rating_count || 0})
          </span>
        </div>
      ),
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-gray-600 mt-1">Danh sách tất cả sản phẩm trong hệ thống</p>
        </div>
        <button
          onClick={() => navigate("/admin/edit/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      <DataTable
        data={products}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        itemsPerPage={10}
        searchable={true}
        searchPlaceholder="Tìm kiếm sản phẩm..."
      />

      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Xác nhận xóa"
        message={`Bạn có chắc muốn xóa sản phẩm "${deleteDialog.product?.title}" không?`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ isOpen: false, product: null })}
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};

export default ProductList;
