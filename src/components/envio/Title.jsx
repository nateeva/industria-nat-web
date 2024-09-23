/* eslint-disable react/prop-types */
export const Title = ({ className, title, hayError, description }) => {
  return (
    <div className={`text-marron-200 space-y-2 pb-2 ${className}`}>
      <h2 className="text-2xl font-bold">
        {title}
      </h2>
      {
        hayError ? (
          <p className="font-semibold text-red-500 ">{description}</p>
        ) : (
          <p>{description}</p>
        )
      }
    </div>
  )
}


