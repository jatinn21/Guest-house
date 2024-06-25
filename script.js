"use strict";
// Unsplash keys
const accesskey = "uvMCBAud6hY-UDO6TaE7VJqChZTpvJEZnJO8F-ZHtEo";
const secretKey = "87XSqV-j-BkX314t2gkJPyKv67GrCOr30n5xhGnxeQo";

let overlay = document.querySelector(".overlay");
let photoSection = document.querySelector(".photo-section ");
let locationOption = document.querySelector("#option1");
let amenitiesOption = document.querySelector(".amenities-list");
let laterButtonHeader = document.getElementById("close-button");
let navbar = document.querySelector(".nav-links");

// Later Button is clicked
laterButtonHeader.addEventListener("click", function () {
  var header = document.getElementById("headerContent");
  header.style.transform = "translateY(-200px)";
  header.style.transition = "all ease 5s";
  setTimeout(() => {
    header.parentNode.removeChild(header);
  }, 2000);
});

let clicked = false;
// show the nav when it's clicked in mobile view
function navStatusForMobile() {
  navbar.style.display = clicked ? "none" : "flex";
  clicked = !clicked;
}

// Show the overlay
document.querySelectorAll(".house-card").forEach((card) => {
  card.addEventListener("click", async function () {
    let num = Math.trunc(Math.random() * 10 + 1);
    let { imageUrl, data } = await fetchingImg(num);

    overlay.classList.contains("close") && overlay.classList.remove("close");
    photoSection.style.backgroundImage = `url(${imageUrl})`;

    locationOption.textContent =
      data.results.at(num).user.location || "London, United kingdom";

    amenitiesOption.innerHTML = innerLi;
  });
});

function closeOverlay() {
  overlay.classList.add("close");
  toggleOption(1);
}

// fetching image url
async function fetchingImg(num) {
  let res = await fetch(
    "https://api.unsplash.com/search/photos?query=guest%20house&client_id=uvMCBAud6hY-UDO6TaE7VJqChZTpvJEZnJO8F-ZHtEo&secret_key=87XSqV-j-BkX314t2gkJPyKv67GrCOr30n5xhGnxeQo"
  );
  let data = await res.json();
  console.log(data);
  let imageUrl = data.results.at(num).urls.raw;
  return { data, imageUrl };
}

// Function to handle responsive element switching
function adjustHeaderElement() {
  var headerContent = document.getElementById("headerContent");
  var currentElement = headerContent.querySelector(".header-item");

  if (window.innerWidth < 600) {
    // Check if current element is already an anchor tag
    console.log(currentElement.tagName);
    if (currentElement.tagName !== "a") {
      // Create new anchor tag with SVG icon
      var newElement = document.createElement("a");
      newElement.setAttribute("href", "#");
      newElement.classList.add("header-item");
      newElement.innerHTML = `<svg id='Dog_House_24' width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'
                    xmlns:xlink='http://www.w3.org/1999/xlink'>
                    <rect width='24' height='24' stroke='none' fill='#000000' opacity='0' />


                    <g transform="matrix(0.85 0 0 0.85 12 12)">
                        <path
                            style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: rgb(0,0,0); fill-rule: nonzero; opacity: 1;"
                            transform=" translate(-12, -11.3)"
                            d="M 12 0.59375 L 11.28125 1.28125 L 0.28125 12.28125 L 1.71875 13.71875 L 12 3.4375 L 22.28125 13.71875 L 23.71875 12.28125 L 12.71875 1.28125 Z M 12 5.3125 L 3 14.3125 L 3 22 L 8 22 L 8 17 C 8 14.800781 9.800781 13 12 13 C 14.199219 13 16 14.800781 16 17 L 16 22 L 21 22 L 21 14.3125 Z"
                            stroke-linecap="round" />
                    </g>
                </svg>`;

      // Replace current element with new anchor tag
      headerContent.replaceChild(newElement, currentElement);
    }
  } else {
    // Check if current element is already a span
    if (currentElement.tagName !== "span") {
      // Create new span element
      var newElement = document.createElement("span");
      newElement.classList.add("header-item");
      newElement.textContent =
        "Explore our guest houses in different locales to find your perfect retreat.";

      // Replace current element with new span
      headerContent.replaceChild(newElement, currentElement);
    }
  }
}

// Initial call to adjust element on page load
adjustHeaderElement();

// Event listener to adjust element on window resize
window.addEventListener("resize", adjustHeaderElement);

// Create a GSAP timeline for the animations
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: "nav", // Trigger animation when this element is in view
    start: "top center", // Start animation when top of trigger element reaches top of viewport
    scrub: 3, // Smooth  effect
  },
});

tl.from("video", {
  width: "110%",
  top: "0%",
  start: "center",
  // scaleX: 3, // Scale back to original size
  x: 0, // Center horizontally
  y: 0, // Center vertically
  duration: 6, // Animation duration in seconds
  ease: "power2.out", // Easing function for smooth animation
});

// Add animations to the timeline
tl.to("video", {
  // scale: 2,
  top: "10%",
  width: "68%",
  x: 0, // Center horizontally
  y: 0, // Center vertically
  duration: 3, // Animation duration in seconds
  ease: "power2.out", // Easing function for smooth animation
});

// loading late effect
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});
const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((entry) => observer.observe(entry));

// toggle effect :
function toggleOption(optionId) {
  // Get all option elements and arrows
  const options = document.querySelectorAll(".option");
  const arrows = document.querySelectorAll(".arrow");

  // Hide all options and reset arrows
  options.forEach((option) => {
    option.classList.remove("open");
    option.style.maxHeight = "0";
    option.style.padding = "0 30px";
  });
  arrows.forEach((arrow) => {
    arrow.classList.remove("up");
    arrow.classList.add("down");
  });

  // Get the selected option and arrow
  const selectedOption = document.getElementById(optionId);
  const selectedArrow = document
    .querySelector(`#${optionId}`)
    .previousElementSibling.querySelector(".arrow");

  // Show the selected option if it is not already open
  if (!selectedOption.classList.contains("open")) {
    selectedOption.classList.add("open");
    selectedOption.style.maxHeight = selectedOption.scrollHeight + "px";
    selectedOption.style.padding = "10px 30px";
    selectedArrow.classList.remove("down");
    selectedArrow.classList.add("up");
  }
}

toggleOption();
