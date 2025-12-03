# MS Clarity Integration Code

## 🔑 Clarity Project ID
```
ufq3clrf2z
```

## 📝 Installation Script

### Option 1: Direct HTML Integration
Add this code to your `<head>` tag or before closing `</body>`:

```html
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/ufq3clrf2z";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ufq3clrf2z");
</script>
```

### Option 2: React/TypeScript Integration (Current)
Already implemented in `/utils/clarity.ts` and auto-initialized in `/App.tsx`

```typescript
// utils/clarity.ts
export function initClarity(): void {
  if (typeof window === 'undefined') return;
  if (window.clarity) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/ufq3clrf2z";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ufq3clrf2z");
  `;
  document.head.appendChild(script);
}
```

## ✅ Verification

After deployment, check:

1. **Console Log**
   ```
   ✅ MS Clarity initialized
   📊 Clarity event: page_view prelanding
   ```

2. **Network Tab**
   Look for requests to: `https://www.clarity.ms/tag/ufq3clrf2z`

3. **Clarity Dashboard**
   - Go to: https://clarity.microsoft.com/
   - Check for active sessions
   - Verify events appear in real-time

## 🎯 Test Events

Once live, these events should appear in Clarity:

### Page Load
```javascript
clarity("set", "page_view", "prelanding")
```

### Button Click
```javascript
clarity("set", "cta_main_continuar_click", true)
```

### Scroll
```javascript
clarity("set", "scroll_hero_25", 25)
clarity("set", "scroll_hero_50", 50)
clarity("set", "scroll_hero_75", 75)
clarity("set", "scroll_hero_100", 100)
```

### Behavior
```javascript
clarity("set", "rage_click_cta_main", true)
clarity("set", "hesitation_main_continuar", 2500)
clarity("set", "exit_intent", true)
```

### Conversion
```javascript
clarity("set", "redirect_to_offer", {
  timestamp: "2025-12-03T...",
  page: "/landing"
})
```

## 🔍 Debugging

If events not appearing:

1. Check script loaded:
   ```javascript
   typeof window.clarity === 'function' // should be true
   ```

2. Manually trigger test event:
   ```javascript
   window.clarity("set", "test_event", "working")
   ```

3. Check browser console for errors

4. Verify Clarity project ID is correct

## 📊 Dashboard Access

**URL**: https://clarity.microsoft.com/projects/view/ufq3clrf2z/

Features enabled:
- ✅ Heatmaps (Click & Scroll)
- ✅ Session Recordings
- ✅ Custom Events
- ✅ Insights & Analytics

---

**Note**: Clarity data appears with ~2-5 minute delay in dashboard during initial setup. After 24h, real-time data is available.
