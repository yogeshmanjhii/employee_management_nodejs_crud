const { v4: uuidv4 } = require('uuid');

class Employee {
  constructor(employeeName, salaryAmount, age, email, degreeDetails) {
    this.employeeId = uuidv4();
    this.employeeName = employeeName;
    this.salaryAmount = salaryAmount;
    this.age = age;
    this.email = email;
    this.degreeDetails = degreeDetails;
  }
}

module.exports = Employee;
