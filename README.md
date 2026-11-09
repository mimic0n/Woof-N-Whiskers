# Woof N’ Whiskers

Navigation chính dùng chung Aceternity Floating Dock trên tất cả route. Component TypeScript nằm trong `src/components/ui/floating-dock.tsx`; adapter route/VI–EN là `src/components/floating-dock-demo.tsx`. Xem [FLOATING-DOCK.md](FLOATING-DOCK.md) để biết toàn bộ khác biệt so với source, reduced motion và light/dark mode. Chạy `npm run typecheck` để kiểm tra component mới.

Trang chủ hiện khôi phục theo `Demo/stitch_petshop_design_system (2)/code-animated.html`: hero ảnh nền trượt ngang, câu chuyện sản phẩm, thẻ Flash Sale và floating dock. Các trang còn lại dùng thiết kế Stitch đã áp dụng. CSS trang chủ được giới hạn phạm vi; chạy `node scripts/build-demo-home-css.cjs` khi thay đổi utility class hoặc asset CSS nguồn.

Prototype ReactJS + Vite + React Router, theo `Instruction/codex-woofnwhiskers.md`. Giao diện áp dụng template Stitch project `17480892489591456143`, dùng CSS tùy chỉnh và Be Vietnam Pro tự lưu trữ.

## Chạy

```bash
npm install
npm run dev
```

Mở URL Vite in ra (mặc định http://localhost:8000). Nếu cổng đã được dùng, Vite chọn cổng kế tiếp.

```bash
npm run lint
npm run build
npm run preview -- --host 0.0.0.0 --port 8001
```

Hosting SPA cần rewrite các URL ứng dụng về `index.html`. Trang không tồn tại được xử lý bằng route `*`. Không mở qua `file://`.

## Kiểm thử

```bash
npx playwright install chromium
npm run test:e2e
```

Bộ kiểm thử mặc định dùng bản preview ở http://localhost:8001. Có thể đổi máy chủ và dùng trình duyệt đã cài:

```bash
WNW_TEST_URL=http://localhost:8001 WNW_BROWSER_PATH=/opt/microsoft/msedge/msedge npm run test:e2e
```

Kiểm thử bao gồm route VI/EN, mobile 320px, tài khoản, hồ sơ, lưu trú hai đêm, báo giá grooming, phục hồi bản nháp, lỗi lưu trữ, bốn cách thanh toán, tìm kiếm, bộ lọc, giỏ hàng và hoàn tác.

## Cấu trúc

- `src/App.jsx`: providers và routes, chia bundle theo trang.
- `src/components/site/`: layout, header/footer, modal/drawer, trường form, lịch, tìm kiếm, thẻ dùng chung, SEO.
- `src/context/AppContext.jsx`: trạng thái ứng dụng, giỏ hàng và toast.
- `src/i18n/`: từ điển VI/EN và hook dịch, định dạng tiền/ngày.
- `src/data/data.js`: thông tin doanh nghiệp, ba dịch vụ, 19 sản phẩm demo, FAQ, bài mẫu và chính sách.
- `src/features/`: trường hồ sơ thú cưng và phép tính giỏ hàng.
- `src/pages/`: trang chủ, giới thiệu, dịch vụ, đặt lịch, tài khoản, thú cưng, cửa hàng, sản phẩm, giỏ hàng, thanh toán, tìm kiếm, FAQ, chính sách, liên hệ, blog, 404.
- `src/styles/tokens.css`, `src/styles/site.css`, `src/styles/stitch.css`: palette, typography, responsive và trạng thái tương tác.
- `public/assets/`: ảnh WebP, SVG và nguồn/giấy phép ảnh của bản demo; `images/real/` chờ ảnh thật.
- `tests/website.spec.js`: kiểm thử trình duyệt các luồng chính.

Các component/CSS từ lần chuyển demo ban đầu vẫn được giữ để tham khảo; entry hiện tại dùng hệ thống `site/` và `site.css`.

## Dữ liệu và giới hạn

Dữ liệu dùng chung lưu ở `localStorage.wnw_state_v1`, ngôn ngữ ở `wnw_lang`, bản nháp đặt lịch ở `wnw_booking_draft_<userId|guest>`. Xóa dữ liệu website trong trình duyệt để khởi tạo lại demo. Tài khoản, hồ sơ, lịch và đơn của người đã đăng nhập được liên kết bằng ID. Mật khẩu demo chỉ lưu dạng băm có salt; đây không phải hệ thống xác thực cho vận hành thật.

- Không có backend, email thật, xác nhận từ nhân viên, thanh toán hay giao hàng thật. Form gọi lại chỉ lưu yêu cầu demo trong trình duyệt.
- Giờ hoạt động là giờ demo; chính sách, giá và tồn kho minh họa cần shop xác nhận.
- Be Vietnam Pro được lưu trong `public/assets/fonts/`, hỗ trợ tiếng Việt và không cần gọi Google Fonts khi chạy.
- Khi chuyển sang WordPress, liên kết hồ sơ thú cưng ↔ lịch hẹn BookingPress cần kiểm tra/cấu hình hoặc tích hợp riêng; WooCommerce và cổng thanh toán cần triển khai riêng.
- Nhật ký lưu trú và đặt nhiều thú cưng là tính năng tùy chọn, hiện tắt qua cờ trong `data.js`.


## Stitch design adaptation (2026-11-08)

The current React website applies the page layouts and actual brown/cream/blue theme from Stitch project `17480892489591456143`. Reference exports and the page-to-route mapping are in [design/stitch/README.md](design/stitch/README.md). Duplicate templates are archived; canonical Woof N’ Whiskers 2.x designs supply the corresponding routes and UI states.

The homepage includes the split pet hero, service/date quick booking, category rail, featured products and service cards. Account, pets, booking, catalog/empty search, product detail, cart/checkout/confirmation, FAQ, policy and contact screens use the shared source design. 66 source images and Be Vietnam Pro fonts are served locally. Existing bilingual demo behavior remains connected to React state and localStorage.

Run `npm run build`, `npm run lint` and `npm run test:e2e`. If the default Playwright browser is unavailable, set `WNW_BROWSER_PATH` to an installed compatible Chromium executable. `tests/stitch.spec.js` checks quick booking handoff, captures the main template families at 1440/390px and verifies local image loading. Screenshots go to the ignored `.impeccable/review/` directory. Existing E2E groups also check 320/390/768/1024/1440px and 200% text.
