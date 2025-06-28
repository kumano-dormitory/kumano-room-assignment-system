function applyWakuDict(wakuDict) {
  const rows = document.querySelectorAll("#input-rows tr");

  rows.forEach(row => {
    const block = row.querySelector("th").textContent;
    const cells = row.querySelectorAll("td");

    const targetInputCount = wakuDict[block] || 0;

    // 確定済み span の数
    let confirmedCount = 0;
    const confirmedValues = [];

    // span内容を記録
    cells.forEach(cell => {
      const span = cell.querySelector("span");
      if (span && span.textContent.trim() !== "") {
        confirmedValues.push(span.textContent.trim());
        confirmedCount++;
      }
    });

    let inputsAdded = 0;

    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      cell.innerHTML = "";

      if (i < confirmedValues.length) {
        // 確定済み span を再構築して追加
        const span = document.createElement("span");
        span.textContent = confirmedValues[i];
        cell.appendChild(span);
      } else if (inputsAdded < targetInputCount) {
        // input を追加
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `${block}[${i}]`;
        input.addEventListener("input", assignColors);
        cell.appendChild(input);
        inputsAdded++;
      } else {
        // 残りは空の span
        const span = document.createElement("span");
        span.textContent = "";
        cell.appendChild(span);
      }
    }
  });

  assignColors();
}
