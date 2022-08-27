const path = require('path');
const FileManager = require('./FileManager.js');
const JsonParser = require('./JsonParser.js');
const Math = require('./Math.js');
const PATH = require('./PATH.js');

const fm = new FileManager();
const table = fm.readFile(PATH.table);
const convert = fm.readFile(PATH.convert);
const input = fm.readFile(PATH.input);

const jp = new JsonParser(table);
const math = new Math(convert, table);

jp.inputJSON(input);

const inputBalancedVal = math.balancer(jp.value.value, jp.relation[0], jp.value.unit);
const convertedValue = math.converter(jp.relation, inputBalancedVal)

const result_value = math.balancer(convertedValue, jp.relation[1], jp.result_unit);

const resultJSON  = jp.createJSON(jp.result_unit, result_value);

fm.writeFile(PATH.output, resultJSON);