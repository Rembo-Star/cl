# 🗺️ MS CLARITY - VISUAL TRACKING MAP
## Quick Reference for Designers & Developers

---

## 📐 PAGE STRUCTURE WITH TRACKING ZONES

```
┌─────────────────────────────────────────────────────────────┐
│ ⚡ SECTION_header (data-clarity-region="header")            │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🔵 CTA_logo_chile_access    🟢 CTA_tag_exclusivo_hoy │   │
│ │ (clickable logo)            (promo tag)              │   │
│ │ Events:                     Events:                  │   │
│ │ • cta_logo_chile_access_    • cta_tag_exclusivo_hoy_ │   │
│ │   click                       click                  │   │
│ │ • rage_click_logo           • rage_click_exclusivo_  │   │
│ │                               tag                    │   │
│ │ • hover_logo_chile_access   • hover_tag_exclusivo    │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 🎯 SECTION_hero (data-clarity-region="hero")                │
│                                                               │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 📢 SECTION_headline                                   │   │
│ │ (data-clarity-region="headline")                      │   │
│ │                                                       │   │
│ │ "Acceso especial disponible"                         │   │
│ │ "para usuarios de Chile hoy"                         │   │
│ │                                                       │   │
│ │ Subtitle + game hint                                 │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                               │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🎯 EVENTS_cta_section                                 │   │
│ │ (data-clarity-region="cta_section")                   │   │
│ │                                                       │   │
│ │ ┌─────────────────────────────────────────────────┐ │   │
│ │ │ 🟢 CTA_main_continuar                           │ │   │
│ │ │ ┌───────────────────────────────────────────┐   │ │   │
│ │ │ │         CONTINUAR         ➡️              │   │ │   │
│ │ │ └───────────────────────────────────────────┘   │ │   │
│ │ │ PRIMARY BUTTON                                  │ │   │
│ │ │                                                 │ │   │
│ │ │ Events:                                         │ │   │
│ │ │ ✅ cta_main_continuar_click                     │ │   │
│ │ │ 🔴 rage_click_cta_main (3+ clicks/1s)          │ │   │
│ │ │ ⏱️  hesitation_main_continuar (hover >2s)       │ │   │
│ │ │ 🎯 redirect_to_offer (before navigation)       │ │   │
│ │ │ 👆 hover_main_continuar                         │ │   │
│ │ │                                                 │ │   │
│ │ │ Data Attributes:                                │ │   │
│ │ │ • data-clarity-click="cta_main"                 │ │   │
│ │ │ • data-element-name="CTA_main_continuar"        │ │   │
│ │ │ • data-clarity-track-rage="true"                │ │   │
│ │ └─────────────────────────────────────────────────┘ │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                               │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 👥 SECTION_social_proof                               │   │
│ │ (data-clarity-region="social_proof")                  │   │
│ │                                                       │   │
│ │ ★ Más de 5.000 usuarios en Chile ya accedieron hoy   │   │
│ └───────────────────────────────────────────────────────┘   │
│                                                               │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 🎁 SECTION_benefits                                   │   │
│ │ (data-clarity-region="benefits")                      │   │
│ │                                                       │   │
│ │ Acceso inmediato · Sin registro · Contenido          │   │
│ │ interactivo                                           │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ ⚖️  SECTION_footer (data-clarity-region="footer")            │
│ ┌───────────────────────────────────────────────────────┐   │
│ │ 18+ · Entretenimiento · Uso responsable              │   │
│ │ Contenido de entretenimiento para adultos (18+)...  │   │
│ └───────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 SCROLL DEPTH MARKERS

```
┌──────────────────────────────────────────┐
│ 0%   ← Page Load                         │
│      📍 scroll_hero_0 (implicit)         │
├──────────────────────────────────────────┤
│                                          │
│ ▼ User scrolls                           │
│                                          │
├──────────────────────────────────────────┤
│ 25%  ← First marker                      │
│      📍 Event: scroll_hero_25            │
├──────────────────────────────────────────┤
│                                          │
│ ▼ Continues scrolling                    │
│                                          │
├──────────────────────────────────────────┤
│ 50%  ← Half page                         │
│      📍 Event: scroll_hero_50            │
├──────────────────────────────────────────┤
│                                          │
│ ▼ Still scrolling                        │
│                                          │
├──────────────────────────────────────────┤
│ 75%  ← High engagement                   │
│      📍 Event: scroll_hero_75            │
├──────────────────────────────────────────┤
│                                          │
│ ▼ Reached bottom                         │
│                                          │
├──────────────────────────────────────────┤
│ 100% ← Footer visible                    │
│      📍 Event: scroll_hero_100           │
└──────────────────────────────────────────┘
```

---

## 🎯 CLICK HEATMAP ZONES

```
┌─────────────────────────────────────────────────┐
│ Header                                          │
│ ┌───────┐                        ┌──────────┐  │
│ │ 🔵    │  LOW HEAT              │ 🟢       │  │
│ │ Logo  │  (brand clicks)        │ Tag      │  │
│ └───────┘                        └──────────┘  │
├─────────────────────────────────────────────────┤
│                                                 │
│              Hero Section                       │
│                                                 │
│                                                 │
│            ┌───────────────────┐                │
│            │  🔴🔴🔴🔴🔴🔴🔴  │                │
│            │  🔴🔴🔴🔴🔴🔴🔴  │  HIGH HEAT      │
│            │     CONTINUAR     │  (main CTA)   │
│            │  🔴🔴🔴🔴🔴🔴🔴  │                │
│            └───────────────────┘                │
│                                                 │
│                                                 │
│         ★ Social Proof (text, no clicks)       │
│                                                 │
│         Benefits line (text, no clicks)        │
│                                                 │
├─────────────────────────────────────────────────┤
│ Footer (text, minimal interaction)              │
└─────────────────────────────────────────────────┘

🔴 = Very High Heat (90-100%)
🟠 = High Heat (70-89%)
🟡 = Medium Heat (40-69%)
🟢 = Low Heat (10-39%)
🔵 = Very Low Heat (0-9%)
```

---

## 🔥 RAGE CLICK ZONES

Areas where users might rage click (frustration):

```
┌─────────────────────────────────────────────────┐
│ Potential Rage Click Zones:                    │
│                                                 │
│ 1. 🔴 Main CTA Button                          │
│    If slow load/response                       │
│    Detection: 3+ clicks within 1 second        │
│    Event: rage_click_cta_main                  │
│                                                 │
│ 2. 🟠 Logo                                     │
│    If users expect dropdown/menu               │
│    Detection: 3+ clicks within 1 second        │
│    Event: rage_click_logo                      │
│                                                 │
│ 3. 🟡 Exclusivo Tag                            │
│    If users expect popup/modal                 │
│    Detection: 3+ clicks within 1 second        │
│    Event: rage_click_exclusivo_tag             │
│                                                 │
│ Low Risk Zones:                                │
│ • Headlines (text, expected to be non-clickable)│
│ • Footer text                                  │
│ • Social proof                                 │
└─────────────────────────────────────────────────┘
```

---

## ⏱️ HESITATION ZONES

Where users hover for >2s without clicking:

```
┌─────────────────────────────────────────────────┐
│ Hesitation Detection:                           │
│                                                 │
│ ┌──────────────────────────────┐                │
│ │  CONTINUAR  ➡️              │                │
│ │                             │                │
│ │  👆 Hover starts            │                │
│ │  ⏱️  2 seconds pass          │                │
│ │  🔔 hesitation_main_continuar│                │
│ │     event fires              │                │
│ │                             │                │
│ │  Indicates:                 │                │
│ │  • User uncertain           │                │
│ │  • Copy unclear             │                │
│ │  • CTA not compelling       │                │
│ └──────────────────────────────┘                │
│                                                 │
│ Also tracked on:                                │
│ • Logo (hesitation_logo_chile_access)           │
│ • Tag (hesitation_tag_exclusivo)                │
└─────────────────────────────────────────────────┘
```

---

## 🚪 EXIT INTENT

```
┌─────────────────────────────────────────────────┐
│                                                 │
│         ↑ Mouse moves to top of screen         │
│         (Y coordinate ≤ 0)                      │
│                                                 │
│         🚨 EXIT INTENT DETECTED                 │
│         Event: exit_intent                      │
│                                                 │
│         User likely to:                         │
│         • Close tab                             │
│         • Navigate away                         │
│         • Switch tabs                           │
│                                                 │
│         Opportunity for:                        │
│         • Exit popup (future)                   │
│         • Special offer                         │
│         • Retention message                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 📱 MOBILE VS DESKTOP TRACKING

### Desktop (>1024px)
```
✅ All click events
✅ Hover tracking
✅ Hesitation tracking (hover >2s)
✅ Exit intent (mouse leave)
✅ Rage click detection
✅ Scroll depth
```

### Mobile (<1024px)
```
✅ All click events (touch)
✅ Rage click detection (3+ taps/1s)
✅ Scroll depth
❌ Hover tracking (not applicable)
❌ Hesitation (no hover on mobile)
❌ Exit intent (no mouse)
```

---

## 🎨 COLOR CODE LEGEND

### In Figma / Documentation:
- 🔴 **Red** = Critical tracking zone (main CTA)
- 🟠 **Orange** = Important secondary CTA
- 🟢 **Green** = Tertiary interaction point
- 🔵 **Blue** = Low priority tracking
- ⚫ **Gray** = No tracking needed

### In Clarity Dashboard:
- 🔥 **Hot (Red)** = High interaction area
- 🟡 **Warm (Yellow)** = Medium interaction
- 🔵 **Cool (Blue)** = Low interaction
- ⚪ **Cold (White)** = No interaction

---

## 📊 EVENT FLOW DIAGRAM

```
User lands on page
      │
      ▼
Page View Event
📍 page_view: "prelanding"
      │
      ▼
User scrolls down
      │
      ├─ 25% → scroll_hero_25
      ├─ 50% → scroll_hero_50
      ├─ 75% → scroll_hero_75
      └─ 100% → scroll_hero_100
      │
      ▼
User hovers CTA (desktop)
      │
      ├─ Hover starts → hover_main_continuar
      │
      ├─ >2s without click → hesitation_main_continuar
      │
      └─ Click → ✅ CONVERSION PATH
                  │
                  ├─ cta_main_continuar_click
                  ├─ redirect_to_offer
                  └─ Navigate to /landing
                      │
                      ▼
                  Page View Event
                  📍 page_view: "landing"

Alternative flows:
      │
      ├─ 3+ rapid clicks → rage_click_cta_main
      │
      ├─ Mouse to top → exit_intent
      │
      └─ Click logo/tag → cta_logo/tag_click
```

---

## 🏆 PRIORITY ZONES

### Priority 1 - MUST TRACK ✅
```
✅ CTA_main_continuar (main conversion)
✅ redirect_to_offer (goal completion)
✅ scroll_hero_50 (engagement indicator)
✅ rage_click_cta_main (frustration)
```

### Priority 2 - SHOULD TRACK ⚠️
```
⚠️ scroll_hero_75 (high engagement)
⚠️ hesitation_main_continuar (uncertainty)
⚠️ exit_intent (abandonment)
⚠️ CTA_logo_chile_access (brand engagement)
```

### Priority 3 - NICE TO HAVE 💡
```
💡 CTA_tag_exclusivo_hoy (promo engagement)
💡 hover events (desktop UX)
💡 scroll_hero_25 (initial engagement)
💡 scroll_hero_100 (completion)
```

---

## 📏 MEASUREMENT GRID

### Sections Height Reference
```
Header:       ~80px
Hero Start:   ~150px
Headline:     ~300px
CTA Section:  ~400px (CENTER - key zone)
Social Proof: ~550px
Benefits:     ~620px
Footer:       ~700px
Total:        ~800px (may vary by device)

Key measurement points:
• 25% = ~200px (early scroll)
• 50% = ~400px (CTA visible)
• 75% = ~600px (benefits seen)
• 100% = bottom (full page)
```

---

## 🔍 WHAT CLARITY WILL SHOW

### Heatmaps
- **Click Heatmap**: Red hotspot on "Continuar" button
- **Scroll Heatmap**: Most users stop at 50-75%
- **Move Heatmap**: Mouse movement patterns

### Session Recordings
- **Normal Flow**: Load → scroll → click CTA → convert
- **Frustrated**: Load → multiple clicks → rage click → exit
- **Uncertain**: Load → long hover → hesitate → maybe convert

### Analytics
- **Conversion Rate**: redirect_to_offer / page_view
- **Engagement Score**: avg scroll depth
- **Frustration Rate**: rage clicks / total sessions

---

## 💡 INSIGHTS EXAMPLES

### Good Signals ✅
```
✅ High scroll depth (>75%)
✅ Quick CTA click (<5s)
✅ No rage clicks
✅ No hesitation
✅ Direct path: load → scroll → click → convert
```

### Warning Signals ⚠️
```
⚠️ Medium scroll (40-60%)
⚠️ Some hesitation (2-4s hover)
⚠️ Occasional rage clicks (<5%)
⚠️ Multiple CTA hovers before click
```

### Problem Signals 🚨
```
🚨 Low scroll (<25%)
🚨 High rage click rate (>10%)
🚨 Long hesitation (>5s)
🚨 High exit intent (>30%)
🚨 No conversions after many sessions
```

---

## 📝 QUICK REFERENCE

### For Designers
- Use naming convention: `[TYPE]_[LOCATION]_[ACTION]`
- Mark all interactive zones
- Add comments with tracking info
- Create separate tracking guide page

### For Developers
- Add all data-attributes
- Implement event tracking
- Test in console
- Verify in Clarity dashboard

### For QA
- Check all events fire
- Test on multiple devices
- Verify dashboard data
- Monitor for 24h

---

**Use this map as visual reference when:**
- 🎨 Designing in Figma
- 💻 Implementing in code
- 🧪 Testing functionality
- 📊 Analyzing in Clarity
- 🔧 Optimizing conversion

---

**Quick Links:**
- Full Guide: `/TRACKING_GUIDE.md`
- Checklist: `/FIGMA_TRACKING_CHECKLIST.md`
- Code: `/CLARITY_CODE.md`
- Summary: `/CLARITY_INTEGRATION_SUMMARY.md`
