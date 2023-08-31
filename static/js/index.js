function changeMode() {
  let element = document.body;
  let button = document.getElementById("lightButton");
  let content = document.getElementById("changeModeA");
  if (content && content.src.includes("lightswitchlight.png")) {
    content.src = "./static/assets/lightswitchdark.png";
    element.className = "light-mode";
    button.className = "lightOn";
  } else {
    content.src = "./static/assets/lightswitchlight.png";
    element.className = "dark-mode";
    button.className = "lightOff";
  }
}

$(window).scroll(function() {
  var wScroll = $(this).scrollTop();
  if ($(window).scrollTop() > 800) {
    $(".parallax").css({ "transform": "translateY(0px)" });
    $(".parallax").css("margin-top", wScroll - 600 + "px");
  } else {
    $(".parallax").css({ "transform": "translate(0px, " + wScroll / 12 + "%)" });
    $(".parallax").css("margin-top", "0px");
  }
});

document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.getElementById("navbar");
  var sticky = navbar ? navbar.offsetTop : 0;

  function stickyGiver() {
    if (window.pageYOffset >= sticky) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", function() {
    stickyGiver();
  });
});