import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

import {
  aplicarMovimiento,
  movimientoContrario,
  letraAMovimiento,
  movimientosDeString,
  tableroDeString,
} from "./lib";

import { Tablero, ListaMovimientos, Movimiento } from "./Componentes";

// prettier-ignore
const inicial =
`
 8  6  3
 0  2  5
 4  1  7
`;
const todosMovimientos = `
D,R,R,U,U,L,D,R,U,L,D,L,D,R,R,U,U,L,L,D,R,U,R,D,D,L,U,U,R,D,D,L,U,R,U,L,D,D,R,U,L,U,R,D,D
`;

const App = () => {
  const [tablero, setTablero] = useState(() => tableroDeString(inicial).value);
  const [movimientos] = useState(
    () => movimientosDeString(todosMovimientos).value
  );
  const [indice, setIndice] = useState(0);

  function irInicio() {
    setIndice(() => 0);
    setTablero((tab) => {
      return movimientos
        .slice(0, indice)
        .reverse()
        .map((m) => movimientoContrario[letraAMovimiento[m]])
        .reduce((tab, mov) => aplicarMovimiento(tab, mov).value, tab);
    });
  }

  function irAnterior() {
    setIndice((i) => i - 1);
    setTablero(
      (tab) =>
        aplicarMovimiento(
          tab,
          movimientoContrario[letraAMovimiento[movimientos[indice - 1]]]
        ).value
    );
  }

  function irSiguiente() {
    setIndice((i) => i + 1);
    setTablero(
      (tab) =>
        aplicarMovimiento(tab, letraAMovimiento[movimientos[indice]]).value
    );
  }

  function irFinal() {
    setIndice(() => movimientos.length);
    setTablero((tab) =>
      movimientos
        .slice(indice)
        .reduce(
          (tab, mov) => aplicarMovimiento(tab, letraAMovimiento[mov]).value,
          tab
        )
    );
  }

  return (
    <>
      <Tablero tablero={tablero}></Tablero>
      <br />
      Movimientos ({indice}/{movimientos.length}):
      <ListaMovimientos>
        {movimientos.map((m, i) => (
          <Movimiento key={i} activo={i + 1 === indice}>
            {m}
          </Movimiento>
        ))}
      </ListaMovimientos>
      <div>
        <button disabled={indice === 0} onClick={irInicio}>
          Inicio
        </button>
        <button disabled={indice === 0} onClick={irAnterior}>
          Anterior
        </button>
        <button disabled={indice === movimientos.length} onClick={irSiguiente}>
          Siguiente
        </button>
        <button disabled={indice === movimientos.length} onClick={irFinal}>
          Final
        </button>
      </div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
