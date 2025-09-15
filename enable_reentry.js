function getRoundWindow(block) {
  const arr = roundSlotsDict?.[block] || [];
  const idx = (window.currentRound || 1) - 1;
  const start = arr.slice(0, idx).reduce((a, b) => a + (b || 0), 0);
  const size  = arr[idx] || 0;
  return { start, end: start + size }; // [start, end)
}

function enableReentry(losers) {
  window.draftStatus = "reEntry";
  updateStatusLabel?.();

  for (const block in losers) {
    const row = Array.from(document.querySelectorAll("tbody tr"))
      .find(tr => tr.querySelector("th")?.textContent === block);
    if (!row) continue;

    const spans = row.querySelectorAll("td span");

    tableValues[block] = tableValues[block] || [];
    tableState[block]  = tableState[block]  || [];
    while (tableValues[block].length < spans.length) tableValues[block].push("");
    while (tableState[block].length  < spans.length) tableState[block].push("normal");

  
    const { start, end } = getRoundWindow(block);
    const endClamped = Math.min(end, spans.length);
    const allowed = Math.max(0, endClamped - start);

    
    let confirmedCount = 0;
    let editableCount  = 0;
    for (let i = start; i < endClamped; i++) {
      if (tableState[block][i] === "confirmed") confirmedCount++;
      else if (tableState[block][i] === "editable") editableCount++;
    }

    let needed = Math.max(0, allowed - confirmedCount - editableCount);

    //normal を needed 個だけ editable に
    for (let i = start; i < endClamped && needed > 0; i++) {
      if (tableState[block][i] !== "normal") continue;
      const span = spans[i];
      tableState[block][i]  = "editable";
      tableValues[block][i] = "";
      span.className        = "editable-span";
      span.textContent      = "";
      span.onclick          = () => { currentTargetSpan = span; showNumberPicker(span); };
      needed--;
    }

    //log出力
    const afterEditable = [...spans].slice(start, endClamped)
      .filter((_, k) => tableState[block][start + k] === "editable").length;

    console.log(`[reEntry] blk=${block} round=${window.currentRound} window=[${start},${endClamped}) allowed=${allowed} confirmed=${confirmedCount} editable=${afterEditable}`);
  }
}
