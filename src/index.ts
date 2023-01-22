import express = require('express');
import dataPrimeLeagueRoute from './routes/dataPrimeLeagueRoute';
import tftRoute from './routes/tftRoute';

const app = express();
const PORT:Number=3000;
const bp = require('body-parser')

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.use('/api', dataPrimeLeagueRoute);

app.use('/api/tft', tftRoute);

app.get('/', (req, res) => {
    res.send('Welcome to typescript backend!');
})


app.listen(PORT,() => {
    console.log('The application is listening '
        + 'on port http://localhost:'+PORT);
})
