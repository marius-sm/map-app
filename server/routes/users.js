var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(request, response, next) {
  //res.send('respond with a resource');
  response.json([{
	  id: 1,
	  username: "test_user"
  }, {
	  id: 2,
	  username: "test_password"
  }]);
});

module.exports = router;
