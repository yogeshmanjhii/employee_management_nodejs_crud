const NodeCache = require('node-cache');

const employeesCache = new NodeCache();

function getAllEmployees() {
  return employeesCache.get('employees') || [];
}

function getEmployeeById(empId) {
  const employees = getAllEmployees();
  return employees.find(emp => emp.employeeId === empId);
}

function createEmployee(employee) {
  let employees = getAllEmployees();
  employees.push(employee);
  employeesCache.set('employees', employees);
  return employee;
}

function updateEmployee(empId, updatedEmployee) {
  let employees = getAllEmployees();
  const index = employees.findIndex(emp => emp.employeeId === empId);

  if (index !== -1) {
    employees[index] = updatedEmployee;
    employeesCache.set('employees', employees);
  }

  return updatedEmployee;
}

function deleteEmployee(empId) {
  let employees = getAllEmployees();
  const index = employees.findIndex(emp => emp.employeeId === empId);

  if (index !== -1) {
    employees.splice(index, 1);
    employeesCache.set('employees', employees);
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
