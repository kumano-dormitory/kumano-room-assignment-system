function renderTableFromGetDict(getDict) {  //python側から送られてきたget_dictに対してHTML側の表を更新する
      latestGetDict = getDict;
      confirmedMembers = new Set(); // ← ここで確定した新入寮生をリセット
      console.log("latestGetDict:", latestGetDict);
      document.querySelectorAll("tbody tr").forEach(row => {  //tbodyかつtrをもつ要素を全て取得して、行ごとに
        const block = row.querySelector("th").textContent;  //th(見出し)をもつ要素を取得、さらにその中のテキストをblockとする (ブロック名を取得)
        const values = getDict[block] || [];  //getDictに入っているもの、つまり各ブロックが得た新入寮生の配列をvaluesとして取得、なければ空配列を代わりに用いる
        const cells = row.querySelectorAll("td"); //ある１つの縦について、各セルの要素を全て取得

        for (let i = 0; i < cells.length; i++) {
          const cell = cells[i];
          cell.innerHTML = ""; // 初期化

          if (i < values.length) {  //あるブロックが獲得した新入寮生の数にiが入っていたら (そのセルに獲得した新入寮生が入るなら)
            const span = document.createElement("span");  //span(入力済=確定)タグをもつHTML要素を作製
            span.textContent = values[i]; //spanを持った、「あるブロックのi番目の確定した新入寮生番号」要素をつくる
            cell.appendChild(span); //セルにこの要素を入れる  →あるブロックのi番目のセルに、あるブロックのi番目の確定した新入寮生をspanとして入れる

             // ✅ 確定済み番号として登録
            confirmedMembers.add(values[i]);

          } else {  //あるブロックが獲得した新入寮生の数がi未満だったら
           const span = document.createElement("span");
            span.textContent = "";  // 初期値は空
            span.classList.add("editable-span");  // スタイル調整用クラス

            // クリック時にナンバーピッカーを起動
            span.addEventListener("click", () => {
              currentTargetSpan = span;  // グローバル変数で対象を保持
              showNumberPicker(span);    // ナンバーピッカーを起動（位置も調整）
            });

            cell.appendChild(span);
          }
        }
      });

      assignColors(); //assignColorsする
    }