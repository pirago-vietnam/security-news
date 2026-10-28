# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

**PiraGo Security News** (`security-news.pirago.vn`) is an internal security intelligence and reporting website for PiraGo engineering teams and project managers. It hosts monthly vulnerability digests, major incident reports, and emergency response runbooks.

## Architecture & Technology Stack

- **Platform**: Static website hosted on GitHub Pages with native Jekyll processing (`_config.yml`, `CNAME`).
- **No Local Build Step**: The site relies purely on GitHub Pages' built-in Jekyll compiler. No local build tooling, npm packages, or Gemfile are required to generate the site.
- **Layout System**:
  - `_layouts/default.html`: Master layout providing HTML structure, SEO/meta tags, Google Tag, typography (Plus Jakarta Sans, JetBrains Mono), breadcrumbs, and dark/light mode toggle.
  - `_includes/`: Reusable partials (`header.html`, `footer.html`, `google-tag.html`).
  - `assets/`: Global stylesheet (`assets/css/pirago-theme.css`), script (`assets/js/pirago.js` handling dark mode, mobile menu, and real-time table filtering), and logos/icons.
- **Content Organization**:
  - `index.html`: Portal homepage listing latest critical incidents, recent monthly reports, and links to runbooks.
  - `monthly/`: Monthly threat reports (`YYYY-mm.html`, e.g., `2026-10.html`).
  - `gmo/`: Incident reports for major external security crises (e.g., `gmo_onamae_security_incident_report.html`).
  - `php-cve-2026-109618-109619/`: Dedicated technical runbooks in Markdown for incident response and patching.
  - `monthly/template.html` & `_templates/monthly-template.html`: Base template for new monthly reports.
  - `monthly/RULES.md`: Authoritative specification for monthly report structure and workflow.

## Report Authoring & Publishing Workflow

When creating or modifying security reports, strictly follow `monthly/RULES.md`:

1. **Create New Monthly Report**:
   - File location: `monthly/YYYY-mm.html` (e.g., `monthly/2026-11.html`).
   - Copy structure from `monthly/template.html`.
   - Include required Front Matter at the top:
     ```yaml
     ---
     layout: default
     title: "Báo cáo bảo mật tháng MM/YYYY"
     description: "Mô tả tóm tắt rủi ro..."
     category: "Báo cáo định kỳ"
     ---
     ```

2. **Table & Content Standards**:
   - Use standard table format with columns: `Thành phần`, `Bản tin / Tóm tắt`, `Mức độ`, `Ảnh hưởng tới hệ thống nào`, `Cần làm gì`.
   - Maintain the `<div class="table-filter-bar">` input (`#tableFilterInput`) at the top of the report to enable client-side keyword filtering.
   - Use standard severity badges:
     - `<span class="badge crit">Nghiêm trọng</span>`
     - `<span class="badge high">Cao</span>`
     - `<span class="badge med">Trung bình</span>`
     - `<span class="badge low">Thấp</span>`
   - Core technology focus areas:
     - **Infrastructure**: AWS, GCP
     - **Languages & Runtimes**: NodeJS, PHP, Java, .NET, JavaScript
     - **Frameworks**: Next.js, Nuxt, Quasar, Laravel, Spring Boot
     - **Browsers & Package Registries**: Chrome/V8, npm, Composer, Maven

3. **Required Cross-File Synchronization**:
   Whenever a new monthly report is added:
   - `index.html`: Add a summary card under `.reports-list` highlighting key CVEs and actions.
   - `_includes/header.html`: Add the new month to the dropdown menu under `#piragoNav` (and move the `<span class="badge-new">Mới</span>` badge to the newest report).
   - `_includes/footer.html`: Add the report link under the "Báo Cáo An Ninh" column.

## Deployment & Common Commands

- **Check Working Tree**:
  ```bash
  git status
  git diff
  ```
- **Deploy**:
  Commit changes and push directly to the `main` branch. GitHub Pages automatically compiles Jekyll and deploys to `security-news.pirago.vn`:
  ```bash
  git add <changed-files>
  git commit -m "add monthly security report YYYY-mm"
  git push origin main
  ```
