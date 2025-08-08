function goToNextRound() {
  if (window.draftStatus !== "done") {
    alert("まず現在のラウンドを完了してください");
    return;
  }
  if (window.currentRound >= window.maxRounds) {
    // 全ラウンド終了
    statusLocked();
    alert("すべてのラウンドが終了しました");
    return;
  }
  // 次のラウンドへ
  renderTableFromGetDict();
  window.currentRound++;
  document.getElementById("round").textContent = window.currentRound;
  statusInput();
  applyWakuDict();
}
