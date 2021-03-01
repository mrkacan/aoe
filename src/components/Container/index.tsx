import classNames from "classnames";
import { motion } from "framer-motion";
import * as React from "react";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import { withRouter } from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import Navigation from "../Navigation";

const PAGE_CHANGE_DURATION = 0.15;

interface IContainerProp {
    children: any,
    pathname: string,
}

const Container = ({
                       children,
                       history,
}: IContainerProp & RouteComponentProps) => {

    const wrapperClasses = classNames({
        "m-auto w-screen h-screen p-10 bg-gradient-to-r overflow-hidden": true,
    });

    const innerWrapperClasses = classNames({
        "w-full h-full bg-white p-4 rounded-xl overflow-y-auto": true,
    });

    return (
            <motion.div
                key="modal"
                initial={{opacity: 0, scale: 0.95}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.95}}
                transition={{duration: PAGE_CHANGE_DURATION}}
                className={wrapperClasses}
            >
                <div className={innerWrapperClasses}>
                    <Navigation />
                    <div className="mt-6">
                        {children}
                    </div>
                </div>
            </motion.div>
    );
};


const mapStateToProps = (state: IState) => {
    return ({
        pathname: state.router.location.pathname,
    });
};

export default connect(mapStateToProps)(withRouter(Container));
