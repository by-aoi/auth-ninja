import { Provider } from "../../lib/provider";

export interface FacebookUserData {
  id: string;
  name: string;
  email: string;
  picture?: {
    data: {
      height: number;
      is_silhouette: boolean;
      url: string;
      width: number;
    };
  };
  first_name: string;
  last_name: string;
  short_name: string;
}

export class Facebook extends Provider {
  async redirect(): Promise<{ url: string }> {
    const { clientId, redirectUri, scope } = this;
    const facebookAuthUrl = "https://www.facebook.com/v13.0/dialog/oauth";
    return {
      url: `${facebookAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope.join(
        "+"
      )}`,
    };
  }

  async getUserData(
    access_token: string,
    fields: string[]
  ): Promise<FacebookUserData> {
    const res = await this.query({
      url: "https://graph.facebook.com/v13.0/me",
      params: {
        fields: fields.join(","),
        access_token,
      },
    });

    return res.data;
  }

  async accessToken(code: string): Promise<{
    access_token: string;
    session: { user: FacebookUserData };
  }> {
    const { clientId, redirectUri, clientSecret } = this;

    const res = await this.query({
      url: "https://graph.facebook.com/v13.0/oauth/access_token",
      method: "POST",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      },
    });

    const user = await this.getUserData(res.data.access_token, [
      "id",
      "email",
      "name",
      "first_name",
      "picture",
      "last_name",
    ]);

    return {
      ...res.data,
      session: { user },
    };
  }
}
