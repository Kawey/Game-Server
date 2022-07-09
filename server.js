const { request } = require('express');
const express = require('express');
const Datastore = require('nedb');
const fs = require("fs");
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));



const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request,response) => {
  database.find({},(err,data)=>{
    if(err) {
      response.end();
      return;
    }
    response.json(data);  
  });
  console.log("get res");
});

app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  console.log("post req");
  database.insert(data);
  response.json(data);
});

app.get('/clear', (request, response) => {
  
  database.remove({}, { multi: true }, (err, data) => {
    if(err) {
      response.end();
      return;
    }
    response.json(data); 
  });
  console.log("del req");
});
