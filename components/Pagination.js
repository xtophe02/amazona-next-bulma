export default function Pagination({ countProducts, state, setState }) {
  return (
    <nav
      className='pagination is-centered'
      role='navigation'
      aria-label='pagination'
    >
      {/* <a className='pagination-previous'>Previous</a> */}
      {/* <a className='pagination-next'>Next page</a> */}
      <ul className='pagination-list'>
        {Array.from(Array(Math.ceil(countProducts / 6)).keys()).map((page) => (
          <li key={page}>
            <a
              className={`pagination-link ${
                Number(state.page) === Number(page + 1) && 'is-current'
              }`}
              aria-label='Goto page 1'
              value={page + 1}
              onClick={(e) => {
                e.preventDefault();
                setState((prev) => ({
                  ...prev,
                  page: e.target.getAttribute('value'),
                }));
              }}
            >
              {page + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
