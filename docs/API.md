# BlackMagic Framework - API Reference

Complete API documentation for the BlackMagic Framework.

## 📚 Table of Contents

- [Constructor](#constructor)
- [Configuration Options](#configuration-options)
- [Public Methods](#public-methods)
- [Utility Methods](#utility-methods)
- [Events](#events)
- [Examples](#examples)
- [TypeScript Definitions](#typescript-definitions)

---

## Constructor

### `new BlackMagic(options)`

Creates a new BlackMagic instance.

**Parameters:**
- `options` (Object, optional) - Configuration options

**Returns:**
- BlackMagic instance

**Example:**
```javascript
const blackMagic = new BlackMagic({
  cookieName: 'my-theme',
  backgroundColor: '#1a1a1a',
  factor: 0.4
});
```

---

## Configuration Options

### Core Options

#### `cookieName`
- **Type:** `string`
- **Default:** `'darkmode'`
- **Description:** Name of the cookie used to store theme preference

```javascript
new BlackMagic({ cookieName: 'my-app-theme' });
```

#### `backgroundColor`
- **Type:** `string`
- **Default:** `'#000'`
- **Description:** Background color applied in dark mode
- **Format:** Hex color code

```javascript
new BlackMagic({ backgroundColor: '#1a1a1a' });
```

#### `localStorageKey`
- **Type:** `string`
- **Default:** `'darkmode'`
- **Description:** localStorage key for theme storage fallback

```javascript
new BlackMagic({ localStorageKey: 'app-theme' });
```

#### `themeClass`
- **Type:** `string`
- **Default:** `undefined`
- **Description:** CSS class to toggle instead of dynamic color adjustment

```javascript
new BlackMagic({ themeClass: 'dark-theme' });
```

#### `cookieDuration`
- **Type:** `number`
- **Default:** `365`
- **Description:** Cookie expiration time in days (0 = session cookie)

```javascript
new BlackMagic({ cookieDuration: 30 }); // 30 days
new BlackMagic({ cookieDuration: 0 });  // Session cookie
```

#### `autoSwitch`
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Automatically apply saved theme on initialization

```javascript
new BlackMagic({ autoSwitch: false }); // Manual control only
```

#### `factor`
- **Type:** `number`
- **Default:** `0.4`
- **Range:** `0.1` - `0.8`
- **Description:** Intensity of color adjustments (only when not using themeClass)

```javascript
new BlackMagic({ factor: 0.1 }); // Subtle changes
new BlackMagic({ factor: 0.8 }); // Dramatic changes
```

#### `currentTheme`
- **Type:** `string`
- **Default:** `'light'`
- **Values:** `'light'` | `'dark'`
- **Description:** Initial theme (overridden by stored preference if autoSwitch is true)

```javascript
new BlackMagic({ currentTheme: 'dark' });
```

---

## Public Methods

### Theme Control

#### `toggle()`
Toggles between light and dark themes.

**Parameters:** None  
**Returns:** `void`

```javascript
blackMagic.toggle();
```

#### `applyTheme(theme)`
Applies a specific theme.

**Parameters:**
- `theme` (string) - `'light'` or `'dark'`

**Returns:** `void`

```javascript
blackMagic.applyTheme('dark');
blackMagic.applyTheme('light');
```

#### `getCurrentTheme()`
Returns the current active theme.

**Parameters:** None  
**Returns:** `string` - `'light'` or `'dark'`

```javascript
const currentTheme = blackMagic.getCurrentTheme();
console.log(currentTheme); // 'light' or 'dark'
```

### Storage Methods

#### `saveTheme(theme)`
Saves theme preference to both cookie and localStorage.

**Parameters:**
- `theme` (string) - `'light'` or `'dark'`

**Returns:** `void`

```javascript
blackMagic.saveTheme('dark');
```

#### `getStoredTheme()`
Retrieves stored theme preference (cookie takes priority over localStorage).

**Parameters:** None  
**Returns:** `string | null` - Stored theme or null if none found

```javascript
const storedTheme = blackMagic.getStoredTheme();
if (storedTheme) {
  console.log('Stored theme:', storedTheme);
}
```

### Cookie Methods

#### `setCookie(name, value, days)`
Sets a cookie with specified expiration.

**Parameters:**
- `name` (string) - Cookie name
- `value` (string) - Cookie value  
- `days` (number) - Expiration in days (0 = session cookie)

**Returns:** `void`

```javascript
blackMagic.setCookie('theme', 'dark', 30);
```

#### `getCookie(name)`
Retrieves a cookie value by name.

**Parameters:**
- `name` (string) - Cookie name

**Returns:** `string | null` - Cookie value or null if not found

```javascript
const theme = blackMagic.getCookie('theme');
```

### localStorage Methods

#### `setLocalStorage(key, value)`
Safely sets a localStorage item with error handling.

**Parameters:**
- `key` (string) - Storage key
- `value` (string) - Storage value

**Returns:** `void`

```javascript
blackMagic.setLocalStorage('theme', 'dark');
```

#### `getLocalStorage(key)`
Safely retrieves a localStorage item with error handling.

**Parameters:**
- `key` (string) - Storage key

**Returns:** `string | null` - Stored value or null if not found/error

```javascript
const theme = blackMagic.getLocalStorage('theme');
```

---

## Utility Methods

### Color Conversion

#### `rgbToHsl(r, g, b)`
Converts RGB color values to HSL color space.

**Parameters:**
- `r` (number) - Red value (0-255)
- `g` (number) - Green value (0-255)
- `b` (number) - Blue value (0-255)

**Returns:** `[number, number, number]` - HSL values [hue (0-360), saturation (0-1), lightness (0-1)]

```javascript
const [h, s, l] = blackMagic.rgbToHsl(255, 0, 0); // Red to HSL
console.log(h, s, l); // 0, 1, 0.5
```

#### `hslToRgb(h, s, l)`
Converts HSL color values to RGB color space.

**Parameters:**
- `h` (number) - Hue (0-360)
- `s` (number) - Saturation (0-1)
- `l` (number) - Lightness (0-1)

**Returns:** `[number, number, number]` - RGB values [red, green, blue] (0-255)

```javascript
const [r, g, b] = blackMagic.hslToRgb(0, 1, 0.5); // HSL to Red
console.log(r, g, b); // 255, 0, 0
```

#### `hexToRgb(hex)`
Converts hexadecimal color to RGB values.

**Parameters:**
- `hex` (string) - Hex color code (e.g., '#ff0000')

**Returns:** `[number, number, number]` - RGB values [red, green, blue] (0-255)

```javascript
const [r, g, b] = blackMagic.hexToRgb('#ff0000');
console.log(r, g, b); // 255, 0, 0
```

### Accessibility Methods

#### `getLuminance(r, g, b)`
Calculates relative luminance using WCAG formula with gamma correction.

**Parameters:**
- `r` (number) - Red value (0-255)
- `g` (number) - Green value (0-255)  
- `b` (number) - Blue value (0-255)

**Returns:** `number` - Relative luminance (0-1)

```javascript
const luminance = blackMagic.getLuminance(255, 255, 255); // White
console.log(luminance); // 1
```

#### `getContrastRatio(color1, color2)`
Calculates contrast ratio between two colors according to WCAG standards.

**Parameters:**
- `color1` (Array) - RGB array [r, g, b]
- `color2` (Array) - RGB array [r, g, b]

**Returns:** `number` - Contrast ratio (1-21)

```javascript
const ratio = blackMagic.getContrastRatio([0, 0, 0], [255, 255, 255]);
console.log(ratio); // 21 (maximum contrast)
```

### DOM Methods

#### `getColorFromElement(element)`
Extracts the computed text color from a DOM element.

**Parameters:**
- `element` (HTMLElement) - DOM element

**Returns:** `[number, number, number]` - RGB color values

```javascript
const element = document.querySelector('h1');
const [r, g, b] = blackMagic.getColorFromElement(element);
```

#### `getBackgroundColor(element)`
Finds the effective background color of an element by traversing up the DOM tree.

**Parameters:**
- `element` (HTMLElement) - DOM element

**Returns:** `[number, number, number]` - RGB background color values

```javascript
const element = document.querySelector('p');
const [r, g, b] = blackMagic.getBackgroundColor(element);
```

#### `getOptimalTextColor(backgroundColor, originalTextColor)`
Calculates optimal text color for given background to ensure WCAG compliance.

**Parameters:**
- `backgroundColor` (Array) - RGB background color [r, g, b]
- `originalTextColor` (Array) - RGB original text color [r, g, b]

**Returns:** `[number, number, number]` - RGB optimal text color

```javascript
const optimalColor = blackMagic.getOptimalTextColor([0, 0, 0], [128, 128, 128]);
console.log(optimalColor); // Light color for dark background
```

---

## Events

Currently, BlackMagic does not emit custom events. Theme changes are applied synchronously. Future versions may include:

```javascript
// Future API (not implemented)
blackMagic.addEventListener('themechange', (event) => {
  console.log('Theme changed to:', event.theme);
});
```

---

## Examples

### Basic Implementation
```javascript
// Initialize with default settings
const blackMagic = new BlackMagic();

// Add toggle button
document.getElementById('toggleBtn').addEventListener('click', () => {
  blackMagic.toggle();
});
```

### Advanced Configuration
```javascript
// Custom configuration
const blackMagic = new BlackMagic({
  cookieName: 'my-app-theme',
  backgroundColor: '#1a1a1a',
  factor: 0.6,
  cookieDuration: 30,
  autoSwitch: true
});

// Manual theme application
blackMagic.applyTheme('dark');

// Check current theme
if (blackMagic.getCurrentTheme() === 'dark') {
  console.log('Dark mode is active');
}
```

### CSS Class Mode
```javascript
// Use CSS classes instead of dynamic colors
const blackMagic = new BlackMagic({
  themeClass: 'dark-theme',
  autoSwitch: true
});

// CSS in your stylesheet:
/*
.dark-theme {
  background-color: #1a1a1a;
  color: #e0e0e0;
}

.dark-theme .card {
  background-color: #2d2d2d;
  border-color: #404040;
}
*/
```

### React Integration
```javascript
// React hook example
import { useEffect, useState } from 'react';

function useDarkMode() {
  const [blackMagic] = useState(() => new BlackMagic({
    cookieName: 'react-app-theme',
    autoSwitch: true
  }));
  
  const [theme, setTheme] = useState(blackMagic.getCurrentTheme());
  
  const toggleTheme = () => {
    blackMagic.toggle();
    setTheme(blackMagic.getCurrentTheme());
  };
  
  return { theme, toggleTheme };
}
```

### Vue Integration
```javascript
// Vue composition API
import { ref, onMounted } from 'vue';

export function useDarkMode() {
  const theme = ref('light');
  let blackMagic;
  
  onMounted(() => {
    blackMagic = new BlackMagic({
      cookieName: 'vue-app-theme',
      autoSwitch: true
    });
    theme.value = blackMagic.getCurrentTheme();
  });
  
  const toggleTheme = () => {
    blackMagic.toggle();
    theme.value = blackMagic.getCurrentTheme();
  };
  
  return { theme, toggleTheme };
}
```

---

## TypeScript Definitions

```typescript
// blackmagic.d.ts (future)
declare module 'blackmagic-framework' {
  interface BlackMagicOptions {
    cookieName?: string;
    backgroundColor?: string;
    localStorageKey?: string;
    themeClass?: string;
    cookieDuration?: number;
    autoSwitch?: boolean;
    factor?: number;
    currentTheme?: 'light' | 'dark';
  }

  type Theme = 'light' | 'dark';
  type RGBColor = [number, number, number];

  class BlackMagic {
    constructor(options?: BlackMagicOptions);
    
    // Theme methods
    toggle(): void;
    applyTheme(theme: Theme): void;
    getCurrentTheme(): Theme;
    
    // Storage methods
    saveTheme(theme: Theme): void;
    getStoredTheme(): Theme | null;
    setCookie(name: string, value: string, days: number): void;
    getCookie(name: string): string | null;
    setLocalStorage(key: string, value: string): void;
    getLocalStorage(key: string): string | null;
    
    // Color methods
    rgbToHsl(r: number, g: number, b: number): [number, number, number];
    hslToRgb(h: number, s: number, l: number): RGBColor;
    hexToRgb(hex: string): RGBColor;
    getLuminance(r: number, g: number, b: number): number;
    getContrastRatio(color1: RGBColor, color2: RGBColor): number;
    
    // DOM methods
    getColorFromElement(element: HTMLElement): RGBColor;
    getBackgroundColor(element: HTMLElement): RGBColor;
    getOptimalTextColor(backgroundColor: RGBColor, originalTextColor: RGBColor): RGBColor;
  }

  export default BlackMagic;
  export { BlackMagic, BlackMagicOptions, Theme, RGBColor };
}
```

---

## Error Handling

BlackMagic includes built-in error handling for:

- **localStorage unavailable** - Falls back to cookies only
- **Invalid color values** - Uses safe defaults
- **DOM access errors** - Graceful degradation

Example error handling:
```javascript
try {
  const blackMagic = new BlackMagic();
  blackMagic.toggle();
} catch (error) {
  console.warn('BlackMagic error:', error);
  // Fallback behavior
}
```

---

## Performance Notes

- **DOM Traversal:** O(n) where n = number of DOM elements
- **Color Calculations:** O(1) constant time
- **Memory Usage:** Minimal, no color caches maintained
- **Browser Compatibility:** Uses modern APIs with fallbacks

---

## Changelog

### v0.1.0
- Initial release
- Core color adjustment functionality
- WCAG compliance
- Cookie and localStorage support
- ES Module support

---

For more examples and use cases, see the `/examples/` directory in the repository.
