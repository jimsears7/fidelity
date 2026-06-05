# Test Plan — Fidelity Stock Plan Services

This document is a concise, high-level test plan for the Fidelity "Stock Plan Services" landing page. It lists five focused test areas with drill-down checks that can be turned into Playwright tests or manual test cases.

## 1. Page content and structure

### Objective: Verify the page presents the expected messaging and structural sections

- Checks:
  - Confirm the page title and hero copy reference "Stock Plan Services" or similar brand text.
  - Verify the presence of sections: "Invest on your own", "Work with us", "Resources", and "FAQs".
  - Verify that each section heading is visible and matches approved copy.
  - Validate images and icons load (HTTP 200) and no broken images appear.

## 2. Navigation and links

### Objective: Ensure navigation and calls-to-action point to correct destinations

- Checks:
  - Primary CTAs (e.g. "Log in" / "Log In Required") redirect to the Fidelity login domain.
  - Footer and resource links point to the correct pages and do not return 4xx/5xx.
  - External links open as expected and include correct target attributes.
  - Verify expected anchor targets exist for in-page navigation (if any).

## 3. Authentication and access flow

### Objective: Validate gating and redirect behavior for protected account actions

- Checks:
  - CTAs that require authentication redirect to `digital.fidelity.com` with correct return path.
  - Unauthenticated users do not see account-specific content.
  - Login redirect preserves the intended destination after authentication.
  - Test common negative flows (expired session, unauthorized resource).

## 4. API / integration and data-driven behavior

### Objective: Identify and verify critical network calls and handle degraded responses

- Checks:
  - Capture and validate key API endpoints used by the page (identify in Network tab).
  - Assert API contract (status code, JSON schema, required fields) for critical endpoints.
  - Verify UI fallback behavior when an API returns an error or unexpected payload.
  - For API-driven UI flows, capture the request payload and use it to build a standalone API test.

## 5. Cross-device, performance, and accessibility

### Objective: Confirm the page renders correctly across viewports and meets accessibility basics

- Checks:
  - Responsive verification: desktop, tablet, and mobile view widths show core content.
  - Basic accessibility checks: keyboard navigation, ARIA labels for interactive controls, and text contrast.
  - Performance sanity checks: key interactions (page load, primary CTA) complete within an agreed threshold.
  - Capture screenshots and traces for any failing visual or performance assertions.

---

## Files and commands

- Relevant repo files:
  - [playwright.config.ts](playwright.config.ts) — Playwright config and `baseURL`.
  - [tests/](tests/) — location to add smoke or detailed tests.
  - [data/](data/) — place shared response fixtures and expected data.

### Quick smoke run

Run the Playwright smoke tests and open the HTML report:

```bash
npx playwright test --reporter=list
npx playwright show-report
```

---

If you want, I can now: 1) create smoke test skeletons under `tests/` for each area, or 2) open a PR for this file.
