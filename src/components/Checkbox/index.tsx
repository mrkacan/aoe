import classNames from "classnames";
import { FC, InputHTMLAttributes, useState, SetStateAction } from 'react';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    text: string,
    current: boolean,
    onInputChange: (value: object) => void,
}


// This component was implemented by me for not using any other library.
// But, when thought about multi range will take so much time I decided to use package for it.

const Checkbox: FC<ICheckboxProps> = ({
                                          id,
                                          text,
                                          current,
                                          onInputChange,
                                      }) => {

    const [isChecked, seIisChecked] = useState<SetStateAction<boolean | any>>(current);

    const onChange = (): any => {
        const checkValue = !isChecked;
        onInputChange({id, value: checkValue});
        seIisChecked(checkValue);
    };


    const wrapperClassNames = classNames({
        "flex align-middle items-center justify-start cursor-pointer": true,
        'opacity-60': isChecked,
    });


    return (
        <div className={wrapperClassNames} onClick={onChange}>
            <input
                className={'checkbox cursor-pointer'}
                checked={!isChecked}
                onChange={onChange}
                type="checkbox"
                id={'checkbox1'}
            />
            <div className="ml-2 checkbox-text">
                {text}
            </div>
        </div>
    );
};

export default Checkbox;
