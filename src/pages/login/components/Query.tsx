import { useState, useEffect } from "react";
import apiUrl from '../../components/config/config.tsx';
import axios, { AxiosResponse } from 'axios';

interface LoginResponse {
  token: {
    token: string;
  };
}

interface UserProfile {
  firstname: string | null;
}

const instance = axios.create({
  baseURL: 'http://20.111.43.70:3333/api/v1',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export const useLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPass] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errorMessageDisplay, setErrorMessageDisplay] = useState<string>('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState<boolean>(false);
  var test = false;

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("name");
    localStorage.removeItem("adresse");
    localStorage.removeItem("pays");
    localStorage.removeItem("ville");
    localStorage.removeItem("codePostale");
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response: AxiosResponse<LoginResponse> = await instance.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token.token);
      console.log(response.data.token.token);
      console.log(response);
      setDisplayErrorMessage(false);
    } catch (error) {
      setDisplayErrorMessage(true);
      setErrorMessageDisplay("E-mail ou mot de passe incorrect");
      test = true;
    }
    if (test === false) {
      try {
        const instance2 = axios.create({
          baseURL: 'http://20.111.43.70:3333/api/v1',
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
        });
        const response: AxiosResponse<UserProfile> = await instance2.get("/user/profile");
        const data = response.data;
        console.log(data);
        alert(JSON.stringify(data));
        if (data.firstname != null) {
          window.location.href = `${apiUrl}/HomePage`;
        }
      } catch (error) {
        window.location.href = `${apiUrl}/AccountSetup`;
        console.error("Erreur lors de la récupération des informations :", error);
      }
    }
  };

  return {
    email,
    password,
    errorMessage,
    errorMessageDisplay,
    displayErrorMessage,
    setEmail,
    setPass,
    handleSubmit,
  };
};
