import React, { useEffect, useRef } from 'react'
import '../css/stylesheet.css';
import { useSelector, useDispatch } from 'react-redux';
import { selectConverter, pressEnter, setResult, assignOnChangeData, reset } from '../features/converter/converterSlice';
import currs from '../currencies/currs.json';

const Converter = () => {

  const { response, data } = useSelector(selectConverter);
  const dispatch = useDispatch(); 
  const conversionResult = isNaN(data.value) ? '¯\\_(ツ)_/¯' : 
  <mark className='result-comp'>
    {parseFloat(data.value).toFixed(2)}
  </mark>;

  const errorRef = useRef(null);

  useEffect(() => {
    dispatch(setResult());
  }, [response]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    }
  }, [])

  const buttonPress = (e) => {
    const { amount, codeOne, codeTwo } = data;
    const fromCode = Object.keys(currs).includes(codeOne);
    const toCode = Object.keys(currs).includes(codeTwo);
    if (e.code === 'Enter') {
      if (isNaN(amount) || !fromCode || !toCode) {
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
        <span className='result'>It's about... {conversionResult}</span>
      </div>
    </div>
  )
}

export default Converter;