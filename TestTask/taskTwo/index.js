const FileManager = require('./FileManager.js');
const Container = require('./Container.js');
const JsonParser = require('./JsonParser.js')
const PATH = require('./PATH.js');

const container = new Container();              //contains the data from the app and have some methods to work with it
const fm = new FileManager(container);
const parser = new JsonParser(container);


parser.parseInput(fm.readFile(PATH.input));

parser.parseData();

console.log(container.getUserCollection());

parser.parseCondition();

console.log(container.getUserCollection());

fm.writeFile(PATH.output, container.getUserCollection());