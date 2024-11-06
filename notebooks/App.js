import React, { useEffect, useState } from 'react';
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
    const fetchPrices = () => {
        let url = '/api/historical-prices';
        if (startDate && endDate) {
            url += `?start=${startDate}&end=${endDate}`;
        }
        axios.get(url)
            .then(response => setPriceData(response.data))
            .catch(error => console.error('Error fetching price data:', error));
    };

    // Fetch key indicators
    useEffect(() => {
        axios.get('/api/key-indicators')
            .then(response => setIndicators(response.data))
            .catch(error => console.error('Error fetching key indicators:', error));
        fetchPrices();
    }, [startDate, endDate]);

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
            <p>Average Price: ${indicators.average_price?.toFixed(2)}</p>
            <p>Volatility: ${indicators.volatility?.toFixed(2)}</p>
            <p>Latest Price: ${indicators.latest_price?.toFixed(2)}</p>

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
