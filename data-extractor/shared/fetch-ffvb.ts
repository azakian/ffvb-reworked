/**
 * Fetch ffvb website.
 */
export async function fetchFfvb(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Erreur lors du chargement de l'URL : ${response.statusText}`,
    );
  }
  const buffer = await response.arrayBuffer();
  return new TextDecoder("iso-8859-1").decode(buffer);
}
