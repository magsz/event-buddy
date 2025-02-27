import "./globals.css";

import ContextProvider from "./context/ContextProvider";

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<ContextProvider>{children}</ContextProvider>
			</body>
		</html>
	);
}
