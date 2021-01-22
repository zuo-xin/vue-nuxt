
import md5 from "js-md5";
import sha1 from "js-sha1";

import axios from "axios";
//import Loading from "@/components/common/Loading";
//import router from "@/router";
//import { Toast } from "vant";
//import fsTransLang from "./fsTransLang.js";


function genRandomStr(randomFlag, min, max) {
  var str = "",
    range = min,
    arr = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    let pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}

function buildQueryString(data) {
  let s = "";
  if (data instanceof Array) {
    for (let i = 0; i < data.length; i++) {
      sub(data[i]);
    }
  } else {
    sub(data);
  }
  return s;
  function sub(d) {
    for (let n in d) {
      if (s) {
        s += "&";
      }
      s += d[n] === undefined ? encodeURIComponent(n) : encodeURIComponent(n) + "=" + encodeURIComponent(d[n]);
    }
  }
}
const instance = axios.create({
  withCredentials: false,
  headers: {
    Accept: "application/prs.apiFeisu.v1+json"
  },
  timeout: 100000
});
instance.interceptors.request.use(config => {
  let timeStamp = new Date().getTime(),
    randomStr = genRandomStr(false, 35);
  let signature = md5(
    sha1(timeStamp + randomStr + "1DbwtIaBn37k6mcwoNabuO5DfPnjixlEK5krcbH2")
  ).toUpperCase();
  let token =''; //localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  const languageId = '';//localStorage.getItem("languageId") || "";
  config.headers.timeStamp = timeStamp;
  config.headers.randomStr = randomStr;
  config.headers.signature = signature;
  config.headers.languageId = languageId;
  

  const lang = '';//localStorage.getItem("lang") || "";


  if (config.data) {
    if (config.data instanceof FormData) {
      if (config.data.has && config.data.get) {
        if (config.data.has("silent") && config.data.get("silent") === "true") {
          //config.data.delete("silent");
        } else {
          //Loading.show();
        }
      }
      if(lang && (lang === "tw" || lang === "hk" || lang === "mo")){
        config.data.append("lang",lang)
      }
      config.headers["Content-Type"] = "multipart/form-data";
      
    } else {
      if (config.data.silent) {
        //delete config.data.silent;
      } else {
        //Loading.show();
      }
      
      if(lang && (lang === "tw" || lang === "hk" || lang === "mo")){
        config.data.lang = lang
      }
      config.data = JSON.stringify(config.data);
      config.headers["Content-Type"] = "application/json";
    }
  } else {
    if(lang && (lang === "tw" || lang === "hk" || lang === "mo")){
      config.data = {
        lang,
      }
      config.data = JSON.stringify(config.data);
      config.headers["Content-Type"] = "application/json";
    }
    //Loading.show();
  }
 
  return config;
});
instance.interceptors.response.use(
  res => {
   
    if (res.config.data) {
      if (res.config.data instanceof FormData) {
        if (res.config.data.has && res.config.data.get) {
          if (res.config.data.has("silent") && res.config.data.get("silent") === "true") {
          } else {
            //Loading.hide();
          }
        }
      } else {
        let obj;
        try {
          if (typeof JSON.parse(res.config.data) == "object") {
            obj = JSON.parse(res.config.data);
          }
        } catch (e) {}
        if (obj && obj.silent) {
        } else {
          //Loading.hide();
        }
      }
    } else {
      //Loading.hide();
    }
    return Promise.resolve(res.data);
  },
  err => {
   
    if (err.data) {
      if (err.data instanceof FormData) {
        if (err.data.has && err.data.get) {
          if (err.data.has("silent") && err.data.get("silent") === "true") {
          } else {
            //Loading.hide();
          }
        }
      } else {
        let obj;
        try {
          if (typeof JSON.parse(err.data) == "object") {
            obj = JSON.parse(err.data);
          }
        } catch (e) {}
        if (obj && obj.silent) {
        } else {
          //Loading.hide();
        }
      }
    } else {
      //Loading.hide();
    }
    if (err.response) {
      if (err.response && err.response.data && err.response.data.status_code === 401) {
        // localStorage.removeItem("token")
        // localStorage.removeItem("cartId")
        //Toast(fsTransLang("请先登录"));
        setTimeout(() => {
          //const currentPath = router.history.current.fullPath;
          //router.replace({ name: "login", query: { redirect: currentPath }});
          return;
        }, 500);
      } else if (err.response && err.response.data && err.response.data.status_code === 422) {
        //return Promise.reject(err.response.data);
      } else {
        if (err.response.data.message) {
          //Toast(err.response.data.message);
        }
      }
      return Promise.reject(err.response.data);
    }
  }
);



export default ({ app }, inject) => {
  inject('axios', instance)
}
