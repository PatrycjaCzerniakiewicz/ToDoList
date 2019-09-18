const FBuser = require('../models/FB_user');
const fetch = require('node-fetch');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.post('/login-with-facebook',async (req,res) => {
    const {accessToken,userID} = req.body
  
    const response = await fetch(`https://graph.facebook.com/v4.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
    const json = await response.json();
    console.log('json.id',json.id);
    if (json.id === userID) {
  
        const result = await FBuser.findOne({facebookID: userID});
  
        if(result){
        res.json({status:'ok',data: 'You are logged in'});
        }else {
          const newUser = new FBuser({
            name:json.name,
            facebookID: userID,
            accessToken
          })
        
        
        await newUser.save();
        res.json({status:"ok"});
        }
  
    }else {
      res.json({status:'error'});
    }
  
  });
  
  module.exports = router;