function handleConflicts(conflicts) { //競合を処理
    const winnersMap = {};
    for (const c of conflicts) {
      let winner = null;
      while (!winner || !c.blocks.includes(winner)) {
        const msg = `No.${c.val} を獲得するブロックは？（候補: ${c.blocks.join(", ")}）`;
        winner = prompt(msg); //msgを表示させて入力してもらう
        if (winner === null){   //キャンセルが押された際はnullとなり空オブジェクトを返す
          alert("キャンセルされました")
          return {}; // キャンセルされた場合送信しない
        } 
      }
      winnersMap[c.val] = winner;
    }
    return winnersMap;
  }