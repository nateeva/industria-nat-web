import TitlePrimary from "../TitlePrimary"
const words1 = ["industria", "productos"];
const words2 = ["natural", "naturales"];

export const BannerIndex = () => {
  return (
    <div style={
      {
        backgroundImage: "url('/images/bg_textura.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className='grid items-center max-w-6xl md:grid-cols-2 mx-auto h-[90vh] md:h-[60vh] lg:h-[90vh] justify-items-center bg-banner-index'>
        <div className=''>
          <TitlePrimary words1={words1} words2={words2} className="lg:w-[300px]" dynamic={true} />
        </div>

        <img className='w-[70%] -mt-24 md:mt-0 hover:rotate-3 transition duration-300 transform origin-center' src="/images/bg_estatua.png" alt="estatua antigua" />

      </div>

    </div>

  )
}
