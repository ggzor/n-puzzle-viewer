import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import { aCartesiano } from "./lib";

export const TableroLayout = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(${(props) => props.n}, 1fr);
  grid-template-rows: repeat(${(props) => props.n}, 1fr);
  grid-gap: 2px;

  width: 200px;
  height: 200px;
`;

export const Celda = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;

  grid-row: ${(props) => props.fila + 1};
  grid-column: ${(props) => props.columna + 1};

  border: 1px solid rgba(0, 0, 0, 0.3);
  font-familly: Roboto, sans-serif;
`;

export const Movimiento = styled(motion.div)`
  color: ${(props) => (props.activo ? "green" : "black")};
  font-weight: ${(props) => (props.activo ? "bold" : "normal")};
  font-size: ${(props) => (props.activo ? "1.2em" : "1em")};
`;

export const ListaMovimientos = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Tablero = ({ tablero }) => {
  return (
    <TableroLayout n={3}>
      {tablero.datos
        .map((n, i) => [aCartesiano(i, tablero.n), n])
        .filter(([_, n]) => n !== 0)
        .map(([[fila, columna], n]) => (
          <Celda key={n} {...{ fila, columna }} layout>
            {n}
          </Celda>
        ))}
    </TableroLayout>
  );
};
