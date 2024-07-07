function getBrightness(hexColor: string) {
    // Remove the hash if it's there
    hexColor = hexColor.replace('#', '');
  
    // Convert the color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate the brightness
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    return brightness;
  }
  
  export function getTextColor(hexColor: string) {
    if(!hexColor) return;
    const brightness = getBrightness(hexColor);
    return brightness > 186 ? '#000000' : '#FFFFFF'; // Use white text if the background is dark, black if it's light
  }

  /**
 * Convert hex color to RGB.
 * @param {string} hex - The hex color code.
 * @returns {string} The RGB representation of the color.
 */
  export function hexToRgb(hex: string, opacity: number): string {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result !== null) {
      return `rgba(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}, ${opacity})`;
    } else {
      // handle the case when the result is null
      return '';
    }
  }