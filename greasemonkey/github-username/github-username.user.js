// ==UserScript==
// @name        github-username
// @namespace   teleshoes
// @require     file:///home/wolke/greasemonkey/github-username/secret.js
// @include     https://github.com/*
// @version     1
// @grant       none
// ==/UserScript==

baseUrl = "https://github.com"

function main(){
  url = document.URL

  landingPage = isLandingPage()
  targetUserName = getTargetUserName(url)
  userName = getUserName()

  if(landingPage && targetUserName == null && userName == null){
  }

  if(userName != null && targetUserName != null && userName != targetUserName){
    logout();
  }else if(targetUserName != null && /github.com\/login/.exec(url)){
    login(targetUserName)
  }else if(landingPage){
    if(targetUserName == null){
      targetUserName = getTargetUserName(document.referrer)
    }
    if(targetUserName != null){
      newUrl = baseUrl + "/login?" + targetUserName
      window.open(newUrl, '_self', false);
    }
  }
}

function isLandingPage(){
  btns = document.getElementsByClassName('signin')
  if(btns.length == 1 && /\/login$/.exec(btns[0].href)){
    return true;
  }
  return false;
}

function getTargetUserName(url){
  if(/[?\/]teleshoes/.exec(url)){
    return "teleshoes";
  }else if(/[?\/]ewolk/.exec(url)){
    return "ewolk";
  }else{
    return null;
  }
}

function login(userName){
  un = document.getElementById('login_field')
  pw = document.getElementById('password')

  btn = null
  login = document.getElementById('login')
  if(login != null){
    btns = login.getElementsByClassName('button')
    if(btns.length == 1){
      btn = btns[0]
    }
  }

  if(un != null && pw != null && btn != null){
    un.value = userName
    pw.value = secret[userName]
    btn.click()
  }
}

function logout(){
  setTimeout(function(){
    btns = document.getElementsByClassName("sign-out-button")
    if(btns.length == 1){
      btns[0].click()
    }
  }, 500);
}

function getUserName(){
  ul = document.getElementById('user-links')
  if(ul != null){
    as = ul.getElementsByTagName("a")
    if(as.length > 0){
      a = as[0]
      href = a.href
      arr = /\/([a-zA-Z0-9_]+)$/.exec(href)
      if(arr != null && arr.length == 2){
        return arr[1]
      }
    }
  }
  return null
}

main()