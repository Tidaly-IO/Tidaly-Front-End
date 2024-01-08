import { useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://tidaly-api-backend.onrender.com/api/v1',
  headers: { Authorization: 'Bearer ' + `${localStorage.getItem("token")}` }
});

export const useWaterMeterSetupLogic = () => {
  const [consumption, setConsumption] = useState<number>(0);
  const [objective, setObjective] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (consumption > 9999999 || objective > 9999999) {
      alert("Les valeurs de consommation et/ou d'objectif ne peuvent pas dépasser 9999999.");
      setIsValid(false);
    } else if (!/^\d+$/.test(consumption.toString()) || !/^\d+$/.test(objective.toString())) {
      alert("Les valeurs de consommation et/ou d'objectif ne peuvent contenir que des chiffres.");
      setIsValid(false);
    } else {
      try {
        const response = await instance.post("/user/profile", {
          firstname: `${localStorage.getItem("firstName")}`,
          lastname: `${localStorage.getItem("name")}`,
          address: `${localStorage.getItem("adresse")}`,
          countryCode: `${localStorage.getItem("pays")}`,
          city: `${localStorage.getItem("ville")}`,
          postalCode: `${localStorage.getItem("codePostale")}`,
          waterConsumed: consumption,
          waterConsumptionTarget: objective,
        });
        setIsValid(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    consumption,
    objective,
    isValid,
    setConsumption,
    setObjective,
    handleSubmit,
  };
};
