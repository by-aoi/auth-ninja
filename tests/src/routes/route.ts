import { type Route } from "swifti";

export const GET: Route = (ctx) => {
  const access_token = ctx.cookies.get("access_token");
  const refresh_token = ctx.cookies.get("refresh_token");
  console.log({ access_token, refresh_token });
  ctx.res.setHeader("Pragma", "no-cache");
  ctx.res.status(200).json({
    name: "Auth Ninja",
    author: "Aoi-san <aoi.san@outlook.com>",
    version: "0.1.0",
  });
};
