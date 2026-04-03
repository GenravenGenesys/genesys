/**
 * Simple auth hook that returns unauthenticated state.
 * Auth0 has been removed from the project.
 */
export const useOptionalAuth0 = () => {
    return {
        isLoading: false,
        isAuthenticated: false,
        user: undefined,
        error: undefined,
        loginWithRedirect: async (p0: { appState: { returnTo: string; }; authorizationParams: { prompt: string; }; }) => {
            console.warn('Authentication is disabled. Login functionality not available.');
        },
        loginWithPopup: async () => {
            console.warn('Authentication is disabled. Login functionality not available.');
        },
        logout: (p0: { logoutParams: { returnTo: string; }; }) => {
            console.warn('Authentication is disabled. Logout functionality not available.');
        },
        getAccessTokenSilently: async () => {
            console.warn('Authentication is disabled. Returning empty token.');
            return "";
        },
        getAccessTokenWithPopup: async () => {
            console.warn('Authentication is disabled. Returning empty token.');
            return "";
        },
        getIdTokenClaims: async () => undefined,
        handleRedirectCallback: async () => ({ appState: undefined }),
    };
};
