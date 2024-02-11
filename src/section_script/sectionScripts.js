/*--------------------------------------------------------------
HEADER FUNCTIONS
--------------------------------------------------------------*/

export function headerTitle() {
  const ctx = document.getElementById("header-canvas").getContext("2d");

  const titleText = "Welcome To Jasper's Portfolio";
  const header = document.createElement("h1");
  header.textContent = titleText;
  header.classList.add( "App-header-title", "App-header-title-text");

  const subtitleText = "Enjoy Your Stay!";
  const subtitle = document.createElement("h3");
  subtitle.textContent = subtitleText;
  subtitle.classList.add("App-header-subtitle", "App-header-title-text");

  if (!ctx.canvas.parentNode.querySelector("h1")) {
    ctx.canvas.parentNode.appendChild(header, ctx.canvas);
  }

  setTimeout(() => {
    if (!ctx.canvas.parentNode.querySelector("h3")) {
      ctx.canvas.parentNode.appendChild(subtitle, ctx.canvas);
    }
  }, 1000);

  ctx.canvas.style.display = "none";
}

export function moveCircles() {
  const circles = document.querySelectorAll(".circle");
  const header = document.querySelector(".App-header");
  const headerRect = header.getBoundingClientRect();

  circles.forEach((circle) => {
    const circleRect = circle.getBoundingClientRect();

    circle.style.backgroundColor = `rgba(${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.random()})`;

    circle.style.left = `${
      Math.random() * (headerRect.width - circleRect.width)
    }px`;
    circle.style.top = `${
      Math.random() * (headerRect.height - circleRect.height)
    }px`;

    let x = parseInt(circle.style.left) || 0;
    let y = parseInt(circle.style.top) || 0;

    const angle = Math.random() * 2 * Math.PI;

    let speed = Math.round((Math.random() * 10) / 4, 2);

    if (speed < 0.5) {
      speed = 0.5;
    } else if (speed > 2) {
      speed = 2;
    }

    let deltaX = speed * Math.cos(angle);
    let deltaY = speed * Math.sin(angle);

    function animateCircle() {
      x += deltaX;
      y += deltaY;

      if (x <= headerRect.left || x + circleRect.width >= headerRect.right) {
        deltaX *= -1;
      }

      if (y <= headerRect.top || y + circleRect.height >= headerRect.bottom) {
        deltaY *= -1;
      }

      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;

      requestAnimationFrame(animateCircle);
    }

    animateCircle();
  });
}
// --------------------------------------------------------------*/

/*--------------------------------------------------------------
TABLE OF CONTENTS FUNCTIONS
--------------------------------------------------------------*/

export function tableOfContents() {
  const ctx = document
    .getElementById("table-of-contents-canvas")
    .getContext("2d");

  const titleText = "Table of Contents";
  const title = document.createElement("h1");
  title.textContent = titleText;
  title.classList.add("animate-in", "title");

  const tableOfContents = document.createElement("div");
  tableOfContents.innerHTML = `
        <ul>
            <li><div class="level1"><a href="#AboutMe">About Me</a></div>
            <ul>
                <li><div class="level2"><a href="#Background">Background</a></div></li>
                <li><div class="level2"><a href="#Hobbies">Hobbies</a></div>
                <ul>
                <li><div class="level3"><a href="#Music">Music</a></div></li>
                <li><div class="level3"><a href="#Art">Art</a></div></li>
                <li><div class="level3"><a href="#Activities">Activities</a></div></li>
                <li><div class="level3"><a href="#Entrepreneurship">Entrepreneurship</a></div></li>
                </ul>
                </li>
                <li><div class="level2"><a href="#Skills">Skills</a></div></li>
                <li><div class="level2"><a href="#Resume">Resume</a></div></li>
            </ul>
            </li>
            <li><div class="level1"><a href="#Projects">Projects</a></div>
            </li>
        </ul>
    `;
  tableOfContents.classList.add("animate-in");

  if (!ctx.canvas.parentNode.querySelector("h1")) {
    ctx.canvas.parentNode.appendChild(title, ctx.canvas);
  }

  if (!ctx.canvas.parentNode.querySelector("div")) {
    ctx.canvas.parentNode.appendChild(tableOfContents, ctx.canvas);
  }

  ctx.canvas.style.display = "none";
}
// --------------------------------------------------------------*/

/*--------------------------------------------------------------
ABOUT ME FUNCTIONS
--------------------------------------------------------------*/

export function aboutMe() {
  const ctx = document.getElementById("about-me-canvas").getContext("2d");

  const titleText = "About Me";
  const title = document.createElement("h1");
  title.textContent = titleText;
  title.classList.add("animate-in", "title");

  const Background = document.createElement("div");
  Background.innerHTML = `
        <a id="Background"></a>
        <h1 class="subtitle">My Background</h1>
        <div class="App-about-me-img-container">
        <p>
            Hi! My name is Jasper, I'm a 21-year-old technology enthusiast born and raised on beautiful Vancouver Island. I am originally from 
            the small community of Coombs, but moved to the city of Victoria at when I was 6. My current residence is the city of Sparwood. 
        </p>
        <div class="App-about-me-img-caption">        
            <img src=${
              process.env.PUBLIC_URL + "/img/my-pics/injured-but-resilient.jpg"
            } alt="me" style="width: 250px;" id="me" />
            <p>Hike in Tofino, broken wrist didn't stop me.</p>
        </div>

        </div>

        <p>
            Ever since I can remember, I have been driven by a deep curiosity and a yearning to explore and discover new things. This curiosity has led me down many paths and has fueled my love for learning. I am always trying to think outside the box and find new and innovative ways of doing things.
            I am also a creative individual and like to express my personality, whether it's through programming, music, or art, I am always looking for new ways to express myself creatively.
        </p>
        <div class="line"></div>
        <div class="App-about-me-img-container" style="margin-top: 30px;">
          <div class="App-about-me-img-caption">
            
            <img src=${
              process.env.PUBLIC_URL + "/img/viu-logo.jpg"
            } alt="me" style="width: 150px;" id="viuLogo" />
          </div>
          <p>
              I am currently studying computer science at Vancouver Islands University, I have graduated with a Diploma in Computer Science in April 2023. I am continuing my studies and plan.
              to graduate with a BSc in computer science in 2025.
          </p>
        </div>
        <p>
            I am interested in all computer science topics but most notably networking technologies and automation. My ultimate career goal is to become a network automation
            and security engineer. 
        </p>
        <p>
            Alongside my university studies, I am also working towards attaining industry citification such as my CCNA, Comptia trifecta, and Azure citifications.
        </p>
    `;
  Background.classList.add("animate-in", "App-about-me-container");

  const Hobbies = document.createElement("div");
  const Audio = document.createElement("audio");
  Audio.src = process.env.PUBLIC_URL + "/ext_song.mp3";
  Audio.controls = true;
  Audio.canPlayType("audio/mpeg");

  Hobbies.innerHTML = `
        <a id="Hobbies"></a>
        <h1 class="subtitle">My Hobbies</h1>
        <a id="Music"></a>
        <h3>Music</h3>
        <div class="App-about-me-img-container">
            <p>Music is my biggest hobby and I spend most of my free time on music-related activities like composing melodies, experimenting with sounds, and creating remixes of my favorite songs. I began my musical journey at age 10 with the piano and quickly fell in love with its sound. Later, I discovered an old Yamaha synthesizer and became captivated by the endless possibilities of creating unique sounds. Since then, my passion for music has continued to grow, and I've spent countless hours exploring new sounds and creating my own songs. The limitless possibilities of music have been a constant source of joy and inspiration for me.</p>
            <div class="App-about-me-img-caption">
                <div class="App-about-me-audio-container" id="audioBackground">
                    ${Audio.outerHTML}
                </div>
                <p>One of the songs from my new EP</p>
            </div>
            <img src=${
              process.env.PUBLIC_URL + "/img/danse-baby.gif"
            } alt="me" class="danse-baby" />
        </div>    
        <div class="line"></div>
        <a id="Art"></a>
        <h3>Art</h3>
        <div class="App-about-me-img-container">
            <div class="App-about-me-img-caption">        
                <img src=${
                  process.env.PUBLIC_URL + "/img/my-pics/river-sunset.jpg"
                } alt="me" style="width: 150px;" id="riverSunset" />
                <p>Sunset at Englishmen River</p>
            </div>
            <div class="App-about-me-img-caption">        
                <img src=${
                  process.env.PUBLIC_URL + "/img/my-pics/horne-lake.jpg"
                } alt="me" style="width: 150px;" id="horneLake" />
                <p>Lake day at secrete Horne Lake beach</p>
            </div>
            <div class="App-about-me-img-caption">        
                <img src=${
                  process.env.PUBLIC_URL + "/img/my-pics/fish.jpg"
                } alt="me" style="width: 150px;" id="fish" />
                <p>Hiding fish in the tide pools of Ucluelet</p>
            </div>
            <p>I participate in a few art-related hobbies. Including painting, mostly in the style of cubism with acrylic and watercolors, my biggest inspirations are Picasso and South American art.  Nature Photography, I like capturing scenic nature views typically during sunset. I also enjoy capturing wildlife photos whenever I get the opportunity. And art galleries, I love going to art galleries/shows as well as art museums to get inspiration from the creative works of others.</p>
        </div>
        <div class="line"></div>
        <a id="Activities"></a>
        <h3>Activities</h3>
        <div class="App-about-me-img-container">
            <p>I'm an enthusiastic lover of the outdoors, as long as the weather cooperates. Hiking and backpacking scenic trails all over Vancouver Island is one of my favorite activities, and I'm always looking for new places to explore. Additionally, I enjoy free diving, having been fortunate enough to experience the seemingly otherworldly scenes of both warm and cold water reefs.</p>
            <div class="App-about-me-img-caption">        
                <img src=${
                  process.env.PUBLIC_URL + "/img/my-pics/nanaimo.jpg"
                } alt="me" style="width: 300px;" id="nanaimo" />
                <p>View of Nanaimo from Roberts Roost</p>
            </div>
        </div>  
        <p>Furthermore, I play a few sports recreationally, including soccer, basketball, golf, and most racket sports. </p>
        <div class="line"></div>
        <a id="Entrepreneurship"></a>
        <h3>Entrepreneurship</h3>
          <h5>Entrepreneurial Beginnings</h5>
          <p>From a young age, I've admired those who achieve financial independence through entrepreneurship. My sister and I, at just 6 years old, launched our first venture, selling lemonade and painted rocks. This early success fueled my passion for entrepreneurship.</p>

          <h5>High School Venture</h5>
          <p>In high school, I spotted an opportunity in my community's elderly population: a need for accessible tech support. With a friend, we launched an IT support business, attracting over 30 clients within a month. We provided a range of services, from TV setups to teaching computer basics. Operating for 2.5 years, we closed upon graduating.</p>

          <h5>Website Design Venture</h5>
          <p>After my first two terms of studying computer science, lacking an internship, I ventured into website design. Recognizing a gap in the market for street vendors lacking online presence, I offered low-cost static websites. Despite challenges like lacking a web server, it proved a valuable learning experience with reasonable profits.</p>
      </div>  
    `;
  Hobbies.classList.add("animate-in", "App-about-me-container");

  const Skills = document.createElement("div");
  Skills.innerHTML = `
        <a id="Skills"></a>
        <h1 class="subtitle">My Skills</h1>
        <p style="text-align=center;"><strong>From my time studying computer science topics I have developed the following skills:</strong></p>
        <div style="text-align: left;">
        <p>General Programming: C++, C#, Python, VBA</p>
        <p>Scripting: Python, Bash, Batch, Make</p>
        <p>Web Development: HTML5, CSS, SASS, PHP, JavaScript (Ajax, jQuery, React, APIs)</p>
        <p>Web Frameworks: WordPress, Django, Flask</p>
        <p>Database Systems: SQL with MySQL, Oracle, and SQLite</p>
        <p>Solid understanding of UI and UX design principles</p>
        <p>Solid understanding of the OSI model, TCP/IP, UDP/IP, DNS, DHCP, subnetting, VLAN, LAN, and WAN</p>
        <p>Familiar with Cisco Packet Tracer and using IOS command line to configure Cisco routers and switches.</p>
        <p>Linux system client/server creation and maintenance (Arch, Debian, Ubuntu, Core)</p>
        <p>Windows administration tools and CMD/Batch scripting, some Powershell scripting</P>
        <p>Automated testing (writing testing scripts, unit testing, integration testing)</p>
        <p>Proficient with Git and GitHub</p>
        <p>Proficient with Microsoft Office suite</p>
        </div>
    `;
  Skills.classList.add("animate-in", "App-about-me-container");

  const Resume = document.createElement("div");
  Resume.innerHTML = `
        <a id="Resume"></a>
        <h1 class="subtitle">My Resume</h1>
        <p>View my <a href=${
          process.env.PUBLIC_URL + "/img/Jasper_Charlinski_Resume.pdf"
        } target="_blank" id="resume">Resume</a> for more information about my experience and education.</p>
    `;
  Resume.classList.add("animate-in", "App-about-me-container");

  if (!ctx.canvas.parentNode.querySelector("h1")) {
    ctx.canvas.parentNode.appendChild(title, ctx.canvas);
  }

  if (!ctx.canvas.parentNode.querySelector("div")) {
    ctx.canvas.parentNode.appendChild(Background, ctx.canvas);
    ctx.canvas.parentNode.appendChild(Hobbies, ctx.canvas);
    ctx.canvas.parentNode.appendChild(Skills, ctx.canvas);
    ctx.canvas.parentNode.appendChild(Resume, ctx.canvas);
  }

  const tocRect = document
    .querySelector(".App-table-of-contents")
    .getBoundingClientRect();

  if (tocRect.top < -(tocRect.height / 2)) {
    ctx.canvas.parentNode.style.scale = "1";
    ctx.canvas.parentNode.style.opacity = "1";
  }

  ctx.canvas.style.display = "none";
}
// --------------------------------------------------------------*/

/*--------------------------------------------------------------
PROJECTS FUNCTIONS
--------------------------------------------------------------*/

const PROJECTS_OBJECT = [
  {
    name: "GeoDetective",
    id: "GeoDetective",
    language: ["JavaScript", "HTML/CSS"],
    date: "2023-04",
    rating: "5",
    desc: "GeoDetective is a guessing game that asks a series of questions and pinpoints the city you are thinking of. On average, GeoDetective takes 30 guesses to get your city.",
    img: "/img/geodetective.png",
    fullDesc: `
    GeoDetective is a guessing game that asks a series of questions and pinpoints the city you are thinking of. On average, GeoDetective takes 30 guesses to get your city.
    To play GeoDetective, simply think of a city and then click on the "Play" button. GeoDetective will then ask you a series of yes or no questions to narrow down the possible cities. GeoDetective first guesses your country, then state/province/region, then finally your city. Each guess updates the map to show the coordinates of the current guess to help the player answer the questions.
    You can play GeoDetective <a href="https://geodetectivepro.netlify.app/" target="_blank">HERE</a>
        `,
    link: "https://github.com/charlijj/GeoDetective",
    show: true,
  },
  {
    name: "Audio Visualizers",
    id: "AudioVisualizers",
    language: ["JavaScript", "HTML/CSS"],
    date: "2021-04",
    rating: "5",
    desc: "A web application that generates various audio visualizers based on the user's microphone input.",
    img: "/img/visualizers.jpg",
    fullDesc: `
            This web application is a platform that generates different audio visualizers based on the user's microphone input. It is built using various technologies such as JavaScript - Canvas API, JavaScript - WebAudio API, HTML, and CSS.
            To use the application, users must have access to a microphone. Once on the <a href="https://charlijj.github.io/JS-Audio-Visualizers/" target="_blank">Website</a>, users can select a visualizer from the drop-down menu. After selecting a visualizer, the user can click on the "start listening" button located on the top right of the page. The browser will prompt the user to allow access to the microphone.
            Once access is granted, users can generate noise to activate the visualizer. The application will use the microphone input to create unique visualizations that respond in real-time to the user's input.    
        `,
    link: "https://github.com/charlijj/JS-Audio-Visualizers",
    show: true,
  },
  {
    name: "Hackers Labyrinth",
    id: "HackersLabyrinth",
    language: ["Python", "C++", "Bash"],
    date: "2021-09",
    rating: "5",
    desc: "A terminal window puzzle game where the player progresses through a series of rooms each with a unique puzzle.",
    img: "/img/hackersLabyrinth.jpg",
    fullDesc: `Hackers Labyrinth is a labyrinth type puzzle game where the player progresses through a series of computer science related challenges. The player will have 3 attempts or a time limit to complete each challenge, if successful the player will be rewarded with a clue that will help them escape. At the end of each challenge the player will have a choice on what room they would like to go to next (left or right door) which will affect the forthcoming challenges. On the final level of the game, the player will use the clues they have collected to complete the final challenge and escape the Hackers Labyrinth.
            The game is designed to run on Linux machines and is made with in C++, Bash, and Python and also utilizes makefiles.
         `,
    link: "https://github.com/charlijj/Hackers-Labyrinth",
    show: true,
  },
  {
    name: "JJWEB",
    id: "JJWEB",
    language: ["HTML/CSS", "JavaScript"],
    date: "2021-06",
    rating: "4",
    desc: "A web design business I ran in the summer of 2021 in Parksville.",
    img: "/img/jjweb.jpg",
    fullDesc: `In the summer of 2021, I started a small web design business called <a href="https://jjweb.ca" target="_blank">jjweb.ca</a> in Parksville. I focused on creating static websites for family and friends who were small street vendors and business owners. My goal was to help them establish an online presence and showcase their businesses to a wider audience. Although my services were limited to static websites, I took pride in providing my customers with personalized websites that met their needs and preferences. Overall, it was a rewarding experience to see the positive impact my work had on their businesses.`,
    link: "https://github.com/jjwebdesign/JJ-Web-Design",
    show: true,
  },
  {
    name: "VIU Parking Lot Occupancy Tracker",
    id: "VIUParkingLotOccupancyTracker",
    language: ["Python", "PHP", "SQL", "HTML/CSS"],
    date: "2023-03",
    rating: "5",
    desc: "An information system that analyzes VIU parking lot footage which lets users know how likely they are to find parking spots in each lot.",
    img: "/img/PLtracker.jpg",
    fullDesc: `This is an information system that analyzes VIU parking lot footage which lets users know how likely they are to find parking spots in each lot. Features of the product are calculating current and future parking lot availability from images that are collected on 5-minute intervals. These images will also be shown to users to allow them to give fair judgment on how our system handled the calculation which should be accurate within 10%. This is being developed for all members of VIU such as the students and staff, and as such they will be given the opportunity to select their preferred parking lot location(s) to fit their needs.`,
    link: "https://github.com/charlijj/VIU-Parking-Lot-Occupancy-Tracker",
    show: true,
  },
  {
    name: "SiteCraft",
    id: "SiteCraft",
    language: ["JavaScript", "SQL", "PHP", "HTML/CSS"],
    date: "2023-02",
    rating: "4",
    desc: "A website building website that allows users to generate a custom website.",
    img: "/img/sitecraft.jpg",
    fullDesc: `SiteCraft is a website building website that solves the problem of high costs and lack of technical expertise required to create a website. Users can create a website easily by filling out a form with their desired content, and SiteCraft generates the website using pre-designed templates that are optimized for mobile and desktop devices. SiteCraft sets itself apart by providing customers with the source code for their website, rather than keeping it hidden and forcing them to use their hosting services. It is a user-friendly platform that is perfect for small business owners, entrepreneurs, and individuals who want to create a professional-looking website quickly and easily.`,
    link: "https://github.com/charlijj/sitecraft.ca",
    show: true,
  },
  {
    name: "Series of Python Puzzles",
    id: "SeriesofPythonPuzzles",
    language: ["Python"],
    date: "2022-10",
    rating: "2",
    desc: "A series of coding challenges using different Python libraries.",
    img: "/img/python.png",
    fullDesc: `This is a series of Python coding puzzles designed by Dr. Luis Meneses for the CSCI 331 Object Oriented Programming course. This repository contains a series of coding challenges using different Python libraries. Each puzzle is designed to utilize a different python feature.`,
    link: "https://github.com/charlijj/Series-of-Python-Puzzles",
    show: true,
  },
  {
    name: "Fibonacci Sequence Calculator",
    id: "FibonacciSequenceCalculator",
    language: ["Racket"],
    date: "2020-10",
    rating: "3",
    desc: "A Racket program that calculates the Fibonacci Sequence of a given n.",
    img: "/img/racket.png",
    fullDesc:
      "This is a small project to demonstrate the advantages amd disadvantages of the functional programming language Racket by calculating the Fibonacci Sequence of a given n.",
    link: "https://github.com/charlijj/portfolio/blob/main/ext/fibonacciSeq.rkt",
    show: true,
  },
  {
    name: "XTract",
    id: "XTract",
    language: ["Python", "SQL"],
    date: "2023-02",
    rating: "4",
    desc: "A resumes parser designed to help HR sort through resumes and organize information.",
    img: "/img/xTract.png",
    fullDesc: `
            XTract is an GUI application that uses text-parsing libraries and regular expressions to extract
            relevant information from resumes and other documents. It is built entirely in Python and designed to
            streamline the resume screening process. The application will store all useful information like name,
            contact information, experience, education, and skills in a structured format, making it easy for recruiters
            and HR personnel to review and analyze.   
        `,
    link: "https://github.com/RileyMacD/XTract",
    show: true,
  },
  {
    name: "AVL Tree",
    id: "AVLTree",
    language: ["C++"],
    date: "2022-10",
    rating: "3",
    desc: "AVL Data structure implemented in C++.",
    img: "/img/avl-tree.jpg",
    fullDesc:
      "This is a C++ implementation of an AVL tree, a self-balancing binary search tree. The implementation includes basic operations such as insertion, deletion, and searching, functions to maintain the balance of the tree, as well as options to manually rotate nodes.",
    link: "https://github.com/charlijj/AVL-Tree",
    show: true,
  },
  {
    name: "Oscillator Keyboard",
    id: "OscillatorKeyboard",
    language: ["HTML/CSS", "JavaScript"],
    date: "2021-01",
    rating: "4",
    desc: "An oscillator keyboard that the user can play by typing keys on their keyboard.",
    img: "/img/jsOscillator.jpg",
    fullDesc: `
            This web application is an interactive oscillator keyboard that allows users to play notes using their computer keyboard. It features 2 full octaves of notes arranged in an easy-to-understand manner, the choice of four waveforms, and is built with JavaScript, HTML, and CSS, as well as the Canvas and WebAudio APIs. The application also includes a dynamic graphic equalizer background that responds in real-time to the user's input. You can play it at <a href="https://charlijj.github.io/JS-Oscillator/" target="_blank">JSOscillator.play</a>.        
        `,
    link: "https://github.com/charlijj/JS-Oscillator",
    show: true,
  },
  {
    name: "Highway Racer Game",
    id: "HighwayRacerGame",
    language: ["HTML/CSS", "JavaScript"],
    date: "2021-05",
    rating: "3",
    desc: "A simple 2D game where the player weaves through traffic on a busy highway and dodges the other cars on the road. The player can move using the arrow keys or WASD.",
    img: "/img/highwayRacer.jpg",
    fullDesc: `
            Highway Racer is a 2D game where the player must dodge traffic on a busy highway using the arrow keys or WASD. The game is built with JavaScript, HTML, and CSS, and features the Canvas API for graphics. The game includes a high score system, soundtrack, and increasing difficulty levels to keep players engaged. The soundtrack adds to the intensity of the game, while the high score system and increasing difficulty provide replayability and competitiveness. You can play Highway Racer at <a href="https://charlijj.github.io/Highway-Racer-Game/" target="_blank">HighwayRacer.go</a>.        
        `,
    link: "https://github.com/charlijj/Highway-Racer-Game",
    show: true,
  },
  {
    name: "Mock Pizza Site",
    id: "MockPizzaSite",
    language: ["HTML/CSS", "JavaScript"],
    date: "2020-9",
    rating: "1",
    desc: "A static website for a fictional pizza restaurant based in Greenland. It provides an online ordering service as well as information about the restaurant and menu.",
    img: "/img/trechecoPizza.jpg",
    fullDesc:
      "This project is a static website for a fictional pizza restaurant based in Greenland. It provides an online ordering service as well as information about the restaurant and menu. This was my final project for CSCI 115 Intro to Web Development as well as the first full website I ever made.",
    link: "https://github.com/charlijj/Mock-Pizza-Site",
    show: true,
  },
];

const NUMITEMS = PROJECTS_OBJECT.length;

export function checkSort(sort) {
  for (let i = 0; i < NUMITEMS; i++) {
    let allChecked = true;

    for (let j = 0; j < PROJECTS_OBJECT[i].language.length; j++) {
      if (document.getElementById(PROJECTS_OBJECT[i].language[j]).checked) {
        allChecked = false;
        break;
      }
    }

    let project = document.getElementById(PROJECTS_OBJECT[i].id + "Link");
    project.classList.remove("animate-in", "animate-out");

    if (PROJECTS_OBJECT[i].language.includes(sort) && allChecked) {
      project.classList.add("animate-out");
      PROJECTS_OBJECT[i].show = false;
      setTimeout(() => {
        project.style.display = "none";
      }, 400);
    } else if (!allChecked) {
      project.classList.add("animate-in");
      PROJECTS_OBJECT[i].show = true;
      project.style.display = "block";
    }
  }
}

export function sortBy() {
  const sortByOption = document.getElementById("sortby").value;
  const projects = document.getElementById("App-projects-select-container");

  function reorder() {
    for (let i = 0; i < NUMITEMS; i++) {
      if (PROJECTS_OBJECT[i].show) {
        try {
          document
            .getElementById(PROJECTS_OBJECT[i].id + "Link")
            .removeChild(document.getElementById(PROJECTS_OBJECT[i].id));
          projects.removeChild(
            document.getElementById(PROJECTS_OBJECT[i].id + "Link")
          );
        } catch (error) {
          alert("Please wait until projects have loaded before reordering.");
          console.log(error);
          return;
        }

        const projectLink = document.createElement("a");
        projectLink.setAttribute("href", "#" + PROJECTS_OBJECT[i].id + "Modal");
        projectLink.setAttribute("data-toggle", "modal");
        projectLink.id = PROJECTS_OBJECT[i].id + "Link";

        const projectsItem = document.createElement("div");
        projectsItem.innerHTML = `
                    <h3>${PROJECTS_OBJECT[i].name}</h3>
                    <p>${PROJECTS_OBJECT[i].desc}</p>
                `;
        projectsItem.id = PROJECTS_OBJECT[i].id;
        projectsItem.style.backgroundImage =
          "url(" + process.env.PUBLIC_URL + PROJECTS_OBJECT[i].img;
        projectsItem.classList.add(
          "animate-in",
          "App-projects-select-container-item"
        );
        projectLink.classList.add("App-projects-select-container-link");
        projectLink.appendChild(projectsItem);

        setTimeout(() => {
          projects.appendChild(projectLink);
        }, i * 50);
      }
    }
  }

  if (sortByOption == "old") {
    PROJECTS_OBJECT.sort((a, b) => new Date(a.date) - new Date(b.date));
    reorder();
  }
  if (sortByOption == "new") {
    PROJECTS_OBJECT.sort((a, b) => new Date(b.date) - new Date(a.date));
    reorder();
  }
  if (sortByOption == "best") {
    PROJECTS_OBJECT.sort((a, b) => b.rating - a.rating);
    reorder();
  }
}

export function projects() {
  const ctx = document.getElementById("projects-canvas").getContext("2d");

  const titleText = "Projects";
  const title = document.createElement("h1");
  title.textContent = titleText;
  title.classList.add("animate-in", "title");

  const projects = document.getElementById("App-projects-select-container");
  projects.classList.add("animate-in");

  const projectsNav = document.getElementById("projects-nav");
  projectsNav.classList.add("animate-in");

  function createItems() {
    const navBar = document.createElement("div");
    navBar.classList.add("App-projects-select-container-fake-nav");
    projects.appendChild(navBar);

    for (let i = 0; i < NUMITEMS; i++) {
      const projectLink = document.createElement("a");
      projectLink.setAttribute("href", "#" + PROJECTS_OBJECT[i].id + "Modal");
      projectLink.setAttribute("data-toggle", "modal");
      projectLink.id = PROJECTS_OBJECT[i].id + "Link";

      const projectsItem = document.createElement("div");
      projectsItem.innerHTML = `
                <h3>${PROJECTS_OBJECT[i].name}</h3>
                <p>${PROJECTS_OBJECT[i].desc}</p>
            `;
      projectsItem.id = PROJECTS_OBJECT[i].id;
      projectsItem.style.backgroundImage =
        "url(" + process.env.PUBLIC_URL + PROJECTS_OBJECT[i].img;
      projectsItem.classList.add(
        "animate-in",
        "App-projects-select-container-item"
      );
      projectLink.classList.add("App-projects-select-container-link");
      projectLink.appendChild(projectsItem);

      setTimeout(() => {
        projects.appendChild(projectLink);
      }, i * 200);
    }
  }

  if (!ctx.canvas.parentNode.querySelector("h1")) {
    ctx.canvas.parentNode.appendChild(title, ctx.canvas);
    ctx.canvas.parentNode.appendChild(projects, ctx.canvas);
    createItems();
  }
  ctx.canvas.style.display = "none";
}

export function addModels() {
  const modalContainer = document.getElementById("modalContainer");

  for (let i = 0; i < NUMITEMS; i++) {
    const projectModal = document.createElement("div");
    projectModal.innerHTML = `

            <div class="App-projects-modal-display">
            <a class="App-projects-modal-close" href="#Projects">&times;</a>
                <div class="App-projects-modal-content">
                    <h3>${PROJECTS_OBJECT[i].name}</h3>
                    <p>${PROJECTS_OBJECT[i].fullDesc}</p>
                    <img src=${
                      process.env.PUBLIC_URL + PROJECTS_OBJECT[i].img
                    } style="width: 33%;" alt=${PROJECTS_OBJECT[i].name} />
                    <p>Click <a href=${
                      PROJECTS_OBJECT[i].link
                    } target="_blank">here</a> to view source code</p>
                </div>        
            </div>        
        `;
    projectModal.id = PROJECTS_OBJECT[i].id + "Modal";
    projectModal.classList.add("App-projects-modal");
    modalContainer.appendChild(projectModal);
  }
}

/*
function audioVisualizer()
{
    const canvas = document.getElementById(`header-canvas`);
    const ctx = canvas.getContext(`2d`);
    
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    const audio = new Audio(`../ext_song.mp3`);
    const audioSource = audioCtx.createMediaElementSource(audio);
    audioSource.connect(analyser);

    analyser.fftSize = 1024;

    const bufferLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLen);

    function animateFullRainbowBar() {

        if (audio.paused)
        {
            audio.play();
        }

        const barWidth = canvas.width / bufferLen;
        let barHeight;
        let x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        for (let i = 0; i < bufferLen; i++)
        {
            barHeight = dataArray[i] * 2;

            const hue = i * 10;
            
            ctx.fillStyle = `hsl(` + hue + `,100%, 50%)`;

            // let red = 100;
            // let blue = barHeight + 30;
            // let green = barHeight + 50;

            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

            ctx.save();
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);   
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            ctx.restore();

            x += barWidth + 5;

            if (x > canvas.width/2)
            {
                x = 0;
                break;
            }
        }
        
        requestAnimationFrame(animateFullRainbowBar);
    }

    audio.play();
    animateFullRainbowBar();
}
*/
