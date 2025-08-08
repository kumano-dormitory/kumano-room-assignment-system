function confirmInputs(){

    const errors = [];
    const draftData = {};
    const confirmedValues = new Set();

    for (const block in tableValues){   //　現在すでに確定済みの番号を収集する →　confirmedValues
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) return;
        const spans = row.querySelectorAll(`td span`);

        for (let i = 0; i< window.columnCount[block]; i++){
            const span = spans[i];
            if(span.className == "confirmed-span"){
                confirmedValues.add(tableValues[block][i]);
            }
        }
    }

    console.log("確定済み番号=",confirmedValues);

    for (const block in tableValues){
        const row = Array.from(document.querySelectorAll("tbody tr"))
            .find(tr => tr.querySelector("th")?.textContent === block);
        if (!row) return;
        const spans = row.querySelectorAll(`td span`);
        draftData[block] = [];

        for (let i = 0; i < window.columnCount[block]; i++){
            const span = spans[i];
            if(span.className == "editable-span"){
                const valu = tableValues[block][i];
                if(confirmedValues.has(valu)){
                    errors.push(`No.${valu}は確定済みです`);
                    alert(errors.join("\n"));
                    return;
                }
                if(!(valu in validMembers)){
                    errors.push(`${valu}番は選べません`);
                    alert(errors.join("\n"));
                    return;
                }
            
                if(valu){
                    draftData[block].push(valu);
                   

                }

            }
        }
    }
    statusDone();
    updateStatusLabel();
    sendToServer({round_data: draftData, winners:{}});
    console.log("ねむい");
}