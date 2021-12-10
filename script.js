const signupBtn = document.querySelectorAll(".btn_signup");
const loginBtn = document.querySelectorAll(".btn_login");
const signup = document.querySelector(".form_signup");
const login = document.querySelector(".form_login");
const userS = document.querySelector(".users");
const emailS = document.querySelector(".emails");
const passS = document.querySelector(".passwords");
const emailD = document.querySelector(".emaill");
const passD = document.querySelector(".passwordl");
const outer = document.querySelector(".outer");
const innerUI = document.querySelector(".innerUI");
const logoutbtn = document.querySelector(".logout");
const welcome = document.querySelectorAll(".welcome");
const righty = document.querySelectorAll(".righty");
const minus = document.querySelectorAll(".btn-left");
const plus = document.querySelectorAll(".btn-right");
const cartBtn = document.querySelector(".cart-btn");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closemodal = document.querySelector(".close-modal");
const done = document.querySelector(".last");
const checkout = document.querySelector(".checkout");
const btn_done = document.querySelector(".btn-done");
const quan = document.querySelectorAll(".quan");
//===========Event Listeners============
logoutbtn.addEventListener("click", logout);

//=============Display logged in user on page refresh=============
document.addEventListener("DOMContentLoaded", function () {
  let usersData = JSON.parse(localStorage.getItem("inputvalues")) || [];
  usersData.forEach(function (ele) {
    if (ele.login == true) loggedInUser(ele);
  });
});

//================Login button====================================
loginBtn.forEach(function (element) {
  if (element.classList.contains("btn-active")) {
    element.addEventListener("click", checkAndDisplay);
  } else {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      login.classList.remove("hidden");
      signup.classList.add("hidden");
      let current = document.querySelector(".btn-active");
      current.classList.remove("btn-active");
      this.classList.add("btn-active");
    });
  }
});

//====================signup button=============================
signupBtn.forEach(function (element) {
  if (element.classList.contains("btn-active"))
    element.addEventListener("click", savetoLocal);
  else {
    element.addEventListener("click", function (e) {
      e.preventDefault();
      login.classList.add("hidden");
      signup.classList.remove("hidden");
      let current = document.querySelector(".btn-active");
      current.classList.remove("btn-active");
      this.classList.add("btn-active");
    });
  }
});

cartBtn.addEventListener("click", function () {
  modal.classList.remove("hidden");
  innerUI.classList.add("hidden");
});
closemodal.addEventListener("click", function () {
  modal.classList.add("hidden");
  innerUI.classList.remove("hidden");
});
btn_done.addEventListener("click", function () {
  done.classList.add("hidden");
  modal.classList.add("hidden");
  innerUI.classList.remove("hidden");
});

checkout.addEventListener("click", function () {
  modal.classList.add("hidden");
  done.classList.remove("hidden");
});

// washCart.addEventListener("click", function () {
//   openWash.classList.toggle("hidden");
// });
// ironCart.addEventListener("click", function () {
//   openIron.classList.toggle("hidden");
// });
// dryCart.addEventListener("click", function () {
//   openDry.classList.toggle("hidden");
// });
// //=====================json=======================
let jsonObj = [];
function savetoLocal(e) {
  e.preventDefault();
  let temp = {
    userName: userS.value,
    email: emailS.value,
    password: passS.value,
    login: false,
    wash: [
      { category: "shirtW", quantity: 0, price: 15, total: 0 },
      { category: "jeansW", quantity: 0, price: 30, total: 0 },
      { category: "tshirtW", quantity: 0, price: 15, total: 0 },
      { category: "dressW", quantity: 0, price: 30, total: 0 },
      { category: "jacketW", quantity: 0, price: 40, total: 0 },
      { category: "sweaterW", quantity: 0, price: 30, total: 0 },
      { category: "socksW", quantity: 0, price: 5, total: 0 },
      { category: "shoesW", quantity: 0, price: 50, total: 0 },
      { category: "blanketW", quantity: 0, price: 50, total: 0 },
    ],
    iron: [
      { category: "shirtI", quantity: 0, price: 10, total: 0 },
      { category: "jeansI", quantity: 0, price: 10, total: 0 },
      { category: "tshirtI", quantity: 0, price: 10, total: 0 },
      { category: "dressI", quantity: 0, price: 10, total: 0 },
      { category: "jacketI", quantity: 0, price: 10, total: 0 },
    ],
    dry: [
      { category: "blanketD", quantity: 0, price: 100, total: 0 },
      { category: "sweaterD", quantity: 0, price: 50, total: 0 },
      { category: "coatD", quantity: 0, price: 50, total: 0 },
      { category: "ethnicD", quantity: 0, price: 50, total: 0 },
    ],
  };
  if (!temp.userName || !temp.email || !temp.password) {
    alert("Please enter the data");
    jsonObj = JSON.parse(localStorage.getItem("inputvalues")) || [];
    localStorage.setItem("inputvalues", JSON.stringify(jsonObj));
  } else {
    jsonObj = JSON.parse(localStorage.getItem("inputvalues")) || [];
    jsonObj.push(temp);
    localStorage.setItem("inputvalues", JSON.stringify(jsonObj));
  }
  userS.value = "";
  emailS.value = "";
  passS.value = "";
}

//==================functions================

function checkAndDisplay(e) {
  e.preventDefault();
  let usersData = JSON.parse(localStorage.getItem("inputvalues")) || [];
  if (emailD.value && passD.value) {
    usersData.forEach(function (element) {
      if (element.email == emailD.value && element.password == passD.value) {
        loggedInUser(element);
        element.login = true;
        emailD.value = "";
        passD.value = "";
      }
    });
  } else {
    alert("Not valid Login credentials");
  }
  localStorage.setItem("inputvalues", JSON.stringify(usersData));
}

function loggedInUser(element) {
  outer.classList.add("hidden");
  innerUI.classList.remove("hidden");

  welcome.forEach((x) => (x.innerHTML = element.userName));
  reLoad(element);
  minus.forEach(function (e) {
    e.addEventListener("click", decrease);
  });

  plus.forEach(function (e) {
    e.addEventListener("click", increase);
  });
}

function reLoad(element) {
  category(element.wash);
  category(element.iron);
  category(element.dry);
}
function category(temp) {
  for (let i = 0; i < temp.length; i++) {
    // console.log(temp[i].category);
    quan.forEach((ele) => {
      if (ele.parentNode.parentNode.classList.contains(temp[i].category)) {
        ele.innerHTML = temp[i].quantity;
      }
    });
  }
}

//===============logout button==========
function logout(e) {
  e.preventDefault();
  let usersData = JSON.parse(localStorage.getItem("inputvalues")) || [];
  usersData.forEach(function (element) {
    if (element.login == true) {
      element.login = false;
      outer.classList.remove("hidden");
      innerUI.classList.add("hidden");
    }
  });
  localStorage.setItem("inputvalues", JSON.stringify(usersData));
}

//plus-minus
function increase(e) {
  e.preventDefault();
  let usersData = JSON.parse(localStorage.getItem("inputvalues")) || [];

  let [current] = usersData.filter((user) => user.login == true);
  let temp;
  let cat = e.target.parentNode.parentNode.classList[1];
  let letter = cat.slice(-1);
  if (letter == "W") temp = current.wash;
  else if (letter == "I") temp = current.iron;
  else if (letter == "D") temp = current.dry;
  // console.log(current);

  for (let i = 0; i < temp.length; i++) {
    if (e.target.parentNode.parentNode.classList.contains(temp[i].category)) {
      if (e.target.parentNode.childNodes[3].className == "quan") {
        const t = e.target.parentNode.childNodes[3];
        const price =
          e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerHTML.slice(
            1
          );
        t.innerHTML++;
        temp[i].quantity = t.innerHTML;
        temp[i].total = Number(price) * Number(t.innerHTML);
        localStorage.setItem("inputvalues", JSON.stringify(usersData));
      }
    }
  }
}

function decrease(e) {
  e.preventDefault();
  let usersData = JSON.parse(localStorage.getItem("inputvalues")) || [];

  // console.log(current);
  let [current] = usersData.filter((user) => user.login == true);
  let temp;
  let cat = e.target.parentNode.parentNode.classList[1];
  let letter = cat.slice(-1);
  if (letter == "W") temp = current.wash;
  else if (letter == "I") temp = current.iron;
  else if (letter == "D") temp = current.dry;
  for (let i = 0; i < temp.length; i++) {
    if (e.target.parentNode.parentNode.classList.contains(temp[i].category)) {
      if (e.target.parentNode.childNodes[3].className == "quan") {
        const t = e.target.parentNode.childNodes[3];
        const price =
          e.target.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[3].innerHTML.slice(
            1
          );
        if (t.innerHTML == 0) {
          t.innerHTML = 0;
        } else {
          t.innerHTML--;
          // console.log(temp[i].quantity);
          temp[i].quantity = t.innerHTML;
          temp[i].total = Number(price) * Number(t.innerHTML);
          localStorage.setItem("inputvalues", JSON.stringify(usersData));
        }
      }
    }
  }
}
