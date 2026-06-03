import React, { MouseEvent } from 'react';
import tableview from '@/public/images/icon-table.svg';
import listView from '@/public/images/List_table_View.svg';
import posterView from '@/public/images/Grid_View.svg';

type ViewType = 'table' | 'list' | 'poster';

interface TabletoggleProps {
    tabview: ViewType;
    toggclick: (view: ViewType) => void;
}

const Tabletoggle: React.FC<TabletoggleProps> = ({ tabview, toggclick }) => {
    const handleViewChange = (view: ViewType) => {
        toggclick(view);
    };

    return (
        <ul className={'viewsbox ttab flex xsm:inline-flex flex-wrap list-none mb-1 ml-0 xsm:ml-4 justify-center ' + (tabview === 'poster' ? 'off' : '')}>
            <li
                className={`tab_items ${tabview === 'table' ? 'bg-gold' : ''}`}
                onClick={() => handleViewChange('table')}
            >
                <img src={tableview.src} alt='' title='Table View' />
            </li>
            <li
                className={`tab_items ${tabview === 'list' ? 'bg-gold' : ''}`}
                onClick={() => handleViewChange('list')}
            >
                <img src={listView.src} alt='' title='List View' />
            </li>
            <li
                className={`tab_items ${tabview === 'poster' ? 'bg-gold' : ''}`}
                onClick={() => handleViewChange('poster')}
            >
                <img src={posterView.src} alt='' title='Poster View' />
            </li>
        </ul>
    );
};

export default Tabletoggle;

