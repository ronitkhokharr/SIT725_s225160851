const express = require("express");
const { calculatePixels } = require("./thumbnailUtils");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("AI Thumbnail Utility API is running");
});

app.get("/thumbnail-size", (req, res) => {
    const width = Number(req.query.width);
    const height = Number(req.query.height);

    if (!width || !height || width <= 0 || height <= 0) {
        return res.status(400).json({
            error: "Invalid width or height"
        });
    }

    const pixels = calculatePixels(width, height);

    res.status(200).json({
        width,
        height,
        pixels
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});