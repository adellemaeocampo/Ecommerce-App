const express = require('express');
const routes = require('./routes'); 
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the imported routes
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}!`);
    });
  })
  .catch(err => {
    console.error('Database synchronization error:', err);
  });