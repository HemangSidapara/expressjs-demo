const demo = require('../models/db_model.js')

// Create and Save a new Demo
exports.create = (req, res)=>{
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Demo
    const tutorial = new demo({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    console.log("tutorial: ", tutorial);

    // Save Demo in the database
    demo.create(tutorial, (err, data) => {
        if (err){
            res.status(500).send({
                message: err.message || "Some error occurred while creating the demo."
            });
        } else {
            res.send(data);
        }
    });
};

// Retrieve all Demos from the database (with condition).
exports.findAll = (req, res) => {
  demo.getAll(req.query.title, (err, data)=>{
    if(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving demos."
        });
    } else {
        res.send(data);
    }
  });
};

// Find a single Demo with a id
exports.findOne = (req, res) => {
  demo.findById(req.params.id, (err, data)=>{
    if(err){
        if(err.kind === 'not_found'){
            res.status(404).send({
                message: `Not fount demo with id ${req.params.id}.`
            });
        }else{
            res.status(500).send({
                message: "Error retrieving demo with id " + req.params.id
            });
        }
    } else {
        res.send(data);
    }
  });
};

// find all published Demos
exports.findAllPublished = (req, res) => {
  demo.getAllPublished((err, data)=>{
    if(err){
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving demos."
        });
    }else{
        res.send(data);
    }
  });
};

// Update a Demo identified by the id in the request
exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    demo.updateById(req.params.id,new demo(req.body),(err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found demo with id ${req.params.id}.`
                });
            }else{
                res.status(500).send({
                    message: "Error updating demo with id " + req.params.id
                });
            }
        }else{
            res.send(data);
        }
    });
};

// Delete a Demo with the specified id in the request
exports.delete = (req, res) => {
    demo.delete(req.params.id, (err, data)=>{
        if(err){
            if(err.kind === 'not_found'){
                res.status(404).send({
                    message: `Not found demo with id ${req.params.id}.`
                });
            }else{
                res.status(500).send({
                    message: "Error deleting demo with id " + req.params.id
                });
            }
        }else{
            res.send({
                message: `Demo was deleted successfully!`
            });
        }
    });
};

// Delete all Demos from the database.
exports.deleteAll = (req, res) => {
  demo.deleteAll((err, data)=>{
    if(err){
        res.status(500).send({
            message: err.message || "Some error occurred while removing all demos."
        });
    }else{
        res.send({
           message: "All Demos were deleted successfully!" 
        });
    }
  });
};