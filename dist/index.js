'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _fresh8JsModule = require('fresh8-js-module');

var _fresh8JsModule2 = _interopRequireDefault(_fresh8JsModule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Fresh8Component = function (_Component) {
  _inherits(Fresh8Component, _Component);

  function Fresh8Component(props) {
    _classCallCheck(this, Fresh8Component);

    var _this = _possibleConstructorReturn(this, (Fresh8Component.__proto__ || Object.getPrototypeOf(Fresh8Component)).call(this, props));

    _this.state = { adClassName: 'f8' };
    return _this;
  }

  _createClass(Fresh8Component, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      if (window.fresh8) {
        this.fresh8 = window.fresh8;
      } else {
        this.fresh8 = new _fresh8JsModule2.default({
          instID: this.props.instID,
          shouldBreakOut: this.props.shouldBreakOut,
          inApp: this.props.shouldBreakOut,
          endpoint: this.props.endpoint,
          listenOnPushState: this.props.listenOnPushState
        });

        window.fresh8 = this.fresh8;
      }

      this.setState({ 'adClassName': 'f8-' + _uuid2.default.v4() }, function () {
        _this2.fresh8.requestAd({
          slotID: _this2.props.slotID,
          appendPoint: '.' + _this2.state.adClassName,
          url: _this2.props.url,
          view: _this2.props.view,
          clickTrackingRedirect: _this2.props.clickTrackingRedirect,
          sport: _this2.props.sport,
          matchID: _this2.props.matchID,
          competitorIDs: _this2.props.competitorIDs,
          competitors: _this2.props.competitors,
          competitionIDs: _this2.props.competitionIDs,
          competitions: _this2.props.competitions
        }).then(function (ad) {
          return _this2.setState({ ad: ad });
        }).catch(function (reason) {
          if (_this2.props.debug) {
            console.log('F8 ad failed to load - instID: \'' + _this2.props.instID + '\' slotID: \'' + _this2.props.slotID + '\' Error: \'' + reason + '\'');
          }
        });
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.ad) {
        this.state.ad.destroy();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var adClassName = this.state.adClassName;


      return _react2.default.createElement('div', { className: adClassName });
    }
  }]);

  return Fresh8Component;
}(_react.Component);

exports.default = Fresh8Component;