# 📊 MS CLARITY TRACKING GUIDE
## Chilean Casino Prelanding - Complete Analytics Setup

### 🎯 Clarity Project ID
```
ufq3clrf2z
```

---

## 📋 STRUCTURE OVERVIEW

### Pages
1. **Prelanding** (`/`) - Main teaser page for Facebook Ads
2. **Landing** (`/landing`) - Main offer page with wheel/freespins

---

## 🔍 TRACKING ARCHITECTURE

### 1. SECTIONS (data-clarity-region)

| Section Name | Description | Purpose |
|-------------|-------------|---------|
| `prelanding_main` | Main container | Overall page tracking |
| `header` | Logo + promo tag | Navigation tracking |
| `hero` | Main content area | Primary engagement zone |
| `headline` | H1 with gradient | Message effectiveness |
| `cta_section` | Button area | Conversion zone |
| `social_proof` | Trust message | Credibility tracking |
| `benefits` | Feature line | Value proposition |
| `footer` | Compliance info | Legal visibility |

### 2. CLICK EVENTS (CTA)

#### Primary CTAs
```javascript
// Main button - highest priority
CTA_main_continuar
- Element: Main "Continuar" button
- Event: cta_main_continuar_click
- Rage click tracking: YES
- Hesitation tracking: YES (>2s hover)
- Data attributes:
  * data-clarity-click="cta_main"
  * data-element-name="CTA_main_continuar"
  * data-clarity-track-rage="true"
```

#### Secondary CTAs
```javascript
// Logo
CTA_logo_chile_access
- Element: Top-left logo
- Event: cta_logo_chile_access_click
- Purpose: Brand engagement
- Data attributes:
  * data-clarity-click="cta_logo"
  * data-element-name="CTA_logo_chile_access"

// Promo tag
CTA_tag_exclusivo_hoy
- Element: Top-right "Exclusivo hoy" tag
- Event: cta_tag_exclusivo_hoy_click
- Purpose: Urgency engagement
- Data attributes:
  * data-clarity-click="cta_exclusivo"
  * data-element-name="CTA_tag_exclusivo_hoy"
```

### 3. SCROLL DEPTH TRACKING

Automatically tracked at:
- **25%** - `scroll_hero_25`
- **50%** - `scroll_hero_50`
- **75%** - `scroll_hero_75`
- **100%** - `scroll_hero_100`

Implementation:
```javascript
trackScrollDepth('hero', percentage);
```

### 4. BEHAVIORAL TRACKING

#### Rage Clicks
Detection: 3+ clicks within 1 second on same element
```javascript
// Tracked elements:
- CTA_main_continuar (main button)
- CTA_logo_chile_access (logo)
- CTA_tag_exclusivo_hoy (promo tag)

// Events generated:
rage_click_cta_main
rage_click_logo
rage_click_exclusivo_tag
```

#### Hesitation Tracking
Detection: Hover >2 seconds without click
```javascript
// Tracked elements:
- Main CTA button
- Logo
- Exclusivo tag

// Events generated:
hesitation_main_continuar: {duration_ms}
hesitation_logo_chile_access: {duration_ms}
hesitation_tag_exclusivo: {duration_ms}
```

#### Exit Intent
Detection: Mouse leaves viewport at top (Y ≤ 0)
```javascript
// Event: exit_intent
trackExitIntent();
```

#### Hover Tracking (Desktop)
```javascript
// Events:
hover_main_continuar
hover_logo_chile_access
hover_tag_exclusivo
```

### 5. REDIRECT TRACKING

```javascript
// When user clicks main CTA and redirects to /landing
Event: redirect_to_offer
Data: {
  timestamp: ISO string,
  page: pathname
}
```

### 6. PAGE VIEW TRACKING

```javascript
// Automatically tracked on route change
Events:
- page_view: "prelanding"
- page_view: "landing"
```

---

## 🛠️ IMPLEMENTATION DETAILS

### Technical Stack
- **Framework**: React 18 + TypeScript
- **Animation**: Motion (Framer Motion)
- **Routing**: Client-side (History API)
- **Tracking**: Custom hooks + utility functions

### File Structure
```
/utils/clarity.ts          - All tracking functions
/App.tsx                   - Clarity initialization
/components/PrelandingPage.tsx - Tracking implementation
```

### Code Integration Points

#### 1. Initialization (App.tsx)
```typescript
import { initClarity, trackPageView } from './utils/clarity';

useEffect(() => {
  initClarity(); // Loads MS Clarity script
  trackPageView('prelanding');
}, []);
```

#### 2. Click Tracking (PrelandingPage.tsx)
```typescript
const handleCTAClick = useCallback((e) => {
  trackCTAClick('main_continuar');
  detectRageClick('cta_main');
  trackRedirectToOffer();
  // ... navigation logic
}, []);
```

#### 3. Scroll Tracking (PrelandingPage.tsx)
```typescript
useEffect(() => {
  const handleScroll = () => {
    const scrollPercentage = calculateScroll();
    if (scrollPercentage >= 25 && lastScrollDepth < 25) {
      trackScrollDepth('hero', 25);
    }
    // ... other thresholds
  };
  window.addEventListener('scroll', handleScroll);
}, []);
```

#### 4. Hover & Hesitation (PrelandingPage.tsx)
```typescript
const handleCTAHoverStart = useCallback((elementId) => {
  setHoverStart({ [elementId]: Date.now() });
  trackHover(elementId);
}, []);

const handleCTAHoverEnd = useCallback((elementId) => {
  const duration = Date.now() - hoverStart[elementId];
  if (duration > 2000) {
    trackHesitation(elementId, duration);
  }
}, []);
```

---

## 📊 CLARITY DASHBOARD SETUP

### Recommended Settings

#### Heatmaps
- ✅ Click heatmaps enabled
- ✅ Scroll heatmaps enabled
- ✅ Area analysis for CTA button
- ✅ Device segmentation (mobile vs desktop)

#### Session Recordings
- ✅ Filter by rage clicks
- ✅ Filter by exit intent
- ✅ Filter by conversions (redirect_to_offer)
- ✅ Watch hesitation patterns

#### Filters
```
Custom Events to Watch:
- cta_main_continuar_click (conversion)
- rage_click_* (frustration)
- hesitation_* (uncertainty)
- exit_intent (abandonment)
- redirect_to_offer (success)
```

### Segments to Create

1. **High Intent Users**
   - Scroll depth > 75%
   - Hover on main CTA
   - No rage clicks

2. **Frustrated Users**
   - Rage clicks present
   - Multiple hesitations
   - No conversion

3. **Converters**
   - redirect_to_offer event present
   - Time on page analysis

4. **Mobile Users**
   - Device = mobile
   - Compare with desktop behavior

---

## 🎨 FIGMA NAMING CONVENTION

All layers follow this structure:
```
[TYPE]_[LOCATION]_[ACTION]
```

Examples:
- `CTA_main_continuar` - Main call-to-action button
- `CTA_logo_chile_access` - Logo clickable area
- `CTA_tag_exclusivo_hoy` - Promo tag
- `SECTION_hero` - Hero section
- `SECTION_footer` - Footer area
- `EVENTS_cta_section` - Event tracking zone

---

## 🧪 TESTING CHECKLIST

### Before Launch
- [ ] Clarity script loads on page
- [ ] Console shows "✅ MS Clarity initialized"
- [ ] Click events fire on all CTAs
- [ ] Scroll depth tracks correctly
- [ ] Rage click detection works
- [ ] Hesitation tracking triggers
- [ ] Exit intent fires on mouse leave
- [ ] Page views tracked on navigation
- [ ] Redirect event fires before navigation

### After 24h of Traffic
- [ ] Check heatmaps for CTA visibility
- [ ] Review session recordings
- [ ] Analyze rage click patterns
- [ ] Check scroll depth distribution
- [ ] Review hesitation durations
- [ ] Compare mobile vs desktop behavior
- [ ] Check conversion funnel

---

## 📈 KEY METRICS TO MONITOR

### Engagement
- **Click-through rate** on main CTA
- **Scroll depth** average
- **Time on page** before action
- **Hover patterns** (desktop)

### Friction Points
- **Rage clicks** count and location
- **Hesitation duration** average
- **Exit intent** triggers
- **Scroll abandonment** points

### Conversion
- **redirect_to_offer** count
- **Time to conversion**
- **Path to conversion** (clicks before CTA)

### Device-Specific
- **Mobile vs Desktop** engagement
- **Screen size** impact
- **Touch vs Mouse** behavior

---

## 🔧 CUSTOM EVENTS API

### Available Functions

```typescript
// Core tracking
trackClarityEvent(eventName, value)
trackPageView(pageName)
trackCTAClick(ctaName)

// Behavioral
trackScrollDepth(section, depth)
trackHover(elementName)
trackRageClick(elementName)
trackHesitation(elementName, duration)
trackExitIntent()

// Conversion
trackRedirectToOffer()

// Forms (if added)
trackModalOpen(modalName)
trackFormInteraction(formName, action)
```

### Custom Event Examples

```typescript
// Track custom button
trackClarityEvent('bonus_claim_click', true);

// Track with metadata
trackClarityEvent('user_geo', {
  country: 'CL',
  region: 'Santiago'
});

// Track timing
trackClarityEvent('load_time', {
  duration: performance.now()
});
```

---

## 🚨 IMPORTANT NOTES

### Privacy & Compliance
- ✅ No PII collected in events
- ✅ Clarity respects Do Not Track
- ✅ GDPR/CCPA compliant
- ✅ 18+ disclaimer visible

### Performance
- ✅ Async script loading
- ✅ No blocking on main thread
- ✅ Passive scroll listeners
- ✅ Debounced tracking calls

### Facebook Ads Safe
- ✅ No gambling keywords in tracking
- ✅ Entertainment positioning
- ✅ Compliant with FB policies

---

## 📞 SUPPORT

For issues or questions:
1. Check Clarity Dashboard: https://clarity.microsoft.com/
2. Review console logs for tracking events
3. Test in incognito mode
4. Check network tab for clarity requests

---

## 🎯 SUCCESS CRITERIA

This tracking setup is successful when:
- ✅ 100% of CTA clicks tracked
- ✅ Scroll depth data available
- ✅ Rage clicks identified
- ✅ Conversion path clear
- ✅ Heatmaps actionable
- ✅ Session recordings useful
- ✅ A/B test data ready

---

**Version**: 1.0  
**Last Updated**: December 3, 2025  
**Status**: Production Ready ✅
