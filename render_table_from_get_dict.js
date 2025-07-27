// 新しいrender_table_from_get_dict.jsです
function renderTableFromGetDict(getDict){
    console.log("getDict =", getDict);
    for (const block in getDict){
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) return;
        const spans = row.querySelectorAll(`td span`);


        
        for (let i = 0; i < tableState[block].length; i++){
            if(tableState[block][i] == "confirmed") continue;
            tableState[block][i] = "";
            tableValues[block][i] = "";
            const span = spans[i];
            const valu = getDict[block][i];
            if (valu){
                tableValues[block][i] = getDict[block][i];
                tableState[block][i] = "confirmed";
                span.className = "confirmed-span";
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
        
    }

    
}