
//Package Imports
const express = require("express");
const con = express.Router();
const {User} = require("../models");
 User.sequelize.sync();

 //api endpoint to check app health
con.get("/healthz", (req, res) => {
    res.status(200).send();
  });


  // create new team member end point with sequelize 
  con.post("/v1/account", async (req, res) => {
    try{
    const newuser = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      role: req.body.role

    });
      
   
        return res.status(201).send(newuser);
      }
      catch(err) {
      
          return res.status(400).send(err);
        }
  });


//get all team members end point with sequelize
con.get("/v1/account", async (req, res) => {
    try{
     const team_members = await User.findAll({
     
    });
              return res.status(200).send(team_members);
}
      catch(err) {
        
          console.log(err);
          return res.status(400).send("Bad Request");
      }
      });
  
  

  module.exports = con;