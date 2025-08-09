const fs = require('fs');

// Read JSON from file
let rawData = fs.readFileSync('testcase.json'); // change filename if needed
let data = JSON.parse(rawData);

const n = data.keys.n;
const k = data.keys.k;

// Extract and decode first k points
let points = [];
let count = 0;
for (let key in data) {
    if (key === "keys") continue;
    if (count >= k) break;

    let x = parseInt(key); // key is x
    let base = parseInt(data[key].base);
    let valueStr = data[key].value;

    // decode from base to decimal
    let y = parseInt(valueStr, base);

    points.push({ x, y });
    count++;
}

// Lagrange interpolation to find f(0)
function lagrangeAtZero(pts) {
    let sum = 0;
    for (let i = 0; i < pts.length; i++) {
        let xi = pts[i].x;
        let yi = pts[i].y;
        let term = yi;

        for (let j = 0; j < pts.length; j++) {
            if (j !== i) {
                term *= (0 - pts[j].x) / (xi - pts[j].x);
            }
        }
        sum += term;
    }
    return Math.round(sum); // round to nearest integer
}

let c = lagrangeAtZero(points);
console.log("Constant term c =", c);
