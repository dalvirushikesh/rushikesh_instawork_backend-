
//Package Imports
const express = require("express");
const con = express.Router();


 //api endpoint to check app health
con.get("/healthz", (req, res) => {
   
    res.status(200).send();
  });

  module.exports = con;