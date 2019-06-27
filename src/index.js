import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {ThresholdSliderLite as ThresholdSlider, ThresholdOverlay} from "./lib";

const DATA = [...new Array(10000).keys()].map( i=>({x:i,y:i}) );

class App extends Component {
  constructor(props){
    super(props);
    this.state={width:100,
                height:400,
                lowerThreshold:10,
                upperThreshold:150
                };
  }

  updateThreshold = ({upperThreshold,lowerThreshold})=>{
    this.setState({upperThreshold:upperThreshold,lowerThreshold:lowerThreshold});
  }
  
  render() {
    let {width,height,lowerThreshold,upperThreshold} = this.state;
    return (
      <div style={{display:"flex"}}>
        <ThresholdOverlay width={width}
                          height={height}
                          minY={0}
                          maxY={200}
                          lowerThreshold={lowerThreshold}
                          upperThreshold={upperThreshold}
                          />
        <ThresholdSlider  data={DATA}
                          width={width}
                          height={height}
                          minY={0}
                          maxY={200}
                          lowerThreshold={lowerThreshold}
                          upperThreshold={upperThreshold}
                          updateThresholdHandler={this.updateThreshold}
                          />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
