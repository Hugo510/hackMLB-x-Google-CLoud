import dotenvSafe from "dotenv-safe";

const loadEnv = () => {
  dotenvSafe.config({
    allowEmptyValues: true,
  });
  /* console.log("Variables de entorno cargadas:", process.env); */
};

export { loadEnv };
