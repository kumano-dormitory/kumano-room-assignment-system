// グローバルに確定済みメンバーの集合（render_tableで更新）
let confirmedMembers = new Set(); //確定している新入寮生を。。。？

function assignColors() {
  const spans = document.querySelectorAll("td span");
  const valueMap = {};  // { 番号: [span, span, ...] }

  // 1. 値ごとにspanをグループ化
  spans.forEach(span => {
    const val = span.textContent.trim();
    if (val === "") return;
    if (!valueMap[val]) {
      valueMap[val] = [];
    }
    valueMap[val].push(span);
  });

  // 2. 色リスト
  const colors = [
    "#ff9999", "#99ccff", "#99ff99", "#ffcc99",
    "#ffb3e6", "#c2f0c2", "#c2d1f0", "#ffe699"
  ];
  let colorIndex = 0;

  // 3. グループごとに色をつける（重複しているもののみ）
  for (const val in valueMap) {
    const group = valueMap[val];
    if (group.length > 1) {  // 重複している番号のみ色をつける
      const color = colors[colorIndex % colors.length];
      group.forEach(span => {
        span.style.backgroundColor = color;
      });
      colorIndex++;
    } else {
      // 一意な番号なら色をクリア
      group[0].style.backgroundColor = "";
    }
  }
}
