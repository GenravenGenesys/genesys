import { FC, ReactNode, useEffect, useState } from "react";
import { hasAuthParams, useAuth } from "react-oidc-context";

type Props = {
  children: ReactNode;
}

const ProtectedApp: FC<Props> = ({ children }) => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = useState(false);

  useEffect(() => {
    if (!hasAuthParams() && !auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth, hasTriedSignin]);

  return children;
};

export default ProtectedApp;