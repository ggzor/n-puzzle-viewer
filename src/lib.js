export const Right = (value) => ({ kind: "Right", value });
export const Left = (value) => ({ kind: "Left", value });

export function aCartesiano(indice, medida) {
  return [Math.floor(indice / medida), Math.floor(indice % medida)];
}

export function aIndice([fila, columna], medida) {
  return fila * medida + columna;
}

export function esValida([fila, columna], medida) {
  return 0 <= fila && fila < medida && 0 <= columna && columna < medida;
}

export function sumar([f1, c1], [f2, c2]) {
  return [f1 + f2, c1 + c2];
}

export function tableroDeString(s) {
  const datos = [];
  for (let n of s.matchAll(/\d+/g)) {
    datos.push(Number(n));
  }
  const n = Math.floor(Math.sqrt(datos.length));
  const indice = datos.indexOf(0);

  if (n * n !== datos.length) return Left("El tablero no es cuadrado");
  if (indice === -1) return Left("El tablero no contiene espacio en blanco");

  return Right({
    n,
    espacio: aCartesiano(indice, n),
    datos,
  });
}

export const desplazamientosMovimientos = {
  up: [-1, 0],
  right: [0, 1],
  down: [1, 0],
  left: [0, -1],
};

export function aplicarMovimiento(tablero, mov) {
  const espacio = sumar(tablero.espacio, desplazamientosMovimientos[mov]);

  if (!esValida(espacio, tablero.n))
    return Left(
      `${mov.capitalize()} no es un movimiento válido para el tablero`
    );

  const datos = [...tablero.datos];
  datos[aIndice(espacio, tablero.n)] = 0;
  datos[aIndice(tablero.espacio, tablero.n)] =
    tablero.datos[aIndice(espacio, tablero.n)];

  return Right({
    n: tablero.n,
    espacio,
    datos,
  });
}
