// src/api.js
import axios from "axios";

const API_URL = "https://soal.staging.id/oauth/token";

export const loginPost = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(API_URL, {
      grant_type: "password",
      client_id: "e78869f77986684a",
      client_secret: "0a40f69db4e5fd2f4ac65a090f31b823",
      username: username, //| "support@technopartner.id"
      password: password, //| "1234567"
    });

    const { token_type, access_token } = response.data;

    return { token_type, access_token };
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const getProfileHome = async (token_type: any, access_token: any) => {
  try {
    const response = await axios.get("https://soal.staging.id/api/home", {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Fetching home data failed:", error);
  }
};

export const getMenu = async (
  token_type: any,
  access_token: any,
  show: number
) => {
  try {
    const response = await axios.post(
      "https://soal.staging.id/api/menu",
      { show_all: show },
      {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Fetching menu data failed:", error);
  }
};
