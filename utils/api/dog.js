import { BASE_URL } from "./base";

const getRandomDog = async () => {
  const response = await fetch(`${BASE_URL}/api/breeds/image/random`);
  const data = await response.json();
  return data;
};

export { getRandomDog };
