import { createSelector } from 'reselect';
import { IState } from "../../reducers";

const getAgeFilter = (state: IState) => state.units.filterData.selectedFilter;
const getRangeFilter = (state: IState) => state.units.rangeData;
const getUnits = (state: IState) => state.units.unitData;

const isBetween = ({
    filterParameters,
    item,
    key,
}: any) =>{
    const {
        min,
        max,
    } = filterParameters;

    const itemValue = (item && item.cost && item.cost[key]) ? item.cost[key] : null;

    return !!(itemValue && itemValue >= 0 && itemValue >= min && itemValue <= max);
    }

export const getFilteredList = createSelector(
    [getAgeFilter, getRangeFilter, getUnits],
    (ageName, rangeFilter, units) => {
        let filteredArray = units.filter((item: any) => (item.age.toLowerCase() === ageName.toLowerCase() || ageName === 'all'));


        const {
            wood,
            gold,
            food
        } = rangeFilter;

        if(!wood.disabled){
            filteredArray = filteredArray.filter((item: any) => isBetween({
                item,
                filterParameters: wood,
                key: 'Wood'
            }));
        }

        if(!food.disabled){
            filteredArray = filteredArray.filter((item: any) => isBetween({
                item,
                filterParameters: food,
                key: 'Food'
            }));
        }

        if(!gold.disabled){
            filteredArray = filteredArray.filter((item: any) => isBetween({
                item,
                filterParameters: gold,
                key: 'Gold'
            }));
        }

        return filteredArray;
    },
);