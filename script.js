
/* =========================================================
   INTEXCORE
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
const navLinks = document.querySelectorAll(".nav-link:not(.nav-dropdown-toggle)");
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


navLinks.forEach(link => {

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

    servicesDropdown.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            closeServicesDropdown();
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".nav-dropdown")) closeServicesDropdown();
    });

    document.addEventListener("keydown", event => {
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

if (sections.length) window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

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

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {

        formMessage.textContent =
            "Please complete the required fields.";

        return;

    }

    formMessage.textContent =
        `Thanks ${name}. Your message has been received.`;

    contactForm.reset();

});


/* =========================================================
   FOOTER YEAR
========================================================= */

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();


/* =========================================================
   HERO PARALLAX EFFECT
========================================================= */

const heroVisual = document.querySelector(".hero-visual");

if (heroVisual && window.innerWidth > 800) {

    document.addEventListener("mousemove", (event) => {

        const x =
            (event.clientX / window.innerWidth - 0.5) * 10;

        const y =
            (event.clientY / window.innerHeight - 0.5) * 10;

        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* =========================================================
   SMOOTH BUTTON FEEDBACK
========================================================= */

document.querySelectorAll(".btn").forEach(button => {

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
        overview: "We design and develop fast, accessible web applications that make your business easier to discover, use and grow.",
        help: "From a focused customer portal to a complete digital platform, InteXcore brings product thinking, engineering discipline and ongoing support together in one delivery team.",
        benefits: "Give customers a clearer digital experience, help teams work more efficiently and create a web foundation that can grow with demand.",
        capabilities: [["fa-layer-group", "Digital platforms", "Scalable websites and web applications shaped around real user journeys."], ["fa-gauge-high", "Performance first", "Clean, responsive experiences designed for speed and dependable growth."], ["fa-pen-ruler", "Product design", "Clear interfaces that turn complex workflows into confident actions."], ["fa-arrows-rotate", "Lifecycle support", "Continuous improvements, maintenance and technical guidance after launch."]],
        technologies: ["HTML / CSS", "JavaScript", "Responsive UI", "APIs", "Cloud hosting"]
    },
    "mobile-application-development": {
        number: "02 / MOBILE APPLICATION DEVELOPMENT",
        title: "Mobile products people <span>keep using.</span>",
        overview: "We create intuitive mobile applications that connect customers, teams and services wherever work happens.",
        help: "InteXcore helps you move from a validated idea to a reliable mobile product with thoughtful UX, maintainable engineering and a clear path for future releases.",
        benefits: "Reach people in the moments that matter, improve engagement and put useful services directly into customers' hands.",
        capabilities: [["fa-mobile-screen-button", "Native experiences", "Mobile interfaces tailored to the habits and needs of your audience."], ["fa-code-branch", "Cross-platform delivery", "Efficient product development across the devices your customers use."], ["fa-lock", "Secure foundations", "Authentication, data protection and reliable integrations built in from the start."], ["fa-chart-line", "Product insight", "Analytics and feedback loops that guide useful, measurable improvements."]],
        technologies: ["iOS", "Android", "Cross-platform", "REST APIs", "Push notifications"]
    },
    "cloud-devops-solutions": {
        number: "03 / CLOUD & DEVOPS SOLUTIONS",
        title: "Infrastructure that <span>keeps pace.</span>",
        overview: "We build secure, observable cloud environments that help teams ship more often with less operational friction.",
        help: "From cloud adoption to deployment automation, InteXcore turns infrastructure into a dependable foundation for your products and your people.",
        benefits: "Improve release speed, reduce operational risk and scale infrastructure in step with your business rather than ahead of it.",
        capabilities: [["fa-cloud-arrow-up", "Cloud adoption", "Practical migration and architecture decisions aligned with your business goals."], ["fa-gears", "Delivery automation", "Repeatable pipelines that make releases faster, safer and easier to roll back."], ["fa-chart-simple", "Observability", "Useful monitoring and alerts that make system health visible."], ["fa-shield-halved", "Resilience", "Backups, access controls and recovery planning for continuity."]],
        technologies: ["Cloud architecture", "CI/CD", "Containers", "Monitoring", "Infrastructure as code"]
    },
    "it-consulting-strategy": {
        number: "04 / IT CONSULTING & STRATEGY",
        title: "A clearer route from <span>ambition to action.</span>",
        overview: "We help leaders make confident technology decisions, prioritize investment and turn business challenges into executable plans.",
        help: "InteXcore brings an outside perspective grounded in delivery. We listen carefully, identify the highest-value opportunities and stay close enough to help make the plan real.",
        benefits: "Align teams around a practical direction, focus investment on measurable outcomes and make complex decisions easier to act on.",
        capabilities: [["fa-compass", "Technology roadmaps", "A prioritized, realistic plan for modernizing systems and capabilities."], ["fa-magnifying-glass-chart", "Discovery workshops", "Shared clarity around users, constraints, opportunities and outcomes."], ["fa-sitemap", "Architecture guidance", "Technology choices that balance speed, cost, security and scale."], ["fa-people-arrows", "Delivery alignment", "A practical bridge between business priorities and technical teams."]],
        technologies: ["Discovery", "Roadmapping", "Architecture", "Process design", "Delivery planning"]
    },
    "software-testing-quality-assurance": {
        number: "05 / SOFTWARE TESTING & QUALITY ASSURANCE",
        title: "Quality engineered into <span>every release.</span>",
        overview: "We make software more dependable through purposeful testing, clear quality practices and earlier feedback.",
        help: "InteXcore integrates quality into the full delivery lifecycle, helping your team release with greater confidence while reducing costly surprises in production.",
        benefits: "Protect customer trust, reduce rework and release with confidence through earlier, clearer insight into product quality.",
        capabilities: [["fa-list-check", "Test strategy", "Risk-based coverage designed around your product and release goals."], ["fa-bug-slash", "Defect prevention", "Early validation that catches issues before they become expensive."], ["fa-vial-circle-check", "Automation", "Repeatable checks for the workflows that matter most."], ["fa-user-check", "User confidence", "Accessible, usable experiences that work for the people relying on them."]],
        technologies: ["Functional testing", "API testing", "Regression", "Automation", "Quality reporting"]
    },
    "artificial-intelligence": {
        number: "06 / ARTIFICIAL INTELLIGENCE",
        title: "Intelligence with a <span>business purpose.</span>",
        overview: "We turn data and automation opportunities into practical AI solutions that improve decisions, productivity and customer experiences.",
        help: "InteXcore helps you identify where intelligent systems can create real value, then designs a responsible path from experiment to useful, measurable capability.",
        benefits: "Unlock useful insight, give people time back from repetitive work and create smarter experiences without losing sight of responsibility.",
        capabilities: [["fa-wand-magic-sparkles", "Applied AI", "Solutions focused on a clear business outcome rather than novelty."], ["fa-robot", "Intelligent automation", "Reduce repetitive work and give teams more time for high-value decisions."], ["fa-database", "Data foundations", "Organized, usable data that supports trustworthy insights."], ["fa-scale-balanced", "Responsible delivery", "Transparent, considered systems designed with security and people in mind."]],
        technologies: ["Machine learning", "Data workflows", "Automation", "Analytics", "AI strategy"]
    }
};

const serviceTitle = document.getElementById("serviceTitle");
const serviceKey = new URLSearchParams(window.location.search).get("service");
const selectedService = serviceData[serviceKey] || serviceData["web-development"];

if (serviceTitle) {
    document.title = `${selectedService.number.split(" / ")[1]} | InteXcore`;
    document.getElementById("serviceNumber").textContent = selectedService.number;
    serviceTitle.innerHTML = selectedService.title;
    document.getElementById("serviceOverview").textContent = selectedService.overview;
    document.getElementById("serviceHelp").textContent = selectedService.help;
    document.getElementById("serviceBenefits").textContent = selectedService.benefits;
    document.getElementById("serviceCapabilities").innerHTML = selectedService.capabilities.map(capability => `
        <article class="service-detail-item">
            <i class="fa-solid ${capability[0]}" aria-hidden="true"></i>
            <h3>${capability[1]}</h3>
            <p>${capability[2]}</p>
        </article>
    `).join("");
    document.getElementById("serviceTechnologies").innerHTML = selectedService.technologies
        .map(technology => `<span>${technology}</span>`).join("");
}
