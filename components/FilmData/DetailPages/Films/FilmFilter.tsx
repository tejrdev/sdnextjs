import React from 'react';
import { FilmFilterProps } from '@/types/movies';

const FilmFilter: React.FC<FilmFilterProps> = ({
    data,
    tag,
    setSelectedValue,
    currentValue,
    cls = '',
    mobsize = false,
    disabled = false
}) => {
    const onFilmFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        const val = e.currentTarget.value;
        setSelectedValue(val, tag);
    };

    return (
        <div className={`filmaz_filter ${mobsize ? 'min-w-[238px]' : ''}`}>
            <ul className="df fww">
                {data.map((item, index) => (
                    <li
                        className={`${cls} ${item === currentValue ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
                        key={index}
                    >
                        <button
                            className="alpha-filter block w-full"
                            value={item}
                            onClick={onFilmFilterClick}
                            disabled={disabled}
                        >
                            {item}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FilmFilter; 