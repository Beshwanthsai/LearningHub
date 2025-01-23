export default function Login() {
    return (
        <div>
            <fieldset >
                <legend>Login here!</legend>
               <h1>Welcome To Learning Hub</h1>
            <label>Username :</label>
            <input type="text" name="username" id="username" required/>
            <br />
            <label>Password  :</label>
            <input type="password" name="password" id="pass" required/>
            <br />
            <br />
            <button type="submit">Sign in</button>
            </fieldset>
        </div>
)};