import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const RangeSlider = (props) => {
  return (
    <div className="container">
      <div className="sliderContainer">
        <p id="sliderTitle">Select Year Range</p>
        <Range min={1900} max={2017} defaultValue={[1900, 2017]} allowCross={false} tipFormatter={value => `${value}`} />
      </div>
    </div>
  )
};

export default RangeSlider;
