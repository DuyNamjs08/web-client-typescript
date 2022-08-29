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
        className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
      >
        <img src={direction === 'next' ? rightArrow : leftArrow} />
      </button>
    </div>
  );
}

export default BtnSlider;
