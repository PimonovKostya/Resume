function randomDot(max, min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    x: randomDot(100, -100),
    y: randomDot(100, -100),
    z: randomDot(100, -100)
}