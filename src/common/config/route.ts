import Home from "../../pages/Home";
import UnitDetail from "../../pages/UnitDetail";
import Units from "src/pages/Units";

const ROUTES = [
    {
        key: '/',
        path: '/',
        title: 'Home',
        component: Home,
        isExact: true
    },
    {
        key: '/unit/',
        path: '/unit/:unitId',
        title: 'Unit Details',
        component: UnitDetail,
        isExact: true,
        detailPage: true,
    },
    {
        key: '/units',
        path: '/units',
        title: 'Units',
        component: Units,
        isExact: true,
    },
];

export {
    ROUTES,
}
