import md5 from "js-md5";
import sha1 from "js-sha1";

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
export default function({ app,$axios, redirect, route }) {
  //   console.log(route)
  // $axios.defaults.baseURL = process.env.baseUrl
  $axios.defaults.timeout = 30000;
  $axios.interceptors.request.use(config => {
    config.headers.Accept = "application/prs.apiFeisu.v1+json";
    let timeStamp = new Date().getTime(),
      randomStr = genRandomStr(false, 35);
    let signature = md5(
      sha1(timeStamp + randomStr + "1DbwtIaBn37k6mcwoNabuO5DfPnjixlEK5krcbH2")
    ).toUpperCase();
    if (app.$cookies.get('token')) {
      config.headers.token = app.$cookies.get('token');
	}
	
    config.headers.timeStamp = timeStamp;
    config.headers.randomStr = randomStr;
    config.headers.signature = signature;
    //console.log(config)
    return config;
  });

  $axios.interceptors.response.use(
    res => {
      return Promise.resolve(res.data);
    },
    err => {
      if (err.response) {
        if (err.response && err.response.data && err.response.data.status_code === 401) {
          redirect({ name: "login" });
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
}
