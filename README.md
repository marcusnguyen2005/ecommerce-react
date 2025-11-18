# HCE TH5 Giữa Kỳ - E-commerce Demo Application

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=flat-square&logo=github)](https://github.com/marcusnguyen2005/ecommerce-react)
[![Demo](https://img.shields.io/badge/Demo-Live-green?style=flat-square)](https://ecom.khaizinam.io.vn/)

Ứng dụng demo thương mại điện tử được xây dựng bằng React, TypeScript, và Tailwind CSS. Project này là bài thi giữa kỳ với các tính năng quản lý sản phẩm, danh mục, và hệ thống slug SEO-friendly.

**🌐 Live Demo**: [https://ecom.khaizinam.io.vn/](https://ecom.khaizinam.io.vn/)  
**📦 GitHub Repository**: [https://github.com/marcusnguyen2005/ecommerce-react](https://github.com/marcusnguyen2005/ecommerce-react)

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Yêu cầu hệ thống](#yêu-cầu-hệ-thống)
- [Cài đặt](#cài-đặt)
- [Cách chạy](#cách-chạy)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#công-nghệ-sử dụng)
- [Scripts](#scripts)
- [Tính năng chính](#tính-năng-chính)

## 🎯 Giới thiệu

Đây là một ứng dụng demo thương mại điện tử với các tính năng:

- **Trang chủ**: Banner slider, Flash Sale với countdown timer, danh sách sản phẩm nổi bật
- **Trang sản phẩm**: Danh sách sản phẩm với sidebar danh mục, tìm kiếm và lọc
- **Chi tiết sản phẩm**: Hiển thị thông tin chi tiết, hình ảnh, giá, đánh giá, sản phẩm liên quan
- **Trang danh mục**: Lọc sản phẩm theo danh mục với URL SEO-friendly
- **Trang Thời trang**: Trang giới thiệu các sản phẩm thời trang
- **Trang Về chúng tôi**: Giới thiệu công ty, đồng sáng lập, form liên hệ
- **Admin Panel**: Quản lý sản phẩm và danh mục với DataTable, CRUD operations
- **Hệ thống Slug**: URL SEO-friendly cho sản phẩm và danh mục (ví dụ: `/san-pham/ao-dai-viet-nam`)

## 💻 Yêu cầu hệ thống

### Node.js
- **Phiên bản**: Node.js >= 14.0.0
- **Khuyến nghị**: Node.js >= 16.0.0 hoặc 18.x LTS
- Kiểm tra phiên bản: `node --version`

### Yarn
- **Phiên bản**: Yarn >= 1.22.0
- **Khuyến nghị**: Yarn >= 1.22.0 hoặc Yarn Berry (v2+)
- Kiểm tra phiên bản: `yarn --version`
- Cài đặt Yarn (nếu chưa có):
  ```bash
  npm install -g yarn
  ```

### npm (tùy chọn)
- Nếu không dùng Yarn, có thể sử dụng npm >= 6.0.0

## 🚀 Cài đặt

1. **Clone repository**:
   ```bash
   git clone https://github.com/marcusnguyen2005/ecommerce-react.git
   cd ecommerce-react
   ```

2. **Cài đặt dependencies**:
   ```bash
   yarn install
   ```
   
   Hoặc nếu dùng npm:
   ```bash
   npm install
   ```

## ▶️ Cách chạy

### Development Mode

Chạy ứng dụng ở chế độ development với hot-reload:

```bash
yarn start
```

Hoặc:
```bash
npm start
```

Ứng dụng sẽ tự động mở tại [http://localhost:3000](http://localhost:3000)

### Production Build

Tạo build production:

```bash
yarn build
```

Hoặc:
```bash
npm run build
```

Build files sẽ được tạo trong thư mục `build/`

### Test

Chạy test suite:

```bash
yarn test
```

Hoặc:
```bash
npm test
```

## 📁 Cấu trúc thư mục

```
hce_th5_giuaky/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── ...
├── src/
│   ├── apis/              # API services
│   │   ├── mockapi/       # Mock API (JSON-based)
│   │   │   ├── products.ts
│   │   │   └── slugs.ts
│   │   └── index.ts
│   ├── assets/            # Static assets
│   │   ├── images/        # Hình ảnh
│   │   └── css/           # CSS files (legacy)
│   ├── components/        # React components
│   │   ├── AdminLayout/   # Layout cho admin pages
│   │   ├── BannerSlider/  # Banner slider component
│   │   ├── CategorySidebar/ # Sidebar danh mục
│   │   ├── Container/     # Container component (Bootstrap-like)
│   │   ├── CountdownTimer/ # Countdown timer
│   │   ├── DataTable/     # Reusable data table
│   │   ├── ErrorBoundary/ # Error boundary
│   │   ├── FlashSaleCard/ # Flash sale product card
│   │   ├── FlashSaleSection/ # Flash sale section
│   │   ├── Footer/        # Footer component
│   │   ├── Layout/        # Main layout
│   │   ├── ProductCard/   # Product card component
│   │   ├── ProductList/   # Product list component
│   │   ├── ProductSidebar/ # Featured products sidebar
│   │   ├── RatingStars/   # Rating stars component
│   │   └── Toast/         # Toast notifications
│   ├── containers/        # Container components (legacy)
│   ├── data/              # Mock data (JSON)
│   │   ├── products.json  # Product data
│   │   └── slugs.json     # Slug mappings
│   ├── hooks/             # Custom React hooks
│   │   └── useSlugUrl.ts  # Hook để generate slug URLs
│   ├── pages/             # Page components
│   │   ├── Admin/         # Admin pages
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductEdit.tsx
│   │   │   └── CategoryList.tsx
│   │   ├── Category/      # Category pages
│   │   │   └── CategoryDetail.tsx
│   │   ├── Error/         # Error pages
│   │   │   ├── NotFound.tsx
│   │   │   ├── ServerError.tsx
│   │   │   └── Forbidden.tsx
│   │   ├── Home/          # Home page
│   │   ├── Page1/         # Thời trang page
│   │   ├── Page2/         # Về chúng tôi page
│   │   └── Products/      # Product pages
│   │       ├── ListProducts.tsx
│   │       └── ProductDetail.tsx
│   ├── routes/            # Route configuration
│   │   └── routes.tsx     # Main routes
│   ├── styles/            # Global styles
│   │   ├── common.scss    # Common SCSS styles
│   │   ├── tailwind.css   # Tailwind CSS directives
│   │   └── modules/       # SCSS modules
│   ├── types/             # TypeScript type definitions
│   │   ├── product.ts
│   │   ├── slug.ts
│   │   ├── user.ts
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   ├── slug.ts        # Slug generation
│   │   ├── slugResolver.ts # Slug resolution
│   │   └── index.ts
│   ├── App.tsx            # Root component
│   └── index.tsx          # Entry point
├── .gitignore
├── package.json
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── README.md
```

## 🛠 Công nghệ sử dụng

### Core
- **React** 18.2.0 - UI library
- **TypeScript** 4.4.4 - Type safety
- **React Router DOM** 6.26.2 - Client-side routing

### Styling
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **SASS/SCSS** 1.94.1 - CSS preprocessor
- **PostCSS** 8.4.35 - CSS processing
- **Autoprefixer** 10.4.17 - CSS vendor prefixes

### UI Components & Libraries
- **Swiper** 12.0.3 - Touch slider/carousel

### Build Tools
- **React Scripts** 5.0.1 - Build tooling (Create React App)
- **TypeScript** - Type checking

### Development
- **@types/react** - TypeScript types for React
- **@types/react-dom** - TypeScript types for React DOM

## 📜 Scripts

### `yarn start` hoặc `npm start`
Chạy ứng dụng ở development mode. Mở [http://localhost:3000](http://localhost:3000) trong browser.

### `yarn build` hoặc `npm run build`
Tạo production build trong thư mục `build/`. Build được tối ưu hóa và sẵn sàng để deploy.

### `yarn test` hoặc `npm test`
Chạy test suite trong interactive watch mode.

### `yarn eject` hoặc `npm run eject`
**⚠️ Lưu ý**: Đây là hành động một chiều! Eject khỏi Create React App để có toàn quyền kiểm soát cấu hình.

## ✨ Tính năng chính

### 1. Hệ thống Slug SEO-friendly
- URL dạng `/san-pham/ao-dai-viet-nam` thay vì `/san-pham/1`
- URL dạng `/danh-muc/ao` thay vì `/danh-muc?name=Áo`
- Tự động generate slug từ title nếu không có trong database
- Resolve slug để tìm entity (product/category)

### 2. Flash Sale với Countdown Timer
- Hiển thị sản phẩm đang giảm giá
- Countdown timer với design đẹp mắt
- Swiper slider với navigation buttons
- Shimmer effect cho title

### 3. Product Management
- Danh sách sản phẩm với pagination
- Chi tiết sản phẩm với hình ảnh, giá, đánh giá
- Sản phẩm liên quan (cùng danh mục)
- Filter theo danh mục

### 4. Admin Panel
- DataTable với sorting, pagination, search
- CRUD operations cho sản phẩm
- Toast notifications
- Confirm dialogs
- Form validation

### 5. Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Container component với max-width 1080px, width 80%

### 6. Error Handling
- 404 Not Found page
- 500 Server Error page
- 403 Forbidden page
- React Error Boundary

## 📝 Ghi chú

- Project sử dụng **mock API** (JSON files) thay vì backend thật
- Dữ liệu được lưu trong `src/data/` (products.json, slugs.json)
- Không có authentication/authorization (demo only)
- Slug data được quản lý trong `src/data/slugs.json`

## 🤝 Đóng góp

Đây là project demo cho bài thi giữa kỳ. Nếu có câu hỏi hoặc đề xuất, vui lòng liên hệ.

## 📄 License

MIT License (hoặc theo yêu cầu của trường)

---

**Tác giả**: HCE TH5 - Giữa Kỳ  
**Năm**: 2025
