'use strict';

var _express = _interopRequireDefault(require('express'));

var _mongoose = _interopRequireDefault(require('mongoose'));

var _cors = _interopRequireDefault(require('cors'));

var _authRouter = _interopRequireDefault(require('./authRouter'));

var _apiRouter = _interopRequireDefault(require('./apiRouter'));

var _urls = _interopRequireDefault(require('./urls'));

var _authController = require('./authController');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var app = (0, _express['default'])();
var PORT = process.env.PORT || 3000;
app.use(_express['default'].json());
app.use(
  _express['default'].urlencoded({
    extended: false
  })
);
app.use((0, _cors['default'])());
app.use(_authRouter['default']);
app.use('/v1', _authController.tokenController, _apiRouter['default']);
app.use(function(req, res, next) {
  res.status(404).json({
    status: 'Error',
    message: 'URL not found'
  });
});
app.use(function(err, req, res, next) {
  res.status(500).json({
    status: 'Error',
    message: 'Internal Server Error'
  });
});

_mongoose['default']
  .connect(_urls['default'].MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(function() {
    app.listen(PORT);
  }) // .then(() => {
  [
    //     Result.deleteMany({}, () => {});
    //     // return User.findOne({ username: 'admin' });
    // })
    // .then(user => {
    //     user.createExam({
    //         category: ['математик'],
    //         name: 'ЭЕШ-2017 А хувилбар',
    //         duration: 90,
    //         sections: [
    //             {
    //                 name: 'GRAMMAR',
    //                 description:
    //                     'Read the sentences below. Then choose the correct word for each blank. /15 x 2 = 30 points/',
    //                 questions: [
    //                     {
    //                         image: [],
    //                         question: 'Let’s go out! It ________ now.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'is snowing', isCorrect: true },
    //                             { answer: 'snows', isCorrect: true },
    //                             { answer: 'snow', isCorrect: false },
    //                             { answer: 'snowing', isCorrect: false },
    //                             { answer: 'was snowing', isCorrect: false }
    //                         ],
    //                         multipleAnswer: true
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'Tom never _________ coffee in the evening.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'drink', isCorrect: false },
    //                             { answer: 'is drinking', isCorrect: false },
    //                             { answer: 'drinks', isCorrect: true },
    //                             { answer: 'drank', isCorrect: false },
    //                             { answer: 'have drunk', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'I was very hungry so I _________ the hamburger very quickly.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'eat', isCorrect: false },
    //                             { answer: 'ate', isCorrect: true },
    //                             { answer: 'am eating', isCorrect: false },
    //                             { answer: 'eaten', isCorrect: false },
    //                             { answer: 'will eat', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'What kind of clothes ______you _________ when you were a kid?',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'are/using to wear', isCorrect: false },
    //                             { answer: 'did/used to wear', isCorrect: false },
    //                             { answer: 'do/use to wear', isCorrect: false },
    //                             { answer: 'are/used to wear', isCorrect: false },
    //                             { answer: 'did/use to wear', isCorrect: true }
    //                         ],
    //                         multipleAnswer: false
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'VOCABULARY',
    //                 description:
    //                     'Read the sentences below. Then choose the correct word or preposition for each blank.  /15 x 2 = 30 points/',
    //                 questions: [
    //                     {
    //                         image: [],
    //                         question: 'You can see old things here.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'in a library', isCorrect: false },
    //                             { answer: 'at a train station', isCorrect: false },
    //                             { answer: 'in a post office', isCorrect: false },
    //                             { answer: 'in a museum', isCorrect: true },
    //                             { answer: 'at a bus station', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'It’s very _________ in Mexico - it is often <b>45 degrees</b> there in summer.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'wet', isCorrect: false },
    //                             { answer: 'cold', isCorrect: false },
    //                             { answer: 'hot', isCorrect: true },
    //                             { answer: 'dry', isCorrect: false },
    //                             { answer: 'wintdy', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'Something for changing channels on the TV.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'a remote control', isCorrect: true },
    //                             { answer: 'a lamp', isCorrect: false },
    //                             { answer: 'a radio', isCorrect: false },
    //                             { answer: 'a socket', isCorrect: false },
    //                             { answer: 'a light switch', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: 'Mickey Mouse goes on a picnic.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'a cartoon', isCorrect: true },
    //                             { answer: 'a horror', isCorrect: false },
    //                             { answer: 'a western', isCorrect: false },
    //                             { answer: 'a musical', isCorrect: false },
    //                             { answer: 'a romantic comedy', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [],
    //                         question: '_________ people only think about themselves.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'patient', isCorrect: false },
    //                             { answer: 'honest', isCorrect: false },
    //                             { answer: 'selfish', isCorrect: true },
    //                             { answer: 'rude', isCorrect: false },
    //                             { answer: 'hungry', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     }
    //                 ]
    //             },
    //             {
    //                 name: 'COMMUNICATION',
    //                 description:
    //                     'Read the questions and answers. Then choose the best ones for them.  /4 x1 = 4 points/',
    //                 questions: [
    //                     {
    //                         image: [],
    //                         question: '<b>Man: ___________________?</b> <br> <b>Woman</b>: “Yes, I think so.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'Who can read this book?', isCorrect: false },
    //                             { answer: 'Why is your friend so happy?', isCorrect: false },
    //                             { answer: 'Where did you study?', isCorrect: false },
    //                             { answer: 'Will your parents be there?', isCorrect: true },
    //                             { answer: 'Whose camera is this?', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     },
    //                     {
    //                         image: [
    //                             'https://www.sciencemag.org/sites/default/files/styles/inline__699w__no_aspect/public/butterfly_16x9_0.jpg?itok=jfxAW1wx'
    //                         ],
    //                         question: 'Look at the sign. <b>Then<b> choose the correct explanation.',
    //                         point: 2,
    //                         answers: [
    //                             { answer: 'Who can read this book?', isCorrect: false },
    //                             { answer: 'Why is your friend so happy?', isCorrect: false },
    //                             { answer: 'Where did you study?', isCorrect: false },
    //                             { answer: 'Will your parents be there?', isCorrect: true },
    //                             { answer: 'Whose camera is this?', isCorrect: false }
    //                         ],
    //                         multipleAnswer: false
    //                     }
    //                 ]
    //             }
    //         ]
    //     });
    // })
    'catch'
  ](function(err) {});
