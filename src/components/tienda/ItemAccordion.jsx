/* eslint-disable react/prop-types */
import { FaCheck } from "react-icons/fa6";
import { ResaltarPalabras } from "../utils/utilsText";

const ItemAccordion = ({ propiedades }) => {

  // Palabras a resaltar
  const palabrasAResaltar = [
    "Potencia la atención y la memoria",
    "Reduce significativamente la ansiedad y el estrés",
    "Salud intestinal e inmunológica",
    "Antiinflamatorio y antióxidante:"
  ];

  return (
    <ul>
      {propiedades.map((p) => (
        <li key={p.id} className="flex items-start gap-3 m-2">
          <div className="pt-2">
            <FaCheck />
          </div>
          <ResaltarPalabras texto={p.propiedad} palabrasAResaltar={palabrasAResaltar} />
        </li>
      ))}
    </ul>
  );
};

export default ItemAccordion;