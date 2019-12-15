import User from '../models/user';
import STRING from '../constants/strings';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as validator from './authValidator';

const BCRYPT_SALT_ROUNDS = 10;

export const registerController = [
  ...validator.register,
  (req, res, next) => {
    const { username, password, isAdmin, email } = req.body;
    User.findOne({ username })
      .then(user => {
        if (user != null) {
          res.status(401).json({
            status: 'Error',
            message: 'Username is already taken'
          });
          return null;
        }
        return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
      })
      .then(hashedPassword => {
        if (hashedPassword)
          return User.create({
            username,
            password: hashedPassword,
            isAdmin,
            email
          });
        else return null;
      })
      .then(user => {
        if (user)
          res.status(201).json({
            status: 'OK',
            message: 'User succesfully created'
          });
      })
      .catch(next);
  }
];

export const loginController = [
  ...validator.login,
  (req, res, next) => {
    const { username, password } = req.body;
    let tempUser;
    User.findOne({ username })
      .then(user => {
        if (user === null) {
          return Promise.resolve(false);
        }
        tempUser = user;
        return bcrypt.compare(password, user.password);
      })
      .then(response => {
        if (response === false) {
          return res.status(401).json({
            status: 'Error',
            message: 'Username or password is wrong'
          });
        }
        const token = jwt.sign({ username }, STRING.secret);
        res.status(200).json({
          status: 'OK',
          message: 'User authenticated',
          token,
          user: tempUser
        });
      })
      .catch(next);
  }
];

export const tokenController = [
  ...validator.token,
  (req, res, next) => {
    jwt.verify(req.token, STRING.secret, (err, payload) => {
      if (err) {
        return res.status(401).json({
          status: 'Error',
          message: 'Token is wrong'
        });
      }

      User.findOne({ username: payload.username })
        .populate('results')
        .then(user => {
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
        .catch(next);
    });
  }
];
