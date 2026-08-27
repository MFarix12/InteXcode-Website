/* =========================================================
    INTEXCODE
   Interactive Website Scripts
========================================================= */

/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(
  ".nav-link:not(.nav-dropdown-toggle)",
);
const servicesToggle = document.querySelector(".nav-dropdown-toggle");
const servicesDropdown = document.querySelector(".services-dropdown");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) navMenu.classList.remove("open");

    if (!menuToggle) return;
    const icon = menuToggle.querySelector("i");

    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

if (servicesToggle && servicesDropdown) {
  const closeServicesDropdown = () => {
    servicesDropdown.classList.remove("open");
    servicesToggle.setAttribute("aria-expanded", "false");
  };

  servicesToggle.addEventListener("click", () => {
    const isOpen = servicesDropdown.classList.toggle("open");
    servicesToggle.setAttribute("aria-expanded", isOpen);
  });

  servicesDropdown.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeServicesDropdown();
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) closeServicesDropdown();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeServicesDropdown();
      servicesToggle.focus();
    }
  });
}

/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("section[id]");

if (sections.length)
  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");

      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm)
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      formMessage.textContent = "Please complete the required fields.";

      return;
    }

    formMessage.textContent = `Thanks ${name}. Your message has been received.`;

    contactForm.reset();
  });

/* =========================================================
   FOOTER YEAR
========================================================= */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* SHARED CONTACT FOOTER */

const footerMount = document.querySelector("[data-site-footer]");

if (footerMount) {
  const isHome =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/");
  const homeLink = isHome ? "#home" : "index.html#home";
  const aboutLink = isHome ? "#about" : "about.html";
  const servicesLink = isHome ? "#services" : "index.html#services";
  const solutionsLink = isHome ? "solutions.html" : "solutions.html";
  const visionLink = isHome ? "vision.html" : "vision.html";
  const contactLink = isHome ? "#contact" : "index.html#contact";

  footerMount.innerHTML = `
        <footer class="footer">
            <div class="container">
                <div class="footer-top">
                    <div class="footer-brand">
                        <a href="${homeLink}" class="logo">Inte<span>X</span>code</a>
                        <p>Intelligence. Technology. Code.<br>Practical technology for meaningful progress.</p>
                    </div>
                    <div class="footer-contact-details">
                        <div><small>EMAIL</small><a href="mailto:intexcodetechnology@gmail.com">intexcodetechnology@gmail.com</a></div>
                        <div><small>PHONE</small><a href="tel:+60194248847">+60 19 424 8847</a></div>
                        <div><small>LOCATION</small><span>Malaysia · Serving clients worldwide</span></div>
                    </div>
                    <div class="footer-links">
                        <div><span>EXPLORE</span><a href="${aboutLink}">About</a><a href="${servicesLink}">Services</a><a href="${solutionsLink}">Solutions</a><a href="${visionLink}">Vision</a><a href="portfolio.html">Portfolio</a><a href="${contactLink}">Contact</a></div>
                        <div><span>CONNECT</span><a href="#" aria-label="LinkedIn">LinkedIn</a><a href="#" aria-label="Instagram">Instagram</a><a href="#" aria-label="Facebook">Facebook</a></div>
                    </div>
                </div>
                <div class="footer-bottom"><span>© <span id="year"></span> InteXcode. All rights reserved.</span><span>Intelligence · Technology · Code</span></div>
            </div>
        </footer>`;
  const footerYear = footerMount.querySelector("#year");
  if (footerYear) footerYear.textContent = new Date().getFullYear();
}

/* ABOUT PAGE CERTIFICATE VIEWER */

const certificateModal = document.getElementById("certificateModal");
const modalTitle = document.getElementById("modalTitle");
const modalDetail = document.getElementById("modalDetail");
const modalClose = document.getElementById("modalClose");

if (certificateModal && modalTitle && modalDetail && modalClose) {
  const closeCertificate = () => certificateModal.classList.remove("open");

  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.dataset.certificate;
      modalDetail.textContent = card.dataset.detail;
      certificateModal.classList.add("open");
    });
  });

  modalClose.addEventListener("click", closeCertificate);
  certificateModal.addEventListener("click", (event) => {
    if (event.target === certificateModal) closeCertificate();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeCertificate();
  });
}

/* PORTFOLIO PROJECT VIEWER */

const projectModal = document.getElementById("projectModal");

if (projectModal) {
  const projectData = {
    1: {
      title: "Flowline Operations Hub",
      category: "OPERATIONS / 2025",
      overview:
        "A connected operations platform that gives teams one clear view of work, ownership and progress.",
      challenge:
        "Manual handoffs and disconnected spreadsheets made it difficult to see bottlenecks or act quickly.",
      solution:
        "InteXcode mapped the workflow, designed a role-based workspace and connected the existing business systems through secure APIs.",
      features: "Workflow tracking, approvals, alerts, dashboards",
      tech: "JavaScript, REST APIs, cloud hosting, CI/CD",
      role: "Discovery, UX, frontend, backend integration and quality assurance",
      outcome:
        "Shorter handoffs, clearer ownership and a more dependable daily operating rhythm.",
      year: "2025",
      duration: "8 months",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
      ],
    },
    2: {
      title: "CareConnect Portal",
      category: "HEALTHCARE / 2024",
      overview:
        "A secure digital front door that makes service journeys simpler for customers and support teams.",
      challenge:
        "Customers needed a clearer way to find information, submit requests and understand what happened next.",
      solution:
        "We created an accessible self-service portal with guided journeys, secure authentication and a support team console.",
      features: "Self-service, secure accounts, case tracking, notifications",
      tech: "Responsive UI, APIs, cloud security, analytics",
      role: "Product strategy, interface design, engineering and testing",
      outcome:
        "A calmer customer experience and better visibility for service teams.",
      year: "2024",
      duration: "6 months",
      images: [
        "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
      ],
    },
    3: {
      title: "Signal Insights",
      category: "INTELLIGENCE / 2024",
      overview:
        "A practical data and AI layer that helps leaders turn scattered information into confident decisions.",
      challenge:
        "Important signals were spread across reports, making it hard to spot trends early.",
      solution:
        "InteXcode unified the data flow and shaped an explainable insight experience around the decisions that mattered most.",
      features: "Data pipelines, trend views, alerts, role-based insight",
      tech: "Data workflows, AI, analytics, cloud infrastructure",
      role: "Data strategy, solution architecture, product delivery and enablement",
      outcome:
        "Faster access to useful context and more consistent planning conversations.",
      year: "2024",
      duration: "7 months",
      images: [
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
      ],
    },
    4: {
      title: "Northstar Commerce",
      category: "COMMERCE / 2023",
      overview:
        "A flexible commerce experience designed to make discovery, purchase and fulfilment feel effortless.",
      challenge:
        "The existing customer journey was difficult to navigate and could not adapt quickly to new offers.",
      solution:
        "We redesigned the experience around customer intent and built a modular platform for faster iteration.",
      features: "Product discovery, checkout, content management, reporting",
      tech: "Web development, APIs, responsive design, automation",
      role: "UX, product design, frontend engineering and delivery",
      outcome:
        "A clearer path to purchase and a stronger foundation for future growth.",
      year: "2023",
      duration: "9 months",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=85",
      ],
    },
    5: {
      title: "Fleetwise Control",
      category: "LOGISTICS / 2023",
      overview:
        "A live planning and control view that brings vehicles, teams and delivery priorities together.",
      challenge:
        "Planning depended on delayed updates and multiple tools that did not share the same picture.",
      solution:
        "We connected operational data into a focused control centre with clear status, ownership and exception handling.",
      features: "Live status, planning, exceptions, mobile access",
      tech: "Cloud services, APIs, dashboards, mobile-first UI",
      role: "Discovery, architecture, engineering, rollout support",
      outcome:
        "Quicker response to exceptions and a shared view across the operation.",
      year: "2023",
      duration: "10 months",
      images: [
        "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=85",
      ],
    },
    6: {
      title: "CloudBase Modernisation",
      category: "CLOUD / 2022",
      overview:
        "A safer, more observable cloud foundation for a growing digital service.",
      challenge:
        "Legacy infrastructure limited release confidence and made system health difficult to understand.",
      solution:
        "We introduced a staged cloud architecture, deployment automation, access controls and meaningful monitoring.",
      features: "CI/CD, observability, backups, access management",
      tech: "Cloud architecture, containers, infrastructure as code, monitoring",
      role: "Assessment, cloud strategy, DevOps implementation and team coaching",
      outcome:
        "More predictable releases, clearer system health and a foundation ready to scale.",
      year: "2022",
      duration: "5 months",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
      ],
    },
  };
  const image = document.getElementById("projectModalImage");
  const dots = document.getElementById("projectDots");
  let activeProject;
  let activeImage = 0;
  const setImage = (index) => {
    activeImage =
      (index + activeProject.images.length) % activeProject.images.length;
    image.src = activeProject.images[activeImage];
    dots
      .querySelectorAll("button")
      .forEach((dot, dotIndex) =>
        dot.classList.toggle("active", dotIndex === activeImage),
      );
  };
  document.querySelectorAll(".portfolio-card").forEach((card) =>
    card.addEventListener("click", () => {
      activeProject = projectData[card.dataset.project];
      [
        "Category",
        "Title",
        "Overview",
        "Challenge",
        "Solution",
        "Features",
        "Tech",
        "Role",
        "Outcome",
        "Year",
        "Duration",
      ].forEach((name) => {
        const field = document.getElementById(`projectModal${name}`);
        if (field) field.textContent = activeProject[name.toLowerCase()];
      });
      dots.innerHTML = activeProject.images
        .map(
          (_, index) =>
            `<button type="button" aria-label="View project image ${index + 1}"></button>`,
        )
        .join("");
      dots
        .querySelectorAll("button")
        .forEach((dot, index) =>
          dot.addEventListener("click", () => setImage(index)),
        );
      setImage(0);
      projectModal.classList.add("open");
      document.body.classList.add("modal-open");
    }),
  );
  const closeProject = () => {
    projectModal.classList.remove("open");
    document.body.classList.remove("modal-open");
  };
  document
    .getElementById("projectModalClose")
    .addEventListener("click", closeProject);
  document
    .getElementById("projectPrevious")
    .addEventListener("click", () => setImage(activeImage - 1));
  document
    .getElementById("projectNext")
    .addEventListener("click", () => setImage(activeImage + 1));
  projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) closeProject();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProject();
    if (projectModal.classList.contains("open") && event.key === "ArrowLeft")
      setImage(activeImage - 1);
    if (projectModal.classList.contains("open") && event.key === "ArrowRight")
      setImage(activeImage + 1);
  });
}

/* =========================================================
   HERO PARALLAX EFFECT
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 800) {
  document.addEventListener("mousemove", (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 10;

    const y = (event.clientY / window.innerHeight - 0.5) * 10;

    heroVisual.style.transform = `translate(${x}px, ${y}px)`;
  });
}

/* =========================================================
   SMOOTH BUTTON FEEDBACK
========================================================= */

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.97)";
  });

  button.addEventListener("mouseup", () => {
    button.style.transform = "";
  });
});

/* =========================================================
   SERVICE DETAIL CONTENT
========================================================= */

const serviceData = {
  "web-development": {
    number: "01 / WEB DEVELOPMENT",
    title: "Web experiences built for <span>momentum.</span>",
    overview:
      "We design and develop fast, accessible web applications that make your business easier to discover, use and grow.",
    help: "From a focused customer portal to a complete digital platform, InteXcode brings product thinking, engineering discipline and ongoing support together in one delivery team.",
    benefits:
      "Give customers a clearer digital experience, help teams work more efficiently and create a web foundation that can grow with demand.",
    capabilities: [
      [
        "fa-layer-group",
        "Digital platforms",
        "Scalable websites and web applications shaped around real user journeys.",
      ],
      [
        "fa-gauge-high",
        "Performance first",
        "Clean, responsive experiences designed for speed and dependable growth.",
      ],
      [
        "fa-pen-ruler",
        "Product design",
        "Clear interfaces that turn complex workflows into confident actions.",
      ],
      [
        "fa-arrows-rotate",
        "Lifecycle support",
        "Continuous improvements, maintenance and technical guidance after launch.",
      ],
    ],
    technologies: [
      "HTML / CSS",
      "JavaScript",
      "Responsive UI",
      "APIs",
      "Cloud hosting",
    ],
  },
  "mobile-application-development": {
    number: "02 / MOBILE APPLICATION DEVELOPMENT",
    title: "Mobile products people <span>keep using.</span>",
    overview:
      "We create intuitive mobile applications that connect customers, teams and services wherever work happens.",
    help: "InteXcode helps you move from a validated idea to a reliable mobile product with thoughtful UX, maintainable engineering and a clear path for future releases.",
    benefits:
      "Reach people in the moments that matter, improve engagement and put useful services directly into customers' hands.",
    capabilities: [
      [
        "fa-mobile-screen-button",
        "Native experiences",
        "Mobile interfaces tailored to the habits and needs of your audience.",
      ],
      [
        "fa-code-branch",
        "Cross-platform delivery",
        "Efficient product development across the devices your customers use.",
      ],
      [
        "fa-lock",
        "Secure foundations",
        "Authentication, data protection and reliable integrations built in from the start.",
      ],
      [
        "fa-chart-line",
        "Product insight",
        "Analytics and feedback loops that guide useful, measurable improvements.",
      ],
    ],
    technologies: [
      "iOS",
      "Android",
      "Cross-platform",
      "REST APIs",
      "Push notifications",
    ],
  },
  "cloud-devops-solutions": {
    number: "03 / CLOUD & DEVOPS SOLUTIONS",
    title: "Infrastructure that <span>keeps pace.</span>",
    overview:
      "We build secure, observable cloud environments that help teams ship more often with less operational friction.",
    help: "From cloud adoption to deployment automation, InteXcode turns infrastructure into a dependable foundation for your products and your people.",
    benefits:
      "Improve release speed, reduce operational risk and scale infrastructure in step with your business rather than ahead of it.",
    capabilities: [
      [
        "fa-cloud-arrow-up",
        "Cloud adoption",
        "Practical migration and architecture decisions aligned with your business goals.",
      ],
      [
        "fa-gears",
        "Delivery automation",
        "Repeatable pipelines that make releases faster, safer and easier to roll back.",
      ],
      [
        "fa-chart-simple",
        "Observability",
        "Useful monitoring and alerts that make system health visible.",
      ],
      [
        "fa-shield-halved",
        "Resilience",
        "Backups, access controls and recovery planning for continuity.",
      ],
    ],
    technologies: [
      "Cloud architecture",
      "CI/CD",
      "Containers",
      "Monitoring",
      "Infrastructure as code",
    ],
  },
  "it-consulting-strategy": {
    number: "04 / IT CONSULTING & STRATEGY",
    title: "A clearer route from <span>ambition to action.</span>",
    overview:
      "We help leaders make confident technology decisions, prioritize investment and turn business challenges into executable plans.",
    help: "InteXcode brings an outside perspective grounded in delivery. We listen carefully, identify the highest-value opportunities and stay close enough to help make the plan real.",
    benefits:
      "Align teams around a practical direction, focus investment on measurable outcomes and make complex decisions easier to act on.",
    capabilities: [
      [
        "fa-compass",
        "Technology roadmaps",
        "A prioritized, realistic plan for modernizing systems and capabilities.",
      ],
      [
        "fa-magnifying-glass-chart",
        "Discovery workshops",
        "Shared clarity around users, constraints, opportunities and outcomes.",
      ],
      [
        "fa-sitemap",
        "Architecture guidance",
        "Technology choices that balance speed, cost, security and scale.",
      ],
      [
        "fa-people-arrows",
        "Delivery alignment",
        "A practical bridge between business priorities and technical teams.",
      ],
    ],
    technologies: [
      "Discovery",
      "Roadmapping",
      "Architecture",
      "Process design",
      "Delivery planning",
    ],
  },
  "software-testing-quality-assurance": {
    number: "05 / SOFTWARE TESTING & QUALITY ASSURANCE",
    title: "Quality engineered into <span>every release.</span>",
    overview:
      "We make software more dependable through purposeful testing, clear quality practices and earlier feedback.",
    help: "InteXcode integrates quality into the full delivery lifecycle, helping your team release with greater confidence while reducing costly surprises in production.",
    benefits:
      "Protect customer trust, reduce rework and release with confidence through earlier, clearer insight into product quality.",
    capabilities: [
      [
        "fa-list-check",
        "Test strategy",
        "Risk-based coverage designed around your product and release goals.",
      ],
      [
        "fa-bug-slash",
        "Defect prevention",
        "Early validation that catches issues before they become expensive.",
      ],
      [
        "fa-vial-circle-check",
        "Automation",
        "Repeatable checks for the workflows that matter most.",
      ],
      [
        "fa-user-check",
        "User confidence",
        "Accessible, usable experiences that work for the people relying on them.",
      ],
    ],
    technologies: [
      "Functional testing",
      "API testing",
      "Regression",
      "Automation",
      "Quality reporting",
    ],
  },
  "artificial-intelligence": {
    number: "06 / ARTIFICIAL INTELLIGENCE",
    title: "Intelligence with a <span>business purpose.</span>",
    overview:
      "We turn data and automation opportunities into practical AI solutions that improve decisions, productivity and customer experiences.",
    help: "InteXcode helps you identify where intelligent systems can create real value, then designs a responsible path from experiment to useful, measurable capability.",
    benefits:
      "Unlock useful insight, give people time back from repetitive work and create smarter experiences without losing sight of responsibility.",
    capabilities: [
      [
        "fa-wand-magic-sparkles",
        "Applied AI",
        "Solutions focused on a clear business outcome rather than novelty.",
      ],
      [
        "fa-robot",
        "Intelligent automation",
        "Reduce repetitive work and give teams more time for high-value decisions.",
      ],
      [
        "fa-database",
        "Data foundations",
        "Organized, usable data that supports trustworthy insights.",
      ],
      [
        "fa-scale-balanced",
        "Responsible delivery",
        "Transparent, considered systems designed with security and people in mind.",
      ],
    ],
    technologies: [
      "Machine learning",
      "Data workflows",
      "Automation",
      "Analytics",
      "AI strategy",
    ],
  },
};

const serviceTitle = document.getElementById("serviceTitle");
const serviceKey = new URLSearchParams(window.location.search).get("service");
const selectedService =
  serviceData[serviceKey] || serviceData["web-development"];

if (serviceTitle) {
  document.title = `${selectedService.number.split(" / ")[1]} | InteXcode`;
  document.getElementById("serviceNumber").textContent = selectedService.number;
  serviceTitle.innerHTML = selectedService.title;
  document.getElementById("serviceOverview").textContent =
    selectedService.overview;
  document.getElementById("serviceHelp").textContent = selectedService.help;
  document.getElementById("serviceBenefits").textContent =
    selectedService.benefits;
  document.getElementById("serviceCapabilities").innerHTML =
    selectedService.capabilities
      .map(
        (capability) => `
        <article class="service-detail-item">
            <i class="fa-solid ${capability[0]}" aria-hidden="true"></i>
            <h3>${capability[1]}</h3>
            <p>${capability[2]}</p>
        </article>
    `,
      )
      .join("");
  document.getElementById("serviceTechnologies").innerHTML =
    selectedService.technologies
      .map((technology) => `<span>${technology}</span>`)
      .join("");
}
