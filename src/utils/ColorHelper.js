/** 
 * Set of methods related to color transformations.
 * 
 * @cat utils
 * @static
*/
/* @echo EXPORT */
class ColorHelper {

  /**
   * Converts number color to RGB object.
   *
   * @param {number} color The color to convert.
   * @returns {Object} The resulting string.
   */
  static hex2rgb(hex) {
    return {
      r: hex >> 16 & 255,
      g: hex >> 8 & 255,
      b: hex & 255
    };
  }

  /**
   * Converts RGB object into number color.
   *
   * @param {Object} rgb The object, which contains 'r', 'g' and 'b' properties.
   * @returns {number} The resulting uint.
   */
  static rgb2hex(rgb) {
    return rgb.r << 16 | rgb.g << 8 | rgb.b;
  }

  /**
   * Converts HSV object into RGB object.
   *
   * @param {Object} hsv The object, which contains 'h', 's' and 'v' properties.
   * @returns {Object} The resulting RGB object.
   */
  static hsv2rgb(hsv) {
    let {h, s, v} = hsv;
    let r, g, b;

    let i = Math.floor(h * 6);
    let f = h * 6 - i;
    let p = v * (1 - s);
    let q = v * (1 - f * s);
    let t = v * (1 - (1 - f) * s);

    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }

    r *= 255;
    g *= 255;
    b *= 255;

    return {r, g, b};
  }

  /**
   * Converts RGB object into HSV object.
   *
   * @param {Object} rgb The object, which contains 'r', 'g' and 'b' properties.
   * @returns {Object} The resulting HSV object.
   */
  static rgb2hsv(rgb) {
    let { r, g, b } = rgb;
    
    r /= 255, g /= 255, b /= 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;

    let d = max - min;
    s = max == 0 ? 0 : d / max;

    if (max == min) {
      h = 0;
    } else {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
  }

    return {h, s, v};
  }

  /**
   * Lineary interpolates between two colors within HSV model.
   * 
   * @param {number} hex1 First color number
   * @param {number} hex2 Second color number 
   * @param {number} factor A value between 0 and 1
   */
  static lerpHSV(hex1, hex2, factor = 0.5) {
    let c1 = ColorHelper.rgb2hsv(ColorHelper.hex2rgb(hex1));
    let c2 = ColorHelper.rgb2hsv(ColorHelper.hex2rgb(hex2));
    
    let h = 0;
    let d = c2.h - c1.h;

    if (c1.h > c2.h) {
      let h3 = c2.h;
      c2.h = c1.h;
      c1.h = h3;
      d = -d;
      factor = 1 - factor;
    }
    
    if (d > 0.5) {
      c1.h = c1.h + 1;
      h = (c1.h + factor * (c2.h - c1.h)) % 1;
    }

    if (d <= 0.5)
      h = c1.h + factor * d;
    
    let s = c1.s + factor * (c2.s - c1.s);
    let v = c1.v + factor * (c2.v - c1.v);

    return ColorHelper.rgb2hex(ColorHelper.hsv2rgb({ h, s, v }));
  }

  /**
   * Converts number color to hex string.
   *
   * @param {number} color The color to convert.
   * @returns {string} The resulting hex string.
   */
  static hexColorToString(color) {
    let parsedColor = color.toString(16);
    return '#000000'.substring(0, 7 - parsedColor.length) + parsedColor;
  }

  /**
   * Converts number color to RGBA string.
   *
   * @param {number} color The color to convert.
   * @returns {string} The resulting string.
   */
  static intToRGBA(color, alpha = 1) {
    const r = (color >> 16) & 255;
    const g = (color >> 8) & 255;
    const b = color & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}