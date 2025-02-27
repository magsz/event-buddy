"use client";

import { createContext, useState } from "react";

export const MyContext = createContext(null);

export default function ContextProvider({ children }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("");

	const updateLogIn = (val) => {
		setIsLoggedIn(val);
	};

	const updateLogOut = (val) => {
		setIsLoggedIn(val);
	};

	const updateUserName = (val) => {
		setUserName(val);
	};

	return (
		<MyContext.Provider
			value={{
				isLoggedIn,
				userName,
				updateLogIn,
				updateLogOut,
				updateUserName,
			}}>
			{children}
		</MyContext.Provider>
	);
}
