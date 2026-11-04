import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET({ site }: { site: URL | undefined }) {
  const projects = await getCollection('projects');
  const origin = site ?? new URL('https://armsteel.dev');
  const paths = ['/', '/projects/', '/about/', ...projects.map((project) => `/projects/${project.id}/`)];
  const entries = paths.map((path) => `  <url><loc>${new URL(path, origin)}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
