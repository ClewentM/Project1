/* = burger-menu onset
----------------------------------------------- */
const inputElement = document.querySelector('input[type="checkbox"].toggle-btn');
const targetElement = document.querySelector('.menu');

inputElement.addEventListener('change', () => {
    if (inputElement.checked) {
        targetElement.style.display = 'flex';
      } else {
        targetElement.style.display = 'none';
      }
});

/* = up button onset (only while scroll up) + smooth scroll
for the smooth scroll : the last value on line 41 is used to modified the speed
----------------------------------------------- */
let previousScrollTop = 0;

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  let currentScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  if (currentScrollTop < previousScrollTop && currentScrollTop > 200) {
    document.getElementById("up-button").style.display = "block";
  } else {
    document.getElementById("up-button").style.display = "none";
  }
  previousScrollTop = currentScrollTop;
}

document.getElementById("up-button").addEventListener("click", function() {
    smoothScrollToTop();
  });
  
  function smoothScrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(smoothScrollToTop);
      window.scrollTo(0, c - c / 16);
    }
  }
  
/* = smooth effect for each clickable area on the map
----------------------------------------------- */
function smoothScrollToAnchor(anchorId) {
    const anchorElement = document.getElementById(anchorId);
    const scrollTargetY = anchorElement.offsetTop;
  
    let currentY = window.pageYOffset;
    let targetY = scrollTargetY - currentY;
    let speed = 1000;  // Duration of animation in milliseconds
  
    let easing = function(t) {
      return t * (2 - t);
    };
  
    let start;
    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      let time = timestamp - start;
      let percent = Math.min(time / speed, 1);
      percent = easing(percent);
  
      window.scrollTo(0, currentY + targetY * percent);
      if (time < speed) {
        window.requestAnimationFrame(step);
      }
    });
  }
  

document.querySelectorAll("area").forEach(function(area) {
    area.addEventListener("click", function() {
      smoothScrollToAnchor(area.getAttribute("href").substring(1));
    });
  });
  
  