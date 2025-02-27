const numberCanvas = document.getElementById('numberCanvas');
const numberCtx = numberCanvas.getContext('2d');
const drawingCanvas = document.getElementById('drawingCanvas');
const drawingCtx = drawingCanvas.getContext('2d');
let isDrawing = false;
let points = [];

drawingCanvas.addEventListener('mousedown', startDrawing);
drawingCanvas.addEventListener('mousemove', draw);
drawingCanvas.addEventListener('mouseup', stopDrawing);
drawingCanvas.addEventListener('mouseout', stopDrawing);
drawingCanvas.addEventListener('touchstart', startDrawing, { passive: false });
drawingCanvas.addEventListener('touchmove', draw, { passive: false });
drawingCanvas.addEventListener('touchend', stopDrawing);
drawingCanvas.addEventListener('touchcancel', stopDrawing);

function startDrawing(e) {
    e.preventDefault();
    isDrawing = true;
    points = [];
    drawingCtx.beginPath();
    drawingCtx.strokeStyle = 'pink';
    drawingCtx.lineWidth = 5;
    addPoint(e);
}

function draw(e) {
    if (!isDrawing) return;
    e.preventDefault();
    addPoint(e);
    drawingCtx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    drawingCtx.stroke();
}

function stopDrawing(e) {
    if (!isDrawing) return;
    e.preventDefault();
    isDrawing = false;
    drawingCtx.closePath();
}

function addPoint(e) {
    const rect = drawingCanvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    points.push({ x, y });
}

function drawNumber(number) {
    numberCtx.clearRect(0, 0, numberCanvas.width, numberCanvas.height);
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    numberCtx.beginPath();
    numberCtx.strokeStyle = 'black';
    numberCtx.lineWidth = 2;
    const numberPoints = getNumberPoints(number);
    numberPoints.forEach((point, index) => {
        if (index === 0) {
            numberCtx.moveTo(point.x, point.y);
        } else {
            numberCtx.lineTo(point.x, point.y);
        }
    });
    numberCtx.stroke();
}

function clearCanvases() {
    numberCtx.clearRect(0, 0, numberCanvas.width, numberCanvas.height);
    drawingCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
}

function getNumberPoints(number) {
    const points = {
        0: [{ x: 100, y: 50 }, { x: 150, y: 100 }, { x: 150, y: 300 }, { x: 100, y: 350 }, { x: 50, y: 300 }, { x: 50, y: 100 }, { x: 100, y: 50 }],
        1: [{ x: 100, y: 50 }, { x: 100, y: 350 }],
        2: [{ x: 50, y: 100 }, { x: 150, y: 100 }, { x: 150, y: 200 }, { x: 50, y: 200 }, { x: 50, y: 350 }, { x: 150, y: 350 }],
        3: [{ x: 50, y: 100 }, { x: 150, y: 100 }, { x: 150, y: 200 }, { x: 50, y: 200 }, { x: 150, y: 200 }, { x: 150, y: 350 }, { x: 50, y: 350 }],
        4: [{ x: 150, y: 50 }, { x: 50, y: 200 }, { x: 150, y: 200 }, { x: 150, y: 350 }],
        5: [{ x: 150, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 200 }, { x: 150, y: 200 }, { x: 150, y: 350 }, { x: 50, y: 350 }],
        6: [{ x: 150, y: 50 }, { x: 50, y: 50 }, { x: 50, y: 350 }, { x: 150, y: 350 }, { x: 150, y: 200 }, { x: 50, y: 200 }],
        7: [{ x: 50, y: 50 }, { x: 150, y: 50 }, { x: 100, y: 350 }],
        8: [{ x: 75, y: 100 }, { x: 125, y: 100 }, { x: 125, y: 200 }, { x: 75, y: 200 }, { x: 75, y: 100 }, { x: 75, y: 200 }, { x: 125, y: 200 }, { x: 125, y: 300 }, { x: 75, y: 300 }, { x: 75, y: 200 }],
        9: [{ x: 150, y: 300 }, { x: 50, y: 300 }, { x: 50, y: 100 }, { x: 150, y: 100 }, { x: 150, y: 350 }, { x: 50, y: 350 }]
    };
    return points[number] || [];
}

// Prevent scrolling on touch devices
document.body.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });

