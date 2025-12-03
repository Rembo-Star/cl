# 📐 FIGMA → CLARITY TRACKING CHECKLIST
## Для дизайнера и разработчика

---

## 🎨 ДЛЯ ДИЗАЙНЕРА (FIGMA)

### ✅ Структура фреймов
- [ ] Desktop 1440px готов
- [ ] Mobile 390px готов
- [ ] Tablet 768px (опционально)
- [ ] Все фреймы содержат полную версию страницы

### ✅ Именование слоев

#### Главные CTA
- [ ] `CTA_main_continuar` - Главная кнопка "Continuar"
- [ ] `CTA_logo_chile_access` - Логотип (кликабельный)
- [ ] `CTA_tag_exclusivo_hoy` - Тег "Exclusivo hoy"

#### Секции
- [ ] `SECTION_header` - Шапка с лого
- [ ] `SECTION_hero` - Главный контент
- [ ] `SECTION_headline` - Заголовок
- [ ] `SECTION_cta_section` - Зона с кнопкой
- [ ] `SECTION_social_proof` - Доказательства (5000+ пользователей)
- [ ] `SECTION_benefits` - Линия преимуществ
- [ ] `SECTION_footer` - Футер с 18+

#### События (опционально в комментариях)
- [ ] `EVENTS_cta_section` - Зона отслеживания кликов

### ✅ Компонентная система
- [ ] Кнопки вынесены в компоненты
- [ ] Единое именование классов
- [ ] Variants для hover/active состояний

### ✅ Комментарии в Figma

#### Код Clarity (вставить как комментарий)
```html
<!-- MS CLARITY TRACKING CODE -->
<script type="text/javascript">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/ufq3clrf2z";
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ufq3clrf2z");
</script>
```

#### Техническое описание элементов
Добавить в Figma комментарии к каждому интерактивному элементу:

**Главная кнопка CTA:**
```
Элемент: CTA_main_continuar
Tracking: data-clarity-click="cta_main"
События:
- Click: cta_main_continuar_click
- Rage click: rage_click_cta_main
- Hesitation: hesitation_main_continuar
```

**Логотип:**
```
Элемент: CTA_logo_chile_access
Tracking: data-clarity-click="cta_logo"
События:
- Click: cta_logo_chile_access_click
```

**Тег Exclusivo:**
```
Элемент: CTA_tag_exclusivo_hoy
Tracking: data-clarity-click="cta_exclusivo"
События:
- Click: cta_tag_exclusivo_hoy_click
```

### ✅ Страница "Tracking Guide" в Figma

Создать отдельную страницу с:
- [ ] Схема всех tracking zones
- [ ] Список всех событий
- [ ] Heatmap зоны (где ожидаем клики)
- [ ] Scroll depth markers (25%, 50%, 75%, 100%)
- [ ] Rage click zones (отметить красным)
- [ ] Hover zones (для desktop)

### ✅ Pixel Perfect
- [ ] Сетка 12 колонок (desktop)
- [ ] Сетка 4 колонки (mobile)
- [ ] Все размеры округлены
- [ ] Consistent spacing system

### ✅ Экспорт
- [ ] Макет ready для Dev Mode
- [ ] Все assets экспортированы
- [ ] SVG иконки оптимизированы
- [ ] Шрифты указаны

---

## 💻 ДЛЯ РАЗРАБОТЧИКА (FRONTEND)

### ✅ Установка Clarity

#### Проверить файлы
- [ ] `/utils/clarity.ts` существует
- [ ] `/App.tsx` импортирует `initClarity()`
- [ ] Clarity инициализируется в useEffect

#### Код инициализации
```typescript
// App.tsx
import { initClarity, trackPageView } from './utils/clarity';

useEffect(() => {
  initClarity(); // ✅ Должно быть
  trackPageView('prelanding');
}, []);
```

### ✅ Data-атрибуты на элементах

#### Главная кнопка
```tsx
<button
  data-clarity-click="cta_main"
  data-element-name="CTA_main_continuar"
  data-clarity-track-rage="true"
  onClick={handleCTAClick}
>
  Continuar
</button>
```

#### Логотип
```tsx
<button
  data-clarity-click="cta_logo"
  data-element-name="CTA_logo_chile_access"
  onClick={handleLogoClick}
>
  Logo
</button>
```

#### Тег
```tsx
<button
  data-clarity-click="cta_exclusivo"
  data-element-name="CTA_tag_exclusivo_hoy"
  onClick={handleExclusivoClick}
>
  Exclusivo hoy
</button>
```

#### Секции
```tsx
<section data-clarity-region="hero">
<header data-clarity-region="header">
<footer data-clarity-region="footer">
```

### ✅ Event Tracking

#### Click events
```typescript
const handleCTAClick = () => {
  trackCTAClick('main_continuar'); // ✅
  trackRedirectToOffer(); // ✅
  // ... navigation
};
```

#### Scroll depth
```typescript
useEffect(() => {
  const handleScroll = () => {
    // Track at 25%, 50%, 75%, 100%
    trackScrollDepth('hero', percentage);
  };
  window.addEventListener('scroll', handleScroll);
}, []);
```

#### Rage clicks
```typescript
// Автоматически в handleCTAClick
detectRageClick('cta_main'); // ✅
```

#### Hesitation
```typescript
const handleHoverStart = (id) => {
  setHoverStart({ [id]: Date.now() });
};

const handleHoverEnd = (id) => {
  const duration = Date.now() - hoverStart[id];
  if (duration > 2000) {
    trackHesitation(id, duration); // ✅
  }
};
```

#### Exit intent
```typescript
useEffect(() => {
  const handleMouseLeave = (e) => {
    if (e.clientY <= 0) {
      trackExitIntent(); // ✅
    }
  };
  document.addEventListener('mouseleave', handleMouseLeave);
}, []);
```

### ✅ Проверка в консоли

После клика на кнопку должны появиться:
```
📊 Clarity event: cta_main_continuar_click true
📊 Clarity event: redirect_to_offer {timestamp: "...", page: "/"}
```

### ✅ Network запросы

В DevTools → Network должны быть запросы к:
```
https://www.clarity.ms/tag/ufq3clrf2z
https://www.clarity.ms/collect
```

---

## 🧪 ТЕСТИРОВАНИЕ (QA)

### ✅ Pre-launch Checklist

#### Загрузка страницы
- [ ] Clarity script загружается
- [ ] Console: "✅ MS Clarity initialized"
- [ ] Page view event отправлен
- [ ] Нет ошибок в console

#### Клики
- [ ] Клик на главную кнопку трекается
- [ ] Клик на логотип трекается
- [ ] Клик на тег "Exclusivo" трекается
- [ ] События появляются в console

#### Scroll tracking
- [ ] Прокрутка на 25% → event
- [ ] Прокрутка на 50% → event
- [ ] Прокрутка на 75% → event
- [ ] Прокрутка на 100% → event

#### Rage clicks
- [ ] 3+ быстрых клика → rage_click event
- [ ] Работает на всех CTA

#### Hesitation
- [ ] Hover >2 сек → hesitation event
- [ ] Работает на главной кнопке

#### Exit intent
- [ ] Мышь вверх за пределы → event
- [ ] Только desktop

#### Редирект
- [ ] Клик на CTA → redirect_to_offer event
- [ ] Навигация работает

#### Мобильная версия
- [ ] Все events работают на touch
- [ ] Rage clicks на тапах
- [ ] Scroll depth корректный

### ✅ После 24h трафика

#### Clarity Dashboard
- [ ] Heatmaps загружены
- [ ] Session recordings есть
- [ ] Click heatmap показывает CTA
- [ ] Scroll heatmap показывает depth

#### Custom Events
- [ ] `cta_main_continuar_click` появляется
- [ ] `redirect_to_offer` считается
- [ ] `rage_click_*` если есть
- [ ] `scroll_hero_*` работает

#### Filters
- [ ] Можно отфильтровать converters
- [ ] Можно отфильтровать frustrated users
- [ ] Mobile vs Desktop сегментация

---

## 📊 CLARITY DASHBOARD SETUP

### После внедрения код

1. **Войти в Clarity**
   - URL: https://clarity.microsoft.com/
   - Project ID: ufq3clrf2z

2. **Включить функции**
   - ✅ Heatmaps → ON
   - ✅ Session recordings → ON
   - ✅ Scroll maps → ON
   - ✅ Click tracking → ON

3. **Создать фильтры**
   ```
   Filter: Converters
   Condition: redirect_to_offer exists

   Filter: Frustrated
   Condition: rage_click_* exists

   Filter: High Intent
   Condition: scroll_hero_75 exists AND hesitation_* does not exist
   ```

4. **Настроить alerts**
   - Rage click spike
   - Drop in conversions
   - Exit intent increase

---

## 📝 HANDOFF NOTES

### Дизайнер → Разработчик

**Передать:**
1. ✅ Figma макет с Dev Mode
2. ✅ Список всех tracking elements
3. ✅ Документ с event names
4. ✅ Clarity Project ID
5. ✅ Tracking Guide страница

**Проверить:**
1. Все слои названы по конвенции
2. Комментарии с кодом добавлены
3. Tracking zones отмечены
4. Компоненты готовы

### Разработчик → QA

**Передать:**
1. ✅ Staging URL
2. ✅ Clarity dashboard доступ
3. ✅ Список событий для проверки
4. ✅ Test scenarios

**Проверить:**
1. Все data-атрибуты на месте
2. Events отправляются
3. Console чистый
4. Network запросы OK

### QA → Production

**Проверить:**
1. ✅ 100% событий работают
2. ✅ Heatmaps собираются
3. ✅ Recordings доступны
4. ✅ Dashboard настроен
5. ✅ Alerts включены

---

## 🚀 PRODUCTION READY CRITERIA

Готово к продакшену когда:
- [x] Clarity script установлен
- [x] Все CTA имеют tracking
- [x] Scroll depth работает
- [x] Behavioral tracking активен
- [x] Dashboard настроен
- [x] QA passed
- [x] No console errors
- [x] Events firing correctly

---

## 📞 SUPPORT

**Проблемы с Clarity:**
- Docs: https://docs.microsoft.com/en-us/clarity/
- Support: clarity@microsoft.com

**Проблемы с кодом:**
- Проверить `/utils/clarity.ts`
- Проверить console logs
- Проверить network tab

---

**Статус**: ✅ Production Ready  
**Версия**: 1.0  
**Дата**: 3 декабря 2025  
**Clarity ID**: ufq3clrf2z
