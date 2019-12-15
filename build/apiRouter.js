'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _express = _interopRequireDefault(require('express'));

var _apiController = require('./apiController');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var router = _express['default'].Router();

router.get('/exam', _apiController.examController);
router['delete']('/exam', _apiController.examDeleteController);
router.post('/result', _apiController.resultController);
router.get('/history', _apiController.historyController);
var _default = router;
exports['default'] = _default;
