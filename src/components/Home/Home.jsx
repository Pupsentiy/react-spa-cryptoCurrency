import { Box, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EXCHANGE_RATES } from '../../constants/api'
import ChartBtc from '../Chart/ChartBtc'
import ChartEth from '../Chart/ChratEth'
import '../Home/Home.scss'

const Home = () => {
  const [select, setSelect] = useState([])
  const [FromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [sum, setSum] = useState(1)
  const [sumFromCurrency, setSumFromCurrency] = useState(true)

  let toAmount
  let fromAmount
  if (sumFromCurrency) {
    fromAmount = sum
    toAmount = (toCurrency / FromCurrency) * sum;
  } else {
    toAmount = sum
    fromAmount = (FromCurrency / toCurrency) * sum
  }

  useEffect(() => {
    fetch(EXCHANGE_RATES)
      .then(res => res.json())
      .then((body) => {
        const arr = []
        Object.keys(body.rates).map(e => {
          if (e === 'btc' || e === 'eth' || e === 'usd') {
            arr.push(body.rates[e])
          }
        })
        setSelect(arr)
      })

  }, [sum])

  const handleChange = (event) => {
    setSumFromCurrency(true)
    setSum(parseInt(event.target.value))
  };

  const handleChange2 = (event) => {
    setSumFromCurrency(false)
    setSum(parseInt(event.target.value))
  };

  return (
    <>
      <Box className="container__home">
        <Box className="box__changecurrency">
          <Box className="changecurrency__left">
            <Select className='selected__left' value={FromCurrency} onChange={e => setFromCurrency(e.target.value)}  >
              {select.length && select.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.unit === '$' ? 'USD' : item.unit}</MenuItem>
              ))}
            </Select>
            <TextField className="textField__left" value={fromAmount} type='number' onChange={handleChange} />
          </Box>
          <Box className="changecurrency__right">
            <Select className='selected__right' value={toCurrency} onChange={e => setToCurrency(e.target.value)} >
              {select.length && select.map((item, index) => (
                <MenuItem key={index} value={item.value}>{item.unit === '$' ? 'USD' : item.unit}</MenuItem>
              ))}
            </Select>
            <TextField className="textField__right" value={toAmount.toString()} type='number' onChange={handleChange2} />
          </Box>
        </Box>
        <Box className='box__chart' >
          <ChartBtc />
          <ChartEth />
        </Box>
      </Box>
    </>
  )
}

export default Home


