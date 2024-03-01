import { type Route, SwiftiError } from "swifti";
import { Providers } from "../../../lib/providers";

export const GET: Route = async (ctx) => {
  const { provider: providerName } = ctx.req.params;
  const { code } = ctx.req.query;
  ctx.res.setHeader("Pragma", "no-cache");
  if (!code)
    throw new SwiftiError({ status: 400, message: "Code is required." });
  if (providerName === "discord") {
    const provider = Providers[providerName];
    const res = await provider.accessToken(code);
    console.log(res);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=${res.access_token}; Path=/; HttpOnly`,
      `refresh_token=${res.refresh_token}; Path=/; HttpOnly`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  if (providerName === "github") {
    const provider = Providers[providerName];
    const res = await provider.accessToken(code);
    console.log(res);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=${res.access_token}; Path=/; HttpOnly`,
      `refresh_token=${res.refresh_token}; Path=/; HttpOnly`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  if (providerName === "facebook") {
    const provider = Providers[providerName];
    const res = await provider.accessToken(code);
    console.log(res);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=${res.access_token}; Path=/; HttpOnly`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  if (providerName === "google") {
    const provider = Providers[providerName];
    const res = await provider.accessToken(code);
    console.log(res);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=${res.access_token}; Path=/; HttpOnly`,
      `refresh_token=${res.refresh_token}; Path=/; HttpOnly`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  ctx.res.status(404).json({
    code: "NOT_FOUND",
    message: "Provider not found.",
  });
};
