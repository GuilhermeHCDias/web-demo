import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync("index.html", "utf8");
const css = readFileSync("styles.css", "utf8");
const js = readFileSync("script.js", "utf8");

// Returns the body of the first CSS rule whose selector matches exactly.
function ruleBody(selector, source = css) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(new RegExp(`(^|\\})\\s*${escaped}\\s*\\{([^}]*)\\}`, "m"));
  return match ? match[2] : null;
}

// Returns every CSS rule body inside the first @media block whose query contains `query`.
function mediaBody(query) {
  const match = css.match(new RegExp(`@media\\s*\\(${query}\\)\\s*\\{([\\s\\S]*?)\\n\\}`));
  return match ? match[1] : null;
}

test("C1: a purple button sits in the Try It Out section, at least 2.5rem tall text", () => {
  const section = html.slice(html.indexOf("<h2>Try It Out</h2>"), html.indexOf("<h2>About</h2>"));
  assert.match(section, /<button[^>]*id="purpleButton"[^>]*class="[^"]*purple-button[^"]*"/);
  const body = ruleBody(".purple-button");
  assert.ok(body, ".purple-button rule missing");
  const size = body.match(/font-size:\s*([\d.]+)rem/);
  assert.ok(size && parseFloat(size[1]) >= 2.5, "font-size must be at least 2.5rem");
});

test("C2: clicking the purple button increments clicks and renders the counter", () => {
  assert.match(js, /getElementById\("purpleButton"\)/);
  assert.match(
    js,
    /purpleButton\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*clicks \+= 1;\s*render\(\);\s*\}\)/
  );
});

test("C3: purple is a custom property with the same value in light and dark mode", () => {
  const root = css.match(/:root\s*\{([^}]*)\}/)[1];
  assert.match(root, /--purple:\s*#7c3aed/i);
  const dark = css.match(/prefers-color-scheme:\s*dark\)\s*\{[\s\S]*?:root\s*\{([^}]*)\}/);
  assert.ok(!dark || !/--purple:/.test(dark[1]), "--purple must not change in dark mode");
  assert.match(ruleBody(".purple-button"), /background:\s*var\(--purple\)/);
});

test("C4: focus outline uses the purple, and hover keeps the existing lift only", () => {
  const focus = ruleBody(".purple-button:focus-visible");
  assert.ok(focus, ".purple-button:focus-visible rule missing");
  assert.match(focus, /outline:\s*2px solid var\(--purple\)/);
  assert.equal(ruleBody(".purple-button:hover"), null, "hover must reuse the existing button:hover");
});

test("C5: Click me and Reset keep their ids, behavior and secondary styling", () => {
  assert.match(html, /<button id="actionButton" type="button">Click me<\/button>/);
  assert.match(html, /<button id="resetButton" type="button" class="secondary">Reset<\/button>/);
  assert.match(js, /actionButton/);
  assert.match(js, /resetButton\.addEventListener\("click"/);
  assert.match(ruleBody("button.secondary"), /color:\s*var\(--accent\)/);
});

test("C6: below 640px the purple button spans the full width", () => {
  const media = mediaBody("max-width:\\s*640px");
  assert.ok(media, "@media (max-width: 640px) block missing");
  assert.match(media, /\.purple-button\s*\{[^}]*width:\s*100%/);
});
