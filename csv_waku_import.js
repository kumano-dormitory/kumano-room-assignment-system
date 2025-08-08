// csv_waku_import.js

// グローバル変数
window.roundSlotsDict = {};  // { blockName: [r1, r2, …] }
window.maxRounds       = 0;
window.currentRound    = 1;
window.maxWakuDict     = {};
window.wakuDict        = {};

// ファイルアップロード時のハンドラ
function handleCSVUploadWaku(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const csvText = e.target.result;

    // 初期化
    roundSlotsDict = {};
    maxRounds       = 0;
    currentRound    = 1;
    maxWakuDict     = {};

    // パース
    csvText.split("\n").forEach(line => {
      const parts = line.trim().split(",");
      const block = parts[0];
      // parts = [ blockName, total, r1, r2, … ]
      const total = parseInt(parts[1], 10);
      if (!isNaN(total)) {
        maxWakuDict[block] = total;
      }
      const slots = parts.slice(2).map(s => parseInt(s, 10) || 0);
      roundSlotsDict[block] = slots;
      maxRounds = Math.max(maxRounds, slots.length);
    });

    // １巡目の枠数 wakuDict にセット
    wakuDict = {};
    for (const block in roundSlotsDict) {
      wakuDict[block] = roundSlotsDict[block][0] || 0;
    }

    // UI 更新
    document.getElementById("round").textContent = currentRound;
    document.getElementById("result-area").textContent =
      "読み込んだ枠数設定:\n" +
      Object.entries(roundSlotsDict)
            .map(([blk, arr]) => `${blk}: [${arr.join(", ")}]`)
            .join("\n");

    // テーブル描画へ
    initTable();
    applyWakuDict();
    statusInput();

    // デバッグログ
    console.log("roundSlotsDict:", roundSlotsDict);
    console.log("maxWakuDict:",    maxWakuDict);
    console.log("maxRounds:",      maxRounds);
  };

  reader.readAsText(file);
}
