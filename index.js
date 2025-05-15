const authRoutes = require('./routes/authRoutes');
const protect = require('./middleware/authMiddleware');
const allowRoles = require('./middleware/roleMiddleware');
const connectDB = require('./config/db');

module.exports = {
  authRoutes,
  protect,
  allowRoles,
  connectDB
};
