import './App.css';
import * as animate from './animations.js';
import { ClickCapture } from './ClickCapture.js';
import { MenuCard } from './MenuCard.js';
import * as media from './media_data.js';
import * as svg from './svg_data.js'

import { useEffect } from 'react';
import { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

function Images( {data, onClick} ) {

  const handleClickImage = (index) => {
    onClick(index);
  };

  return (
    <>
      {data.map((slide, index) => ( 
        <div
          onClick={() => handleClickImage(index)}
          key={index}
          className='photo'
        >
          {slide.type === 'video' ? (
            <video controls>
              <source src={slide.sources[0].src} />
            </video>
          ) : (
            <img src={slide.src} />
          )}
        </div>
      ))}
    </>
  );
}

function Gallery( {slides} ) {

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const toggleOpen = (state) => setOpen(state);
  const updateIndex = ({ index: current }) => setIndex(current);

  return (
    <>
      <Images
        data={slides}
        onClick={(currentIndex) => {
          setIndex(currentIndex); 
          toggleOpen(true);
        }}
      />
      
      <Lightbox
        index={index}
        slides={slides}
        on={{
          view: updateIndex,
          click: () => toggleOpen(true),
        }}
        carousel={{
          spacing: 0,
          padding: 0,
          imageFit: "cover",
        }}
        inline={{
          style: {
            width: "100%",
            aspectRatio: "48 / 27",
            margin: "0 auto",
          },
        }}
        plugins={[Inline, Video]}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={open}
        close={() => toggleOpen(false)}
        on={{ view: updateIndex }}
        plugins={[Video]}
      />
      
    </>
  );
}

function Project( {title, year, entity, location, description, photos, tag} ) {

  return (
    <>
      <div className={'project photos ' + tag}>
        <Gallery 
          slides={photos}
        />
      </div>
      <div className={'project text ' + tag}>
        <div className='project-title'>{title}</div>
        <div className='project-entity'>{entity}</div>
        <div className='project-location'>{location}</div>
        <div className='project-year'>{year}</div>
        <div className='project-description'>
          {description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </>
  );
}

function Contact() {

  return (
    <>
      <div id="contact">
        <a href='mailto:homebase@ericmorgan.ca'>{svg.contactSVGs[0]}{svg.contactSVGs[1]}</a>
      </div>
    </>
  );
}

function Page( {page, title, closeButton, activePage, setActivePage} ) {

  return (
    <>
      <div className={"content-page " + page} id={page}>

        <div className='page-header'>
          <div className='scrollbar'></div>
          <span className="close-button" onClick={() => animate.pageToMenu(activePage, setActivePage)}>
            {closeButton}
        </span>
          <div className='page-title'>
            {title}
          </div>
        </div>

        

        {page === "experience" && 
          /*<div className='content'>

            <Card 
              logo={ { 'image' : 'assets/LL2_logo_black_no_bkgrd.png', 'alt' : 'Liquor Lodge logo' } } 
              title={'Ecommerce Developer/Manager'}
              time={'Oct. 2019 - Oct. 2022'}
              location={ { 'institution' : 'Liqour Lodge Inc.' , 'city' : 'Jasper, AB' } } 
              points={[
                'Designed and oversaw all aspects of the E-commerce arm of a retail liquor business, including web development, product data maintenance, and email marketing.',
                'Developed a Shopify website and designed internal workflow for the creation and maintenance of new products on the site, integrating Shopify and our inventory software GlobalTill.',
                'Designed a fulfilment procedure and trained staff on using the requisite internal tools.',
                'Increased annual online revenue from $20,000 in 2019 to over $1,000,000 in 2021.'
              ]}
            />

            <Card 
              logo={ { 'image' : 'assets/concordia.png', 'alt' : 'Concordia University logo' } }
              title={'Bachelor of Computer Science - Computation Arts'}
              time={'Sep. 2014 - Jun. 2019'}
              location={ {'institution' : 'Concordia University', 'city' : 'Montreal, QC'} }
              points={[
                'Graduated w/ Distinction (3.4+ GPA)',
                'Member of CACTUS, the Computation Arts student organisation'
              ]}
            />

          </div>*/
          <div className='content-grid'>

            <Project 
              title={[svg.ecommerceSVGs[0], svg.ecommerceSVGs[1]]}
              entity={'Liquor Lodge Inc.'}
              location={'Jasper, AB'}
              year={'2019 - Current'}
              description={[,
                <p>- Designed and oversee all aspects of <a href='https://liquorlodge.ca/'>liquorlodge.ca</a>, the E-commerce arm of a retail liquor business, including web development, product data maintenance, and email marketing.</p>,
                '- Developed a Shopify website and designed internal workflow for the creation and maintenance of new products on the site, integrating Shopify and our inventory software GlobalTill.',
                '- Designed a fulfilment procedure and trained staff on using the requisite internal tools.',
                '- Increased annual online revenue from $20,000 in 2019 to over $1,000,000 in 2021.'
              ]}
              photos={media.llSlides}
              tag={'left'}
            />

            <Project 
              title={[svg.bcsSVGs[0], svg.bcsSVGs[1], svg.bcsSVGs[2]]}
              entity={'Concordia University'}
              location={'Montreal, QC'}
              year={'2014 - 2019'}
              description={[
                '- Graduated w/ Distinction (3.4+ GPA)',
                '- Combined with Computation Arts studies, for artistic applications of creative coding.',
                '- Member of CACTUS, the Computation Arts student organisation.'
              ]}
              photos={media.concordiaSlides}
              tag={'right'}
            />

          </div>
        }

        {page === "projects" &&
          <div className='content-grid'>

            <Project 
              title={[svg.fleeceSVGs[0], svg.fleeceSVGs[1]]} 
              year={'2018'} 
              description={[
                "I developed a responsive lights show that Montreal-based band Fleece used on their 2018 summer tour. A combination of stage design, industrial design, and software design, the lights augmented the band's live musical performances through dazzling visuals that responded to their music, while being easy to setup, take down, and reconfigure.",
                "The band's microphones and instruments fed into the program running the lights, causing colour and intensity shifts relative to the intensity of the music. New patterns are randomly generated throughout performances by use of a MIDI footpad.",
                "The displays were composed of strips of LEDs. They allowed for an arrangement that is easier to transport and setup because it can all fit into a duffel bag. For live shows, moving away from a simple screen helps achieve a more immersive spectacle by intertwining the band and the lights, allowing the visuals to mix more seamlessly with the music rather than just accompany it. The modularity of both the physical structure and the software allows for new experiences to be created every show, for both audience and performer alike."
              ]} 
              photos={[...media.fleeceVideo, ...media.fleeceSlides]} 
              tag={'left'}
            />

            <Project 
              title={svg.ephemerisSVG} 
              year={'2018'} 
              description={[
                "Ephemeris was an interactive installation that enabled users to draw constellations in a projected star field, creating a living archive of those who have visited the installation.",
                "The visual metaphors of constellations and the night sky are representative of creating connections and archiving history. Stars communicate the history of the universe through their light, while also containing the stories and mythology humans have ascribed to them through constellations. The constellations connect not just celestial bodies, but also humans to one another through the stories and history they represent. Our relationship with the stars extends even to the physical level, our bodies made from the same chemical elements.",
                "Tracking visitors' and placing them among the stars transforms the star field into an archive of life that has crossed paths with the installation, representing the sharing of matter between our bodies and stars, as well as humanity's own path continually being written in the stars.",
                "The installation itself took the form of a projection onto a mirrored half-sphere that refracted the star field around the space. An IR camera tracked users' hands as the drawing mechanism."
              ]} 
              photos={media.ephemSlides} 
              tag={'right'}
            />

          </div>
        }

        {page === "about" && 
          <div className="content">
            <div id="headshot-wrapper">
              <img src="assets/arch.jpg" id='headshot'/>
            </div>
            <div id='bio-wrapper'>
              <div id='bio'>
                <p>Hiya! I'm a computer geek with experience in E-commerce development, web design, and interactive installation design. I studied both Computer Science and Computation Arts to explore the cross section of artistic expression backed by technical knowledge. I've been fortunate to have had opportunities to apply my detail-oriented problem solving abilities in a variety of environments, and am always eager for new ones!</p>
                <span className='line-break'></span>
                <ul>
                  <li>Occasional adventure geek. Hiked and snowboarded the South Western USA in a van.</li>
                  <li>Probably makes too many Magic: The Gathering decks.</li>
                  <li>Made sure my Lego houses had all matching brick colours as a child.</li>
                </ul>
              </div>
            </div>
          </div>
        }

      </div>
    </>
  );
}

function ClippingGroup( {id, topPathID, middlePathID, bottomPathID} ) {
  return (
    <>
      <svg id={id}>

        <clipPath id='clip-top'>
          <use href={ topPathID }/>
        </clipPath>

        <clipPath id='clip-middle'>
          <use href={ middlePathID }/>
        </clipPath>

        <clipPath id='clip-bottom'>
          <use href={ bottomPathID }/>
        </clipPath>

      </svg>
    </>
  );
}

function Navigation( {activePage, setActivePage, experienceSVGs, aboutSVGs, projectSVGs} ) {

  return(
    <>
      
      <ClippingGroup 
        id={"clip-paths"}
        topPathID={'#click-capture-top'}
        middlePathID={'#click-capture-middle'}
        bottomPathID={'#click-capture-bottom'}
      />

      <MenuCard 
        id={"menu-cover-top"}
        classes={"experience"}
        lines={5}
        entries={4}
        svgs={experienceSVGs}
      />

      <ClickCapture 
        id={"top"} 
        width={"300"} 
        height={"450"} 
        path={"M 0,65 l 300,-65 l 0,85 l -300,65 Z"} 
        targetPage={"experience"}
        setActivePage={setActivePage}
      />

      <MenuCard 
        id={"menu-cover-middle"}
        classes={"about"}
        lines={5}
        entries={5}
        svgs={aboutSVGs}
      />

      <ClickCapture 
        id={"middle"} 
        width={"300"} 
        height={"450"} 
        path={"M 0,165 l 240,60 l -240,60 Z"} 
        targetPage={"about"}
        setActivePage={setActivePage}
      />

      <MenuCard 
        id={"menu-cover-bottom"}
        classes={"projects"}
        lines={5}
        entries={5}
        svgs={projectSVGs}
      />

      <ClickCapture 
        id={"bottom"} 
        width={"300"} 
        height={"450"} 
        path={"M 0,300 l 300,65 l 0,85 l -300,-65 Z"} 
        targetPage={"projects"}
        setActivePage={setActivePage}
      />

    </>
  );

}

function Frame() {

  // holds a string corresponding to which page should be currently displayed
  const [activePage, setActivePage] = useState('home');

  return (
    <>
      <div id="app-frame">

        <Page
          page={"experience"}
          title={svg.experienceSVGs[4]}
          closeButton={svg.xSVGs[0]} 
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <Page
          page={"about"}
          title={svg.aboutSVGs[3]}
          closeButton={svg.xSVGs[1]}  
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <Page
          page={"projects"}
          title={svg.projectSVGs[3]} 
          closeButton={svg.xSVGs[2]} 
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <Navigation 
          activePage={activePage}
          setActivePage={setActivePage}
          experienceSVGs={svg.experienceSVGs}
          aboutSVGs={svg.aboutSVGs}
          projectSVGs={svg.projectSVGs}
        />
      </div>
    </>
  );
}

function Background() {
  return (
    <>
      <div id="app-background">
        {svg.signatureSVG}
        <Contact />
        <Frame />
      </div>
    </>
  )
}

export default function App() {

  useEffect(() => {
    animate.initialize();
  }, []);

  return <Background />
}

