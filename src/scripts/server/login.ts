import { api } from "~/trpc/react";
import { type Dispatch, type SetStateAction } from "react";

export const handleLogin = async (
  e: React.FormEvent<HTMLFormElement>,
  email: string,
  password: string,
  setEmailError: Dispatch<SetStateAction<boolean>>,
  setPasswordError: Dispatch<SetStateAction<boolean>>,
  setServerError: Dispatch<SetStateAction<string>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => {
  const loginMutation = api.user.login.useMutation();
  e.preventDefault();

  setEmailError(false);
  setPasswordError(false);
  setServerError("");
  setIsLoading(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let isValid = true;

  if (!emailRegex.test(email)) {
    setEmailError(true);
    isValid = false;
  }

  if (password.trim().length < 6) {
    setPasswordError(true);
    isValid = false;
  }

  if (isValid) {
    try {
      const result = await loginMutation.mutateAsync({
        email,
        password,
      });

      if (result.success) {
        // Redirect after successful login
        window.location.href = "/dashboard"; // Use window.location instead of router
      } else {
        setServerError("Login failed");
      }
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setServerError(error.message || "An error occurred during login.");
      } else {
        setServerError("An unexpected error occurred.");
      }
      setIsLoading(false);
    }
  } else {
    setIsLoading(false);
  }
};