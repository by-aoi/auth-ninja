# Auth Ninja

> Features for the implementation of Oauth2 on Google, Discord, Facebook and Github.

## Github

To use the Github API you will need a `clientId` and a `clientSecret`, you can get them directly from [Github App Settings](https://github.com/settings/apps) or the [OAuth App Settings](https://github.com/settings/developers).

### Parameters

- `clientId`: Your app client ID.

  - `string`
  - `required`.

- `clientSecret`: Your app client secret.

  - `string`.
  - `required`.

- `scope`: Permissions to request the user's authorization.

  - `string[]`.
  - `required`.

- `redirectUri`: URL where the user will be redirected.

  - `string`.
  - `required`.

### Authentication Flow

To authenticate with Github, you need to follow the following steps:

#### 1. Get Redirect URL

Get the URL to which you should redirect the user to authenticate.

```ts
import { Github } from "auth-ninja";

const GithubProvider = new Github(/* {options} */);

const { url } = await GithubProvider.redirect();
```

#### 2. Get Access Token

In the endpoint defined in the `redirectUri` you will receive a code in the `QueryParams`, which you must pass in the `accessToken` method:

```ts
import { Github } from "auth-ninja";

const GithubProvider = new Github(/* {options} */);

const code = "YOUR_AUTHORIZATION_CODE";

const res = await GithubProvider.accessToken(code);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `refresh_token_expires_in`: Time when the refresh token will expire.

  - `number`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

- `session.user`: User details.

```ts
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
```

### Methods

Other useful methods to interact with Github's OAuth API.

#### Refresh Token

Get a new `access_token` using the `refresh_token`.

```ts
import { Github } from "auth-ninja";

const GithubProvider = new Github(/* {options} */);

const refresh_token = "YOUR_REFRESH_TOKEN";

const res = await GithubProvider.refreshToken(refresh_token);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `refresh_token_expires_in`: Time when the refresh token will expire.

  - `number`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

#### Revoke Token

Revoke an access token.

```ts
import { Github } from "auth-ninja";

const GithubProvider = new Github(/* {options} */);

const access_token = "YOUR_ACCESS_TOKEN";

await GithubProvider.revokeToken(access_token);
```

## Google

To use the Github API you will need a `clientId` and a `clientSecret`, you can get them directly from [Credentials Page](https://console.developers.google.com/apis/credentials).

### Parameters

- `clientId`: Your app client ID.

  - `string`
  - `required`.

- `clientSecret`: Your app client secret.

  - `string`.
  - `required`.

- `scope`: Permissions to request the user's authorization.

  - `string[]`.
  - `required`.

- `redirectUri`: URL where the user will be redirected.

  - `string`.
  - `required`.

### Authentication Flow

To authenticate with Google, you need to follow the following steps:

#### 1. Get Redirect URL

Get the URL to which you should redirect the user to authenticate.

```ts
import { Google } from "auth-ninja";

const GoogleProvider = new Google(/* {options} */);

const { url } = await GoogleProvider.redirect();
```

#### 2. Get Access Token

In the endpoint defined in the `redirectUri` you will receive a code in the `QueryParams`, which you must pass in the `accessToken` method:

```ts
import { Google } from "auth-ninja";

const GoogleProvider = new Google(/* {options} */);

const code = "YOUR_AUTHORIZATION_CODE";

const res = await GoogleProvider.accessToken(code);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

- `session.user`: User details.

```ts
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
```

### Methods

Other useful methods to interact with Google's OAuth API.

#### Refresh Token

Get a new `access_token` using the `refresh_token`.

```ts
import { Google } from "auth-ninja";

const GoogleProvider = new Google(/* {options} */);

const refresh_token = "YOUR_REFRESH_TOKEN";

const res = await GoogleProvider.refreshToken(refresh_token);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

#### Revoke Token

Revoke an access token.

```ts
import { Google } from "auth-ninja";

const GoogleProvider = new Google(/* {options} */);

const access_token = "YOUR_ACCESS_TOKEN";

await GoogleProvider.revokeToken(access_token);
```

## Discord

To use the Discord API you will need a `clientId` and a `clientSecret`, you can get them directly from [Developer Portal](https://discord.com/developers/applications).

### Parameters

- `clientId`: Your app client ID.

  - `string`
  - `required`.

- `clientSecret`: Your app client secret.

  - `string`.
  - `required`.

- `scope`: Permissions to request the user's authorization.

  - `string[]`.
  - `required`.

- `redirectUri`: URL where the user will be redirected.

  - `string`.
  - `required`.

### Authentication Flow

To authenticate with Discord, you need to follow the following steps:

#### 1. Get Redirect URL

Get the URL to which you should redirect the user to authenticate.

```ts
import { Discord } from "auth-ninja";

const DiscordProvider = new Discord(/* {options} */);

const { url } = await DiscordProvider.redirect();
```

#### 2. Get Access Token

In the endpoint defined in the `redirectUri` you will receive a code in the `QueryParams`, which you must pass in the `accessToken` method:

```ts
import { Discord } from "auth-ninja";

const DiscordProvider = new Discord(/* {options} */);

const code = "YOUR_AUTHORIZATION_CODE";

const res = await DiscordProvider.accessToken(code);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

- `session.user`: User details.

```ts
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
```

### Methods

Other useful methods to interact with Discord's OAuth API.

#### Refresh Token

Get a new `access_token` using the `refresh_token`.

```ts
import { Discord } from "auth-ninja";

const DiscordProvider = new Discord(/* {options} */);

const refresh_token = "YOUR_REFRESH_TOKEN";

const res = await DiscordProvider.refreshToken(refresh_token);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `expires_in`: Time when the access token will expire.

  - `number`

- `refresh_token`: User access token.

  - `string`

- `scope`: Permissions authorized by the user.

  - `string[]`

- `token_type`: Access token type.

  - `string`

#### Revoke Token

Revoke an access token.

```ts
import { Discord } from "auth-ninja";

const DiscordProvider = new Discord(/* {options} */);

const access_token = "YOUR_ACCESS_TOKEN";

await DiscordProvider.revokeToken(access_token);
```

## Facebook

To use the Github API you will need a `clientId` and a `clientSecret`, you can get them directly from [Facebook Dashboard](https://developers.facebook.com/apps).

### Parameters

- `clientId`: Your app client ID.

  - `string`
  - `required`.

- `clientSecret`: Your app client secret.

  - `string`.
  - `required`.

- `scope`: Permissions to request the user's authorization.

  - `string[]`.
  - `required`.

- `redirectUri`: URL where the user will be redirected.

  - `string`.
  - `required`.

### Authentication Flow

To authenticate with Facebook, you need to follow the following steps:

#### 1. Get Redirect URL

Get the URL to which you should redirect the user to authenticate.

```ts
import { Facebook } from "auth-ninja";

const FacebookProvider = new Facebook(/* {options} */);

const { url } = await FacebookProvider.redirect();
```

#### 2. Get Access Token

In the endpoint defined in the `redirectUri` you will receive a code in the `QueryParams`, which you must pass in the `accessToken` method:

```ts
import { Facebook } from "auth-ninja";

const FacebookProvider = new Facebook(/* {options} */);

const code = "YOUR_AUTHORIZATION_CODE";

const res = await FacebookProvider.accessToken(code);
```

With the answer you will get the following:

- `access_token`: User access token.

  - `string`

- `session.user`: User details.

```ts
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
```
