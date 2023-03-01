/**
 * @description  The model defined in the Node.js server is an abstraction of the data in the database,
 *  which is represented as a document. Because of this abstraction, we use the database schemas to 
 * construct a blueprint of how we want the added data to look and behave.
 */
const {
    Model,
  } = require('sequelize');
  const {
    authUtils: {
      generateJWT,
    },
  } = require('../../utils');

  module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate({ Credential }) {
          User.hasOne(Credential);
        }
      }
    User.init({
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.TEXT,
      },
      updated_by_id: {
        type: DataTypes.STRING,
      },
      created_by_id: {
        type: DataTypes.STRING,
      },
    }, {
      sequelize,
      modelName: 'User',
      underscored: true,
    });
  
    User.prototype.getJwtToken = async function getToken() {
      return generateJWT({
        id: this.id,
      });
    };
  
    return User;
  };

