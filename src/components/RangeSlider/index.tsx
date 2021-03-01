import { FC, InputHTMLAttributes, useState, SetStateAction } from 'react';
import classNames from 'classnames';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

interface IRangeSliderProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string,
    current: number,
    onInputChange: (number: object) => void,
    min: number,
    max: number,
    disabled: boolean
}


// This component was implemented by me for not using any other library.
// But, when thought about multi range will take so much time I decided to use package for it.

const RangeSlider: FC<IRangeSliderProps> = ({
                                                id,
                                                min,
                                                max,
                                                onInputChange,
                                                disabled,
                                            }) => {

    const [rangeValues, setRangeValues] = useState<SetStateAction<object | any>>({
        min: min,
        max: max
    });

    const wrapperClassNames = classNames({
        "flex justify-start items-center w-60   ": true,
        'cursor-not-allowed': disabled,
    });

    return (
        <div className={wrapperClassNames}>
            <InputRange
                disabled={disabled}
                value={{
                    min: rangeValues.min,
                    max: rangeValues.max
                }}
                draggableTrack={true}
                maxValue={200}
                minValue={0}
                step={1}
                onChange={(values: any) => {
                    setRangeValues({min: values.min, max: values.max});
                }}
                onChangeComplete={(values: any) => {
                    onInputChange({id, min: values.min, max: values.max});
                }}
            />
        </div>
    );
};

export default RangeSlider;
