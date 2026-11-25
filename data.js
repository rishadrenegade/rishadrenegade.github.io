/* ============================================================
   EDIT THIS FILE TO UPDATE YOUR WEBSITE
   Change the words inside the quotes, save, and upload.
   To add a project: copy one { ... } block, paste it after the
   last one (with a comma between blocks), and change the words.
   ============================================================ */

const SITE = {
  firstName: "Rishad",
  lastName: "Haque",
  callName: "Rishad", // used in the "Hi Rishad" resume request email
  tagline: ["Embedded", "Firmware", "Robotics", "Lubbock, TX"],
  subtitle: "Computer Engineering @ Texas Tech University",
  gradLabel: "Expected December 2028",
  intro:
    "I write the code that sits closest to the hardware: sensor drivers, serial buses and interrupt driven firmware on microcontrollers. Right now I'm most interested in in vehicle networks, sensor based pattern recognition and robotics.",
  email: "rishadmhaque@gmail.com",
  linkedin: "https://www.linkedin.com/in/rishadmhaque/",
  github: "https://github.com/rishadrenegade",
  repo: "rishadrenegade/rishadrenegade.github.io", // your GitHub repository (used to find new files automatically)
  branch: "main",
  photo: "images/rishad.jpg", // replace this file with your own square headshot (same name)
};

const ABOUT = {
  heading: "Close to the metal",
  paragraphs: [
    "I'm Md Maksudul Haque Rishad, a Computer Engineering student at Texas Tech University with a minor in Robotics. I like work where code meets hardware: bringing up a sensor, getting a bus to talk, and proving it on the bench.",
    "This semester I own every sensing subsystem on an autonomous recycling rover, and my team took first place at the IBTTA On-Ramp Innovation Challenge 2026 with RoadRebound, a flood response system for toll roads.",
    "Outside the lab I work at TTU IT Help Central supporting over 9,000 campus residents, and I lead K to 8 campers at College Connect's Red Raider Academy.",
  ],
  focus: [
    "Embedded firmware",
    "Sensor drivers",
    "SPI, I2C, UART",
    "In vehicle networks (CAN)",
    "Robotics",
    "Pattern recognition",
    "Digital design (FPGA)",
  ],
};

/* SPOTLIGHT: the big "winning moment" banner at the top of Projects.
   Set show: false to hide it. */
const SPOTLIGHT = {
  show: true,
  badge: "1st Place",
  title: "IBTTA On-Ramp Innovation Challenge 2026",
  text: "Our Texas Tech team won first place in the finals with RoadRebound, a flood warning and rerouting system for toll roads. I refined and fine tuned the concept, including GreenWave, a driver app idea that reroutes traffic around flooded roads, and we presented it live to industry leaders at the IBTTA 94th Annual Meeting.",
  team: "Tabassum Peuly · Maksudul Haque Rishad · Safwan Kamal",
  where: "14 November 2026 · Arlington, Texas",
  photo: "images/roadrebound-win.jpg",
};

const FACTS = [
  ["Degree", "B.S. Computer Engineering"],
  ["Minor", "Robotics"],
  ["Grad", "Expected Dec 2028"],
  ["Honors", "Dean's List, Fall 2025"],
  ["Awards", "1st Place, IBTTA<br>On-Ramp Challenge 2026"],
  ["Certified", "CSWA · SOLIDWORKS<br>Electrical Associate"],
  ["Seeking", "Summer 2027 internship<br>Fall 2027 co op"],
];

/* status options: "1st Place", "Building now", "In design", "Complete" */
const PROJECTS = [
  {
    num: "001",
    title: "Autonomous Recycling Rover",
    label: "ECE 3331 Robotics Project Lab · Team of 3",
    status: "Building now",
    description:
      "A rover that finds, sorts and drops colored M8 washers on its own. I own sensor bring up and drivers for all five sensing subsystems: TCS3200 color ID, HC SR04 ultrasonic obstacle avoidance, QRE1113 boundary detection, inductive metal confirmation and TSOP38238 IR beacon reception. I also built a desktop hardware simulator and test harness (19 of 19 tests passing) to check driver logic before parts arrived, and level shifted 5 V echo lines to 3.3 V to protect the Pico.",
    tags: ["Raspberry Pi Pico", "MicroPython", "Sensor drivers", "Test harness"],
    images: [],
    link: "",
  },
  {
    num: "002",
    title: "TCS3200 Color Classifier",
    label: "ECE 3331 Mini Project",
    status: "Complete",
    description:
      "A calibration routine and nearest neighbor classifier that identifies 4 colors from RGB frequency fingerprints, reaching 4 of 4 correct classifications at a 10 mm standoff. The verified driver became the rover's color sensing code.",
    tags: ["Raspberry Pi Pico 2", "MicroPython", "Classification"],
    images: [],
    link: "",
  },
  {
    num: "003",
    title: "RC522 RFID Reader",
    label: "Microcontrollers with Assembly",
    status: "Complete",
    description:
      "Interfaced an RC522 RFID reader with an MSP430 over SPI, written in Assembly, to detect tags with LED status feedback on each read. It is the same sensing idea behind electronic toll collection.",
    tags: ["MSP430", "Assembly", "SPI", "RFID"],
    images: [],
    link: "",
  },
];

const OTHER_PROJECTS = [
  {
    title: "TI Embedded Game System",
    description: "An interactive game on the TI BOOSTXL EDUMKII written in register level MSP430 Assembly, with interrupt driven input, timing and display output.",
    tags: ["MSP430", "Assembly", "Interrupts"],
    image: "",
    link: "",
  },
  {
    title: "FPGA Traffic Signal Controller",
    description: "A traffic signal controller in Verilog with finite state machine logic, timed phase sequencing and digital output control on an FPGA.",
    tags: ["Verilog", "FPGA", "State machines"],
    image: "",
    link: "",
  },
  {
    title: "MovieMatch",
    description: "A group movie picker built in 24 hours at HackWesTX 26. I built the mobile frontend: navigation, autoplaying trailer player, swipe deck, match reveal and onboarding.",
    tags: ["React Native", "Firebase", "Gemini API", "Hackathon"],
    image: "",
    link: "",
  },
  {
    title: "Grocery Shelf Retrieval Robot",
    description: "A 6 joint arm on a mobile base that picks soda cans off a four level shelf, from ENGR 2340 Introduction to Robotics. Five person team (RoboRaiders); I worked on the project proposal and the technical presentation.",
    tags: ["Team of 5", "Robot arm", "MATLAB simulation"],
    image: "",
    link: "",
  },
];

/* BENCH: photos of hardware, wiring, scope captures and CAD.
   You don't need to edit this list. Just add a folder inside "bench" on GitHub
   (see HOW-TO-ADD.md). The section stays hidden until the first folder shows up.
   type: "Hardware", "Firmware" or "CAD"
   featured: true = shows on the main page with a ★ */
const BENCH = [];

const EXPERIENCE = [
  {
    role: "Student Assistant II, IT Support",
    org: "TTU IT Help Central",
    dates: "2026 to Present",
    points: [
      "Promoted from Student Assistant I",
      "Support technology needs for over 9,000 campus residents, plus TTU students, faculty and staff",
      "Diagnose hardware, software, account and network issues, document tickets and explain fixes clearly to nontechnical users",
    ],
  },
  {
    role: "Student Assistant and Tour Guide",
    org: "College Connect, Red Raider Academy, TTU",
    dates: "2025 to Present",
    points: ["Lead groups of 10 K to 8 campers (ages 7 to 14) through academic and career exploration activities and campus tours"],
  },
];

/* SKILLS
   To add a skill: add it inside the quotes list of that group.
   To add a group: copy one { ... } block. icon options: chip, signal, cube, wrench, people, gear, code, chart */
const SKILLS = [
  {
    group: "Embedded and firmware",
    icon: "chip",
    note: "Register level to MicroPython",
    items: ["C", "MSP430 Assembly", "MicroPython", "GPIO", "Timers and interrupts", "Finite state machines", "Sensor drivers", "Hardware bring up"],
  },
  {
    group: "Communication",
    icon: "signal",
    note: "CAN is my current focus",
    items: ["SPI", "I2C", "UART", "In vehicle networks (learning CAN)"],
  },
  {
    group: "Hardware and sensors",
    icon: "wrench",
    note: "Rover sensing lead",
    items: ["MSP430", "Raspberry Pi Pico", "Arduino Uno", "TI BOOSTXL EDUMKII", "FPGA", "TCS3200 color", "HC SR04 ultrasonic", "QRE1113 reflectance", "Inductive proximity", "TSOP38238 IR", "RC522 RFID"],
  },
  {
    group: "Software and tools",
    icon: "code",
    note: "",
    items: ["Python", "Verilog", "TypeScript", "React Native", "Code Composer Studio", "Arduino IDE", "VS Code", "Git and GitHub"],
  },
  {
    group: "CAD",
    icon: "cube",
    note: "Certified Nov 2026",
    items: ["SOLIDWORKS", "SOLIDWORKS Electrical"],
  },
  {
    group: "Teamwork",
    icon: "people",
    note: "",
    items: ["Presenting to industry", "Technical support", "Mentoring", "Project management basics"],
  },
];

/* CERTIFICATES
   To add one: copy a block, change the words.
   file: put the certificate PDF or image in the "certificates" folder and write its path here
   link: or paste the online verification link (leave "" if you don't have one)
   badge: optional badge image, e.g. "certificates/badges/cswa.png"
   featured: true = shows on the main page with a ★ (pick your best 3 or 4)
   You can also just upload certificate files to GitHub, see HOW-TO-ADD.md */
const CERTIFICATIONS = [
  {
    name: "SOLIDWORKS Design Associate (CSWA)",
    issuer: "Dassault Systèmes",
    date: "Nov 2026",
    credentialId: "",
    file: "",
    link: "",
    badge: "certificates/badges/cswa.png",
    featured: true,
  },
  {
    name: "SOLIDWORKS Electrical Design Associate",
    issuer: "Tangix",
    date: "Nov 2026",
    credentialId: "",
    file: "",
    link: "",
    featured: true,
  },
  {
    name: "Foundations of Project Management",
    issuer: "Google",
    date: "July 2026",
    credentialId: "",
    file: "",
    link: "",
    badge: "certificates/badges/google.png",
    featured: true,
  },
  {
    name: "Student Success Mentor Training",
    issuer: "Mentor Collective",
    date: "Sept 2026",
    credentialId: "",
    file: "",
    link: "",
    badge: "certificates/badges/mentor-collective.png",
    featured: false,
  },
  {
    name: "Certificate of Completion, On-Ramp Innovation Challenge",
    issuer: "IBTTA",
    date: "Nov 2026",
    credentialId: "",
    file: "",
    link: "",
    featured: false,
  },
];
