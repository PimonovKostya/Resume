const random = require('./randomGenerator.js');
const World = require('./World.js');

const world = new World(30, -48, 60, random);

console.log(random.x + '|' + random.y + '|' + random.z);  

console.log(world.distanceCalculator());

console.log(world.pathFinder());

console.log(`Number of iterations : ${world.iterator}`);