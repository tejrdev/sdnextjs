import React, { useState, MouseEvent } from 'react';

interface TogglebtnProps {
    toggleleft?: string;
    toggleright?: string;
    ontoggle: (value: boolean) => void;
}

const Togglebtn: React.FC<TogglebtnProps> = ({ toggleleft = 'Left', toggleright = 'Right', ontoggle }) => {
    const [toggleon, setToggleon] = useState<boolean>(false);

    const togglehandle = (e: MouseEvent<HTMLLIElement>) => {
        setToggleon(!toggleon);
        ontoggle(toggleon);
    };

    return (
        <ul className={'daystype df fww ' + (toggleon ? 'off' : '')}>
            <li className="tab_items mt-1 active" data-title="Weekend" id="weekend_colection_data">
                {toggleleft}
            </li>
            <li className={'togglebtn ' + (toggleon ? 'off' : '')} onClick={togglehandle}>
                <div className="togglehandel"></div>
            </li>
            <li className="tab_items mt-1" data-title="Weekly" id="weekely_colection_data">
                {toggleright}
            </li>
        </ul>
    );
};

export default Togglebtn;

