import React, {PureComponent} from "react";
import {memoize_one} from "memoize";
import {toDomYCoord_Linear} from "plot-utils";

class ThresholdOverlay extends PureComponent {
  constructor(props){
    super(props);
    this.mode=0; // 0: upper, 1:lower
    this.ref = React.createRef();
  }

  getStyle = memoize_one( (width,height)=>{
    return {width,height,overflow:"hidden",position:"relative"};
  });
  
  render() {
    let {width,height,upperThreshold,lowerThreshold,minY,maxY} = this.props;
    let upperThresholdDomY = toDomYCoord_Linear(height,minY,maxY,upperThreshold);
    let lowerThresholdDomY = toDomYCoord_Linear(height,minY,maxY,lowerThreshold);
    return (
      <div style={this.getStyle(width,height)}>
        <div style={{ position:"absolute",top:upperThresholdDomY,
                      width:width,height:lowerThresholdDomY-upperThresholdDomY,
                      borderStyle:"dashed none dashed none",
                      borderColor:"red",
                      borderWidth:1
                    }} >
        </div>
      </div>
    );
  }

}

export default ThresholdOverlay;
