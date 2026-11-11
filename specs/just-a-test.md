# Green "Test" button

status: todo
created: 2026-11-11
type: feat
depends-on: none

## Goal
Add a green button labelled "Test" to the page, so the user can see a new visible control on the site. Done means the button appears in the page, is green, and is labelled "Test", without changing any existing behavior.

## Context
- `index.html`: the "Try It Out" section holds a `.button-row` div with `#actionButton` ("Click me") and `#resetButton` (class `secondary`, "Reset"). The new button goes in this row.
- `styles.css`: the generic `button` rule uses `var(--accent)` (blue `#2f80ed`) with white text, `border-radius: 8px`, `padding: 10px 20px`, and a hover/focus treatment. `button.secondary` overrides it. A green variant follows the same shape with a green background.
- `script.js`: wires `#actionButton` and `#resetButton` only. The new button is not wired.
- The repository has no test suite. CI (`.github/workflows/ci.yml`) runs htmlhint on `*.html`, stylelint on `*.css`, and `node --check script.js`.

## Acceptance criteria
- [ ] C1. When the page loads, the system shall show a button whose visible text is exactly "Test" inside the "Try It Out" button row.
- [ ] C2. The "Test" button shall have a green background, distinct from the blue accent used by "Click me", with white text that is readable on it.
- [ ] C3. The "Test" button shall use the same size, padding and border radius as the existing buttons, and show the same hover and keyboard-focus feedback.
- [ ] C4. When the user clicks "Test", the system shall leave the click counter, the document title and the other buttons unchanged.
- [ ] C5. The existing "Click me" and "Reset" buttons and the counter shall behave as before.
- [ ] C6. The HTML and CSS shall pass the repository's htmlhint and stylelint checks, and `script.js` shall pass `node --check`.

## Out of scope
- Any action, handler or state attached to the "Test" button.
- Changing the page's other colors, layout or copy.
- Dark-mode-specific green tuning beyond what the shared styles already do.

## Decisions & assumptions
- "Anywhere in the app" → placed in the "Try It Out" button row, the only place in the page that already holds buttons. Why: the request gives no exact spot, and a sibling of the existing buttons is the least surprising place. The user can ask for a different spot in a later turn. Shapes C1.
- No click behavior → the brief names only the button. Why: an unspecified action would be guessing. Shapes C4.
- Green as a new CSS variant (e.g. `button.success`) rather than changing `--accent`. Why: the existing blue accent is used by other elements (tagline, secondary button) and must stay. Shapes C2 and C3.
- Depends on no other run: no other runs are in progress in this repository.

## Verification
- Open `index.html` in a browser: a green "Test" button appears in the "Try It Out" row, next to "Click me" and "Reset", and clicking it leaves the counter at its previous value.
