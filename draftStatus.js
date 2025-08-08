function statusData(){
    window.draftStatus = "data";
    updateStatusLabel();
    console.log("status:", window.draftStatus);
    document.getElementById("start-button").disabled = false;
    document.getElementById("confirm-button").disabled = true;
    document.getElementById("confirm-button").style.display = "none";
    document.getElementById("draft-table").style.display = "none";
    document.getElementById("csv-upload-waku").style.opacity = 0.5;
    document.getElementById("next-round").style.display = "none";
    document.getElementById("slot-settings").style.display = "none";
}
function statusInput(){
    window.draftStatus = "input";
    updateStatusLabel();
    console.log("status:", window.draftStatus);
    document.getElementById("start-button").disabled = true;
    document.getElementById("start-button").style.display = "none";
    document.getElementById("confirm-button").disabled = false;
    document.getElementById("confirm-button").style.display = "block";
    document.getElementById("draft-table").style.display = "block";
    document.getElementById("next-round").style.display = "none";
    document.getElementById("confirm-button").style.display = "block";
}
function statusReEntry(){
    window.draftStatus = "reEntry";
    updateStatusLabel();
    console.log("status:", window.draftStatus);
    document.getElementById("start-button").disabled = true;
    document.getElementById("confirm-button").style.display = "block";
    document.getElementById("draft-table").style.display = "block";

}
function statusDone(){
    window.draftStatus = "done";
    updateStatusLabel();
   // const round = parseInt(document.getElementById("round").textContent);
   // const newRound = round + 1;
   // document.getElementById("round").textContent = parseInt(newRound, 10);
    console.log("status:", window.draftStatus);
    document.getElementById("start-button").disabled = true;
    document.getElementById("draft-table").style.display = "block";
    document.getElementById("next-round").style.display = "block";
    document.getElementById("confirm-button").style.display = "none";
}

function statusLocked(){
    window.draftStatus = "locked";
    updateStatusLabel();
    console.log("status:", window.draftStatus);
    document.getElementById("start-button").disabled = true;
    document.getElementById("draft-table").style.display = "block";
    document.getElementById("next-round").textContent = "おわりました";
}