# Triển khai Woof N’ Whiskers

Website React 19 + Vite + React Router, theo `Instruction/codex-woofnwhiskers.md`.

## Thiết kế Stitch áp dụng ngày 08/11/2026

Nguồn: Stitch project `17480892489591456143` — Petshop Design System. Đã tải 34 HTML hiển thị, hai tài liệu Markdown và thêm trang chủ 2.1 đang ẩn trên canvas để đối chiếu. Bản đồ template → route nằm trong [design/stitch/README.md](design/stitch/README.md).

Thiết kế trang thực tế dùng Be Vietnam Pro, nâu thương hiệu, nền kem/xám sáng, nút xanh và footer xanh slate. Đây là nguồn chuẩn thay cho palette cam trong metadata chung. Các bản PawHouse và Woof N’ Whiskers trùng trang được lưu như biến thể tham khảo; nhóm “chuẩn mục 2.x” cung cấp thiết kế cho các trang tương ứng.

Các phần đã áp dụng:

- Trang chủ: hero hai cột, ảnh có điều khiển chuyển, form đặt lịch nhanh, danh mục, sản phẩm, dịch vụ, quy trình, FAQ và CTA.
- Giới thiệu và ba trang dịch vụ: hero, bộ giá trị, hình không gian, các bước chăm sóc, giá, lưu ý và FAQ.
- Đặt lịch bốn bước: stepper, form, lịch, lựa chọn thú cưng, lỗi dưới trường, tóm tắt động bên cạnh và màn hình kết quả.
- Đăng nhập/đăng ký: bố cục giới thiệu và biểu mẫu hai cột; tài khoản và hồ sơ thú cưng dùng sidebar chung, danh sách, chi tiết và form.
- Cửa hàng: danh mục ngang, sidebar lọc, thẻ sản phẩm, tìm kiếm rỗng có gợi ý; 9 sản phẩm demo từ mẫu Stitch bổ sung vào 10 sản phẩm demo hiện có.
- Chi tiết sản phẩm: gallery, thumbnail, biến thể/số lượng, thông tin/giao hàng/đánh giá dạng tab, sản phẩm liên quan.
- Giỏ hàng, mini-cart, checkout và xác nhận: tiến trình mua hàng, tóm tắt, phương thức thanh toán mô phỏng, thông tin nhận hàng và liên kết dịch vụ.
- FAQ: tìm kiếm, tab chủ đề, câu trả lời và khối hỗ trợ bên cạnh. Chính sách: mục lục bên cạnh bài. Liên hệ: form và thông tin/map hai cột.
- Blog, tìm kiếm toàn site, 404 và các chính sách bổ sung kế thừa theme dùng chung.

66 ảnh nguồn đã chuyển sang WebP và phục vụ nội bộ; tổng khoảng 1,4 MB. Nguồn ảnh ghi tại `design/stitch/assets.json`. Be Vietnam Pro được lưu cục bộ, không cần gọi Google Fonts lúc chạy. Raw HTML tham khảo không được thực thi trong ứng dụng.

## Chức năng

Giữ các luồng React đang hoạt động: VI/EN, giỏ hàng, tổng tiền, đặt lịch, bản nháp, hồ sơ, ảnh tải lên/nén, lỗi storage, hoàn tác, tìm kiếm bàn phím và drawer có focus trap. Form đặt lịch nhanh truyền dịch vụ, loài và ngày đã chọn vào wizard.

Demo vẫn dùng localStorage; chưa có backend, email, thanh toán hoặc giao hàng thật. Giữ nhãn demo, thông tin shop hiện hành và các chỗ cần xác nhận. Không chuyển lời chứng thực mẫu, cam kết y tế, social login giả hoặc số liên hệ placeholder từ mockup thành chức năng hay thông tin thật.

## Kiểm tra

- `npm run lint`: đạt.
- `npm run build`: đạt; chỉ có thông báo React Router `use client` được bỏ qua trong client bundle.
- 13 nhóm Playwright E2E đạt trên Chromium headless: VI/EN, route trực tiếp, đặt lịch, tài khoản/hồ sơ, upload ảnh, phân tách tài khoản, khôi phục bản nháp, lỗi lưu trữ, bốn phương thức checkout, tìm kiếm, bộ lọc, undo, bàn phím và drawer.
- Responsive kiểm tra 320, 390, 768, 1024, 1440px và chữ 200% ở 640px.
- Sau sửa khoảng cách caption/điều khiển hero, chạy lại 3 nhóm kiểm thử Stitch: đạt. Chụp lại 22 nhóm trang/trạng thái ở 1440px và 390px, kiểm tra ảnh tải đủ, không lỗi runtime và không tràn ngang.
- Ảnh review nằm trong `.impeccable/review/` (bỏ qua trong Git). Kiểm thử chức năng gốc ở `tests/website.spec.js`; kiểm thử chuyển thiết kế và ảnh ở `tests/stitch.spec.js`.
- Review giao diện độc lập: `ship` ở lượt kiểm tra lại các lỗi được yêu cầu; caption/điều khiển hero và ảnh chụp trạng thái cuộn/focus đã được xác nhận xử lý.
- Detector kiểm tra stylesheet/component mới không trả về finding. Các cảnh báo trên HTML nguyên gốc trong `design/stitch/` được phân loại là ngoại lệ tham khảo và ghi theo từng quy tắc/giá trị, giới hạn trong danh sách file nguồn cụ thể. HTML nguồn không thuộc giao diện chạy; không tắt hook hay quy tắc toàn dự án.

Chưa kiểm tra Safari/Firefox, thiết bị iOS/Android thật hoặc screen reader; không có kết luận chứng nhận WCAG hay hiệu năng trên mạng di động thật.

## Khôi phục trang chủ theo demo

Theo yêu cầu tiếp theo, `/` dùng lại thiết kế `Demo/stitch_petshop_design_system (2)/code-animated.html`: hero ảnh nền trượt ngang 4,5 giây, font Nunito, câu chuyện sản phẩm, tám danh mục, Flash Sale màu cam/giá xanh, dịch vụ, quy trình/form và floating dock; header/footer có biến thể riêng. Các trang khác giữ thiết kế Stitch. Utility CSS được biên dịch cục bộ và giới hạn trong `.demo-home`, các biến thể shell trong `.home-reference`; không cần Tailwind CDN hay icon font.

Giỏ hàng dùng `addCart` hiện hành; form nhanh chuyển dịch vụ, loài, ngày và cân nặng vào wizard. Story links mở nội dung tương ứng; slider có nút trước/sau, dừng và hỗ trợ reduced motion. Không chuyển lời chứng thực hay cam kết y tế chưa xác nhận từ mockup thành thông tin thật.

Test bổ sung: `tests/home-reference.spec.js`. Ảnh desktop/mobile và 1024px: `.impeccable/review/home-reference/`. Các kiểm tra gồm ảnh tải đủ, bố cục/overflow 320–1440px, slider, mở story, thêm giỏ và theme ngoài trang chủ.

Kiểm tra khôi phục trang chủ: build/lint đạt; kiểm thử riêng homepage và handoff đặt lịch đạt; kiểm thử route VI/EN đạt; nhóm responsive/ảnh/nhãn và chữ 200% đạt. Sửa giá Flash Sale bị tràn ở 1024px bằng media query giới hạn 1024–1199px; review cuối `ship`.

## Đồng bộ navigation Aceternity Floating Dock

Layout dùng chung render một Floating Dock trên mọi route, thay menu chính header/mobile cũ và Dock riêng trang chủ. Giữ utility class, màu gray/neutral, kích thước và thông số Motion của source người dùng; adapter nối bảy route WnW, hỗ trợ VI/EN và React Router. Bổ sung tên truy cập, aria-current, trạng thái mobile/Escape và reduced motion (source không có xử lý này). Chi tiết mọi thay đổi: `FLOATING-DOCK.md`.

Đã thêm TS/TSX, `@/` alias, helper `cn`, Tailwind v4/PostCSS; v3 chỉ còn alias dành cho script biên dịch demo cũ. Tailwind v4 không bật global preflight để giữ trang hiện hành. Menu mobile đã kiểm tra khi cuộn và khi có toast; nút lên đầu trang nằm bên trái, thông báo chừa cột icon bên phải. Favicon paw có sẵn được khai báo để không có lỗi 404 trong console phiên mới.

Type-check, lint và build đạt. 14 nhóm website/trang chủ hiện có đạt; sau xử lý favicon, 5 nhóm Dock đạt trên Chromium: 19 route ở desktop/mobile, kích thước và màu, spring/tooltip, SPA/currentpage, cn, bàn phím/Escape, reduced motion và hitbox khi cuộn/toast. Review cuối `ship`. Ảnh ở `.impeccable/review/shared-dock/`.
