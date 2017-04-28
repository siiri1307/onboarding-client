const withPrefix = name => `@exchange/${name}`;

export const GET_SOURCE_FUNDS_START = withPrefix('GET_SOURCE_FUNDS_START');
export const GET_SOURCE_FUNDS_SUCCESS = withPrefix('GET_SOURCE_FUNDS_SUCCESS');
export const GET_SOURCE_FUNDS_ERROR = withPrefix('GET_SOURCE_FUNDS_ERROR');

export const SELECT_EXCHANGE_SOURCES = withPrefix('SELECT_EXCHANGE_SOURCES');

export const GET_TARGET_FUNDS_START = withPrefix('GET_TARGET_FUNDS_START');
export const GET_TARGET_FUNDS_SUCCESS = withPrefix('GET_TARGET_FUNDS_SUCCESS');
export const GET_TARGET_FUNDS_ERROR = withPrefix('GET_TARGET_FUNDS_ERROR');

export const SELECT_TARGET_FUND = withPrefix('SELECT_TARGET_FUND');

export const SIGN_MANDATE_MOBILE_ID_START = withPrefix('SIGN_MANDATE_MOBILE_ID_START');
export const SIGN_MANDATE_MOBILE_ID_START_SUCCESS = withPrefix('SIGN_MANDATE_MOBILE_ID_START_SUCCESS');
export const SIGN_MANDATE_START_ERROR = withPrefix('SIGN_MANDATE_START_ERROR');
export const SIGN_MANDATE_INVALID_ERROR = withPrefix('SIGN_MANDATE_INVALID_ERROR');
export const SIGN_MANDATE_SUCCESS = withPrefix('SIGN_MANDATE_SUCCESS');
export const SIGN_MANDATE_ERROR = withPrefix('SIGN_MANDATE_ERROR');
export const SIGN_MANDATE_MOBILE_ID_CANCEL = withPrefix('SIGN_MANDATE_MOBILE_ID_CANCEL');

export const SIGN_MANDATE_ID_CARD_START = withPrefix('SIGN_MANDATE_ID_CARD_START');
export const SIGN_MANDATE_ID_CARD_START_SUCCESS = withPrefix('SIGN_MANDATE_ID_CARD_START_SUCCESS');
export const SIGN_MANDATE_ID_CARD_SIGN_HASH_SUCCESS = withPrefix('SIGN_MANDATE_ID_CARD_SIGN_HASH_SUCCESS');

export const CHANGE_AGREEMENT_TO_TERMS = withPrefix('CHANGE_AGREEMENT_TO_TERMS');

export const NO_SIGN_MANDATE_ERROR = withPrefix('NO_SIGN_MANDATE_ERROR');

export const QUERY_PARAMETERS = withPrefix('QUERY_PARAMETERS');
