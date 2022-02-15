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
console.log(filesArr);
console.log(optionArr);

//  Read file data
let content = "";
for (let i = 0; i < inputArr.length; i++) {
  let buffer = fs.readFileSync(inputArr[i]);
  content += buffer + "\r\n"; // Buffer -> String
}
// console.log(content);

let contentArr = content.split("\r\n");
// console.log(contentArr)

// Logic

//  -s
let issPresent = optionArr.includes("-s");
if (issPresent == true) {
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
    if (contentArr[i] !== null) {
      tempArr.push(contentArr[i]);
    }
  }
  //   copy data from tempArr to original array  : content -> original
  contentArr = tempArr;
}
console.log(contentArr.join("\n"));

//  -n
// let isnPresent = optionArr.includes("-n");
// if (isnPresent == true) {
//   for (let i = 0; i < contentArr.length; i++) {
//     contentArr[i] = `${i + 1}. ${contentArr[i]}`;
//   }
//   console.log(contentArr.join("\n"));
// }
