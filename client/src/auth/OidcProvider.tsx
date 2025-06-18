import React from "react";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";

const oidcConfig: AuthProviderProps = {
  authority: "http://localhost:8080/realms/genesys", // update with your realm if needed
  client_id: "genesys-client", // update with your client id if needed
  redirect_uri: window.location.origin,
  response_type: "code",
  scope: "openid profile email",
};

export const OidcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AuthProvider {...oidcConfig}>{children}</AuthProvider>
); 