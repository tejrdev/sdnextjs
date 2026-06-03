import React, { useEffect, useState, ReactElement, ReactNode } from 'react';

interface TabProps {
    label: string;
    disable?: string | boolean;
    className?: string;
    children?: ReactNode;
}

interface TabsProps {
    children: ReactNode;
    tabonname?: string;
}

const Tabs: React.FC<TabsProps> = ({ children, tabonname = '' }) => {
    const childrenArray = React.Children.toArray(children) as ReactElement<TabProps>[];
    const firstChild = childrenArray.length > 0 && childrenArray[0] ? childrenArray[0] : childrenArray[1];
    const [activeTab, setActiveTab] = useState<string | undefined>(firstChild?.props?.label);

    useEffect(() => {
        if (tabonname !== '') {
            setActiveTab(tabonname);
        }
    }, [tabonname]);

    let content: ReactNode;
    const tabtitles: Array<{ name: string; state?: string | boolean; className?: string }> = [];

    React.Children.forEach(children, (child) => {
        if (React.isValidElement<TabProps>(child)) {
            const childProps = child.props;
            tabtitles.push({
                name: childProps.label,
                state: childProps.disable,
                className: childProps.className,
            });
            if (childProps.label === activeTab) {
                content = childProps.children;
            }
        }
    });

    return (
        <div className='tabs'>
            <div className='tabnav secnav_link'>
                <ul className='secnav_linkin df'>
                    {tabtitles.map((tabtitle, index) => (
                        <li
                            key={index}
                            className={(tabtitle.className ? tabtitle.className + ' ' : '') + (tabtitle.name === activeTab ? 'active' : '')}
                            onClick={() => setActiveTab(tabtitle.name)}
                            aria-disabled={tabtitle.state ? true : undefined}
                        >
                            <strong>{tabtitle.name}</strong>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='tab-content'>{content}</div>
        </div>
    );
};

export const Tab: React.FC<TabProps> = (props) => {
    return <>{props.children}</>;
};

export default Tabs;

