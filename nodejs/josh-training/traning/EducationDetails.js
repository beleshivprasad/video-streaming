class EducationDetails {
  getSchoolType(grade) {
    switch (true) {
      case grade >= 1 && grade <= 5:
        return "Elementaty School";
      case grade >= 6 && grade <= 8:
        return "Middle School";
      case grade >= 9 && grade <= 12:
        return "High School";
      default:
        return "College";
    }
  }
}

module.exports = EducationDetails;
