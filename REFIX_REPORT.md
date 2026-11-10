# Báo cáo thực hiện Refix v2

Áp dụng trên mã React 19 + Vite + React Router đang có. Không chuyển dự án thành HTML thuần. Nguồn yêu cầu: `Instruction/Refix_Requirement.md`.

## Thay đổi

- Trang chủ: hero và đặt nhanh → About ngắn → ba dịch vụ → tám sản phẩm → ba giá trị cốt lõi → đánh giá chờ → Pet Care Tips → FAQ → CTA → liên hệ.
- Xóa component Flash Sale và CSS/selector dành riêng cho Flash Sale.
- Cửa hàng dùng đúng chín sản phẩm theo brief, lọc tìm kiếm bỏ dấu có debounce, danh mục, loài và giá; bỏ lọc/nhãn tồn kho. Thẻ có khoảng giá, Chọn và Xem nhanh. Chi tiết có ảnh, biến thể, số lượng, ba tab và gợi ý cùng loài.
- Trang dịch vụ có banner, ba thẻ, bốn nội dung gia đình, Không gian, FAQ và CTA. Ba trang chi tiết gộp đối tượng với quy trình; giá và FAQ gọn hơn; lưu trú có bốn ô ảnh không trùng tiêu đề và hai link chính sách xếp dọc.
- Giới thiệu thay banner, giữ About hai cột, bỏ tiêu đề Ghé thăm và chuyển Không gian sang Dịch vụ.
- Liên hệ nằm ở `/#lien-he`, route cũ chuyển hướng. Dock cuộn tới khối và focus tiêu đề. Footer có sáu ảnh; chỉ xuất icon mạng xã hội khi có URL thật trong config.
- Form có họ, tên, email, điện thoại, tên thú cưng, dịch vụ, sổ tiêm phòng và ghi chú. Kiểm tra blur/submit; JPG/PNG/PDF tối đa 5MB; lưu yêu cầu và file trong localStorage; lỗi lưu trữ giữ nguyên dữ liệu form.
- Cờ `SHOW_DEMO_LABELS=false` và `demoLabel()` ở `src/data/config.js`, phù hợp cấu trúc React. Nội dung hai ngôn ngữ dùng hệ i18n hiện có, gồm các cặp VI/EN và từ điển. Tiền luôn dùng định dạng vi-VN + đ.

## File

Thêm:

- `src/data/config.js`
- `src/components/site/RefixBlocks.jsx`
- `src/styles/refix.css`
- `tests/refix-static.mjs`, `tests/refix-check.mjs` (thư mục tests đang được gitignore từ trước)
- `REFIX_REPORT.md`
- 22 SVG trong `public/assets/real/` và 9 SVG trong `public/assets/products/`, liệt kê bên dưới.

Sửa:

- `src/App.jsx`, `src/main.jsx`
- `src/data/data.js`
- `src/i18n/index.jsx`, `src/i18n/vi.js`, `src/i18n/en.js`
- `src/context/AppContext.jsx`
- `src/components/Hero.jsx`, `src/components/Header.jsx`, `src/components/Footer.jsx`, `src/components/ProductStories.jsx`
- `src/components/floating-dock-demo.tsx`
- `src/components/site/UI.jsx`, `Layout.jsx`, `Cards.jsx`, `ContactInfo.jsx`, `HomeBooking.jsx`, `Meta.jsx`
- `src/pages/Home/Home.jsx`, `About/About.jsx`, `Services/Services.jsx`, `ServiceDetail/ServiceDetail.jsx`, `Contact/Contact.jsx`, `Shop/Shop.jsx`, `ProductDetail/ProductDetail.jsx`, `Booking/Booking.jsx`, `Cart/Cart.jsx`, `Checkout/Checkout.jsx`, `Account/Account.jsx`, `Pets/Pets.jsx`, `Policy/Policy.jsx`
- `src/hooks/usePageMotion.js`
- `src/styles/demo-home.css`, `demo-home-generated.css`, `site.css`, `stitch.css`, `home-backgrounds.css`, `button-motion.css`

Xóa: `src/components/FlashProducts.jsx`, `src/styles/product-card.css`.

## Giả định và điểm cần xác nhận

1. Form thông tin cá nhân thay form liên hệ cũ và được đặt cùng thông tin liên hệ/bản đồ tại cuối trang chủ, theo giả định mục 3.5.
2. Trang tổng quan Dịch vụ giữ ba thẻ sau banner, trước khối Vì các bé là một phần của gia đình.
3. Không có SPEC.md/INTRO_SPEC.md mang đúng tên đó trong checkout; sử dụng README, dữ liệu và mã nguồn hiện có cùng brief được chỉ định.
4. Website demo cũ không truy cập được qua công cụ web. Đã đối chiếu [website chính](https://www.woofnwhiskers.org/) cho nội dung ba giá trị và các trường form; dùng giá được chỉ định trong brief khi nguồn khác nhau.
5. Hai đoạn About dùng nội dung VI/EN đang có. Phần Bữa ăn / Không nhốt chuồng / Ngoài trời dùng đúng nội dung brief, cần chủ shop duyệt tính phù hợp vận hành.
6. Danh sách chỉ có ba sản phẩm mỗi loài: gợi ý cùng loài tối đa hai sản phẩm khác; không nhân bản sản phẩm để đủ bốn.
7. Biến thể, quy cách và giá theo biến thể chưa được xác nhận. Dữ liệu có cấu trúc `needsOwnerConfirm:true`, giá biến thể để null; lựa chọn chưa xác nhận và nút Thêm vào giỏ được vô hiệu hóa, kèm liên hệ shop. Không tự gán giá tối thiểu thành giá của một quy cách chưa biết. Cần dữ liệu thật để mở mua biến thể.
8. Giá tối đa Rabbit Pellet Food chưa có, nên chỉ hiển thị Từ 30.000đ. Thông tin/thông số sản phẩm để mảng rỗng có cấu trúc, không tự viết thành phần/khối lượng/công dụng.
9. Chính sách hủy/đổi, giờ nhận/trả cụ thể, thời hạn báo trước, phí phát sinh, điều kiện tiếp nhận/tiêm phòng, đổi trả và thông tin thanh toán cần xác nhận. Nội dung placeholder đã đổi thành lời hướng dẫn liên hệ trung tính. Màn 4 đặt lịch vẫn giữ tóm tắt chính sách, checkbox đồng ý và link chính sách.
10. Facebook, Instagram, Zalo, YouTube chưa có URL thật: để rỗng và ẩn icon.
11. Font ưu tiên Lato, fallback Be Vietnam Pro có sẵn trong dự án. Checkout không có file Lato; không tải được font ngoài trong môi trường này. Cần cung cấp font Lato để bảo đảm hình thức giống nhau trên thiết bị không cài Lato.
12. Form thành công dùng đúng câu yêu cầu; dữ liệu chỉ lưu localStorage, chưa có backend gửi đến shop. File gần 5MB có thể vượt dung lượng localStorage sau mã hóa; khi đó hiện lỗi lưu trữ và giữ dữ liệu để thử lại.

## Ảnh/video thật còn thiếu

Tất cả có SVG sạch không chữ. Ứng dụng chọn WebP cùng tên khi file có trong bản build, nếu chưa có dùng SVG, tránh request ảnh lỗi. Sau khi bổ sung ảnh cần build lại để cập nhật danh sách tài nguyên. Thư mục ảnh sản phẩm không dùng bao bì hãng khác.

Trong `public/assets/real/`:

- `banner-dich-vu.webp`, `banner-about.webp`, `banner-cham-soc-long.webp`, `about-shop.webp`
- `we-have-1.webp`, `we-have-2.webp`, `we-have-3.webp`, `we-have-4.webp`
- `space-1.webp`, `space-2.webp`, `space-3.webp`, `space-4.webp`
- `service-1.webp`, `service-2.webp`, `service-3.webp`, `service-4.webp`
- `footer-1.webp`, `footer-2.webp`, `footer-3.webp`, `footer-4.webp`, `footer-5.webp`, `footer-6.webp`

Trong `public/assets/products/`:

- `hamster-gerbil-mix.webp`, `guinea-pig-pellets.webp`, `rabbit-pellet-food.webp`
- `salmon-skin-care-cat-food.webp`, `tuna-feast-cat-food.webp`, `indoor-cat-nutrition.webp`
- `active-dog-formula.webp`, `protein-power-dog-food.webp`, `chicken-delight-dog-food.webp`

Chưa có video thật; khối Chúng tôi có gì sử dụng ảnh dự phòng, theo phương án được brief cho phép.

## Kiểm tra

- PASS: `npm run build`.
- PASS: `npm run lint`.
- PASS: `npm run typecheck`.
- PASS: `node --check` cho 11 file .js trong src; JSX/TSX được kiểm tra qua Vite/TypeScript.
- PASS: `node tests/refix-static.mjs`: 30 lần render React ở 15 route × VI/EN; không còn nhãn bị cấm trong nội dung render; cửa hàng đúng 9 thẻ; trang chủ có liên hệ.
- PASS: không còn Flash Sale/selector flash hoặc console.log trong src.
- Đã chạy Impeccable detector: lưu ý về Lato khác tài liệu thiết kế cũ (brief mới ưu tiên), và các kích thước chữ/bo góc; không có lỗi chặn từ detector. Không thay tài liệu thiết kế ngoài phạm vi.
- CHƯA XÁC MINH: HTTP 200 bằng curl, tương tác form/upload/đặt lịch, focus thực tế, ảnh tải trong trình duyệt, responsive 320px và kiểm tra tương phản trực quan. Mở cổng Vite bị EPERM; khởi động Edge/Playwright cũng bị chặn tại crashpad socket (Operation not permitted). `tests/refix-check.mjs` đã chuẩn bị cho các kiểm tra tương tác khi môi trường cho phép. SSR không thay thế kiểm tra trình duyệt.
- Build còn cảnh báo use client của thư viện và bundle chính hơn 500KB; build kết thúc thành công.
- Không có metadata Git hữu dụng trong `.git` ở checkout này, nên không tạo commit hoặc đối chiếu git diff.

## Cập nhật ảnh có sẵn theo yêu cầu tiếp theo

Đã thay việc hiển thị 31 SVG giữ chỗ bằng ánh xạ tới WebP có sẵn trong dự án (`src/data/media.js`). `ImageLabel` ưu tiên ảnh thật đúng tên nếu được bổ sung, tiếp theo dùng ảnh có sẵn, cuối cùng mới dùng ảnh dự phòng khi tải lỗi. Không tải ảnh ngoài hoặc tạo ảnh AI. Gallery ba dịch vụ dùng ảnh riêng phù hợp với nội dung; tránh ảnh bác sĩ/thú y và ảnh chụp toàn bộ giao diện.

Chín sản phẩm hiện dùng chung ảnh bát thức ăn không có bao bì hãng khác. Đây là ảnh đại diện, chưa phải ảnh chụp đúng từng SKU. Các xác nhận về ảnh thật tại báo cáo gốc vẫn còn áp dụng; riêng trạng thái giao diện trống đã được khắc phục.

File thay đổi: thêm `src/data/media.js`; sửa `src/components/site/UI.jsx`, `src/pages/ServiceDetail/ServiceDetail.jsx`, `tests/refix-static.mjs`, `public/assets/GENERATED.md` và báo cáo này.

Kiểm tra sau cập nhật: lint, build, typecheck đạt; 30 render VI/EN đạt, bao gồm xác minh mọi đường dẫn ảnh local trong HTML tồn tại và không còn SVG giữ chỗ trong thư mục real/products. Kiểm tra tương tác trình duyệt vẫn bị giới hạn bởi môi trường như đã ghi ở trên.
