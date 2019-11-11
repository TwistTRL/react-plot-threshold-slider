import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ThresholdSlider, { ThresholdOverlay } from "./lib";

const DATA = [...new Array(10000).keys()].map(i => ({ x: i, y: i }));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 800,
      height: 400,
      lowerThreshold: 100,
      upperThreshold: 9050
    }
  }

  updateThreshold = ({ upperThreshold, lowerThreshold }) => {
    this.setState({ upperThreshold: upperThreshold, lowerThreshold: lowerThreshold });
  }

  render() {
    let { width, height, lowerThreshold, upperThreshold } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <ThresholdOverlay
          width={width}
          height={height}
          minY={0}
          maxY={10000}
          lowerThreshold={lowerThreshold}
          upperThreshold={upperThreshold}
        />
        <ThresholdSlider
          data={DATA}
          value="y"
          width={80}
          height={height}
          minY={0}
          maxY={10000}
          lowerThreshold={lowerThreshold}
          upperThreshold={upperThreshold}
          updateThresholdHandler={this.updateThreshold}
        />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
