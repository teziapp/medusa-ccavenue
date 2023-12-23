import { MedusaError, MedusaErrorTypes } from "@medusajs/utils";

export const supportedCurrencies = [
  "INR",
  "SGD",
  "GBP",
  "USD",
  "OMR",
  "BHD",
  "AED",
  "EUR",
  "CAD",
  "CHF",
  "THB",
  "LKR",
  "MYR",
  "QAR",
  "HKD",
  "KWD",
  "BDT",
  "NZD",
  "AUD",
  "NPR",
  "CNY",
  "JPY",
  "KES",
  "MUR",
  "PHP",
  "SAR",
  "ZAR",
] as const;

export type SupportedCurrency = (typeof supportedCurrencies)[number];

export function isSupportedCurrency(
  currencyCode: string,
): currencyCode is SupportedCurrency {
  return supportedCurrencies.includes(currencyCode as SupportedCurrency);
}

export function validateCurrencyCode(currencyCode: string): SupportedCurrency {
  if (!isSupportedCurrency(currencyCode)) {
    // Try uppercasing the code
    if (isSupportedCurrency(currencyCode.toUpperCase())) {
      return currencyCode.toUpperCase() as SupportedCurrency;
    }

    throw new MedusaError(
      MedusaErrorTypes.INVALID_ARGUMENT,
      `Unsupported currency code provided: ${currencyCode}`,
    );
  }

  return currencyCode as SupportedCurrency;
}
