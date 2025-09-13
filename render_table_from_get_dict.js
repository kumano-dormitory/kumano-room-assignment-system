function renderTableFromGetDict(getDict){
  console.log("totalgetDict(before) =", totalGetDict);
  mergeIntoTotal(getDict);
  console.log("totalgetDict(after)  =", totalGetDict);

  for (const block in totalGetDict){
    const row = Array.from(document.querySelectorAll("tbody tr"))
      .find(tr => tr.querySelector("th")?.textContent === block);
    if (!row) continue;

    const spans = row.querySelectorAll("td span");

    // 値のソート
    const vals = Array.from(new Set(totalGetDict[block])).sort((a,b)=>a-b);

    // 内部のりせっと
    tableValues[block] = tableValues[block] || [];
    tableState[block]  = tableState[block]  || [];

    for (let i = 0; i < spans.length; i++){
      const span = spans[i];
      tableState[block][i]  = "normal";
      tableValues[block][i] = "";
      span.className        = "normal-span";
      span.textContent      = "";
      span.onclick          = null;
    }

    //先頭からconfirmedをアペンドしていく
    for (let i = 0; i < Math.min(vals.length, spans.length); i++){
      const span = spans[i];
      const val  = vals[i];
      if (val !== undefined && val !== null) {
        tableValues[block][i] = val;
        tableState[block][i]  = "confirmed";
        span.className        = "confirmed-span";
        span.textContent      = val;
        span.onclick          = null;
      }
    }
  }

  assignColors();
}
