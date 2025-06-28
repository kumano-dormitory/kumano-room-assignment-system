function saveCurrentState() {
  // 巡目の保存
  backupState.round = parseInt(document.getElementById("round").textContent, 10);

  // 指名内容の保存
  backupState.inputs = {};
  document.querySelectorAll("#input-rows tr").forEach(row => {
    const block = row.querySelector("th").textContent;
    const cells = row.querySelectorAll("td");
    backupState.inputs[block] = [];
    cells.forEach(cell => {
      const input = cell.querySelector("input");
      if (input && input.value.trim() !== "") {
        backupState.inputs[block].push(Number(input.value));
      }
    });
  });

  // 枠数（wakuDict）の保存
  backupState.wakuDict = {};
  document.querySelectorAll("#slots-form input").forEach(input => {
    backupState.wakuDict[input.name] = parseInt(input.value, 10) || 0;
  });

  console.log("状態保存完了:", backupState);
}
