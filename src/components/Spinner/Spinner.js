import React from 'react';
import spinnerImg from '../../assets/img/loading.gif';

function Spinner() {
  return (
    <div>
     <img src={spinnerImg} alt="" className='d-block m-auto' style={{width : '100px'}}/>   
    </div>
  )
}

export default Spinner;