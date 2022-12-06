require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const videoClipRoutes = require('./routes/videoClipRouter');
const userRoutes = require('./routes/userRouter');
const lessonRoutes = require('./routes/lessonsRouter');
const userResultsRoutes = require('./routes/userResultsRouter');
const activityRoutes = require('./routes/activityRouter');
const multer = require('multer')
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

app.use('/api', userResultsRoutes)
app.use('/api', videoClipRoutes)
app.use('/api', userRoutes)
app.use('/api', lessonRoutes)
app.use('/api', activityRoutes)

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large",
            });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "File limit reached",
            });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image",
            });
        }
    }
});

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})