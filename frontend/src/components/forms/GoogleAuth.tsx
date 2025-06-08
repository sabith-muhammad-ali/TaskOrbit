import { GoogleLogin as GoogleLoginButton } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/slices/authSlice";

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    const decoded: any = jwtDecode(token);

    try {
      const res = await axios.post("http://localhost:8000/api/users/google", {
        token,
      });
      console.log("backend response:", res.data);



      dispatch(
        setCredentials({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
          isVerified: true,
        })
      );
    } catch (err) {
      console.log("Error sending token to backend", err);
    }
  };
  return (
    <div>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Faild")}
      />
    </div>
  );
};

export default GoogleAuth;
