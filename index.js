const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.PORT || 5500;
// console.log(process.env.DB_USER)

// app.use(cors());
// app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;

// const pass = '69ptv8xxczERheg';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o8ccw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

// console.log(process.env.DB_USER)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Connect Mongodb Method 
client.connect(err => {
  const collection = client.db("abidDb").collection("products");
 console.log('Database Connected')

  // app.post('/admin', (req, res => {
  //   // const newProduct = req.body;
  //   // console.log(newProduct);
  // }))

  client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})