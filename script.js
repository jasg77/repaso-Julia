const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let points = [];

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    points = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'pink';
    ctx.lineWidth = 5;
    addPoint(e);
}

function draw(e) {
    if (!isDrawing) return;
    addPoint(e);
    ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    ctx.stroke();
}

function stopDrawing() {
    isDrawing = false;
    ctx.closePath();
}

function addPoint(e) {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    points.push({ x, y });
}

function drawNumber(number) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    const numberPoints = getNumberPoints(number);
    numberPoints.forEach((point, index) => {
        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();
}

function getNumberPoints(number) {
    const points = {
        1: [{ x: 200, y: 50 }, { x: 200, y: 350 }],
        2: [{ x: 100, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 200 }, { x: 100, y: 200 }, { x: 100, y: 350 }, { x: 300, y: 350 }],
        3: [{ x: 100, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 200 }, { x: 100, y: 200 }, { x: 300, y: 200 }, { x: 300, y: 350 }, { x: 100, y: 350 }],
        4: [{ x: 300, y: 50 }, { x: 100, y: 200 }, { x: 300, y: 200 }, { x: 300, y: 350 }],
        5: [{ x: 300, y: 50 }, { x: 100, y: 50 }, { x: 100, y: 200 }, { x: 300, y: 200 }, { x: 300, y: 350 }, { x: 100, y: 350 }],
        6: [{ x: 300, y: 50 }, { x: 100, y: 50 }, { x: 100, y: 350 }, { x: 300, y: 350 }, { x: 300, y: 200 }, { x: 100, y: 200 }],
        7: [{ x: 100, y: 50 }, { x: 300, y: 50 }, { x: 200, y: 350 }],
        8: [{ x: 150, y: 100 }, { x: 250, y: 100 }, { x: 250, y: 200 }, { x: 150, y: 200 }, { x: 150, y: 100 }, { x: 150, y: 200 }, { x: 250, y: 200 }, { x: 250, y: 300 }, { x: 150, y: 300 }, { x: 150, y: 200 }],
        9: [{ x: 300, y: 300 }, { x: 100, y: 300 }, { x: 100, y: 100 }, { x: 300, y: 100 }, { x: 300, y: 350 }, { x: 100, y: 350 }],
        10: [{ x: 100, y: 50 }, { x: 100, y: 350 }, { x: 200, y: 50 }, { x: 200, y: 350 }, { x: 300, y: 50 }, { x: 300, y: 350 }]
    };
    return points[number] || [];
}
