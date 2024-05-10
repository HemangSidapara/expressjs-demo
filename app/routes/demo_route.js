module.exports = app => {
    const demos = require("../controllers/demo_controller.js");
  
    var router = require('express').Router();
  
    // Create a new demo
    router.post("/", demos.create);
  
    // Retrieve all demos
    router.get("/", demos.findAll);
  
    // Retrieve all published demos
    router.get("/published", demos.findAllPublished);
  
    // Retrieve a single demo with id
    router.get("/:id", demos.findOne);
  
    // Update a demo with id
    router.patch("/:id", demos.update);
  
    // Delete a demo with id
    router.delete("/:id", demos.delete);
  
    // Delete all demos
    router.delete("/", demos.deleteAll);
  
    app.use('/api/demos', router);
};