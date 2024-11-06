// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Grid, TextField, Typography } from '@mui/material';

function App() {
    const [priceData, setPriceData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [indicators, setIndicators] = useState({});

    // Fetch price data with optional date filter
    const fetchPrices = useCallback(() => {
        let url = '/api/historical-prices';
        if (startDate && endDate) {
            url += `?start=${startDate}&end=${endDate}`;
        }
        console.log(`Fetching prices from: ${url}`); // Debug log
        axios.get(url)
            .then(response => {
                console.log('Price data:', response.data); // Log the received data
                setPriceData(response.data);
            })
            .catch(error => console.error('Error fetching price data:', error));
    }, [startDate, endDate]);

    // Fetch key indicators
    // useEffect(() => {
    //     fetchPrices(); // Call fetchPrices initially
    //     axios.get('/api/key-indicators')
    //         .then(response => {
    //             console.log('Key indicators:', response.data); // Log the received indicators
    //             setIndicators(response.data);
    //         })
    //         .catch(error => console.error('Error fetching key indicators:', error));
    // }, [fetchPrices]);

    useEffect(() => {
      fetchPrices(); // Call fetchPrices initially
      axios.get('http://127.0.0.1:5000/api/key-indicators')
          .then(response => {
              console.log('Key indicators:', response.data); // Log the received indicators
              setIndicators(response.data);
          })
          .catch(error => console.error('Error fetching key indicators:', error));
  }, [fetchPrices]);
  

    return (
        <div className="App">
            <Typography variant="h4">Brent Oil Price Dashboard</Typography>
            
            {/* Date Range Filter */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(date) => setStartDate(date?.toISOString().split('T')[0])} // Format date to YYYY-MM-DD
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(date) => setEndDate(date?.toISOString().split('T')[0])} // Format date to YYYY-MM-DD
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>

            {/* Key Indicators Display */}
            <Typography variant="h6">Key Indicators</Typography>
            <p>Average Price: ${indicators.average_price ? indicators.average_price.toFixed(2) : 'Loading...'}</p>
            <p>Volatility: ${indicators.volatility ? indicators.volatility.toFixed(2) : 'Loading...'}</p>
            <p>Latest Price: ${indicators.latest_price ? indicators.latest_price.toFixed(2) : 'Loading...'}</p>

            {/* Price Data Line Chart */}
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <Line type="monotone" dataKey="Price" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default App;
