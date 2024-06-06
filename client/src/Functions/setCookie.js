import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: '/' });

const setCookie = (user) => {
    cookies.set('user', user, {maxAge:86400, secure:true});
}
export default setCookie