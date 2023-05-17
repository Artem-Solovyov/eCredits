if (document.querySelector(".wrapper").clientWidth > 319) {
  particlesJS.load("particles-js", "../json/particles.json", function () {});
  particlesJS.load("particles-js-1", "../json/particles.json", function () {});
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
if (!isMobile.any()) {
  document.body.classList.contains("_touch")
    ? document.body.classList.remove("_touch")
    : null;
  document.body.classList.add("_pc");
} else {
  document.body.classList.contains("_pc")
    ? document.body.classList.remove("_pc")
    : null;
  document.body.classList.add("_touch");
}

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

//============Menu burger start=========================================================

const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock"); //stop scroll
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
    e.preventDefault();
  });
}

//============Menu burger end===========================================================

//============fetch start=========================================================
async function loadData() {
  const server = "https://explorer-api.ecredits.com/stats";
  const response = await fetch(server, {
    method: "GET",
  });
  const responseResult = await response.json();
  if (response.ok) {
    const averageBlockTime = responseResult.averageBlockTime;
    const totalTransactions = responseResult.totalTransactions;
    const totalBlocks = responseResult.totalBlocks;
    const walletAddresses = responseResult.walletAddresses;

    document.querySelector(".total-addresses").innerHTML =
      new Intl.NumberFormat("en").format(walletAddresses);
    document.querySelector(".total-blocks").innerHTML = new Intl.NumberFormat(
      "en"
    ).format(totalBlocks);
    document.querySelector(".block-time").innerHTML =
      new Intl.NumberFormat("en").format(averageBlockTime) + " " + "seconds";
    document.querySelector(".total-transaction").innerHTML =
      new Intl.NumberFormat("en").format(totalTransactions);
  }
}
loadData();

const interval = setInterval(loadData, 5000);
window.addEventListener("unload", function () {
  clearInterval(interval);
});
//============fetch end=========================================================

//============Scroll onClick start========================================================

// HTML <a dataset-goto=".class"/>'

const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
if (menuLinks.length > 0) {
  console.log("Hello");
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue =
        gotoBlock.getBoundingClientRect().top +
        scrollY -
        document.querySelector(".header").offsetHeight;

      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock"); //stop scroll
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth",
      });
      e.preventDefault();
    }
  }
}
//============Scroll onClick end========================================================

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
  document.body.classList.remove("._touch");
};
function removeClass(e) {
  if (e.target.closest(".item-use")) {
    e.target.classList.remove("_active");
  }
}
if (window.innerWidth > 1279) {
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
} else if (window.innerWidth > 680) {
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
}

//==========================SWIPER start=======================================

if (document.querySelector(".slider-jobs__body")) {
  new Swiper(".slider-jobs__body", {
    observer: true,
    observeParents: true,
    // centeredSlides: true,
    initialSlide: 0,
    // slidesPerView: 3,
    spaceBetween: 34,
    watchOverflow: true,
    speed: 800,

    pagination: {
      el: ".slider-tips__dotts",
      clickable: true,
    },
    navigation: {
      nextEl: ".slider-jobs .slider-arrow_next",
      prevEl: ".slider-jobs .slider-arrow_prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 16,
      },

      400: {
        slidesPerView: 1.3,
        spaceBetween: 16,
      },
      450: {
        slidesPerView: 1.6,
        spaceBetween: 32,
      },
      520: {
        slidesPerView: 2,
        spaceBetween: 32,
      },
      730: {
        slidesPerView: 2.3,
        spaceBetween: 32,
      },
      930: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
      1120: {
        slidesPerView: 3.3,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });
}
//==========================SWIPER end=======================================
