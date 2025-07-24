# BlackMagic-js - Developer Documentation

Welcome to the BlackMagic Framework developer documentation. This guide is designed for developers who want to contribute to the framework, understand its internals, or build advanced integrations.

## 🏗️ Architecture Overview

BlackMagic Framework is built with a modular architecture focusing on:

- **Color Intelligence** - Advanced color theory algorithms
- **Accessibility Compliance** - WCAG 2.1 AA standards
- **Performance Optimization** - Minimal DOM manipulation
- **Cross-browser Compatibility** - Modern browser support

## 🔧 Development Setup

### Prerequisites
- Node.js 12+ (for development tools)
- Modern browser for testing
- Git for version control

### Setup Instructions
```bash
# Clone the repository
git clone https://github.com/LucAngevare/BlackMagic-js.git
cd BlackMagic-js

# Install development dependencies (if any)
npm install

# Start development server
npm run dev

# Open examples for testing
open http://localhost:8000/examples/
```

## 📁 Project Structure

```
BlackMagic-js/
├── src/
│   └── blackmagic.js          # Main source file
├── dist/
│   ├── blackmagic.js          # UMD build
│   ├── blackmagic.esm.js      # ES Module
│   └── blackmagic.min.js      # Minified version (future)
├── examples/                  # Test cases and examples
├── docs/                     # Developer documentation
└── tests/                    # Unit tests (future)
```

## 🧠 Core Algorithms

### Color Theory Implementation

BlackMagic uses several color algorithms:

#### 1. RGB to HSL Conversion
```javascript
rgbToHsl(r, g, b) {
  // Converts RGB values to HSL color space
  // HSL is better for color manipulation
}
```

#### 2. Luminance Calculation
```javascript
getLuminance(r, g, b) {
  // Implements WCAG luminance formula
  // Includes gamma correction for accuracy
}
```

#### 3. Contrast Ratio Calculation
```javascript
getContrastRatio(color1, color2) {
  // WCAG 2.1 contrast ratio formula
  // Ensures minimum 4.5:1 ratio for AA compliance
}
```

### DOM Traversal Strategy

The framework uses smart DOM traversal to:

1. **Find Background Colors** - Walks up the DOM tree to find actual background
2. **Preserve Semantics** - Skips elements with semantic meaning
3. **Optimize Performance** - Minimal DOM queries and updates

## 🎯 Design Principles

### 1. Accessibility First
- WCAG 2.1 AA compliance is mandatory
- Contrast ratios are always validated
- Fallbacks ensure readability

### 2. Performance Optimized
- Single DOM traversal where possible
- Efficient color calculations
- Minimal reflows and repaints

### 3. Framework Agnostic
- Pure JavaScript, no dependencies
- Works with any CSS framework
- Doesn't interfere with existing styles

### 4. Developer Friendly
- Clear API design
- Comprehensive configuration options
- Extensive examples and documentation

## 🔬 Testing Strategy

### Manual Testing
The `examples/` directory contains comprehensive test cases:

- **Unit-level** - Individual feature testing
- **Integration** - Full framework testing
- **Edge cases** - Unusual scenarios and configurations

### Browser Testing Matrix
- ✅ Chrome 60+ (Chromium-based browsers)
- ✅ Firefox 60+ (Gecko engine)
- ✅ Safari 12+ (WebKit engine)
- ✅ Edge 79+ (Chromium-based)

## 🚀 Build Process

### Current Build Steps
```bash
# Copy source to UMD distribution
npm run build:umd

# Copy source to ES Module distribution
npm run build:esm
```

### Future Enhancements
- Minification (UglifyJS/Terser)
- TypeScript definitions
- Automated testing
- CI/CD pipeline

## 🤝 Contributing Guidelines

### Code Style
- Use ES6+ features
- Maintain existing naming conventions
- Add JSDoc comments for new methods
- Follow existing indentation (2 spaces)

### Pull Request Process
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit pull request with clear description

### Commit Messages
```
feat: add new color algorithm
fix: resolve contrast calculation bug
docs: update API documentation
test: add edge case testing
refactor: optimize DOM traversal
```

## 📊 Performance Considerations

### Memory Usage
- Color calculations are stateless
- No global color caches maintained
- DOM references are short-lived

### Execution Time
- Single DOM traversal per theme change
- O(n) complexity where n = DOM elements
- Color calculations are O(1)

### Browser Compatibility
- Uses modern APIs with fallbacks
- Progressive enhancement approach
- Graceful degradation for older browsers

## 🔍 Debugging

### Debug Mode
Future versions may include debug mode:
```javascript
const blackMagic = new BlackMagic({
  debug: true,
  logLevel: 'verbose'
});
```

### Common Issues
1. **Colors not changing** - Check CSS specificity
2. **Poor contrast** - Verify WCAG compliance
3. **Performance issues** - Check DOM complexity

### Development Tools
- Use browser dev tools for color inspection
- Console logging for debugging (temporary)
- Performance tab for optimization

## 📈 Roadmap

### Version 1.x
- [x] Core color adjustment
- [x] WCAG compliance
- [x] Cookie/localStorage persistence
- [x] ES Module support

### Version 2.x (Future)
- [ ] TypeScript definitions
- [ ] Unit test suite
- [ ] Minified builds
- [ ] Performance optimizations
- [ ] Advanced color schemes

### Version 3.x (Future)
- [ ] System theme detection
- [ ] Animation support
- [ ] Framework-specific integrations
- [ ] Advanced accessibility features

## 📚 Additional Resources

- [API Documentation](./API.md)
- [Color Theory Guide](./color-theory.md) (future)
- [Performance Guide](./performance.md) (future)
- [Migration Guide](./migration.md) (future)

## 🐛 Known Issues

Currently no known issues. Please report bugs through GitHub issues.

## 📞 Support

For development questions:
- 📖 Check this documentation
- 🔍 Review examples in `/examples/`
- 💬 Open GitHub discussions
- 🐛 Report issues on GitHub

---

This documentation is maintained by the BlackMagic Framework team.
