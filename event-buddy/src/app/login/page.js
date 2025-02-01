export default function LogIn() {
	return (
		<form>
            <div>
                <label for="email">Email:</label>
                <input type="email" placeholder="User@email.com..." name="email" required></input>

                <label for="password">Password:</label>
                <input type="password" placeholder="password..." name="password" required></input>

                <button type="submit">Log In</button>
                <label>
                    <input type="checkbox" checked="checked" name="remember"> Remember me</input>
                </label>
            </div>

            <div>
                <span>Or</span>
                <button type="submit">Sign Up</button>
            </div>
        </form>
	);
}
