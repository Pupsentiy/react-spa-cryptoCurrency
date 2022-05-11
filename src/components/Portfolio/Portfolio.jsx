import { Box, Button, Container, Dialog, DialogTitle, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Doughnut } from 'react-chartjs-2';
import { COINS } from '../../constants/api';
import '../Portfolio/Portfolio.scss'

const Portfolio = () => {
  const [coins, setCoins] = useState([])
  const [open, setOpen] = useState(false)
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalBalanceCoins, setTotalBalanceCoins] = useState(
    {
      btc: {
        balance: 0,
        currentPrice: 0
      },
      eth: {
        balance: 0,
        currentPrice: 0
      },
    }
  )
  const [selectedCurrentPrice, setSelectedCurrentPrice] = useState()
  const [selectedCoinsSymbol, setSelectedCoinsSymbol] = useState('')
  const [tabPanel, setTabPanel] = useState(0);

  useEffect(() => {
    fetch(COINS)
      .then(res => res.json())
      .then((body) => {
        setCoins(body)
      })
  }, [])

  const handleChangeBuy = (e) => {
    const temp = totalBalanceCoins[selectedCoinsSymbol].balance + parseInt(e.target.value)
    const sum = selectedCurrentPrice * temp
    setTotalBalanceCoins({
      ...totalBalanceCoins, [selectedCoinsSymbol]: { balance: temp, currentPrice: sum }
    })
  }

  const handleChangeSell = (e) => {
    const temp = totalBalanceCoins[selectedCoinsSymbol].balance - parseInt(e.target.value)
    const sum = selectedCurrentPrice * temp
    setTotalBalanceCoins({
      ...totalBalanceCoins, [selectedCoinsSymbol]: { balance: temp, currentPrice: sum }
    })
  }

  const handleClickOpen = (coin) => {
    setOpen(true)
    setSelectedCurrentPrice(coin.current_price)
    setSelectedCoinsSymbol(coin.symbol)
  }

  const handleClickClose = () => {
    setOpen(false)
  }

  const handleClickBuy = () => {
    let sum = totalBalanceCoins.eth.currentPrice + totalBalanceCoins.btc.currentPrice
    if(sum < 0){
      sum = 0
      setTotalBalance(sum)
    }
    setTotalBalance(sum)
    setOpen(false)
  }

  const handleChangeTabs = (e, newValue) => {
    setTabPanel(newValue)
  }

  return (
    <Container>
      <Box className='container__balance'>
        <Box className='box__balacne'>
          <Box className='totalbalance'>
            <span >${totalBalance.toLocaleString()}</span>
            <span>Total Balance </span>
          </Box>
          <Box className='totalBalanceCoins'>Total Balance Coins:
            <br />
            BTC:{totalBalanceCoins.btc.balance < 0 ? totalBalanceCoins.btc.balance = 0 : totalBalanceCoins.btc.balance}
            <br />
            ETH:{totalBalanceCoins.eth.balance < 0 ? totalBalanceCoins.eth.balance = 0 : totalBalanceCoins.eth.balance}
          </Box>
        </Box>
        <Box className='box__chartCoins'>
          <Box width={250} height={250}>
            <Doughnut
              data={{
                labels: [`BTC:${totalBalanceCoins.btc.balance}`, `ETH:${totalBalanceCoins.eth.balance}`],
                datasets: [{
                  label: 'My First Dataset',
                  data: [totalBalanceCoins.btc.currentPrice, totalBalanceCoins.eth.currentPrice],
                  backgroundColor: [
                    'rgba(255,73,217,0.46)',
                    'rgba(75,250,192,0.5)',
                  ],
                  yAxisID: 'yAxis',
                  hoverOffset: 2
                }]
              }}
              options={{
                color: 'white',
                maintainAspectRatio: false,
                ticks: {
                  color: '#ffffff',
                }
              }}
            />
          </Box>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'></TableCell>
              <TableCell align='left'>Coins</TableCell>
              <TableCell align='center'>Price</TableCell>
              <TableCell align='center'>24h</TableCell>
              <TableCell align='center'>Market Cap</TableCell>
              <TableCell align='center'>Buy/Sell</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align='center' width='30px'><img src={coin.image} width='25px' alt="img" />  </TableCell>
                <TableCell align='center' width='80px'>{coin.name}, {coin.symbol.toUpperCase()}</TableCell>
                <TableCell align='center' width='50px'>${coin.current_price.toLocaleString()}</TableCell>
                <TableCell align='center' width='50px'>{coin.market_cap_change_percentage_24h.toFixed(2)}%</TableCell>
                <TableCell align='center' width='150px'>$ {coin.market_cap.toLocaleString()}</TableCell>
                <TableCell align='center' width='30px'><Button><AddIcon onClick={() => handleClickOpen(coin)} /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open}>
        <DialogTitle>Add Transaction to My Portfolio</DialogTitle>
        <Box className='box__dialog'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs className='tabs' value={tabPanel} onChange={handleChangeTabs} aria-label="lab API tabs example">
              <Tab fullWidth label="Buy Coins" />
              <Tab fullWidth label="Sell Coins" />
            </Tabs>
            {tabPanel === 0 && <Box id={1}><TextField fullWidth onChange={(e) => handleChangeBuy(e)} type='number' /></Box>}
            {tabPanel === 1 && <Box id={2}> <TextField fullWidth onChange={(e) => handleChangeSell(e)} type='number' /></Box>}
          </Box>
        </Box>
        <Box className='buttons'>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleClickBuy}>Add</Button>
        </Box>
      </Dialog>
    </Container>
  )
}

export default Portfolio