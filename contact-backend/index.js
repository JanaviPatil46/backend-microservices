const express = require('express');
const dbconnect = require('./database/dbconnect');
const app = express();
const cors = require('cors');
const contactRoutes = require('./routers/contactRoutes');
const AccountsRoutes = require('./routers/AccountsRoutes');
// Middleware
app.use(cors());
app.use(express.json());

//   Routes for contacts
app.use('/contacts', contactRoutes)

app.use('/accounts', AccountsRoutes)

//Cors Polycy 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Set the header to 'true' to allow credentials
    next();
  });

// database connect
dbconnect()


const port = process.env.PORT || 7000;

app.listen(port, ()=>{
    console.log(`connection is live at port no. ${port}`);
})