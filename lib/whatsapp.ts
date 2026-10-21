/** Builds a wa.me link with a pre-filled message. Safe on server and client. */
export function waLink(number: string, message: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
