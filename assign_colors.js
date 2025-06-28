const colorPalette = [ //色のリストをつくる
  "#f8d7da", "#d4edda", "#d1ecf1", "#fff3cd", "#e2e3e5",
  "#f5c6cb", "#c3e6cb", "#bee5eb", "#ffeeba", "#d6d8db"
];

// グローバルに確定済みメンバーの集合（render_tableで更新）
let confirmedMembers = new Set(); //確定している新入寮生を。。。？

function assignColors() {
  const elements = document.querySelectorAll("td input, td span"); //入力, 確定モードの要素をそれぞれ全て取得
  const valueMap = {};
  const colorMap = {};
  let colorIndex = 0; //何番目の色を使うかを示すカウンター

  // 値を収集（数値として扱う）
  elements.forEach(el => {                                    //セルの要素１つ１つに対して
    const val = (el.value || el.textContent || "").trim();    //セルの中の数字を、値・テキスト・空問わずvalとして入れる
    if (val !== "") {                                         //valが空でないなら (空の部分は無視する)
      const key = String(parseInt(val, 10));  //valを十進法で数に変換して、さらに文字列にしたものをkeyとする
      if (!valueMap[key]) valueMap[key] = []; //まだ見たことのない番号(key)なら、初期化しておく
      valueMap[key].push(el); //同じ番号をもつセルを、valueMapに登録
    }
  });

  // 一旦色をクリア
  elements.forEach(el => {
    el.style.backgroundColor = "";    //１つ１つのセルについて、背景色をクリア
  });

  // 🔽 重複（2つ以上）ある値にのみ色を付ける
  for (const val in valueMap) {       //valueMap内のvalについて走査
    if (valueMap[val].length > 1) {   //被る数が２以上のvalについて
      if (!colorMap[val]) {           //色がついていなければ
        colorMap[val] = colorPalette[colorIndex % colorPalette.length];   //色候補内の中から色を決め、色をつける  番号→色の対応表を作っている
        colorIndex++;                 //色カウントを1進める
      }
      valueMap[val].forEach(el => {   //それぞれのvalについて
        el.style.backgroundColor = colorMap[val]; //valごとにcolorMapを用いて色づける
      });
    }
  }
}

