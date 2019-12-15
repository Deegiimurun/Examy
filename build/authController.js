'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.tokenController = exports.loginController = exports.registerController = void 0;

var _user = _interopRequireDefault(require('./user'));

var _strings = _interopRequireDefault(require('./strings'));

var _bcrypt = _interopRequireDefault(require('bcrypt'));

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

var validator = _interopRequireWildcard(require('./authValidator'));

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  if (obj != null) {
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError('Invalid attempt to spread non-iterable instance');
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === '[object Arguments]')
    return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

var BCRYPT_SALT_ROUNDS = 10;
var registerController = [].concat(_toConsumableArray(validator.register), [
  function(req, res, next) {
    var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password,
      isAdmin = _req$body.isAdmin,
      email = _req$body.email;

    _user['default']
      .findOne({
        username: username
      })
      .then(function(user) {
        if (user != null) {
          res.status(401).json({
            status: 'Error',
            message: 'Username is already taken'
          });
          return null;
        }

        return _bcrypt['default'].hash(password, BCRYPT_SALT_ROUNDS);
      })
      .then(function(hashedPassword) {
        if (hashedPassword)
          return _user['default'].create({
            username: username,
            password: hashedPassword,
            isAdmin: isAdmin,
            email: email
          });
        else return null;
      })
      .then(function(user) {
        if (user)
          res.status(201).json({
            status: 'OK',
            message: 'User succesfully created'
          });
      })
      ['catch'](next);
  }
]);
exports.registerController = registerController;
var loginController = [].concat(_toConsumableArray(validator.login), [
  function(req, res, next) {
    var _req$body2 = req.body,
      username = _req$body2.username,
      password = _req$body2.password;
    var tempUser;

    _user['default']
      .findOne({
        username: username
      })
      .then(function(user) {
        if (user === null) {
          return Promise.resolve(false);
        }

        tempUser = user;
        return _bcrypt['default'].compare(password, user.password);
      })
      .then(function(response) {
        if (response === false) {
          return res.status(401).json({
            status: 'Error',
            message: 'Username or password is wrong'
          });
        }

        var token = _jsonwebtoken['default'].sign(
          {
            username: username
          },
          _strings['default'].secret
        );

        res.status(200).json({
          status: 'OK',
          message: 'User authenticated',
          token: token,
          user: tempUser
        });
      })
      ['catch'](next);
  }
]);
exports.loginController = loginController;
var tokenController = [].concat(_toConsumableArray(validator.token), [
  function(req, res, next) {
    _jsonwebtoken['default'].verify(req.token, _strings['default'].secret, function(err, payload) {
      if (err) {
        return res.status(401).json({
          status: 'Error',
          message: 'Token is wrong'
        });
      }

      _user['default']
        .findOne({
          username: payload.username
        })
        .populate('results')
        .then(function(user) {
          if (user === null) {
            res.status(401).json({
              status: 'Error',
              message: 'Token is wrong'
            });
          } else {
            req.user = user;
            next();
          }
        })
        ['catch'](next);
    });
  }
]);
exports.tokenController = tokenController;
