import { useRef, useState } from "react";
import Header from "./Header";
import { validateFormData } from "../utils/validate";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSigninPage, setIsSigninPage] = useState(true);
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

  const handleIsSignin = () => {
    setIsSigninPage(!isSigninPage);
  };

  const handleSubmit = () => {
    const message = validateFormData(
      email.current.value,
      password.current.value
    );
    setError(message);

    if (message.email || message.password) return;
    if (!isSigninPage) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/35232726?v=4",
          })
            .then(() => {
              const { uid, displayName, email, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, displayName, email, photoURL }));
              navigate("/browse");
            })
            .catch((error) => {
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dd4dfce3-1a39-4b1a-8e19-b7242da17e68/86742114-c001-4800-a127-c9c89ca7bbe4/IN-en-20240527-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="Background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black bg-opacity-70 rounded-md text-white p-20 my-36 mx-auto right-0 left-0 w-4/12"
      >
        <h1 className="text-3xl font-bold py-4">
          {isSigninPage ? "Sign In" : "Sign Up"}
        </h1>
        {!isSigninPage && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80"
        />
        {error.email && (
          <span className="text-red-600 text-xs">*{error.email}</span>
        )}
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full rounded-md bg-gray-900 bg-opacity-80"
        />
        {error.password && (
          <span className="text-red-600 text-xs">*{error.password}</span>
        )}
        <button
          onClick={handleSubmit}
          className="p-3 my-6 bg-red-700 w-full rounded-md"
        >
          {isSigninPage ? "Sign In" : "Sign up"}
        </button>
        <span className="text-gray-200">
          {isSigninPage ? "New to Netflix?" : "Already a customer?"}
        </span>{" "}
        <span
          className="underline font-bold cursor-pointer"
          onClick={handleIsSignin}
        >
          {isSigninPage ? "Sign up now." : "Sign In"}
        </span>
      </form>
    </div>
  );
};

export default Login;
