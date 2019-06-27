import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {bisect_left,bisect_right} from "bisect";
import {memoize_one} from "memoize";
import {fromDomYCoord_Linear, toDomYCoord_Linear} from "plot-utils";

class ThresholdSliderLite extends PureComponent {
  constructor(props){
    super(props);
    this.mode=0; // 0: upper, 1:lower
    this.ref = React.createRef();
  }
  
  render() {
    let {width,height} = this.props;
    return (
      <canvas ref={this.ref}
              width={width} height={height}
              style={{width:width,height:height,display:"block"}}
              onClick={this.handleClick}>
      </canvas>
    );
  }

  componentDidMount(){
    this.draw();
  }

  componentDidUpdate(){
    this.draw();
  }

  draw(){
    let {data,width,height,minY,maxY,upperThreshold,lowerThreshold} = this.props;
    // Clear the graph
    let canvas = this.ref.current;
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,width,height);
    // Coord convert
    let upperThresholdDomY = Math.round(toDomYCoord_Linear(height,minY,maxY,upperThreshold));
    let lowerThresholdDomY = Math.round(toDomYCoord_Linear(height,minY,maxY,lowerThreshold));
    // Get portions
    let upperPortion = this.getUpperPortion(data,upperThreshold);
    let lowerPortion = this.getLowerPortion(data,lowerThreshold);
    let centerPortion = this.getCenterPortion(data,upperThreshold,lowerThreshold);
    let upperPortionDisplay = upperPortion.toFixed(1);
    let lowerPortionDisplay = lowerPortion.toFixed(1);
    let centerPortionDisplay = centerPortion.toFixed(1);
    // Draw
    this.drawUpperHandle(ctx,width,height,upperThresholdDomY,upperPortionDisplay);
    this.drawLowerHandle(ctx,width,height,lowerThresholdDomY,lowerPortionDisplay);
    this.drawCenterPiece(ctx,width,height,upperThresholdDomY,lowerThresholdDomY,centerPortionDisplay);
  }

  drawUpperHandle(ctx,width,height,upperThresholdDomY,upperPortionDisplay) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(0,upperThresholdDomY);
    ctx.lineTo(width,upperThresholdDomY);
    ctx.stroke();
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(upperPortionDisplay,width-5,upperThresholdDomY-10);
  }

  drawLowerHandle(ctx,width,height,lowerThresholdDomY,lowerPortionDisplay) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(0,lowerThresholdDomY);
    ctx.lineTo(width,lowerThresholdDomY);
    ctx.stroke();
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(lowerPortionDisplay,width-5,lowerThresholdDomY+10);
  }

  drawCenterPiece(ctx,width,height,lowerThresholdDomY,upperThresholdDomY,centerPortionDisplay) {
    let centerPieceHeight = lowerThresholdDomY-upperThresholdDomY;
    let centerDomY = Math.round((lowerThresholdDomY+upperThresholdDomY)/2);
    ctx.fillStyle = "lightgrey";
    ctx.fillStyle = "black";
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(centerPortionDisplay,width-5,centerDomY);
  }

  getSortedY = memoize_one( (data)=>{
    return data.map( ({y})=>y )
               .sort()
  });

  getUpperPortion = memoize_one( (data,threshold)=>{
    let sortedY = this.getSortedY(data);
    let idx = bisect_right(sortedY,threshold);
    return (sortedY.length-idx)/sortedY.length*100;
  });
  
  getLowerPortion = memoize_one( (data,threshold)=>{
    let sortedY = this.getSortedY(data);
    let idx = bisect_left(sortedY,threshold);
    return (idx+1)/sortedY.length*100
  });

  getCenterPortion(data,upperThreshold,lowerThreshold) {
    let uprP = this.getUpperPortion(data,upperThreshold);
    let lwrP = this.getLowerPortion(data,lowerThreshold);
    let centerP = 100-uprP-lwrP;
    return centerP;
  }

  getSortedY = memoize_one( (data)=>{
    return data.map( ({y})=>y );
  });
  
  handleClick = (ev)=>{
    let {height,minY,maxY} = this.props;
    if (this.mode===0) {
      let clickDomY = ev.clientY - ev.target.getBoundingClientRect().y;
      let clickDataY = fromDomYCoord_Linear(height,minY,maxY,clickDomY);
      this.setUpperThreshold(clickDataY);
      this.mode = 1;
    }
    else {
      let clickDomY = ev.clientY - ev.target.getBoundingClientRect().y;
      let clickDataY = fromDomYCoord_Linear(height,minY,maxY,clickDomY);
      this.setLowerThreshold(clickDataY);
      this.mode = 0;
    }
  }

  setUpperThreshold(y) {
    let {updateThresholdHandler, lowerThreshold} = this.props;
    updateThresholdHandler({upperThreshold:y,lowerThreshold:lowerThreshold});
  }

  setLowerThreshold(y) {
    let {updateThresholdHandler, upperThreshold} = this.props;
    updateThresholdHandler({upperThreshold:upperThreshold,lowerThreshold:y});
  }
}

ThresholdSliderLite.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  minY: PropTypes.number.isRequired,
  maxY: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  upperThreshold: PropTypes.number.isRequired,
  lowerThreshold: PropTypes.number.isRequired,
  updateThresholdHandler: PropTypes.func.isRequired,
};

export default ThresholdSliderLite;
