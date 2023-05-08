if (document.querySelector(".wrapper").clientWidth > 768) {
  // particlesJS.load("particles-js", "../json/particles.json", function () {});
  // particlesJS.load("particles-js1", "../json/particles.json", function () {});
}

// funcyion is mobile

const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// ibg image

function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}
ibg();

// Animations page-why

window.onload = function () {
  document.addEventListener("click", documentActions);

  function documentActions(e) {
    const targetElement = e.target;
    if (targetElement.classList.contains("item-use")) {
      targetElement.closest(".item-use").classList.toggle("_active");
      targetElement
        .closest(".item-use")
        .addEventListener("mouseleave", removeClass);
    }
  }
};
function removeClass(e) {
  if (e.target.closest(".item-use")) {
    e.target.classList.remove("_active");
  }
}

const blocks = document.querySelectorAll(".item-use");
const bodyBlocks = document.querySelector(".use__body");
const width = bodyBlocks.offsetWidth;
const windowWidth = window.innerWidth;
const res = (windowWidth - width) / 2;

const textBlock = document.querySelector(".item-use__text");
const blockArrow = document.querySelector(".item-use");
const widthBlockArrow = blockArrow.offsetWidth;
const widthBlocks = textBlock.offsetWidth;
document.body.style.setProperty("--widthBlocks", `${widthBlocks}px`);
document.body.style.setProperty(
  "--widthBlocksM",
  `-${widthBlocks + widthBlockArrow - 65}px`
);

if (blocks.length > 0) {
  blocks.forEach((block) => {
    block.classList.remove("_left");
    let blockWidth = block.offsetWidth;
    let textWidth = blockWidth * 2 + 74;
    const pos = block.getBoundingClientRect().left;
    const distance = width - (pos - res + blockWidth - 30);

    if (distance < textWidth) {
      block.classList.add("_left");
    }
  });
}
