export function initScroll() {

    const pages = document.getElementsByClassName('content-page');

    Array.from(pages).forEach(element => {
        scrollEffects(element);
    });

}

function scrollEffects(element) {

    /* whenever the element is scrolled, update the scroll bar and arrow */
    element.addEventListener('scroll', function() {
        setBarSize(element);
    });

    /* recalculate scroll bars and arrows when resizing the window*/
    window.addEventListener('resize', function() {
        setBarSize(element);
    });

}


function setBarSize(element) {

	/* calculate the percentage the element has been scrolled */
	let scrollPercentage = element.scrollTop / (element.scrollHeight - element.clientHeight);

	/* calculate the pixel width of the scroll bar relative to the element's width*/ 
    let barSize = scrollPercentage * (element.offsetWidth - 10);

    element.querySelector('.scrollbar').style.width = barSize + 'px';

}