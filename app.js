const express = require('express');
const fs = require('fs');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.listen(3000, () => {
    console.log(`App is listening at http://localhost:3000`)
})

// Read files in assets/output_videos
app.get('/videos', (req, res) => {
    const vid_dir = 'src/assets/output_videos';
    fs.readdir(vid_dir, (err, videos) => {
        res.send(videos);
    })
})


