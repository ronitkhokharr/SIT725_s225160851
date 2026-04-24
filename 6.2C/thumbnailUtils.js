function calculatePixels(width, height) {
    if (width <= 0 || height <= 0) {
        throw new Error("Width and height must be positive numbers");
    }

    return width * height;
}

module.exports = { calculatePixels };