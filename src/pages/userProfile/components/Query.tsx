import axios, { AxiosResponse } from "axios";

const baseURL = 'https://tidaly-api-backend.onrender.com/api/v1';

// Fonction pour récupérer les informations de profil de l'utilisateur
export const fetchUserProfile = async (token: string): Promise<any> => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: 'Bearer ' + token }
  });

  try {
    const response: AxiosResponse = await instance.get("/user/profile");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des informations du profil :" + error);
  }
};

// Fonction pour mettre à jour le profil de l'utilisateur
export const updateProfile = async (token: string, userData: any): Promise<any> => {
  const instance = axios.create({
    baseURL: baseURL,
    headers: { Authorization: 'Bearer ' + token }
  });

  try {
    const response: AxiosResponse = await instance.put("/user/profile", userData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour du profil :" + error);
  }
};
