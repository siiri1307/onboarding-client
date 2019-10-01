import React from 'react';
import Types from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Message } from 'retranslate';

import { actions as thirdPillarActions } from '../../../thirdPillar';

export const ThirdPillarSetup = ({
  monthlyContribution,
  onMonthlyContributionChange,
  exchangeableSourceFunds,
  exchangeExistingUnits,
  onExchangeExistingUnitsChange,
  nextPath,
  hasPensionAccount,
}) => (
  <div>
    {hasPensionAccount && <Redirect to={nextPath} />}
    <div className="form-group">
      <label htmlFor="monthly-contribution">
        <Message>thirdPillarFlowSetup.monthlyContributionLabel</Message>
      </label>
      <input
        id="monthly-contribution"
        type="number"
        value={monthlyContribution || ''}
        onChange={event => {
          onMonthlyContributionChange(parseInt(event.target.value, 10));
        }}
        className="form-control form-control-lg"
      />
    </div>

    {exchangeableSourceFunds && exchangeableSourceFunds.length > 0 && (
      <div className="custom-control custom-checkbox mt-3">
        <input
          checked={exchangeExistingUnits}
          onChange={() => onExchangeExistingUnitsChange(!exchangeExistingUnits)}
          type="checkbox"
          className="custom-control-input"
          id="exchange-existing-units-checkbox"
        />

        <label className="custom-control-label" htmlFor="exchange-existing-units-checkbox">
          <Message>thirdPillarFlowSetup.exchangeExistingUnitsLabel</Message>
        </label>
      </div>
    )}

    <div>
      <Link to={nextPath}>
        <button type="button" className="btn btn-primary mt-2" disabled={!monthlyContribution}>
          <Message>thirdPillarFlowSetup.buttonText</Message>
        </button>
      </Link>
    </div>
  </div>
);

ThirdPillarSetup.propTypes = {
  monthlyContribution: Types.number,
  onMonthlyContributionChange: Types.func,
  exchangeableSourceFunds: Types.arrayOf(Types.shape()),
  exchangeExistingUnits: Types.bool,
  onExchangeExistingUnitsChange: Types.func,
  nextPath: Types.string,
  hasPensionAccount: Types.bool,
};

const noop = () => {};

ThirdPillarSetup.defaultProps = {
  monthlyContribution: null,
  onMonthlyContributionChange: noop,
  exchangeableSourceFunds: null,
  exchangeExistingUnits: false,
  onExchangeExistingUnitsChange: noop,
  nextPath: '',
  hasPensionAccount: false,
};

const mapStateToProps = state => ({
  monthlyContribution: state.thirdPillar.monthlyContribution,
  exchangeExistingUnits: state.thirdPillar.exchangeExistingUnits,
  exchangeableSourceFunds: state.thirdPillar.exchangeableSourceFunds,
  hasPensionAccount: !!(
    state.login.token &&
    state.login.user &&
    state.login.user.pensionAccountNumber
  ),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onMonthlyContributionChange: thirdPillarActions.changeMonthlyContribution,
      onExchangeExistingUnitsChange: thirdPillarActions.changeExchangeExistingUnits,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThirdPillarSetup);
