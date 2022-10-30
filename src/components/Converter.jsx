import React, { useEffect, useRef } from 'react'
import '../css/stylesheet.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectConverter, pressEnter, setResult, assignOnChangeData, reset } from '../features/converter/converterSlice';
import currs from '../currencies/currs.json';

const Converter = () => {

  const { resp, data } = useSelector(selectConverter);
  const dispatch = useDispatch(); 
  const result = isNaN(data.value) ? 'mheh' : 
  <mark className='result-comp'>
    {parseFloat(data.value).toFixed(2)}
  </mark>;
  const errorRef = useRef(null);


  useEffect(() => {
    dispatch(setResult());
  }, [resp]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, [])

  const buttonPress = async (e) => {
    const { amount, codeOne, codeTwo } = data;
    const one = Object.keys(currs).includes(codeOne);
    const two = Object.keys(currs).includes(codeTwo);
    if (e.code === 'Enter') {
      if (isNaN(amount) || !one || !two) {
        errorRef.current.innerText = 'Your input should look like: \n 10 usd to rub';
      } else {
        errorRef.current.innerText = ':3';
        dispatch(pressEnter());
      }
    }
  }

  return (
    <div className='converter'>
      <div className='sub-block'>
        <h3>Type in and Press Enter</h3>
        <input className='conv-style' type="text" onChange={e => dispatch(assignOnChangeData(e.target.value))} onKeyDown={(e) => buttonPress(e)}/>
        <span ref={errorRef} className='error'>:3</span>
        <span className='result'>It's about... {result}</span>
      </div>
    </div>
  )
}

export default Converter;