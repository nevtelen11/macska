module.exports = (sequelize, Sequelize) => {
    const Cat = sequelize.define("cat", {
      name: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.BOOLEAN
      },
      kepUrl: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Cat;
  };