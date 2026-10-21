import Link from "next/link";

/** Shown inside the site shell when a page or slug does not exist. */
export default function NotFound() {
  return (
    <section style={{ minHeight: "70vh", paddingTop: "calc(var(--header-h) + 6rem)", paddingBottom: "6rem" }}>
      <div className="wrap" style={{ display: "grid", gap: "1.5rem", justifyItems: "start" }}>
        <h1>This room is dark.</h1>
        <p className="lede">The page you were looking for does not exist or has moved.</p>
        <Link className="btn" href="/en">
          Back to the villa
        </Link>
      </div>
    </section>
  );
}
