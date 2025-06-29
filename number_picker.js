function openNumberPicker(inputTarget) {
  const overlay = document.getElementById("overlay");
  const picker = document.getElementById("picker");
  picker.innerHTML = "";

  // validMembers を使って番号候補を限定
  const nums = Object.keys(validMembers).map(Number).sort((a, b) => a - b);

  nums.forEach(num => {
    const btn = document.createElement("div");
    btn.textContent = `${num}: ${validMembers[num]}`;
    btn.className = "num-btn";
    btn.addEventListener("click", () => {
      inputTarget.value = num;
      overlay.style.display = "none";
      assignColors(); // 色付け更新
    });
    picker.appendChild(btn);
  });

  overlay.style.display = "flex";
}

// 背景をクリックで閉じる
document.getElementById("overlay").addEventListener("click", (e) => {
  if (e.target.id === "overlay") {
    e.target.style.display = "none";
  }
});
