import { useRef, useState } from "react"
import Header from "./Header"
import { validateFormData } from "../utils/validate"

const Login = () => {
    const [isSigninPage, setIsSigninPage] = useState(true)
    const [error, setError] = useState({
        email: null,
        password: null
    })
    const email = useRef(null)
    const password = useRef(null)

    const handleIsSignin = () => {
        setIsSigninPage(!isSigninPage)
    }

    const handleSubmit = () => {
        const message = validateFormData(email.current.value, password.current.value)
        setError(message)
    }
    return (
        <div>
            <Header />
            <div className="absolute">
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="Background" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="absolute bg-black bg-opacity-70 rounded-md text-white p-20 my-36 mx-auto right-0 left-0 w-4/12">
                <h1 className="text-3xl font-bold py-4">{isSigninPage ? "Sign In" : "Sign Up"}</h1>
                {!isSigninPage && <input type="text" placeholder="Full Name" className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80" />}
                <input ref={email} type="text" placeholder="Email or mobile number" className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80" />
                {error.email && <span className="text-red-600 text-xs">*{error.email}</span>}
                <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80" />
                {error.password && <span className="text-red-600 text-xs">*{error.password}</span>}
                <button onClick={handleSubmit} className="p-3 my-6 bg-red-700 w-full rounded-md">Sign In</button>
                <span className="text-gray-200">{isSigninPage ? "New to Netflix?" : "Already a customer?"}</span> <span className="underline font-bold cursor-pointer" onClick={handleIsSignin}>{isSigninPage ? "Sign up now." : "Sign In"}</span>
            </form>
        </div>
    )
}

export default Login