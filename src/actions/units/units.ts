import {
    INITIAL_UNIT_DATA,
    UNIT_DATA_IS_LOADING,
    INITIAL_FILTER_DATA,
    CHANGE_RANGE_VALUE,
    APP_LOADING,
    CHANGE_FILTER_VALUE
} from './unitsConstants';

export const appInitializing = () => {
    return {
        type: APP_LOADING,
    };
};

export const initialUnitData = (data: any) => {
    return {
        type: INITIAL_UNIT_DATA,
        payload: data
    };
};

export const unitsLoading = (state: boolean) => {
    return {
        type: UNIT_DATA_IS_LOADING,
        payload: state
    };
};

export const initialFilterData = (data: object[]) => ({
    type: INITIAL_FILTER_DATA,
    payload: data
});

export const changeRangeValue = (data: object) => ({
    type: CHANGE_RANGE_VALUE,
    payload: data
});

export const changeAgeFilterValue = (selectedFilter: string) => ({
    type: CHANGE_FILTER_VALUE,
    payload: selectedFilter
});
