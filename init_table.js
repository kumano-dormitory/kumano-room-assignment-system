window.tableState = {};
window.tableValues = {};
window.wakuDict = {};
document.addEventListener("DOMContentLoaded", () => {
  const blockNames = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"];
  const columnCount = 6;
  const spanrows = document.getElementById("input-rows");

  blockNames.forEach(block => {
    window.tableState[block] = Array(columnCount).fill("normal");
    window.tableValues[block] = Array(columnCount).fill(null);
  })

  blockNames.forEach(name => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = name;
    tr.appendChild(th);

    for (let i = 0; i < columnCount; i++) {
      const td = document.createElement("td");
      td.dataset.block = name;
      td.dataset.index = i;

      const span = document.createElement("span");
      span.dataset.block = name;
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
});
