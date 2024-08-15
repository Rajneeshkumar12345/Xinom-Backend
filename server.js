// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const formRoutes = require('./routes/formRoutes');

// dotenv.config();


// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use('/api/form', formRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');

dotenv.config();


const app = express();

connectDB();


 const allowedOrigins = ['https://xinom-front.vercel.app'];

// const allowedOrigins = ["http://localhost:3000"]

// app.use(cors({
//   origin: (origin, callback) => {

//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) {
//       const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));


// app.use(express.json());


const corsOptions = {
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));


app.use(express.json());

app.use('/api/form', formRoutes);


const PORT = process.env.PORT || 4000;


const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);

  server.close(() => process.exit(1));
});

