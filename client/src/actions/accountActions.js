import axios from "src/utils/axios";
import authService from "src/services/authService";

export const LOGIN_REQUEST = "@account/login-request";
export const LOGIN_SUCCESS = "@account/login-success";
export const LOGIN_FAILURE = "@account/login-failure";
export const SILENT_LOGIN = "@account/silent-login";
export const LOGOUT = "@account/logout";
export const REGISTER = "@account/register";
export const UPDATE_PROFILE = "@account/update-profile";
const qs = require("query-string");
const Axios = require("axios");

export function login(email, password) {
	return async (dispatch) => {
		try {
			dispatch({ type: LOGIN_REQUEST });

			const user = await authService.loginWithEmailAndPassword(email, password);

			console.log(1, user);

			dispatch({
				type: LOGIN_SUCCESS,
				payload: {
					user,
				},
			});
		} catch (error) {
			dispatch({ type: LOGIN_FAILURE });
			throw error;
		}
	};
}

export function setUserData(user) {
	// console.log("setUserData ", user);
	return (dispatch) =>
		dispatch({
			type: SILENT_LOGIN,
			payload: {
				user,
			},
		});
}

export function logout() {
	return async (dispatch) => {
		authService.logout();

		dispatch({
			type: LOGOUT,
		});
	};
}

export function register(values) {
	// return true;
	const data = qs.stringify({
		name: values.name,
		email: values.email,
		password: values.password,
	});
	console.log(data);
	const config = {
		method: "post",
		url: "http://localhost:3100/signup",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: data,
	};

	Axios(config)
		.then(function(response) {
			console.log(JSON.stringify(response.data));
			return true;
		})
		.catch(function(error) {
			console.log(1, error);
			return false;
		});
}

export function updateProfile(update) {
	const request = axios.post("/api/account/profile", { update });

	return (dispatch) => {
		request.then((response) =>
			dispatch({
				type: UPDATE_PROFILE,
				payload: response.data,
			})
		);
	};
}
