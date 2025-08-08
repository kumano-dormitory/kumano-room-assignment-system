function startDraft() {
  const form = document.getElementById("slots-form");
  const formData = new FormData(form);
  window.wakuDict = {};

  for (const [block, value] of formData.entries()) {
    wakuDict[block] = parseInt(value, 10) || 0; // 入力が空でも0にする
  }
  statusInput();
  console.log("枠数設定:", wakuDict);

  // 表を枠数設定に基づいて更新
  applyWakuDict();
}
