import { Provider } from "../../lib/provider";

export interface DiscordUserData {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string | null;
  accent_color: string | null;
  global_name: string;
  avatar_decoration_data: string | null;
  banner_color: string | null;
}

export class Discord extends Provider {
  async redirect(): Promise<{ url: string }> {
    const { clientId, redirectUri, scope } = this;
    const discordAuthUrl = "https://discord.com/api/oauth2/authorize";
    return {
      url: `${discordAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope.join(
        "+"
      )}`,
    };
  }

  async getUserData(access_token: string): Promise<DiscordUserData> {
    const res = await this.query({
      url: "https://discord.com/api/users/@me",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      method: "GET",
    });

    return res.data;
  }

  async accessToken(code: string): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
    session: { user: DiscordUserData };
  }> {
    const { clientId, redirectUri, clientSecret } = this;

    const res = await this.query({
      url: "https://discord.com/api/oauth2/token",
      method: "POST",
      data: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        scope: "identify email",
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
    refresh_token: string;
    expires_in: number;
  }> {
    const { clientId, clientSecret } = this;
    const res = await this.query({
      url: "https://discord.com/api/oauth2/token",
      method: "POST",
      data: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "refresh_token",
        refresh_token: refresh_token,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return res.data;
  }

  async revokeToken(access_token: string): Promise<void> {
    const { clientId, clientSecret } = this;

    await this.query({
      url: "https://discord.com/api/oauth2/token/revoke",
      method: "POST",
      data: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        token: access_token,
        token_type_hint: "access_token",
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }
}
