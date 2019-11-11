"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _memoize = require("memoize");

var _plotUtils = require("plot-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ThresholdOverlay =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ThresholdOverlay, _PureComponent);

  function ThresholdOverlay(props) {
    var _this;

    _classCallCheck(this, ThresholdOverlay);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThresholdOverlay).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getStyle", (0, _memoize.memoize_one)(function (width, height) {
      return {
        width: width,
        height: height,
        overflow: "hidden",
        position: "relative",
        pointerEvents: "none"
      };
    }));

    _this.mode = 0; // 0: upper, 1:lower

    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(ThresholdOverlay, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          width = _this$props.width,
          height = _this$props.height,
          upperThreshold = _this$props.upperThreshold,
          lowerThreshold = _this$props.lowerThreshold,
          minY = _this$props.minY,
          maxY = _this$props.maxY;
      var upperThresholdDomY = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, upperThreshold);
      var lowerThresholdDomY = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, lowerThreshold);
      return _react.default.createElement("div", {
        style: this.getStyle(width, height)
      }, _react.default.createElement("div", {
        style: {
          position: "absolute",
          top: upperThresholdDomY - 1,
          width: width,
          height: lowerThresholdDomY - upperThresholdDomY,
          borderStyle: "dashed none dashed none",
          borderColor: "red",
          borderWidth: 1,
          display: "flex",
          justifyContent: "flex-end"
        }
      }, _react.default.createElement("div", {
        style: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          textShadow: "1px 1px #fff"
        }
      }, _react.default.createElement("div", null, upperThreshold.toFixed(1)), _react.default.createElement("div", null, lowerThreshold.toFixed(1)))));
    }
  }]);

  return ThresholdOverlay;
}(_react.PureComponent);

ThresholdOverlay.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  minY: _propTypes.default.number.isRequired,
  maxY: _propTypes.default.number.isRequired,
  upperThreshold: _propTypes.default.number.isRequired,
  lowerThreshold: _propTypes.default.number.isRequired
};
var _default = ThresholdOverlay;
exports.default = _default;