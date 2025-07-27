function enableReentry(losers) {
  // const wakuDict = {};
  console.log("losers=>",losers);
  for (const block in losers) {
    //wakuDict[block] = losers[block]; // 負けた回数が指名数になる
  }
  console.log("再入力可能枠:",losers);
  for (const block in tableState){
    
        let editableCount2 = 0;
        
        const maxEditable2 = losers[block] || 0;
     //   console.log("wakuDict=>",wakuDict);
        console.log("maxEditable2=",block,maxEditable2);
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) return;
        const spans = row.querySelectorAll(`td span`);
        

        for (let i = 0; i < tableState[block].length; i++){
            if (tableState[block][i] === "confirmed") continue;

            if (editableCount2 < maxEditable2){
                tableState[block][i] = "editable";
                const span = spans[i];
                span.className = "editable-span"
               // span.style.border = "2px dashed red";
                console.log(block,i,"editable");
                tableValues[block][i] = "";
                currentTargetSpan = span;
                currentTargetSpan.textContent = tableValues[block][i];
                editableCount2++;
                console.log("editablecount2=",editableCount2);
                span.onclick = () => {
                    currentTargetSpan = span;
                    showNumberPicker(currentTargetSpan);
                };
            }else{
                tableState[block][i] = "normal";
                const span = spans[i];
                console.log("editablecount2=",editableCount2);
                span.className = "normal-span"
                span.style.border = "2px dashed black";
                console.log(block,i,"normal");
                tableValues[block][i] = "";
                span.onclick = null;

            }
        }
    }
  }
  

