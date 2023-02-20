const db = require("../models");
const Cat = db.cats;
const Op = db.Sequelize.Op;

// Create and Save a new Cat
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Cat
    const cat = {
      name: req.body.name,
      country: req.body.country,
      description: req.body.description,
      kepUrl: req.body.kepUrl,
    };
  
    // Save Cat in the database
    Cat.create(cat)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cat."
        });
      });
  };

// Retrieve all Cats from the database.
exports.findAll = (req, res) => {
    const country = req.query.country;
    var condition = country ? { country: { [Op.like]: `%${country}%` } } : null;
  
    Cat.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving cats."
        });
      });
  };


// Find a single Cat with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cat.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cat with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cat with id=" + id
      });
    });
};

// Update a Cat by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Cat.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cat was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Cat with id=${id}. Maybe Cat was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Cat with id=" + id
        });
      });
  };

// Delete a Cat with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Cat.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Cat was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Cat with id=${id}. Maybe Cat was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Cat with id=" + id
        });
      });
  };

// Delete all Cats from the database.
exports.deleteAll = (req, res) => {
    Cat.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Cats were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cats."
        });
      });
  };
