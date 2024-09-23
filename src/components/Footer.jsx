export const Footer = () => {

  return (
    <div id='contacto' className='flex flex-col justify-center gap-16 py-24 md:flex-row md:justify-around bg-verde-100 font-ebGaramond text-marron-200 '>
      <div className='text-center'>
        <h2 className='mb-2 text-2xl font-bold md:text-3xl'>Contacto</h2>
        <ul className='text-[18px] font-medium'>
          <li>15 1234 6789</li>
          <li>CABA, Arg.</li>
        </ul>
      </div>

      <div className='text-center'>
        <h2 className='mb-2 text-2xl font-bold md:text-3xl'>Social</h2>
        <ul className='text-[18px] font-medium'>
          <li><a href="" className='hover:underline'>instagram</a></li>
          <li><a href="" className='hover:underline'>whatsApp</a></li>
        </ul>
      </div>

    </div>
  )
}
