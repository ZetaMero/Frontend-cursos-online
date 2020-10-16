import jwtDecode from "jwt-decode";
import { ACCESS_TOKEN } from "../utils/constants";

export function getAccessToken() {
 
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // const metaT= jwtDecode(accessToken);
  if (!accessToken || accessToken === "null") {
    return null;
  }
 

  return willExpireToken(accessToken) ? null : accessToken;}


function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp} = metaToken;

  const now = (Date.now() + seconds) / 1000;
  if(now > exp ){
      logout()
  }
  
  return now > exp;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
}
