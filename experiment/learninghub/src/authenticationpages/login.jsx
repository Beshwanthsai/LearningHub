import './login.css'

export default function Login() {


    

    return (
        <div className="container">
            <input id="signup_toggle" type="checkbox" />
            <div className="form">
                <div className="form_front">
                    <div className="form_details">Login</div>
                    <input type="text" className="input" placeholder="Username" required />
                    <input type="password" className="input" placeholder="Password" required />
                    <button className="btn">Login</button>
                    <span className="switch">
                        Don't have an account?
                        <label htmlFor="signup_toggle" className="signup_tog">Sign Up</label>
                    </span>
                </div>
                <div className="form_back">
                    <div className="form_details">Sign Up</div>
                    <input type="text" className="input" placeholder="Name" required />
                    <input type="email" className="input" placeholder="Email" required />
                    <input type="password" className="input" placeholder="Password" required />
                    <button className="btn">Sign Up</button>
                    <span className="switch">
                        Already have an account?
                        <label htmlFor="signup_toggle" className="signup_tog">Login</label>
                    </span>
                </div>
            </div>
        </div>
    )
}