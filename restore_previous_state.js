function restorePreviousState() {
  // 巡目復元
  document.getElementById("round").textContent = backupState.round;

  // 枠数復元
  for (const key in backupState.wakuDict) {
    const input = document.querySelector(`#slots-form input[name="${key}"]`);
    if (input) {
      input.value = backupState.wakuDict[key];
    }
  }

  // 表の復元
  const rows = document.querySelectorAll("#input-rows tr");
  rows.forEach(row => {
    const block = row.querySelector("th").textContent;
    const cells = row.querySelectorAll("td");
    const values = backupState.inputs[block] || [];

    let index = 0;
    cells.forEach(cell => {
      cell.innerHTML = "";
      if (index < values.length) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = values[index];
        input.addEventListener("input", assignColors);
        cell.appendChild(input);
        index++;
      } else {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `${block}[${index}]`;
        input.addEventListener("input", assignColors);
        cell.appendChild(input);
        index++;
      }
    });
  });

  assignColors();
  console.log("状態を巻き戻しました:", backupState);
}
