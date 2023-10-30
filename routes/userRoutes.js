const express = require('express');
const user_routes = express();

const bodyParser = require('body-parser');
user_routes.use(bodyParser.json());
user_routes.use(bodyParser.urlencoded({ extended: true }));

//
const multer = require("multer");
const path = require("path");

user_routes.use(express.static('public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'), function (err, success) {

      if (err) {
        throw err
      }

    });
  },

  filename: function (req, file, cb) {

    const name = Date.now() + '-' + file.originalname;
    cb(null, name, function (error, success) {

      if (error) {
        throw error
      }

    });

  }
});

const upload = multer({ storage: storage });
//

const user_controller = require('../controllers/userControllers');

// Insert API::- POST

user_routes.post('/insertData', user_controller.insert_data);

// UPDATE API::-  PUT

user_routes.put('/updateData', user_controller.update_data);

// Delete API::- DELETE

user_routes.delete('/deleteData', user_controller.delete_data);

// Get Single Data

user_routes.get('/getData', user_controller.get_data);

// Get All Data::

user_routes.get('/getAllData', user_controller.get_all_data);

// Search API::- POST

user_routes.get('/searchData/:key', user_controller.search_data);


module.exports = user_routes;

