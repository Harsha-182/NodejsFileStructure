/**
 * @module
 * @description User controller. Has all the user related functionality.
 */

const Sequelize = require('sequelize');

const { Op } = Sequelize;
const {
 User,
 Credential, 
 SessionHistory, 
} = require('../../db/models');

const { v4: uuidv4 } = require('uuid');



/**
 * @async
 * @description Used to find a user by the condition sepcified in the query object.
 * @param {Object} query - The query to find the user by.
 * @returns {Promise} Promise object representing the user defined by the search query.
 */
const checkIfUserExists = async (query) => User.findOne({

  where: {
    ...query,
  },
  attributes: ['id', 'first_name', 'last_name', 'email'],

});

/**
 * @async
 * @description Returns a user object along with the credentials.
 * @param {string} userId - UUID representing the user's id.
 * @returns {Promise} Promise object representing the user and his credentials.
 */
const getUserWithCredentials = async (userId) => User.findOne({
  where: {
    id: userId,
  },
  include: [Credential],
});

 /**
 * @async
 * @description Fetch the token in session history.
 * @param {STRING} userId Id of the user whose session token needs to be inactive.
 * @param {String} token existing token.
 */
const fetchToken = async({userId, token}) => {
 return await SessionHistory.findOne({
   where: {
     [Op.and]:[
       {user_id: userId},
       {access_token: token}
     ]    },
   attributes: ['id', 'active_flag']
 })
}

  /**
  * @async
  * @description Used to add the token to session history.
  * @param {String} userId Id of the user whose session token  needs to be stored.
  * @param {String} token New token.
  * @param {String} role User role
  */
  const addSessionHistory = async ({userId, token}) => {
    return await SessionHistory.create({
     id: uuidv4(),
     user_id: userId,
     access_token: token,
   })
}

 module.exports = {
  checkIfUserExists,
  getUserWithCredentials,
  fetchToken,
  addSessionHistory,
};
