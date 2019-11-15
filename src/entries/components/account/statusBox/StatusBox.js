import React from 'react';
import { Message } from 'retranslate';
import { PropTypes as Types } from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import StatusBoxRow from './statusBoxRow';

export const StatusBox = ({
  conversion,
  memberNumber,
  loading,
  secondPillarFunds,
  thirdPillarFunds,
}) => {
  const joinTuleva2 = !(
    conversion.secondPillar.selectionComplete && conversion.secondPillar.transfersComplete
  );
  const joinTuleva3 = !(
    conversion.thirdPillar.selectionComplete && conversion.thirdPillar.transfersComplete
  );

  const isTulevaMember = memberNumber != null;

  const tulevaData = isTulevaMember
    ? [<Message params={{ memberNumber }}>account.member.statement</Message>]
    : [<Message>account.non.member.statement</Message>];

  return (
    <>
      <div className="row ">
        <div className="col-12">
          <div className="px-col mb-4">
            <p className="mb-4 lead">
              <Message>account.status.choices</Message>
            </p>
          </div>
        </div>
      </div>

      <div className="card card-secondary">
        <StatusBoxRow
          ok={!joinTuleva2}
          showAction={!loading}
          name={<Message>account.status.choice.pillar.second</Message>}
          lines={secondPillarFunds.filter(fund => fund.activeFund).map(({ name }) => name)}
        >
          {joinTuleva2 && (
            <Link to="/2nd-pillar-flow" className="btn btn-light">
              <Message>account.status.choice.join.tuleva.2</Message>
            </Link>
          )}
        </StatusBoxRow>

        <StatusBoxRow
          ok={!joinTuleva3}
          showAction={!loading}
          name={<Message>account.status.choice.pillar.third</Message>}
          lines={thirdPillarFunds.filter(fund => fund.activeFund).map(({ name }) => name)}
        >
          {joinTuleva3 && (
            <Link to="/3rd-pillar-flow" className="btn btn-light">
              <Message>account.status.choice.join.tuleva.3</Message>
            </Link>
          )}
        </StatusBoxRow>

        <StatusBoxRow
          last
          ok={isTulevaMember}
          showAction={!loading}
          name={<Message>account.status.choice.tuleva</Message>}
          lines={tulevaData}
        >
          {!isTulevaMember && (
            <span>
              <a className="btn btn-light" href="https://tuleva.ee/tulundusyhistu/">
                <Message>account.status.choice.join.tuleva</Message>
              </a>
            </span>
          )}
        </StatusBoxRow>
      </div>
      <br />
    </>
  );
};

StatusBox.defaultProps = {
  memberNumber: null,
  conversion: {},
  loading: false,
  secondPillarFunds: [],
  thirdPillarFunds: [],
};

StatusBox.propTypes = {
  memberNumber: Types.number,
  conversion: Types.shape({}),
  loading: Types.bool,
  secondPillarFunds: Types.arrayOf(Types.shape({})),
  thirdPillarFunds: Types.arrayOf(Types.shape({})),
};

const mapStateToProps = state => ({
  memberNumber: (state.login.user || {}).memberNumber,
  conversion: state.login.userConversion,
  loading: state.login.loadingUserConversion,
  secondPillarFunds: state.exchange.sourceFunds,
  thirdPillarFunds: state.thirdPillar.sourceFunds,
});

export default connect(mapStateToProps)(StatusBox);
