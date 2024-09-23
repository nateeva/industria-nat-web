/* eslint-disable react/prop-types */
export const Logo = ({url, className, ...props}) => {
  return (
    <a href={url}  >
      <img
        src="/src/assets/images/logotipo-marron.png"
        alt="Logotipo Industria Natural"
        className={`w-24 ${className}`}
      />
    </a>
  )
}
