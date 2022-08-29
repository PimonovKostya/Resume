const path = require('path');
const FileManager = require('./FileManager.js');
const JsonParser = require('./JsonParser.js');
const Math = require('./Math.js');
const PATH = require('./PATH.js');

const fm = new FileManager();                   //Have readFile and writeFile func
const table = fm.readFile(PATH.table);          //Reading my table of scaling imperic and metric systems. Data in them is equal to yards and meters 
const convert = fm.readFile(PATH.convert);      //My convert table to convert meters to yards and oposite
const input = fm.readFile(PATH.input);          //Input data need to be converted

const jp = new JsonParser(table);               //Implementing JsonParser class with inputJson() wich parses recieved data and createJson() wich converts result to JSON format
const math = new Math(convert, table);          //Math class wich is created to simplify code with mathematics and enc.

jp.inputJSON(input);                            //implementing input data to JSONparser

//Logic is simple, i convert value i need to meters or yards, depends on numeric system(NS)
//Then i convert from one NS to another, using './convertTable/convert.json' file with scales i need
//and then i repeat my first step
const inputBalancedVal = math.converter(jp.value.value, jp.relation[0], jp.value.unit, true);
const convertedValue = math.numericSystemConverter(jp.relation, inputBalancedVal)

const result_value = math.converter(convertedValue, jp.relation[1], jp.result_unit, false);

const resultJSON  = jp.createJSON(jp.result_unit, result_value);

fm.writeFile(PATH.output, resultJSON);