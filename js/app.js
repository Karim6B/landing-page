/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const sectionsUl = document.querySelectorAll("section");
const navUl = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
// building an observer which adds an active class to the section when in viewport
let observer = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting === true) {
      entries[0].target.classList.add("your-active-class");
    } else {
      entries[0].target.classList.remove("your-active-class");
    }
  },
  { threshold: [0.5] }
);

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav

const buildNav = () => {
  // iterating over the sections and building a li and anchor elements to make a navbar link for each section
  sectionsUl.forEach((el) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    const hrefAttribute = document.createAttribute("href");
    hrefAttribute.value = el.id;
    a.setAttributeNode(hrefAttribute);
    a.textContent = el.dataset.nav;
    li.appendChild(a);
    navUl.appendChild(li);
  });
};

// Add class 'active' to section when near top of viewport

const activate = () => {
  sectionsUl.forEach((el) => {
    observer.observe(el);
  });
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = () => {
  const anchors = document.querySelectorAll("a");
  anchors.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      // select the section whose ID is the same as the href attribute of the clicked link
      const section = document.querySelector(
        `#${e.target.getAttribute("href")}`
      );
      section.scrollIntoView({ behavior: "smooth" });
    });
  });
};
/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click
scrollToSection();
// Set sections as active
activate();
