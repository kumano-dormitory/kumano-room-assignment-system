function renderTableFromGetDict(getDict) {  //python側から送られてきたget_dictに対してHTML側の表を更新する
      confirmedMembers = new Set(); // ← ここで確定した新入寮生をリセット
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
            const input = document.createElement("input");  //inputタグをもつ＝入力受付中のHTML要素を作製
            input.type = "number";  //この要素はnumberタグをもち
            input.placeholder = `${block}[${i}]`; //inputの中身はblock:iと表示される
            input.addEventListener("input", assignColors);  //inputに対してassignColorsを動かす
            cell.appendChild(input);  //cellにこの要素を入れる
          }
        }
      });

      assignColors(); //assignColorsする
    }