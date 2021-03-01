import {
    INITIAL_UNIT_DATA,
    UNIT_DATA_IS_LOADING,
    INITIAL_FILTER_DATA,
    CHANGE_RANGE_VALUE,
    CHANGE_FILTER_VALUE,
} from "../actions/units/unitsConstants";

interface rangeObject {
    min: number,
    max: number,
    disabled: boolean
}

interface IUnitsReducer {
    unitData: object[],
    filterData: {
        data: object[],
        selectedFilter: string,
    },
    rangeData: {
        data: object[],
        wood: rangeObject,
        gold: rangeObject,
        food: rangeObject
    },
    isLoading: boolean
}

const initialState = {
    unitData: [],
    filterData: {
        data: [],
        selectedFilter: 'all'
    },
    rangeData: {
        data: [],
        wood: {
            min: 0,
            max: 100,
            disabled: true
        },
        gold: {
            min: 0,
            max: 100,
            disabled: true
        },
        food: {
            min: 0,
            max: 100,
            disabled: true
        },
    },
    isLoading: false
};

const unitsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case INITIAL_UNIT_DATA:
            return {
                ...state,
                unitData: action.payload,
            };
        case UNIT_DATA_IS_LOADING:{
            return {
                ...state,
                isLoading: action.payload,
            };
        }
        case INITIAL_FILTER_DATA:
            return {
                ...state,
                filterData: {
                    selectedFilter: 'all',
                    data: action.payload
                },
            };
        case CHANGE_RANGE_VALUE:{
            const key = action.payload.key;

            const newData = {
                ...state,
                rangeData: {
                    ...state.rangeData,
                    [key]: {
                        ...state.rangeData[key],
                        ...action.payload.data,
                    }
                },
            };
            return newData
        }
        case CHANGE_RANGE_VALUE:{
            const key = action.payload.key;

            const newData = {
                ...state,
                rangeData: {
                    ...state.rangeData,
                    [key]: {
                        ...state.rangeData[key],
                        ...action.payload.data,
                    }
                },
            };
            return newData
        }
        case CHANGE_FILTER_VALUE:{
            const newData = {
                ...state,
                filterData: {
                    ...state.filterData,
                    selectedFilter: action.payload.value
                },
            };
            return newData
        }
        default:
            return state;
    }
};

export { unitsReducer };
export type { IUnitsReducer };

