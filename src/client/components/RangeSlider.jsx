import React from 'react';
// import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import '../styles/slider.scss';
import '../styles/bootstrap.scss';
import '../styles/bootstrap_white.scss';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSlider = (props) => {
  let {maxYear, minYear, updateMinMaxYears} = props;
  maxYear = Number(maxYear);
  minYear = Number(minYear);
  return (
    <div>
      <div className="sliderContainer">
        <p id="text--center">Select Year Range</p>
        <Range onChange={updateMinMaxYears} min={minYear} max={maxYear} defaultValue={[minYear, maxYear]} allowCross={false} tipFormatter={value => `${value}`} />
      </div>
    </div>
  )
};

export default RangeSlider;
