/* =========================================================
   HELPERS
   ========================================================= */
const $ = (id) => document.getElementById(id);

/* =========================================================
   MOBILE NAV
   ========================================================= */
(() => {
  const menuBtn = $("menuBtn");
  const mobileNav = $("mobileNav");
  if (!menuBtn || !mobileNav) return;

  const setOpen = (open) => {
    mobileNav.style.display = open ? "block" : "none";
    mobileNav.setAttribute("aria-hidden", open ? "false" : "true");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.style.display === "block";
    setOpen(!isOpen);
  });

  mobileNav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });
})();

/* =========================================================
   SERVICE AREA CHIPS (index.html only)
   ========================================================= */
(() => {
  const areaChips = $("areaChips");
  if (!areaChips) return;

  const areas = [
    "Auburn", "Davis", "Dixon", "El Dorado Hills", "Fairfield", "Folsom", "Galt",
    "Grass Valley", "Lodi", "Modesto", "Orangevale", "Placerville", "Rocklin",
    "Roseville", "Sacramento", "Santa Rosa", "Shingle Springs", "Sonoma",
    "Stockton", "Vacaville"
  ];

  areaChips.innerHTML = areas.map((city) => `<span class="chip">${city}</span>`).join("");
})();

/* =========================================================
   REVIEWS ROTATION (index.html only)
   ========================================================= */
(() => {
  const reviewQuote = $("reviewQuote");
  if (!reviewQuote) return; // if section isn't on this page, skip everything

  const reviews = [
    {
      stars: 5,
      quote: "JR displayed excellent customer service. He was very detailed on my order and was very patient with me. I highly recommend J&G Metal Products big time! I will be ordering from them consistently going forward!",
      name: "Landen J.",
    },
    {
      stars: 5,
      quote: "Excellent service! I needed a product at the last minute and JYG responded very quickly, unlike other companies. Great job, congratulations!",
      name: "Samyd G.",
    },
    {
      stars: 5,
      quote: "I spoke to JR at the last minute; I had already been informed about this company. Totally recommended, in my opinion one of the best companies in Sacramento. Their service and equipment are 10/10. A 100% metal company.",
      name: "Aczer M.",
    },
    {
      stars: 5,
      quote: "Quality of products, they helped me with some material I needed at the last minute",
      name: "Hector G.",
    },
    {
      stars: 5,
      quote: "Amazing quality work and customer service. Jr was very helpful and a man of his word I needed a good amount of return cans and ceiling boxes and he delivered as promised and on time will definitely be coming back for future business",
      name: "Juan C.",
    },
        {
      stars: 5,
      quote: "Very good product and service",
      name: "Laura F.",
    }
    // Add more reviews here
  ];

  const reviewStars = $("reviewStars");
  const reviewName = $("reviewName");
  const reviewRole = $("reviewRole");
  const dotsWrap = $("reviewDots");
  const prevBtn = $("prevReview");
  const nextBtn = $("nextReview");

  let index = 0;
  let timer = null;

  const renderDots = () => {
    if (!dotsWrap) return;

    dotsWrap.innerHTML = reviews
      .map((_, i) => {
        const active = i === index ? "active" : "";
        return `<button class="dot-btn ${active}" aria-label="Go to review ${i + 1}" data-i="${i}"></button>`;
      })
      .join("");

    dotsWrap.querySelectorAll(".dot-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        index = Number(btn.dataset.i);
        render();
        restart();
      });
    });
  };

  const render = () => {
    const r = reviews[index];

    if (reviewStars) reviewStars.textContent = "★★★★★".slice(0, r.stars);
    reviewQuote.textContent = `“${r.quote}”`;
    if (reviewName) reviewName.textContent = r.name;
    if (reviewRole) reviewRole.textContent = r.role;

    renderDots();
  };

  const next = () => {
    index = (index + 1) % reviews.length;
    render();
  };

  const prev = () => {
    index = (index - 1 + reviews.length) % reviews.length;
    render();
  };

  const restart = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(next, 6000);
  };

  if (nextBtn) nextBtn.addEventListener("click", () => { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); restart(); });

  render();
  restart();
})();

/* =========================================================
   CURRENT CUSTOMERS (index.html only)
   ========================================================= */
(() => {
  const customerGrid = $("customerGrid");
  if (!customerGrid) return;

  const customers = [
    { name: "Your Customer Name", type: "HVAC Contractor", tag: "Active" },
    { name: "Another Company", type: "Commercial Projects", tag: "Active" },
    { name: "Local Builder", type: "Residential HVAC", tag: "Active" },
    { name: "Service Team", type: "Maintenance", tag: "Active" }
    // Replace with real names (or remove the whole section if you prefer private)
  ];

  customerGrid.innerHTML = customers
    .map(
      (c) => `
      <div class="customer">
        <div>
          <div class="customer-name">${c.name}</div>
          <div class="customer-type">${c.type}</div>
        </div>
        <div class="customer-badge">${c.tag}</div>
      </div>
    `
    )
    .join("");
})();

/* =========================================================
   GALLERY (index.html only)
   ========================================================= */
(() => {
  const galleryGrid = $("galleryGrid");
  if (!galleryGrid) return;

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

  galleryGrid.innerHTML = gallery
    .map(
      (item) => `
      <div class="gallery-item">
        <img
          src="${item.file}"
          alt="${item.caption}"
          loading="lazy"
          onerror="this.closest('.gallery-item').style.display='none';"
        />
        <div class="caption">${item.caption}</div>
      </div>
    `
    )
    .join("");
})();

/* =========================================================
   PRODUCTS GRID (products.html only)
   ========================================================= */
(() => {
  const productGrid = $("productGrid");
  if (!productGrid) return;

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

  productGrid.innerHTML = products
    .map((p) => {
      const pills = (p.pills || []).map((t) => `<span class="pill">${t}</span>`).join("");

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
    })
    .join("");
})();
