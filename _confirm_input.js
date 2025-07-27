// 古いconfirm_inputです
let latestGetDict = {};

function rebuildConfirmedMembers() {
  confirmedMembers.clear();
  for (const block in latestGetDict) {
    latestGetDict[block].forEach(num => {
      if (!isNaN(num)) {
        confirmedMembers.add(num);
      }
    });
  }

  console.log("再構築された confirmedMembers:", Array.from(confirmedMembers));
}

function confirmSpans() {
  rebuildConfirmedMembers();  // 最新の確定番号を再構築
  const errors = [];
  const draftData = {};
  const confirmedMembersLocal = new Set();  // 今回入力分の重複も防ぐ

  document.querySelectorAll("tbody tr").forEach(row => {
    const block = row.querySelector("th").textContent;
    const values = [];

    row.querySelectorAll("td span").forEach(span => {
      if (!span.classList.contains("editable-span")) return;  // 確定済みはスキップ

      else {
        const val = span.textContent.trim();
        if (val === "") return;

        const num = parseInt(val, 10);
        if (isNaN(num) || num < 0 || num > 99) {
          errors.push(`不正な番号: ${val}（0〜99）`);
          return;
        }

        if (confirmedMembers.has(num)) {
          errors.push(`No.${num}はすでに確定済み`);
          return;
        }



        if (!(num in validMembers)) {
          errors.push(`No.${num} は登録された新入寮生ではありません`);

          return;
        }
      

      values.push(num);
      confirmedMembersLocal.add(num);}
    });

    if (values.length > 0) {
    draftData[block] = values;
  }
  });

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  // 今回入力分を confirmed-span に変更
  document.querySelectorAll("td span").forEach(span => {
    if (!span.classList.contains("confirmed-span") && span.textContent.trim() !== "") {
      span.classList.add("confirmed-span");
    }
  });

  // 巡目を進める
  const roundSpan = document.getElementById("round");
  roundSpan.textContent = parseInt(roundSpan.textContent, 10) + 1;
  
  const mergedData = { ...latestGetDict };
  for (const block in draftData) {
    mergedData[block] = draftData[block];
  }

  assignColors();
  sendToServer({ round_data: mergedData, winners: {} });
  rebuildConfirmedMembers();
}
