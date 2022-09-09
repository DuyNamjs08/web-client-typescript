import React from 'react';
function Helmet (props:any) {
  document.title = 'Chill Shop-' + props.title;
  return (
        <div className='w-100'>
            {props.children}
        </div>
  );
}

export default Helmet;
