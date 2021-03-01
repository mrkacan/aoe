import classNames from "classnames";
import { FC, InputHTMLAttributes, useState, SetStateAction } from 'react';

interface ITabsProps extends InputHTMLAttributes<HTMLInputElement> {
    current: string,
    onTabSelect: (id: string) => void,
    data: object[]
}

const Tabs: FC<ITabsProps> = ({
                                  data,
                                  current,
                                  onTabSelect
                              }) => {

    const [selectedTab, setSelectedTab] = useState<SetStateAction<number | any>>(current);

    const onTabChange = (id: string): any => {
        setSelectedTab(id);
        onTabSelect(id);
    };

    return (
        <div className="inline-flex align-middle items-center justify-start tabs-wrapper rounded-lg	border border-primary overflow-hidden mb-8">
            {
                data.map((item: any) => {
                    const isSelected = selectedTab === item.id;
                    const tabClassNames = classNames({
                        'p-3 pt-2 pb-2  cursor-pointer text-current': true,
                        'bg-primary text-white': isSelected
                    })
                    return (
                        <div
                            key={`tab_item_${item.id}`}
                            data-testid={item.text}
                            onClick={()=>onTabChange(item.id)}
                            className={tabClassNames}>
                            {item.text}
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Tabs;
