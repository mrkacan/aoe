import { AnimatePresence } from "framer-motion";
import * as React from "react";
import { Route, Switch } from "react-router";
import { ROUTES } from "src/common/config/route";
import Container from "../components/Container";

const routes = (
    <div className="bg-black">
        <Route render={({location}) => (
            <AnimatePresence initial={true} exitBeforeEnter={true}>
                <Switch location={location} key={location.pathname}>
                    {
                        ROUTES.map((route: any) => {
                            const {
                                path,
                                key,
                                component: Component,
                                isExact,
                            } = route;

                            return <Route
                                key={path + key}
                                exact={isExact}
                                path={path}
                                render={() => <Container><Component/></Container>}
                            />;
                        })
                    }
                </Switch>
            </AnimatePresence>)}/>
    </div>
);

export default routes;
