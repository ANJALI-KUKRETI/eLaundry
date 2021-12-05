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

//=====================json=======================
let jsonObj = [];
function savetoLocal(e) {
  e.preventDefault();
  let temp = {
    userName: userS.value,
    email: emailS.value,
    password: passS.value,
    login: false,
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
  // welcome.innerHTML = element.userName;
  welcome.forEach((x) => (x.innerHTML = element.userName));
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
