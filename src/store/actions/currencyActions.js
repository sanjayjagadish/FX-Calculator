
import {getFXRate} from '../../utils/currencyUtils'

import {
  FETCH_CURRENCY,
  HANDEL_ERROR,
  FROM_CHANGE_INPUT,
  TO_CHANGE_INPUT,
  FROM_CURRENCY_CHANGE,
  TO_CURRENCY_CHANGE
} from "./types";

/**
 * @description Action responsible for error handling
 * @param payload
 * @returns {{type: string, payload: *}}
 */
const handleError = payload => ({
  type: HANDEL_ERROR,
  payload
});


/**
 * Get the fx rate required to caluclate the conversion.
 * @param fromCurrency
 * @param toCurrency
 */
export function getRateRequest(fromCurrency, toCurrency) {
  return getFXRate(fromCurrency, toCurrency)
}

/**
 * Action responsible for dispatching get rate.
 * @param fromCurrency 
 * @param toCurrency 
 */
export const getRate = (fromCurrency, toCurrency) => dispatch => {
  
  try {
    const data = getRateRequest(fromCurrency, toCurrency);
    
    dispatch({
      type: FETCH_CURRENCY,
      payload: data
    });
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const fromChangeInput = payload => {
  return {
    type: FROM_CHANGE_INPUT,
    payload
  };
};

export const toChangeInput = payload => {
  return {
    type: TO_CHANGE_INPUT,
    payload
  };
};

/**
 * Action responsible for from currency change request.
 * @param payload
 * @returns {Function}
 */
export const fromCurrencyChange = payload => (dispatch, getState) => {
  let result = getRateRequest(payload, getState().currency.convertTo);

      dispatch({
        type: FETCH_CURRENCY,
        payload: result
      });

      dispatch({
        type: FROM_CURRENCY_CHANGE,
        payload: payload
      });

      dispatch({
        type: FROM_CHANGE_INPUT,
        payload: getState().currency.from
      });
};

/**
 * Action responsible for to currency change request.
 * @param payload
 * @returns {Function}
 */
export const toCurrencyChange = payload => (dispatch, getState) => {
   let result = getRateRequest(getState().currency.convertFrom, payload);

      dispatch({
        type: FETCH_CURRENCY,
        payload: result
      });

      dispatch({
        type: TO_CURRENCY_CHANGE,
        payload: payload
      });

      dispatch({
        type: FROM_CHANGE_INPUT,
        payload: getState().currency.from
      });
    
};
