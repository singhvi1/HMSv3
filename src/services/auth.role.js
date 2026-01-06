import { useSelector } from "react-redux";

const RoleGuard = ({ allow = [], children }) => {
    const role = useSelector((store) => store?.loggedinUser?.role);

    if (!allow.includes(role)) return null;
    return children;
};

export default RoleGuard;
