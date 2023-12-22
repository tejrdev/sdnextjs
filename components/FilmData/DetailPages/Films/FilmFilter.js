const FilmFilter = ({ data, setAlphabet, currentAlphabet }) => {
  const onFilmFilterCLick = (e) => {
    const alphabet = e.target.value;
    setAlphabet(alphabet);
  };
  return (
    <div className="filmaz_filter">
      <ul className="df fww">
        {data.map((item, index) => {
          return (
            <li
              className={item === currentAlphabet ? 'active' : ''}
              key={index}
            >
              <button
                className="alpha-filter"
                value={item}
                onClick={onFilmFilterCLick}
              >
                {item}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FilmFilter;
