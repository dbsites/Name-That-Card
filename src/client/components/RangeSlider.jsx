import React from 'react';
// import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import '../styles/slider.scss';
import '../styles/bootstrap.scss';
import '../styles/bootstrap_white.scss';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

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
