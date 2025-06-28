function confirmInputs() {  //確定ボタンが押されたときに動かされる関数
  const inputs = document.querySelectorAll("td input"); //input要素をもつcellの要素を全て取得
  const tempValues = [];  //空配列tempValuesを作製
  const errors = [];  //空配列errorsを作製

  for (const input of inputs) { //input要素をもつcellの要素１つずつに対して
    const val = input.value.trim(); 
    if (val === "") continue; //valが空だったら今回はおわり

    const num = parseInt(val, 10);  //valを10進数の数値に変更→numとする
    if (isNaN(num) || num < 0 || num > 99) {  //numが数値でなかったり、0未満, 100以上なら
      errors.push(`不正な番号: ${val}（0〜99）`); //配列errorsにエラーメッセージを入れる
      continue; //今回は終わり
    }

    if (confirmedMembers.has(num)) {  //numがすでに確定済みリストにあれば
      errors.push(`No.${num} はすでに確定済みです`);  //配列errorsにエラーメッセージを入れる
      continue; //今回は終わり
    }

    tempValues.push({ input, val });
  }

  if (errors.length > 0) {  //errorsにエラーメッセージが入っていれば
    alert(errors.join("\n")); //エラーをアラート表示
    return; // エラーがあるので確定しないで、もう一回この試行をする
  }

  // spanに確定
  tempValues.forEach(({ input, val }) => {  
    const span = document.createElement("span");  //spanタグをもつ要素作製
    span.textContent = val;   //span要素にvalをテキストとして追加
    const parent = input.parentNode;  
    parent.removeChild(input);  //inputタグを取って
    parent.appendChild(span);   //spanタグを追加 →入力受付から確定にする
  });

  // 巡目更新
  document.getElementById("round").textContent =  //roundタグを持つ要素を探してきて、そのテキストを
    parseInt(document.getElementById("round").textContent) + 1; //もとあるそのテキストを+1したものに更新

  assignColors(); //着色処理

  // 指名データを収集して送信
  const draftData = {}; //リストdraftDataをつくる
  document.querySelectorAll("tbody tr").forEach(row => {  //表の横部分の１つめ一個一個について
    const block = row.querySelector("th").textContent;  //列の見出しの、テキスト部分を取得→いま扱っているブロック
    const values = [];  //空配列をvaluesとして取得
    row.querySelectorAll("td span").forEach(span => { //列についてセルのspan要素を全て取得し、  一つ一つについて
      const val = span.textContent.trim();  //値を取得
      if (val !== "") values.push(parseInt(val)); //中の値が空でないならvaluesに入れる  
    });
    draftData[block] = values;  //辞書draftDataに入れる(ブロックがgetした新入生) →get_dictと同じ
  });
  if (!(val in validMembers)) {
  errors.push(`No.${val} は登録された新入寮生ではありません`);
  }
  if (errors.length > 0) {  //errorsにエラーメッセージが入っていれば
    alert(errors.join("\n")); //エラーをアラート表示
    return; // エラーがあるので確定しないで、もう一回この試行をする
  

}

  sendToServer({ round_data: draftData, winners: {} }); //巡目、getdict, じゃんけん勝者をサーバーに送信 ← この段階では勝者はきまっていないので空
}
