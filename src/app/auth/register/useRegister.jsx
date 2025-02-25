import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const useRegister = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rolId: 1,
    termsAccepted: false,
  });
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsError, setTermsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? e.target.checked : value,
    }));

    // Limpiar errores al escribir
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("");
    }
    if (name === "termsAccepted") {
      setTermsError("");
    }
  };

  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const hasUpperCase = /[A-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (!minLength.test(password)) {
      return "La contraseña debe tener al menos 8 caracteres.";
    }
    if (!hasUpperCase.test(password)) {
      return "La contraseña debe contener al menos una letra mayúscula.";
    }
    if (!hasSpecialChar.test(password)) {
      return "La contraseña debe contener al menos un carácter especial.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setPasswordError("");
    setTermsError("");

    if (!formData.termsAccepted) {
      setTermsError("Debes aceptar los términos y condiciones.");
      return;
    }

    const passwordValidation = validatePassword(formData.password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message || "Registro exitoso");
      router.push("/auth/login");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error en el registro");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
    passwordError,
    termsError,
    isLoading,
  };
};

export default useRegister;
