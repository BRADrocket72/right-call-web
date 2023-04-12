require('dotenv').config();
var functions = require('firebase-functions');
var express = require('express');
var mongoose = require('mongoose');
var mongoString = process.env.DATABASE_URL;
var activityRoutes = require('./routes/activityRouter');
var userRoutes = require('./routes/userRouter');
var videoClipRoutes = require('./routes/videoClipRouter');
var lessonRoutes = require('./routes/lessonsRouter');
var userResultsRoutes = require('./routes/userResultsRouter');
var instructorClassRoutes = require('./routes/instructorClassRouter');
var instructorLesson = require('./routes/instructorLessonRouter');
var feedbackRoutes = require('./routes/feedbackRouter');
var multer = require('multer');
mongoose.connect(mongoString);
var database = mongoose.connection;
database.on('error', function (error) {
    console.log(error);
});
var app = express();
app.use(express.json());
var cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use('/api', userResultsRoutes);
app.use('/api', videoClipRoutes);
app.use('/api', userRoutes);
app.use('/api', lessonRoutes);
app.use('/api', activityRoutes);
app.use('/api', instructorClassRoutes);
app.use('/api', instructorLesson);
app.use('/api', feedbackRoutes);
app.use(function (error, req, res, next) {
    if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
            return res.status(400).json({
                message: "file is too large"
            });
        }
        if (error.code === "LIMIT_FILE_COUNT") {
            return res.status(400).json({
                message: "File limit reached"
            });
        }
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                message: "File must be an image"
            });
        }
    }
});
var PORT = process.env.PORT;
// app.listen(PORT, () => {
//     console.log(`Server Started at http://localhost:${PORT}`)
// })
// module.exports = app
exports.api = functions.https.onRequest(app);
