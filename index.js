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
    setFilter: function (filterNum) {
      for (let i = 0; i < bodyElement.children.length; i++) {
        const trElement = bodyElement.children[i];
        if (filterNum === "-1") {
          trElement.style.display = "";
        } else {
          const flag = trElement.id.split("_")[2];
          if (flag !== filterNum) {
            trElement.style.display = "";
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
          trElement.style.display = "";
        });
      } else {
        [...bodyElement.children].forEach((trElement) => {
          if (trElement.children[1].innerText.includes(searchInput)) {
            trElement.style.display = "";
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

searchInputElement.addEventListener("change", function (e) {
  bookDataClosure.setSearchInput(e.target.value);
});

searchBtnElement.addEventListener("click", function (e) {
  bookDataClosure.searchBook();
});

cancelSearchBtnElement.addEventListener("click", function (e) {
  bookDataClosure.setSearchInput("");
  searchInputElement.value = "";
  bookDataClosure.searchBook();
});
