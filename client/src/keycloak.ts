import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:8081/",
  realm: "genesys",
  clientId: "genesys-react-app",
});

export default keycloak;