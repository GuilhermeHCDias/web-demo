# Testing Guide for Web Demo

This document provides comprehensive guidance for testing the Web Demo application across different scenarios and platforms.

## Overview

The Web Demo is a minimal but feature-complete single-page application. This guide covers manual testing procedures, automated test scenarios, and quality assurance checkpoints.

## Manual Testing Procedures

### 1. Basic Functionality Tests

Start with these fundamental checks to ensure core features work as intended:

| Test Case | Expected Outcome | Status |
|-----------|------------------|--------|
| Click "Click me" button | Counter increments by 1 | ✓ |
| Click button multiple times | Counter continues incrementing | ✓ |
| Click "Reset" button | Counter resets to 0 | ✓ |
| Page refresh after clicks | Counter displays 0 | ✓ |

### 2. Milestone Testing

The application includes celebration messages at specific milestones:

```
At 10 clicks: "Nice! 10 clicks and counting."
At 20 clicks: "Nice! 20 clicks and counting."
... and so on for every 10-click interval
```

**Test Procedure:**
1. Click the button exactly 9 times (verify standard message)
2. Click once more to reach 10 (verify celebration message)
3. Continue clicking to verify pattern repeats at 20, 30, 40, etc.

### 3. Visual & Accessibility Tests

#### Browser Compatibility
- **Chrome/Chromium**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Mobile**: iOS Safari, Chrome Mobile (latest versions)

#### Color Scheme Testing
- Light mode: Verify readable contrast ratios (WCAG AA minimum)
- Dark mode: Test with `prefers-color-scheme: dark` enabled
- Manual toggle: Verify styles apply correctly

#### Keyboard Navigation
- **Tab key**: Navigate through all focusable elements
- **Enter key**: Activate buttons from keyboard focus
- **Focus indicators**: Ensure visible outline at minimum 2px

### 4. Performance Benchmarks

Track these metrics during testing:

| Metric | Target | Tool |
|--------|--------|------|
| Page Load Time | < 500ms | DevTools Lighthouse |
| Interaction Latency | < 100ms | DevTools Performance tab |
| Button Click Response | Immediate | Manual observation |

## Automation Testing Patterns

### JavaScript Console Checks

Open the browser console and verify:

```javascript
// Check DOM element existence
console.assert(document.getElementById('actionButton'), 'Action button should exist');
console.assert(document.getElementById('resetButton'), 'Reset button should exist');
console.assert(document.getElementById('counter'), 'Counter element should exist');
```

### Event Listener Verification

Verify click events fire correctly:

```javascript
// Observe events in console
const btn = document.getElementById('actionButton');
btn.addEventListener('click', () => console.log('Tracked click event'));
```

## Browser DevTools Checklist

- [ ] Console: No JavaScript errors or warnings
- [ ] Network tab: All assets load successfully (< 1s total)
- [ ] Lighthouse audit: Score above 90 for all categories
- [ ] Accessibility audit: No WCAG 2.1 violations
- [ ] Performance metrics: FCP < 1s, LCP < 1.5s

## Testing Environments

### Local Development
```bash
# Simply open index.html in your browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

### CI/CD Integration
- PRs automatically run accessibility and performance checks
- Lighthouse reports attached to PR comments
- Deploy preview available for each PR

## Known Issues & Workarounds

| Issue | Platform | Workaround |
|-------|----------|-----------|
| Button hover not visible | Mobile | Use active state instead |
| Dark mode not detecting | Older browsers | Manually set in DevTools |

## Testing Checklist for Release

Before merging any PR:

- [ ] All manual tests pass
- [ ] No console errors in DevTools
- [ ] Lighthouse score maintained or improved
- [ ] Accessibility audit passes
- [ ] Works in latest 2 versions of Chrome, Firefox, Safari
- [ ] Mobile responsiveness verified
- [ ] Performance benchmarks met

## Continuous Monitoring

After deployment, monitor:

- Real user monitoring (RUM) data
- Error tracking dashboards
- Performance metrics from CDN
- User interaction analytics

---

*Last Updated: 2026-07-25*
*Maintained by: Web Demo Team*
