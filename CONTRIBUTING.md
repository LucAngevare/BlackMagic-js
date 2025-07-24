# Contributing to BlackMagic Framework

Thank you for your interest in contributing to BlackMagic! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)

## Code of Conduct

By participating in this project, you agree to abide by our code of conduct:

- Be respectful and inclusive
- Focus on constructive feedback
- Help maintain a welcoming environment for all contributors

## Getting Started

1. Fork the repository on GitHub
2. Clone your fork locally
3. Create a new branch for your feature or bug fix
4. Make your changes
5. Test your changes thoroughly
6. Submit a pull request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/LucAngevare/BlackMagic-js.git
cd BlackMagic-js

# Install dependencies (optional, for minification)
npm install

# Start development server
npm run dev

# Build the project
npm run build
```

## Project Structure

```
BlackMagic-js/
├── src/                 # Source code
│   └── blackmagic.js   # Main framework file
├── dist/               # Built files
│   ├── blackmagic.js   # UMD build
│   ├── blackmagic.esm.js # ES Module build
│   └── blackmagic.min.js # Minified build
├── examples/           # Usage examples
├── docs/               # Documentation
└── package.json        # Project configuration
```

## Making Changes

### Before You Start

1. Check existing issues and pull requests
2. Create an issue to discuss major changes
3. Follow the existing code style
4. Write clear, concise commit messages

### Types of Contributions

- **Bug fixes**: Fix existing functionality issues
- **Features**: Add new functionality
- **Documentation**: Improve or add documentation
- **Examples**: Add new usage examples
- **Performance**: Optimize existing code

### Branch Naming

- `feature/description` - for new features
- `fix/description` - for bug fixes
- `docs/description` - for documentation changes
- `perf/description` - for performance improvements

## Testing

Before submitting changes:

1. Test all examples in `examples/` directory
2. Verify the build process works: `npm run build`
3. Test in multiple browsers
4. Check console for errors
5. Verify accessibility features work correctly

### Manual Testing Checklist

- [ ] Basic dark mode toggle works
- [ ] Theme persistence across page reloads
- [ ] Cookie and localStorage fallbacks
- [ ] Contrast ratios meet WCAG guidelines
- [ ] Custom background colors work
- [ ] Theme classes work correctly
- [ ] All examples function properly
- [ ] No console errors

## Submitting Changes

### Pull Request Process

1. Update documentation if needed
2. Add examples for new features
3. Update CHANGELOG.md
4. Ensure all tests pass
5. Write a clear pull request description

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] All examples work
- [ ] No console errors

## Checklist
- [ ] Code follows project style
- [ ] Documentation updated
- [ ] Examples added/updated
- [ ] CHANGELOG.md updated
```

## Style Guidelines

### JavaScript

- Use modern ES6+ features
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Keep functions focused and small
- Use meaningful variable names

### Code Style

```javascript
// Good
class BlackMagic {
  /**
   * Initialize the BlackMagic framework
   * @param {Object} options - Configuration options
   */
  constructor(options = {}) {
    this.backgroundColor = options.backgroundColor || '#000';
    // ...
  }
}

// Avoid
class blackmagic {
  constructor(opts) {
    this.bg = opts.bg || '#000';
    // ...
  }
}
```

### Documentation

- Use clear, concise language
- Include code examples
- Explain the "why" not just the "how"
- Keep examples simple and focused

### Commit Messages

Use the conventional commit format:

```
type(scope): description

feat(core): add support for custom theme classes
fix(persistence): resolve localStorage fallback issue
docs(api): update configuration options
perf(colors): optimize color calculation algorithm
```

## Questions?

- Open an issue for bugs or feature requests
- Check existing documentation first
- Be specific about your environment and use case

Thank you for contributing to BlackMagic Framework!
