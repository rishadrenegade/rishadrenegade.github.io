{
  const $ = (id) => document.getElementById(id);
  let LOADED = false;

  /* ---------- HERO ---------- */
  $("tagline").innerHTML = SITE.tagline.join(" &nbsp;·&nbsp; ");
  $("firstName").textContent = SITE.firstName;
  $("lastName").textContent = SITE.lastName;
  $("subtitle").textContent = SITE.subtitle;
  $("grad").textContent = SITE.gradLabel;
  $("intro").textContent = SITE.intro;
  $("photo").src = SITE.photo;
  const modal = $("resumeModal");
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Resume request")}&body=${encodeURIComponent(`Hi ${SITE.callName},\n\nI came across your portfolio and would love a copy of your resume.\n\nThanks!`)}`;
  $("resumeEmail").textContent = SITE.email;
  $("resumeLinkedin").href = SITE.linkedin;
  $("resumeMail").href = mailto;
  const openModal = (e) => { e.preventDefault(); modal.hidden = false; document.body.style.overflow = "hidden"; $("resumeClose").focus(); };
  const closeModal = () => { modal.hidden = true; document.body.style.overflow = ""; };
  document.querySelectorAll(".js-resume").forEach((a) => a.addEventListener("click", openModal));
  $("resumeClose").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  $("resumeCopy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(SITE.email); $("resumeCopy").textContent = "Copied ✓"; }
    catch { $("resumeCopy").textContent = SITE.email; }
    setTimeout(() => ($("resumeCopy").textContent = "Copy email address"), 2000);
  });

  /* ---------- ABOUT ---------- */
  $("aboutHeading").textContent = ABOUT.heading;
  $("aboutText").innerHTML = ABOUT.paragraphs.map((p) => `<p>${p}</p>`).join("");
  $("focus").innerHTML = ABOUT.focus.map((f) => `<li>${f}</li>`).join("");
  $("facts").innerHTML = FACTS.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

  /* ---------- PROJECTS ---------- */
  const glyphs = [
    // rover
    `<rect x="120" y="110" width="160" height="70" rx="10"/><circle cx="150" cy="195" r="22"/><circle cx="250" cy="195" r="22"/>
     <circle cx="150" cy="195" r="6"/><circle cx="250" cy="195" r="6"/><path d="M200 110V78M188 78h24"/>
     <path d="M286 130c18 0 28 10 28 25M286 118c28 0 42 16 42 37" stroke-dasharray="3 6"/><rect x="150" y="128" width="40" height="26" rx="4"/>`,
    // color sensor
    `<rect x="140" y="80" width="120" height="120" rx="8"/><rect x="175" y="115" width="50" height="50" rx="4"/>
     <circle cx="160" cy="100" r="7"/><circle cx="240" cy="100" r="7"/><circle cx="160" cy="180" r="7"/><circle cx="240" cy="180" r="7"/>
     <path d="M150 230h30M185 230h30M220 230h30" stroke-width="8"/><path d="M200 200v20" stroke-dasharray="3 5"/>`,
    // rfid
    `<rect x="110" y="90" width="110" height="130" rx="8"/><rect x="128" y="108" width="74" height="74" rx="6"/><rect x="142" y="122" width="46" height="46" rx="4"/>
     <path d="M250 125c14 10 14 30 0 40M266 112c24 18 24 48 0 66M282 99c34 26 34 66 0 92"/><rect x="300" y="128" width="44" height="34" rx="5"/>`,
  ];
  const placeholder = (i, num) => `
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><pattern id="g${i}" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M20 0H0V20" fill="none" stroke="#353B44" stroke-width="1"/></pattern></defs>
      <rect width="400" height="300" fill="url(#g${i})"/>
      <g fill="none" stroke="#22D3EE" stroke-width="2" style="filter:drop-shadow(0 0 3px rgba(59,232,255,.6))" stroke-linecap="round" stroke-linejoin="round">${glyphs[i % glyphs.length]}</g>
      <text x="380" y="282" text-anchor="end" font-family="JetBrains Mono, monospace" font-size="12" fill="#7D848E">FIG. ${num}</text>
    </svg>`;

  if (SPOTLIGHT.show) {
    $("spotlight").innerHTML = `
      <button class="spot-photo" id="spotPhoto" aria-label="View winning photo"><img src="${SPOTLIGHT.photo}" alt="${SPOTLIGHT.title} award photo" loading="lazy"></button>
      <div class="spot-text">
        <span class="spot-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 3h8v4a4 4 0 0 1-8 0zM8 5H4a3 3 0 0 0 4 4M16 5h4a3 3 0 0 1-4 4M12 11v5M8 21h8M10 16h4v5h-4z"/></svg>${SPOTLIGHT.badge}</span>
        <h3>${SPOTLIGHT.title}</h3>
        <p>${SPOTLIGHT.text}</p>
        <p class="spot-meta">${SPOTLIGHT.team}<br>${SPOTLIGHT.where}</p>
      </div>`;
    $("spotPhoto").addEventListener("click", () => openLb([SPOTLIGHT.photo], SPOTLIGHT.title, 0));
  } else $("spotlight").remove();

  const renderProjects = () => {
  $("projectList").innerHTML = PROJECTS.map((p, i) => {
    const live = /building/i.test(p.status) ? "live" : "";
    const win = /place|winner|award/i.test(p.status) ? "win" : "";
    const imgs = p.images || [];
    const media = imgs.length ? `<img src="${imgs[0]}" alt="${p.title}" loading="lazy">` : placeholder(i, p.num);
    const views = imgs.length > 1 ? `<span class="proj-views">${imgs.length} images</span>` : "";
    const open = p.link ? `<a href="${p.link}" target="_blank" rel="noopener" style="text-decoration:none">` : "";
    const close = p.link ? "</a>" : "";
    return `${open}<article class="proj reveal${LOADED ? " in" : ""}">
      <div class="proj-img ${imgs.length ? "zoom" : ""}" data-p="${i}">${media}<span class="status ${live} ${win}">${p.status}</span>${views}</div>
      <div class="proj-body">
        <span class="proj-num">${p.num}</span>
        <h3>${p.title}</h3>
        <p class="proj-label">${p.label}</p>
        <p class="desc">${p.description}</p>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
      </div></article>${close}`;
  }).join("");

  $("projectList").querySelectorAll(".proj-img.zoom").forEach((d) => d.addEventListener("click", (e) => {
    e.preventDefault(); const p = PROJECTS[+d.dataset.p]; openLb(p.images, p.title, 0);
  }));

  };
  renderProjects();

  const renderOthers = () => {
  $("otherList").innerHTML = OTHER_PROJECTS.map((o, i) => {
    const thumb = o.image ? `<button class="other-thumb" data-o="${i}" aria-label="View ${o.title} screenshot"><img src="${o.image}" alt="${o.title} screenshot" loading="lazy"></button>` : "";
    const tags = o.tags && o.tags.length ? `<div class="tags">${o.tags.map((t) => `<span>${t}</span>`).join("")}</div>` : "";
    const action = o.link
      ? `<a class="other-open" href="${o.link}" target="_blank" rel="noopener">Open app <span class="arrow">↗</span></a>`
      : `<span class="other-open off">Link coming soon</span>`;
    return `<div class="other reveal${LOADED ? " in" : ""} ${o.image ? "has-thumb" : ""}">${thumb}
      <div class="other-body"><h4>${o.title}</h4><p>${o.description}</p>${tags}${action}</div></div>`;
  }).join("");
  $("otherList").querySelectorAll(".other-thumb").forEach((b) => b.addEventListener("click", () => {
    const o = OTHER_PROJECTS[+b.dataset.o]; openLb([o.image], o.title, 0);
  }));
  };
  renderOthers();

  /* ---------- CAD WORK ---------- */
  const cadSketch = (i) => {
    const shapes = [
      `<path d="M60 200h50l20-90 20 150 20-120 20 60h50l20-40 20 40h60"/><path d="M60 230h280" stroke-dasharray="4 6"/><text x="340" y="250" text-anchor="end">CH1 3.3 V</text>`,
      `<rect x="150" y="90" width="100" height="100" rx="6"/><path d="M160 90V60M180 90V60M200 90V60M220 90V60M240 90V60M160 190v30M180 190v30M200 190v30M220 190v30M240 190v30"/><path d="M240 60h70v160h-70" /><circle cx="310" cy="140" r="5"/><text x="200" y="255" text-anchor="middle">SPI · 4 MHz</text>`,
    ];
    return `<svg viewBox="0 0 400 290" aria-hidden="true"><defs><pattern id="cg${i}" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" stroke="#DDE1E4"/></pattern></defs>
      <rect width="400" height="290" fill="url(#cg${i})"/><g fill="none" stroke="#0891B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" font-family="JetBrains Mono, monospace" font-size="11">${shapes[i % shapes.length]}</g></svg>`;
  };
  let cadType = "All", cadAll = false;
  const CAD_SHOW = 6;
  const renderCad = () => {
    const empty = !BENCH.length;
    $("cad").hidden = empty;
    document.querySelectorAll('a[href="#cad"]').forEach((a) => (a.hidden = empty));
    document.querySelectorAll('.gear-btn[data-target="cad"]').forEach((b) => (b.hidden = empty));
    let list = BENCH.map((c, i) => ({ ...c, i })).filter((c) => cadType === "All" || c.type === cadType).reverse();
    const starred = list.filter((c) => c.featured), rest = list.filter((c) => !c.featured);
    list = [...starred, ...rest];
    const shown = starred.length ? starred.length : Math.min(list.length, CAD_SHOW);
    $("cadMore").hidden = cadAll || list.length <= shown;
    $("cadMore").textContent = `Show ${list.length - shown} more build${list.length - shown === 1 ? "" : "s"}`;
    if (!cadAll) list = list.slice(0, shown);
    $("cadList").innerHTML = list.map((c) => {
      const has = c.images && c.images.length;
      const media = has ? `<img src="${c.images[0]}" alt="${c.title}" loading="lazy">` : cadSketch(c.i);
      const count = has && c.images.length > 1 ? `<span class="cad-count">${c.images.length} views</span>` : "";
      const status = c.status ? `<span class="cad-status">${c.status}</span>` : "";
      const star = c.featured ? `<span class="cad-star" title="Featured build">★ Featured</span>` : "";
      const file = c.file ? `<a class="cad-file" href="${c.file}" target="_blank" rel="noopener">Open file ↗</a>` : "";
      return `<article class="cad-card reveal in${c.featured ? " featured" : ""}">
        <button class="cad-media" data-i="${c.i}" ${has ? "" : "disabled"} aria-label="View ${c.title} images">${media}${status}${count}</button>${star}
        <div class="cad-info"><h3>${c.title}</h3><p>${c.description}</p>${file}</div>
        <div class="cad-block"><span><small>Type</small>${c.type}</span><span><small>Tools</small>${c.software || "Bench"}</span><span><small>No.</small>B${String(c.i + 1).padStart(2, "0")}</span></div>
      </article>`;
    }).join("") || `<p class="cad-empty">No ${cadType.toLowerCase()} builds yet.</p>`;
    $("cadList").querySelectorAll(".cad-media:not([disabled])").forEach((b) => b.addEventListener("click", () => { const c = BENCH[+b.dataset.i]; openLb(c.images, c.title, 0); }));
  };
  const buildCadFilter = () => {
    cadType = "All";
    const types = ["All", ...new Set(BENCH.map((c) => c.type))];
    $("cadFilter").innerHTML = types.length > 2 ? types.map((t) => `<button class="${t === "All" ? "on" : ""}" data-t="${t}">${t}</button>`).join("") : "";
    $("cadFilter").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      cadType = b.dataset.t;
      $("cadFilter").querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
      renderCad();
    }));
  };
  buildCadFilter();
  $("cadMore").addEventListener("click", () => { cadAll = !cadAll; renderCad(); if (cadAll) $("cadMore").hidden = false, $("cadMore").textContent = "Show featured only"; else $("cad").scrollIntoView({ behavior: "smooth" }); });
  renderCad();

  /* lightbox */
  const lb = $("lightbox"); let lbList = [], lbTitle = "", lbIdx = 0;
  const showLb = () => {
    $("lbImg").src = lbList[lbIdx]; $("lbImg").alt = lbTitle;
    $("lbCap").textContent = lbList.length > 1 ? `${lbTitle} · ${lbIdx + 1} of ${lbList.length}` : lbTitle;
    $("lbPrev").hidden = $("lbNext").hidden = lbList.length < 2;
  };
  function openLb(list, title, j) { lbList = list; lbTitle = title; lbIdx = j; showLb(); lb.hidden = false; document.body.style.overflow = "hidden"; }
  const closeLb = () => { lb.hidden = true; document.body.style.overflow = ""; };
  const step = (d) => { const n = lbList.length; lbIdx = (lbIdx + d + n) % n; showLb(); };
  $("lbClose").addEventListener("click", closeLb);
  $("lbPrev").addEventListener("click", () => step(-1));
  $("lbNext").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1);
  });

  /* ---------- EXPERIENCE ---------- */
  $("expList").innerHTML = EXPERIENCE.map((e) => `
    <li class="reveal"><span class="exp-dates">${e.dates}</span><h3>${e.role}</h3>
    <p class="exp-org">${e.org}</p><ul>${e.points.map((p) => `<li>${p}</li>`).join("")}</ul></li>`).join("");

  const ICONS = {
    cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',
    printer: '<path d="M7 9V3h10v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M7 14h10v7H7z"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8-1.3-1.3a4 4 0 0 1-5-5L13 2l1.7 1.7z"/><path d="M4 20l5-5"/>',
    people: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14.2A5 5 0 0 1 21.5 19"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    chip: '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9.5" y="9.5" width="5" height="5"/><path d="M9 2v4M12 2v4M15 2v4M9 18v4M12 18v4M15 18v4M2 9h4M2 12h4M2 15h4M18 9h4M18 12h4M18 15h4"/>',
    signal: '<path d="M2 15h4l2-8 3 12 3-14 3 10h5"/>',
  };
  $("skillList").innerHTML = SKILLS.map((g, i) => `
    <article class="skill-card reveal">
      <div class="skill-head"><span class="skill-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[g.icon] || ICONS.gear}</svg></span>
        <div><h3>${g.group}</h3>${g.note ? `<small>${g.note}</small>` : ""}</div>
        <span class="skill-num">${String(i + 1).padStart(2, "0")}</span></div>
      <div class="chips">${g.items.map((x) => `<span>${x}</span>`).join("")}</div>
    </article>`).join("");

  const certIcon = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="20" r="13"/><circle cx="24" cy="20" r="7"/><path d="M16 30l-4 14 7-4 5 6 2-12M32 30l4 14-7-4-5 6"/></svg>`;
  let certAll = false;
  const CERT_SHOW = 4;
  const renderCerts = () => {
    const starred = CERTIFICATIONS.filter((c) => c.featured), rest = CERTIFICATIONS.filter((c) => !c.featured);
    const ordered = [...starred, ...rest];
    const shownCount = starred.length ? starred.length : Math.min(ordered.length, CERT_SHOW);
    const list = certAll ? ordered : ordered.slice(0, shownCount);
    const hidden = ordered.length - shownCount;
    $("certList").innerHTML = list.map((c) => {
      const url = c.file || c.link;
      const btn = url
        ? `<a class="cert-btn" href="${url}" target="_blank" rel="noopener">${c.file ? "View certificate" : "Show credential"} ↗</a>`
        : `<span class="cert-btn off">Certificate on request</span>`;
      const star = c.featured ? `<span class="cert-star">★ Featured</span>` : "";
      return `<article class="cert reveal in${c.featured ? " featured" : ""}">${star}
        <div class="cert-top"><span class="cert-icon${c.badge ? " has-badge" : ""}">${c.badge ? `<img src="${c.badge}" alt="${c.issuer} badge" loading="lazy">` : certIcon}</span><span class="cert-date">${c.date}</span></div>
        <h3>${c.name}</h3>
        <p class="cert-issuer">${c.issuer}</p>
        ${c.credentialId ? `<p class="cert-id">Credential ID · ${c.credentialId}</p>` : ""}
        ${btn}</article>`;
    }).join("") + (certAll || hidden <= 0 ? `<div class="cert cert-next reveal in"><span class="cert-plus">+</span><p>More on the way</p></div>` : "");
    const more = $("certMore");
    more.hidden = hidden <= 0;
    more.textContent = certAll ? "Show featured only" : `Show ${hidden} more certificate${hidden === 1 ? "" : "s"}`;
  };
  $("certMore").addEventListener("click", () => {
    certAll = !certAll; renderCerts();
    if (!certAll) $("certificates").scrollIntoView({ behavior: "smooth" });
  });
  renderCerts();

  /* ---------- CONTACT + FOOTER ---------- */
  const mail = "mailto:" + SITE.email;
  $("emailBtn").href = mail; $("fEmail").href = mail;
  $("emailText").textContent = SITE.email;
  $("linkedinBtn").href = SITE.linkedin; $("heroLinkedin").href = SITE.linkedin; $("fLinkedin").href = SITE.linkedin;
  $("fGithub").href = SITE.github; $("githubBtn").href = SITE.github;
  $("year").textContent = new Date().getFullYear();

  /* ---------- MOBILE MENU ---------- */
  const menu = $("menu"), btn = $("menuBtn");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    menu.classList.remove("open"); btn.classList.remove("open");
  }));

  /* ---------- GEAR TRACKER ---------- */
  /* chip shaped section markers */
  const gearPath = (() => {
    let d = "M24 24h52v52H24z ";
    [34, 50, 66].forEach((p) => {
      d += `M${p - 4} 8h8v14h-8z M${p - 4} 78h8v14h-8z M8 ${p - 4}h14v8H8z M78 ${p - 4}h14v8H78z `;
    });
    return d;
  })();

  const sections = [...document.querySelectorAll("main section[data-name]")];
  const gears = $("gears");
  gears.innerHTML = sections.map((s) => `
    <button class="gear-btn" data-target="${s.id}" ${s.hidden ? "hidden" : ""} aria-label="Go to ${s.dataset.name}">
      <svg viewBox="0 0 100 100"><path d="${gearPath}"/></svg>
      <span class="tip">${s.dataset.name}</span>
    </button>`).join("");
  gears.querySelectorAll(".gear-btn").forEach((b) =>
    b.addEventListener("click", () => $(b.dataset.target).scrollIntoView({ behavior: "smooth" })));

  const setActive = (id) => {
    gears.querySelectorAll(".gear-btn").forEach((b) => b.classList.toggle("active", b.dataset.target === id));
    menu.querySelectorAll("a[href^='#']").forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
  };
  const onScroll = () => {
    const mid = window.innerHeight * 0.4;
    let current = sections[0].id;
    sections.forEach((s) => { if (!s.hidden && s.getBoundingClientRect().top <= mid) current = s.id; });
    setActive(current);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- LINE UP PHOTO FRAME WITH THE NAME ---------- */
  const alignHero = () => {
    const fig = document.querySelector(".drawing"), h1 = document.querySelector(".hero-name"), txt = document.querySelector(".hero-text");
    if (window.innerWidth <= 860) { fig.style.marginTop = ""; return; }
    const capGap = parseFloat(getComputedStyle(h1).fontSize) * 0.06;
    fig.style.marginTop = Math.max(0, h1.getBoundingClientRect().top - txt.getBoundingClientRect().top + capGap) + "px";
  };
  alignHero();
  window.addEventListener("resize", alignHero);
  if (document.fonts) document.fonts.ready.then(alignHero);

  /* ---------- HERO GEAR ---------- */
  /* ---------- PCB TRACES ----------
     One trace network for the whole page. It starts at the photo and keeps
     bleeding down the page: as you scroll, the growth front follows the
     bottom of the screen and the traces creep after it. Seeded, so it is the
     same pattern on every visit. Glow is faked with a wide faint stroke under
     a thin bright one, which stays smooth even on a long page. */
  const layer = $("traceLayer");
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let T = [], gate = [], R = 0, built = false;
  const buildTraces = () => {
    const photo = document.querySelector(".float");
    if (!photo) return;
    const pr = photo.getBoundingClientRect(), sy = window.scrollY;
    const VW = document.documentElement.clientWidth;
    layer.style.height = "0px";
    const VH = document.documentElement.scrollHeight;
    layer.style.height = VH + "px";
    const mobile = VW <= 860;
    const px0 = pr.left, py0 = pr.top + sy, px1 = pr.right, py1 = pr.bottom + sy;
    const heroBottom = document.querySelector(".hero").getBoundingClientRect().bottom + sy;
    const projTop = $("projects").getBoundingClientRect().top + sy;
    const minX = (y) => (y < projTop ? px0 + 2 : 10);
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    const paths = [];
    const inside = (x, y) => x > 6 && x < VW - 6 && y > 6 && y < VH - 6;
    const pick = (opts) => { let r = rnd() * opts.reduce((a, o) => a + o[1], 0); for (const o of opts) if ((r -= o[1]) <= 0) return o[0]; return opts[0][0]; };
    /* a short burst around the photo */
    const burst = (x, y, d, start, depth) => {
      const pts = [[x, y]]; let dist = 0, dir = d;
      const steps = 2 + Math.floor(rnd() * 3);
      for (let k = 0; k < steps; k++) {
        const v = DIRS[dir], u = Math.hypot(v[0], v[1]), len = (24 + rnd() * (depth ? 60 : 95)) / u;
        const nx = x + v[0] * len, ny = y + v[1] * len;
        if (!inside(nx, ny) || nx < minX(Math.max(y, ny))) break;
        x = nx; y = ny; dist += len * u; pts.push([x, y]);
        if (depth < 2 && rnd() < 0.3) burst(x, y, (dir + (rnd() < 0.5 ? 1 : 7)) % 8, start + dist, depth + 1);
        dir = rnd() < 0.5 ? d : (dir + (rnd() < 0.5 ? 1 : 7)) % 8;
      }
      if (pts.length > 1) paths.push({ pts, start, len: dist, deep: false, pad: depth > 0 || rnd() < 0.4 });
    };
    /* a long trunk that wanders down the page and sheds side branches */
    const trunk = (x, y, start, depth, life) => {
      let dir = 2;
      while (life-- > 0) {
        const pts = [[x, y]]; let dist = 0;
        const steps = 2 + Math.floor(rnd() * 3);
        for (let k = 0; k < steps; k++) {
          const lateral = x < Math.max(VW * 0.08, minX(y) + 40) ? [[1, 3], [0, 1]] : x > VW * 0.92 ? [[3, 3], [4, 1]] : [[1, 2], [3, 2], [0, depth ? 1.5 : 0.6], [4, depth ? 1.5 : 0.6]];
          dir = pick([[2, 4], ...lateral]);
          const v = DIRS[dir], u = Math.hypot(v[0], v[1]), len = (36 + rnd() * (dir === 2 ? 150 : 70)) / u;
          const ny = y + v[1] * len, nx = Math.min(VW - 10, Math.max(minX(Math.min(y, ny)), x + v[0] * len));
          if (ny > VH - 24) { life = 0; break; }
          dist += Math.hypot(nx - x, ny - y); x = nx; y = ny; pts.push([x, y]);
        }
        if (pts.length < 2) break;
        paths.push({ pts, start, len: dist, deep: pts[0][1] > heroBottom - 80, pad: false });
        start += dist;
        if (depth < 2 && rnd() < (depth ? 0.08 : 0.2)) trunk(x, y, start, depth + 1, depth ? 2 + Math.floor(rnd() * 3) : 4 + Math.floor(rnd() * 8));
        if (depth && life === 0) paths[paths.length - 1].pad = true;
      }
      if (paths.length) paths[paths.length - 1].pad = true;
    };
    const gap = mobile ? 30 : 24;
    for (let y = py0 + 16; y < py1 - 10; y += gap) { burst(px1 + 2, y, 0, 0, 0); }
    for (let x = px0 + 16; x < px1 - 10; x += gap) { if (rnd() < 0.45) burst(x, py0 - 2, 6, 0, 0); burst(x, py1 + 2, 2, 0, 0); }
    const trunks = mobile ? 4 : 7;
    for (let t = 0; t < trunks; t++) trunk(px0 + ((t + 0.5) / trunks) * (px1 - px0), py1 + 2, 0, 0, 999);
    /* side trunks so the left of the page bleeds too */
    if (!mobile) {
      /* start them at the network distance already reached at that height, so they grow in step */
      const s0 = Math.max(0, ...paths.filter((p) => p.pts[0][1] <= projTop).map((p) => p.start));
      trunk(24, projTop + 10, s0, 1, 999); trunk(px0 * 0.45, projTop + 10, s0, 1, 999);
    }

    const dStr = (p) => "M" + p.pts.map((q) => q[0].toFixed(1) + " " + q[1].toFixed(1)).join(" L");
    layer.innerHTML = `<svg width="${VW}" height="${VH}" viewBox="0 0 ${VW} ${VH}">
      <g class="halo">${paths.map((p) => `<path class="${p.deep ? "deep" : ""}" d="${dStr(p)}"/>`).join("")}</g>
      <g class="core">${paths.map((p, n) => `<path class="${p.deep ? "deep" : ""}${n % 6 ? "" : " hot"}" d="${dStr(p)}"/>`).join("")}</g>
      <g class="pads">${paths.map((p) => { const e = p.pts[p.pts.length - 1]; return p.pad ? `<circle cx="${e[0].toFixed(1)}" cy="${e[1].toFixed(1)}" r="3"/>` : "<circle r='0'/>"; }).join("")}</g></svg>`;
    const halos = layer.querySelectorAll(".halo path"), cores = layer.querySelectorAll(".core path"), pads = layer.querySelectorAll(".pads circle");
    T = paths.map((p, n) => {
      const dash = `${p.len.toFixed(1)} ${(p.len + 40).toFixed(1)}`;
      [halos[n], cores[n]].forEach((el) => { el.style.strokeDasharray = dash; el.style.strokeDashoffset = p.len; el.style.visibility = "hidden"; });
      return { ...p, y0: p.pts[0][1], els: [halos[n], cores[n]], pad: p.pad ? pads[n] : null, drawn: -1 };
    });
    /* gate: how far the network may grow once the screen's bottom edge reaches a given height */
    const byY = [...T].sort((a, b) => a.y0 - b.y0);
    let m = 0; gate = byY.map((p) => (m = Math.max(m, p.start + Math.min(p.len, 60)), [p.y0, m]));
    if (!built) R = 0; built = true;
    paint(true);
  };
  const targetR = () => {
    if (still) return Infinity;
    const front = window.scrollY + window.innerHeight * 0.92;
    let lo = 0, hi = gate.length - 1, best = 0;
    while (lo <= hi) { const mid = (lo + hi) >> 1; if (gate[mid][0] <= front) { best = gate[mid][1]; lo = mid + 1; } else hi = mid - 1; }
    return best + 40;
  };
  const paint = (force) => {
    for (const p of T) {
      const d = Math.max(0, Math.min(p.len, R - p.start));
      if (!force && Math.abs(d - p.drawn) < 0.2) continue;
      p.drawn = d;
      const vis = d > 0.3 ? "visible" : "hidden";
      for (const el of p.els) { el.style.strokeDashoffset = p.len - d; el.style.visibility = vis; }
      if (p.pad) p.pad.classList.toggle("on", d >= p.len - 0.5);
    }
  };
  const tick = () => {
    const t = targetR();
    if (t === Infinity) { R = 1e9; paint(true); return; }
    const diff = t - R;
    if (Math.abs(diff) > 0.5) {
      /* creep: never faster than a few pixels a frame, so a fast scroll still bleeds slowly */
      R += Math.sign(diff) * Math.min(Math.abs(diff) * 0.035 + 1.2, diff > 0 ? 7 : 14);
      paint(false);
    }
    requestAnimationFrame(tick);
  };
  let rt; const rebuild = () => { clearTimeout(rt); rt = setTimeout(buildTraces, 200); };
  window.addEventListener("resize", rebuild);
  if (window.ResizeObserver) { let lastH = 0; new ResizeObserver(() => { const h = document.documentElement.scrollHeight; if (Math.abs(h - lastH) > 40) { lastH = h; rebuild(); } }).observe(document.body); }
  window.addEventListener("load", () => { buildTraces(); requestAnimationFrame(tick); });
  if (document.fonts) document.fonts.ready.then(rebuild);

  /* ---------- PLASMA BEHIND THE PHOTO ----------
     Just a breathing cyan glow, like light off a plasma core. */
  const pc = $("plasma"), ctx = pc.getContext("2d");
  let PW = 0, PH = 0, plasmaOn = true;
  const sizePlasma = () => {
    const r = pc.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1);
    PW = r.width; PH = r.height; pc.width = PW * dpr; pc.height = PH * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const drawPlasma = (t) => {
    const cx = PW / 2, cy = PH / 2, Rr = Math.min(PW, PH) / 2;
    ctx.clearRect(0, 0, PW, PH);
    ctx.globalCompositeOperation = "source-over";
    const b = Math.sin(t / 1700), pulse = 1 + b * 0.05, k = 0.86 + b * 0.14;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Rr * pulse);
    g.addColorStop(0, `rgba(34,211,238,${0.75 * k})`); g.addColorStop(0.3, `rgba(6,182,212,${0.5 * k})`); g.addColorStop(0.55, `rgba(8,145,178,${0.24 * k})`); g.addColorStop(0.8, `rgba(14,116,144,${0.08 * k})`); g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, Rr * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  };
  let lastP = 0;
  const loopPlasma = (t) => { if (plasmaOn && t - lastP > 45) { lastP = t; drawPlasma(t); } requestAnimationFrame(loopPlasma); };
  sizePlasma(); drawPlasma(0);
  window.addEventListener("resize", sizePlasma);
  if (window.IntersectionObserver) new IntersectionObserver((e) => { plasmaOn = e[0].isIntersecting; }).observe(pc);
  if (!still) requestAnimationFrame(loopPlasma);

  /* ---------- REVEAL ON SCROLL ---------- */
  document.querySelectorAll(".band > .eyebrow, .big, .card, .huge").forEach((el) => el.classList.add("reveal"));
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); revealObs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

  /* ---------- AUTO LOAD FROM GITHUB FOLDERS ----------
     Reads the folder list of your GitHub repository, so new files you
     drop into cad/, certificates/ and projects/ show up by themselves. */
  const IMG = /\.(jpe?g|png|webp|gif)$/i;
  const nice = (name) => name.replace(/\.[^.]+$/, "").replace(/^\d{4}[-_ ]\d{2}([-_ ]\d{2})?[-_ ]*/, "")
    .replace(/[-_]+/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()).trim();
  const datePart = (name) => (name.match(/^(\d{4}[-_ ]\d{2}(?:[-_ ]\d{2})?)/) || [])[1] || "";
  const enc = (path) => path.split("/").map(encodeURIComponent).join("/");
  const readInfo = async (path) => {
    try {
      const r = await fetch(enc(path), { cache: "no-cache" });
      if (!r.ok) return {};
      const info = {};
      (await r.text()).split(/\r?\n/).forEach((line) => {
        const m = line.match(/^\s*([a-zA-Z]+)\s*:\s*(.*)$/);
        if (m) info[m[1].toLowerCase()] = m[2].trim();
      });
      return info;
    } catch { return {}; }
  };
  const yes = (v) => /^(yes|true|y|1|star|featured)$/i.test(v || "");
  const getTree = async () => {
    const key = "rishad-tree";
    try {
      const c = JSON.parse(sessionStorage.getItem(key) || "null");
      if (c && Date.now() - c.t < 5 * 60 * 1000) return c.paths;
    } catch {}
    const r = await fetch(`https://api.github.com/repos/${SITE.repo}/git/trees/${SITE.branch}?recursive=1`);
    if (!r.ok) throw new Error("GitHub " + r.status);
    const paths = (await r.json()).tree.filter((x) => x.type === "blob").map((x) => x.path);
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), paths })); } catch {}
    return paths;
  };
  const groupFolder = (paths, root) => {
    const groups = {}, loose = [];
    paths.filter((p) => p.startsWith(root + "/")).forEach((p) => {
      const rest = p.slice(root.length + 1), parts = rest.split("/");
      if (parts.length === 1) loose.push(p);
      else (groups[parts[0]] = groups[parts[0]] || []).push(p);
    });
    return { groups, loose };
  };
  const sortImgs = (list) => list.filter((p) => IMG.test(p))
    .sort((a, b) => (/\/cover\./i.test(b) - /\/cover\./i.test(a)) || a.localeCompare(b, undefined, { numeric: true }));

  const autoLoad = async () => {
    if (!SITE.repo || !(/github\.io$/.test(location.hostname) || /[?&]auto/.test(location.search))) return;
    let paths;
    try { paths = await getTree(); } catch (e) { console.warn("Auto load skipped:", e.message); return; }
    LOADED = true;

    /* CAD: cad/<design folder>/images + info.txt, or single images in cad/ */
    const cad = groupFolder(paths, "bench");
    const cadItems = [];
    for (const [folder, files] of Object.entries(cad.groups)) {
      const images = sortImgs(files);
      if (!images.length) continue;
      const info = files.some((f) => /\/info\.txt$/i.test(f)) ? await readInfo(`bench/${folder}/info.txt`) : {};
      const drawing = files.find((f) => /\.(pdf|zip|step|stp|sldprt|sldasm)$/i.test(f));
      cadItems.push({
        title: info.title || nice(folder), type: info.type || "Hardware", software: info.tools || info.software || "",
        status: info.status || "", featured: yes(info.featured), description: info.description || "",
        images, file: info.file || drawing || "", sortKey: info.date || datePart(folder),
      });
    }
    sortImgs(cad.loose).forEach((f) => cadItems.push({
      title: nice(f.split("/").pop()), type: "Hardware", software: "", status: "", featured: false,
      description: "", images: [f], file: "", sortKey: datePart(f.split("/").pop()),
    }));
    if (cadItems.length) {
      cadItems.sort((a, b) => (b.sortKey || "").localeCompare(a.sortKey || "") || a.title.localeCompare(b.title));
      BENCH.length = 0;
      BENCH.push(...cadItems.reverse());
      buildCadFilter(); renderCad();
    }

    /* CERTIFICATES: certificates/Name__Issuer__Date.pdf (or .jpg/.png) */
    const certFiles = paths.filter((p) => /^certificates\/(featured\/)?[^/]+\.(pdf|jpe?g|png|webp)$/i.test(p));
    certFiles.forEach((f) => {
      const featured = /^certificates\/featured\//i.test(f);
      const base = f.split("/").pop().replace(/\.[^.]+$/, "");
      const parts = base.split("__").map((x) => x.replace(/[-_]+/g, " ").trim());
      const star = parts.some((x) => /^star$/i.test(x));
      const [name, issuer = "", date = ""] = parts.filter((x) => !/^star$/i.test(x));
      const match = CERTIFICATIONS.find((c) => c.file === f || c.name.toLowerCase() === name.toLowerCase());
      if (match) { if (!match.file) match.file = f; if (featured || star) match.featured = true; return; }
      CERTIFICATIONS.push({ name, issuer, date, credentialId: "", file: f, link: "", featured: featured || star });
    });
    if (certFiles.length) renderCerts();

    /* PROJECTS: projects/<project folder>/info.txt + images */
    const proj = groupFolder(paths, "projects");
    let added = 0;
    for (const [folder, files] of Object.entries(proj.groups).sort()) {
      if (PROJECTS.some((p) => p.folder === folder)) continue;
      const info = files.some((f) => /\/info\.txt$/i.test(f)) ? await readInfo(`projects/${folder}/info.txt`) : {};
      PROJECTS.push({
        folder, num: String(PROJECTS.length + 1).padStart(3, "0"), title: info.title || nice(folder),
        label: info.label || "", status: info.status || "Complete", description: info.description || "",
        tags: (info.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
        images: sortImgs(files), link: info.link || "",
      });
      added++;
    }
    if (added) renderProjects();

    /* APPS: apps/<app folder>/info.txt + screenshot */
    const apps = groupFolder(paths, "apps");
    let appsAdded = 0;
    for (const [folder, files] of Object.entries(apps.groups).sort()) {
      const info = files.some((f) => /\/info\.txt$/i.test(f)) ? await readInfo(`apps/${folder}/info.txt`) : {};
      const title = info.title || nice(folder);
      if (OTHER_PROJECTS.some((o) => o.title.toLowerCase() === title.toLowerCase())) continue;
      OTHER_PROJECTS.push({
        title, description: info.description || "", link: info.link || "", image: sortImgs(files)[0] || "",
        tags: (info.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
      });
      appsAdded++;
    }
    if (appsAdded) renderOthers();
  };
  autoLoad();
}
