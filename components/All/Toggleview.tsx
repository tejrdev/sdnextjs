import React, { useState, MouseEvent } from 'react';
import tile from '../../public/images/Grid_View.svg';
import tablelist from '../../public/images/List_table_View.svg';
import chartimg from '../../public/images/ChartPieSlice.svg';

type ViewType = 'table' | 'tile' | 'chart';

interface ToggleviewProps {
    viewpass: (view: ViewType) => void;
}

const Toggleview: React.FC<ToggleviewProps> = ({ viewpass }) => {
    const [tableon, setTableon] = useState<ViewType>('table');

    const tablehandle = (view: ViewType) => {
        setTableon(view);
        viewpass(view);
    };

    return (
        <div className='toggleview'>
            <ul className={'viewsbox flex xsm:inline-flex flex-wrap list-none m-0 leading-normal justify-center ' + (tableon ? 'off' : '')}>
                <li
                    className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'table' ? 'bg-gold' : '')}
                    onClick={() => tablehandle('table')}
                >
                    <img src={tablelist.src} alt='' title='Table View' />
                </li>
                <li
                    className={'tab_items cursor-pointer border-r border-gray-500 px-3 py-2 ' + (tableon === 'tile' ? 'bg-gold' : '')}
                    onClick={() => tablehandle('tile')}
                >
                    <img src={tile.src} alt='' title='Tile View' />
                </li>
                <li
                    className={`chartview cursor-pointer  rounded-r-lg flex justify-center items-center w-12 h-11 ml-[-1px] ${tableon === 'chart' ? 'on bg-gold' : 'off grayscale'}`}
                    onClick={() => tablehandle('chart')}
                >
                    <img src={chartimg.src} alt='' className='mx-auto max-w-8' />
                </li>
            </ul>
        </div>
    );
};

export default Toggleview;

