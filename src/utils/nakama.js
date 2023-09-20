import nakamaUtil from '@cardinal-entertainment/nakama-util/dist/nakama';
import Cookies from "js-cookie";

const nakamaInstance = nakamaUtil.getInstance(
  process.env.REACT_APP_LOCAL === 'true',
  process.env.REACT_APP_NAKAMA_SERVER_KEY
);

const redirectToAuth = () => {
    if (process.env.NODE_ENV === "development") {
      window.location.href =
        "http://localhost:3001/auth/?returnTo=" + window.location.href;
    } else {
      window.location.href =
        "https://zoombies.world/auth/?returnTo=" + window.location.href;
    }
};

let session;
const nakamaUserSession = Cookies.get("NAKAMA_USER_SESSION");
console.log("COOOKIE and auth pathway - ", nakamaUserSession);
if (nakamaUserSession) {
  
  const sessionData = JSON.parse(nakamaUserSession);
  console.log("nakamaUserSession cookie value:", sessionData);
  session = await nakamaInstance.refreshSession(
    sessionData.accessToken,
    sessionData.refresh_token
  );
  if (session.expires_at * 1000 < Date.now()) {
    redirectToAuth();
  }
} else {
  
  // redirect user to auth
  redirectToAuth();
}

export default nakamaInstance;
