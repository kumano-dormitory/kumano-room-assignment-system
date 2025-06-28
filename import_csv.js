function handleCSVImport() {
    const fileInput = document.getElementById("csv-upload");
    const file = fileInput.files[0];
    if (!file) {
      alert("CSVファイルを選択してください");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const csvText = e.target.result;
      console.log("CSVの内容：", csvText);

      // TODO: csvTextをパースして使う処理をここに書く
    };
    reader.readAsText(file, 'UTF-8');
  }