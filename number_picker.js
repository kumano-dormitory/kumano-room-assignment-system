 let currentTargetSpan = null;

    function showNumberPicker(targetElement) {
      const picker = document.getElementById("number-picker");
      picker.innerHTML = ""; // 初期化

  picker.style.display = "grid";
  picker.style.gridTemplateColumns = "repeat(5, 1fr)";
  picker.style.gap = "5px";

      for (let i = 0; i <= 20; i++) {
            const item = document.createElement("button");
            item.textContent = i;
            item.className = "picker-item";
            item.style.padding = "5px";
            item.style.border = "1px solid #ccc";
            item.style.backgroundColor = "#f0f0f0";
            item.style.cursor = "pointer";
        item.addEventListener("click", () => {
          if (currentTargetSpan) {
            currentTargetSpan.textContent = i;
            currentTargetSpan.classList.add("editable-span");
            currentTargetSpan.classList.remove("confirmed-span");
              // 必要な再構築処理をここで呼び出す
            rebuildConfirmedMembers(); // confirmedMembers を更新
          }
          picker.style.display = "none";
        });
        picker.appendChild(item);
      }

     const rect = targetElement.getBoundingClientRect();
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