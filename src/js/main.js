import autoWidth from "./autoWidth.js";
import getData from "./getData.js";
import getViewAvatars from "./getViewAvatars.js";
import doRequestForm from "./doRequestForm.js";

// cookie
const signIn = document.body.querySelectorAll('.sign-in');
const requestBtn = document.body.querySelectorAll('.request-btn');
const requestBtnBottom = document.body.querySelector('.request-btn-bottom');
const dialog = document.body.querySelector('#dialog');
const requestForm = document.forms.requestForm;
const decorativeImg = requestForm.querySelector("#decorativeImg");

requestBtnBottom.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });
});

dialog.addEventListener('click', function(event) {
  this.classList.add('hidden');
});

if (document.cookie.includes('userId')) {
  const cookieArr = document.cookie.split('; ');
  const userNameCookie = cookieArr.find((value) => {
    return value.includes('userName=');
  });
  const userName = userNameCookie.substring(9);
  signIn.forEach(item => {
    item.insertAdjacentText('beforeend', userName);
  });

  requestBtn.forEach(item => {
    item.addEventListener('click', function() {
      dialog.classList.remove('hidden');
      decorativeImg.style.height = otherLabel.offsetHeight + "px";
      otherLabel.classList.toggle("hidden");
    });
  });
} else {
  signIn.forEach(item => {
    item.insertAdjacentText('beforeend', 'Войти');
    item.classList.add('cursor-pointer', 'tablet:hover:text-accent', 'active:text-accent');
    item.setAttribute('tabindex', '0');
    item.addEventListener('click', function() {
      location.assign('./src/php/pages/sign-in.html');
    });
  });

  requestBtn.forEach(item => {
    item.setAttribute('href', './src/php/pages/sign-in.html');
  });
}

// header
const burger = document.body.querySelector("#burger");
const menuProfile = document.body.querySelector("#menuProfile");
const header = document.body.querySelector("header");
const burgerContent = document.body.querySelector("#burgerContent");
const exit = document.body.querySelector('#exit');
const yourRequest = document.body.querySelector('#yourRequest');

if (document.cookie.includes('userId')) {

  if (document.cookie.includes('employee')) {
    yourRequest.innerHTML = `Панель администратора`;
  }

  exit.innerHTML = 'Выход из аккаунта';
  exit.addEventListener('click', function() {
    document.cookie = 'userId=; path=/; max-age=0;';
    document.cookie = 'userName=; path=/; max-age=0;';
    document.cookie = 'employee=; path=/; max-age=0;';
    location.assign('./');
  });
} else {
  const yourProfile = document.body.querySelector('#yourProfile');

  yourRequest.classList.add('hidden');
  yourProfile.classList.add('hidden');
  exit.innerHTML = 'Войти в аккаунт';
  exit.addEventListener('click', function() {
    location.assign('./src/php/pages/sign-in.html');
  });
}

burger.addEventListener("click", function() {
  if (menu.classList.contains('text-accent')) {
    menuProfile.classList.toggle('hidden');
    menu.classList.toggle('text-accent');
  }

  this.classList.toggle("text-accent");
  burgerContent.classList.toggle("hidden");
  burgerContent.classList.toggle("absolute");
  burgerContent.classList.toggle("w-full");
  burgerContent.classList.toggle("h-fit");
  burgerContent.classList.toggle("tablet:w-[70vw]");
  burgerContent.classList.toggle("bg-bg");
  burgerContent.classList.toggle("left-0");
  document.body.classList.toggle("relative");
  burgerContent.classList.toggle("px-container");
  burgerContent.style.top = `${header.offsetHeight}px`;
});

window.addEventListener("resize", function () {
  if (menu.classList.contains('text-accent')) {
    menuProfile.classList.toggle('hidden');
    menu.classList.toggle('text-accent');
  }

  if (burger.classList.contains("text-accent")) {
    burger.classList.toggle("text-accent");
    burgerContent.classList.toggle("hidden");
    burgerContent.classList.toggle("absolute");
    burgerContent.classList.toggle("w-full");
    burgerContent.classList.toggle("bg-bg");
    burgerContent.classList.toggle("left-0");
    document.body.classList.toggle("relative");
    burgerContent.classList.toggle("px-container");
    burgerContent.style.top = `0px`;
  }
});

const menu = document.body.querySelector("#menu");

menu.addEventListener("click", function () {
  if (burger.classList.contains("text-accent")) {
    burger.classList.toggle("text-accent");
    burgerContent.classList.toggle("hidden");
    burgerContent.classList.toggle("absolute");
    burgerContent.classList.toggle("w-full");
    burgerContent.classList.toggle("bg-bg");
    burgerContent.classList.toggle("left-0");
    document.body.classList.toggle("relative");
    burgerContent.classList.toggle("px-container");
    burgerContent.style.top = `0px`;
  }
  
  this.classList.toggle("text-accent");
  menuProfile.classList.toggle('hidden');
  menuProfile.style.top = `${header.offsetHeight}px`;
});

// form

requestForm.addEventListener('click', function(event) {
  event.stopPropagation();
});

requestForm.addEventListener('submit', doRequestForm);

const otherLabel = requestForm.otherDescription.parentElement;

requestForm.address.oninput = autoWidth;

requestForm.otherDescription.oninput = autoWidth;

requestForm.date.onfocus = function () {
  let date = new Date();
  let minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${
    date.getDate() + 1
  }`;
  this.setAttribute("min", minDate);
};

const work = requestForm.querySelector('#work');
const workData = await getData('SELECT workId, working FROM work');
const workPrice = await getData('SELECT workPrice FROM work');

workData.forEach(data => {
  work.insertAdjacentHTML('beforeend',
    `
    <label class="flex gap-5 items-center text-main before:w-15 tablet:before:w-25 tablet:before:h-25 before:block before:h-15 before:bg-checkbox has-[:first-child:checked]:before:bg-checkedbox before:bg-cover">
      <input type="radio" value="${data.workId}" required class="opacity-0 absolute w-15 h-15" name="service">
      ${data.working}
    </label>
    `
  );
});
work.querySelector('[value="1"]').setAttribute('checked', true);
work.querySelector('[value="5"]').setAttribute('id', 'otherService');

const otherService = requestForm.querySelector("#otherService");
const price = requestForm.querySelector("#price");
requestForm.service.forEach((item) => {
  item.onchange = function () {
    price.innerHTML = workPrice[this.value-1].workPrice;
    if (this === otherService) {
      otherLabel.classList.toggle("hidden");
      decorativeImg.classList.add("!hidden");
      requestForm.otherDescription.setAttribute("required", true);
    } else {
      if (!otherLabel.classList.contains("hidden"))
        otherLabel.classList.add("hidden");
      if (decorativeImg.classList.contains("!hidden"))
        decorativeImg.classList.remove("!hidden");
      if (requestForm.otherDescription.hasAttribute("required"))
        requestForm.otherDescription.removeAttribute("required");
    }
  };
});

// about
const aboutInf = document.body.querySelector("#aboutInf");
const aboutData = await getData('SELECT * FROM about');

if (Array.isArray(aboutData)) {
  aboutData.forEach(data => {
    aboutInf.insertAdjacentHTML(
      "beforeend",
      `
      <div class="aboutItem" id="aboutItem-${data.id}">
        <h3 class="col-span-2">${data.title}</h3>
        ${data.image}
        <p class="col-span-3 tablet:col-span-2">${data.description}</p>
      </div>
      `
    );
    const aboutItem = aboutInf.querySelector(`#aboutItem-${data.id}`);
    const currentSVG = aboutItem.querySelector('svg');
    currentSVG.setAttribute('alt', data.alt);
    currentSVG.classList.add('col-span-1', 'col-start-1', 'w-85', 'h-85', 'tablet:order-1', 'tablet:col-start-3', 'tablet:w-full', 'tablet:h-full', 'tablet:row-span-2', 'tablet:row-start-1');
  });
} else {
  aboutInf.insertAdjacentHTML(
    'beforeend',
    `
    <p class="col-span-full">${JSON.parse(aboutData).error}</p>
    `
  );
}

// avatars
await getViewAvatars();