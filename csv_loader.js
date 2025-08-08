let validMembers = {};  // { 番号: 氏名 } を保持

function handleCSVUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split("\n");
    lines.forEach(line => {
      const [numStr, name] = line.trim().split(",");
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && name) {
        validMembers[num] = name;
      }
    });
    //alert("CSV読み込み完了。新入寮生が " + Object.keys(validMembers).length + " 人登録されました。");
    console.log("新入寮生:", validMembers);
    document.getElementById("result-area").textContent = 
  "読み込んだ新入寮生:\n" + 
  Object.entries(validMembers).map(([num, name]) => `No.${num}: ${name}`).join("\n");

  };
  reader.readAsText(file);
  document.getElementById("csv-upload-member").style.opacity = 0.5;
  document.getElementById("csv-upload-waku").style.opacity = 1.0;
  
}

//　以下開発用インポートボタン

document.getElementById("dev-fetch-button").onclick = function () {
  console.log("ドイツの科学は世界一ィ！");

  // ─ 規定枠数CSV の読み込み ─
  fetch('./static/規定枠数.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error(`枠数CSV読み込み失敗: ${response.statusText}`);
      }
      return response.text();
    })
    .then(csvText => {
      console.log("枠数CSV読み込み成功:", csvText);

      // パース処理
      window.roundSlotsDict = {};  // { blockName: [r1, r2, …] }
      window.maxRounds       = 0;
      window.currentRound    = 1;
      window.maxWakuDict = {};
      csvText.split("\n").forEach(line => {
        const parts = line.trim().split(",");
        const block = parts[0];
        const num = parseInt(parts[1], 10);
        if (!isNaN(num) && block) {
          maxWakuDict[block] = num;
        }
        // parts = [ blockName, total, r1, r2, … ]
        const slots = parts.slice(2).map(s => parseInt(s, 10) || 0);
        roundSlotsDict[block] = slots;
        window.maxRounds = Math.max(window.maxRounds, slots.length);
      });

      // 初期 wakuDict （1巡目の枠数）を設定
      window.wakuDict = {};
      for (const block in roundSlotsDict) {
        wakuDict[block] = roundSlotsDict[block][0] || 0;
      }

      // UI 更新
      document.getElementById("round").textContent = window.currentRound;
      document.getElementById("result-area").textContent =
        "読み込んだ枠数設定:\n" +
        Object.entries(roundSlotsDict)
              .map(([blk, arr]) => `${blk}: [${arr.join(", ")}]`)
              .join("\n");

      // テーブル初期化→描画
      initTable();
      applyWakuDict();
      statusInput();
    })
    .catch(error => {
      console.error("CSVロードエラー:", error);
    });

  // ─ 新入寮生CSV の読み込み ─
  fetch('./static/新入寮生.csv')
    .then(response => {
      if (!response.ok) {
        throw new Error(`新入寮生CSV読み込み失敗: ${response.statusText}`);
      }
      return response.text();
    })
    .then(csvText => {
      console.log("新入寮生CSV読み込み成功:", csvText);
      csvText.split("\n").forEach(line => {
        const [numStr, name] = line.trim().split(",");
        const num = parseInt(numStr, 10);
        if (!isNaN(num) && name) {
          validMembers[num] = name;
        }
      });
      console.log("新入寮生:", validMembers);
      document.getElementById("result-area").textContent =
        "読み込んだ新入寮生:\n" +
        Object.entries(validMembers)
              .map(([num, name]) => `No.${num}: ${name}`)
              .join("\n");
      statusInput();
    })
    .catch(error => {
      console.error("新入寮生CSVロードエラー:", error);
    });
};
