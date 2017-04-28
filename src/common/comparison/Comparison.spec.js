import React from 'react';
import { Message } from 'retranslate';
import { shallow } from 'enzyme';

import Comparison from './Comparison';

describe('Comparison widget', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Comparison />);
  });

  it('shows comparison intro text', () => {
    expect(component.contains(<Message>comparison.intro</Message>)).toBe(true);
  });

  it('shows close button', () => {
    expect(component.contains(<Message>comparison.close</Message>)).toBe(true);
  });

  it('renders as a modal when it is overlayed', () => {
    const isComponentModal = () => component.at(0).hasClass('tv-modal');
    expect(isComponentModal()).toBe(false);
    component.setProps({ overlayed: true });
    expect(isComponentModal()).toBe(true);
  });
});
