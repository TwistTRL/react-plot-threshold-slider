import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { memoize_one } from "memoize";
import { toDomYCoord_Linear } from "plot-utils";

class ThresholdOverlay extends PureComponent {
  constructor(props) {
    super(props);
    this.mode = 0; // 0: upper, 1:lower
    this.ref = React.createRef();
  }

  getStyle = memoize_one((width, height) => {
    return { width, height, overflow: "hidden", position: "relative", pointerEvents: "none" };
  });

  render() {
    let { width, height, upperThreshold, lowerThreshold, minY, maxY } = this.props;
    let upperThresholdDomY = toDomYCoord_Linear(height, minY, maxY, upperThreshold);
    let lowerThresholdDomY = toDomYCoord_Linear(height, minY, maxY, lowerThreshold);

    return (
      <div style={this.getStyle(width, height)}>
        <div style={{
          position: "absolute", top: upperThresholdDomY - 1,
          width: width, height: lowerThresholdDomY - upperThresholdDomY,
          borderStyle: "dashed none dashed none",
          borderColor: "red",
          borderWidth: 1,
          display: "flex",
          justifyContent: "flex-end"
        }} >
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end"
          }}>
            <div>
              {upperThreshold.toFixed(1)}
            </div>
            <div>
              {lowerThreshold.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ThresholdOverlay.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  upperThreshold: PropTypes.number.isRequired,
  lowerThreshold: PropTypes.number.isRequired,
};

export default ThresholdOverlay;
