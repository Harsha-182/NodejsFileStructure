const router = require('express').Router();
const {
  userController,
      } = require('../controllers');

const {
  successResponseGenerator
} = require('../../utils');

const appResponse = require('../../utils/app-response');

const {
  passport
} = require('../middlewares');

const {
  validator: {
    checks: {
      CREDENTIALS,
    },
    validateRequest,
  },
} = require('../middlewares');

/**
 * @description Route to login users with email and password.
 * @param {string} email
 * @param {string} password
 */

router.post('/login',
  CREDENTIALS,
  validateRequest,
  passport.authenticate('local', {
    session: false,
  }),
  async (req, res, next) => {
    try {
      const { user } = req;
      const checkUser = await userController.checkIfUserExists({ id: req.user.id });
    
      const token = await user.getJwtToken();
        
      await userController.addSessionHistory({userId:checkUser.id, token })

      return res.status(200).json(successResponseGenerator({
        accessToken: token,
        userInfo: {
          id: checkUser.id,
          name: checkUser.first_name +" "+ checkUser.last_name ,
          email: checkUser.email,
        },
      }));
    } catch (error) {
      return res.status(500).json(createResponse({
        returnCode: 1,
        errorCode: 'SYSTEM_ERROR',
        errorMessage: error.sqlMessage || error.message,
        errorMeta: error.stack
    }));    
    }
  });

 function createResponse(info) {
  return appResponse.createResponse({
      data: info.data,
      returnCode: info.returnCode || 0,
      error: {
          message: info.errorMessage,
          code: info.errorCode,
          meta: info.errorMeta
      }
  });
}

module.exports = router;