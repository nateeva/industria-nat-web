/* eslint-disable react/prop-types */
export const Logo = ({url, className, ...props}) => {
  return (
    <a href={url}  >
      <img
        src="/images/logotipo_marron.svg"
        alt="Logotipo Industria Natural"
        className={`w-28 ${className}`}
      />
    </a>
  )
}
