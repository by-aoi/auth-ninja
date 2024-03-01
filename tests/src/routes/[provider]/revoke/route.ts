import { type Route, SwiftiError } from "swifti";
import { Providers } from "../../../lib/providers";

export const GET: Route = async (ctx) => {
  const { provider: providerName } = ctx.req.params;
  const access_token = ctx.cookies.get("access_token");
  ctx.res.setHeader("Pragma", "no-cache");
  if (!access_token)
    throw new SwiftiError({
      status: 400,
      message: "access_token is required.",
    });
  if (providerName === "discord") {
    const provider = Providers[providerName];
    await provider.revokeToken(access_token);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `refresh_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  if (providerName === "github") {
    const provider = Providers[providerName];
    await provider.revokeToken(access_token);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `refresh_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  if (providerName === "google") {
    const provider = Providers[providerName];
    await provider.revokeToken(access_token);
    ctx.res.setHeader("Set-Cookie", [
      `access_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      `refresh_token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
    ]);
    return ctx.res.redirect("/", 308);
  }
  ctx.res.status(404).json({
    code: "NOT_FOUND",
    message: "Provider not found.",
  });
};
