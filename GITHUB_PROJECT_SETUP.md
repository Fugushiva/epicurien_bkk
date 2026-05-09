# Épicurien Bakery — GitHub Project Setup

## Project Status
✅ **24 GitHub Issues created** across 7 phases  
✅ **7 GitHub Labels created** (phase-0 through phase-7)  
📍 **Repository:** https://github.com/Fugushiva/epicurien_bkk

---

## Issues by Phase

### Phase 0: Setup (5 issues)
- [x] [Phase 0-1] Install npm dependencies (#1)
- [x] [Phase 0-2] Configure Tailwind CSS v4 with design tokens (#2)
- [x] [Phase 0-3] Setup next-intl 3 with EN/FR/TH locales (#3)
- [x] [Phase 0-4] Preload critical web fonts (#4)
- [x] [Phase 0-5] Build root layout with Lenis init (#5)

### Phase 1: Layout & Navigation (5 issues)
- [x] [Phase 1-1] Build Navbar component (#6)
- [x] [Phase 1-2] Build Footer component (#7)
- [x] [Phase 1-3] Build LangSwitcher dropdown (#8)
- [x] [Phase 1-4] Create usePreferReducedMotion hook (#9)
- [x] [Phase 1-5] Create useWindowSize and responsive hooks (#10)

### Phase 2: Homepage Sections (6 issues)
- [x] [Phase 2-1] Build Hero section (#11)
- [x] [Phase 2-2] Build AwardBand marquee section (#12)
- [x] [Phase 2-3] Build StoryChef parallax section (#13)
- [x] [Phase 2-4] Build PullQuote section (#14)
- [x] [Phase 2-5] Build StoryGeste grid section (#15)
- [x] [Phase 2-6] Build CroissantBar showcase (#16)

### Phase 3: Pages (4 issues)
- [x] [Phase 3-1] Build Menu page (#17)
- [x] [Phase 3-2] Build Visit page with location/hours (#18)
- [x] [Phase 3-3] Build Press page with contact form (#19)
- [x] [Phase 3-4] Add SEO metadata and breadcrumbs (#20)

### Phase 4: i18n (1 issue)
- [x] [Phase 4-1] Complete i18n translations and testing (#21)

### Phase 5: Animations (1 issue)
- [x] [Phase 5-1] Implement animations (GSAP, Framer, Lenis) (#22)

### Phase 6: SEO & Performance (1 issue)
- [x] [Phase 6-1] Optimize SEO, Core Web Vitals, Lighthouse 95+ (#24)

### Phase 7: Press API (1 issue)
- [x] [Phase 7-1] Build press contact form and API (#23)

---

## GitHub Labels (Color-coded by Phase)

| Label | Color | Issues |
|-------|-------|--------|
| phase-0 | #1f6feb (Blue) | 5 |
| phase-1 | #0969da (Dark Blue) | 5 |
| phase-2 | #54aeff (Light Blue) | 6 |
| phase-3 | #79c0ff (Lighter Blue) | 4 |
| phase-4 | #58a6ff (Sky Blue) | 1 |
| phase-5 | #79c0ff (Light Cyan) | 1 |
| phase-6 | #7ee787 (Light Green) | 1 |
| phase-7 | #d1f5c4 (Lighter Green) | 1 |

---

## Next Steps: Project Board Setup

To set up a Kanban board in GitHub Projects:

1. **Go to your repository** → https://github.com/Fugushiva/epicurien_bkk
2. **Click "Projects"** tab
3. **Click "New project"**
4. **Name:** "Épicurien Bakery Build"
5. **Template:** "Table" (or "Board" for Kanban)
6. **Add custom fields:**
   - Phase (single select: Phase 0-7)
   - Priority (single select: High, Medium, Low)
   - Status (Status field: Todo, In Progress, Done)

7. **Bulk add issues** from the repository

### Recommended Board Setup (Kanban)

**Columns:**
1. **Backlog** — All new issues (default)
2. **Todo** — Ready to start (phase-specific)
3. **In Progress** — Currently being worked on
4. **Review** — Waiting for code review
5. **Done** — Completed and merged

**Automation:**
- Move to "Done" when issue is closed
- Move to "In Progress" when issue is assigned
- Archive completed issues after 30 days

---

## How to Use This Setup

### Starting Work on a Phase
1. Open GitHub Issues filtered by phase label
2. Pick the first unstarted issue (marked with "Todo" column)
3. Assign to yourself
4. Move to "In Progress"
5. Create a feature branch: `feature/[issue-name]`
6. Commit message format: `feat: [Phase X-Y] description`
7. When done, create a PR and link the issue
8. After merge, issue closes automatically (via `Closes #N` in PR body)

### Example
```bash
# Pick issue #1 from Phase 0
git checkout -b feature/phase-0-1-install-deps

# After work...
git commit -m "feat: [Phase 0-1] install all npm dependencies"
git push origin feature/phase-0-1-install-deps

# Create PR with:
# Title: [Phase 0-1] Install npm dependencies
# Body: Closes #1
```

### Tracking Progress
- Use GitHub's project board to visualize phases
- Filter by label to see phase-specific issues
- Review issue acceptance criteria before marking Done

---

## File Cleanup

Temporary issue body files created during setup:
- `.tmp_issue_body_*.txt` (can be deleted)
- `.tmp_phase*.txt` (can be deleted)

Run:
```bash
rm .tmp_*.txt
```

---

**Last Updated:** May 9, 2026  
**Total Issues:** 24  
**Ready to Start:** Phase 0 (all issues open and ready)
