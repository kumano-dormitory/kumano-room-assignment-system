const blockNames = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"];
const columnCount = 6;
const inputRows = document.getElementById("input-rows");

const colorPalette = [
  "#f8d7da", "#d4edda", "#d1ecf1", "#fff3cd", "#e2e3e5",
  "#f5c6cb", "#c3e6cb", "#bee5eb", "#ffeeba", "#d6d8db"
];

// 行を作成
blockNames.forEach(name => {
  const tr = document.createElement("tr");

  const th = document.createElement("th");
  th.textContent = name;
  tr.appendChild(th);

  for (let i = 0; i < columnCount; i++) {
    const td = document.createElement("td");
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = `${name}[${i}]`;
    input.addEventListener("input", assignColors); // ← 入力時に色更新
    td.appendChild(input);
    tr.appendChild(td);
  }

  inputRows.appendChild(tr);
});