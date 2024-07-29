import { gsap } from "gsap";
import * as helper from './helper.js';
import * as scrollbar from './scrollbar.js';

var timeline;

// path variables for animating the logo/main menu
var pathFrame = "M 0,0 l 300,0 l 0,450 l -300,0 Z"; // format: upper left -> upper right -> lower right -> lower left
const pathTop = "M 0,65 l 300,-65 l 0,85 l -300,65 Z";
const pathMiddle = "M 0,165 l 240,60 l -120,30 l -120,30 Z";
const pathBottom = "M 0,300 l 300,65 l 0,85 l -300,-65 Z";

// initialize variables to hold values of the browser window and the app frame within
var windowWidth = 0, windowHeight = 0;
var frameWidth = 0, frameHeight = 0;
const borderWidth = 6;

// default menu width/height, subject to become dynamically resized
const baseWidth = 300;
const baseHeight = 450;
const maxWidth = 960;
const maxHeight = 640;

// IDs of the path components used as menu buttons
const clickTopID = '#click-capture-top';
const clickMiddleID = '#click-capture-middle';
const clickBottomID = '#click-capture-bottom';

// holds the ID of active path being used to frame the content window
var currentPath;
var currentPage = 'home';

// IDs of the <svg> components that wrap the click paths
const svgClickTop = '#click-canvas-top';
const svgClickMiddle = '#click-canvas-middle';
const svgClickBottom = '#click-canvas-bottom';

// IDs of the menu titlecards
const menuCoverTop = '#menu-cover-top';
const menuCoverMiddle = '#menu-cover-middle';
const menuCoverBottom = '#menu-cover-bottom';

var offsetTop;
var offsetMiddle;
var offsetBottom;

var menuCoverTopPositions;
var menuCoverMiddlePositions;
var menuCoverBottomPositions;


// on page load and whenever the page is resized, calculate all the dimensions and positioning needed to display the app
function updateMeasurements() {
    
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    if (windowHeight < maxWidth) windowHeight = maxWidth;

    // variable that is used to change height of the app frame and position elements inside the frame
    // is set relative to the window width
    let frameOffset = 0;

    // based on window width, set the dimensions of the frame/content window and the positioning of each menu cover
    if (windowWidth > (maxWidth + 20)) {
        frameWidth = maxWidth;
        frameOffset = 40;
    } else if (windowWidth > 680 ) {
        frameWidth = windowWidth - 20;
        frameOffset = 40;
    } else if (windowWidth > 360) {
        frameWidth = windowWidth - 20;
        frameOffset = 20;
    } else {
        frameWidth = 340;
        frameOffset = 0;
    }

    // assign the height of the app frame, capped at 640px
    frameHeight = windowHeight - frameOffset;
    if (frameHeight > maxHeight) frameHeight = maxHeight;

    // each content "window" is positioned by default to the top of the frame, so calculate an offset for each that will align them with the clickable outline
    offsetTop = frameHeight/2 - baseHeight/2 - 8;
    offsetMiddle = frameHeight/2 - baseHeight/2 + 150;
    offsetBottom = frameHeight/2 - baseHeight/2 + 290;

    // each array contains the offset calculation for one of the content windows and a second position they'll be animated to when clicked
    menuCoverTopPositions = [ offsetTop, offsetTop-156 ];
    menuCoverMiddlePositions = [ offsetMiddle, offsetMiddle-133 ];
    menuCoverBottomPositions = [ offsetBottom, offsetBottom-156 ];

    // apply the offset to each content window
    document.querySelector(menuCoverTop).querySelector(".menu-text-wrapper").style.top = offsetTop + 'px';
    document.querySelector(menuCoverMiddle).querySelector(".menu-text-wrapper").style.top = offsetMiddle + 'px';
    document.querySelector(menuCoverBottom).querySelector(".menu-text-wrapper").style.top = offsetBottom + 'px';

    // set the path that a content window will be animated to when clicked
    // it equals the app frame dimensions minus the thickness of the border so that it isn't cut off by the viewBox, since the stroke on a path is applied from the center of the path
    pathFrame = "M " + (baseWidth/2 - frameWidth/2 + borderWidth/2) + "," + (baseHeight/2 - frameHeight/2 + borderWidth/2) + " l " + (frameWidth - borderWidth) + ",0 l 0," + (frameHeight - borderWidth) + " l -" + (frameWidth - borderWidth) + ",0 Z";

    // as long as a content page is open, resize the frame path as the page resizes
    if (currentPage !== 'home') {
        document.querySelector(currentPath).setAttribute('d', pathFrame);
    }

    // iterate through each svg path and reposition it relative to the center of the screen
    const clickCanvases = Array.from(document.getElementsByClassName("svg-canvas"));
    clickCanvases.forEach(canvas => {
        canvas.setAttribute("width", frameWidth);
        canvas.setAttribute("height", frameHeight);
        canvas.setAttribute("viewBox", `0 0 ${frameWidth} ${frameHeight}`);
        canvas.querySelector(".click-capture").style.transform = "translate(" + (frameWidth/2 - baseWidth/2)+ "px, " + (frameHeight/2 - baseHeight/2) + "px)";
    });

}

// infinitely loop the marquees used as menu options
function loop(target, pauseState) {
    const elements = gsap.utils.toArray(target);
    const speed = Math.random() * 0.2 + 0.02;
    helper.horizontalLoop(elements, {
        speed: speed, 
        paused: pauseState, 
        repeat: -1
    });
}

function bringToFront(elementId) {

    const menu = document.getElementById("app-frame");
    const e = document.querySelector(elementId);

    // Move the path to the end of the children list
    menu.appendChild(e);
    
}

function setPointerEvents(element, setting) {

    if (Array.isArray(element)) {
        element.forEach(entry => {
            entry.style.pointerEvents = setting;
        });
    } else {
        element.style.pointerEvents = setting;
    }

}

function removePointerEvents(element) {
    setPointerEvents(element,"none");
}

function addPointerEvents(element) {
    setPointerEvents(element,"visible");
}

export function menuToPage(activePage, setPageState) {

    let svg;
    let coverID;
    let coverPosition;
    
    switch(activePage) {
        case 'experience':
            currentPath = clickTopID;
            svg = svgClickTop;
            coverID = menuCoverTop;
            coverPosition = menuCoverTopPositions[1];
            break;
        case 'about':
            currentPath = clickMiddleID;
            svg = svgClickMiddle;
            coverID = menuCoverMiddle;
            coverPosition = menuCoverMiddlePositions[1];
            break;
        case 'projects':
            currentPath = clickBottomID;
            svg = svgClickBottom;
            coverID = menuCoverBottom;
            coverPosition = menuCoverBottomPositions[1];
            break;
    }

    // reset the z-index of the contact button so it's behind the content page before it opens
    document.querySelector('#contact').style.zIndex = "unset";

    bringToFront("#" + activePage);
    bringToFront(coverID);
    bringToFront(svg);

    const clicks = Array.from(document.getElementsByClassName("click-capture"));
    removePointerEvents(clicks);

    timeline = gsap.timeline();
    let cover = document.querySelector(coverID);

    timeline.to(cover.querySelector('.menu-text-wrapper'), {
        ease: "back.in",
        duration: 0.5,
        top: coverPosition,
        onComplete: () => {
            cover.style.display = 'none';
        }
    });

    timeline.to(currentPath, {
        ease: "power2.out",
        duration: 0.5,
        attr: { d: pathFrame }, 
        onComplete: () => {
            setPageState(activePage)
            currentPage = activePage;
        }
    });

}

export function pageToMenu(activePage, setPageState) {

    let originalPath;
    let coverID;
    let coverPosition;
    
    switch(activePage) {
        case 'experience':
            currentPath = clickTopID;
            originalPath = pathTop;
            coverID = menuCoverTop;
            coverPosition = menuCoverTopPositions[0];
            break;
        case 'about':
            currentPath = clickMiddleID;
            originalPath = pathMiddle;
            coverID = menuCoverMiddle;
            coverPosition = menuCoverMiddlePositions[0];
            break;
        case 'projects':
            currentPath = clickBottomID;
            originalPath = pathBottom;
            coverID = menuCoverBottom;
            coverPosition = menuCoverBottomPositions[0];
            break;
    }

    timeline = gsap.timeline();
    let cover = document.querySelector(coverID);

    timeline.to(currentPath, {
        ease: "power2.out",
        duration: 0.5,
        attr: { d: originalPath },
        onComplete: () => {
            bringToFront(svgClickTop);
            bringToFront(svgClickMiddle);
            bringToFront(svgClickBottom);
            const clicks = Array.from(document.getElementsByClassName("click-capture"));
            addPointerEvents(clicks);

            cover.style.display = 'block';

            // bring the contact button in front of the menu so it's clickable
            document.querySelector('#contact').style.zIndex = '1';
        } 
    });

    timeline.to(cover.querySelector('.menu-text-wrapper'), {
        ease: "power2.out",
        duration: 0.5,
        top: coverPosition
    });

    setPageState('home');
    currentPage = 'home';

}

function createHover(capture, target) {
    const tl = gsap.timeline({paused: true});
    tl.to(target, {
        ease: "none",
        duration: 0.25,
        backgroundColor: '#d9d1c5' //'#25072C'
    });

    capture.addEventListener("mouseenter", () => {
        tl.play();
    });
    capture.addEventListener("mouseout", () => {
        tl.reverse();
    });
}

function fadeIn(target) {

    gsap.to(target, {
        ease: "none",
        delay: 0.25,
        duration: 0.75,
        autoAlpha: 1
    });
}


window.onload = () => {

    updateMeasurements();

    const clicks = Array.from(document.getElementsByClassName("click-capture"));
    const covers = Array.from(document.getElementsByClassName("menu-text-wrapper"));

    for (let i = 0; i < clicks.length; i++) {
        createHover(clicks[i], covers[i]);
    };

    const lines = document.querySelectorAll(".menu-text-line");
    const linesArray = [...lines];
    linesArray.forEach((line) => {
        loop(line.querySelectorAll(".written-wrapper"), false);
    });

    scrollbar.initScroll();

    fadeIn(document.querySelector("#app-frame"));
    
};

window.onresize = updateMeasurements;