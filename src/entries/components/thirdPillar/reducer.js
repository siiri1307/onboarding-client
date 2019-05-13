import { QUERY_PARAMETERS } from './constants';
import initialState from './initialState';

export default function thirdPillarReducer(state = initialState, action) {
  const { type, query } = action;

  switch (type) {
    case QUERY_PARAMETERS:
      return {
        ...state,
        monthlyContribution:
          parseInt(query.monthlyThirdPillarContribution, 10) || state.monthlyContribution || null,
        exchangeExistingUnits:
          query.exchangeExistingThirdPillarUnits === 'true' || state.exchangeExistingUnits,
      };
    default:
      return state;
  }
}
