# Hướng dẫn Codex CLI — Website Woof N' Whiskers (ReactJS)

> Lưu file này thành `SPEC.md` trong thư mục dự án, rồi chạy prompt ở **Phần 14**. Đây là bản **prototype front-end** bám sát brief; bản chạy thật sẽ dựng trên WordPress + WooCommerce + BookingPress (xem mục 1.3).

---

## 1. Tổng quan

### 1.1 Doanh nghiệp (dùng đúng các thông tin này, không bịa thêm)

| Mục | Thông tin |
|---|---|
| Tên | **Woof N' Whiskers** — cửa hàng và dịch vụ chăm sóc chó mèo tại Đà Nẵng |
| Slogan | *A little more love for every little paw.* |
| Địa chỉ | 49 Phạm Kiệt, Khuê Mỹ, Ngũ Hành Sơn, Đà Nẵng |
| Điện thoại | 093 560 5311 |
| Email | phungntldn@gmail.com |
| Khách hàng | Chủ nuôi chó mèo trong và quanh Đà Nẵng (người địa phương và khách quốc tế) |
| Giờ hoạt động | Thứ 2 – Chủ nhật, 08:00 – 20:00 — luôn kèm chú thích *"Giờ demo, cần cập nhật"* |

### 1.2 Mục tiêu

1. Khách **đặt lịch online trong 4 bước**.
2. Khách hiểu rõ **dịch vụ, giá và chính sách trước khi đặt**.
3. Khách **mua sản phẩm trực tuyến**.
4. Khách quản lý **hồ sơ thú cưng** và dùng lại khi đặt lịch.
5. **Phần "Đặt lịch" là trọng tâm.**

### 1.3 Ràng buộc kỹ thuật

- Dùng **ReactJS + JavaScript ES6+ (JSX)**, **Vite** để phát triển/build và **React Router** để điều hướng. Dùng CSS tùy chỉnh theo design tokens; không dùng thư viện UI có sẵn. Cho phép `npm install` để cài các dependency cần thiết; lưu lockfile và khai báo scripts `dev`, `build`, `preview`, `lint` trong `package.json`.
- Không backend: dữ liệu (tài khoản, thú cưng, lịch đặt, giỏ hàng, đơn hàng) lưu `localStorage`. Mọi thứ là **mô phỏng** và phải ghi rõ ở nơi liên quan (ví dụ màn xác nhận đơn: *"Đây là bản demo, chưa kết nối cổng thanh toán thật"*).
- Cài dependency bằng `npm install`; chạy phát triển bằng `npm run dev -- --host 0.0.0.0 --port 8000`. Build bằng `npm run build`, xem bản build bằng `npm run preview -- --host 0.0.0.0 --port 8000`. Không hỗ trợ mở bằng `file://`. Khi triển khai SPA, cấu hình hosting fallback các đường dẫn ứng dụng về `index.html`; route không tồn tại hiển thị trang 404 trong React.
- Đường dẫn theo brief (khai báo bằng React Router, giữ URL đẹp và hỗ trợ truy cập trực tiếp/tải lại trang):
  `/`, `/gioi-thieu/`, `/dich-vu/`, `/dich-vu/cham-soc-ban-ngay/`, `/dich-vu/luu-tru-ban-dem/`, `/dich-vu/cham-soc-long/`, `/cua-hang/`, `/cua-hang/san-pham/?id=…`, `/dat-lich/`, `/tai-khoan/`, `/tai-khoan/thu-cung/`, `/gio-hang/`, `/thanh-toan/`, `/tim-kiem/`, `/faq/`, `/chinh-sach/huy-lich/`, `/chinh-sach/tiem-phong/`, `/chinh-sach/bao-mat/`, `/chinh-sach/doi-tra/`, `/chinh-sach/dieu-khoan/`, `/lien-he/`, `/blog/` (danh sách ngắn), route `*` cho trang 404.
- **Hai ngôn ngữ:** Tiếng Việt **mặc định**, nút chuyển **VI / EN** ở header (mục 12).
- Hiệu năng: trang chính tải < 3 giây trên di động → ảnh dùng SVG/ảnh nén, `loading="lazy"`, `font-display:swap`, không script nặng.
- Trình duyệt: hai bản mới nhất của Chrome, Safari, Edge, Firefox, Android/iOS browser.

---

## 2. Thương hiệu & Design Tokens

**Font:** `Lato` (Google Fonts, weights 400/700/900) với stack
`'Lato','Be Vietnam Pro',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif`.
> ⚠️ Bản Lato trên Google Fonts có thể thiếu một số dấu tiếng Việt, khi đó trình duyệt sẽ tự dùng font dự phòng. Vì vậy **bắt buộc** đặt `Be Vietnam Pro` (hoặc `system-ui`) ngay sau Lato và kiểm tra các ký tự như *ặ, ữ, ệ, ỗ, ơ, ư*; ghi chú vấn đề này trong báo cáo cuối.

**Bảng màu (từ brief):**

| Token | Mã | Vai trò |
|---|---|---|
| `--c-brown` | `#835D42` | Màu chủ đạo / ấm: tiêu đề phụ, icon, viền nhấn, footer nhấn |
| `--c-yellow` | `#F8D38C` | Điểm nhấn mềm: blob nền hero, badge giá, thẻ nổi bật |
| `--c-blue` | `#326DCA` | **CTA / liên kết** / trạng thái đang chọn |
| `--c-cream` | `#F9EED9` | Nền section ấm, thẻ FAQ, banner |
| `--c-mist` | `#F8F9FB` | Nền sáng của trang |

Màu bổ trợ (chỉ dùng khi cần, suy ra từ palette): `--c-ink:#2B1D14` (chữ chính, nâu đen), `--c-muted:#6B5646` (chữ phụ), `--c-blue-dark:#2757A8` (hover), `--c-line:#E8DFD0`, `--c-success:#2E7D4F`, `--c-warning:#B26A00`, `--c-danger:#B3261E`, `--c-footer:#3F5F78` (nền footer xanh xám, chữ trắng).

**Quy tắc màu & tương phản (WCAG AA):**
- Nút CTA: nền `#326DCA`, chữ trắng, đậm. Nút phụ: viền xanh, chữ xanh, nền trắng.
- **Không dùng chữ trắng hoặc chữ vàng trên nền `#F8D38C`** — chữ trên vàng phải là `--c-ink` hoặc `--c-brown` đậm. Không dùng `#F8D38C` làm màu chữ.
- Chữ thường tối thiểu 4.5:1, chữ lớn 3:1; trạng thái focus `outline:3px solid #326DCA; outline-offset:2px`.
- Lỗi/hết hàng/đã chọn phải kèm icon hoặc chữ, không chỉ dùng màu.

**Hình dạng & phong cách:** ấm áp, thân thiện, "pastel mềm", bo góc 16px (thẻ), 999px (chip/badge), bóng nhẹ, nhiều khoảng trắng. Hero lấy cảm hứng ảnh tham khảo Happy Paws: **blob vàng `#F8D38C` phía sau ảnh thú cưng**, nền kem, nút xanh lam. Icon nét 1.75px đồng bộ, vẽ bằng SVG inline.

```css
:root{
  --c-brown:#835D42; --c-yellow:#F8D38C; --c-blue:#326DCA; --c-cream:#F9EED9; --c-mist:#F8F9FB;
  --c-ink:#2B1D14; --c-muted:#6B5646; --c-blue-dark:#2757A8; --c-line:#E8DFD0;
  --c-success:#2E7D4F; --c-warning:#B26A00; --c-danger:#B3261E; --c-footer:#3F5F78;
  --font:'Lato','Be Vietnam Pro',system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  --radius:16px; --radius-sm:10px; --radius-pill:999px; --tap:44px; --container:1200px;
  --shadow-sm:0 1px 3px rgba(43,29,20,.08); --shadow:0 10px 30px rgba(43,29,20,.10);
  --sp-1:4px; --sp-2:8px; --sp-3:12px; --sp-4:16px; --sp-6:24px; --sp-8:32px; --sp-12:48px; --sp-16:64px;
}
```

---

## 3. Quy tắc nội dung trung thực (BẮT BUỘC)

Brief nhấn mạnh nhiều lần việc **không khẳng định điều shop chưa xác nhận**. Codex phải tuân thủ:

1. **Không tự tạo đánh giá giả** trình bày như thật. Khu đánh giá hiển thị **trạng thái chờ**: *"Chưa có đánh giá. Đánh giá thực tế của khách hàng sẽ xuất hiện tại đây."* Nếu cần minh họa bố cục, dùng 1–3 thẻ gắn nhãn rõ **"Nội dung minh họa"**, tắt được bằng cờ `SHOW_DEMO_REVIEWS=false` trong `src/data/data.js` (mặc định `false`).
2. **Ảnh minh họa** (SVG/placeholder) gắn nhãn nhỏ "Ảnh minh họa" ở góc ảnh hoặc chú thích; không nói đó là cơ sở vật chất thực tế của shop. Chừa chỗ thay bằng ảnh thật (`assets/images/real/…`).
3. **Không khẳng định** các điều chưa có căn cứ: *"giám sát 24/7", "nhân viên có chứng chỉ", "phòng điều hòa", "thú y đồng hành", "an toàn tuyệt đối"*. Thanh "Vì sao chọn Woof N' Whiskers" chỉ dùng **4 điểm** từ brief:
   - Thông tin dịch vụ minh bạch · Quan tâm đến từng thú cưng · Quy trình rõ ràng · Dễ dàng đặt lịch.
4. **Giá & đơn vị tính đúng thực tế, không dùng một đơn vị chung:**
   - Chăm sóc ban ngày: **từ 150.000đ/ngày**
   - Lưu trú ban đêm: **từ 300.000đ/đêm**
   - Chăm sóc lông: **từ 200.000đ/lượt** (theo loài, cân nặng, tình trạng lông, gói)
   - Luôn kèm điều kiện thay đổi giá (cân nặng, số đêm, gói, nhận/trả ngoài giờ). Gói *Chăm sóc lông chuyên sâu* và *Tạo kiểu*: **"Báo giá theo nhu cầu"**.
5. **Chính sách/điều kiện** là nội dung đề xuất → gắn nhãn "Nội dung đề xuất, shop cần xác nhận" ở trang chính sách; câu trả lời FAQ dùng đúng văn bản trong brief, mục chưa rõ để `[CẬP NHẬT theo shop]`.
6. **Không gọi "Đặt lịch thành công"** khi mới gửi yêu cầu. Dùng trạng thái **"Đã nhận yêu cầu — chờ shop xác nhận"**.
7. Boarding **không** hiển thị như cuộc hẹn một giờ: dùng ngày nhận – ngày trả, tính theo đêm.
8. Không mặc định thú cưng "đã tiêm phòng" khi chủ nuôi chưa nhập; phân biệt **Đã xác nhận / Chưa cập nhật**.
9. Shop hiện có 9 sản phẩm → tạo **9–12 sản phẩm demo**, gắn nhãn "Sản phẩm demo" trong data (cờ `demo:true`), giá hợp lý bằng VND.

---

## 4. Cấu trúc thư mục

```
woofnwhiskers/
├── index.html                            # entry HTML cho Vite
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── public/assets/images/                 # ảnh minh họa; real/ chờ ảnh thật
├── public/assets/icons/
└── src/
    ├── main.jsx
    ├── App.jsx                           # providers + cấu hình routes
    ├── styles/                           # tokens.css, base.css, components.css, pages.css
    ├── components/                       # Header, Footer, Layout, Modal, Drawer, Calendar...
    ├── pages/                            # Home, About, Services, ServiceDetail, Booking,
    │                                     # Account, Pets, Shop, ProductDetail, Cart, Checkout,
    │                                     # Search, FAQ, Contact, Blog, Policy, NotFound
    ├── features/                         # booking/, pets/, auth/, cart/, shop/
    ├── context/                          # state dùng chung: tài khoản, giỏ hàng, ngôn ngữ
    ├── hooks/
    ├── i18n/                             # index.js, vi.js, en.js
    ├── data/                             # data.js: dịch vụ, sản phẩm demo, FAQ...
    └── utils/                            # store.js, validation.js, format.js...
```

Header/footer là React components dùng chung trong `Layout`, bao quanh các trang qua React Router. `index.html` có `<noscript>` thông báo cần bật JavaScript và liên kết liên hệ cơ bản. Mỗi route cập nhật `<title>`, `<meta name="description">`, canonical và Open Graph; có **đúng 1 `<h1>`**, `lang` đồng bộ với ngôn ngữ. Chia component theo trách nhiệm, dùng state/props và hooks thay vì thao tác DOM trực tiếp; các listener phải được dọn dẹp khi unmount.

---

## 5. Thành phần dùng chung

### 5.1 Header (sticky)
- Trái: logo "Woof N' Whiskers" (chữ + icon dấu chân SVG).
- Menu cố định: **Trang chủ | Về chúng tôi | Dịch vụ (dropdown 3 dịch vụ) | Cửa hàng | Đặt lịch**. Mục hiện tại có `aria-current="page"`.
- Phải: ô **tìm kiếm** (gợi ý khi gõ: sản phẩm + dịch vụ), **nút ngôn ngữ VI | EN** (cờ + mã), **Tài khoản** (icon; chưa đăng nhập → "Đăng nhập", đã đăng nhập → tên + menu: Thông tin, Hồ sơ thú cưng, Lịch đã đặt, Đơn hàng, Đăng xuất), **Giỏ hàng có badge số lượng**.
- Mobile (<900px): hamburger → drawer trái (focus trap, Esc, overlay), tìm kiếm mở rộng, giữ icon giỏ.
- "Skip to content" link. Thanh thông báo mỏng trên cùng: *"Đặt lịch online từ Thứ 2 đến Chủ nhật"*.

### 5.2 Footer (nền `--c-footer`, chữ trắng, bo góc, theo ảnh tham khảo)
- Tên + slogan *"A little more love for every little paw."*, icon Instagram / Facebook / YouTube (link giữ chỗ có `aria-label`; "liên kết fanpage/Zalo" là tùy chọn).
- 4 cột: **Về chúng tôi** (Giới thiệu, Dịch vụ, Sản phẩm, Blog) · **Hỗ trợ khách hàng** (Câu hỏi thường gặp, Chính sách đặt lịch, Chính sách đổi trả, Điều khoản sử dụng) · **Liên hệ** (địa chỉ, SĐT, email thật) · **Giờ hoạt động** (Thứ 2 – Chủ nhật, 08:00 – 20:00, *Giờ demo, cần cập nhật*).
- Dòng bản quyền: `© 2026 Woof N' Whiskers. All rights reserved.`

### 5.3 Khác
- Breadcrumb ở mọi trang con. Toast (`aria-live`), modal/drawer có focus trap, skeleton, trạng thái rỗng có hướng dẫn, nút có trạng thái hover/focus/active/disabled/loading nhất quán.
- Mini-cart drawer mở từ icon giỏ.

---

## 6. Đặc tả trang

### 6.1 Trang chủ `/` — một mục tiêu rõ ràng: dẫn tới **3 dịch vụ** và **cửa hàng** (tham khảo Pet Mart, PORTO)
1. **Hero:** blob vàng + ảnh minh họa chó/mèo, slogan, mô tả ngắn, 2 CTA: **Đặt lịch ngay** (xanh) và **Mua sắm ngay** (viền).
2. **Thanh 4 điểm tin cậy** (chỉ 4 điểm ở mục 3.3) có icon.
3. **Giới thiệu shop:** tiêu đề định vị + 2–3 câu + 1 ảnh (minh họa) + nút *Tìm hiểu thêm* → `/gioi-thieu/`.
4. **Dịch vụ chăm sóc thú cưng:** tiêu đề *"Everything Your Pet Needs, All in One Place."* (ở bản VI: *"Mọi điều thú cưng cần, trong một nơi"*) và **3 thẻ nhất quán**: ảnh · nhãn số (01 DAYCARE / 02 OVERNIGHT BOARDING / 03 GROOMING) · tên · mô tả ngắn · chip giá (`Từ 150.000đ / ngày`, `Từ 300.000đ / đêm`, `Từ 200.000đ / lượt`) · CTA chính *Xem chi tiết* · CTA phụ *Đặt lịch*. Dưới có dải *"Chưa biết nên chọn dịch vụ nào? Liên hệ để được tư vấn"* + nút.
5. **Sản phẩm nổi bật:** carousel/lưới (ảnh, tên, giá, *Thêm vào giỏ*, *Xem chi tiết*), nhãn "Sản phẩm demo".
6. **Đánh giá từ khách hàng:** trạng thái chờ theo mục 3.1.
7. **Blog "Pet Care Tips":** 3 thẻ ngang (ảnh, tag Nutrition/Grooming/Boarding, tiêu đề, thời gian đọc, *Đọc bài viết →*) + link *Xem tất cả bài viết →*. Tiêu đề bài: *Những lưu ý khi thay đổi thức ăn cho chó, mèo* (5 phút) · *Bao lâu nên tắm cho thú cưng một lần?* (4 phút) · *Cần chuẩn bị gì trước khi gửi thú cưng qua đêm?* (6 phút).
8. **FAQ** (accordion, 4–6 câu về đặt lịch, giờ hoạt động, điều kiện tiếp nhận, thanh toán, hủy/đổi lịch).
9. **CTA cuối trang:** *"Bạn đã tìm được dịch vụ phù hợp cho thú cưng?"* + nút **Đặt lịch ngay** / *Khám phá cửa hàng*.
10. Footer.

### 6.2 Về chúng tôi `/gioi-thieu/`
Bố cục 2 cột: **trái** ảnh không gian shop/hoạt động chăm sóc (minh họa, có nhãn); **phải** tiêu đề *"Một nơi yêu thương dành cho những người bạn bốn chân"* + 2 đoạn (dùng đúng văn bản brief) + CTA **Trải nghiệm ngay**. Bên dưới: giá trị thương hiệu (4 điểm), 3–4 ảnh không gian (tiếp nhận, chăm sóc lông, lưu trú, vui chơi — minh họa), thông tin liên hệ + bản đồ (SVG giả hoặc `iframe` có fallback liên kết Google Maps tới địa chỉ thật).

### 6.3 Dịch vụ tổng quan `/dich-vu/`
- **Banner:** *"Chăm sóc tận tâm cho người bạn bốn chân"* + mô tả + CTA *Khám phá dịch vụ* / *Đặt lịch ngay*.
- **Tổng quan 3 dịch vụ:** 3 service card (kích thước/bố cục đồng nhất) theo bảng: ảnh · tên · mô tả ngắn (*Dành cho thú cưng cần không gian chăm sóc trong ngày / nơi lưu trú qua đêm / vệ sinh và chăm sóc bộ lông*) · giá + đơn vị · CTA chính *Xem chi tiết* · CTA phụ *Đặt lịch*.
- **So sánh & chọn dịch vụ:** bảng 2 cột *Nhu cầu → Dịch vụ phù hợp* + *"Bạn chưa biết nên chọn dịch vụ nào?"* → *Liên hệ để được tư vấn*.
- **Quy trình chung:** timeline `01 Chọn dịch vụ → 02 Đặt lịch → 03 Đưa thú cưng đến shop → 04 Tiếp nhận và chăm sóc` (chi tiết từng dịch vụ nằm ở trang con).
- **Vì sao chọn Woof N' Whiskers** (4 điểm).
- **Hình ảnh không gian & hoạt động** (3–4 ảnh, link *Xem thêm ở Về chúng tôi*).
- **FAQ về dịch vụ** (6 câu theo brief) + **CTA cuối**: *"Bạn đã tìm được dịch vụ phù hợp cho thú cưng? Khám phá thông tin chi tiết và gửi yêu cầu đặt lịch ngay hôm nay."* → **Đặt lịch ngay**.

### 6.4 Trang chi tiết dịch vụ (3 trang, cùng một template, nội dung khác nhau; dùng đúng văn bản brief)

**Template chung:** Hero (nhãn · H1 · mô tả · chip giá · CTA) → Giới thiệu dịch vụ + danh sách "có thể bao gồm" → Phù hợp với ai (3 thẻ ảnh minh họa) → Quy trình (timeline 4 bước riêng) → Bảng giá & cách tính phí → Điều kiện & lưu ý → FAQ accordion → CTA cuối.

| | **Chăm sóc ban ngày** | **Lưu trú ban đêm** | **Chăm sóc lông** |
|---|---|---|---|
| Nhãn | DAYCARE SERVICE | OVERNIGHT BOARDING | PET GROOMING |
| H1 | Chăm sóc ban ngày – Để bé vui chơi, bạn an tâm làm việc | Lưu trú ban đêm – Người bạn nhỏ có nơi nghỉ ngơi khi bạn vắng nhà | Chăm sóc lông – Sạch sẽ, gọn gàng và đáng yêu hơn mỗi ngày |
| Giá | Từ 150.000đ/ngày · Chó và mèo<br><small>*Chỉ áp dụng cho loài mà cơ sở thực tế có khả năng tiếp nhận.</small> | Từ 300.000đ/đêm · Lưu trú qua đêm | Từ 200.000đ/lượt · Chăm sóc theo gói |
| Quy trình | 01 Tiếp nhận → 02 Bắt đầu chăm sóc → 03 Chăm sóc trong ngày → 04 Bàn giao | 01 Đăng ký lưu trú → 02 Tiếp nhận & kiểm tra thông tin → 03 Lưu trú → 04 Bàn giao | 01 Tiếp nhận & tư vấn → 02 Vệ sinh & làm sạch → 03 Sấy & chăm sóc lông → 04 Kiểm tra & bàn giao |
| Phần đặc thù | Thời gian & bảng giá: 150.000đ/ngày; *giá thay đổi theo chi phí phát sinh hoặc nhận/trả ngoài giờ* | **Tiện ích & thông tin lưu trú** (khu nghỉ ngơi, chế độ ăn, sinh hoạt & vận động, hỗ trợ chăm sóc) · giá 300.000đ/đêm *thay đổi theo cân nặng/kích thước, số đêm, loại phòng/gói, nhận/trả ngoài giờ* · **Chính sách cần công bố** (nhận/trả, phí trả trễ, gia hạn, hủy/đổi lịch, xử lý vấn đề sức khỏe) | **Các hạng mục** (tắm, sấy & chải, cắt tỉa & tạo kiểu, chăm sóc bổ sung) · giá 200.000đ/lượt *thay đổi theo loài/kích thước, cân nặng, độ dài & tình trạng lông, hạng mục* · **gói tham khảo**: Cơ bản (tắm, sấy, chải) từ 200.000đ · Chuyên sâu *báo giá theo nhu cầu* · Tạo kiểu *báo giá theo nhu cầu* (gắn nhãn "Gói đề xuất, chờ shop xác nhận") · thời lượng *theo từng gói sau khi shop xác định* (không mặc định 60 phút) · **Gallery trước/sau** (ảnh minh họa không được chú thích là kết quả của shop) |
| Điều kiện & lưu ý | Thông tin sức khỏe & tiêm phòng; dị ứng, chế độ ăn, thuốc; hành vi cần lưu ý; thức ăn/vật dụng cá nhân; tuân thủ giờ nhận/bàn giao | Thông tin sức khỏe & tiêm phòng; bệnh lý, dị ứng, thuốc; chế độ ăn; hành vi/lo âu; **SĐT khẩn cấp** | Tình trạng da, lông, sức khỏe; dị ứng/sản phẩm không phù hợp; sợ nước/máy sấy; kiểu cắt tỉa mong muốn; lông rối nhiều. *Thú cưng có vết thương/bệnh da liễu cần được cơ sở đánh giá trước.* |
| FAQ | Dùng trong bao lâu? · Gửi cả chó và mèo? · Cần chuẩn bị gì? | Giá tính thế nào? · Mang thức ăn riêng? · Kéo dài lưu trú? | Giá có giống nhau? · Yêu cầu kiểu cắt cụ thể? · Mất bao lâu? |
| CTA cuối | *Một ngày bận rộn của bạn, vẫn có thể là một ngày vui của bé!* → **Đặt lịch chăm sóc ban ngày** | *Bạn sắp có một chuyến đi? Hãy chuẩn bị nơi nghỉ ngơi cho bé trước nhé!* → **Đặt lịch lưu trú ngay** | *Đã đến lúc chăm chút cho diện mạo của bé!* → **Đặt lịch chăm sóc lông** |

Các nút "Đặt lịch" truyền dịch vụ qua query: `/dat-lich/?service=daycare|boarding|grooming` để màn 1 tự chọn sẵn.

---

## 7. ĐẶT LỊCH `/dat-lich/` — TRỌNG TÂM (làm kỹ nhất)

### 7.1 Bố cục trang (A → D)
- **Header trang:** nhãn `BOOK ONLINE`, H1 **"Đặt lịch chăm sóc thú cưng"**, mô tả *"Chọn dịch vụ, thời gian và cung cấp thông tin để Woof N' Whiskers tiếp nhận yêu cầu đặt lịch của bạn."*
- **A. Thông tin & bảng giá dịch vụ** (đặt **trước** form): 3 thẻ ảnh (Chăm sóc ban ngày – *Theo ngày* · Lưu trú ban đêm – *Theo đêm* · Chăm sóc lông – *Theo lượt/gói*) và bảng so sánh: Mô tả · Đối tượng · Đơn vị tính · Thời gian · Cách tính giá · Điều kiện (xem nội dung bảng ở brief). Ví dụ giá: `150.000đ/ngày`, `300.000đ/đêm`, `Từ 200.000đ/lượt (theo cân nặng hoặc gói)`. Khối "Điều kiện sử dụng dịch vụ" gắn nhãn *"Nội dung đề xuất, chưa phải điều kiện đã xác nhận của shop"*. Thẻ có nút chọn → cuộn xuống form, chọn sẵn dịch vụ.
- **B. Biểu mẫu 4 bước** với stepper: **1 Dịch vụ · 2 Thú cưng · 3 Khách hàng · 4 Xác nhận**.
- **C. Chính sách đặt lịch:** liên kết *Điều kiện tiếp nhận · Chính sách thay đổi/hủy lịch · Điều khoản sử dụng*.
- **D. Hỗ trợ khách hàng:** hotline, email, hướng dẫn khi gặp lỗi đặt lịch.

### 7.2 Màn 1 — Chọn dịch vụ & thời gian
| Trường | Hành vi |
|---|---|
| Dịch vụ* | 3 thẻ radio (có thể chọn sẵn từ `?service=`) |
| Thú cưng* | Chó / Mèo |
| Gói dịch vụ | Hiện khi có gói (Grooming: Cơ bản / Chuyên sâu / Tạo kiểu); Chuyên sâu và Tạo kiểu → "báo giá" |
| Cân nặng* | Chọn khoảng (demo): Dưới 5kg · 5–10kg · 10–25kg · Trên 25kg |
| Ngày sử dụng | **Lịch mở Thứ 2 → Chủ nhật** (tự viết bằng JS, không thư viện), không chọn ngày quá khứ |
| Giờ nhận | Theo giờ hoạt động 08:00–20:00 (bước 30 phút) |
| Giờ trả | Có với daycare và boarding |

Quy tắc theo dịch vụ:
- **Daycare:** 1 ngày + giờ nhận/giờ trả; giá = 150.000đ × số ngày.
- **Boarding:** **ngày nhận + ngày trả** (bắt buộc ngày trả > ngày nhận), tính theo **đêm** = số ngày chênh lệch; giá = 300.000đ × số đêm. **Không** dùng khung 1 giờ.
- **Grooming:** chọn ngày + **khung giờ hẹn** (bước 30 phút) và hiển thị *"Thời lượng dự kiến: theo gói, shop sẽ xác nhận"*; giá "Từ 200.000đ".
- Khung **"Giá dự kiến"** cập nhật tức thời + dòng *"Giá có thể thay đổi theo cân nặng, tình trạng lông, chi phí phát sinh hoặc nhận/trả ngoài giờ."*

### 7.3 Màn 2 — Thông tin thú cưng (màn mới, quan trọng)
- **Đã đăng nhập & có hồ sơ:** hiển thị câu hỏi *"Bạn muốn đặt dịch vụ cho bé nào?"* với danh sách radio thẻ (ví dụ `Mochi – Chó, Poodle`, `Bông – Mèo, Anh lông ngắn`) + nút **+ Thêm thú cưng mới**; cho chọn nhiều bé nếu bật `ALLOW_MULTI_PET=true` (checkbox). Khi chọn hồ sơ, **ẩn form nhập tay**.
- **Khách mới / chưa đăng nhập / chọn "Thêm mới":** hiện form:

| Trường | Loại | Bắt buộc |
|---|---|---|
| Tên thú cưng | Text | Có |
| Loài | Dropdown Chó/Mèo | Có |
| Giống | Dropdown hoặc text | Có |
| Cân nặng (kg) | Number | Có |
| Tình trạng tiêm phòng | Dropdown: Đã tiêm đầy đủ / Chưa tiêm đủ / Chưa cập nhật | Có |
| Tình trạng sức khỏe | Textarea | Nên có |
| Dị ứng / thuốc đang dùng | Textarea | Nếu có |
| Lưu ý về hành vi | Textarea | Không |

- Nếu đã đăng nhập: checkbox **"Lưu thành hồ sơ thú cưng"** (mặc định bật).
- **Nhắc nhở nhẹ, không chặn:** nếu tiêm phòng "Chưa cập nhật" → banner vàng *"Thông tin tiêm phòng của {tên} chưa cập nhật. Bạn vẫn có thể tiếp tục đặt lịch; shop sẽ liên hệ xác nhận."* (có icon + chữ, không chỉ màu).
- Ghi chú trong tài liệu: *"Liên kết hồ sơ thú cưng ↔ lịch hẹn trong BookingPress cần được kiểm tra/cấu hình hoặc tích hợp riêng"* (đưa vào phần báo cáo cuối).

### 7.4 Màn 3 — Thông tin khách hàng
| Trường | Bắt buộc | Kiểm tra |
|---|---|---|
| Họ và tên | Có | Không để trống |
| Email | Có | Đúng định dạng |
| Số điện thoại | Có | `^(0|\+84)\d{9}$` (hiển thị ví dụ `093 560 5311`) |
| Lời nhắn | Không | Tối đa 500 ký tự, có bộ đếm |

UX: lỗi hiển thị **ngay dưới trường sai** (`aria-describedby`, `aria-invalid`), **giữ nguyên dữ liệu đã nhập**, dấu `*` cho trường bắt buộc, **không** chỉ hiện một thông báo chung; có banner tóm tắt lỗi ở đầu bước và tự focus trường lỗi đầu. Đã đăng nhập → tự điền từ tài khoản.

### 7.5 Màn 4 — Kiểm tra & xác nhận
Bảng tóm tắt có nút **Sửa** cho từng nhóm (quay lại bước tương ứng):

| Nhóm | Nội dung |
|---|---|
| Dịch vụ | Tên dịch vụ và gói |
| Thời gian | Ngày/giờ nhận; ngày/giờ trả nếu có |
| Thú cưng | Tên, loài, giống, cân nặng |
| Khách hàng | Họ tên, email, SĐT |
| Chi phí | Đơn giá × số ngày/đêm/lượt = tổng hoặc **giá dự kiến** |
| Chính sách | Tóm tắt chính sách hủy/đổi lịch (hiện **ngay tại màn này**) + link đầy đủ |

Checkbox bắt buộc: **"Tôi đã đọc và đồng ý với Chính sách đặt lịch và Điều khoản sử dụng"**. Nút chính: **Gửi yêu cầu đặt lịch** (loading ~1s, chống bấm đúp).

**Sau khi gửi:** màn thành công với:
- Tiêu đề **"Đã gửi yêu cầu đặt lịch"** (không ghi "Đặt lịch thành công"); badge trạng thái **"Đã nhận yêu cầu – chờ shop xác nhận"**.
- **Mã đặt lịch** `WNW-YYMMDD-XXXX`, tóm tắt thông tin chính, lưu vào `localStorage` (hiển thị ở Tài khoản → Lịch đã đặt).
- Ghi chú: *"Email xác nhận sẽ được gửi khi hệ thống email được cấu hình (demo: chưa gửi thật)."*
- Nút *Về trang chủ*, *Xem lịch đã đặt*, *Đặt thêm lịch*.

### 7.6 Xử lý tình huống (cho tiêu chí Interaction Design & Error Handling)
Trường bắt buộc bỏ trống · ngày trả ≤ ngày nhận · ngày quá khứ · cân nặng ≤ 0 hoặc sai định dạng · email/SĐT sai · chưa tick đồng ý điều khoản · lưu thất bại (`localStorage` bị chặn: báo lỗi rõ + nút *Thử lại*) · thoát form khi chưa lưu (`beforeunload` + xác nhận) · khôi phục nháp (lưu nháp tự động mỗi bước, khôi phục khi quay lại). Mọi thông báo lỗi nêu **vấn đề + cách sửa** (ví dụ *"Ngày trả cần sau ngày nhận ít nhất 1 đêm."*).

---

## 8. Hồ sơ thú cưng `/tai-khoan/thu-cung/`

**4 chức năng cốt lõi:** xem danh sách · thêm hồ sơ · chỉnh sửa hồ sơ · chọn thú cưng khi đặt lịch (mục 7.3). Bố cục tham khảo Rover / Pawlo "My Pets" / Carl's Care.

1. **Tiêu đề & giới thiệu:** H1 **"Hồ sơ thú cưng của tôi"**, mô tả *"Quản lý thông tin của những người bạn bốn chân để việc đặt lịch và chăm sóc tại Woof N' Whiskers thuận tiện hơn."* + nút **+ Thêm thú cưng** nổi bật.
2. **Danh sách:** mỗi thú cưng là **thẻ hồ sơ** (ảnh đại diện, tên, loài, giống, tuổi/ngày sinh, cân nặng kg, badge tiêm phòng *Đã xác nhận / Chưa cập nhật*, nút **Xem hồ sơ**, **Chỉnh sửa**, menu **⋮** ≥ 44px chứa Chỉnh sửa/Xóa). Cuối danh sách có thẻ **"+ Thêm thú cưng mới"** viền nét đứt cùng kích thước. Lưới nhất quán, dễ quét, tốt trên mobile.
3. **Trạng thái rỗng:** minh họa + *"Bạn chưa có hồ sơ thú cưng nào"* + hướng dẫn + nút **Tạo hồ sơ đầu tiên**.
4. **Chi tiết hồ sơ:** thanh tóm tắt 3 mục (**lịch hẹn sắp tới · cân nặng hiện tại · tình trạng tiêm phòng**); các **tab**: *Thông tin chung | Chăm sóc & sức khỏe | Lịch sử dịch vụ | Nhật ký lưu trú* (tab cuối chỉ hiện khi bật `FEATURE_ACTIVITY_LOG=true`); mỗi tab có nút **Chỉnh sửa** riêng; cân nặng thống nhất **kg**.

| Nhóm thông tin | Trường | Ưu tiên |
|---|---|---|
| Cơ bản | Tên, ảnh đại diện, loài, giống, ngày sinh | Phải có |
| Thể chất | Cân nặng | Phải có |
| Chăm sóc | Thói quen ăn uống, lưu ý, dị ứng đã biết | Nên có |
| Tiêm phòng | Trạng thái, ngày tiêm gần nhất, ngày tiêm tiếp theo (nếu xác nhận) | Nên có |
| Ghi chú sức khỏe | Thông tin chủ nuôi muốn chia sẻ | Nên có |
| Lịch sử dịch vụ | Các lần đặt trước (đọc từ danh sách lịch đã đặt theo `petId`) | Nên có |
| Nhật ký lưu trú | Ngày giờ, loại hoạt động (ăn, đi dạo, chơi, tắm, nghỉ ngơi), ghi chú, ảnh | Tùy chọn |

5. **Form thêm/sửa:** Tên*, Loài* (Chó/Mèo/Khác), Giống, Ngày sinh (date picker), Cân nặng (số, kg), Ảnh đại diện (upload → đọc bằng `FileReader`, nén canvas ≤ 600px, lưu data URL), Tiêm phòng (trạng thái), Dị ứng & lưu ý (textarea), Thói quen ăn uống (textarea). Nút **Lưu hồ sơ** / **Hủy**. **Không bắt buộc** điền hết thông tin sức khỏe; **không mặc định "đã tiêm"**.
6. **Tình huống lỗi:** trường bắt buộc trống · cân nặng sai/≤ 0 · ảnh không hợp lệ (sai định dạng, > 3MB — nêu rõ cách sửa) · thoát khi chưa lưu (hỏi xác nhận) · xóa hồ sơ (modal xác nhận + toast *Hoàn tác* 5 giây) · lưu thất bại (thông báo + Thử lại). Sau khi lưu: toast thành công + cập nhật danh sách.
7. **(Tùy chọn, nếu còn thời gian)** Tab *Nhật ký lưu trú* theo mẫu "Recent health activity": mục gồm ngày giờ, loại hoạt động, ghi chú nhân viên, ảnh; trạng thái trống *"Nhật ký sẽ xuất hiện khi bé lưu trú tại Woof N' Whiskers"*; chủ nuôi chỉ xem; nhân viên đăng (chỉ để chỗ giao diện, không làm admin).

---

## 9. Cửa hàng, giỏ hàng, thanh toán

### 9.1 Cửa hàng `/cua-hang/` (tham khảo PORTO + Pet Mart)
- Breadcrumb, tiêu đề, **tìm kiếm** (bỏ dấu tiếng Việt, khớp một phần, debounce 250ms), **bộ lọc** danh mục (Thức ăn chó, Thức ăn mèo, Phụ kiện, Đồ chơi, Vệ sinh & chăm sóc…) · loài · khoảng giá · còn hàng; **sắp xếp** (liên quan, giá tăng/giảm, mới nhất); chip lọc đang dùng + *Xóa tất cả*; đồng bộ URL; **số kết quả**; **trạng thái rỗng** có gợi ý.
- Card: ảnh (SVG minh họa), tên, giá, nhãn "Sản phẩm demo", nút **Thêm vào giỏ** (nút đổi trạng thái *Đã thêm ✓* + toast + badge giỏ nhảy số) và **Xem chi tiết**.
- Lưới 2/3/4 cột theo breakpoint.

### 9.2 Chi tiết sản phẩm `/cua-hang/san-pham/?id=`
Thư viện ảnh + thumbnail, tên, giá, đơn vị, mô tả, thông số (bảng), chọn biến thể (nếu có), tồn kho, số lượng (− / + , min 1, max tồn kho), **Thêm vào giỏ** / **Mua ngay**, tab thông tin, sản phẩm liên quan; mobile có thanh CTA dính đáy; `id` sai → trạng thái lỗi thân thiện.

### 9.3 Giỏ hàng `/gio-hang/`
Dòng sản phẩm (ảnh, tên, đơn giá, bộ chỉnh số lượng, thành tiền, **Xóa** + toast *Hoàn tác*), tóm tắt đơn (tạm tính, phí vận chuyển, **tổng — tính bằng số nguyên VND**, luôn đúng), giỏ trống có hướng dẫn, badge ở header cập nhật tức thì, mini-cart drawer. Phí vận chuyển demo: 30.000đ, miễn phí từ 500.000đ (ghi rõ là demo).

### 9.4 Thanh toán `/thanh-toan/` (theo ảnh tham khảo Pet Mart nhưng **bổ sung thêm hình thức thanh toán**)
- Bố cục 2 cột: trái **Thông tin thanh toán** (Họ tên*, Địa chỉ*, Số điện thoại*, Email*; validate khi blur/submit, lỗi ngay dưới trường, banner tóm tắt lỗi), phải **Đơn hàng của bạn** (bảng sản phẩm, tạm tính, phí ship, tổng) + khối phương thức thanh toán + checkbox điều khoản + nút **Đặt hàng** (nền xanh `--c-blue`).
- **Phương thức thanh toán (radio card, có icon, có mô tả khi chọn):**
  1. **Nhận hàng thanh toán (COD)**
  2. **Chuyển khoản ngân hàng** — hiện thông tin tài khoản **giả (demo)** + nội dung chuyển khoản = mã đơn
  3. **Quét mã QR (VietQR)** — hiện QR **minh họa** (SVG tự vẽ, ghi "QR minh họa")
  4. **Ví điện tử** (MoMo / ZaloPay / VNPay) — chọn logo chữ (không dùng logo thật), hiển thị bước hướng dẫn mô phỏng
- **Thanh toán mô phỏng, không kết nối cổng thật** (nhóm đang nghiêng về phương án này) → banner nhỏ *"Thanh toán mô phỏng – không phát sinh giao dịch thật"*.
- Màn xác nhận đơn: mã đơn `WNW-ORD-YYMMDD-XXXX`, tóm tắt, hướng dẫn theo phương thức đã chọn, nút *Tiếp tục mua sắm*; xóa giỏ; lưu đơn vào Tài khoản → Đơn hàng. Giỏ trống mà vào checkout → hướng dẫn quay lại cửa hàng.

---

## 10. Tài khoản `/tai-khoan/`
- **Chưa đăng nhập:** tab *Đăng nhập* / *Đăng ký* (Họ tên, Email, SĐT, Mật khẩu ≥ 8 ký tự; **mô phỏng** bằng `localStorage`, mật khẩu băm đơn giản — ghi chú *"Chỉ là demo, không dùng mật khẩu thật"*), thông báo lỗi cụ thể (sai email/mật khẩu, email đã tồn tại).
- **Đã đăng nhập:** menu bên (Thông tin cá nhân · Hồ sơ thú cưng · Lịch đã đặt · Đơn hàng · Đăng xuất). *Thông tin cá nhân* (tên, ngày sinh/tuổi, SĐT, email) có chỉnh sửa. *Lịch đã đặt* và *Đơn hàng*: danh sách + trạng thái (**Đã nhận yêu cầu** / **Đã xác nhận** là trạng thái do shop đổi — chỉ hiển thị, "theo dõi trạng thái" là tùy chọn).
- Trạng thái trống có ý nghĩa cho từng danh sách.

## 11. Các trang còn lại
- **Tìm kiếm `/tim-kiem/?q=`:** gợi ý khi gõ (tối đa 5, điều hướng ↑↓ Enter Esc), kết quả hai nhóm *Sản phẩm* và *Dịch vụ*, bỏ dấu, trạng thái rỗng có gợi ý.
- **FAQ `/faq/`:** accordion (`<button aria-expanded>`), nhóm theo chủ đề (Đặt lịch, Dịch vụ, Thanh toán, Hủy/đổi lịch), có ô tìm. Mẫu câu hỏi dùng đúng văn bản brief; chỗ chưa rõ để *"[CẬP NHẬT theo shop]"*.
- **Chính sách:** `huy-lich`, `tiem-phong`, `bao-mat`, `doi-tra`, `dieu-khoan`; mục lục anchor; banner *"Nội dung đề xuất, shop cần xác nhận"*; chính sách hủy/đổi lịch phải nêu: thời gian nhận/trả, phí trả trễ, gia hạn, hủy/đổi lịch, xử lý sự cố sức khỏe.
- **Liên hệ `/lien-he/`:** form **yêu cầu gọi lại** (Họ tên, SĐT, Chủ đề, Nội dung; validate + trạng thái thành công), thông tin thật (địa chỉ, SĐT, email), giờ hoạt động (kèm "Giờ demo"), bản đồ.
- **Blog `/blog/`:** 3 bài mẫu dạng thẻ + trang bài ngắn (tùy chọn).
- **404:** có menu, ô tìm kiếm, nút về trang chủ.

---

## 12. Đa ngôn ngữ (VI mặc định, EN tùy chọn)
- `src/i18n/`: từ điển `vi.js`, `en.js` và provider/hook `useI18n()` cung cấp `lang`, `setLang`, `t(key, vars)`. Render nội dung, placeholder và nhãn aria bằng React qua `t(...)`; đổi state ngôn ngữ phải cập nhật cả chuỗi động và thông báo lỗi.
- Mặc định `vi`; lưu lựa chọn `localStorage('wnw_lang')`; đổi ngôn ngữ **không tải lại trang**, cập nhật `<html lang>`, `document.title` và `meta description`; nút chuyển có `aria-pressed` và nhãn rõ (`VI` / `EN`).
- **Phải dịch đủ EN** cho: header/footer, trang chủ, dịch vụ, luồng đặt lịch, giỏ hàng/thanh toán, thông báo lỗi, FAQ. Chuỗi động (giá, ngày) dùng `Intl` theo `lang` (`vi-VN` / `en-GB`). Tiền tệ luôn VND.

---

## 13. Chất lượng bắt buộc

**Rubric UX (10 tiêu chí, nhắm mức 4/4):** Cart & Checkout 16% · Product Detail 12% · Visual Design & UI Consistency 12% · Product Discovery/Search/Filter 10% · Responsive & Mobile 10% · Information Architecture & Navigation 8% · Interaction Design & Error Handling 8% · Accessibility 8% · Homepage 8% · Other Pages 8%. Vì **đặt lịch là trọng tâm**, luồng 4 màn + hồ sơ thú cưng phải đạt mức xuất sắc ở Interaction/Error Handling, Accessibility và Visual Consistency.

**Accessibility (WCAG AA):** HTML ngữ nghĩa, 1 `<h1>`/trang, heading liền cấp, mọi input có `<label>`, `alt` cho ảnh nội dung (`alt=""` cho trang trí), thao tác bàn phím đầy đủ + focus rõ + focus trap cho modal/drawer, `aria-live` cho toast/lỗi, `aria-current`, `aria-expanded`, vùng chạm ≥ 44px, zoom 200% không vỡ, `prefers-reduced-motion`. **Lịch tự viết phải điều khiển được bằng bàn phím** (mũi tên, Enter, Esc) và có `aria-label` cho từng ngày.

**Responsive:** mobile-first; breakpoint 480/768/1024/1280; **không cuộn ngang từ 320px**; lưới 1→2→3 cột; bảng giá/so sánh cuộn ngang **bên trong** container; stepper đặt lịch gọn trên mobile; thanh CTA dính đáy ở bước đặt lịch/PDP; menu drawer.

**SEO:** `<title>` + `<meta description>` riêng mỗi trang, 1 H1, URL ngắn dễ đọc, JSON-LD `LocalBusiness` (tên, địa chỉ, SĐT, email, giờ mở cửa) ở trang chủ/liên hệ, JSON-LD `Product` ở trang chi tiết sản phẩm, `<link rel="canonical">`, Open Graph cơ bản.

**Hiệu năng:** < 3s trên di động: SVG/ảnh nén, `loading="lazy"`, `decoding="async"`, chia bundle theo route bằng `React.lazy`/`Suspense`, chỉ dùng dependency cần thiết; Google Fonts có `preconnect` + `display=swap`.

**Bảo mật cơ bản (mức prototype):** render dữ liệu người dùng qua JSX để React escape; không dùng `dangerouslySetInnerHTML` với dữ liệu người dùng, bọc `localStorage` trong `try/catch`, không lưu thông tin thẻ.

**Mã nguồn:** sạch, comment ngắn ở phần phức tạp, không `console.log`, không TODO/lorem ipsum, không link chết.

---

## 14. PROMPT CHẠY TRONG CODEX CLI

### 14.1 Chuẩn bị
```bash
mkdir woofnwhiskers && cd woofnwhiskers
# lưu file này thành SPEC.md
git init
```
Chạy: `codex` (tương tác) rồi dán prompt chính; hoặc lưu prompt vào `PROMPT.md` và chạy `codex exec --full-auto "$(cat PROMPT.md)"` *(kiểm tra `codex --help` nếu cờ khác theo phiên bản)*.

### 14.2 PROMPT CHÍNH (dán nguyên khối)
```text
Bạn là senior front-end engineer kiêm UX designer. Hãy đọc kỹ SPEC.md trong thư mục hiện tại và xây dựng TOÀN BỘ website "Woof N' Whiskers" (cửa hàng và dịch vụ chăm sóc chó mèo tại Đà Nẵng) theo đúng đặc tả. Đây là prototype front-end chạy thật bằng dữ liệu mô phỏng.

RÀNG BUỘC BẮT BUỘC
- Dùng ReactJS + JavaScript ES6+ (JSX), Vite và React Router. CSS tùy chỉnh theo tokens, KHÔNG thư viện UI có sẵn. Cho phép npm install; lưu lockfile và có scripts dev/build/preview/lint.
- Chạy npm install, npm run dev -- --host 0.0.0.0 --port 8000; build bằng npm run build và xem bằng npm run preview -- --host 0.0.0.0 --port 8000. Dữ liệu lưu localStorage. Hosting cần SPA fallback; giữ nguyên các URL theo SPEC.
- Tiếng Việt mặc định, có nút chuyển VI/EN ở header (src/i18n/ với provider/hook React), dịch EN đầy đủ cho các luồng chính.
- Font Lato kèm fallback 'Be Vietnam Pro', system-ui để hiển thị đủ dấu tiếng Việt.
- Bảng màu bắt buộc: #835D42 (nâu), #F8D38C (vàng), #326DCA (xanh lam, CTA/liên kết), #F9EED9 (be/kem), #F8F9FB (nền sáng). Không đặt chữ trắng/vàng trên nền #F8D38C; đảm bảo tương phản WCAG AA.
- Tuân thủ cấu trúc thư mục, đường dẫn và nội dung trong SPEC.md. Dùng đúng thông tin doanh nghiệp (địa chỉ, SĐT, email), đúng giá và đơn vị tính (150.000đ/ngày, 300.000đ/đêm, từ 200.000đ/lượt).
- QUY TẮC NỘI DUNG TRUNG THỰC (SPEC mục 3): không tạo đánh giá giả, không khẳng định "giám sát 24/7/chứng chỉ/phòng điều hòa/thú y"; ảnh minh họa phải gắn nhãn "Ảnh minh họa"; chính sách là "nội dung đề xuất"; không gọi "Đặt lịch thành công" mà dùng "Đã nhận yêu cầu – chờ shop xác nhận"; không mặc định thú cưng đã tiêm phòng.

TRỌNG TÂM: LUỒNG ĐẶT LỊCH 4 MÀN (SPEC mục 7) + HỒ SƠ THÚ CƯNG (mục 8). Làm kỹ nhất, đúng từng trường, validation, xử lý lỗi, lịch tự viết mở Thứ 2–Chủ nhật, boarding tính theo đêm (ngày nhận/ngày trả), grooming có khung giờ, màn xác nhận có tóm tắt + chính sách + checkbox đồng ý, chọn hồ sơ thú cưng đã lưu hoặc nhập mới, nhắc nhở tiêm phòng không chặn đặt lịch.

QUY TRÌNH (tuần tự; sau mỗi giai đoạn tự kiểm tra rồi mới sang tiếp)
1. Nền tảng: thiết lập React + Vite + React Router, scripts và ESLint; src/styles/{tokens,base,components,pages}.css, utils/store, i18n provider/hook, context, dữ liệu demo và các components dùng chung (Layout, header sticky, dropdown dịch vụ, tìm kiếm có gợi ý, nút VI/EN, tài khoản, giỏ có badge, drawer mobile, footer theo SPEC).
2. Trang chủ (mục 6.1) và Về chúng tôi (6.2).
3. Dịch vụ tổng quan (6.3) và 3 trang chi tiết (6.4) dùng chung một template.
4. Đặt lịch /dat-lich/ (mục 7) đầy đủ 4 màn + A–D + trạng thái lỗi + nháp + mã đặt lịch.
5. Tài khoản (10) và Hồ sơ thú cưng (8): đăng ký/đăng nhập mô phỏng, danh sách, thêm, sửa, xóa có hoàn tác, chi tiết có tab, trạng thái rỗng, liên kết với đặt lịch.
6. Cửa hàng, chi tiết sản phẩm, giỏ hàng, thanh toán với 4 phương thức (mục 9), tìm kiếm (11).
7. FAQ, chính sách, liên hệ, blog, 404.
8. Rà soát: responsive 320–1280px không cuộn ngang, accessibility (bàn phím, focus, label, alt, aria, tương phản), hiệu năng, SEO (title/meta/JSON-LD), tính nhất quán UI, i18n VI/EN.

KIỂM TRA TRƯỚC KHI KẾT THÚC
- Chạy bản build bằng npm run preview và dùng curl xác nhận các URL hợp lệ/tài nguyên trả HTTP 200. Kiểm tra trong trình duyệt từng route khi truy cập trực tiếp, tải lại trang và điều hướng nội bộ; xác nhận route lạ hiển thị trang 404 (HTTP 200 từ SPA fallback không chứng minh route hoạt động đúng).
- Chạy `npm run lint` và `npm run build`; sửa lỗi ESLint và lỗi biên dịch JSX/import. Kiểm tra tương tác các luồng chính trong trình duyệt.
- Đối chiếu checklist mục 15 của SPEC.md, sửa mọi mục chưa đạt.
- In ra: danh sách file, cách chạy, bảng tự chấm 10 tiêu chí rubric (kèm lý do), các hạn chế còn lại (gồm: Lato có thể thiếu dấu tiếng Việt; liên kết hồ sơ thú cưng ↔ lịch hẹn của BookingPress cần cấu hình/tích hợp riêng khi lên WordPress; thanh toán chỉ mô phỏng; giờ hoạt động là giờ demo).

Hãy bắt đầu bằng việc đọc SPEC.md, lập kế hoạch ngắn, rồi thực hiện toàn bộ mà không dừng hỏi trừ khi thật sự bị chặn.
```

### 14.3 Prompt chia nhỏ

**Bước 1 – Nền tảng + Trang chủ + Về chúng tôi**
```text
Đọc SPEC.md. Chỉ làm giai đoạn 1–2: cấu hình React/Vite/React Router, src/styles/*, utils/store, i18n, context, components dùng chung, data, trang Home (đủ 10 section mục 6.1) và About cho route /gioi-thieu/. Header có nút VI/EN và tìm kiếm gợi ý; footer theo mục 5.2. Kiểm tra cú pháp và báo cáo.
```
**Bước 2 – Dịch vụ**
```text
Tiếp tục theo SPEC.md giai đoạn 3: /dich-vu/ và 3 trang chi tiết cùng template (mục 6.3–6.4), dùng đúng văn bản, giá, đơn vị, quy trình, FAQ, CTA trong bảng mục 6.4. Nút Đặt lịch truyền ?service=.
```
**Bước 3 – Đặt lịch (trọng tâm)**
```text
Tiếp tục theo SPEC.md giai đoạn 4: /dat-lich/ theo mục 7. Làm đủ khu A–D, stepper 4 bước, lịch tự viết (Thứ 2–CN, điều khiển bàn phím), boarding theo đêm, grooming theo khung giờ, giá dự kiến, màn 2 chọn hồ sơ thú cưng hoặc nhập mới, màn 3 validation, màn 4 tóm tắt + checkbox + gửi yêu cầu, màn thành công với mã WNW-YYMMDD-XXXX và trạng thái "Đã nhận yêu cầu – chờ shop xác nhận". Xử lý toàn bộ tình huống mục 7.6.
```
**Bước 4 – Tài khoản & Hồ sơ thú cưng**
```text
Tiếp tục theo SPEC.md giai đoạn 5: /tai-khoan/ và /tai-khoan/thu-cung/ theo mục 8 và 10: đăng ký/đăng nhập mô phỏng, danh sách thẻ hồ sơ, thẻ "+ Thêm thú cưng mới" nét đứt, form thêm/sửa với upload ảnh, xóa có hoàn tác, chi tiết với tab và thanh tóm tắt, trạng thái rỗng, lịch đã đặt. Liên kết với luồng đặt lịch.
```
**Bước 5 – Cửa hàng & Thanh toán**
```text
Tiếp tục theo SPEC.md giai đoạn 6–7: cửa hàng, chi tiết sản phẩm, giỏ hàng, thanh toán 4 phương thức (COD, chuyển khoản, QR minh họa, ví điện tử) theo mục 9; tìm kiếm, FAQ, chính sách, liên hệ, blog, 404 theo mục 11.
```
**Bước 6 – Rà soát**
```text
Thực hiện giai đoạn 8 và checklist mục 15: responsive, accessibility, hiệu năng, SEO, i18n VI/EN, tính trung thực nội dung (mục 3). Sửa mọi lỗi rồi in bảng tự chấm 10 tiêu chí.
```

### 14.4 Prompt tự chấm điểm & sửa
```text
Đóng vai người chấm điểm theo rubric 10 tiêu chí trong SPEC.md mục 13. Với mỗi tiêu chí: chấm 1–4, nêu bằng chứng cụ thể trong code/giao diện, liệt kê tối đa 3 vấn đề lớn nhất. Sau đó SỬA mọi tiêu chí dưới mức 4, ưu tiên luồng đặt lịch và hồ sơ thú cưng, rồi chạy lại kiểm tra route/tài nguyên HTTP, npm run lint và npm run build.
```

---

## 15. Checklist nghiệm thu

**Đặt lịch (trọng tâm)**
- [ ] Đặt lịch hoàn tất được trong **4 bước**; stepper hiển thị rõ, quay lại không mất dữ liệu
- [ ] Khu A (thông tin & bảng giá) nằm **trước** form; chọn dịch vụ từ thẻ/`?service=` hoạt động
- [ ] Lịch mở **Thứ 2 → Chủ nhật**; boarding dùng ngày nhận/ngày trả tính **đêm**; grooming có khung giờ + thời lượng "theo gói"
- [ ] Màn 2: chọn hồ sơ đã lưu **hoặc** nhập mới; nhập mới chỉ cho khách lần đầu/chưa đăng nhập; nhắc tiêm phòng **không chặn**
- [ ] Màn 3: validate email/SĐT, lỗi dưới từng trường, giữ dữ liệu, dấu `*`, không chỉ thông báo chung
- [ ] Màn 4: tóm tắt đủ 6 nhóm + chính sách hủy/đổi hiển thị ngay tại màn; checkbox đồng ý bắt buộc
- [ ] Sau gửi: "Đã gửi yêu cầu", trạng thái "chờ shop xác nhận", mã đặt lịch, lưu vào Lịch đã đặt; không ghi "Đặt lịch thành công"

**Hồ sơ thú cưng**
- [ ] Xem danh sách · thêm · sửa · xóa (xác nhận + hoàn tác) · chọn khi đặt lịch
- [ ] Thẻ hồ sơ đồng nhất, menu ⋮ ≥ 44px, thẻ "+ Thêm thú cưng mới" nét đứt
- [ ] Trạng thái rỗng; chi tiết có thanh tóm tắt 3 mục và các tab; cân nặng đơn vị kg
- [ ] Tiêm phòng phân biệt **Đã xác nhận / Chưa cập nhật**; không bắt buộc điền hết sức khỏe
- [ ] Lỗi: trường trống, cân nặng sai, ảnh không hợp lệ, thoát khi chưa lưu, lưu thất bại — thông báo nêu rõ cách sửa

**Nội dung & thương hiệu**
- [ ] Đúng font Lato (+ fallback tiếng Việt) và 5 mã màu; tương phản AA; không chữ trắng/vàng trên #F8D38C
- [ ] Đúng thông tin liên hệ thật; giờ hoạt động kèm "Giờ demo, cần cập nhật"
- [ ] Giá/đơn vị đúng và kèm điều kiện thay đổi; không dùng một đơn vị chung
- [ ] Không có đánh giá giả; ảnh minh họa có nhãn; không có khẳng định chưa xác nhận
- [ ] Chính sách gắn nhãn "nội dung đề xuất"

**Trang & chức năng khác**
- [ ] Menu đúng: Trang chủ | Về chúng tôi | Dịch vụ | Cửa hàng | Đặt lịch; tìm kiếm, giỏ có số lượng, tài khoản, nút VI/EN
- [ ] Trang chủ dẫn rõ tới 3 dịch vụ và cửa hàng; blog 3 thẻ; FAQ accordion; footer đủ 4 cột
- [ ] 3 trang chi tiết dịch vụ đúng template và nội dung từng dịch vụ
- [ ] Checkout có COD, chuyển khoản, QR minh họa, ví điện tử; có phản hồi sau Thêm vào giỏ / Đặt lịch / Đặt hàng
- [ ] Tìm kiếm gợi ý cả sản phẩm và dịch vụ; tài khoản có lịch đã đặt và đơn hàng
- [ ] VI mặc định, EN dịch đủ; đổi ngôn ngữ không tải lại trang

**Kỹ thuật**
- [ ] Không cuộn ngang ở 320px; vùng chạm ≥ 44px; điều hướng bàn phím đầy đủ (kể cả lịch)
- [ ] 1 H1/trang, title + meta description riêng, JSON-LD LocalBusiness & Product
- [ ] Các route hợp lệ/tài nguyên HTTP 200; truy cập trực tiếp và tải lại route hoạt động, route lạ hiển thị 404; `npm run lint` và `npm run build` đạt; không console.log/TODO/link chết
