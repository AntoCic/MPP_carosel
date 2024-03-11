const pathDirImg = "./img" + "/";

const img_carosello = document.getElementById("img_carosello");
const img_carosello_side = document.getElementById("img_carosello_side");
const bt_up = document.getElementById("bt_up");
const bt_down = document.getElementById("bt_down");

let indexCarosello = 0;
let indexCaroselloSecondLast;

addCaroselImg();
async function addCaroselImg() {
  const filenameList = await getfilenameList("../img");

  for (let index = 0; index < filenameList.length; index++) {
    const pathImg = pathDirImg + filenameList[index];
    const img = document.createElement("img");
    img.setAttribute("src", pathImg);
    if (index == 0) {
      img.classList.add("ms_active");
    }
    if (index == filenameList.length - 1) {
      indexCaroselloSecondLast = filenameList.length - 1;
      img.classList.add("ms_second-last");
    }
    img_carosello.appendChild(img);

    const img_boxDiv = document.createElement("div");
    img_boxDiv.classList.add("img_box");
    const img_side = img.cloneNode();
    const div = document.createElement("div");

    img_boxDiv.appendChild(img_side);
    img_boxDiv.appendChild(div);
    img_carosello_side.appendChild(img_boxDiv);
  }

  const imgElementList = document.querySelectorAll("#img_carosello img");
  const imgSideElementList = document.querySelectorAll(
    "#img_carosello_side img"
  );
  const divSideElementList = document.querySelectorAll(
    "#img_carosello_side .img_box div"
  );

  bt_up.addEventListener("click", function () {
    imgElementList[indexCarosello].classList.remove("ms_active");
    imgElementList[indexCarosello].classList.add("ms_second-last");
    imgElementList[indexCaroselloSecondLast].classList.remove("ms_second-last");
    imgSideElementList[indexCarosello].classList.remove("ms_active");
    indexCaroselloSecondLast = indexCarosello;
    if (indexCarosello) {
      indexCarosello--;
    } else {
      indexCarosello = filenameList.length - 1;
    }
    imgElementList[indexCarosello].classList.add("ms_active");
    imgSideElementList[indexCarosello].classList.add("ms_active");
  });

  bt_down.addEventListener("click", function () {
    imgElementList[indexCarosello].classList.remove("ms_active");
    imgElementList[indexCarosello].classList.add("ms_second-last");
    imgElementList[indexCaroselloSecondLast].classList.remove("ms_second-last");
    imgSideElementList[indexCarosello].classList.remove("ms_active");
    indexCaroselloSecondLast = indexCarosello;
    indexCarosello++;
    if (indexCarosello == filenameList.length) {
      indexCarosello = 0;
    }
    imgElementList[indexCarosello].classList.add("ms_active");
    imgSideElementList[indexCarosello].classList.add("ms_active");
  });

  for (let index = 0; index < divSideElementList.length; index++) {
    divSideElementList[index].addEventListener("click", function () {
      imgElementList[indexCarosello].classList.remove("ms_active");
      imgElementList[indexCarosello].classList.add("ms_second-last");
      imgElementList[indexCaroselloSecondLast].classList.remove(
        "ms_second-last"
      );
      imgSideElementList[indexCarosello].classList.remove("ms_active");
      indexCaroselloSecondLast = indexCarosello;
      indexCarosello = index;
      console.log(index);
      imgElementList[indexCarosello].classList.add("ms_active");
      imgSideElementList[indexCarosello].classList.add("ms_active");
    });
  }
}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Lista filename in una determinata dir
async function getfilenameList(dir_path) {
  const formData = new FormData();
  formData.append("dir_path", dir_path);

  return new Promise(function (resolve, reject) {
    fetch("./php/dir.php", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data);
          resolve(data);
        } else {
          reject("Errore nel caricamento dei dati");
        }
      })
      .catch((error) => {
        console.error("Errore: ", error);
        reject(error);
      });
  });
}
