
const express = require('express');
const app = express();
const PORT = 3001;
const xlsx = require('xlsx');

app.use('/api' , (req,res) =>{
    console.log(req);
});

app.listen(PORT, () =>{
    console.log('localhost :',PORT);
})