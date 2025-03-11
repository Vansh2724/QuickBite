import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import React from "react";

type Props = {
  children: React.ReactNode;
};
const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();
  const audience = process.env.VITE_AUTH0_AUDIENCE;
const domain = process.env.VITE_AUTH0_DOMAIN;
const clientId = process.env.VITE_AUTH0_CLIENT_ID;
const redirectUri = process.env.VITE_AUTH0_CALLBACK_URL;


  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error("unable to initialize auth");
  }

  const onRedirectCallback = (appState?: AppState) => {
    // console.log("User", user);
    // navigate(appState?.returnTo || "/auth-callback", { replace: true });
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri, audience }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
