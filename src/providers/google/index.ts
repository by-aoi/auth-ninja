import { Provider } from "../../lib/provider";

export interface GoogleUserData {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export class Google extends Provider {
  async redirect(): Promise<{ url: string }> {
    const { clientId, redirectUri, scope } = this;
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/auth";
    return {
      url: `${googleAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope.join(
        " "
      )}&prompt=consent&access_type=offline`,
    };
  }

  async getUserData(access_token: string): Promise<GoogleUserData> {
    const res = await this.query({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.data;
  }

  async accessToken(code: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
    session: { user: GoogleUserData };
  }> {
    const { clientId, redirectUri, clientSecret } = this;

    const res = await this.query({
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      data: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const user = await this.getUserData(res.data.access_token);

    return {
      ...res.data,
      session: { user },
    };
  }

  async refreshToken(refresh_token: string): Promise<{
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
  }> {
    const { clientId, clientSecret } = this;

    const response = await this.query({
      url: "https://oauth2.googleapis.com/token",
      method: "POST",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      },
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  }

  async revokeToken(access_token: string): Promise<void> {
    await this.query({
      url: "https://oauth2.googleapis.com/revoke",
      method: "POST",
      params: {
        token: access_token,
      },
    });
  }
}
