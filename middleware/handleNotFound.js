function handleNotFound(req, res, next) {
    res.status(404).json({ error: 'Endpoint not found' });
  }
  
  module.exports = handleNotFound;
  