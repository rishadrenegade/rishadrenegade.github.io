# How to add new things to your website

You never edit code. Just upload files to the right folder on GitHub
(Add file → Upload files → Commit changes). The site picks them up in about 1 to 2 minutes.

To make a new folder on GitHub: Add file → Upload files, then drag in a whole folder
from your computer. GitHub keeps the folder name.

---

## New hardware build → `bench/`

The Bench section stays hidden until you add your first build. Make a folder and put the pictures inside
(breadboard photos, wiring, scope or logic analyzer captures, CAD renders):

```
bench/
  2026-12-01 rover sensor ring/
    1.jpg          ← first picture is the cover
    2.jpg
    schematic.pdf  ← optional, adds an "Open file" button (pdf, zip, step, sldprt, sldasm)
    info.txt       ← optional
```

* Folder name becomes the title ("2026-12-01 rover sensor ring" → "Rover Sensor Ring").
* Start the folder name with the date (year-month-day) so the newest shows first.
* Name a picture `cover.jpg` if you want that one to be the cover.

**info.txt** (every line is optional):

```
title: Rover Proximity Ring
type: Hardware
tools: Raspberry Pi Pico, HC SR04, MicroPython
featured: yes
description: Three ultrasonic sensors with 5 V to 3.3 V dividers on the echo lines.
```

* `type`: Hardware, Firmware or CAD (makes the filter buttons)
* `featured: yes` puts it on the main page with a ★. Leave it out to put it under "Show more".

---

## New certificate → `certificates/`

Upload the PDF or image, named like this (two underscores between parts):

```
Name of certificate__Who gave it__Month Year.pdf
CSWA__Dassault Systemes__Nov 2026.pdf
```

**Star your best ones (main page shows only starred):**

* Put the file inside `certificates/featured/` instead of `certificates/`

```
certificates/
  featured/
    CSWA__Dassault Systemes__Nov 2026.pdf      ← ★ on the main page
  Excel Basics__LinkedIn Learning__Dec 2026.pdf  ← under "Show more"
```

* Keep about 3 or 4 starred. Everything else waits under the "Show more certificates" button.
* To unstar one, move it out of `featured/` (or delete it there and upload it to `certificates/`).
* If the certificate is already listed on the site, the file just attaches to it as a
  "View certificate" button instead of making a second card.

---

## New app or website → `apps/`

```
apps/
  moviematch/
    screenshot.png
    info.txt
```

**info.txt**:

```
title: MovieMatch
description: A group movie picker built in 24 hours at HackWesTX 26.
tags: React Native, Firebase
link: https://github.com/rishadrenegade/moviematch
```

---

## New big project → `projects/`

```
projects/
  can-bus-logger/
    cover.jpg
    2.jpg
    info.txt
```

**info.txt**:

```
title: CAN Bus Logger
label: Personal project
status: Building now
tags: CAN, MCP2515, Raspberry Pi Pico, C
description: Reads and logs CAN frames from a two node test network.
link: https://github.com/rishadrenegade/can-bus-logger
```

`status` can be anything: Complete, Building now, In design, 1st Place...
"Building now" gets a pulsing dot, and "Place" or "Award" gets a gold badge.

---

## Still in data.js (edit only when they change)

Your intro, about text, quick facts, skills, experience and the RoadRebound spotlight.

## Your photo

Upload a square headshot to `images/` named `rishad.jpg` (replace the placeholder). About 800 × 800 pixels is plenty.

## Resume

Your resume is not posted on the site. The "Request resume" buttons open your LinkedIn profile,
so people message you there and you choose who gets it.
