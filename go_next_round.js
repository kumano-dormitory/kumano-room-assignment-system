function showFinalResults() {
  let text = ""
  const tgd = window.totalGetDict || {};
  const blocks = Object.keys(tgd).sort();

  text = "獲得結果（番号のみ）\n";
  for (const b of blocks) {
    const nums = Array.from(new Set((tgd[b] || [])
                  .map(n => Number(n))
                  .filter(n => !Number.isNaN(n))))
                  .sort((a, z) => a - z);
    text += `${b}: ${nums.length ? nums.join(", ") : "なし"}\n`;
    }

  const resultArea = document.getElementById("result-area");
  if (resultArea) resultArea.textContent = text;

  const modal = document.getElementById("result-modal");
  const pre   = document.getElementById("final-result");
  const close = document.getElementById("result-submit");
  if (pre)   pre.textContent = text;
  if (modal) modal.style.display = "flex";
  if (close) close.onclick = () => { modal.style.display = "none"; };

  // オーバーレイクリック/ESCで閉じる
  modal?.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; }, { once:true });
  document.addEventListener("keydown", function onEsc(e){
    if (e.key === "Escape") { modal?.style && (modal.style.display = "none"); document.removeEventListener("keydown", onEsc); }
  });
}


function goToNextRound() {
  if (window.draftStatus === "locked"){
    //モーダルで結果出力したい
    alert("すべてのラウンドが終了しました")
    showFinalResults()

    //とりあえずresultAreaに出力する
    const resultArea = document.getElementById("result-area");
    let text = ""
    const tgd = window.totalGetDict || {};
    const blocks = Object.keys(tgd).sort();

    text = "獲得結果（番号のみ）\n";
    for (const b of blocks) {
      const nums = Array.from(new Set((tgd[b] || [])
                  .map(n => Number(n))
                  .filter(n => !Number.isNaN(n))))
                  .sort((a, z) => a - z);
      text += `${b}: ${nums.length ? nums.join(", ") : "なし"}\n`;
    }
    
    resultArea.textContent = text;
    return;
  }
  if (window.currentRound >= window.maxRounds) {
    // 全ラウンド終了
    statusLocked();
    alert("すべてのラウンドが終了しました");
    return;
  }
  if (window.draftStatus !== "done") {
    alert("まず現在のラウンドを完了してください");
    return;
  }

  // 次のラウンドへ
  renderTableFromGetDict();
  window.currentRound++;
  document.getElementById("round").textContent = window.currentRound;
  statusInput();
  applyWakuDict();
}
