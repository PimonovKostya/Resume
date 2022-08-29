
const PATH = require('./PATH.js')
const FileManager = require('./FileManager.js');
const JsonParser = require('./JsonParser.js');

const fm = new FileManager();
const jp = new JsonParser();

jp.parseInput(fm.readFile(PATH.input));

fm.writeFile(PATH.output, jp.parseOutput())

// const world = new World(30, -48, 60, random);

// console.log(random.x + '|' + random.y + '|' + random.z);  

// console.log(world.distanceCalculator());

// console.log(world.pathFinder());

// console.log(`Number of iterations : ${world.iterator}`);