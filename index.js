const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT || 5055;

app.use(cors());
app.use(bodyParser.json());

// const express = require('express')

// const cors = require('cors')
// const bodyParser = require('body-parser')
// require('dotenv').config()
// const port = process.env.PORT || 5500;
// // console.log(process.env.DB_USER)

// app.use(cors());
// app.use(bodyParser.json());

// const MongoClient = require('mongodb').MongoClient;

// // const pass = '69ptv8xxczERheg';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.o8ccw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// const app = express()

// console.log(process.env.DB_USER)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// Connect Mongodb Method 
client.connect(err => {
  console.log('connection err', err)
  const productCollection = client.db("abidDb").collection("products");
  console.log('Database Connected')

  app.get('/products', (req, res) => {
    productCollection.find()
      .toArray((err, items) => {
        res.send(items)
      })
  })


  app.post('/adminPanel', (req, res) => {
    const newProduct = req.body;
    console.log('adding new product', newProduct);
    productCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

  client.close();
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})