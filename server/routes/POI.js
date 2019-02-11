const verifyToken = require('./users.js').verifyToken;
const POI = require('../models/POI');
const express = require('express');

const router = express.Router();

router.post('/create', function (req, res) {
    let username;
    if(req.body.token) {
        verifyToken(req.body.token, function(result) {
            if(result.error) {
        		res.status(401).json({error: result.error});
        	} else {
                username = result.decoded.username;
                //if (req.body.name && parseFloat(req.body.latitude) != Nan && parseFloat(req.body.longitude) != Nan) {
                if(true) {
            		console.log('trying to create new POI')
            		var data = {
            			name: req.body.name,
                        username: username,
                        location: {
                            type: 'Point',
                            coordinates: [req.body.longitude, req.body.latitude],
                        }
            		}
                    console.log(data)
            		POI.create(data, function(error, POI) {
            			if(error) {
            				console.log("error in POI.create() : " + error)
            				res.json({
            					error: {
            						message: "Server error while creating POI",
            					},
            				}).status(500).json({error: true});
            			} else {
            				console.log('new POI successfully created !')
            				return res.status(201).json({error: false});
            			}
            		});
            	} else {
            		console.log('All fields required')
            		return res.json({
            			error: {
            				message: "No username or name provided or invalid coordinates",
            			},
            		}).status(400).json({});
            	}
        	}
        });
    } else {
        res.status(401).json({});
    }
});

module.exports = router;
