import React, { Component } from 'react';
import { Message } from 'retranslate';

import getFromDateOptions from './options';
import Select from './Select';
import { getReturnComparison, Key } from './api';

type NullableNumber = number | null;

interface Option {
  value: any;
  label: string;
}

interface Props {
  token: string;
}

interface State {
  loading: boolean;
  fromDateOptions: Option[];
  fromDate: string;
  selectedPersonalKey: Key;
  personalReturn: NullableNumber;
  pensionFundReturn: NullableNumber;
  indexReturn: NullableNumber;
}

const formatPercentage = (percentage: NullableNumber): string =>
  percentage ? `${(percentage * 100).toFixed(1)}%` : '-';

const LOADER = '...';

export default class ReturnComparison extends Component<Props, State> {
  state = {
    fromDateOptions: getFromDateOptions(),
    fromDate: getFromDateOptions()[0].value,
    loading: false,
    selectedPersonalKey: Key.SECOND_PILLAR,
    personalReturn: null,
    pensionFundReturn: null,
    indexReturn: null,
  };

  componentDidMount(): void {
    const { token } = this.props;

    if (token) {
      this.loadReturns();
    }
  }

  async loadReturns(): Promise<any> {
    const { token } = this.props;
    const { fromDate, selectedPersonalKey } = this.state;

    this.setState({ loading: true });
    try {
      const {
        personal: personalReturn,
        pensionFund: pensionFundReturn,
        index: indexReturn,
      } = await getReturnComparison(fromDate, { personalKey: selectedPersonalKey }, token);
      this.setState({ personalReturn, pensionFundReturn, indexReturn });
    } catch (ignored) {
      this.setState({ personalReturn: null, pensionFundReturn: null, indexReturn: null });
    } finally {
      this.setState({ loading: false });
    }
  }

  render(): JSX.Element {
    const {
      loading,
      fromDateOptions,
      fromDate,
      selectedPersonalKey,
      personalReturn,
      pensionFundReturn,
      indexReturn,
    } = this.state;

    return (
      <div className="mt-5">
        <div className="row mb-2">
          <div className="col-md-8">
            <p className="mt-1 lead">
              <Message>returnComparison.title</Message>
            </p>
          </div>
          <div className="col-md-4 text-md-right">
            <Select
              options={fromDateOptions}
              selected={fromDate}
              onChange={(date: string): void => {
                this.setState({ fromDate: date }, () => {
                  this.loadReturns();
                });
              }}
            />
          </div>
        </div>

        <div className="card card-primary p-4">
          <div className="row">
            <div className="col-sm-4 text-center">
              <Select
                options={[
                  { value: Key.SECOND_PILLAR, label: 'returnComparison.personal.secondPillar' },
                  { value: Key.THIRD_PILLAR, label: 'returnComparison.personal.thirdPillar' },
                ]}
                selected={selectedPersonalKey}
                onChange={(key: Key): void => {
                  this.setState({ selectedPersonalKey: key }, () => {
                    this.loadReturns();
                  });
                }}
              />
              <div className="h2 text-success mt-2">
                {loading ? LOADER : formatPercentage(personalReturn)}
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <Select
                options={[{ value: Key.EPI, label: 'returnComparison.pensionFund' }]}
                selected={Key.EPI}
                disabled
              />
              <div className="h2 mt-2">
                {loading ? LOADER : formatPercentage(pensionFundReturn)}
              </div>
            </div>
            <div className="col-sm-4 text-center">
              <Select
                options={[{ value: Key.MARKET, label: 'returnComparison.index' }]}
                selected={Key.MARKET}
                disabled
              />
              <div className="h2 text-primary mt-2">
                {loading ? LOADER : formatPercentage(indexReturn)}
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <a
              href="https://docs.google.com/document/d/1tKHNIUmQjPpO8cmZUOcVbWZR1yBZfuZnUNUDmxs9T4A"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Message>returnComparison.explanationLinkText</Message>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
