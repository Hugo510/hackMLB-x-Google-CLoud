declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      // ...otros campos del usuario si son necesarios
    };
  }
}
