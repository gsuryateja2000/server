const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://suryagunji24:Surya2000@cluster0.uma9ypy.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/submit', async (req, res) => {
const { name, message } = req.body;

try {
await client.connect();
const db = client.db('details');
const collection = db.collection('notes');

await collection.insertOne({ name, message });

console.log('Data inserted into MongoDB');
res.send('Data submitted successfully');
} catch (error) {
console.error('Failed to insert data into MongoDB', error);
res.status(500).send('An error occurred');
}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server listening on port ${PORT}`);
});





// mongodb+srv://suryagunji24:Surya2000@cluster0.uma9ypy.mongodb.net/dbcnc
