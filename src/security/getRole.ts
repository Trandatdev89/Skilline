import { jwtDecode } from 'jwt-decode'

export const getRole = ()=>{
  let role;
  const accessToken = localStorage.getItem("accessToken");
  if(accessToken){
    const tokenDecode = jwtDecode<any>(accessToken);
    role = tokenDecode?.scope;
  }
  return role || "NOT_ROlE";
}
