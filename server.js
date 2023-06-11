const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');

// Set up middleware for parsing JSON in request bodies
app.use(express.json());

// Define your API endpoint for receiving form data
app.post('/api/messages', async (req, res) => {
  const name = req.body.name;
  const message = req.body.message;

  try {
    // Connect to MongoDB Atlas
    const client = new MongoClient('mongodb+srv://suryagunji24:Surya2000@cluster0.uma9ypy.mongodb.net/?retryWrites=true&w=majority');
    await client.connect();

    // Insert the data into MongoDB Atlas
    const collection = client.db('chatgpt').collection('notes');
    await collection.insertOne({ name, message });

    // Close the MongoDB connection
    await client.close();

    // Respond with a success message
    res.status(200).json({ message: 'Data stored successfully' });
  } catch (error) {
    // Handle errors and respond with an error message
    console.error(error);
    res.status(500).json({ message: 'Error storing data' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
