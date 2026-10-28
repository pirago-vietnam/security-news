# RULES - Quy chuẩn viết Báo cáo An ninh Mạng PiraGo

## 1. Quy định chung về file & template
- Tạo file html dạng `monthly/YYYY-mm.html` (ví dụ: `monthly/2026-11.html`).
- Sử dụng mẫu sẵn có tại `monthly/template.html` (hoặc `_templates/monthly-template.html`).
- Mọi trang tự động kế thừa Header, Footer và Design System của PiraGo qua Jekyll / GitHub Pages layout (`layout: default`).
- Khai báo Front Matter ở đầu file:
```yaml
---
layout: default
title: "Báo cáo bảo mật tháng MM/YYYY"
description: "Mô tả tóm tắt rủi ro..."
category: "Báo cáo tháng"
---
```

## 2. Tiêu chuẩn nội dung
- Nội dung trình bày dạng bảng rõ ràng, tóm tắt dễ hiểu cho kỹ sư và quản lý dự án.
- Có cột **Mức độ** (gắn badge `crit`, `high`, `med`, `low`), **Ảnh hưởng tới hệ thống nào**, và **Cách xử lý / Cần làm gì**.
- Đặt thanh tìm kiếm nhanh `<div class="table-filter-bar">` ở đầu trang để hỗ trợ lọc lỗ hổng theo từ khóa.

## 3. Các thành phần trọng tâm cần rà soát
- **Hạ tầng (Infrastructure):** AWS, GCP
- **Ngôn ngữ & Runtime:** NodeJS, PHP, Java, .NET, JavaScript
- **Framework:** Next.js, Nuxt, Quasar, Laravel, Spring Boot
- **Trình duyệt & Package:** Chrome/V8, npm, Composer, Maven

## 4. Xuất bản lên GitHub Pages
- Hệ thống sử dụng thuần **Jekyll** tích hợp sẵn của GitHub Pages, **không cần chạy lệnh build nào**.
- Khi tạo báo cáo mới:
  1. Thêm tóm tắt vào `index.html`.
  2. Cập nhật menu trong `_includes/header.html` và chân trang trong `_includes/footer.html`.
- Chỉ cần `git commit` và `git push` lên branch `main`, GitHub Pages sẽ tự động biên dịch và áp dụng layout chung (Header, Footer, CSS).
