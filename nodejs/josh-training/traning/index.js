console.log("Welcome to Nodejs Training");

const EducationDetails = require("./EducationDetails");

const educationDetailsInstance = new EducationDetails();

console.log(educationDetailsInstance.getSchoolType(2));
console.log(educationDetailsInstance.getSchoolType(4));
console.log(educationDetailsInstance.getSchoolType(6));
console.log(educationDetailsInstance.getSchoolType(8));
console.log(educationDetailsInstance.getSchoolType(10));
console.log(educationDetailsInstance.getSchoolType(12));
console.log(educationDetailsInstance.getSchoolType(14));
