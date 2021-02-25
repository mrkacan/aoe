import * as classNames from 'classnames';
import { SetStateAction } from 'react';
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { ROUTES } from "src/common/config/route";
import { TITLE } from "../../common/config/constants";
import { IState } from "../../reducers";
import Title from "../Title";

interface INavigationProps {
    pathname: string,
}


const Menu = ({
                  history,
                  pathname,
              }: INavigationProps & RouteComponentProps) => {

    const [title, setTitle] = useState<SetStateAction<string|any>>('')

    useEffect(()=> {
        const currentTitle = ROUTES.find((route: any)=>route.key === pathname.replace(/[0-9]/g, ''))?.title || ''
        setTitle(currentTitle)
    }, [])

    const navigationWrapperClasses = classNames({
        'flex align-middle items-center border-b shadow-sm': true,
        'justify-between': true,
    });


    return <>
        <div className={navigationWrapperClasses}>
            <Title
                type={TITLE.H1}
                title={title}
            />
            <div className="flex justify-center items-center">
                {
                    ROUTES.map(route => {
                        const {
                            path,
                            title,
                            detailPage,
                            key,
                        } = route;
                        if (detailPage) {
                            return null;
                        }

                        const menuItemClassNames = classNames({
                            'font-bold': ROUTES.find((route: any)=>route.key === pathname.replace(/[0-9]/g, ''))?.path === path,
                            'cursor-pointer m-2': true,
                        });


                        return <div
                            key={path + key}
                            className={menuItemClassNames}
                            onClick={() => history.push(path)}
                        >
                            {title}
                        </div>;
                    })
                }
            </div>
        </div>
    </>;
};

const mapStateToProps = (state: IState) => {
    return ({
        pathname: state.router.location.pathname,
    });
};

export default connect(mapStateToProps)(withRouter(Menu));
