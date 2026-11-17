# College Town Home Sales

An English website comparing median sale prices and sale counts by city and state in the College-town home sales dataset. Uses plain HTML, CSS and JavaScript, with no libraries or build step.

## Review and publishing

`index.html` is the homepage. The chart is a semantic table with horizontal bars, sorted by unrounded median sale price from highest to lowest. Prices display in whole US dollars. The layout adapts to narrow screens and includes data loading and failure messages.

The existing `.github/workflows/pages.yml` publishes the repository root whenever main is pushed. It has not been changed. Enable GitHub Pages with **Settings → Pages → Source → GitHub Actions** if needed. After merging, review the **Publish site to GitHub Pages** workflow in Actions, then open the deployment link it supplies. No local installation is required to review the published page.

## Data notes

- Source: `data/college_town_home_sales.csv`. All five original dataset files are preserved.
- Exclude `sale_price < 10000` from both medians and counts; include exactly $10,000. No upper cutoff. This excludes 40 of 35,442 rows and retains 35,402 sales across 18 city/state groups and 11 states.
- Count every qualifying row. Keep repeated addresses and do not deduplicate by address. Group by the pair `city`, `state`.
- Median is the middle sorted price, or the average of the two middle prices for even groups. Preserve exact medians in the summary; round only for display. Pittsboro's $876,985.50 displays as $876,986.
- No filtering by dates, home type, size, taxes or other attributes; this page does not calculate days on market or price per square foot. ZIP, FIPS and parcel fields remain strings when reading the CSV.
- Values describe the collection, not every sale in a market, and are not verified against county records.

## Reproduce the summary

For maintainers with Python 3, run `python scripts/summarize_sales.py` from the repository root. It uses only the standard library and writes `data/city_sales_summary.json`. Commit both the script and generated summary. GitHub Pages serves this committed summary as-is; Python is not needed to serve the site.

## Verification

Independent CSV grouping and middle-value checks matched every generated city's count and median. Key checks after the $10,000 rule:

| City | Qualifying sales | Median sale price |
|---|---:|---:|
| Champaign, IL | 2,285 | $240,000 |
| Urbana, IL | 1,131 | $229,900 |

Chromium checks covered all 18 rendered rows, descending ranking, whole-dollar formatting, repository-relative paths, desktop and mobile widths (1440, 375 and 320 pixels), JavaScript errors, and fetch failure feedback. SHA-256 checks confirmed the original five data files were unchanged.

## Tools

OpenAI Codex; Python standard library for summary generation and independent calculations; plain browser JavaScript and CSS; Playwright with system Chromium for browser verification.

## Citation

College-town home sales dataset, version 1.0 (2026). University of Illinois-Deloitte Foundation Center for Business Emerging Technologies. Data collected March 2026.
