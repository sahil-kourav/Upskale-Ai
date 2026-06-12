require('dotenv').config();
const server = require('./src/app');
const connectDB = require('./src/config/database');

connectDB();

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});