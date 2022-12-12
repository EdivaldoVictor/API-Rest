const express = require('express');

// 1. Create an express router object to set up our routes
const router = express.Router();

// 2. Import our tea controller from our controllers/tea.js file we created earlier
const teaController = require('../controllers/tea');

// 3. Create our first route with the controller function as the callback to handle the request.
router.post('/tea',teaController.uploadImg , teaController.newTea);
router.get('/tea', teaController.getAllTea);
router.delete('/tea', teaController.deleteAllTea);

router.get('/tea/:name', teaController.getOneTea);
router.post('/tea/:name', teaController.newComment);
router.delete('/tea/:name', teaController.deleteOneTea);

// 4. Export the route to use in our server.js
module.exports = router; // exṕrt to use in server.js 

