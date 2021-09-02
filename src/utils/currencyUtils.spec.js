import { displayCurrency, convert, currencyName, getFXRate, getDirectConversion } from "./currencyUtils";


describe("Display Currency", () => {
  const currencyList = ['AUD', 'CAD', 'CNY', 'CZK', 'DKK', 'EUR', 'GBP', 'JPY', 'NOK', 'NZD', 'USD'];

  it("should display the amount and the currency name in en-US locale", () => {
    expect(displayCurrency({currencyList, currencyId:"AUD", number: 10})).toBe(`10 ${currencyList[0]}`);
  });

  it("should display the amount and the currency name in ja-JP locale", () => {
    expect(currencyName({currencyList, currencyId:"JPY"})).toEqual(currencyList[7]);
  });


});

describe("Convert", () => {
  const state = {
     data: 0.8371,
     convertFrom: 'AUD',
     convertTo: 'USD'
  };

  it("should convert from AUD to USD", () => {
    const convertFrom = convert({amount:10, state, mode:"D"});
    expect(convertFrom).toBe("8.37");
  });

  it("should convert from USD to AUD", () => {
    const convertTo = convert({amount:10, state, mode:"I"});
    expect(convertTo).toBe("11.95");
  });
});

describe("getDirectConversion", () => {
  const conversionRates = [{from: "AUD", to: "USD"}, {from: "USD", to: "USD"}];

  it("should return conversion rate from AUD to USD", () => {
    const conversionRate = getDirectConversion(conversionRates[0].from, conversionRates[0].to);
    expect(conversionRate).toBe(0.8371);
  });

  it("should return conversion rate from USD to USD", () => {
    const conversionRate = getDirectConversion(conversionRates[1].from, conversionRates[1].to);
    expect(conversionRate).toBe(1);
  });
  

  describe("getFXRate", () => {
    

    it("should return conversion rate from AUD to JPY", () => {
      const conversionRate = getFXRate("AUD", "JPY");
      expect(conversionRate).toBe(100.410145);
    });
  });

  it("should return conversion rate from NOK to USD", () => {
    const conversionRate = getFXRate("NOK", "USD");
    expect(conversionRate).toBe(0.14212184510276857);
  });
});

