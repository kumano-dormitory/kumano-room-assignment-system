function handleConflicts(conflicts) {
  return new Promise((resolve) => {
    const modal = document.getElementById("conflict-modal");
    const form = document.getElementById("conflict-form");
    form.innerHTML = ""; // リセット

    const winnersMap = {};

    conflicts.forEach(conflict => {
      const wrapper = document.createElement("div");
      wrapper.className = "conflict-group";

      const label = document.createElement("div");
      label.textContent = `No.${conflict.val} の勝者を選んでください：`;
      wrapper.appendChild(label);

      conflict.blocks.forEach(block => {
        const button = document.createElement("span");
        button.className = "block-choice";
        button.textContent = block;

        button.onclick = () => {
          winnersMap[conflict.val] = block;

          // 選択状態の更新
          wrapper.querySelectorAll(".block-choice").forEach(btn => {
            btn.classList.remove("block-selected", "block-unselected");
            if (btn.textContent === block) {
              btn.classList.add("block-selected");
            } else {
              btn.classList.add("block-unselected");
            }
          });
        };

        wrapper.appendChild(button);
      });

      form.appendChild(wrapper);
    });

    document.getElementById("conflict-submit").onclick = () => {
      // 全ての競合に対して選択が済んでいるか確認
      const allDecided = conflicts.every(c => winnersMap.hasOwnProperty(c.val));
      if (!allDecided) {
        alert("すべての競合について選択してください。");
        return;
      }

      modal.style.display = "none";
      resolve(winnersMap);
    };

    modal.style.display = "block";
  });
}
