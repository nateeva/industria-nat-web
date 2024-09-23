import React from 'react'

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-4">
      <ul className="flex list-none">
        <li>
          <button
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>
        {pages.map((page) => (
          <li key={page}>
            <button
              className={`px-4 py-2 mx-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-100'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className="px-4 py-2 mx-1 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </div>
  );
}
