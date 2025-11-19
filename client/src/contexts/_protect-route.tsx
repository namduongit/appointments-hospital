import type { JSX } from "react"
import { useAuth } from "./auth.context"

type ProtectRouteProps = {
    children: JSX.Element
    roles: string[],
}

const ProtectRoute = ({ children, roles }: ProtectRouteProps) => {
    const auth = useAuth();

    if (roles?.length === 0) return children;

    if (!roles.includes(auth.role!)) {
        auth.role !== "USER" ? window.location.href = `/${auth.role?.toLocaleLowerCase()}` : "/";
        return;
    }

    return children;
}

export default ProtectRoute;