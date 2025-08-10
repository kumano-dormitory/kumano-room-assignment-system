function enableReentry(losers) {
  // reEntry中はapplyWakuDictを呼ばない前提
  window.draftStatus = "reEntry";
  updateStatusLabel?.();

  for (const block in losers) {
    const row = Array.from(document.querySelectorAll("tbody tr"))
      .find(tr => tr.querySelector("th")?.textContent === block);
    if (!row) continue;

    const spans = row.querySelectorAll("td span");

    // 念のため配列長をDOMに合わせる
    tableValues[block] = tableValues[block] || [];
    tableState[block]  = tableState[block]  || [];
    while (tableValues[block].length < spans.length) tableValues[block].push("");
    while (tableState[block].length  < spans.length) tableState[block].push("normal");

    // そのラウンドで必要な総枠数（= wakuDict[block]）から、確定済みの数を引く
    const allowed = (window.wakuDict?.[block] ?? 0);

    const confirmedCount =
      [...spans].filter((sp, i) => tableState[block][i] === "confirmed").length;

    // 既にeditableな数（直前のreEntryで残っている分など）
    const editableCount =
      [...spans].filter((sp, i) => tableState[block][i] === "editable").length;

    // この時点で必要な追加editable数 = 許容量 - confirmed - 既存editable
    let needed = Math.max(0, allowed - confirmedCount - editableCount);

    // normalセルのうち、needed個だけeditableにしていく
    for (let i = 0; i < spans.length && needed > 0; i++) {
      if (tableState[block][i] !== "normal") continue;
      const span = spans[i];

      tableState[block][i]  = "editable";
      tableValues[block][i] = "";            // 入力待ち
      span.className        = "editable-span";
      span.textContent      = "";            // 見た目も初期化
      span.onclick          = () => {
        currentTargetSpan = span;
        showNumberPicker(span);
      };

      needed--;
    }

    // デバッグ：不変条件をログ
    const afterEditable = [...spans].filter((sp, i) => tableState[block][i] === "editable").length;
    console.log(`[reEntry] ${block}: allowed=${allowed}, confirmed=${confirmedCount}, editable=${afterEditable}`);
  }
}
