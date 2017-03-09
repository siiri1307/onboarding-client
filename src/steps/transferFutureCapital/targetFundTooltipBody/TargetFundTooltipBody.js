import React, { PropTypes as Types } from 'react';
import { Message } from 'retranslate';

import advancedFundDiagram from './advanced.png';
import conservativeFundDiagram from './conservative.png';

const ADVANCED_TARGET_FUND_ISIN = 'AE123232334';
const CONSERVATIVE_TARGET_FUND_ISIN = 'AE123232335';

function getTooltipBodyData(fundIsin) {
  if (ADVANCED_TARGET_FUND_ISIN === fundIsin) {
    return {
      funds: [
        `target.funds.${ADVANCED_TARGET_FUND_ISIN}.tooltip.investment.1`,
        `target.funds.${ADVANCED_TARGET_FUND_ISIN}.tooltip.investment.2`,
        `target.funds.${ADVANCED_TARGET_FUND_ISIN}.tooltip.investment.3`,
        `target.funds.${ADVANCED_TARGET_FUND_ISIN}.tooltip.investment.4`,
      ],
      diagram: advancedFundDiagram,
    };
  }
  if (CONSERVATIVE_TARGET_FUND_ISIN === fundIsin) {
    return {
      funds: [
        `target.funds.${CONSERVATIVE_TARGET_FUND_ISIN}.tooltip.investment.1`,
        `target.funds.${CONSERVATIVE_TARGET_FUND_ISIN}.tooltip.investment.2`,
        `target.funds.${CONSERVATIVE_TARGET_FUND_ISIN}.tooltip.investment.3`,
        `target.funds.${CONSERVATIVE_TARGET_FUND_ISIN}.tooltip.investment.4`,
      ],
      diagram: conservativeFundDiagram,
    };
  }
  return [];
}

const TargetFundTooltipBody = ({ targetFundIsin }) => (
  <div>
    <h3 className="mt-3 mb-3"><Message>{`target.funds.${targetFundIsin}.tooltip.title`}</Message></h3>
    <img
      src={getTooltipBodyData(targetFundIsin).diagram}
      alt="Fund diagram" width="180px" height="180px" className="diagram"
    />
    <ul className="mt-4">
      {getTooltipBodyData(targetFundIsin).funds.map(item => (
        <li key={item}>
          <Message>{item}</Message>
        </li>
      ))}
    </ul>
  </div>
);

TargetFundTooltipBody.defaultProps = {
  targetFundIsin: '',
};

TargetFundTooltipBody.propTypes = {
  targetFundIsin: Types.string,
};

export default TargetFundTooltipBody;