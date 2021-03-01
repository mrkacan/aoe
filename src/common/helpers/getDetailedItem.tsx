import { createSelector } from 'reselect';
import { IState } from "../../reducers";

const getId = (state: IState) => state.router.location.pathname.split('/')[2];
const getUnits = (state: IState) => state.units.unitData;

export const getDetailedItem = createSelector(
    [getId, getUnits],
    (id, units) => {
        let item = units.find((item: any) => (item.id === Number(id) ));

        return item;
    },
);