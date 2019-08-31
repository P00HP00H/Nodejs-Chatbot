var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	var data = {
	    'type': 'buttons',
        'buttons': ['도움말', '평일', '일요일']
	};
	res.json(data);
});
module.exports = router;
