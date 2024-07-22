import{USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL, USER_LOGOUT
,USER_REGISTER_FAIL,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_UPDATE_FAIL,
USER_UPDATE_REQUEST,USER_UPDATE_SUCCESS
} from "../constants/UserConstants";
  import axios from "axios";
  export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (data.token) {
        localStorage.setItem("userInfo", JSON.stringify(data));
      } else {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: 'Authentication failed: no token received',
        });
      }
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
    export const logout = ()=> async(dispatch)=>{
    localStorage.removeItem("userInfo");
    dispatch({type : USER_LOGOUT});
    };
    export const register = (name, email, password, pic) => async (dispatch) => {
      try {
        dispatch({ type: USER_REGISTER_REQUEST });
    
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
    
        const { data } = await axios.post(
          "http://localhost:5000/api/users",
          { name, pic, email, password },
          config
        );
    
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    
        localStorage.setItem("userInfo", JSON.stringify(data));
      } catch (error) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
    
    export const updateProfile = (userData) => async (dispatch, getState) => {
      try {
        dispatch({ type: USER_UPDATE_REQUEST });
    
        const storedUserInfo = localStorage.getItem("userInfo");
        if (!storedUserInfo) {
          throw new Error('User info not found in local storage');
        }
        
        const userInfo = JSON.parse(storedUserInfo);
        if (!userInfo || !userInfo.token) {
          throw new Error('User token is missing');
        }
    
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
    
        const { data } = await axios.post('http://localhost:5000/api/users/profile', userData, config);
    
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
    
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        dispatch({
          type: USER_UPDATE_FAIL,
          payload: error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
        });
      }
    };