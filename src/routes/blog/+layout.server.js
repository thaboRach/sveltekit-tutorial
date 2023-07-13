import { posts } from "./data.js"; // Can use a DB or a CMS

export function load() {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
    })),
  };
}
