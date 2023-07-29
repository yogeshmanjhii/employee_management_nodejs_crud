const { validate: uuidValidate } = require('uuid');

function validateUuid(req, res, next) {
  const empId = req.params.empId;

  if (!uuidValidate(empId)) {
    return res.status(400).json({ error: 'Invalid employeeId' });
  }

  next();
}

module.exports = validateUuid;
