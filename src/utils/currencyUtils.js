import fxRates from '../consts/currency.json';

/**
 * utility method to format currencies.
 * @param currencyList
 * @param currencyId
 * @param number
 * @returns {string}
 */
export function displayCurrency({
  currencyList = [],
  currencyId = 'AUD',
  number = 0
}) {
  const displayedCurrency = currencyName({ currencyList, currencyId });
  const localeNumberFormat = currencyId === 'JPY' ? 'ja-JP' : 'en-US';
  const formatting = new Intl.NumberFormat(localeNumberFormat).format(number);
  return `${formatting} ${displayedCurrency}`;
}

/**
 * Return the currency name from the currencylist.
 * @param currencyList
 * @param currencyId
 * @returns {*}
 */
export function currencyName({ currencyList = [], currencyId = "AUD" }) {
  return currencyList.find(currency => currency === currencyId);
}

/**
 * Return the coverted rate from currency to to currency.
 * @param amount
 * @param data
 * @param mode
 * @returns {number}
 */
export function convert({ amount = 0, state = {}, mode = 'D' }) {

  const rate = state.data ? state.data : getDirectConversion(state.convertFrom, state.convertTo);
  const precision = state.convertTo === 'JPY' ? 0 : 2;
  let result;

  if (mode === "D") {
    result = amount * rate;
  }
  if (mode === "I") {
    result = amount * (1 / rate);
  }

  return (Math.round(result * 1000) / 1000).toFixed(precision);
}

/**
 * Used to convert currencies by direct conversion list map.
 * Returns the direct conversion Rates.
 * @param  from currency
 * @param  to currency
 */
export function getDirectConversion(from, to) {
  const conversionRate = {
    'AUDUSD': 0.8371,
    'CADUSD': 0.8711,
    'USDCNY': 6.1715,
    'EURUSD': 1.2315,
    'GBPUSD': 1.5683,
    'NZDUSD': 0.7750,
    'USDJPY': 119.95,
    'EURCZK': 27.6028,
    'EURDKK': 7.4405,
    'EURNOK': 8.6651,
  }
  const exchangeCode = `${from}${to}`;

  return from === to ? 1: conversionRate[exchangeCode];
}

/**
 * This method is used to crossref from fxRates.json. 
 * @param  from currency code 
 * @param  to currency code
 * @returns exchange rate to convert from currency to to currency.
 */
export function getFXRate(from, to) {
  let fxRate = 1;
  if (from !== to) {
    createFrequencyCounter(from, to);

    function createFrequencyCounter(base, term) {
      let exrate = fxRates[base][term];

      if (exrate === 'D') {
        fxRate *= getDirectConversion(base, term);
      } else if (exrate === 'I') {
        let conversionRate = 1 / getDirectConversion(term, base);
        fxRate *= conversionRate;
      } else {
        createFrequencyCounter(base, exrate);
        createFrequencyCounter(exrate, term);
      }
    }
  }
  return fxRate;
}

