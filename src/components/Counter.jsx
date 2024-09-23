/* eslint-disable react/prop-types */
import Contador from '../hooks/Contador';

export const Counter = ({className, cantInicial}) => {

    const {contador, sumar, restar } = Contador(cantInicial)

    // const [count, setCount] = useState(0);

    // const decrement = () => {
    //     if (count > 0) {
    //         setCount(count - 1);
    //     }
    // };


    return (
        <div className={`flex items-center text-[18px] border-2 border-verde-100 font-inter text-verde-100 justify-between bg-claro ${className}`}>
            <button className='w-10 h-10 hover:bg-[#DEDCD6]' onClick={restar}>-</button>
            <div className='flex items-center justify-center w-10 h-10'>{contador}</div>
            <button className='w-10 h-10 hover:bg-[#DEDCD6]' onClick={sumar}>+</button>
        </div>
    );
};
