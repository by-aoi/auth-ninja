import { type Route } from "swifti";
import { Providers } from "../../lib/providers";

export const GET: Route = async (ctx) => {
  const { provider: providerName } = ctx.req.params;
  ctx.res.setHeader("Pragma", "no-cache");
  if (providerName === "discord") {
    const provider = Providers[providerName];
    const { url } = await provider.redirect();
    return ctx.res.redirect(url, 308);
  }
  if (providerName === "github") {
    const provider = Providers[providerName];
    const { url } = await provider.redirect();
    return ctx.res.redirect(url, 308);
  }
  if (providerName === "facebook") {
    const provider = Providers[providerName];
    const { url } = await provider.redirect();
    return ctx.res.redirect(url, 308);
  }
  if (providerName === "google") {
    const provider = Providers[providerName];
    const { url } = await provider.redirect();
    return ctx.res.redirect(url, 308);
  }
  ctx.res.status(404).json({
    code: "NOT_FOUND",
    message: "Provider not found.",
  });
};
