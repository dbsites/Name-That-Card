import React from 'react';
// import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import '../styles/slider.scss';
import '../styles/bootstrap.scss';
import '../styles/bootstrap_white.scss';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const RangeSlider = (props) => {
  let { maxYear, minYear, updateMinMaxYears } = props;
  maxYear = Number(maxYear);
  minYear = Number(minYear);

  return (
    <div className="innerSliderContainer">
      {/* <span id="text--center">Select Year Range</span> */}
      <span>YEARS</span>
      <span>{minYear}</span>
      <Range className="slider" onChange={updateMinMaxYears} min={minYear} max={maxYear} defaultValue={[minYear, maxYear]} allowCross={false} tipFormatter={value => `${value}`} />
      <span>{maxYear}</span>
    </div>
  );
};

export default RangeSlider;
