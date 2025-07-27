function applyWakuDict(){
    for (const block in tableState){
        let editableCount = 0;
        
        const maxEditable = wakuDict[block] || 0;
        console.log("wakuDict=>",wakuDict);
        console.log("maxEditable=",block,maxEditable);
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) return;
        const spans = row.querySelectorAll(`td span`);
        

        for (let i = 0; i < tableState[block].length; i++){
            if (tableState[block][i] === "confirmed") continue;

            if (editableCount < maxEditable){
                tableState[block][i] = "editable";
                const span = spans[i];
                span.className = "editable-span"
               // span.style.border = "2px dashed red";
                console.log(block,i,"editable");
                tableValues[block][i] = "";
                editableCount++;
              //  console.log("editablecount=",editableCount);
                span.onclick = () => {
                    currentTargetSpan = span;
                    showNumberPicker(currentTargetSpan);
                };
            }else{
                tableState[block][i] = "normal";
                const span = spans[i];
             //   console.log("editablecount=",editableCount);
                span.className = "normal-span"
                span.style.border = "2px dashed black";
                console.log(block,i,"normal");
                tableValues[block][i] = "";
                span.onclick = null;

            }
        }
    }
}