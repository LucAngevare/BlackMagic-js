# 🌙 BlackMagic Framework

A powerful JavaScript framework for implementing intelligent dark mode with automatic color adjustment and WCAG-compliant contrast optimization.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/ecma-262/)
[![WCAG](https://img.shields.io/badge/WCAG-AA%20Compliant-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)

## ✨ Features

- 🎨 **Smart Color Adjustment** - Automatically adjusts colors while maintaining readability
- ♿ **WCAG Compliant** - Ensures 4.5:1 contrast ratio for accessibility
- 💾 **Dual Storage** - Uses both cookies and localStorage for maximum compatibility
- 🎭 **Theme Class Support** - Works with CSS-based themes or dynamic color conversion
- ⚙️ **Highly Configurable** - Multiple options for customization
- ⚡ **Zero Dependencies** - Pure JavaScript, no external libraries
- 🌐 **Cross-Browser** - Works on all modern browsers

## 🚀 Quick Start

### CDN (Recommended)
```html
<script src="https://cdn.jsdelivr.net/gh/LucAngevare/BlackMagic-js@latest/dist/blackmagic.min.js"></script>
```

### NPM
```bash
npm install blackmagic-framework
```

### Basic Usage
```javascript
// Initialize BlackMagic
const blackMagic = new BlackMagic({
    cookieName: 'my-theme',
    backgroundColor: '#1a1a1a',
    factor: 0.4
});

// Add toggle functionality
document.getElementById('toggleBtn').addEventListener('click', () => {
    blackMagic.toggle();
});
```

## 📖 Documentation

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `cookieName` | string | `'darkmode'` | Cookie name for storing theme preference |
| `backgroundColor` | string | `'#000'` | Dark mode background color |
| `localStorageKey` | string | `'darkmode'` | localStorage key for theme storage |
| `themeClass` | string | `undefined` | CSS class to toggle instead of dynamic colors |
| `cookieDuration` | number | `365` | Cookie expiration time in days |
| `autoSwitch` | boolean | `true` | Automatically apply saved theme on page load |
| `factor` | number | `0.4` | Intensity of color adjustments (0.1-0.8) |

### Methods

#### `toggle()`
Switches between light and dark themes.

#### `getCurrentTheme()`
Returns the current theme (`'light'` or `'dark'`).

#### `applyTheme(theme)`
Applies a specific theme.
- `theme` (string): Either `'light'` or `'dark'`

#### `getStoredTheme()`
Returns the stored theme preference from cookies or localStorage.

### Advanced Configuration

#### CSS Class Mode
```javascript
const blackMagic = new BlackMagic({
    themeClass: 'dark-theme',
    autoSwitch: true
});
```

#### Custom Color Adjustment
```javascript
const blackMagic = new BlackMagic({
    backgroundColor: '#2d2d2d',
    factor: 0.6, // More dramatic color changes
    cookieDuration: 30 // Remember for 30 days
});
```

## 🧪 Examples & Testing

This repository includes comprehensive examples demonstrating various use cases:

- **Basic Example** - Simple implementation
- **Comprehensive Test** - Full feature testing with complex UI
- **Theme Class Mode** - Using CSS classes instead of dynamic colors
- **Factor Testing** - High/low intensity color adjustments
- **Settings Tests** - Auto-switch, custom backgrounds, cookie duration
- **Debug Tools** - Persistence testing and troubleshooting

### Running Examples

```bash
# Clone the repository
git clone https://github.com/LucANgevare/BlackMagic-js.git
cd BlackMagic-js

# Start local server
npm run dev

# Open examples
open http://localhost:8000/examples/
```

## 🏗️ Project Structure

```
BlackMagic-js/
├── src/
│   └── blackmagic.js          # Source code
├── dist/
│   ├── blackmagic.js          # UMD build
│   └── blackmagic.esm.js      # ES Module
├── examples/
│   ├── basic/                 # Basic usage examples
│   ├── comprehensive/         # Full feature tests
│   ├── theme-class/          # CSS class mode
│   ├── factors/              # Color adjustment tests
│   ├── settings/             # Configuration tests
│   └── debug/                # Debug tools
├── package.json
└── README.md
```

## 🎯 How It Works

### Intelligent Color Adjustment

BlackMagic uses advanced algorithms to:

1. **Analyze Text Colors** - Detects current text colors in the DOM
2. **Calculate Backgrounds** - Walks up the DOM tree to find actual background colors
3. **Ensure Contrast** - Calculates contrast ratios using WCAG standards
4. **Optimize Colors** - Adjusts colors to maintain 4.5:1 contrast ratio
5. **Preserve Semantics** - Keeps important UI colors (buttons, alerts) unchanged

### Storage Strategy

The framework uses a dual storage approach:

1. **Cookies** (Primary) - Works across all environments
2. **localStorage** (Fallback) - Provides additional reliability

### Accessibility

All color adjustments ensure WCAG AA compliance:
- Minimum 4.5:1 contrast ratio
- Proper luminance calculations
- Gamma correction applied
- Fallback to pure black/white when needed

## 🌍 Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WCAG guidelines for accessibility standards
- Modern CSS color theory and contrast calculations
- Community feedback and testing

## 📞 Support

- 📖 [Documentation](https://github.com/LucAngevare/BlackMagic-js#readme)
- 🐛 [Issues](https://github.com/LucAngevare/BlackMagic-js/issues)
- 💬 [Discussions](https://github.com/LucAngevare/BlackMagic-js/discussions)

---

⭐ **If you find BlackMagic useful, please consider giving it a star!** ⭐
