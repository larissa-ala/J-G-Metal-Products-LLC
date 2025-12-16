// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "block";
    mobileNav.style.display = isOpen ? "none" : "block";
    mobileNav.setAttribute("aria-hidden", isOpen ? "true" : "false");
    menuBtn.setAttribute("aria-expanded", isOpen ? "false" : "true");
  });

  mobileNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      mobileNav.style.display = "none";
      mobileNav.setAttribute("aria-hidden", "true");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// Service areas
const areas = [
  "Auburn", "Davis","Dixon", "El Dorado Hills", "Fairfield", "Folsom", "Galt", "Grass Valley", "Lodi", "Modesto","Orangevale", "Placerville", "Rocklin", "Roseville",
  "Sacramento", "Santa Rosa", "Shingle Springs", "Sonoma", "Stockton", "Vacaville"
];

const areaChips = document.getElementById("areaChips");
if (areaChips) {
  areaChips.innerHTML = areas.map(city => `<span class="chip">${city}</span>`).join("");
}

/* -----------------------
   REVIEWS (ROTATION)
------------------------ */
const reviews = [
  {
    stars: 5,
    quote: "Super responsive and easy to work with. Turnaround was quick and everything fit perfectly on install.",
    name: "HVAC Contractor",
    role: "Sacramento Area"
  },
  {
    stars: 5,
    quote: "Quality is consistent and communication is solid. We rely on them when timelines get tight.",
    name: "Project Manager",
    role: "Commercial HVAC"
  },
  {
    stars: 5,
    quote: "Clean work, reliable delivery, and they take pride in the details. Great local shop.",
    name: "Shop Foreman",
    role: "Northern California"
  }
  // Add more here whenever you get them!
];

let reviewIndex = 0;
let reviewTimer = null;

const reviewStars = document.getElementById("reviewStars");
const reviewQuote = document.getElementById("reviewQuote");
const reviewName  = document.getElementById("reviewName");
const reviewRole  = document.getElementById("reviewRole");

const dotsWrap = document.getElementById("reviewDots");
const prevBtn = document.getElementById("prevReview");
const nextBtn = document.getElementById("nextReview");

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = reviews.map((_, i) => {
    const active = i === reviewIndex ? "active" : "";
    return `<button class="dot-btn ${active}" aria-label="Go to review ${i+1}" data-i="${i}"></button>`;
  }).join("");

  dotsWrap.querySelectorAll(".dot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-i"));
      setReview(i);
      restartAutoRotate();
    });
  });
}

function setReview(i) {
  reviewIndex = (i + reviews.length) % reviews.length;
  const r = reviews[reviewIndex];

  if (reviewStars) reviewStars.textContent = "★★★★★".slice(0, r.stars);
  if (reviewQuote) reviewQuote.textContent = `“${r.quote}”`;
  if (reviewName)  reviewName.textContent  = r.name;
  if (reviewRole)  reviewRole.textContent  = r.role;

  renderDots();
}

function nextReview() { setReview(reviewIndex + 1); }
function prevReview() { setReview(reviewIndex - 1); }

function restartAutoRotate() {
  if (reviewTimer) clearInterval(reviewTimer);
  reviewTimer = setInterval(() => nextReview(), 6000);
}

// Hook buttons
if (nextBtn) nextBtn.addEventListener("click", () => { nextReview(); restartAutoRotate(); });
if (prevBtn) prevBtn.addEventListener("click", () => { prevReview(); restartAutoRotate(); });

// Initialize reviews if section exists
if (reviewQuote && reviews.length) {
  setReview(0);
  restartAutoRotate();
}

/* -----------------------
   CURRENT CUSTOMERS
------------------------ */
const customers = [
  { name: "Your Customer Name", type: "HVAC Contractor", tag: "Active" },
  { name: "Another Company", type: "Commercial Projects", tag: "Active" },
  { name: "Local Builder", type: "Residential HVAC", tag: "Active" },
  { name: "Service Team", type: "Maintenance", tag: "Active" }
  // Replace with real names (or remove this section if you prefer private)
];

const customerGrid = document.getElementById("customerGrid");
if (customerGrid) {
  customerGrid.innerHTML = customers.map(c => `
    <div class="customer">
      <div>
        <div class="customer-name">${c.name}</div>
        <div class="customer-type">${c.type}</div>
      </div>
      <div class="customer-badge">${c.tag}</div>
    </div>
  `).join("");
}

/* -----------------------
   GALLERY (optional)
------------------------ */
const gallery = [
  { file: "assets/gallery/plenums.png", caption: "Plenums" },
  { file: "assets/gallery/lined-plenum.png", caption: "Lined Plenum" },
  { file: "assets/gallery/curb-adapters.png", caption: "Curb Adapters" },
  { file: "assets/gallery/roof-curves.png", caption: "Roof Curves" },
  { file: "assets/gallery/any-size.png", caption: "Any Size / Custom Boxes" },
  { file: "assets/gallery/square-boxes.png", caption: "Square Boxes" },
  { file: "assets/gallery/c-boxes.png", caption: "C-Boxes" },
  { file: "assets/gallery/custom-chimney-caps.png", caption: "Custom Chimney Caps" }
];


const galleryGrid = document.getElementById("galleryGrid");
if (galleryGrid) {
  galleryGrid.innerHTML = gallery.map(item => `
    <div class="gallery-item">
      <img src="${item.file}" alt="${item.caption}" loading="lazy"
        onerror="this.closest('.gallery-item').style.display='none';" />
      <div class="caption">${item.caption}</div>
    </div>
  `).join("");
}

/* -----------------------
   PRODUCTS PAGE
------------------------ */
const products = [
  {
    name: "Plenums (Raw / 1” Liner / Bubble Wrapped)",
    img: "assets/gallery/plenums.png",
    pills: ["Custom sizes", "Raw / Liner / Wrapped"],
    desc: "Plenums available bubble wrapped, 1” inch lined, or raw. Custom height options: 18”, 20”, 24”, 30”, 36”, and 48”."
  },
  {
    name: "Lined Plenum (1” Liner)",
    img: "assets/gallery/lined-plenum.png",
    pills: ["1” liner", "Custom sizes"],
    desc: "1” inch lined plenum available in custom sizes. Height options: 18”, 20”, 24”, 30”, 36”, and 48”."
  },
  {
    name: "Any Size / Custom Boxes",
    img: "assets/gallery/any-size.png",
    pills: ["Any size", "Any height"],
    desc: "We can make any size/height: 18”, 20”, 24”, 30”, 36”, and 48” (and more by request). Example sizes include 16×20×18” with 24–36” heights."
  },
  {
    name: "Square Boxes / Square Transitions",
    img: "assets/gallery/square-boxes.png",
    pills: ["Transitions", "Square"],
    desc: "Square transitions and square boxes made to spec."
  },
  {
    name: "C-Boxes",
    img: "assets/gallery/c-boxes.png",
    pills: ["C-Box", "Return air"],
    desc: "C-Boxes for HVAC applications (including return air configurations)."
  },
  {
    name: "Curb Adapters",
    img: "assets/gallery/curb-adapters.png",
    pills: ["Adapters", "Fit to spec"],
    desc: "Curb adapters built to match rooftop unit and curb requirements."
  },
  {
    name: "Roof Curves",
    img: "assets/gallery/roof-curves.png",
    pills: ["Curved", "Custom fit"],
    desc: "Roof curves fabricated to fit your roofline and duct layout."
  },
  {
    name: "Custom Chimney Caps",
    img: "assets/gallery/custom-chimney-caps.png",
    pills: ["Custom", "Made in USA"],
    desc: "Custom chimney caps fabricated to match your dimensions and application."
  }
];

// Render on products.html only
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  productGrid.innerHTML = products.map(p => {
    const pills = (p.pills || []).map(t => `<span class="pill">${t}</span>`).join("");

    const emailSubject = encodeURIComponent(`Quote Request - ${p.name} - J&G Metal Products`);
    const emailBody = encodeURIComponent(
      `Hi J&G Metal Products,\n\nI’d like a quote for: ${p.name}\n\nDetails (sizes/quantity/liner/etc):\n\nThank you,`
    );

    return `
    <article class="product-card">
        <img class="product-img" src="${p.img}" alt="${p.name}" loading="lazy" />
        <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-meta">${pills}</div>
        <p class="product-desc">${p.desc}</p>
        </div>
    </article>
    `;

  }).join("");
}
