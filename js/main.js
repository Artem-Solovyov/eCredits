window.addEventListener("load", loaded);
const bodyEl = document.body;
function loaded() {
  bodyEl.classList.add("loaded");
}

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

if (isMobile.any()) {
  document
    .querySelector(".nav__item_click")
    .addEventListener("click", function (e) {
      e.preventDefault();
      document
        .querySelector(".nav__item")

        .classList.toggle("_active");
    });
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
//============animation start===========================================================

const animItems = document.querySelectorAll("._anim-item");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeigth = animItem.offsetHeight;
      const animItemOffset = animItem.getBoundingClientRect().top + scrollY;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeigth / animStart;

      if (animItemHeigth > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        scrollY > animItemOffset - animItemPoint &&
        scrollY < animItemOffset + animItemHeigth
      ) {
        animItem.classList.add("_active");
      } else {
        if (!animItem.classList.contains("_anim-no-hide"))
          // не прятать после прокрутки
          animItem.classList.remove("_active");
      }
    }
  }
  setTimeout(() => {
    animOnScroll();
  }, 400);
}
//============animation end===========================================================
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

const menuLinks = document.querySelectorAll("[data-goto]");
if (menuLinks.length > 0) {
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
      el: ".slider-jobs__dotts",
      clickable: true,
    },
    // navigation: {
    //   nextEl: ".slider-jobs .slider-arrow_next",
    //   prevEl: ".slider-jobs .slider-arrow_prev",
    // },
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
//=========================POPUp form start===================================

const popupLinks = document.querySelectorAll("[data-popup]");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;
const timeout = 300;

if (popupLinks.length > 0) {
  popupLinks.forEach((popupLink) => {
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute("data-popup").replace("#", "");
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  });
}

const popupCloseIcon = document.querySelectorAll(".form-callback__close");
if (popupCloseIcon.length > 0) {
  popupCloseIcon.forEach((el) => {
    el.addEventListener("click", function (e) {
      popupClose(el.closest(".callback"));
      e.preventDefault();
    });
  });
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector(".callback.open");
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest(".callback__form")) {
        popupClose(e.target.closest(".callback"));
      }
    });
  }
}
function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  if (lockPadding.length > 0) {
    lockPadding.forEach((el) => {
      el.style.paddingRight = lockPaddingValue;
    });
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}
function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      lockPadding.forEach((el) => {
        el.style.paddingRight = "0px";
      });
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}
document.addEventListener("keydown", function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector(".popup.open");
    popupClose(popupActive);
  }
});

//=========================POPUp form end===================================

//========================= Lotti start===============================

const anim = lottie;

anim.loadAnimation({
  container: document.querySelector("#ready__anim"),
  rendere: "svg",
  loop: true,
  autoplay: true,
  path: "../json/anim_block.json",
});
anim.loadAnimation({
  container: document.querySelector("#preloader"),
  rendere: "svg",
  loop: true,
  autoplay: true,
  path: "../json/ecredits.json",
});

//========================= Lotti end===============================

//======================Form start===================================

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  let message = "";
  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      form.classList.add("_sending");

      let tk = "";

      grecaptcha.ready(function () {
        grecaptcha
          .execute("6LcpEiImAAAAADUypC8gn0C4ycvPJWgH_wsMmwx1", {
            action: "homepage",
          })
          .then(function (token) {
            tk = token;
            document.getElementById("token").value = token;

            let formData = new FormData(form);

            fetch("send.php", {
              method: "post",
              body: formData,
            })
              .then((response) => response.json())
              .then((result) => {
                if (result["om_score"] >= 0.5) {
                  console.log(result["om_score"]);
                  // submit form
                  document.querySelector(".callback").classList.remove("open");
                  form.classList.remove("_sending");
                } else {
                  form.classList.remove("_sending");
                }
              });
          });
      });

      // let newForm = new FormData(document.getElementById("form"));
      // let response = await fetch("../sendmail.php", {
      //   method: "POST",
      //   body: newForm,
      // });
      // if (response.ok) {
      //   let result = await response.json();
      //   alert(result.message);
      //   document.querySelector(".callback").classList.remove("open");
      //   form.classList.remove("_sending");
      // } else {
      //   alert("Error");
      //   form.classList.remove("_sending");
      // }
    } else {
      alert(message.length > 0 ? message : "Fill in the required fields");
    }
  }

  function formValidate(form) {
    let error = 0;

    let formReq = document.querySelectorAll("._req");

    formReq.forEach((input, index) => {
      formRemoveError(input);

      if (input.value === "") {
        formAddError(input);
        error++;
      } else {
        if (input.classList.contains("_email")) {
          if (emailTest(input)) {
            formAddError(input);
            error++;
            message = "Mail is invalid";
          }
        }
      }
    });
    return error;
  }
  // add class error
  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }
  // remove class error
  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
  // Email validation
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }
});

//======================Form end===================================
