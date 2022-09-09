import React from 'react';
import leftArrow from './icons/left-arrow.svg';
import rightArrow from './icons/right-arrow.svg';
import './item.scss';

function BtnSlider (props:any) {
  const { direction, moveSlide } = props;
  return (
    <div>
      <button
        onClick={moveSlide}
        className={direction === 'nextItem' ? 'btn-slide nextItem' : 'btn-slide prev'}
      >
        <img src={direction === 'nextItem' ? rightArrow : leftArrow} />
      </button>
    </div>
  );
}

export default BtnSlider;
