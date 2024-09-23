/* eslint-disable react/prop-types */
export const Container = ({ children, className, title }) => {
    return (
        <div className={`lg:border lg:border-marron-200 lg:px-8 lg:py-6 ${className}`}>
            <h2 className="pb-4 text-2xl font-bold text-marron-200">{title}</h2>
            {children}
        </div>
    )
}

