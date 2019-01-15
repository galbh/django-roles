import React from 'react'; // eslint-disable-line no-unused-vars
import { mount } from 'enzyme';
import styles from './dialog.component.scss';
import DialogComponent from './dialog.component.jsx';
import { DIALOG_TYPES_DICT } from '../../../common/constants';

describe('DialogComponent', () => {
  let wrapper;
  const closeDialog = jasmine.createSpy('onClick');

  beforeEach(() => {
    const component = (
      <DialogComponent
        open
        title="test-title"
        text="test-text"
        isRtl
        closeDialog={closeDialog}
        type={DIALOG_TYPES_DICT.default}
      />
    );
    wrapper = mount(component);
  });

  it('should render a clear icon', () => {
    expect(wrapper.find('.icon').length).toBeGreaterThan(0);
  });

  it('should activate a callback when clearIcon is clicked', () => {
    wrapper.find('.icon').first().simulate('click');
    expect(closeDialog).toHaveBeenCalled();
  });

  it('should render the text props', () => {
    expect(wrapper.find(`.${styles.content}`).first().text()).toBe('test-text');
  });
});
