window.tableState = {};
window.tableValues = {};
window.wakuDict = {};
window.firstWakuDict = {};
window.secondWakuDict = {};
// グローバル累積変数を定義（他のJSと衝突しないように）
window.totalGetDict = window.totalGetDict || {};
window.columnCount = {};
function updateStatusLabel() {
  const text = {
    input: "入力中",
    done: "指名終了",
    reEntry: "再指名中",
    locked: "確定済",
    data: "データ入力"
  };
  document.getElementById("status").textContent = text[window.draftStatus];
}

//  window.draftStatus = "input";

function initTable() {
  const blockNames = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"];
  console.log("あ");
  const spanrows = document.getElementById("input-rows");
  spanrows.innerHTML = "";
  blockNames.forEach(block => {
    columnCount[block] = window.maxWakuDict[block] || 6;
    window.tableState[block] = Array(columnCount[block]).fill("normal");
    window.tableValues[block] = Array(columnCount[block]).fill(null);
  })

  blockNames.forEach(block => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = block;
    tr.appendChild(th);

    for (let i = 0; i < columnCount[block]; i++) {
      const td = document.createElement("td");
      td.dataset.block = block;
      td.dataset.index = i;

      const span = document.createElement("span");
      span.dataset.block = block;
      span.dataset.index = i;



      // 初期状態は空
      span.textContent = "";
      span.className = "normal-span";

      // 必要なら onclick を後から追加
      // span.onclick = () => { ... };

      td.appendChild(span);
      tr.appendChild(td);
    }

    spanrows.appendChild(tr);
  });

  assignColors();  // 最初の色づけ処理など
};
document.addEventListener("DOMContentLoaded", () => {
  initTable();
  statusData();
});





