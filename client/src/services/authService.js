import jwtDecode from "jwt-decode";
import axios from "src/utils/axios";
const Axios = require("axios");

class AuthService {
	setAxiosInterceptors = ({ onLogout }) => {
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response && error.response.status === 401) {
					this.setSession(null);

					if (onLogout) {
						onLogout();
					}
				}

				// console.log("setAxiosInterceptors");
				return Promise.reject(error);
			}
		);
	};

	handleAuthentication() {
		const accessToken = this.getAccessToken();

		if (!accessToken) {
			return;
		}

		if (this.isValidToken(accessToken)) {
			// console.log("handleAuthentication - valid token", accessToken);
			this.setSession(accessToken);
		} else {
			// console.log("handleAuthentication - not valid token");
			this.setSession(null);
		}
	}

	loginWithEmailAndPassword = (email, password) =>
		new Promise((resolve, reject) => {
			Axios.post("http://localhost:3100/auth", { email, password })
				.then((response) => {
					// console.log(response);
					response.data.user.avatar = "/static/images/avatars/avatar_6.png";
					if (response.data.user) {
						console.log(response.data);
						this.setSession(response.data.accessToken);
						resolve(response.data.user);
					} else {
						reject(response.data.error);
					}
				})
				.catch((error) => {
					reject(error);
				});
			// axios.post('/api/account/login', { email, password })
			//   .then((response) => {
			//     if (response.data.user) {
			//       this.setSession(response.data.accessToken);
			//       resolve(response.data.user);
			//     } else {
			//       reject(response.data.error);
			//     }
			//   })
			//   .catch((error) => {
			//     reject(error);
			//   });
		});

	loginInWithToken = () =>
		new Promise((resolve, reject) => {
			// console.log("loginInWithToken - token ", this.getAccessToken());
			var config = {
				method: "get",
				url: "http://localhost:3100/auth",
				headers: {
					Authorization: `Bearer ${this.getAccessToken()}`,
				},
			};
			Axios(config)
				.then(function(response) {
					// console.log("loginInWithToken - response ", response.data);
					resolve(response.data);
				})
				.catch(function(error) {
					// console.log("loginInWithToken - error ");
					reject(error);
				});
			// axios
			// 	.get("/api/account/me")
			// 	.then((response) => {
			// 		if (response.data.user) {
			// 			resolve(response.data.user);
			// 		} else {
			// 			reject(response.data.error);
			// 		}
			// 	})
			// 	.catch((error) => {
			// 		reject(error);
			// 	});
		});

	logout = () => {
		this.setSession(null);
	};

	setSession = (accessToken) => {
		if (accessToken) {
			localStorage.setItem("accessToken", accessToken);
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		} else {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("organization");
			localStorage.removeItem("oauth2Token");
			delete axios.defaults.headers.common.Authorization;
		}
	};

	getAccessToken = () => localStorage.getItem("accessToken");

	isValidToken = (accessToken) => {
		if (!accessToken) {
			return false;
		}

		const decoded = jwtDecode(accessToken);
		const currentTime = Date.now() / 1000;

		return decoded.exp > currentTime;
	};

	// isAuthenticated = () => {
	// 	console.log("isAuthenticated", this.getAccessToken());
	// 	// !!this.getAccessToken();
	// 	// return true;
	// };

	isAuthenticated = () => !!this.getAccessToken();
}

const authService = new AuthService();

export default authService;
