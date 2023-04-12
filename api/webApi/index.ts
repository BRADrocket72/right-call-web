require('dotenv').config();
const functions = require('firebase-functions')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const activityRoutes = require('./routes/activityRouter');
const userRoutes = require('./routes/userRouter');
const videoClipRoutes = require('./routes/videoClipRouter');
const lessonRoutes = require('./routes/lessonsRouter');
const userResultsRoutes = require('./routes/userResultsRouter');
const instructorClassRoutes = require('./routes/instructorClassRouter');
const instructorLesson = require('./routes/instructorLessonRouter');
const feedbackRoutes = require('./routes/feedbackRouter');

const multer = require('multer')
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
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
app.use('/api', instructorClassRoutes)
app.use('/api', instructorLesson)
app.use('/api', feedbackRoutes)

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

const PORT = process.env.PORT

// app.listen(PORT, () => {
//     console.log(`Server Started at http://localhost:${PORT}`)
// })

// module.exports = app
app.get('/api', (req, res) => {
    res.send({ 'status': 0});
  });
exports.api = functions.https.onRequest(app) 