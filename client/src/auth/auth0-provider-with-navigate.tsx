import React, {PropsWithChildren} from "react";

interface Auth0ProviderWithNavigateProps {
    children: React.ReactNode;
}

/**
 * No-op provider that simply renders children.
 * Auth0 has been removed from the project.
 */
export const Auth0ProviderWithNavigate = ({
                                              children,
                                          }: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element => {
    return <>{children}</>;
};
