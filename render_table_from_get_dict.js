// 新しいrender_table_from_get_dict.jsです
function renderTableFromGetDict(getDict){
    console.log("totalgetDict =", totalGetDict);
    mergeIntoTotal(getDict);
    console.log("totalgetDict =", totalGetDict);
    
    for (const block in totalGetDict){
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) continue;
        const spans = row.querySelectorAll(`td span`);

    // 表と内部データを統一する
        for (let i = 0; i < tableState[block].length; i++){
            if(tableState[block][i] == "confirmed") continue;
            tableState[block][i] = "";
            tableValues[block][i] = "";
            const span = spans[i];
            const valu = totalGetDict[block][i];
            if (valu){
                tableValues[block][i] = totalGetDict[block][i];
                tableState[block][i] = "confirmed";
                span.className = "confirmed-span";
                span.textContent = tableValues[block][i];
                console.log("confirmedに切り替えました",block,i);
                span.onclick = null;
            }else{
                tableValues[block][i] = "";
                tableState[block][i] = "normal";
                span.className = "normal-span";
                console.log("normalに切りかえました",block,i);
                span.onclick = null;
            }
        }
        assignColors();
    }

    
}