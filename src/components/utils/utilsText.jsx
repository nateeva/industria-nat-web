export const ResaltarPalabras = ({ texto, palabrasAResaltar }) => {
  // Escapar caracteres especiales para usarlos en RegExp
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const partes = texto.split(new RegExp(`(${palabrasAResaltar.map(escapeRegExp).join('|')})`, 'gi'));

  return (
    <p className='text-marron-200'>
      {partes.map((parte, index) =>
        palabrasAResaltar.map(word => word.toLowerCase()).includes(parte.toLowerCase()) ? (
          <strong key={index}>{parte}</strong>
        ) : (
          parte
        )
      )}
    </p>
  );
};