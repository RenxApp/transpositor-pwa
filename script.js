
function converter() {
  const input = document.getElementById("input").value;
  const lines = input.split("\n");
  const transposed = lines.map(line => line); // Simples placeholder
  document.getElementById("output").textContent = transposed.join("\n");
}
