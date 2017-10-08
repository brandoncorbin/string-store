let StringStore = require('../index.js');

let passed = 0;
let failed = 0;

console.log("------------------------------------------------------------");
console.log("----");
console.log("---- StringStore TEST");
console.log("----");
console.log("------------------------------------------------------------");

let testString = "name=brandon&year=2004&active=false";
let testConfig = new StringStore(testString);
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
  failed++;
} else {
  console.log("✅ success: parsing and reparsing string worked", {
    input: testString,
    output: OutputTestString
  });
  passed++;
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
let objConfig = new StringStore(inputObject);

let height = 'short';
let name = "Emily";
let browser = true;

objConfig.set('name',name);
objConfig.set('browser', browser);
objConfig.remove('year');
objConfig.set('height',height);

if(objConfig.get('year')) {
  console.log('🛑  error:  remove() year failure', objConfig.get('year'));
  failed++
} else {
  console.log('✅  success: remove() year', objConfig.get('year'));
  passed++;
}

if(objConfig.get('browser') === browser) {
  console.log('✅  success:  set(browser)', objConfig.data.browser);
  passed++;
} else {
  console.log('🛑  error:  set(browser) failure', typeof objConfig.get('browser'));
  failed++
}

if(objConfig.get('height') != height) {
  console.log('🛑  error:  set(height)  failure', objConfig.get('height'));
  failed++
} else {
  console.log('✅  success:  set(height) to '+height, objConfig.get('height'));
  passed++;
}

console.log("");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("");

console.log("TEST: Undefined", "name=brandon&type=undefined");

let object = {
  name: 'brandon',
  type: undefined
}
let unTest = new StringStore(object);

if(unTest.toString().search('undefined')>-1) {
  console.log('🛑  error: undefined not removed');
  failed++
} else {
  console.log('✅  success:  undefined removed ');
  console.log('✅  results: ', unTest.toString());
  passed++;
}


console.log("");
console.log("------------------------------------------------------------");
console.log("------------------------------------------------------------");
console.log("");

console.log("TEST: Nulls, should be allowed", "name=brandon&type=null");

let nullObject = {
  name: 'brandon',
  type: null
}
let nullTest = new StringStore(nullObject);

if(nullTest.toString().search('type')==-1) {
  console.log('🛑  error: null value not found');
  failed++
} else {
  console.log('✅  success:  null value found (this is good) ');
  console.log('✅  results: ', nullTest.toString());
  passed++;
}

console.log("");
console.log("------------------------------------------------------------");
console.log("🏁 TESTS COMPLETE");
console.log('✅ SUCCESSES: '+passed);
console.log('🛑 FAILURES: '+failed);
console.log("------------------------------------------------------------");
console.log("");

if(failed) {
  throw("🛑  "+failed+" Tests Failed - will not build or publish");
}
