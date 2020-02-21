import React, { createContext, useReducer, useState } from 'react'
import axios from 'axios'


const initialState = {
	isLogged : false,
	jwt : localStorage.getItem("jwt")
}


export const UserContext = createContext(null);

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
	REQUEST_AUTH_ERROR : "REQUEST_AUTH_ERROR",
	LOGOUT : "LOGOUT",
}

export const UserReducer = ( state:any, action:any)=>{
	switch(action.type){
		case UserAction.REQUEST_AUTH :
			return {
				...state,
				isLoad:null,
			};
		case UserAction.REQUEST_AUTH_SUCCESS:
			return {
				...state,
				isLogged: true,
				isLoad:true,
			};
		case UserAction.REQUEST_AUTH_ERROR:
			return {
				...state,
				isLogged: false,
				isLoad:true,
			};
		case UserAction.LOGOUT :
			return {
				...state,
				isLogged:false,
				jwt : null,
			}
		default :
			break;
	}
}

export const logout  = (dispatch)=>{
	dispatch({
		type: UserAction.LOGOUT
	})
}

export const requestAuth = async (dispatch:any)=>{

	dispatch({
		type: UserAction.REQUEST_AUTH
	})
	try {
		let res = await axios.get (`/auth/verify`,{
			headers: {'authorization': `bearer ${localStorage.jwt}`}
		});
		dispatch({
			type : UserAction.REQUEST_AUTH_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type : UserAction.REQUEST_AUTH_ERROR,
		})
	}
}