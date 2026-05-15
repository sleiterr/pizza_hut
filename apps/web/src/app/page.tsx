// Template reference — GROQ query example:
// import { defineQuery } from "next-sanity";
// const EVENTS_QUERY = defineQuery(`*[
//   _type == "event"
//   && defined(slug.current)
//   && date > now()
// ]|order(
//   defined(coalesce(headline->photo.asset, headliner->photo.asset)) desc,
//   date asc
// ){
//   _id,
//   name,
//   slug,
//   date,
//   "hasArtistPhoto": defined(coalesce(headline->photo.asset, headliner->photo.asset))
// }`);
// coalesce() returns the first defined value — useful for fallback fields

export default async function HomePage() {
  return (
    <main>
      <p>Home Page — coming soon</p>
    </main>
  );
}
