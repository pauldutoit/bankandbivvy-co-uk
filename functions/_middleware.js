// Google Search Console HTML-file verification needs /googleXXXX.html to
// answer 200 directly. Cloudflare Pages strips ".html" with a 308, which
// Google may reject, so serve the file's content here instead.
export async function onRequest({ request, next, env }) {
  const url = new URL(request.url);
  if (/^\/google[0-9a-f]+\.html$/.test(url.pathname)) {
    const res = await env.ASSETS.fetch(new URL(url.pathname.replace(/\.html$/, ""), url));
    if (res.ok) {
      return new Response(await res.text(), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  }
  return next();
}
