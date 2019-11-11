import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { bisect_left, bisect_right } from "bisect";
import { memoize_one } from "memoize";
import { fromDomYCoord_Linear, toDomYCoord_Linear } from "plot-utils";
import DragOverlay from "./DragOverlay";

class ThresholdSlider extends PureComponent {
  constructor(props) {
    super(props);
    this.snapshot = {};
    this.state = { dragging: null }; // null/'left'/'right'
    this.ref = React.createRef();
  }

  render() {
    let { data, value, width, height, minY, maxY, upperThreshold, lowerThreshold } = this.props;
    let { dragging } = this.state;
    // Get portions
    let upperPortion = this.getUpperPortion(data, value, upperThreshold);
    let lowerPortion = this.getLowerPortion(data, value, lowerThreshold);
    let centerPortion = 100 - (upperPortion + lowerPortion)
    let upperPortionDisplay = upperPortion.toFixed(1);
    let lowerPortionDisplay = lowerPortion.toFixed(1);
    let centerPortionDisplay = centerPortion.toFixed(1);
    // Get threshold Dom positions
    let upperDomY = toDomYCoord_Linear(height, minY, maxY, upperThreshold);
    let lowerDomY = toDomYCoord_Linear(height, minY, maxY, lowerThreshold);
    // DragOverlay
    let DragOverlayElem = null;

    console.log(data)

    if (dragging === "upper") {
      DragOverlayElem = <DragOverlay cursor="ns-resize"
        mouseMoveHandler={this.handleUpperHandleDragging}
        mouseUpHandler={this.handleUpperHandleDragEnd}
      />
    }

    if (dragging === "lower") {
      DragOverlayElem = <DragOverlay cursor="ns-resize"
        mouseMoveHandler={this.handleLowerHandleDragging}
        mouseUpHandler={this.handleLowerHandleDragEnd}
      />
    }

    return (
      <div>
        <svg ref={this.ref}
          width={width} height={height}
          xmlns="http://www.w3.org/2000/svg"
          style={{ backgroundColor: "#eeeeee", borderLeft: "1px solid grey" }}>
          <style jsx="true">{`
            text {
              fill: white;
              font-family: Sans;
              pointer-events: none;
                  }
                  `}
          </style>
          <defs>
            <path
              id="upperHandle"
              d={`M 0 0 L 5 5 L ${width} 5 L ${width} -20 L 10 -20 z`}
              fill="#cad6d9" />
            <filter id="upperShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="-2" stdDeviation="2" />
            </filter>
            <path
              id="lowerHandle"
              d={`M 0 0 L 5 -5 L ${width} -5 L ${width} 20 L 10 20 z`}
              fill="#cad6d9" />
            <filter id="lowerShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" />
            </filter>
          </defs>

          <rect x="0" y={upperDomY} width={width} height={lowerDomY - upperDomY}
            style={{ fill: "#8ea5ab" }}
          />
          <text x={width} y={(upperDomY + lowerDomY) / 2} fontSize="smaller" textAnchor="end" dominantBaseline="middle">{centerPortionDisplay}%</text>
          <use href="#upperHandle" x="0" y={upperDomY}
            style={{ cursor: "ns-resize", fill: "grey", filter: "url(#upperShadow)" }}
            onMouseDown={this.handleUpperHandleDragStart} />
          <text x={width} y={upperDomY - 10} fontSize="smaller" style={{ fill: "#758895" }} textAnchor="end" dominantBaseline="middle">{upperPortionDisplay}%</text>
          <use href="#lowerHandle" x="0" y={lowerDomY}
            style={{ cursor: "ns-resize", fill: "grey", filter: "url(#lowerShadow)" }}
            onMouseDown={this.handleLowerHandleDragStart} />
          <text x={width} y={lowerDomY + 10} fontSize="smaller" style={{ fill: "#758895" }} textAnchor="end" dominantBaseline="middle">{lowerPortionDisplay}%</text>
        </svg>
        {DragOverlayElem}
      </div>
    );
  }

  getSortedY = memoize_one((data, value) => {
    return data.map((obj) => obj[value])
      .sort((a, b) => a - b);
  });

  getUpperPortion = memoize_one((data, value, threshold) => {
    let sortedY = this.getSortedY(data, value);
    let idx = bisect_right(sortedY, threshold);
    return (sortedY.length - idx) / sortedY.length * 100;
  });

  getLowerPortion = memoize_one((data, value, threshold) => {
    let sortedY = this.getSortedY(data, value);
    let idx = bisect_left(sortedY, threshold);
    return (idx + 1) / sortedY.length * 100
  });

  getCenterPortion(data, value, upperThreshold, lowerThreshold) {
    let uprP = this.getUpperPortion(data, value, upperThreshold);
    let lwrP = this.getLowerPortion(data, value, lowerThreshold);
    let centerP = 100 - uprP - lwrP;
    return centerP;
  }

  handleUpperHandleDragStart = (ev) => {
    this.setState({ dragging: "upper" });
  }

  handleLowerHandleDragStart = (ev) => {
    this.setState({ dragging: "lower" });
  }

  handleUpperHandleDragging = (ev) => {
    let { height, minY, maxY, lowerThreshold } = this.props;
    let referenceNode = this.ref.current;
    let upperThresholdDomY = ev.clientY - referenceNode.getBoundingClientRect().top;
    let upperThreshold = fromDomYCoord_Linear(height, minY, maxY, upperThresholdDomY);
    lowerThreshold = Math.min(lowerThreshold, upperThreshold);
    this.handleThresholdUpdate(upperThreshold, lowerThreshold);
  }

  handleLowerHandleDragging = (ev) => {
    let { height, minY, maxY, upperThreshold } = this.props;
    let referenceNode = this.ref.current;
    let lowerThresholdDomY = ev.clientY - referenceNode.getBoundingClientRect().top;
    let lowerThreshold = fromDomYCoord_Linear(height, minY, maxY, lowerThresholdDomY);
    upperThreshold = Math.max(lowerThreshold, upperThreshold);
    this.handleThresholdUpdate(upperThreshold, lowerThreshold);
  }

  handleUpperHandleDragEnd = (ev) => {
    this.setState({ dragging: null });
  }

  handleLowerHandleDragEnd = (ev) => {
    this.setState({ dragging: null });
  }

  handleThresholdUpdate(upperThreshold, lowerThreshold) {
    let { updateThresholdHandler } = this.props;
    let { minY, maxY } = this.props;
    upperThreshold = Math.max(minY, Math.min(maxY, upperThreshold));
    lowerThreshold = Math.max(minY, Math.min(maxY, lowerThreshold));
    let thresholds = this.createThresholds(upperThreshold, lowerThreshold);
    updateThresholdHandler(thresholds);
  }

  createThresholds = memoize_one((upperThreshold, lowerThreshold) => {
    return { upperThreshold, lowerThreshold };
  });
}

ThresholdSlider.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  upperThreshold: PropTypes.number.isRequired,
  lowerThreshold: PropTypes.number.isRequired,
  updateThresholdHandler: PropTypes.func.isRequired,
};

export default ThresholdSlider;
