/** Sets one phrase of a sentence in italics (the editorial emphasis from the brief). */
export function Emphasis({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase) return <>{text}</>;
  const i = text.indexOf(phrase);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <em>{phrase}</em>
      {text.slice(i + phrase.length)}
    </>
  );
}
