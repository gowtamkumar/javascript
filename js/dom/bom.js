console.log(window.innerHeight);
console.log(window.innerWidth);
console.log(window.scrollY);
console.log(window.location);
console.log(window.locationbar);

console.log(location.href);

// browser navigatiion
console.log(history);
// history.back();
// history.forward();
// history.go(-1);

// navigator Browser & Device Info
// navigator.userAgent;
// navigator.language;
// navigator.onLine;
// navigator.cookieEnabled;

if (/Mobile/.test(navigator.userAgent)) {
  console.log("Mobile user");
}

// screen — Display Info

// screen.width;
// screen.height;
// screen.availWidth;
// screen.availHeight;

// Dialog Boxes
// alert("Hello");
// confirm("Are you sure?");
// prompt("Enter name");

// Timers (Very Important)

// setTimeout(() => {
//   console.log("Run once");
// }, 1000);
// let count = 0;
// const id = setInterval(() => {
//   console.log("Every Seond");
//   console.log(count);

//   count = count + 1;
//   if (count === 10) {
//     clearInterval(id);
//   }
// }, 1000);

// localStorage & sessionStorage
// localStorage
// Persistent
// Max ~5MB
// localStorage.setItem("token", "abc");
// localStorage.getItem("token");
// localStorage.removeItem("token");
// localStorage.clear();

// sessionStorage.setItem("user", "Admin");

// Cookies (BOM Related)
// document.cookie = "token=abc; path=/; expires=Fri, 31 Dec 2026";
// | Storage        | Size | Expiry     |
// | -------------- | ---- | ---------- |
// | Cookie         | ~4KB | manual     |
// | localStorage   | ~5MB | forever    |
// | sessionStorage | ~5MB | tab        |
// | IndexedDB      | huge | persistent |

// window.open & window.close

// const win = window.open("google.com", "_blank");
// win.close();

// Scroll & Resize Events

// window.addEventListener("scroll", () => {
//   console.log(window.scrollY);
// });

// window.addEventListener("resize", () => {
//   console.log(window.innerWidth);
//   console.log(window.innerHeight);
// });

// Online / Offline Detection

window.addEventListener("online", () => {
  console.log("Online");
});

window.addEventListener("offline", () => {
  console.log("Offline");
});
