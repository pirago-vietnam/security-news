# RULES - Quy chuẩn viết Báo cáo An ninh Mạng PiraGo

## 1. Quy định chung về file & template
- Mỗi tháng gồm **1 file dữ liệu song ngữ** và **2 file stub** (không viết HTML bảng bằng tay):
  - `_data/monthly/YYYY-mm.yml`: toàn bộ nội dung Việt + Nhật (sao chép từ `_templates/monthly-data.yml`).
  - `monthly/YYYY-mm.html`: stub tiếng Việt (sao chép từ `_templates/monthly-stub.html`).
  - `ja/monthly/YYYY-mm.html`: stub tiếng Nhật, giống stub trên nhưng bỏ `redirect_from`.
- Stub chỉ chứa Front Matter và một dòng `{% include monthly-report.html %}`:
```yaml
---
layout: default
monthly: "2026-11"
redirect_from:
  - /monthly/2026-11.html
---
```
- Tiêu đề, mô tả, breadcrumb, bảng, thanh tìm kiếm, badge mức độ và nhãn cột đều do `_includes/monthly-report.html`, `_layouts/default.html` và `_data/i18n.yml` dựng từ file dữ liệu, nên không cần khai báo lại.
- Header, Footer, thẻ tóm tắt ở `index.html` / `ja/index.html` tự lặp theo `_data/monthly/*`: **không cần sửa tay** khi thêm tháng mới. Tháng mới nhất tự nhận badge "Mới".

## 2. Tiêu chuẩn nội dung
- Nội dung trình bày dạng bảng rõ ràng, tóm tắt dễ hiểu cho kỹ sư và quản lý dự án.
- Section `type: actions | component | provider` tạo bảng với các cột **Mức độ** (`sev`: `crit`, `high`, `med`, `low`), **Ảnh hưởng tới hệ thống nào** (`impact`), **Cách xử lý / Cần làm gì** (`fix`). Section `type: list` tạo danh sách (ghi chú độ tin cậy, nguồn tham khảo).
- Mọi trường văn bản phải có đủ cả `vi` và `ja` (riêng `name` có thể là chuỗi dùng chung). Cho phép HTML trong nội dung; link nội bộ dùng tiền tố `@home@`, ví dụ `<a href="@home@monthly/2026-10/">`.
- Thanh tìm kiếm nhanh `#tableFilterInput` được include dựng sẵn ở đầu trang.

## 3. Các thành phần trọng tâm cần rà soát
- **Hạ tầng (Infrastructure):** AWS, GCP
- **Ngôn ngữ & Runtime:** NodeJS, PHP, Java, .NET, JavaScript
- **Framework:** Next.js, Nuxt, Quasar, Laravel, Spring Boot
- **Trình duyệt & Package:** Chrome/V8, npm, Composer, Maven

## 4. Xuất bản lên GitHub Pages
- Hệ thống sử dụng thuần **Jekyll** tích hợp sẵn của GitHub Pages, **không cần chạy lệnh build nào**.
- Khi tạo báo cáo mới: thêm đủ 3 file ở mục 1 (dữ liệu + 2 stub), bao gồm cả khối `card` cho thẻ tóm tắt trên trang chủ.
- Kiểm tra cục bộ: `mise exec -- bundle exec jekyll build` (hoặc `jekyll serve`), mở cả bản `/` và `/ja/`.
- Chỉ cần `git commit` và `git push` lên branch `main`, GitHub Pages sẽ tự động biên dịch và áp dụng layout chung (Header, Footer, CSS).
