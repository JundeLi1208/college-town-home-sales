# Agent log

Add a dated entry each time you work with your AI coding agent, with the newest entry at the bottom. Each entry records what you asked the agent, what it produced, and what you checked or changed. Paste your key prompts in exactly as you typed them. Include at least one time the agent got something wrong, and how you caught it.

Copy this outline for each entry:

```markdown
## YYYY-MM-DD: What you worked on

- **Asked:** "Paste your prompt here."
- **Agent produced:** What it made or changed.
- **Checked or changed:** How you checked it, and what you fixed.
```

## 2026-11-16: College Town Home Sales homepage

- **Asked:**
  > Read AGENTS.md and docs/data_description_sheet.md first.\
  > \
  > Replace the placeholder homepage with an English website titled “College Town\
  > Home Sales.” Use data/college_town_home_sales.csv to calculate the median sale\
  > price and sale count for each city and state. Exclude sales below $10,000 and\
  > explain this rule on the page. Show the results in a horizontal bar chart sorted\
  > by median sale price, with prices displayed in whole US dollars.\
  > \
  > Use plain HTML, CSS, and JavaScript with the existing GitHub Pages workflow.\
  > Do not modify the five original data files. Verify the counts and medians for\
  > Champaign and Urbana against the CSV, report the results, and record the session\
  > in AGENT_LOG.md.
- **Approval:** "Yes, please proceed with the plan. Build and test the page, then show me the changes so I can review them before merging."
- **Agent produced:** English homepage, responsive CSS, browser JavaScript, reproducible standard-library Python CSV summary generator, committed-format JSON summary, and updated README. Chart groups by city/state, sorts descending by exact median, displays whole US dollars and qualifying sale counts, and explains the inclusive $10,000 minimum. Existing GitHub Pages workflow retained; no merging or production publishing performed.
- **Checked or changed:** Independently recomputed all city counts and medians from CSV. Champaign, IL: 2,285 sales, middle price $240,000, median $240,000. Urbana, IL: 1,131 sales, middle price $229,900, median $229,900. Total: 35,402 retained, 40 excluded. Verified 18 rendered rows, ranking and rounded prices in Chromium, repository-subdirectory paths, desktop/mobile layouts, absence of JavaScript errors, and useful fetch failure feedback. Visually inspected desktop and mobile screenshots. SHA-256 checks matched all five original dataset files. JavaScript syntax check passed.
- **Agent mistake and correction:** Initially looked for AGENTS.md in /workspace rather than the repository subdirectory; the missing-file error exposed the mistake, and the agent located and read both required documents before analysis. The first browser launch also assumed a downloaded Playwright Chromium; switched to installed /usr/bin/chromium. A test initially split row text on tabs and failed because browser text includes newlines; corrected it to inspect individual table cells, after which all checks passed.
- **Review handoff:** Displayed desktop/mobile Chromium screenshots in chat. Shared Chrome preview could not open because its browser runtime was unavailable. Changes remain in the working tree for review, with no merge or deployment. Local scratch files are excluded through .gitignore.

## 2026-11-16: Prepare pull request for review

- **Asked:** "Please create a pull request for the completed changes in JundeLi1208/college-town-home-sales, targeting main. Leave it open for my review and send me the PR link."
- **Agent produced:** Prepared the completed website changes on `codex/college-town-home-sales` for a pull request targeting `main`.
- **Checked or changed:** Reviewed repository instructions, confirmed the expected changed files, and ran `git diff --check`. Original dataset files and Pages workflow are excluded from the change. Pull request will remain open for user review without merging.
