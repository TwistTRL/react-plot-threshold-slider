import React, {PureComponent} from "react";
import {bisect_left,bisect_right} from "bisect";
import {memoize_one} from "memoize";
import {fromDomYCoord_Linear, toDomYCoord_Linear} from "plot-utils";

class ThresholdSlider extends PureComponent {
  constructor(props){
    super(props);
    this.ref = React.createRef();
  }

  getSortedY = memoize_one( (data)=>{
    return data.map( ({y})=>y )
               .sort()
  });
  
  getUpperPortion = memoize_one( (sortedY,upperThreshold)=>{
    return (bisect_left(sortedY,upperThreshold)+1) / sortedY.length;
  });

  getLowerPortion = memoize_one( (sortedY,lowerThreshold)=>{
    return (sortedY.length-bisect_right(sortedY,lowerThreshold)+1) / sortedY.length;
  });
  
  render() {
    let {data,width,height,minY,maxY,upperThreshold,lowerThreshold,updateThresholdHandler} = this.props;

    let sortedY = this.getSortedY(data);
    let upperPortion = this.getUpperPortion(sortedY,upperThreshold);
    let lowerPortion = this.getLowerPortion(sortedY,lowerThreshold);
    
    let upperDomX = toDomYCoord_Linear(height,minY,maxY,upperThreshold)
    let lowerDomX = toDomYCoord_Linear(height,minY,maxY,lowerThreshold)
    return (
      <div width={width} height={height} style={{width:width,height:height,backgroundColor:"#efefef",position:"relative",overflow:"hidden",userSelect:"none"}}>
        <div style={{position:"absolute",top:upperDomX,
                      width:width,height:lowerDomX-upperDomX,backgroundColor:'grey',userSelect:"none"}}>
          {upperPortion}
        </div>
        <div style={{position:"absolute",bottom:height-upperDomX-1,
                      width:width,height:10,backgroundColor:'green',userSelect:"none"}}>
        </div>
        <div style={{position:"absolute",top:lowerDomX-1,
                      width:width,height:10,backgroundColor:'red',userSelect:"none"}}>
          {lowerPortion}
        </div>
      </div>
    );
  }

  componentDidMount(){
    console.log("!@#!@#");
  }

  componentDidUpdate(){
    console.log("!");
  }
}

export default ThresholdSlider;
