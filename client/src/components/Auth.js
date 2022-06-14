import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import SplashScreen from "src/components/SplashScreen";
import { setUserData, logout } from "src/actions/accountActions";
import authService from "src/services/authService";

function Auth({ children }) {
	const dispatch = useDispatch();
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		const initAuth = async () => {
			// console.log(1);
			authService.setAxiosInterceptors({
				onLogout: () => dispatch(logout()),
			});
			// console.log(2);

			authService.handleAuthentication();
			// console.log(3);

			if (authService.isAuthenticated()) {
				// console.log(4);
				const user = await authService.loginInWithToken();
				// console.log(5);
				await dispatch(setUserData(user));
				// console.log(6);
			}

			// console.log(7);
			setLoading(false);
		};

		// console.log(0);

		initAuth();
	}, [dispatch]);

	if (isLoading) {
		return <SplashScreen />;
	}

	return children;
}

Auth.propTypes = {
	children: PropTypes.any,
};

export default Auth;
