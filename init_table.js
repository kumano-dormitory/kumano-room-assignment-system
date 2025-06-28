document.addEventListener("DOMContentLoaded", () => {
  const blockNames = ["A1", "A2", "A3", "A4", "B12", "B3", "B4", "C12", "C34"];
  const columnCount = 6;
  const inputRows = document.getElementById("input-rows");

  blockNames.forEach(name => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.textContent = name;
    tr.appendChild(th);

    for (let i = 0; i < columnCount; i++) {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = `${name}[${i}]`;
      input.min = 0;
      input.max = 99;
      input.addEventListener("input", assignColors);
      td.appendChild(input);
      tr.appendChild(td);
    }

    inputRows.appendChild(tr);
  });

  assignColors();
});
