import {
    Navigate,
    Outlet,
    useLocation
} from 'react-router-dom';

const BackOfficeRoute = ({
    user,
    redirectPath = '/',
    children,
}) => {
    const location = useLocation()

    if (!user || user?.role !== 'admin') {
        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children ? children : <Outlet />;
};

export default BackOfficeRoute