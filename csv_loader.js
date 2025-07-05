let validMembers = {};  // { 番号: 氏名 } を保持

function handleCSVUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lines = e.target.result.split("\n");
    lines.forEach(line => {
      const [numStr, name] = line.trim().split(",");
      const num = parseInt(numStr, 10);
      if (!isNaN(num) && name) {
        validMembers[num] = name;
      }
    });
    //alert("CSV読み込み完了。新入寮生が " + Object.keys(validMembers).length + " 人登録されました。");
    console.log("新入寮生:", validMembers);
    document.getElementById("result-area").textContent = 
  "読み込んだ新入寮生:\n" + 
  Object.entries(validMembers).map(([num, name]) => `No.${num}: ${name}`).join("\n");

  };
  reader.readAsText(file);
  
}
