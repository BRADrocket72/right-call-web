require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const videoClipRoutes = require('./routes/videoClipRouter');
const userRoutes = require('./routes/userRouter')
const s3Routes = require('./routes/S3Router')


mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.use('/api', videoClipRoutes)
app.use('/api', userRoutes)
app.use('/api', s3Routes)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})