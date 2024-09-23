export const formatPriceToARS = (value) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
    }).format(value);
};

export const truncateDescription = (text, limit = 20) => {
    const words = text.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return text;
};

export const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    const dia = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Meses en JavaScript son base 0, por eso +1
    const anio = date.getFullYear(); // Obtiene el año de 4 dígitos
  
    return `${dia}/${mes}/${anio}`;
}