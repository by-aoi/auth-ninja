import { Provider } from "../../lib/provider";

export interface GitHubUserData {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean | null;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: boolean;
  plan?: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export class Github extends Provider {
  async redirect(): Promise<{ url: string }> {
    const { clientId, redirectUri, scope } = this;
    const githubAuthUrl = "https://github.com/login/oauth/authorize";
    return {
      url: `${githubAuthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope.join(
        "+"
      )}`,
    };
  }

  async getUserData(access_token: string): Promise<GitHubUserData> {
    const res = await this.query({
      url: "https://api.github.com/user",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return res.data;
  }

  async accessToken(code: string): Promise<{
    access_token: string;
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: string;
    scope: string[] | string;
    token_type: string;
    session: { user: GitHubUserData };
  }> {
    const { clientId, redirectUri, clientSecret } = this;

    const res = await this.query({
      url: "https://github.com/login/oauth/access_token",
      headers: {
        Accept: "application/json",
      },
      method: "POST",
      data: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
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
    expires_in: string;
    refresh_token: string;
    refresh_token_expires_in: string;
    scope: string[];
    token_type: string;
  }> {
    const { clientId, clientSecret } = this;

    const res = await this.query({
      url: "https://github.com/login/oauth/access_token",
      method: "POST",
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token,
        grant_type: "refresh_token",
      },
      headers: {
        Accept: "application/json",
      },
    });
    return res.data;
  }

  async revokeToken(access_token: string): Promise<void> {
    const { clientId, clientSecret } = this;
    await this.query({
      url: `https://api.github.com/applications/${clientId}/grant`,
      method: "DELETE",
      auth: {
        username: clientId,
        password: clientSecret,
      },
      data: {
        access_token,
      },
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }
}
