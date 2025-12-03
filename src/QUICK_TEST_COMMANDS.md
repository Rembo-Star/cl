# ⚡ Quick Test Commands - MS Clarity
## Copy-paste these commands in browser console

---

## 🔍 Check if Clarity is Loaded

```javascript
// Should return true
typeof window.clarity === 'function'
```

**Expected**: `true`  
**If false**: Clarity script didn't load. Check network tab.

---

## 📊 Test Page View Event

```javascript
window.clarity("set", "page_view", "prelanding");
console.log("✅ Page view event sent");
```

**Expected in console**: `✅ Page view event sent`

---

## 🎯 Test Main CTA Click

```javascript
window.clarity("set", "cta_main_continuar_click", true);
console.log("✅ Main CTA click event sent");
```

**Expected**: Event appears in Clarity dashboard under custom events

---

## 📏 Test Scroll Events (All at Once)

```javascript
[25, 50, 75, 100].forEach(depth => {
  window.clarity("set", `scroll_hero_${depth}`, depth);
  console.log(`✅ Scroll ${depth}% event sent`);
});
```

**Expected**: 4 events logged in console

---

## 🔴 Test Rage Click

```javascript
window.clarity("set", "rage_click_cta_main", true);
console.log("🔴 Rage click event sent");
```

**Expected**: Shows up in Clarity as behavioral issue

---

## ⏱️ Test Hesitation

```javascript
window.clarity("set", "hesitation_main_continuar", 2500);
console.log("⏱️ Hesitation event sent (2500ms)");
```

**Expected**: Event with duration value

---

## 🚪 Test Exit Intent

```javascript
window.clarity("set", "exit_intent", true);
console.log("🚪 Exit intent event sent");
```

**Expected**: Tracks potential abandonment

---

## 🎯 Test Redirect Event

```javascript
window.clarity("set", "redirect_to_offer", {
  timestamp: new Date().toISOString(),
  page: window.location.pathname
});
console.log("🎯 Redirect event sent with metadata");
```

**Expected**: Event with timestamp object

---

## 🧪 Test ALL Events at Once

```javascript
// Complete test suite
const testAllEvents = () => {
  console.log("🧪 Starting Clarity events test...\n");
  
  // Check if loaded
  if (typeof window.clarity !== 'function') {
    console.error("❌ Clarity not loaded!");
    return;
  }
  console.log("✅ Clarity loaded\n");
  
  // Page view
  window.clarity("set", "page_view", "prelanding");
  console.log("✅ 1. Page view");
  
  // Click events
  window.clarity("set", "cta_main_continuar_click", true);
  console.log("✅ 2. Main CTA click");
  
  window.clarity("set", "cta_logo_chile_access_click", true);
  console.log("✅ 3. Logo click");
  
  window.clarity("set", "cta_tag_exclusivo_hoy_click", true);
  console.log("✅ 4. Tag click");
  
  // Scroll events
  [25, 50, 75, 100].forEach((depth, i) => {
    window.clarity("set", `scroll_hero_${depth}`, depth);
    console.log(`✅ ${5+i}. Scroll ${depth}%`);
  });
  
  // Behavioral
  window.clarity("set", "rage_click_cta_main", true);
  console.log("✅ 9. Rage click");
  
  window.clarity("set", "hesitation_main_continuar", 2500);
  console.log("✅ 10. Hesitation");
  
  window.clarity("set", "exit_intent", true);
  console.log("✅ 11. Exit intent");
  
  window.clarity("set", "hover_main_continuar", true);
  console.log("✅ 12. Hover");
  
  // Conversion
  window.clarity("set", "redirect_to_offer", {
    timestamp: new Date().toISOString(),
    page: "/landing"
  });
  console.log("✅ 13. Redirect to offer");
  
  console.log("\n🎉 All events sent! Check Clarity dashboard in 2-5 minutes.");
};

testAllEvents();
```

**Expected**: 13 events logged, all sent to Clarity

---

## 🌐 Test in Production

Once deployed, open your production URL and run:

```javascript
// Quick production test
console.log("Clarity Project:", "ufq3clrf2z");
console.log("Clarity loaded:", typeof window.clarity === 'function');
console.log("Current page:", window.location.pathname);

// Send test event
if (window.clarity) {
  window.clarity("set", "production_test", {
    date: new Date().toISOString(),
    url: window.location.href
  });
  console.log("✅ Production test event sent");
}
```

---

## 📊 Check Events in Dashboard

1. Go to: https://clarity.microsoft.com/projects/view/ufq3clrf2z/
2. Click **"Dashboard"**
3. Under **"Custom Events"**, look for:
   - `cta_main_continuar_click`
   - `scroll_hero_*`
   - `rage_click_*`
   - `redirect_to_offer`

---

## 🔧 Debug Common Issues

### Issue: Events not appearing in dashboard

```javascript
// 1. Check script loaded
console.log("Script:", document.querySelector('script[src*="clarity.ms"]') !== null);

// 2. Check function exists
console.log("Function:", typeof window.clarity === 'function');

// 3. Check network requests
// Open Network tab, filter by "clarity.ms"
// Should see requests to collect endpoint

// 4. Send debug event
window.clarity && window.clarity("set", "debug_test", {
  time: Date.now(),
  success: true
});
```

### Issue: Rage clicks not detected

```javascript
// Test automatic rage click detection
let clicks = 0;
const interval = setInterval(() => {
  clicks++;
  console.log(`Click ${clicks}`);
  // Simulate click event that would trigger rage detection
  if (clicks >= 3) {
    window.clarity("set", "rage_click_test", true);
    console.log("🔴 Rage click triggered");
    clearInterval(interval);
  }
}, 200); // 200ms between clicks = 5 clicks/second
```

### Issue: Scroll not tracking

```javascript
// Manual scroll test
window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  console.log(`Scrolled: ${scrolled.toFixed(0)}%`);
  
  if (scrolled >= 25 && scrolled < 26) {
    window.clarity("set", "scroll_manual_25", 25);
    console.log("✅ 25% scroll event");
  }
});
```

---

## 📱 Mobile Testing

For mobile devices, use remote debugging:

**Chrome on Android:**
1. Connect device via USB
2. Open `chrome://inspect`
3. Open your page on device
4. Click "Inspect"
5. Run test commands in console

**Safari on iOS:**
1. Enable Web Inspector on iPhone
2. Connect to Mac
3. Safari → Develop → [Device] → [Page]
4. Run test commands

---

## ⏱️ Timing Test

Test event timing and performance:

```javascript
console.time('clarity-events');

// Send multiple events
window.clarity("set", "timing_test_start", Date.now());

setTimeout(() => {
  window.clarity("set", "timing_test_end", Date.now());
  console.timeEnd('clarity-events');
  console.log("✅ Timing test complete");
}, 100);
```

**Expected**: Events sent in <10ms

---

## 🎯 Conversion Funnel Test

Simulate complete user journey:

```javascript
const simulateJourney = async () => {
  console.log("🎬 Starting user journey simulation...\n");
  
  // 1. Page load
  window.clarity("set", "page_view", "prelanding");
  console.log("1️⃣ User lands on page");
  await new Promise(r => setTimeout(r, 1000));
  
  // 2. Scroll to 25%
  window.clarity("set", "scroll_hero_25", 25);
  console.log("2️⃣ User scrolls down (25%)");
  await new Promise(r => setTimeout(r, 1500));
  
  // 3. Scroll to 50%
  window.clarity("set", "scroll_hero_50", 50);
  console.log("3️⃣ User continues scrolling (50%)");
  await new Promise(r => setTimeout(r, 1000));
  
  // 4. Hover on CTA
  window.clarity("set", "hover_main_continuar", true);
  console.log("4️⃣ User hovers on CTA button");
  await new Promise(r => setTimeout(r, 2500));
  
  // 5. Hesitation (long hover)
  window.clarity("set", "hesitation_main_continuar", 2500);
  console.log("5️⃣ User hesitates (2.5s hover)");
  await new Promise(r => setTimeout(r, 500));
  
  // 6. Click CTA
  window.clarity("set", "cta_main_continuar_click", true);
  console.log("6️⃣ User clicks CTA!");
  await new Promise(r => setTimeout(r, 400));
  
  // 7. Redirect
  window.clarity("set", "redirect_to_offer", {
    timestamp: new Date().toISOString(),
    page: "/landing"
  });
  console.log("7️⃣ User redirected to offer page\n");
  
  console.log("🎉 Journey complete! User converted.");
};

simulateJourney();
```

**Expected**: 7-step journey logged over ~7 seconds

---

## 📊 Batch Event Test

Send multiple events to test dashboard aggregation:

```javascript
// Send 10 conversion events
for (let i = 1; i <= 10; i++) {
  window.clarity("set", `batch_conversion_${i}`, {
    user: `test_user_${i}`,
    timestamp: Date.now()
  });
  console.log(`✅ Batch event ${i}/10 sent`);
}
console.log("🎉 Batch test complete. Check dashboard for aggregation.");
```

---

## 🏆 Final Verification Checklist

Run this before going live:

```javascript
const finalCheck = () => {
  const checks = [
    { name: 'Clarity loaded', test: () => typeof window.clarity === 'function' },
    { name: 'Script present', test: () => document.querySelector('script[src*="clarity.ms"]') !== null },
    { name: 'Project ID correct', test: () => document.querySelector('script[src*="ufq3clrf2z"]') !== null },
    { name: 'Data attributes on CTA', test: () => document.querySelector('[data-clarity-click="cta_main"]') !== null },
    { name: 'Regions marked', test: () => document.querySelector('[data-clarity-region]') !== null }
  ];
  
  console.log("🔍 Final Verification:\n");
  checks.forEach(check => {
    const passed = check.test();
    console.log(`${passed ? '✅' : '❌'} ${check.name}`);
  });
  
  const allPassed = checks.every(c => c.test());
  console.log(`\n${allPassed ? '🎉 All checks passed!' : '⚠️ Some checks failed'}`);
  return allPassed;
};

finalCheck();
```

---

## 📝 Notes

- Events appear in dashboard with **2-5 minute delay** initially
- After 24h, events are near real-time
- Use browser console's **Preserve log** option to see all events
- Clear cache if events seem stuck
- Test on both **mobile and desktop**

---

**Quick Links:**
- Dashboard: https://clarity.microsoft.com/projects/view/ufq3clrf2z/
- Test Page: Open `/test-clarity-events.html` in browser
- Docs: See `/TRACKING_GUIDE.md`

---

**Pro Tip**: Bookmark this page for quick access during testing! 🔖
