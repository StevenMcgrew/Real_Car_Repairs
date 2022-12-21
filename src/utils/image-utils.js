export const isValidMIME = (fileType) => {
    return ['image/bmp', 'image/jpeg', 'image/png'].includes(fileType);
};

const updateRotationDegrees = (currentDegrees, rotationDirection) => {
    if (!rotationDirection) {
        return currentDegrees;
    }
    if (rotationDirection === 'clockwise') {
        currentDegrees += 90;
    }
    else { // anticlockwise
        currentDegrees -= 90;
    }
    if (Math.abs(currentDegrees) === 360) {
        currentDegrees = 0;
    }
    return currentDegrees;
};

const determineSize = (width, height, maxW, maxH, degrees) => {
    let w, h;
    degrees = Math.abs(degrees);
    if (degrees === 90 || degrees === 270) { // values for width and height are swapped for these rotation positions
        w = height;
        h = width;
    }
    else {
        w = width;
        h = height;
    }
    if (w > h) {
        if (w > maxW) {
            h = h * maxW / w;
            w = maxW;
        }
    }
    else {
        if (h > maxH) {
            w = w * maxH / h;
            h = maxH;
        }
    }
    return { width: w, height: h };
};

export const drawOptimizedImage = (canvas, image, maxSize, currentDegrees, rotationDirection) => {
    let degrees = updateRotationDegrees(currentDegrees, rotationDirection);
    let newSize = determineSize(image.width, image.height, maxSize.width, maxSize.height, degrees);
    canvas.width = newSize.width;
    canvas.height = newSize.height;
    let ctx = canvas.getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (degrees === 0) {
        ctx.drawImage(image, 0, 0, newSize.width, newSize.height);
    } else {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(degrees * Math.PI / 180);
        if (Math.abs(degrees) === 180) {
            ctx.drawImage(image, -newSize.width / 2, -newSize.height / 2, newSize.width, newSize.height);
        } else { // 90 or 270 degrees
            ctx.drawImage(image, -newSize.height / 2, -newSize.width / 2, newSize.height, newSize.width); // values for width and height are swapped for these rotation positions
        }
    }
    ctx.restore();
    return degrees;
};
