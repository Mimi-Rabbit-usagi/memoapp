"use strict";

{
  const text = document.getElementById("text");
  const save = document.getElementById("save");
  const message = document.getElementById("message");
  const clear = document.getElementById("clear");
  const memoList = document.getElementById("memo-list");

  //ローカルストレージからメモを読み込む
  let memos = JSON.parse(localStorage.getItem("memos")) || [];

  //メモカードを表示する
  function displayMemos() {
    memoList.innerHTML = "";
    memos.forEach((memo, index) => {
      const memoCard = document.createElement("div");
      memoCard.classList.add("memo-card");
      memoCard.innerHTML = `
      <p>${memo}</p>
      <button class="delete-memo" data-index="${index}">削除</button>`;
      memoList.appendChild(memoCard);
    });

    //削除ボタンにイベントリスナーを追加
    document.querySelectorAll(".delete-memo").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        memos.splice(index, 1);
        localStorage.setItem("memos", JSON.stringify(memos));
        displayMemos();
      });
    });
  }

  //初期表示
  displayMemos();

  // if (localStorage.getItem("memo") === null) {
  //   text.value = "";
  // } else {
  //   text.value = localStorage.getItem("memo");
  // }

  save.addEventListener("click", () => {
    if (text.value.trim() !== "") {
      const newMemo = {
        text: text.value,
        date: new Date().toISOString(),
      };
      memos.push(newMemo);
      localStorage.setItem("memos", JSON.stringify(memos));
      text.value = "";
      displayMemos();

      message.classList.add("appear");
      setTimeout(() => {
        message.classList.remove("appear");
      }, 1000);
    }
  });

  clear.addEventListener("click", () => {
    if (confirm("本当に削除しますか？") === true) {
      text.value = "";
      memos = [];
      localStorage.removeItem("memos");
      displayMemos();
    }
  });
}
