function showPage() {
    var body = document.body;

    body.classList.add("all-loaded");
  }
  // $(window).load(function () {
  //   $("body").addClass("all-loaded");
  // });
  let publicID = "";

  const cloudVarsFixedAspect = {
    cloudName: "hlpzpzxut",
    uploadPreset: "s1leq3ti",
    cropping: true,
    width: 300,
    height: 300,
    cropping_aspect_ratio: 1.0,
  };
  const cloudVarsLooseAspect = {
    cloudName: "hlpzpzxut",
    uploadPreset: "s1leq3ti",
    cropping: true,
  };
  let cloudinaryAspect = cloudVarsLooseAspect;

  let listener = window.addEventListener("click", function () {
    const currentURL = window.location.pathname;
    if (currentURL.includes("member") || currentURL.includes("committee")) {
      cloudinaryAspect = cloudVarsFixedAspect;
      var myWidget = cloudinary.createUploadWidget(
        cloudinaryAspect,
        (error, result) => {
          if (!error && result && result.event === "success") {
            document.getElementById("preview_img").src = result.info.url;
            document.getElementById("preview_img").alt =
              result.info.public_id;
            publicID = result.info.public_id;
            document.getElementById("use-image").value = "yes";
            var radios = document.getElementsByName("use-image");
            for (var i = 0, len = radios.length; i < len; i++) {
              var r = radios[i];
              if (r.value === "yes") {
                r.click();
              } else {
              }
            }
          } else {
            console.log(">>>>>>>>>>>" + result.info);
          }
        }
      );
      let myWidgetBTN = document.getElementById("upload_widget");

      myWidgetBTN.addEventListener(
        "click",
        function (event) {
          myWidget.open();
        },
        false
      );
    } else {
      const currentURL = window.location.pathname;
      cloudinaryAspect = cloudVarsLooseAspect;
      var myWidget = cloudinary.createUploadWidget(
        cloudinaryAspect,
        (error, result) => {
          if (!error && result && result.event === "success") {
            document.getElementById("preview_img").src = result.info.url;
            document.getElementById("preview_img").alt =
              result.info.public_id;
            publicID = result.info.public_id;
            document.getElementById("use-image").value = "yes";
            var radios = document.getElementsByName("use-image");
            for (var i = 0, len = radios.length; i < len; i++) {
              var r = radios[i];
              if (r.value === "yes") {
                r.click();
              } else {
              }
            }
          } else {
            console.log(">>>>>>>>>>>" + result.info);
          }
        }
      );
      let myWidgetBTN = document.getElementById("upload_widget");
      if (currentURL.includes("member") || currentURL.includes("committee")) {
        myWidgetBTN.addEventListener(
          "click",
          function (event) {
            myWidget.open();
          },
          false
        );
      }
    }
    if (document.activeElement === document.getElementById("upload_widget")) {
      myWidget.open();
    }
  });

  let radioClickListener = window.addEventListener("click", function () {
    if (document.activeElement.value === "no") {
      if (publicID.length > 1) {
        alert(publicID);
        cloudinary.v2.uploader.destroy(publicID, function (error, result) {
          alert(result + "," + error);
        });
      }
    }
  });

  function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4) {
            if (this.status == 200) {
              elmnt.innerHTML = this.responseText;
            }
            if (this.status == 404) {
              elmnt.innerHTML = "Page not found.";
            }
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        };
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }
    }
  }