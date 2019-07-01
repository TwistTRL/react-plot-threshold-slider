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

var _DragOverlay = _interopRequireDefault(require("./DragOverlay"));

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

var ThresholdSlider =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(ThresholdSlider, _PureComponent);

  function ThresholdSlider(props) {
    var _this;

    _classCallCheck(this, ThresholdSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ThresholdSlider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "getSortedY", (0, _memoize.memoize_one)(function (data, value) {
      return data.map(function (obj) {
        return obj[value];
      }).sort(function (a, b) {
        return a - b;
      });
    }));

    _defineProperty(_assertThisInitialized(_this), "getUpperPortion", (0, _memoize.memoize_one)(function (data, value, threshold) {
      var sortedY = _this.getSortedY(data, value);

      var idx = (0, _bisect.bisect_right)(sortedY, threshold);
      return (sortedY.length - idx) / sortedY.length * 100;
    }));

    _defineProperty(_assertThisInitialized(_this), "getLowerPortion", (0, _memoize.memoize_one)(function (data, value, threshold) {
      var sortedY = _this.getSortedY(data, value);

      var idx = (0, _bisect.bisect_left)(sortedY, threshold);
      return (idx + 1) / sortedY.length * 100;
    }));

    _defineProperty(_assertThisInitialized(_this), "handleUpperHandleDragStart", function (ev) {
      _this.setState({
        dragging: "upper"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLowerHandleDragStart", function (ev) {
      _this.setState({
        dragging: "lower"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpperHandleDragging", function (ev) {
      var _this$props = _this.props,
          height = _this$props.height,
          minY = _this$props.minY,
          maxY = _this$props.maxY,
          lowerThreshold = _this$props.lowerThreshold;
      var referenceNode = _this.ref.current;
      var upperThresholdDomY = ev.clientY - referenceNode.getBoundingClientRect().top;
      var upperThreshold = (0, _plotUtils.fromDomYCoord_Linear)(height, minY, maxY, upperThresholdDomY);
      lowerThreshold = Math.min(lowerThreshold, upperThreshold);

      _this.handleThresholdUpdate(upperThreshold, lowerThreshold);
    });

    _defineProperty(_assertThisInitialized(_this), "handleLowerHandleDragging", function (ev) {
      var _this$props2 = _this.props,
          height = _this$props2.height,
          minY = _this$props2.minY,
          maxY = _this$props2.maxY,
          upperThreshold = _this$props2.upperThreshold;
      var referenceNode = _this.ref.current;
      var lowerThresholdDomY = ev.clientY - referenceNode.getBoundingClientRect().top;
      var lowerThreshold = (0, _plotUtils.fromDomYCoord_Linear)(height, minY, maxY, lowerThresholdDomY);
      upperThreshold = Math.max(lowerThreshold, upperThreshold);

      _this.handleThresholdUpdate(upperThreshold, lowerThreshold);
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpperHandleDragEnd", function (ev) {
      _this.setState({
        dragging: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLowerHandleDragEnd", function (ev) {
      _this.setState({
        dragging: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "createThresholds", (0, _memoize.memoize_one)(function (upperThreshold, lowerThreshold) {
      return {
        upperThreshold: upperThreshold,
        lowerThreshold: lowerThreshold
      };
    }));

    _this.snapshot = {};
    _this.state = {
      dragging: false
    }; // false/'left'/'right'

    _this.ref = _react.default.createRef();
    return _this;
  }

  _createClass(ThresholdSlider, [{
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          data = _this$props3.data,
          value = _this$props3.value,
          width = _this$props3.width,
          height = _this$props3.height,
          minY = _this$props3.minY,
          maxY = _this$props3.maxY,
          upperThreshold = _this$props3.upperThreshold,
          lowerThreshold = _this$props3.lowerThreshold;
      var dragging = this.state.dragging; // Get portions

      var upperPortion = this.getUpperPortion(data, value, upperThreshold);
      var lowerPortion = this.getLowerPortion(data, value, lowerThreshold);
      var centerPortion = this.getCenterPortion(data, value, upperThreshold, lowerThreshold);
      var upperPortionDisplay = upperPortion.toFixed(1);
      var lowerPortionDisplay = lowerPortion.toFixed(1);
      var centerPortionDisplay = centerPortion.toFixed(1); // Get threshold Dom positions

      var upperDomY = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, upperThreshold);
      var lowerDomY = (0, _plotUtils.toDomYCoord_Linear)(height, minY, maxY, lowerThreshold); // DragOverlay

      var DragOverlayElem = null;

      if (dragging === "upper") {
        DragOverlayElem = _react.default.createElement(_DragOverlay.default, {
          cursor: "ns-resize",
          mouseMoveHandler: this.handleUpperHandleDragging,
          mouseUpHandler: this.handleUpperHandleDragEnd
        });
      }

      if (dragging === "lower") {
        DragOverlayElem = _react.default.createElement(_DragOverlay.default, {
          cursor: "ns-resize",
          mouseMoveHandler: this.handleLowerHandleDragging,
          mouseUpHandler: this.handleLowerHandleDragEnd
        });
      }

      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("svg", {
        ref: this.ref,
        width: width,
        height: height,
        xmlns: "http://www.w3.org/2000/svg",
        style: {
          backgroundColor: "#eeeeee"
        }
      }, _react.default.createElement("style", {
        jsx: "true"
      }, "\n            text {\n              fill: white;\n              font-family: Sans;\n              pointer-events: none;\n            }\n            "), _react.default.createElement("defs", null, _react.default.createElement("path", {
        id: "upperHandle",
        d: "M 0 0 L 5 5 L ".concat(width, " 5 L ").concat(width, " -20 L 10 -20 z"),
        fill: "#000000"
      }), _react.default.createElement("filter", {
        id: "upperShadow",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
      }, _react.default.createElement("feDropShadow", {
        dx: "0",
        dy: "-2",
        stdDeviation: "2"
      })), _react.default.createElement("path", {
        id: "lowerHandle",
        d: "M 0 0 L 5 -5 L ".concat(width, " -5 L ").concat(width, " 20 L 10 20 z"),
        fill: "#000000"
      }), _react.default.createElement("filter", {
        id: "lowerShadow",
        x: "-50%",
        y: "-50%",
        width: "200%",
        height: "200%"
      }, _react.default.createElement("feDropShadow", {
        dx: "0",
        dy: "2",
        stdDeviation: "2"
      }))), _react.default.createElement("rect", {
        x: "0",
        y: upperDomY,
        width: width,
        height: lowerDomY - upperDomY,
        style: {
          fill: "grey"
        }
      }), _react.default.createElement("text", {
        x: width,
        y: (upperDomY + lowerDomY) / 2,
        textAnchor: "end",
        dominantBaseline: "middle"
      }, centerPortionDisplay, "%"), _react.default.createElement("use", {
        href: "#upperHandle",
        x: "0",
        y: upperDomY,
        style: {
          cursor: "ns-resize",
          fill: "grey",
          filter: "url(#upperShadow)"
        },
        onMouseDown: this.handleUpperHandleDragStart
      }), _react.default.createElement("text", {
        x: width,
        y: upperDomY - 10,
        textAnchor: "end",
        dominantBaseline: "middle"
      }, upperPortionDisplay, "%"), _react.default.createElement("use", {
        href: "#lowerHandle",
        x: "0",
        y: lowerDomY,
        style: {
          cursor: "ns-resize",
          fill: "grey",
          filter: "url(#lowerShadow)"
        },
        onMouseDown: this.handleLowerHandleDragStart
      }), _react.default.createElement("text", {
        x: width,
        y: lowerDomY + 10,
        textAnchor: "end",
        dominantBaseline: "middle"
      }, lowerPortionDisplay, "%")), DragOverlayElem);
    }
  }, {
    key: "getCenterPortion",
    value: function getCenterPortion(data, value, upperThreshold, lowerThreshold) {
      var uprP = this.getUpperPortion(data, upperThreshold);
      var lwrP = this.getLowerPortion(data, lowerThreshold);
      var centerP = 100 - uprP - lwrP;
      return centerP;
    }
  }, {
    key: "handleThresholdUpdate",
    value: function handleThresholdUpdate(upperThreshold, lowerThreshold) {
      var updateThresholdHandler = this.props.updateThresholdHandler;
      var _this$props4 = this.props,
          minY = _this$props4.minY,
          maxY = _this$props4.maxY;
      upperThreshold = Math.max(minY, Math.min(maxY, upperThreshold));
      lowerThreshold = Math.max(minY, Math.min(maxY, lowerThreshold));
      var thresholds = this.createThresholds(upperThreshold, lowerThreshold);
      updateThresholdHandler(thresholds);
    }
  }]);

  return ThresholdSlider;
}(_react.PureComponent);

ThresholdSlider.propTypes = {
  width: _propTypes.default.number.isRequired,
  height: _propTypes.default.number.isRequired,
  minY: _propTypes.default.number.isRequired,
  maxY: _propTypes.default.number.isRequired,
  data: _propTypes.default.array.isRequired,
  value: _propTypes.default.string.isRequired,
  upperThreshold: _propTypes.default.number.isRequired,
  lowerThreshold: _propTypes.default.number.isRequired,
  updateThresholdHandler: _propTypes.default.func.isRequired
};
var _default = ThresholdSlider;
exports.default = _default;