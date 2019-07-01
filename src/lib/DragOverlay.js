import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
// CSS
import "./DragOverlay.css"

class DragOverlay extends PureComponent {
  render() {
    let { cursor} = this.props
    return ReactDOM.createPortal(
      <div className="fullscreen" style={{cursor:cursor}}></div>,
      document.body
    );
  }

  componentDidMount(){
    document.addEventListener("mousemove",this.handleMouseMove,true)
    document.addEventListener("mouseup",this.handleMouseUp,true)
  }

  componentWillUnmount(){
    document.removeEventListener("mousemove",this.handleMouseMove,true)
    document.removeEventListener("mouseup",this.handleMouseUp,true)
  }
  
  handleMouseMove = (ev)=>{
    ev.preventDefault();
    ev.stopPropagation()
    let {mouseMoveHandler} = this.props
    mouseMoveHandler(ev)
  }

  handleMouseUp = (ev)=>{
    ev.preventDefault();
    ev.stopPropagation()
    let {mouseUpHandler} = this.props
    mouseUpHandler(ev)
  }
}


DragOverlay.propTypes = {
  cursor: PropTypes.string.isRequired,
  mouseMoveHandler: PropTypes.func.isRequired,
  mouseUpHandler: PropTypes.func.isRequired
}

export default DragOverlay
