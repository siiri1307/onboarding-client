import { chain, sumBy } from 'lodash';

export function calculateTotals(input) {
  return {
    contributions: sumBy(input, 'contributions'),
    value: sumBy(input, 'value'),
    profit: sumBy(input, 'value') - sumBy(input, 'contributions'),
  };
}

export function getSumOfPillars(input) {
  return chain(input)
    .groupBy('pillar')
    .map((v, i) => {
      return {
        pillar: i,
        contributions: v.reduce((prev, cur) => {
          return prev + cur.contributionSum;
        }, 0),
        value: v.reduce((prev, cur) => {
          return prev + cur.price;
        }, 0),
      };
    })
    .value();
}
