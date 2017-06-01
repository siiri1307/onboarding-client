import React, { PropTypes as Types } from 'react';
import { connect } from 'react-redux';

import { Message } from 'retranslate';

export const BringPensionToTulevaList = ({ className, showAlternative, age }) => {
  if (!showAlternative) {
    return (
      <ul className={className}>
        <li>
          <span>
            <span className="lead highlight">
              <Message>new.user.flow.new.user.cheapest.in.estonia</Message>
            </span>
            <Message>new.user.flow.new.user.cheapest.fund.management.fee</Message>
            <strong>0,34%</strong>
          </span>
        </li>
        <li><Message>new.user.flow.new.user.safety</Message></li>
        {/* <li><Message>new.user.flow.new.user.money.to.self</Message></li>*/}
      </ul>
    );
  }
  if (age < 55) {
    return (
      <ul className={className}>
        <li>
          <span>
            <span className="lead highlight">
              <Message>new.user.flow.new.user.cheapest</Message>
            </span>
            <Message>new.user.flow.new.user.stock.investing.fund</Message>
            <strong>
              <Message>new.user.flow.new.user.management.fee</Message>
            </strong>
          </span>
        </li>
        <li><Message>new.user.flow.new.user.safety</Message></li>
      </ul>
    );
  }
  return (
    <ul className={className}>
      <li><Message>new.user.flow.new.user.no.benefit</Message></li>
    </ul>
  );
};

BringPensionToTulevaList.defaultProps = {
  className: '',
  showAlternative: false,
  age: 18,
};

BringPensionToTulevaList.propTypes = {
  className: Types.string,
  showAlternative: Types.bool,
  age: Types.number,
};

const mapStateToProps = state => ({
  age: (state.login.user || {}).age,
});

const connectToRedux = connect(mapStateToProps);

export default connectToRedux(BringPensionToTulevaList);
