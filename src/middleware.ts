import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(req: NextRequest) {
  let language;
  if (req.cookies.has(cookieName)) {
    // @ts-ignore
    language = acceptLanguage.get(req.cookies.get(cookieName).value);
  }
  if (!language)
    language = acceptLanguage.get(req.headers.get("Accept-Language"));
  if (!language) language = fallbackLng;

  if (
    !languages.some((language) =>
      req.nextUrl.pathname.startsWith(`/${language}`),
    ) &&
    !req.nextUrl.pathname.startsWith("/_next") &&
    !req.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(
      new URL(`/${language}${req.nextUrl.pathname}`, req.url),
    );
  }

  if (req.headers.has("referer")) {
    // @ts-ignore
    const refererUrl = new URL(req.headers.get("referer"));
    const lngInReferer = languages.find((local) =>
      refererUrl.pathname.startsWith(`/${local}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
