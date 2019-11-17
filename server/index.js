const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');

const { mongoose } = require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

//routes
app.use('/api/employees', require('./routes/employee.routes'));
//starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
