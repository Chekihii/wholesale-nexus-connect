
/**
 * Format a number as Kenyan Shillings
 * @param amount The amount to format
 * @param decimals The number of decimal places to show (default: 0)
 * @returns Formatted currency string
 */
export const formatKES = (amount: number, decimals: number = 0): string => {
  return `KSh ${amount.toLocaleString('en-KE', { 
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals 
  })}`;
};

/**
 * Parse a currency string into a number
 * @param currencyString String with currency format (e.g., "KSh 1,234")
 * @returns The parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  if (!currencyString) return 0;
  
  // Remove currency symbol and commas, then parse
  const numericString = currencyString
    .replace(/[^\d.-]/g, '')
    .trim();
  
  return parseFloat(numericString) || 0;
};
