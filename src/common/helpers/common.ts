interface IRangeSliderSteps {
    max: number
}

export const getRangeSliderSteps = ({
                                        max
                                    }: IRangeSliderSteps) => {
    const values = {
        0: 1,
        50: 5,
        500: 25,
    };
    let stepValue = 1;

    Object.keys(values).forEach(key => {
        if (max > Number(key)) {
            stepValue = values[key];
        }
    });

    return stepValue;
};


interface IDataProps {
    data: any
}

export const getFilteredData = ({
                                    data
                                }: IDataProps) => {
    let filters = [
        {
            id: 'all',
            text: 'All',
            action: 'ALL'
        },
    ];

    const uniqueArray = Array.from(new Set(data.map((item: any) => item.age)));

    uniqueArray.forEach((ageName: any) => {
        filters.push({
            id: ageName.toLowerCase(),
            text: ageName,
            action: ageName.toUpperCase()
        });
    });

    return filters;
};
