class BlackMagic {
  constructor(options = {}) {
    this.cookieName = options.cookieName || 'darkmode';  // Cookie to store the theme
    this.backgroundColor = options.backgroundColor || '#000'; // Default background color for dark mode
    this.localStorageKey = options.localStorageKey || 'darkmode';  // LocalStorage alternative for storing mode
    this.themeClass = options.themeClass || undefined;  // The class used for dark mode (you can customize it)
    this.cookieDuration = options.cookieDuration || 365; // Cookie expiration in days
    this.autoSwitch = options.autoSwitch !== undefined ? options.autoSwitch : true; // Auto-switch based on stored theme
    this.factor = options.factor || 0.4; // Factor to adjust lightness or darkness for dark mode
    this.currentTheme = options.currentTheme || 'light'; // Track current theme
    this.initialize();
  }

  // Initialize: Check if the theme is stored in a cookie or localStorage, and set it on the page.
  initialize() {
    if (this.autoSwitch) {
      const storedMode = this.getStoredTheme();
      if (storedMode) {
        this.currentTheme = storedMode;
        this.applyTheme(storedMode);
      } else {
        this.currentTheme = 'light';
        this.applyTheme('light');  // Default to light if no stored theme is found
      }
    } else {
      // If autoSwitch is disabled, still check what's stored but don't apply
      const storedMode = this.getStoredTheme();
      this.currentTheme = storedMode || 'light';
    }
  }

  // Apply the selected theme to the document body.
  applyTheme(theme) {
    // Set current theme property
    this.currentTheme = theme;
    
    if (this.themeClass) {
      const body = document.body;
      if (theme === 'dark') {
        body.classList.add(this.themeClass);
      } else {
        body.classList.remove(this.themeClass);
      }
    } else {
      // Only adjust colors if no theme class is specified
      this.adjustColorsForTheme(theme);
    }
    
    this.saveTheme(theme);
  }

  // Save theme to both cookie and localStorage
  saveTheme(theme) {
    this.setCookie(this.cookieName, theme, this.cookieDuration);
    this.setLocalStorage(this.localStorageKey, theme);
  }

  // Get stored theme from cookie or localStorage (cookie takes priority)
  getStoredTheme() {
    const cookieTheme = this.getCookie(this.cookieName);
    if (cookieTheme) {
      return cookieTheme;
    }
    return this.getLocalStorage(this.localStorageKey);
  }

  // Toggle between dark and light mode.
  toggle() {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  // Get current theme
  getCurrentTheme() {
    if (this.currentTheme) {
      return this.currentTheme;
    }
    
    if (this.themeClass) {
      return document.body.classList.contains(this.themeClass) ? 'dark' : 'light';
    }
    
    // Check if background color indicates dark mode
    const bgColor = document.body.style.backgroundColor;
    if (bgColor && bgColor !== '' && bgColor !== 'rgb(255, 255, 255)') {
      return 'dark';
    }
    
    return 'light';
  }

  // Set a cookie with an expiration date.
  setCookie(name, value, days) {
    if (days === 0) {
      // Session cookie (expires when browser closes)
      document.cookie = `${name}=${value};path=/`;
    } else {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }
  }

  // Get the value of a cookie by name.
  getCookie(name) {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  // Set value in localStorage
  setLocalStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }

  // Get value from localStorage
  getLocalStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage not available:', e);
      return null;
    }
  }

  // Convert RGB to HSL
  rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    
    return [h * 360, s, l]; // HSL in [0-360, 0-1, 0-1]
  }

  // Adjust the lightness (darkening or lightening)
  adjustLightness(h, s, l, adjustBy) {
    l = Math.max(0, Math.min(1, l + adjustBy)); // Keep lightness between 0 and 1
    return [h, s, l];
  }

  // Get the computed color of an element (RGB or Hex)
  getColorFromElement(element) {
    let style = window.getComputedStyle(element);
    let color = style.color; // Get the color property

    // Check if color is in RGB or RGBA format
    if (color.startsWith('rgb')) {
      let rgb = color.match(/\d+/g).map(Number); // Extract RGB values
      return [rgb[0] || 0, rgb[1] || 0, rgb[2] || 0]; // Ensure we have 3 values
    }
    
    // Check if color is in HEX format
    if (color.startsWith('#')) {
      return this.hexToRgb(color);
    }

    // Handle named colors or if no valid color found
    // For dark text (common default), return near-black
    if (color === 'black' || !color || color === 'initial' || color === 'inherit') {
      return [0, 0, 0]; // Black
    }
    
    // For other cases, assume dark text as default
    return [0, 0, 0]; // Default to black text
  }

  // Convert Hex to RGB
  hexToRgb(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
  }

  // Calculate relative luminance for contrast calculations
  getLuminance(r, g, b) {
    // Normalize RGB values
    r /= 255;
    g /= 255;
    b /= 255;
    
    // Apply gamma correction
    r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
    g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
    b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);
    
    // Calculate luminance
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Calculate contrast ratio between two colors
  getContrastRatio(color1, color2) {
    const [r1, g1, b1] = color1;
    const [r2, g2, b2] = color2;
    
    const lum1 = this.getLuminance(r1, g1, b1);
    const lum2 = this.getLuminance(r2, g2, b2);
    
    const lighter = Math.max(lum1, lum2);
    const darker = Math.min(lum1, lum2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  // Get background color of an element
  getBackgroundColor(element) {
    let current = element;
    
    // Walk up the DOM tree to find a background color
    while (current && current !== document.body) {
      const style = window.getComputedStyle(current);
      const bgColor = style.backgroundColor;
      
      if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
        if (bgColor.startsWith('rgb')) {
          let rgb = bgColor.match(/\d+/g).map(Number);
          return [rgb[0] || 255, rgb[1] || 255, rgb[2] || 255];
        }
      }
      current = current.parentElement;
    }
    
    // Default to body background or white
    const bodyBg = document.body.style.backgroundColor;
    if (bodyBg && bodyBg !== '') {
      if (bodyBg.startsWith('rgb')) {
        let rgb = bodyBg.match(/\d+/g).map(Number);
        return [rgb[0] || 255, rgb[1] || 255, rgb[2] || 255];
      } else if (bodyBg.startsWith('#')) {
        return this.hexToRgb(bodyBg);
      }
    }
    
    // Default background color based on theme
    return this.currentTheme === 'dark' ? this.hexToRgb(this.backgroundColor) : [255, 255, 255];
  }

  // Find optimal text color for given background
  getOptimalTextColor(backgroundColor, originalTextColor) {
    const [bgR, bgG, bgB] = backgroundColor;
    const [textR, textG, textB] = originalTextColor;
    
    // Calculate current contrast
    const currentContrast = this.getContrastRatio(originalTextColor, backgroundColor);
    
    // If contrast is already good (4.5:1 or better), keep original color
    if (currentContrast >= 4.5) {
      return originalTextColor;
    }
    
    // Determine if background is dark or light
    const bgLuminance = this.getLuminance(bgR, bgG, bgB);
    const isDarkBackground = bgLuminance < 0.5;
    
    // For dark backgrounds, use light text; for light backgrounds, use dark text
    if (isDarkBackground) {
      // Try to lighten the original color while maintaining hue
      let [h, s, l] = this.rgbToHsl(textR, textG, textB);
      
      // If original text was very dark, make it light
      if (l < 0.5) {
        l = 0.9; // Very light
      } else {
        l = Math.max(0.8, l); // Ensure it's light enough
      }
      
      // Convert back to RGB and check contrast
      const hslToRgb = this.hslToRgb(h, s, l);
      const newContrast = this.getContrastRatio(hslToRgb, backgroundColor);
      
      // If still not enough contrast, use pure white
      if (newContrast < 4.5) {
        return [255, 255, 255];
      }
      
      return hslToRgb;
    } else {
      // Light background - use dark text
      let [h, s, l] = this.rgbToHsl(textR, textG, textB);
      
      // Make text dark
      if (l > 0.5) {
        l = 0.2; // Very dark
      } else {
        l = Math.min(0.3, l); // Ensure it's dark enough
      }
      
      const hslToRgb = this.hslToRgb(h, s, l);
      const newContrast = this.getContrastRatio(hslToRgb, backgroundColor);
      
      // If still not enough contrast, use pure black
      if (newContrast < 4.5) {
        return [0, 0, 0];
      }
      
      return hslToRgb;
    }
  }

  // Convert HSL back to RGB
  hslToRgb(h, s, l) {
    h /= 360;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 1/6) {
      r = c; g = x; b = 0;
    } else if (h < 2/6) {
      r = x; g = c; b = 0;
    } else if (h < 3/6) {
      r = 0; g = c; b = x;
    } else if (h < 4/6) {
      r = 0; g = x; b = c;
    } else if (h < 5/6) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }
    
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    
    return [r, g, b];
  }

  // Adjust the colors of all elements based on the selected theme
  adjustColorsForTheme(theme) {
    const elements = document.querySelectorAll('*'); // Get all elements on the page
    
    if (theme === 'dark') {
      document.body.style.backgroundColor = this.backgroundColor; // Set dark background
      // Set default text color for body
      document.body.style.color = '#e0e0e0';
    } else {
      document.body.style.backgroundColor = ''; // Reset to default background
      document.body.style.color = ''; // Reset to default text color
    }

    elements.forEach(element => {
      if (theme === 'light') {
        // Remove any custom color styles to restore original colors
        element.style.removeProperty('color');
        return;
      }

      // Skip certain elements that shouldn't have their colors changed
      const tagName = element.tagName.toLowerCase();
      if (tagName === 'script' || tagName === 'style' || tagName === 'meta' || tagName === 'link') {
        return;
      }

      // Only apply color adjustments in dark mode
      let originalTextColor = this.getColorFromElement(element);
      let backgroundColor = this.getBackgroundColor(element);
      
      // Skip if we couldn't get valid color values
      if (!originalTextColor || !backgroundColor) {
        return;
      }
      
      // Get optimal text color based on contrast
      let optimalTextColor = this.getOptimalTextColor(backgroundColor, originalTextColor);
      let [r, g, b] = optimalTextColor;
      
      let newColor = `rgb(${r}, ${g}, ${b})`;

      // Apply the new color as a custom style
      element.style.setProperty('color', newColor, 'important');
    });
  }
}