import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrencies, selectCurrency, changeCurr, setLang } from '../features/currency/сurrencySlice';
import currs from '../currencies/currs.json';

const Currency = () => {

  const currency = useSelector(state => state.currency);
  const { rates, code, amount, defalutOption } = currency;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLang());
  }, []);

  const fetchedData = useMemo(() => dispatch(getCurrencies()), [code]);

  const getNewCode = (e) => {
    const c = e.target.value;
    const v = Object.entries(currs).find(e => e[1] === c);
    dispatch(changeCurr(v));
    // dispatch(getCurrencies());
  }

  if (Object.keys(rates).length === 0) return;

  return (
    <div className='currency-container'>
      <div className='default-curr'>
        <form>
          <label htmlFor="defalut-curr">Currency: </label>
          <select
            name="defalut-curr" 
            id="defalut-curr"
            defaultValue={defalutOption}
            onClick={e => getNewCode(e)}
          >
            {
              Object.values(currs).map(e => (
                <option key={e} value={e}>{e}</option>
              ))
            }
          </select>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.entries(currs).map((e, i) => {
              if (e[0] !== code) {
                return (
                  <tr key={e[0] + i} >
                    <td>{e[0]}</td>
                    <td>{e[1]}</td>
                    <td>{amount}</td>
                    <td>{parseFloat(rates.rates[e[0]]).toFixed(2)}</td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Currency;
