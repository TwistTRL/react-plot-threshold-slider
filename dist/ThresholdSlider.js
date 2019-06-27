"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _bisect = require("bisect");

var _memoize = require("memoize");

var _plotUtils = require("plot-utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ThresholdSlider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ThresholdSlider, _PureComponent);

  function ThresholdSlider(props) {
    var _this;

    _classCallCheck(this, ThresholdSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThresholdSlider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getSortedY", (0, _memoize.memoize_one)(function (data) {
      return data.map(function (_ref) {
        var y = _ref.y;
        return y;
      }).sort();
    }));

    _defineProperty(_assertThisInitialized(_this), "getUpperPortion", (0, _memoize.memoize_one)(function (sortedY, upperThreshold) {
      return ((0, _bisect.bisect_left)(sortedY, upperThreshold) + 1) / sortedY.length;
    }));

    _defineProperty(_assertThisInitialized(_this), "getLowerPortion", (0, _memoize.memoize_one)(function (sortedY, lowerThreshold) {
      return (sortedY.length - (0, _bisect.bisect_right)(sortedY, lowerThreshold) + 1) / sortedY.length;
    }));

    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(ThresholdSlider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          data = _this$props.data,
          width = _this$props.width,
          height = _this$props.height,
          minY = _this$props.minY,
          maxY = _this$props.maxY,
          upperThreshold = _this$props.upperThreshold,
          lowerThreshold = _this$props.lowerThreshold,
          updateThresholdHandler = _this$props.updateThresholdHandler;
      var sortedY = this.getSortedY(data);
      var upperPortion = this.getUpperPortion(sortedY, upperThreshold);
      var lowerPortion = this.getLowerPortion(sortedY, lowerThreshold);
      var upperDomX = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, upperThreshold);
      var lowerDomX = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, lowerThreshold);
      return _react.default.createElement("div", {
        width: width,
        height: height,
        style: {
          width: width,
          height: height,
          backgroundColor: "#efefef",
          position: "relative",
          overflow: "hidden",
          userSelect: "none"
        }
      }, _react.default.createElement("div", {
        style: {
          position: "absolute",
          top: upperDomX,
          width: width,
          height: lowerDomX - upperDomX,
          backgroundColor: 'grey',
          userSelect: "none"
        }
      }, upperPortion), _react.default.createElement("div", {
        style: {
          position: "absolute",
          bottom: height - upperDomX - 1,
          width: width,
          height: 10,
          backgroundColor: 'green',
          userSelect: "none"
        }
      }), _react.default.createElement("div", {
        style: {
          position: "absolute",
          top: lowerDomX - 1,
          width: width,
          height: 10,
          backgroundColor: 'red',
          userSelect: "none"
        }
      }, lowerPortion));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      console.log("!@#!@#");
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      console.log("!");
    }
  }]);

  return ThresholdSlider;
}(_react.PureComponent);

var _default = ThresholdSlider;
exports.default = _default;