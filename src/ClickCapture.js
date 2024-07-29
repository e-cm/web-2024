import * as animate from './animations.js';

export function ClickCapture( {id, width, height, path, targetPage, setActivePage} ) {

    const svgID = "click-canvas-" + id;
    const pathID = "click-capture-" + id;
    const box = "0 0 " + width + " " + height;
  
    return (
      <svg id={ svgID } className="svg-canvas" width={ width } height={ height } viewBox={ box }>
        <path id={ pathID } className="click-capture" d={ path } onClick={() => animate.menuToPage(targetPage, setActivePage)}/>
      </svg>
    );
}