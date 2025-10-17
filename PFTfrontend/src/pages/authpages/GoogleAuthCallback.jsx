import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function GoogleAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const isNewUser = params.get("is_new_user");
    const name = params.get("name");

    if (token) {
      // Store token in session or local storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("userName", name);

      // Show welcome Swal
      Swal.fire({
        icon: "success",
        title: `Welcome ${name}!`,
        text:
          isNewUser === "true"
            ? "Thanks for signing up!"
            : "Logged in successfully!",
        confirmButtonColor: "#10B981",
      }).then(() => {
        // Redirect based on new user
        if (isNewUser === "true") {
          navigate("/onboarding");
        } else {
          navigate("/dashboard");
        }
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null; // No UI needed, just handle redirect
}
