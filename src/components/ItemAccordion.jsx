
const ItemAccordion = ({descripcion, titulo, propiedades}) => {
  return (
    <>
        {titulo}
        <br/>
        {descripcion}
        <ul>
            {
                propiedades.map((p) => (
                    <li key={p.id}>
                        {p.propiedad}
                    </li>
                )
                )
            }
        </ul>
    </>
    

    // {
    //     cargando ? (
    //             <div className="flex justify-center mt-10">
    //                 <RingLoader color="#0f53d8" />
    //             </div> ) : (
    //             <div>
    //                 <span className="text-3xl font-bold my-[2rem] flex justify-center text-center" >{titCompuesto}</span>
    //                 <ItemList productos={productos}/>
    //             </div>
    //         )
    // }    

  )
}

export default ItemAccordion