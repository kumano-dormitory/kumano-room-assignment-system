 let currentTargetSpan = null;

    function showNumberPicker(currentTargetSpan) {
      const picker = document.getElementById("number-picker");
      picker.innerHTML = ""; // 初期化

      picker.style.display = "grid";
      picker.style.gridTemplateColumns = "repeat(5, 1fr)";
      picker.style.gap = "5px";
      // rebuildConfirmedMembers();

      for (const validNumber of Object.keys(validMembers)
            .map(n => parseInt(n, 10))){
     //       .filter(n => !confirmedMembers.has(n))) {
            const item = document.createElement("button");
            item.textContent = validNumber;
            item.className = "picker-item";
            item.style.padding = "5px";
            item.style.border = "1px solid #ccc";
            item.style.backgroundColor = "red";
            item.style.cursor = "pointer";
            item.addEventListener("click", () => {
            if (currentTargetSpan) {
              const num = validNumber;
              currentTargetSpan.textContent = num;
              const BLK = currentTargetSpan.dataset.block;
              const IDX = Number(currentTargetSpan.dataset.index);
              tableValues[BLK][IDX] = num;


                // 必要な再構築処理をここで呼び出す
             // rebuildConfirmedMembers(); // confirmedMembers を更新
            }
            picker.style.display = "none";
            assignColors()
          });
          picker.appendChild(item);
      }

      const rect = currentTargetSpan.getBoundingClientRect();
      picker.style.position = "absolute";
      picker.style.top = `${window.scrollY + rect.bottom + 5}px`;
      picker.style.left = `${window.scrollX + rect.left}px`;
      picker.style.zIndex = "9999"; // 他要素の上に表示
      picker.style.backgroundColor = "#fff";
      picker.style.border = "1px solid #aaa";
      picker.style.padding = "10px";
      picker.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
    }

      document.addEventListener("click", function (e) {
        if (e.target.classList.contains("editable-span")) {
          currentTargetSpan = e.target;
          showNumberPicker(e.target);
          e.stopPropagation(); // pickerがすぐ閉じないように
        } else {
          document.getElementById("number-picker").style.display = "none";
        }
      });