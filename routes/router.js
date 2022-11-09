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
      return res.status(201).send(newuser); //201 is the status code for created new team member 
      }
      catch(err) {
          return res.status(400).send(err); //400 is the status code for bad request
        }
  });


//get all team members end point with sequelize
con.get("/v1/account", async (req, res) => {
    try{
      const team_members = await User.findAll({   //find all users

      });
      return res.status(200).send(team_members); //200 is the status code for ok
    }
      catch(err) {
      console.log(err);
      return res.status(400).send("Bad Request"); //400 is the status code for bad request
      }
      });
  


//update team member end point with sequelize
con.put("/v1/account/:id", async (req, res) => {
  // Checking  any other fields than the editable fields
  try{
  const bodyfields = req.body;    //get the body fields
  for (let x in bodyfields) {    //loop through the body fields
    if (
      x != "first_name" &&
      x != "last_name" &&
      x != "email" &&
      x != "phone_number" &&
      x != "role"
    ) {
      return res.status(400).send("Bad Request"); //400 is the status code for bad request
    }
  }
  const userr = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if(userr)
{            const Accu = await User.update({      //update the user
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              email: req.body.email,
              phone_number: req.body.phone_number,
              role: req.body.role
              },
              {
                where: {
                  id:req.params.id, 
                },
            });
            const updateduser = await User.findOne({
              where: {
                id: req.params.id,
              },
            });
              return res.status(200).send(updateduser); //200 is the status code for ok
          }
              else{
                return res.status(404).send("Not Found"); //404 is the status code for not found
              }
    }
    catch(err)  {
        console.log(err);
        return res.status(400).send("Bad Request"); //400 is the status code for bad request
      }
    });


    
  //delete team member data with sequalize 
con.delete("/v1/account/:id", async (req, res) => {
    try{
      const userr = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (userr) {
    const team_member = await User.destroy({ //delete the user
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(204);}
    else
    {
    res.status(404).send("Not Found"); //404 is the status code for not found
    }}
    catch(err) {
        console.log(err);
        return res.status(400).send("Bad Request");
      }
      });

  module.exports = con;