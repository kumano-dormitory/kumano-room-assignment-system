// ==== 確定結果をテキスト表示 ====
    function showResults(json) {  //python側から帰ってきた処理後の辞書を引数にとる
      const resultArea = document.getElementById("result-area");  //result-areaタグをもつ要素を取得
      let text = "獲得結果:\n";  //テキスト表示
      for (const block in json.get_dict) {  //それぞれのブロックについて
        const members = json.get_dict[block]; //各ブロックが獲得した各寮生について
        text += `${block}: ${members.length > 0 ? members.join(", ") : "なし"}\n`;  //獲得した寮生がいれば表示 いなければなしと表示
      }

      text += "\nじゃんけん勝者:\n";
      if (json.conflicts.length === 0) {  //競合がなければ
        text += "なし\n";
      } else {
        json.conflicts.forEach(c => {
          text += `No.${c.val} → ${c.winner}（${c.blocks.join(", ")} で競合）\n`;
        });
        
        text += "\nじゃんけん敗者:\n";
        if (json.losers && Object.keys(json.losers).length > 0) {
          for (const block in json.losers) {
            text += `${block}: ${json.losers[block]}回 負け\n`;
          }
        } else {
          text += "なし\n";
        }
  }

  resultArea.textContent = text;
}