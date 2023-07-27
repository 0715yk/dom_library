// 데이터 생성

const bookDataClosure = (function () {
  let length = 0;
  let selectFilter = "-1";
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
          console.log("heere!");
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
      bodyElement.appendChild(tr);
      bookNameInputElement.value = "";
      length++;
    },
    setFilter: function (filterNum) {
      for (let i = 0; i < bodyElement.childNodes.length; i++) {
        const trElement = bodyElement.childNodes[i];
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
  };
})();

const submitBtnElement = document.querySelector("#submitBtn");
const selectFilterElement = document.querySelector("#selectFilter");
const bookNameInputElement = document.querySelector("#bookNameInput");

submitBtnElement.addEventListener("click", bookDataClosure.addBook);
selectFilterElement.addEventListener("change", function (e) {
  bookDataClosure.setFilter(e.target.value);
  bookDataClosure.setFilterNum(e.target.value);
});
