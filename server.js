const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
