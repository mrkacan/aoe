import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { TITLE } from 'src/common/config/constants';
import { decrement, decrementAsync, increment, incrementAsync } from '../../actions/counter/counter';
import Title from "../../components/Title";
import { IState } from '../../reducers';

interface IStateProps {
    count: number;
    isLoading: boolean;
}

interface IDispatchProps {
    decrement: () => void;
    decrementAsync: () => void;
    increment: () => void;
    incrementAsync: () => void;
}

// const Units = (props: RouteComponentProps<any> & IStateProps & IDispatchProps) => (
//     <>
//         <button onClick={props.decrement} disabled={props.isLoading}>
//             Decrement
//         </button>
//         <br />
//         <button onClick={props.decrementAsync} disabled={props.isLoading}>
//             Decrement Async
//         </button>
//         <div>
//             <div>Counter: {props.count}</div>
//         </div>
//         <div>
//             <button onClick={props.increment} disabled={props.isLoading}>
//                 Increment
//             </button>
//             <br />
//             <button onClick={props.incrementAsync} disabled={props.isLoading}>
//                 Increment Async
//             </button>
//         </div>
//     </>
// );


const Units = (props: RouteComponentProps<any> & IStateProps & IDispatchProps) => (
    <div>
        <Title
            type={TITLE.H2}
            title={'Ages'}
        />
        <Title
            type={TITLE.H2}
            title={'Costs'}
        />

        <input type="range" min="1" max="100" className="slider" id="myRange"/>
    </div>
);

const mapStateToProps = (state: IState) => ({
    count: state.counter.count,
    isLoading: state.counter.isLoading,
});

const mapDispatchToProps = (dispatch: any) => ({
    decrement: () => dispatch(decrement()),
    decrementAsync: () => dispatch(decrementAsync()),
    increment: () => dispatch(increment()),
    incrementAsync: () => dispatch(incrementAsync()),
});

export default connect<IStateProps, IDispatchProps, RouteComponentProps<any>, any>(
    mapStateToProps,
    mapDispatchToProps,
)(Units);
