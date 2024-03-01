import { Discord, Facebook, Github, Google } from "../../../dist/index.js";

const redirectUri = (providerName: string) => {
  return `http://localhost:3000/${providerName}/callback`;
};

export const Providers = {
  discord: new Discord({
    clientId: process.env.DISCORD_ID ?? "",
    clientSecret: process.env.DISCORD_SECRET ?? "",
    scope: ["identify", "email"],
    redirectUri: redirectUri("discord"),
  }),
  facebook: new Facebook({
    clientId: process.env.FACEBOOK_ID ?? "",
    clientSecret: process.env.FACEBOOK_SECRET ?? "",
    scope: [],
    redirectUri: redirectUri("facebook"),
  }),
  github: new Github({
    clientId: process.env.GITHUB_ID ?? "",
    clientSecret: process.env.GITHUB_SECRET ?? "",
    scope: ["read:user"],
    redirectUri: redirectUri("github"),
  }),
  google: new Google({
    clientId: process.env.GOOGLE_ID ?? "",
    clientSecret: process.env.GOOGLE_SECRET ?? "",
    scope: ["profile"],
    redirectUri: redirectUri("google"),
  }),
};
