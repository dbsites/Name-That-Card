import React from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import '../styles/slider.scss';
import '../styles/bootstrap.scss';
import '../styles/bootstrap_white.scss';

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
  let {maxYear, minYear} = props;
  maxYear = Number(maxYear);
  minYear = Number(minYear);
  return (
    <div className="container">
      <div className="sliderContainer">
        <p id="sliderTitle">Select Year Range</p>
        <Range min={minYear} max={maxYear} defaultValue={[1900, 2017]} allowCross={false} tipFormatter={value => `${value}`} />
      </div>
    </div>
  )
};

export default RangeSlider;
