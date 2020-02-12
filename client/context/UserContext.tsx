import React, { createContext, useReducer } from 'react'
import axios from 'axios'

const initialState :any= {
	isLoad: null,
	data : {
		isLogged: false,
		accessToken : null
	},
	error: null,
}

const loadingState :any= {
	isLoad: true,
	data : {
		isLogged: false,
		accessToken : null
	},
	error: null,
}

const success  =  data=> ({
    isLoad: false,
    data,
    error: null,
});

const error = error => ({
    isLoad: false,
    data: {
		isLogged: false,
		accessToken : null
	},
    error: error,
});

export const UserContext = createContext(initialState);

export const UserProvider = ({children}:{children:any})=>{
	const [user, dispatch] = useReducer(UserReducer, initialState);

	return(
		<UserContext.Provider value={{user, dispatch}}>
			{children}
		</UserContext.Provider>
	)
}

const UserAction = {
	REQUEST_AUTH :"REQUEST_AUTH",
	REQUEST_AUTH_SUCCESS : "REQUEST_AUTH_SUCCESS",
	REQUEST_AUTH_ERROR : "REQUEST_AUTH_ERROR"
}

export const UserReducer = ( state:any, action:any)=>{
	switch(action.type){
		case UserAction.REQUEST_AUTH :
			return loadingState;
		case UserAction.REQUEST_AUTH_SUCCESS:
			action.data = {
				isLogged : true,
				accessToken :123131
			}
			return success(action.data);
		case UserAction.REQUEST_AUTH_ERROR:
			return error(action.data);
		default :
			break;
	}
}

export const requestAuth = async (dispatch:any)=>{
	dispatch({
		type: UserAction.REQUEST_AUTH
	})

	try {
		// const { data } = await axios.get('/api/events');
		dispatch({
			type : UserAction.REQUEST_AUTH_SUCCESS,
		})
	} catch (error) {
		
	}
}