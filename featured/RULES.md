# RULES — Quy chuẩn Layout & Format cho Trang Sự cố & Lỗ hổng (`featured/`)

Tài liệu này mô tả cấu trúc layout, CSS, dàn bài và quy trình chuẩn khi tạo mới hoặc cập nhật các trang **Phân tích lỗ hổng** (`vulnerability`) và **Báo cáo sự cố** (`incident`) trong thư mục `featured/` của PiraGo Security News.

---

## 1. Cấu trúc thư mục & File song ngữ

Mỗi case đặt trong `featured/<type>/<case-slug>/` (`<type>` là `vulnerabilities` cho lỗ hổng, `incidents` cho sự cố) gồm các file sau:

- **Trang tiếng Việt** (mặc định, URL `/featured/<type>/<case-slug>/<page-name>/`):
  - Lỗ hổng: `featured/vulnerabilities/<case-slug>/analysis.html` (hoặc `advisory.html` với đợt vá tổng hợp)
  - Sự cố: `featured/incidents/<case-slug>/incident_report.html` (hoặc `<name>_security_incident_report.html`)
- **Trang tiếng Nhật** (bắt buộc có `lang: ja` và `permalink` tường minh):
  - `featured/<type>/<case-slug>/ja/analysis.html` (hoặc `ja/incident_report.html`)
- **Ảnh Open Graph (OG)** (dùng chung cho cả `vi` và `ja`):
  - `featured/<type>/<case-slug>/<name>-og.png` (kích thước `1200×630`)

---

## 2. Front Matter chuẩn

### Bản tiếng Việt (`vi`)
```yaml
---
layout: default
title: "<Tên đối tượng / CVE> — <Tóm tắt ngắn tác động>"
description: "<Mô tả SEO 1–2 câu: phạm vi, nguyên nhân chính, bản vá / trạng thái>"
image: "/featured/<type>/<case-slug>/<name>-og.png"
category: "Phân tích lỗ hổng"   # hoặc "Sự cố an ninh" / "Sự cố vận hành"
---
```

### Bản tiếng Nhật (`ja`)
Bắt buộc thêm `lang: ja` và `permalink` giữ tiền tố `/ja/` để `_layouts/default.html` và `_includes/header.html` nhận diện đúng ngôn ngữ:
```yaml
---
layout: default
lang: ja
title: "<Tiêu đề tiếng Nhật>"
description: "<Mô tả SEO tiếng Nhật>"
image: "/featured/<type>/<case-slug>/<name>-og.png"
category: "脆弱性分析"          # hoặc "セキュリティインシデント" / "運用障害レポート"
permalink: /ja/featured/<type>/<case-slug>/<page-name>/
---
```

---

## 3. Khối `<style>` nội bộ & Design Tokens

Trang con kế thừa `_layouts/default.html` và `assets/css/pirago-theme.css`. Ngay sau Front Matter, khai báo `<style>` cục bộ cho các thành phần đặc thù của bài phân tích:

```html
<style>
  .an-nav { display: flex; gap: 8px; flex-wrap: wrap; margin: 16px 0 24px; }
  .an-nav a { font-size: 13px; font-weight: 600; padding: 4px 10px; border-radius: 999px; background: var(--bg-subtle); border: 1px solid var(--line); color: var(--text-muted); }
  .an-nav a:hover { color: var(--pirago-blue); border-color: var(--pirago-blue); text-decoration: none; }
  .an-sec { margin: 0 0 40px; }
  .an-sec h2 { font-size: 21px; margin: 24px 0 12px; scroll-margin-top: 90px; }
  .an-sec h3 { font-size: 17px; margin: 20px 0 8px; scroll-margin-top: 90px; }
  .an-sec h4 { font-size: 15px; margin: 18px 0 6px; }
  .an-sec pre { background: #0f172a; color: #e2e8f0; padding: 14px 16px; border-radius: var(--radius-md); overflow-x: auto; font-size: 13px; }
  .an-sec pre code { background: none; border: 0; padding: 0; color: inherit; }
  .an-sec ul, .an-sec ol { padding-left: 22px; }
  .an-sec li { margin: 4px 0; }
  .an-sec .table-wrap { overflow-x: auto; margin: 14px 0 20px; }
  .an-sec td code { white-space: nowrap; }
  .an-sec td, .an-sec th { overflow-wrap: normal; word-break: keep-all; }

  /* KPI cards (khuyến nghị cho trang Sự cố) */
  .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin: 20px 0 24px; }
  .kpi-card { background: var(--card); border: 1px solid var(--line); border-radius: var(--radius-md); padding: 14px 16px; box-shadow: var(--shadow-sm); }
  .kpi-num { font-size: 22px; font-weight: 800; font-family: var(--font-mono); color: var(--pirago-navy); line-height: 1.2; margin-bottom: 4px; }
  html[data-theme="dark"] .kpi-num { color: #5ab0e8; }
  .kpi-num.crit { color: var(--crit); }
  .kpi-num.high { color: var(--high); }
  .kpi-label { font-size: 12.5px; color: var(--text-muted); line-height: 1.4; }

  /* Sơ đồ SVG */
  .fig { margin: 16px 0 22px; padding: 12px; background: var(--card); border: 1px solid var(--line); border-radius: var(--radius-md); }
  .fig svg { width: 100%; height: auto; display: block; color: var(--text); font-family: inherit; }
  .fig figcaption { font-size: 12.5px; color: var(--text-muted); margin-top: 8px; }
  .fig .mut { fill: var(--text-muted); }
  .fig .box { fill: var(--bg-subtle); stroke: var(--line); }
</style>
```

> **Lưu ý CSS variables:** Luôn dùng biến trong `pirago-theme.css` (`--crit`, `--high`, `--med`, `--low`, `--text`, `--text-muted`, `--bg-subtle`, `--card`, `--line`, `--pirago-blue`, `--pirago-navy`, `--radius-md`, `--font-mono`) để hỗ trợ đồng thời Light/Dark mode.

---

## 4. Cấu trúc khung trang chung (Top-to-Bottom)

Mọi trang trong `featured/` đều tuân theo thứ tự các khối sau:

1. **Header báo cáo (`.report-header`)**:
   - `<h1>`: Tiêu đề đầy đủ của bài viết.
   - `<p class="sub">`: **Bắt buộc ghi rõ ngày công bố/xảy ra ban đầu** (`Công bố: <strong>YYYY-MM-DD</strong> · ` hoặc `Xảy ra / Công bố: <strong>YYYY-MM-DD</strong> · ` ở đầu dòng; bản `ja`: `公開日：<strong>YYYY-MM-DD</strong> · ` / `発生・公開日：<strong>YYYY-MM-DD</strong> · `), kèm ngày cập nhật (`Cập nhật đến <strong>YYYY-MM-DD</strong>`), tóm tắt nguồn chính, link tới bản tin tháng tương ứng (`<a href="{{ '/monthly/YYYY-mm/' | relative_url }}">...</a>` hoặc `/ja/monthly/YYYY-mm/`), và badge mức độ `<span class="badge crit|high|med|low">...</span>` + điểm CVSS (nếu có).
2. **Hộp tóm tắt hành động / Đọc trước (`blockquote.callout`)**:
   - Với **Lỗ hổng**: `<strong>Đọc trước:</strong>` nêu bản vá triệt để, workaround tạm thời (nếu có), và lưu ý *"Trang này không chứa mã khai thác."* (`本ページには攻撃コードは含まれません。`).
   - Với **Sự cố**: `<strong>TL;DR (dễ hiểu):</strong>` tóm tắt ngắn gọn chuyện gì đã xảy ra, quy mô, nguyên nhân gốc và trạng thái hiện tại. **Viết phù hợp cho cả người non-tech** (PM, quản lý, nhân sự không chuyên kỹ thuật): giải thích dễ hiểu bằng ngôn ngữ phổ thông, tránh thuật ngữ chuyên sâu chưa được diễn giải, nêu rõ tác động thực tế và việc cần làm.
3. **KPI Grid (`.kpi-grid`)** *(dành cho trang Sự cố, hoặc lỗ hổng có nhiều số liệu nổi bật)*:
   - 3–4 `.kpi-card` hiển thị các con số chốt (thời gian gián đoạn, số tài khoản/quốc gia ảnh hưởng, thiệt hại, mã sự cố / trạng thái).
4. **Thanh điều hướng nhanh (`nav.an-nav`)**:
   - Các pill link `<a href="#section-id">...</a>` trỏ tới từng `h2[id]` bên dưới.
   - **ID neo (`id` / `#`) bắt buộc dùng tiếng Anh** (ví dụ `#tldr`, `#summary`, `#scope`, `#remediation`, `#sources`) và dùng thống nhất cho cả bản `vi` và `ja`.
5. **Các phân đoạn nội dung (`<section class="an-sec">`)**:
   - Mỗi section bắt đầu bằng `<h2 id="...">...</h2>`, bên trong dùng danh sách `<ul>`/`<ol>`, bảng bọc trong `<div class="table-wrap"><table>...</table></div>`, khối lệnh `<pre><code class="language-bash">...</code></pre>` (tự động highlight bởi `highlight.js` trong `_layouts/default.html`), và sơ đồ `<figure class="fig">`.

---

## 5. Dàn bài chuẩn theo từng loại trang

### A. Trang Phân tích Lỗ hổng (`category: vulnerability`)

Tham khảo chuẩn: `featured/nginx-cve-2026-123007/analysis.html`, `featured/linux-cve-2026-99312/analysis.html`.

| Thứ tự | ID neo (`#`) | Tiêu đề mục | Nội dung bắt buộc |
| :--- | :--- | :--- | :--- |
| 0 | `#tldr` | **TL;DR (dễ hiểu)** | **Viết cho cả người non-tech** (PM, quản lý, khách hàng): giải thích công nghệ là gì bằng ngôn ngữ đời thường, nguy hiểm ra sao, dự án có bị ảnh hưởng không, PM/Quản lý cần làm gì (tránh thuật ngữ kỹ thuật nặng). |
| 1 | `#summary` | **1. Tóm tắt kỹ thuật** | SVG chuỗi tấn công + (nếu có) SVG cơ chế lỗi/bản vá; bản chất lỗ hổng (CVE/GHSA/CWE), điều kiện khai thác, CVSS theo các nguồn, commit/phiên bản vá. |
| 2 | `#scope` | **2. Phạm vi ảnh hưởng & Trạng thái bản vá** | SVG biểu đồ phạm vi phiên bản hoặc ma trận trạng thái theo distro/vendor + bảng chi tiết (`Thành phần`, `Phạm vi bị ảnh hưởng`, `Phiên bản đã vá`, `Ghi chú triển khai`). |
| 3 | `#check` | **3. Kiểm tra nhanh trên máy chủ** | SVG cây quyết định nhanh + các lệnh CLI kiểm tra phiên bản/cấu hình (VM, Docker/K8s nếu áp dụng). |
| 4 | `#remediation` | **4. Khắc phục triệt để & Biện pháp tạm thời** | SVG quy trình xử lý 4 bước + Cách 1 (Nâng cấp/Vá & Restart) + Cách 2 (Workaround tạm thời khi chưa vá được). |
| 5 | `#confidence` | **5. Độ tin cậy thông tin & Trạng thái khai thác** | Trạng thái PoC / khai thác thực tế, CISA KEV, chênh lệch CVSS hoặc thông tin chưa xác minh giữa các nguồn. |
| 6 | `#sources` | **6. Nguồn tham khảo** | Danh sách link chính thức (advisory vendor, CVE/NVD, commit, tracker distro, bài phân tích uy tín) với `target="_blank" rel="noopener noreferrer"`. |

### B. Trang Báo cáo Sự cố (`category: incident`)

Tham khảo chuẩn: `featured/microsoft-365-outage-2026-11/incident_report.html`, `featured/rakuten-sec/rakuten_securities_security_incident_report.html`, `featured/binance/binance_security_incident_report.html`.

| Thứ tự | ID neo (`#`) | Tiêu đề mục | Nội dung bắt buộc |
| :--- | :--- | :--- | :--- |
| 1 | `#summary` | **1. Tóm tắt & Phạm vi ảnh hưởng** | Bản chất sự cố (tấn công mạng vs. lỗi vận hành/cấu hình), mã theo dõi chính thức, dịch vụ/dữ liệu/khu vực bị tác động. |
| 2 | `#root-cause` | **2. Nguyên nhân kỹ thuật / Cơ chế** | SVG sơ đồ nguyên nhân/chuỗi xâm nhập + phân tích từng yếu tố kỹ thuật hoặc quản trị (tách bạch rõ phần đã xác nhận và phần phân tích bên thứ ba). |
| 3 | `#timeline` | **3. Diễn biến & Khôi phục** | SVG dòng thời gian (timeline) + bảng mốc thời gian chi tiết (`Thời điểm`, `Diễn biến chính`, kèm cột `Độ tin cậy` nếu nhiều nguồn chưa thống nhất) + giải thích lý do kéo dài (nếu có). |
| 4 | `#impact` / `#secondary-risk` | **4. Tác động / Rủi ro thứ cấp** *(tùy sự cố)* | Thiệt hại tài chính, lệnh cơ quan quản lý (FSA, PPC, tòa án...), hoặc rủi ro ăn theo (ví dụ: chiến dịch phishing giả mạo sự cố, IoCs). |
| 5 | `#recommendations` | **5. Khuyến cáo cho PiraGo** | SVG tóm tắt các trụ cột phòng ngừa/ứng phó + checklist hành động cụ thể cho đội ngũ kỹ thuật, vận hành và người dùng. |
| 6 | `#sources` | **6. Nguồn tham khảo** | Tổng hợp nguồn chính thức (PIR, thông cáo báo chí, cơ quan quản lý) và nguồn thứ cấp; ghi chú rõ độ tin cậy bằng badge (`<span class="badge low|med|high">`) khi cần. |

---

## 6. Quy chuẩn Sơ đồ SVG (`<figure class="fig">`)

- Đặt trong `<figure class="fig"><svg viewBox="0 0 740 <height>" role="img" aria-label="...">...</svg><figcaption>...</figcaption></figure>`.
- **Chiều rộng `viewBox` cố định `740`**, chiều cao linh hoạt theo nội dung.
- **ID marker duy nhất:** Mỗi `<marker id="...">` cho mũi tên phải có `id` riêng không trùng giữa các SVG trong cùng một trang (ví dụ: `m365-ah1`, `k1`, `k2`, `n1`).
- **Màu sắc tương thích Dark/Light mode:**
  - Dùng `fill="currentColor"` cho chữ chính, `class="mut"` cho chữ phụ, `class="box"` cho khung nền.
  - Dùng `var(--crit)`, `var(--high)`, `var(--med)`, `var(--low)`, `var(--pirago-blue)`, `var(--line)`, `var(--text-muted)` cho stroke/accent.
- **Kiểm tra hiển thị:** Sau khi viết xong, chụp ảnh các khối `<figure>` bằng headless Chrome (cả light và dark mode nếu cần) để đảm bảo chữ không bị tràn khung hoặc đè lên nhau.

---

## 7. Ảnh Open Graph (`-og.png`) & Kiểm tra trực quan

Mỗi case cần 1 ảnh `1200×630` đặt tại `featured/<case-slug>/<name>-og.png` và khai báo ở `image:` trong Front Matter của cả bản `vi` và `ja`.

- **Ngôn ngữ bắt buộc:** Toàn bộ nội dung chữ trên ảnh OG **phải viết bằng tiếng Anh** (vì dùng chung cho cả bản tiếng Việt và tiếng Nhật khi chia sẻ lên mạng xã hội).
- **Thành phần trên ảnh OG:** nền gradient navy đậm, font `JetBrains Mono` / `Plus Jakarta Sans`, badge mức độ, tên sự cố/lỗ hổng, mã CVE/GHSA hoặc mã sự cố, tóm tắt 1 dòng, phiên bản ảnh hưởng → bản vá (hoặc KPI chính), logo `assets/images/logo_footer.webp` và `security-news.pirago.vn`.
- **Render bằng headless Chrome** (giữ file HTML tạm trong scratchpad, không commit vào repo):
  ```bash
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless --hide-scrollbars --window-size=1200,630 \
    --screenshot=featured/<case-slug>/<name>-og.png \
    file:///path/to/scratch/og.html
  ```

---

## 8. Đăng ký vào `_data/featured.yml`

Thêm entry mới vào `_data/featured.yml` để trang tự động hiển thị trên Trang chủ (`index.html`, `ja/index.html`), menu điều hướng (`_includes/header.html`) và trang lưu trữ (`/incidents/`, `/vulnerabilities/`):

- **Thứ tự sắp xếp (bắt buộc):** Sắp xếp theo **ngày công bố / xảy ra ban đầu** của lỗ hổng hoặc sự cố (**mới nhất xếp trên**), **không** xếp theo ngày tạo file hoặc ngày cập nhật bài viết. Luôn ghi chú `# disclosed: YYYY-MM-DD` ngay phía trên mỗi `- id:` để đối chiếu cho các lần cập nhật sau.
- **Cấu trúc entry:**
  ```yaml
  - id: <case-slug>
    category: vulnerability   # hoặc incident
    month: "YYYY-MM"          # tháng công bố/xảy ra ban đầu (dùng cho trang archive)
    path: "featured/<case-slug>/<page-name>/"
    icon: "🛡️"                # emoji đại diện
    accent: true
    badge: {sev: crit, text: "CRITICAL"}   # crit | high | med | low
    nav: {vi: "<Tên ngắn>", ja: "<Tên ngắn JA>"}
    title: {vi: "<Tiêu đề thẻ>", ja: "<Tiêu đề thẻ JA>"}
    date: {vi: "Cập nhật đến YYYY-MM-DD · ...", ja: "YYYY年MM月DD日 時点 · ..."}
    link: {vi: "Xem phân tích & hướng dẫn →", ja: "分析・対策ガイドを見る →"}
    items:
      - sev: crit
        label: {vi: "Nguy cơ", ja: "リスク"}   # hoặc Quy mô / Phạm vi / Nguyên nhân / Tạm thời / Triệt để
        text: {vi: "...", ja: "..."}
  ```
- Đặt `archived: true` cho các case cũ nếu muốn ẩn khỏi mục nổi bật trên trang chủ (vẫn giữ nguyên trong `/incidents/` và `/vulnerabilities/`).

---

## 9. Checklist trước khi commit

- [ ] Đủ 2 bản HTML (`vi` và `ja`, bản `ja` có `lang: ja` và `permalink: /ja/featured/...`).
- [ ] Front Matter `image:` trỏ đúng file `-og.png` (1200×630), nội dung trên ảnh **bằng tiếng Anh**.
- [ ] Tất cả `<figure class="fig">` hiển thị rõ, không tràn/chồng chữ, mỗi `<marker>` có `id` riêng.
- [ ] Đã đăng ký vào `_data/featured.yml` đúng thứ tự ngày công bố/xảy ra ban đầu và đúng `month: "YYYY-MM"`.
- [ ] Nếu là lỗ hổng: tuyệt đối không chứa mã khai thác (exploit code).
- [ ] Kiểm tra build Jekyll cục bộ (`bundle exec jekyll build` hoặc `jekyll serve`) không báo lỗi.
