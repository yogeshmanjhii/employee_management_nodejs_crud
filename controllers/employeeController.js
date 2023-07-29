const express = require('express');
const Employee = require('../models/employee');
const employeeData = require('../data/employeeData');
const validateUuid = require('../middleware/validateUuid');
const router = express.Router();

// GET /api/employees
router.get('/', (req, res) => {
  const employees = employeeData.getAllEmployees();
  res.status(200).json(employees);
});

// GET /api/employees/{empId}
router.get('/:empId',validateUuid, (req, res) => {
  const empId = req.params.empId;
  const employee = employeeData.getEmployeeById(empId);

  if (!employee) {
    res.status(404).json({ error: 'Employee not found' });
  } else {
    res.status(200).json(employee);
  }
});

// POST /api/employees
router.post('/', (req, res) => {
  const { employeeName, salaryAmount, age, email, degreeDetails } = req.body;

  if (!employeeName || !age) {
    res.status(400).json({ error: 'Employee name and age are required' });
  } else {
    const newEmployee = new Employee(employeeName, salaryAmount, age, email, degreeDetails);
    const createdEmployee = employeeData.createEmployee(newEmployee);
    res.status(201).json(createdEmployee);
  }
});

// PUT /api/employees/{empId}
router.put('/:empId', validateUuid , (req, res) => {
  const empId = req.params.empId;
  const { employeeName, salaryAmount } = req.body;
  const existingEmployee = employeeData.getEmployeeById(empId);

  if (!existingEmployee) {
    res.status(404).json({ error: 'Employee not found' });
  } else {
    const updatedEmployee = {
      ...existingEmployee,
      employeeName: employeeName || existingEmployee.employeeName,
      salaryAmount: salaryAmount || existingEmployee.salaryAmount
    };

    const updated = employeeData.updateEmployee(empId, updatedEmployee);

    res.status(200).json(updated);
  }
});

// DELETE /api/employees/{empId}
router.delete('/:empId', validateUuid , (req, res) => {
  const empId = req.params.empId;
  const existingEmployee = employeeData.getEmployeeById(empId);

  if (!existingEmployee) {
    res.status(404).json({ error: 'Employee not found' });
  } else {
    employeeData.deleteEmployee(empId);
    res.sendStatus(204);
  }
});

module.exports = router;
