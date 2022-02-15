// display

// Input of command

const fs = require("fs");

let inputArr = process.argv.slice(2);
// console.log(inputArr.length);
// console.log(inputArr)

//  Display file data
// Check if it file or option

let optionArr = [];
let filesArr = [];

for (let i = 0; i < inputArr.length; i++) {
  let firstChar = inputArr[i].charAt(0);
  if (firstChar == "-") {
    optionArr.push(inputArr[i]);
  } else {
    filesArr.push(inputArr[i]);
  }
}
// console.log(filesArr);
// console.log(optionArr);

//   Check

let isBothPresent = optionArr.includes("-b") && optionArr.includes("-n");
if (isBothPresent) {
  console.log("Please choose only one of b or n");
  return;
}

// Existence
for (let i = 0; i < filesArr.length; i++) {
  let isFilePresent = fs.existsSync(filesArr[i]);
  if (isFilePresent == false) {
    console.log(`file ${filesArr[i]} is not present`);
    return;
  }
}

//  Read file data
let content = "";
for (let i = 0; i < filesArr.length; i++) {
  let buffer = fs.readFileSync(filesArr[i]);
  content += buffer + "\r\n"; // Buffer -> String
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr)

// Logic

//  -s
let isSPresent = optionArr.includes("-s");
if (isSPresent == true) {
  for (let i = 1; i < contentArr.length; i++) {
    if (contentArr[i] == "" && contentArr[i - 1] == "") {
      //  Make it null
      contentArr[i] = null;
    } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
      //  Make it null
      contentArr[i] = null;
    }
  }
  let tempArr = [];
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != null) {
      tempArr.push(contentArr[i]);
    }
  }
  //   copy data from tempArr to original array  : content -> original
  contentArr = tempArr;
}
// console.log(contentArr.join("\n"));

//  -n
let isNPresent = optionArr.includes("-n");
if (isNPresent == true) {
  for (let i = 0; i < contentArr.length; i++) {
    contentArr[i] = `${i + 1}. ${contentArr[i]}`;
  }
  // console.log(contentArr.join("\n"));
}

// -b;
let isBPresent = optionArr.includes("-b");
if (isBPresent == true) {
  let counter = 1;
  for (let i = 0; i < contentArr.length; i++) {
    if (contentArr[i] != "") {
      contentArr[i] = `${counter} ${contentArr[i]}`;
      counter++;
    }
  }
}
console.log(contentArr.join("\n"));
