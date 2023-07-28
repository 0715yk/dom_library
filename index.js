const bookDataClosure = (function () {
  let length = 0;
  let selectFilter = "-1";
  let sortFilter = "-1";
  let searchInput = "";
  const bodyElement = document.querySelector("#tableBody");

  return {
    len: length,
    addBook: function () {
      const tr = document.createElement("tr");

      const idNum = document.createElement("td");
      const bookName = document.createElement("td");
      const isReservedOn = document.createElement("td");
      const deleteBtn = document.createElement("td");
      const inputElement = document.createElement("input");
      const deleteBtnElement = document.createElement("button");
      deleteBtnElement.className = "deleteBtn";
      deleteBtnElement.textContent = "삭제";
      inputElement.type = "checkbox";
      inputElement.addEventListener("change", function (e) {
        const arr = tr.id.split("_");
        arr[2] = e.target.checked ? "1" : "0";
        tr.setAttribute("id", arr.join("_"));

        if (selectFilter === "-1" || selectFilter !== arr[2]) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }
      });
      idNum.textContent = length;

      const bookNameInputElement = document.querySelector("#bookNameInput");
      bookName.textContent = bookNameInputElement.value;
      isReservedOn.appendChild(inputElement);
      deleteBtn.appendChild(deleteBtnElement);

      deleteBtnElement.addEventListener("click", function () {
        bodyElement.removeChild(tr);
      });

      tr.appendChild(idNum);
      tr.appendChild(bookName);
      tr.appendChild(isReservedOn);
      tr.appendChild(deleteBtn);
      tr.id = `${length}_${bookNameInputElement.value}_0`;
      if (selectFilter === "0") {
        tr.style.display = "none";
      }
      bodyElement.appendChild(tr);
      bookNameInputElement.value = "";
      length++;
    },
    //   -1, 0, 1
    //   ""  etc
    setFilter: function (filterNum) {
      for (let i = 0; i < bodyElement.children.length; i++) {
        const trElement = bodyElement.children[i];
        if (filterNum === "-1") {
          if (searchInput === "") {
            trElement.style.display = "";
          } else {
            if (trElement.children[1].innerText.includes(searchInput)) {
              trElement.style.display = "";
            } else {
              trElement.style.display = "none";
            }
          }
        } else {
          const flag = trElement.id.split("_")[2];
          if (flag !== filterNum) {
            if (searchInput === "") {
              trElement.style.display = "";
            } else {
              if (trElement.children[1].innerText.includes(searchInput)) {
                trElement.style.display = "";
              } else {
                trElement.style.display = "none";
              }
            }
          } else {
            trElement.style.display = "none";
          }
        }
      }
    },
    setFilterNum: function (num) {
      selectFilter = num;
    },
    setSortNum: function (num) {
      sortFilter = num;
    },
    sort: function () {
      if (sortFilter === "0") {
        [...bodyElement.children]
          .sort((a, b) => {
            const bookNameNode1 = a.children[1];
            const bookNameNode2 = b.children[1];
            return bookNameNode1.innerText > bookNameNode2.innerText
              ? 1
              : bookNameNode1.innerText < bookNameNode2.innerText
              ? -1
              : 0;
          })
          .forEach((node) => bodyElement.appendChild(node));
      } else if (sortFilter === "1") {
        [...bodyElement.children]
          .sort((a, b) => {
            const bookNameNode1 = a.children[1];
            const bookNameNode2 = b.children[1];
            return bookNameNode1.innerText < bookNameNode2.innerText
              ? 1
              : bookNameNode1.innerText > bookNameNode2.innerText
              ? -1
              : 0;
          })
          .forEach((node) => bodyElement.appendChild(node));
      } else {
        [...bodyElement.children]
          .sort((a, b) => {
            const idNumNode1 = a.children[0];
            const idNumNode2 = b.children[0];
            return parseInt(idNumNode1.innerText) >
              parseInt(idNumNode2.innerText)
              ? 1
              : parseInt(idNumNode1.innerText) < parseInt(idNumNode2.innerText)
              ? -1
              : 0;
          })
          .forEach((node) => bodyElement.appendChild(node));
      }
    },
    searchBook: function () {
      if (searchInput === "") {
        [...bodyElement.children].forEach((trElement) => {
          if (selectFilter === "-1") {
            trElement.style.display = "";
          } else {
            const flag = trElement.id.split("_")[2];

            if (flag !== selectFilter) {
              trElement.style.display = "";
            } else {
              trElement.style.display = "none";
            }
          }
        });
      } else {
        [...bodyElement.children].forEach((trElement) => {
          const flag = trElement.id.split("_")[2];

          if (trElement.children[1].innerText.includes(searchInput)) {
            if (flag !== selectFilter) {
              trElement.style.display = "";
            } else {
              trElement.style.display = "none";
            }
          } else {
            trElement.style.display = "none";
          }
        });
      }
    },
    setSearchInput: function (value) {
      searchInput = value;
    },
  };
})();

const submitBtnElement = document.querySelector("#submitBtn");
const searchBtnElement = document.querySelector("#searchBtn");
const cancelSearchBtnElement = document.querySelector("#cancelSearchBtn");
const selectFilterElement = document.querySelector("#selectFilter");
const searchInputElement = document.querySelector("#searchInput");
const sortFilterElement = document.querySelector("#sortFilter");
const bookNameInputElement = document.querySelector("#bookNameInput");

submitBtnElement.addEventListener("click", bookDataClosure.addBook);
selectFilterElement.addEventListener("change", function (e) {
  bookDataClosure.setFilter(e.target.value);
  bookDataClosure.setFilterNum(e.target.value);
});

sortFilterElement.addEventListener("change", function (e) {
  bookDataClosure.setSortNum(e.target.value);
  bookDataClosure.sort();
});

searchBtnElement.addEventListener("click", function (e) {
  bookDataClosure.setSearchInput(searchInputElement.value);
  bookDataClosure.searchBook();
});

cancelSearchBtnElement.addEventListener("click", function (e) {
  bookDataClosure.setSearchInput("");
  searchInputElement.value = "";
  bookDataClosure.searchBook();
});

// 대출 여부 인터페이스는 check box로 on off 할 수 있음
// 이 때 대출 가능 or 불가능이 필터로도 컨트롤 할 수 있음.
// 추가로, 검색 기능을 진행중이라고 해보자.
// ㄱ을 쳐서 책을 보고 있다가. 대출 여부 check box 하나를 껐다.
// 그러면 그 때

const dummyData = [
  "도둑맞은 집중력",
  "그리스 로마 신화1",
  "그리스 로마 신화2",
  "그리스 로마 신화3",
  "환율도 모르고 경제 공부할 뻔했다",
  "처음 시작하는 금리 공부",
  "명탐정 코난 13",
  "명탐정 코난 15",
];

dummyData.forEach((el) => {
  bookNameInputElement.value = el;
  bookDataClosure.addBook();
});
