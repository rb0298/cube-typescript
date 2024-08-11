const url = `https://picsum.photos/v2/list?limit=9`;

export interface Image {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const fetchImages = async function (
  pageNumber: number
): Promise<Image[]> {
  const res = await fetch(`${url}&page=${pageNumber}`);
  const data = await res.json();
  return data as Image[];
};
