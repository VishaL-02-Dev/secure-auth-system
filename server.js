const express = require('express');
const dotenv = require('dotenv');
const { authRoutes, protect, allowRoles, connectDB } = require('./index');

//Load env variables
dotenv.config();

//Connect your Database
connectDB();

//Express initialization
const app = express();
app.use(express.json());

//Auth routes
app.use('/api/auth',authRoutes);


// Protected Test Routes
app.get('/api/protected/public', (req, res) => {
  res.json({ message: 'This route is public' });
});

app.get('/api/protected/user', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.name}, you are authenticated` });
});

app.get('/api/protected/admin', protect, allowRoles(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));