import axios, { AxiosRequestConfig } from "axios";
import { AuthNinjaError } from "./error";

export class Provider {
  readonly clientId: string;
  readonly clientSecret: string;
  readonly scope: string[];
  readonly redirectUri: string;

  constructor(config: {
    clientId: string;
    clientSecret: string;
    scope: string[];
    redirectUri: string;
  }) {
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.scope = config.scope;
    this.redirectUri = config.redirectUri;
  }

  async query(config: AxiosRequestConfig) {
    try {
      return await axios(config);
    } catch (error) {
      throw new AuthNinjaError({
        status: error.status,
        message: error.message,
        data: error.response?.data,
      });
    }
  }
}
