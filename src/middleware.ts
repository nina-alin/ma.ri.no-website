import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/app/i18n/settings";

acceptLanguage.languages(languages);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";

export function middleware(request: NextRequest) {
  let language;
  if (request.cookies.has(cookieName)) {
    // @ts-ignore
    language = acceptLanguage.get(request.cookies.get(cookieName).value);
  }
  if (!language)
    language = acceptLanguage.get(request.headers.get("Accept-Language"));
  if (!language) language = fallbackLng;

  if (
    !languages.some((language) =>
        request.nextUrl.pathname.startsWith(`/${language}`),
    ) &&
    !request.nextUrl.pathname.startsWith("/_next") &&
    !request.nextUrl.pathname.startsWith("/admin")
  ) {
    return NextResponse.redirect(
      new URL(`/${language}${request.nextUrl.pathname}`, request.url),
    );
  }

  if (request.headers.has("referer")) {
    // @ts-ignore
    const refererUrl = new URL(request.headers.get("referer"));
    const lngInReferer = languages.find((local) =>
      refererUrl.pathname.startsWith(`/${local}`),
    );
    const response = NextResponse.next();
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
    return response;
  }

  return NextResponse.next();
}
