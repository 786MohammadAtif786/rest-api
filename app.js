const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port =  3000;
const mongoURI = 'mongodb+srv://matif81999:EeB8J0a7HxVvzLJn@cluster0.s5wg59i.mongodb.net/rest-api';

app.use(express.json());
app.use('/api', userRoutes);

mongoose.connect(mongoURI).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error('Connection error', err);
});
