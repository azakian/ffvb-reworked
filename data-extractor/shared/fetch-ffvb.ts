/**
 * Fetch ffvb website.
 */
export async function fetchFfvb(
  url: string,
  isUtf: boolean = false,
): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Erreur lors du chargement de l'URL : ${response.statusText}`,
    );
  }

  if (isUtf) {
    return response.text();
  }
  const buffer = await response.arrayBuffer();
  return new TextDecoder("iso-8859-1").decode(buffer);
}
