export default function LogIn() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="bg-purple-200 p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold text-center text-gray-900">
					Log In
				</h2>

				{/* Login Form */}
				<form className="mt-6">
					{/* Email */}
					<div className="mb-4">
						<label
							htmlFor="email"
							className="block text-gray-700 font-medium">
							Email:
						</label>
						<input
							type="email"
							name="email"
							placeholder="User@email.com..."
							required
							className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Password */}
					<div className="mb-4">
						<label
							htmlFor="password"
							className="block text-gray-700 font-medium">
							Password:
						</label>
						<input
							type="password"
							name="password"
							placeholder="password..."
							required
							className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					{/* Remember Me */}
					<div className="mb-4 flex items-center">
						<input
							type="checkbox"
							name="remember"
							className="mr-2"
						/>
						<label className="text-gray-700">
							Remember me
						</label>
					</div>

					{/* Login Button */}
					<button
						type="submit"
						className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-indigo-900 transition">
						Log In
					</button>
				</form>

				{/* Separator */}
				<div className="mt-6 text-center text-gray-600">Or</div>

				{/* Sign Up Button */}
				<button
					type="button"
					className="mt-4 w-full bg-indigo-900 text-white py-2 rounded-md hover:bg-gray-800 transition">
					Sign Up
				</button>
			</div>
		</div>
	);
}
