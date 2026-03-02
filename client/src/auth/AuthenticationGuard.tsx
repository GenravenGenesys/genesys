import React, {ComponentType} from "react";

interface AuthenticationGuardProps {
    component: ComponentType;
}

/**
 * Simple pass-through guard. Auth0 has been removed from the project.
 * All routes are now accessible without authentication.
 */
export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({
                                                                            component,
                                                                        }) => {
    const Component = component;
    return <Component />;
};
