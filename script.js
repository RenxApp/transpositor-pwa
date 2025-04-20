const notas = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function detectarTom(lines) {
  for (const line of lines) {
    const acordes = line.match(/\b[A-G]#?(m|maj7|m7|7|sus2|sus4|dim|aug|add9|°|\+)?\b/g);
    if (acordes && acordes.length > 0) {
      const primeiraNota = acordes[0].match(/^([A-G]#?)/);
      if (primeiraNota) return primeiraNota[0];
    }
  }
  return 'C';
}

function transpõeAcorde(acorde, semitons) {
  return acorde.replace(/[A-G]#?(m|maj7|m7|7|sus2|sus4|dim|aug|add9|°|\+)?/g, match => {
    const nota = match.match(/^([A-G]#?)/)?.[0];
    const sufixo = match.substring(nota.length);
    const i = notas.indexOf(nota);
    if (i === -1) return match;
    const novaNota = notas[(i + semitons + 12) % 12];
    return novaNota + sufixo;
  });
}

function converter() {
  const input = document.getElementById('input').value;
  const lines = input.split('\n');

  const tomOriginal = detectarTom(lines);
  const tomDestino = document.getElementById('tomDestino').value;
  document.getElementById('tomOriginal').innerHTML = `<option>${tomOriginal}</option>`;

  const semitons = notas.indexOf(tomDestino) - notas.indexOf(tomOriginal);

  const resultado = lines.map((linha, index) => {
    if (index % 2 === 0) {
      return transpõeAcorde(linha, semitons);
    } else {
      return linha;
    }
  });

  document.getElementById('output').textContent = resultado.join('\n');
}
