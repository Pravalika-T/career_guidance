import { signInWithGoogle } from "../googleAuth";

function Login() {
  return (
    <button onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

export default Login;