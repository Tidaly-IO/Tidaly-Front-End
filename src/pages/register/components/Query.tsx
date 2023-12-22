import React, { useState } from "react";
import apiUrl from '../../components/config/config.tsx';
import axios, { AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://tidaly-api-backend.onrender.com/api/v1',
    headers: { 'Access-Control-Allow-Origin': '*' }
});

export const useRegister = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPass] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [formValid, setFormValid] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState<string>("");
    const [displayErrorMessage, setDisplayErrorMessage] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (formValid === true) {
            setDisplayErrorMessage(false);
            if (password === confirmPassword) {
                try {
                    const response: AxiosResponse = await instance.post("/register", {
                        email: email,
                        password: password,
                    });
                    console.log(response);
                    window.location.href = `${apiUrl}/`;
                } catch (error: any) {
                    if (
                        error.response &&
                        error.response.data &&
                        error.response.data.errors
                    ) {
                        const uniqueError = error.response.data.errors.find(
                            (error: { rule: string; field: string }) => error.rule === "unique" && error.field === "email"
                        );
                        if (uniqueError) {
                            setDisplayErrorMessage(true);
                            setErrorMessageDisplay("L'e-mail est déjà pris. Veuillez en choisir un autre.");
                            return;
                        }
                    }
                    setErrorMessage(error.response.data.message);
                }
            } else {
                setDisplayErrorMessage(true);
                setErrorMessageDisplay("Veuillez saisir le même mot de passe");
            }
        } else {
            setDisplayErrorMessage(true);
            setErrorMessageDisplay("Tous les champs ne sont pas remplis");
        }
    };

    const checkFormValidity = () => {
        if (email && password && confirmPassword) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
    };

    return {
        email,
        password,
        confirmPassword,
        errorMessage,
        errorMessageDisplay,
        displayErrorMessage,
        setEmail,
        setPass,
        setConfirmPassword,
        handleSubmit,
        checkFormValidity,
    };
};
