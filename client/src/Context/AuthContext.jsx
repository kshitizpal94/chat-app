import { createContext, useCallback, useEffect, useState } from "react";
import { PostRequest, baseURL } from "../Utils/services";
import Cookies from "universal-cookie";
import setCookie from "../Functions/setCookie";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies(null, { path: '/' });
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:""
    });
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    // console.log(registerInfo);
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
        
    }, []);
    
    // console.log(loginInfo);
    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    useEffect(()=>{
        const user = cookies.get('user');
        setUser(user);
        console.log('user', user);
    },[])

    const registerUser = useCallback(async (e) => {
        e.preventDefault()
        // console.log(registerInfo);
        const response = await PostRequest(`${baseURL}/user/register`, JSON.stringify(registerInfo));
        setError(null)
        if (response.error) {
            let errorMessage = response.errorMessage;
            console.log(errorMessage);
            return setError({ nameError: errorMessage.name, emailError: errorMessage.email, passwordError: errorMessage.password });

        }
        else {
            console.log(response);
            setUser(response);
            // console.log('user', user);
            setCookie(response);
            navigate('/');
        }
    }, [registerInfo,]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault()
        // console.log(registerInfo);
        const response = await PostRequest(`${baseURL}/user/login`, JSON.stringify(loginInfo));
        setError(null)
        if (response?.error) {
            let errorMessage = response.errorMessage;
            console.log(errorMessage);
            return setError({ nameError: errorMessage.name, emailError: errorMessage.email, passwordError: errorMessage.password });

        }
        else {
            console.log(response);
            setUser(response);
            // console.log('user', user);
            setCookie(response);
            navigate('/');
        }
    }, [loginInfo,]);

    const logoutUser =useCallback(()=>{
        cookies.remove('user');
        setUser(null);
    },[]);

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        error,
        logoutUser,
        loginInfo,
        updateLoginInfo,
        loginUser,

    }}>
        {children}
    </AuthContext.Provider>
}