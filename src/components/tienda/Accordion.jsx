/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";

import ItemAccordion from "./ItemAccordion";
import Context from "../../context/AppContext";

import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

export const Accordion = ({ id, title, defaultOpen = false }) => {

    // --- Propiedades producto
    const [propiedades, setPropiedades] = useState([]);
    const { listPropiedades } = useContext(Context);

    // traer propiedades
    useEffect(() => {
        const fetchPropiedad = async () => {
            try {
                const data = await listPropiedades(id);
                setPropiedades(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPropiedad();
    }, [id, listPropiedades]);


    // --- Accordion
    const [accordionOpen, setAccordionOpen] = useState(defaultOpen);

    const toggleAccordion = () => {
        setAccordionOpen(!accordionOpen);
    };

    // setear si se abre por defecto
    useEffect(() => {
        setAccordionOpen(defaultOpen);
    }, [defaultOpen]);

    return (
        <div className="w-full text-marron-200">
            <div
                onClick={toggleAccordion}
                className="flex justify-between pb-2 mb-3 font-bold border-b cursor-pointer border-marron-200"
            >
                <h3 className="text-[18px]">{title}</h3>
                <span>{accordionOpen ? <FaChevronUp /> : <FaChevronDown />}</span>
            </div>

            <div
                className={`overflow-hidden transition-max-height duration-500 ease-in-out ${accordionOpen ? "max-h-screen" : "max-h-0"
                    }`}
            >
                <ItemAccordion propiedades={propiedades} />
            </div>
        </div>
    );
};