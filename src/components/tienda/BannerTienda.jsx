import TitlePrimary from '../TitlePrimary';

export const BannerTienda = () => {
  const words1 = ["tienda"];
  const words2 = ["virtual"];
  return (
    <div className='bg-banner h-[55vh] lg:h-[65vh] flex justify-center items-center relative'>
      <div className='absolute inset-0 opacity-50 pointer-events-none bg-[#1a110f]'></div>
      <div className='relative z-10'>
        <TitlePrimary words1={words1} words2={words2} className="text-white " dynamic={false} />
      </div>
    </div>

  )
}
