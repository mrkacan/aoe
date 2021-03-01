import { FC, InputHTMLAttributes, useState, SetStateAction } from 'react';
import Checkbox from "../Checkbox";
import RangeSlider from "../RangeSlider";

interface ICostSliderProps extends InputHTMLAttributes<HTMLInputElement> {
    rangeCurrentValue: number,
    onDisableValueChange: (value: object) => void,
    onRangeValueChange: (value: object) => void,
    min: number,
    max: number,
    disabled: boolean
    text: string
    id: string
}

// This component was implemented by me for not using any other library.
// But, when thought about multi range will take so much time I decided to use package for it.

const CostSlider: FC<ICostSliderProps> = ({
                                              text,
                                              id,
                                              onDisableValueChange,
                                              onRangeValueChange,
                                              rangeCurrentValue,
                                              min,
                                              max,
                                              disabled,
                                          }) => {

    const [isDisabled, setIIsDisabled] = useState<SetStateAction<boolean | any>>(disabled);

    const onDisableChange = (disabledValue: object): any => {
        const checkValue = !isDisabled;
        setIIsDisabled(checkValue);
        onDisableValueChange(disabledValue);
    };

    return (
        <div className="flex justify-start items-center mt-5 mb-12">
            <Checkbox
                id={id}
                text={text}
                current={isDisabled}
                onInputChange={onDisableChange}
            />
            <RangeSlider
                id={id}
                current={rangeCurrentValue}
                onInputChange={onRangeValueChange}
                min={min}
                max={max}
                disabled={isDisabled}
            />
        </div>
    );
};

export default CostSlider;
