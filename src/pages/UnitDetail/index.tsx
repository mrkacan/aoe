import { useEffect } from "react";
import { connect, MapDispatchToPropsParam } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { TITLE } from 'src/common/config/constants';
import { IUnitsReducer } from 'src/reducers/units';
import { getDetailedItem } from "../../common/helpers/getDetailedItem";
import Title from "../../components/Title";
import { IState } from '../../reducers';
import { appInitializing } from 'src/actions/units/units';
import {ReactComponent as BackIcon} from '../../assets/icons/go-back-left-arrow.svg'
import { If } from 'react-if'

interface IDispatchProps {
    getUnitData: () => void
}

const UnitDetail = (props: RouteComponentProps<any> & any) => {
    useEffect(()=> {
        const {
            isUnitsEmpty,
            getUnitData,
        } = props;

        if(isUnitsEmpty){
            getUnitData();
        }
    }, [])
    const {
        unitItem,
        history
    } = props;

    return (
        <div>
            <div
                onClick={()=>history.goBack()}
            >
                <BackIcon className={"w-6 h-6 mb-6 cursor-pointer"} />
            </div>

            <Title
                type={TITLE.H2}
                title={`${unitItem?.name} Detail`}
            />

            <div>
            <If condition={unitItem}>
                <table
                    data-testid="unit-detail-table"
                    className="min-w-full table-auto border-collapse">
                    <tbody>
                        {
                            Object.keys(unitItem).map((key: string)=> {
                                const item = unitItem[key]
                                return (<tr
                                        key={`unit_detail_table_item_${key}`}
                                        data-testid={key}>
                                    <th className="border border-primary">{key}</th>
                                    <th className="border border-primary">{JSON.stringify(item)}</th>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </If>
            </div>
        </div>
    );
};


const mapStateToProps = (state: IState) => {
    const unitItem = getDetailedItem(state);
    return ({
        isUnitsEmpty: state.units.unitData.length === 0,
        unitItem: unitItem || {},
    });
};

const mapDispatchToProps = (dispatch: MapDispatchToPropsParam<void & any, any>) => ({
    getUnitData: () => dispatch(appInitializing()),
});

export default connect<IUnitsReducer & any, IDispatchProps, RouteComponentProps<any>, any>(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(UnitDetail));
