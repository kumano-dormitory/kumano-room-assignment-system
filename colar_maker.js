 // 色割り当て関数
 function assignColors() {
    const elements = document.querySelectorAll("td editable-span");  
    const valueMap = {};
    const colorMap = {};
    let colorIndex = 0;

    // 値の集計
    elements.forEach(el => {
      const val = (el.value || el.textContent || "").trim();
      if (val !== "") {
        if (!valueMap[val]) valueMap[val] = [];
        valueMap[val].push(el);
      }
    });

    // 色リセット
    elements.forEach(el => {
      el.style.backgroundColor = "";
    });

    // 重複に色を適用
    for (const val in valueMap) {
      if (valueMap[val].length > 1) {
        if (!colorMap[val]) {
          colorMap[val] = colorPalette[colorIndex % colorPalette.length];
          colorIndex++;
        }
        valueMap[val].forEach(el => {
          el.style.backgroundColor = colorMap[val];
        });
      }
    }
  }

  // 確定処理
  function confirmInputs() {
    const inputs = document.querySelectorAll("td input");
    inputs.forEach(input => {
      const value = input.value.trim();
      if (value !== "") {
        const span = document.createElement("span");
        span.textContent = value;
        const parent = input.parentNode;
        parent.removeChild(input);
        parent.appendChild(span);
      }
    });

    document.getElementById("round").textContent =
      parseInt(document.getElementById("round").textContent) + 1;

    assignColors();
  }

  // リセット処理
  function resetInputs() {
    const cells = document.querySelectorAll("td");

    cells.forEach(cell => {
      const input = cell.querySelector("input");
      const span = cell.querySelector("span");

      if (input) {
        input.value = "";
      } else if (span) {
        const newInput = document.createElement("input");
        newInput.type = "number";
        newInput.placeholder = "";
        newInput.addEventListener("input", assignColors);
        cell.removeChild(span);
        cell.appendChild(newInput);
      }
    });

    document.getElementById("round").textContent = "1";

    assignColors();
  }

  // 初回読み込み時に色を反映
  document.addEventListener("DOMContentLoaded", assignColors);