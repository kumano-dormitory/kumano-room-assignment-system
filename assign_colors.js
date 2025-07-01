const colorPalette = [ //色のリストをつくる
  "#f8d7da", "#d4edda", "#d1ecf1", "#fff3cd", "#e2e3e5",
  "#f5c6cb", "#c3e6cb", "#bee5eb", "#ffeeba", "#d6d8db"
];

// グローバルに確定済みメンバーの集合（render_tableで更新）
let confirmedMembers = new Set(); //確定している新入寮生を。。。？

function assignColors() {
  const elements = document.querySelectorAll("td input, td span"); //入力, 確定モードの要素をそれぞれ全て取得
  const valueMap = {};
  const allSpans = document.querySelectorAll("td span");  
  const colorMap = {};
  let colorIndex = 0; //何番目の色を使うかを示すカウンター

   allSpans.forEach(span => {
    const val = span.textContent.trim();
    if (val === "") return;

    if (!colorMap[val]) {
      colorMap[val] = colorPalette[colorIndex % colorPalette.length];
      colorIndex++;
    }

    span.style.backgroundColor = colorMap[val];
    span.style.color = "#fff";
    span.style.padding = "2px 6px";
    span.style.borderRadius = "4px";
    span.style.display = "inline-block";
    span.style.minWidth = "30px";
  });
}