import { useEffect } from 'react';
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { withRouter } from "react-router-dom";
import { changeRangeValue, changeAgeFilterValue, appInitializing } from 'src/actions/units/units';
import { TITLE } from 'src/common/config/constants';
import { getFilteredList } from 'src/common/helpers/filteredItems';
import { IUnitsReducer } from 'src/reducers/units';
import CostSlider from "../../components/CostSlider";
import Tabs from "../../components/Tabs";
import Title from "../../components/Title";
import { IState } from '../../reducers';
import { If } from 'react-if';

interface IDispatchProps {
    updateRangeFilter: (rangeDisableObject: object) => void
    updateAgeFilterValue: (rangeDisableObject: object) => void
    getUnitData: () => void
}

const Units = (props: RouteComponentProps<any> & IDispatchProps & any) => {
    useEffect(() => {
        const {
            getUnitData
        } = props;

        getUnitData();
    }, []);

    const onRangeDisable = (rangeDisableObject: any) => {
        const {
            id,
            value
        } = rangeDisableObject;
        const {
            updateRangeFilter
        } = props;

        updateRangeFilter({
            key: id,
            data: {
                disabled: value
            }
        });
    };

    const onRangeSlideValueChange = (rangeObject: any) => {
        const {
            id,
            min,
            max,
        } = rangeObject;

        const {
            updateRangeFilter
        } = props;

        updateRangeFilter({
            key: id,
            data: {
                min,
                max,
            }
        });
    };


    const onAgeValueChange = (ageValue: string) => {
        const {
            updateAgeFilterValue
        } = props;

        updateAgeFilterValue({value: ageValue});
    };

    const {
        units,
        filterData,
        rangeData,
        history,
    } = props;

    return (
        <div>
            <Title
                type={TITLE.H2}
                title={'Ages'}
            />
            <Tabs
                data={filterData.data}
                current={filterData.selectedFilter}
                onTabSelect={(ageValue: string) => onAgeValueChange(ageValue)}
            />
            <Title
                type={TITLE.H2}
                title={'Costs'}
            />
            <CostSlider
                id={'food'}
                text={'Food'}
                disabled={rangeData.food?.disabled}
                rangeCurrentValue={rangeData.food?.value}
                onDisableValueChange={(rangeDisableObject) => onRangeDisable(rangeDisableObject)}
                onRangeValueChange={(rangeObject) => onRangeSlideValueChange(rangeObject)}
                min={rangeData.food?.min}
                max={rangeData.food?.max}
            />
            <CostSlider
                id={'wood'}
                text={'Wood'}
                disabled={rangeData.wood?.disabled}
                rangeCurrentValue={rangeData.wood?.value}
                onDisableValueChange={(rangeDisableObject) => onRangeDisable(rangeDisableObject)}
                onRangeValueChange={(rangeObject) => onRangeSlideValueChange(rangeObject)}
                min={rangeData.wood?.min}
                max={rangeData.wood?.max}
            />
            <CostSlider
                id={'gold'}
                text={'Gold'}
                disabled={rangeData.gold?.disabled}
                rangeCurrentValue={rangeData.gold?.value}
                onDisableValueChange={(rangeDisableObject) => onRangeDisable(rangeDisableObject)}
                onRangeValueChange={(rangeObject) => onRangeSlideValueChange(rangeObject)}
                min={rangeData.gold?.min}
                max={rangeData.gold?.max}
            />
            <div>
                <If condition={units.length > 0}>
                    <table className="min-w-full table-auto border-collapse border" data-testid="units-content-table">
                        <thead className="border border-primary bg-primary text-white">
                        <tr>
                            <th className="border border-primary">Name</th>
                            <th className="border border-primary">Age</th>
                            <th className="border border-primary">Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            units.map((item: any) => {
                                return (
                                    <tr
                                        data-testid={`unit_table_item_${item.id}`}
                                        key={`unit_table_item_${item.id}`}
                                        onClick={() => history.push(`unit/${item.id}`)}
                                        className="hover:bg-primary cursor-pointer"
                                    >
                                        <td className="border border-primary">{item.name}</td>
                                        <td className="border border-primary">{item.age}</td>
                                        <td className="border border-primary">{JSON.stringify(item.cost)}</td>
                                    </tr>
                                );
                            })
                        }
                        </tbody>
                    </table>
                </If>
                <If condition={units.length === 0}>
                    <div className="flex justify-center items-center text-sm">
                        No data found.
                    </div>
                </If>
            </div>
        </div>
    );
};

const mapStateToProps = (state: IState) => {
    const units = getFilteredList(state);
    return ({
        units,
        filterData: state.units.filterData,
        rangeData: state.units.rangeData,
        isLoading: state.units.isLoading,
    });
};

const mapDispatchToProps = (dispatch: MapDispatchToPropsParam<void & any, any>) => ({
    updateRangeFilter: (val: any) => dispatch(changeRangeValue(val)),
    updateAgeFilterValue: (val: any) => dispatch(changeAgeFilterValue(val)),
    getUnitData: () => dispatch(appInitializing()),
});

export default connect<IUnitsReducer & any, IDispatchProps, RouteComponentProps<any>, any>(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(Units));
