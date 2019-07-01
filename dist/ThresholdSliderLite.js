"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bisect = require("bisect");

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

var ThresholdSliderLite =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ThresholdSliderLite, _PureComponent);

  function ThresholdSliderLite(props) {
    var _this;

    _classCallCheck(this, ThresholdSliderLite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThresholdSliderLite).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getSortedY", (0, _memoize.memoize_one)(function (data) {
      return data.map(function (_ref) {
        var y = _ref.y;
        return y;
      }).sort(function (a, b) {
        return a - b;
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "getUpperPortion", (0, _memoize.memoize_one)(function (data, threshold) {
      var sortedY = _this.getSortedY(data);

      var idx = (0, _bisect.bisect_right)(sortedY, threshold);
      return (sortedY.length - idx) / sortedY.length * 100;
    }));

    _defineProperty(_assertThisInitialized(_this), "getLowerPortion", (0, _memoize.memoize_one)(function (data, threshold) {
      var sortedY = _this.getSortedY(data);

      var idx = (0, _bisect.bisect_left)(sortedY, threshold);
      return (idx + 1) / sortedY.length * 100;
    }));

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (ev) {
      var _this$props = _this.props,
          height = _this$props.height,
          minY = _this$props.minY,
          maxY = _this$props.maxY;

      if (_this.mode === 0) {
        var clickDomY = ev.clientY - ev.target.getBoundingClientRect().y;
        var clickDataY = (0, _plotUtils.fromDomYCoord_Linear)(height, minY, maxY, clickDomY);

        _this.setUpperThreshold(clickDataY);

        _this.mode = 1;
      } else {
        var _clickDomY = ev.clientY - ev.target.getBoundingClientRect().y;

        var _clickDataY = (0, _plotUtils.fromDomYCoord_Linear)(height, minY, maxY, _clickDomY);

        _this.setLowerThreshold(_clickDataY);

        _this.mode = 0;
      }
    });

    _this.mode = 0; // 0: upper, 1:lower

    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(ThresholdSliderLite, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          width = _this$props2.width,
          height = _this$props2.height;
      return _react.default.createElement("canvas", {
        ref: this.ref,
        width: width,
        height: height,
        style: {
          width: width,
          height: height,
          display: "block"
        },
        onClick: this.handleClick
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.draw();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.draw();
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          width = _this$props3.width,
          height = _this$props3.height,
          minY = _this$props3.minY,
          maxY = _this$props3.maxY,
          upperThreshold = _this$props3.upperThreshold,
          lowerThreshold = _this$props3.lowerThreshold; // Clear the graph

      var canvas = this.ref.current;
      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, width, height); // Coord convert

      var upperThresholdDomY = Math.round((0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, upperThreshold));
      var lowerThresholdDomY = Math.round((0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, lowerThreshold)); // Get portions

      var upperPortion = this.getUpperPortion(data, upperThreshold);
      var lowerPortion = this.getLowerPortion(data, lowerThreshold);
      var centerPortion = this.getCenterPortion(data, upperThreshold, lowerThreshold);
      var upperPortionDisplay = upperPortion.toFixed(1);
      var lowerPortionDisplay = lowerPortion.toFixed(1);
      var centerPortionDisplay = centerPortion.toFixed(1); // Draw

      this.drawUpperHandle(ctx, width, height, upperThresholdDomY, upperPortionDisplay);
      this.drawLowerHandle(ctx, width, height, lowerThresholdDomY, lowerPortionDisplay);
      this.drawCenterPiece(ctx, width, height, upperThresholdDomY, lowerThresholdDomY, centerPortionDisplay);
    }
  }, {
    key: "drawUpperHandle",
    value: function drawUpperHandle(ctx, width, height, upperThresholdDomY, upperPortionDisplay) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.moveTo(0, upperThresholdDomY);
      ctx.lineTo(width, upperThresholdDomY);
      ctx.stroke();
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(upperPortionDisplay, width - 5, upperThresholdDomY - 10);
    }
  }, {
    key: "drawLowerHandle",
    value: function drawLowerHandle(ctx, width, height, lowerThresholdDomY, lowerPortionDisplay) {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.moveTo(0, lowerThresholdDomY);
      ctx.lineTo(width, lowerThresholdDomY);
      ctx.stroke();
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(lowerPortionDisplay, width - 5, lowerThresholdDomY + 10);
    }
  }, {
    key: "drawCenterPiece",
    value: function drawCenterPiece(ctx, width, height, lowerThresholdDomY, upperThresholdDomY, centerPortionDisplay) {
      var centerPieceHeight = lowerThresholdDomY - upperThresholdDomY;
      var centerDomY = Math.round((lowerThresholdDomY + upperThresholdDomY) / 2);
      ctx.fillStyle = "lightgrey";
      ctx.fillStyle = "black";
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(centerPortionDisplay, width - 5, centerDomY);
    }
  }, {
    key: "getCenterPortion",
    value: function getCenterPortion(data, upperThreshold, lowerThreshold) {
      var uprP = this.getUpperPortion(data, upperThreshold);
      var lwrP = this.getLowerPortion(data, lowerThreshold);
      var centerP = 100 - uprP - lwrP;
      return centerP;
    }
  }, {
    key: "setUpperThreshold",
    value: function setUpperThreshold(y) {
      var _this$props4 = this.props,
          updateThresholdHandler = _this$props4.updateThresholdHandler,
          lowerThreshold = _this$props4.lowerThreshold;
      updateThresholdHandler({
        upperThreshold: y,
        lowerThreshold: lowerThreshold
      });
    }
  }, {
    key: "setLowerThreshold",
    value: function setLowerThreshold(y) {
      var _this$props5 = this.props,
          updateThresholdHandler = _this$props5.updateThresholdHandler,
          upperThreshold = _this$props5.upperThreshold;
      updateThresholdHandler({
        upperThreshold: upperThreshold,
        lowerThreshold: y
      });
    }
  }]);

  return ThresholdSliderLite;
}(_react.PureComponent);

ThresholdSliderLite.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  minY: _propTypes.default.number.isRequired,
  maxY: _propTypes.default.number.isRequired,
  data: _propTypes.default.array.isRequired,
  upperThreshold: _propTypes.default.number.isRequired,
  lowerThreshold: _propTypes.default.number.isRequired,
  updateThresholdHandler: _propTypes.default.func.isRequired
};
var _default = ThresholdSliderLite;
exports.default = _default;