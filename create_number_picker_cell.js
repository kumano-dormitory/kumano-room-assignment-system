function createNumberPickerCell(cell, block, index) {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = `${block}[${index}]`;
  input.readOnly = true;
  input.classList.add("number-picker-input");

  const button = document.createElement("button");
  button.textContent = "選択";
  button.classList.add("picker-btn");

  // クリックでピッカーを開く
  button.addEventListener("click", () => showNumberPicker(input));

  cell.appendChild(input);
  cell.appendChild(button);
}
