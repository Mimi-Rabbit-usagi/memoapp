"use strict";

{
  const text = document.getElementById("text");
  const save = document.getElementById("save");
  const clear = document.getElementById("clear");
  const message = document.getElementById("message");
  const memoList = document.getElementById("memo-list");

  //ローカルストレージからメモを読み込み、必要に応じて変換
  let memos = JSON.parse(localStorage.getItem("memos")) || [];
  memos = memos.map((memo) => {
    if (typeof memo === "string") {
      return {
        text: memo,
        date: new Date().toISOString(),
      };
    }
    return memo;
  });

  //日付をフォーマットする関数
  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  }

  //メモカードを表示する
  function displayMemos() {
    memoList.innerHTML = "";
    memos.forEach((memo, index) => {
      const memoCard = document.createElement("div");
      memoCard.classList.add("memo-card");
      memoCard.innerHTML = `
      <p>${memo.text}</p>
      <small>${formatDate(memo.date)}</small>
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
