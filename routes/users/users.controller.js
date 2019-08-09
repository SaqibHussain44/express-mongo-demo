let controller = {};
const mongoose = require('mongoose');   
var User = mongoose.model('users');
var bcryptHelper = require('../../helpers/bcrypt')

controller.register = (payload) => { 
  return new Promise(async (resolve, reject) => {
    try {
      payload.password = await bcryptHelper.getHash(payload.password);
      User.create(payload, function (err, small) {
        if (err) return reject(err);
        return resolve(small)
      });
    } catch(err) {
      console.error(err);
    };
  })
}

controller.login = (payload) => {
  return new Promise(async (resolve, reject) => {
    console.log('payload',payload)
    try {
      User.find({ email: payload.email }, function(err, user) {
        if (err) {
          console.error(err);
          return reject(err);
        }
        if (user.length > 0) {
          let foundUser = user[0];
          console.log('foundUser',foundUser)
          bcryptHelper.compare(payload.password, foundUser.password).then(matched => {
          console.log('matched', matched)
            if (matched) {
              resolve(foundUser);
            } else {
              resolve('incorrectPassword');
            }
          }).catch(error => {
            console.error(error)
            reject(error);
          });
        } else {
          resolve('userNotFound');
        }
      })
    } catch(err) {
      console.error(err);
      reject(err);
    };
  })
};

module.exports = controller;