import useAuthentication from '@/stores/Authentication.ts'

export const getRole = ()=>{
  let role;
  const accessToken = localStorage.getItem("accessToken");
  if(accessToken){
    role = useAuthentication().userInfo;
  }
  return role || "NOT_ROlE";
}
