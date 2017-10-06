let TinyConfig = require('../index.js');

console.log("------------------------------------------------------------");
console.log("----");
console.log("---- TINYCONFIG TEST");
console.log("----");
console.log("------------------------------------------------------------");

let testString = "name=brandon&year=2004&active=false";
let testConfig = new TinyConfig(testString);
let OutputTestString = testConfig.toString();

console.log("");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("");

console.log("TEST: Building From String", testString);

if(OutputTestString != testString) {
  console.error("🛑   error: parsing and reparsing string failure", {
    input: testString,
    output: OutputTestString
  });
} else {
  console.log("✅ success: parsing and reparsing string worked", {
    input: testString,
    output: OutputTestString
  });
}


let inputObject = {
  year : 2017,
  name : 'Brandon',
  funny: false
};
console.log("");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("");

console.log("TEST: Building From Object", inputObject);
let objConfig = new TinyConfig(inputObject);

let height = 'short';
let name = "Emily";
let browser = true;

objConfig.set('name',name);
objConfig.set('browser', browser);
objConfig.remove('year');
objConfig.set('height',height);

if(objConfig.get('year')) {
  console.log('🛑  error:  remove() year failure', objConfig.get('year'));
} else {
  console.log('✅  success: remove() year', objConfig.get('year'));
}

if(objConfig.get('browser') === browser) {
  console.log('✅  success:  set(browser)', objConfig.data.browser);
} else {
  console.log('🛑  error:  set(browser) failure', typeof objConfig.get('browser'));
}

if(objConfig.get('height') != height) {
  console.log('🛑  error:  set(height)  failure', objConfig.get('height'));
} else {
  console.log('✅  success:  set(height) to '+height, objConfig.get('height'));
}

console.log("");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("");
