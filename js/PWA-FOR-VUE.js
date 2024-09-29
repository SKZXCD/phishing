document.addEventListener('DOMContentLoaded', function () {
  function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}
function setCookie(cname, cvalue, exdays, others = "") {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/" + others;
}
  const publicKey =
    "BPaFjgpGwBvYm0gHfwW9y49PQyG4TT8mAkq9DGIBCoP33CBHcul59wbf0DQcuitkNsuZV4ytv41rrvwvA5-iCU0";
  let deferredPrompt,
    isPwa =
      navigator.standalone ||
      window.matchMedia("(display-mode: standalone)").matches,
    isPermission =
      "Notification" in window && Notification.permission === "granted";
  window.urlBase64ToUint8Array = function (base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
  window.authorize = function () {
    if ("Notification" in window && !isPermission && !getCookie("Permission")) {
      let isSafariBrowser =
        /Safari/.test(navigator.userAgent) &&
        !/Chrome/.test(navigator.userAgent);
      if (isSafariBrowser) {
        const permission = Notification.permission;
        if (permission === "granted") {
          setCookie("Permission", permission);
        } else {
          setCookie("Permission", null);
        }
      } else {
        setCookie("Permission", null);
      }
    }
  };
  (function () {
    isPermission || authorize();
  })();
  function install_stat(act, act_url) {
    const xhr = new XMLHttpRequest();
    const url = "https://www.igv.com/stat/index";
    const params = "a=" + navigator.standalone +
      "&b=" + window.matchMedia("(display-mode: standalone)").matches +
      "&act=" + act +
      "&req_url=" + act_url;

    xhr.open("GET", url + "?" + params, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200) {
          var data = JSON.parse(xhr.responseText);
          // 在这里处理成功的响应数据
        } else {
          // 在这里处理错误的响应
        }
      }
    };

    xhr.send();
    // $.ajax({
    //   url: "https://www.igv.com/stat/index",
    //   dataType: "json",
    //   async: true,
    //   data: {
    //     a: navigator.standalone,
    //     b: window.matchMedia("(display-mode: standalone)").matches,
    //     act: act,
    //     req_url: act_url,
    //   },
    //   type: "GET",
    //   success: function (data) {},
    //   error: function () {},
    // });
  }
  if (navigator.serviceWorker != null) {
    let sw_version =
      typeof IGV_OPTIONS !== "undefined"
        ? IGV_OPTIONS.PWA_VERSION
        : new Date().toISOString().split("T")[0];
    navigator.serviceWorker
      .register(`/sw.js?v=${sw_version}`, { scope: "/" })
      .then(function (registartion) {
        if ("PushManager" in window && !getCookie("Expired")) {
          registartion.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: window.urlBase64ToUint8Array(publicKey),
            })
            .then(function (pushSubscription) {
              // $.ajax({
              //   url: "https://www.igv.com/stat/subscribe",
              //   dataType: "json",
              //   async: true,
              //   data: JSON.stringify(pushSubscription),
              //   type: "POST",
              //   success: function (data) {
              //     if (data.status == 0) {
              //       getCookie("Expired", true);
              //     } else {
              //       getCookie("Expired", null);
              //     }
              //   },
              //   error: function () {},
              // });
            })
            .catch(function (error) { });
        }
      })
      .catch(function (err) { });
  }
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    window.deferredPrompt = event;
    if (getCookie("8KD6SF6679OH6SFEJ7IU9I9E61") == null) {
      // $(".top_pwa_install").show();
      // let winWidth = $(window).width();
      // if (winWidth <= 991) {
      //   if ($(".top_pwa_install").css("display") !== "none") {
      //     console.info("top_pwa_install show");
      //     $(".head").css("top", $(".top_pwa_install").height() + 22);
      //   }
      //   $(".pwa-more-btn").click(function () {
      //     $(".head").css("top", $(".top_pwa_install").height() + 22);
      //   });
      // }
      const topPwaInstall = document.querySelector('.top_pwa_install');
      const head = document.querySelector('.head');
      const pwaMoreBtn = document.querySelector('.pwa-more-btn');

      function updateHeadTop() {
        const winWidth = window.innerWidth || document.documentElement.clientWidth;
        if (winWidth <= 991 && topPwaInstall.style.display !== 'none') {
          console.info('top_pwa_install show');
          head.style.top = topPwaInstall.offsetHeight + 22 + 'px';
        }
      }

      function handlePwaMoreBtnClick() {
        head.style.top = topPwaInstall.offsetHeight + 22 + 'px';
      }

      if (topPwaInstall) {
        topPwaInstall.style.display = 'block';
        updateHeadTop();

        if (pwaMoreBtn) {
          pwaMoreBtn.addEventListener('click', handlePwaMoreBtnClick);
        }
      }
    }
    if (getCookie("6SD6SF6679OH6SFEJ7IU8856") == null) {
      const topPwaMemberInstall = document.querySelector('.top_pwa_member_install');
      if(topPwaMemberInstall){
        topPwaMemberInstall.classList.remove('hidden');
      }
    }
  });
  // $(".pwa_install").bind("click", function () {
  //   const promptEvent = window.deferredPrompt;
  //   if (!promptEvent) {
  //     return;
  //   }
  //   promptEvent.prompt();
  //   promptEvent.userChoice.then(function (choiceResult) {
  //     if (choiceResult.outcome === "dismissed") {
  //       $(".top_pwa_install").css("display", "none");
  //       setCookie("8KD6SF6679OH6SFEJ7IU9I9E61", "96FIY8GHIJIGG", 1);
  //     }
  //   });
  // });
  const pwaInstallButtons = document.querySelectorAll('.pwa_install');

  function handlePwaInstallClick() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === "dismissed") {
        var topPwaInstall = document.querySelector('.top_pwa_install');
        if (topPwaInstall) {
          topPwaInstall.style.display = "none";
        }
        setCookie("8KD6SF6679OH6SFEJ7IU9I9E61", "96FIY8GHIJIGG", 1);
      }
    });
  }

  if (pwaInstallButtons) {
    pwaInstallButtons.forEach(function (button) {
      button.addEventListener('click', handlePwaInstallClick);
    });
  }
  // $(".pwa_member_install").bind("click", function () {
  //   const promptEvent = window.deferredPrompt;
  //   if (!promptEvent) {
  //     return;
  //   }
  //   promptEvent.prompt();
  //   promptEvent.userChoice.then(function (choiceResult) {
  //     if (choiceResult.outcome === "dismissed") {
  //       $(".top_pwa_member_install").css("display", "none");
  //       setCookie("6SD6SF6679OH6SFEJ7IU8856", "96FIY8GHIJIGG", 1);
  //     }
  //   });
  // });
  var pwaMemberInstallButtons = document.querySelectorAll('.pwa_member_install');

  function handlePwaMemberInstallClick() {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    promptEvent.userChoice.then(function (choiceResult) {
      if (choiceResult.outcome === "dismissed") {
        const topPwaMemberInstall = document.querySelector('.top_pwa_member_install');
        if (topPwaMemberInstall) {
          topPwaMemberInstall.style.display = "none";
        }
        setCookie("6SD6SF6679OH6SFEJ7IU8856", "96FIY8GHIJIGG", 1);
      }
    });
  }

  if (pwaMemberInstallButtons) {
    pwaMemberInstallButtons.forEach(function (button) {
      button.addEventListener('click', handlePwaMemberInstallClick);
    });
  }
  // window.addEventListener("appinstalled", (evt) => {
  //   $(".top_pwa_install").css("display", "none");
  //   $(".top_pwa_member_install").css("display", "none");
  //   install_stat("install", window.location.href);
  // });
  window.addEventListener("appinstalled", function (evt) {
    const topPwaInstall = document.querySelector('.top_pwa_install');
    const topPwaMemberInstall = document.querySelector('.top_pwa_member_install');
    if (topPwaInstall) {
      topPwaInstall.style.display = "none";
    }
    if (topPwaMemberInstall) {
      topPwaMemberInstall.style.display = "none";
    }
    install_stat("install", window.location.href);
  });

  var ua = navigator.userAgent;
  let ipad = ua.match(/(iPad).*OS\s([\d_]+)/i),
    ipod = ua.match(/(iPod).*OS\s([\d_]+)/i),
    iphone = !ipod && !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/i),
    safari = ua.match(/Safari\/([\d.]+)/i),
    chrome = ua.match(/(Chrome|Crios)\/([\d.]+)/i),
    firefox = ua.match(/Fxios\/([\d.]+)/i),
    opera = ua.match(/Opios\/([\d.]+)/i),
    edge = ua.match(/Edgios\/([\d.]+)/i);
  // $(".ios-pwa .pwa-close").click(function () {
  //   $(".pwa.ios-pwa").slideUp("fast");
  //   $("body").removeClass("ios-pwa-top");
  //   setCookie(
  //     "d73295938e71a2c742f313c5504838f9",
  //     "ios-safari-pwa-close",
  //     2,
  //     ";SameSite=Lax",
  //   );
  // });

  const iosPwaCloseButton = document.querySelector('.ios-pwa .pwa-close');
  if (iosPwaCloseButton) {
    iosPwaCloseButton.addEventListener('click', function () {
      const iosPwaElement = document.querySelector('.pwa.ios-pwa');
      if (iosPwaElement) {
        iosPwaElement.style.transition = "height 0.3s ease-in-out";
        iosPwaElement.style.height = "0";
        iosPwaElement.style.padding = "0";
      }
      document.body.classList.remove('ios-pwa-top');
      setCookie(
        'd73295938e71a2c742f313c5504838f9',
        'ios-safari-pwa-close',
        2,
        ';SameSite=Lax'
      );
    });
  }

  if (
    getCookie("d73295938e71a2c742f313c5504838f9") !== "ios-safari-pwa-close" &&
    safari &&
    !(chrome || firefox || opera || edge) &&
    (iphone || ipad) &&
    !window.location.search.substring(1).match(/pwa-launcher/i) &&
    window.outerWidth < 1367 &&
    !window.location.host.match(/igame/i) &&
    !navigator.standalone
  ) {
    document.body.classList.add("ios-pwa-top");
    const pwaIos = document.querySelector(".pwa.ios-pwa");
    if (pwaIos) {
      pwaIos.style.display = "block";
    }
  }
  if (
    window.location.host.match(/igame/i) ||
    window.location.search.substring(1).match(/pwa-launcher/i)
  ) {
    const topPwaInstall = document.querySelector(".top_pwa_install");
    if (topPwaInstall) {
      topPwaInstall.style.display = "none";
    }
    const topPwaMemberInstall = document.querySelector(".top_pwa_member_install");
    if (topPwaMemberInstall) {
      topPwaMemberInstall.style.display = "none";
    }
  }
  if (!(safari && !chrome && ipad)) {
    navigator.serviceWorker.addEventListener("message", function (e) {
      if (e.data) {
        location.href = e.data;
      }
    });
  }
  if (isPwa) {
    // let domain = new RegExp("^http[s]?://[^.]+.([^/]+)", "i");
    // let main = window.location.href.match(domain)[1].toLowerCase();
    // $(document).on("click", "a", function (event) {
    //   if (this.href && main === this.href.match(domain)[1].toLowerCase()) {
    //     if (event.preventDefault) {
    //       event.preventDefault();
    //     } else {
    //       window.event.returnValue = false;
    //     }
    //     window.location = this.href;
    //     return false;
    //   } else {
    //     return true;
    //   }
    // });
    // 为所有 <a> 元素添加点击事件监听器
    let domainRegex = new RegExp("^https?://[^.]+\\.([^/]+)", "i");
    let main = window.location.href.match(domainRegex)[1].toLowerCase();
    const links = document.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (event) {
        // 获取链接的域名部分
        var linkDomain = this.href.match(domainRegex);
        if (linkDomain && main === linkDomain[1].toLowerCase()) {
          event.preventDefault();
          window.location.href = this.href;
          return false;
        } else {
          return true;
        }
      });
    }
    install_stat("open", window.location.href);
    if (!getCookie("Hidden")) {
      var couponPopup = document.querySelector(".coupon-popup");
      if (couponPopup) {
        couponPopup.style.display = "block";
        couponPopup.style.opacity = 0;
        var fadeInInterval = setInterval(function () {
          couponPopup.style.opacity = parseFloat(couponPopup.style.opacity) + 0.05;
          if (couponPopup.style.opacity >= 1) {
            clearInterval(fadeInInterval);
          }
        }, 100);
      }
    }

    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift(); 
    }
  }
})
