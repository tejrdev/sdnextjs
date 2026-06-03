import React, { useState, useEffect, MouseEvent } from 'react';

interface SelectOption {
    name: string;
    value: string;
}

interface CustomSelectProps {
    options: SelectOption[];
    label: string;
    id: string;
    onSelect: (value: string) => void;
    value: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, label, id, onSelect, value }) => {
    const filteredOptions = options.filter((item) => item.value.toLowerCase() == value);
    const initialSelectName = filteredOptions.length > 0 ? filteredOptions[0].name : '';

    const [isOpen, setOpen] = useState<boolean>(false);
    const [selectedVal, setSelectedVal] = useState<string>(value);
    const [selectedName, setSelectedName] = useState<string>(initialSelectName);

    // Update internal state when value prop changes
    useEffect(() => {
        setSelectedVal(value);
        const newSelectName = options.filter((item) => item.value.toLowerCase() == value);
        if (newSelectName.length > 0) {
            setSelectedName(newSelectName[0].name);
        } else {
            setSelectedName('');
        }
    }, [value, options]);

    const onTriggerClick = (e: MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        setOpen(!isOpen);
    };

    const OnSelectChange = (e: MouseEvent<HTMLSpanElement>, val: string, name: string) => {
        e.preventDefault();
        setOpen(false);
        setSelectedVal(val);
        onSelect(val);
        setSelectedName(name);
    };

    return (
        <div className='filter_item'>
            <label className='greytxt'>{label}</label>
            <div className='select_filters'>
                <div className='custom-select-wrapper' id={id}>
                    <div className={'custom-select ' + (isOpen ? ' opened' : '')}>
                        <span className='custom-select-trigger' onClick={onTriggerClick}>
                            {selectedName !== '' ? selectedName : selectedVal}
                        </span>
                        <div className='custom-options'>
                            {options.map((item, index) => (
                                <span className={'custom-option' + (selectedVal == item.value ? ' selection  ' : '')} data-value={item.value} onClick={(e) => OnSelectChange(e, item.value, item.name)} key={index}>
                                    {item.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;

