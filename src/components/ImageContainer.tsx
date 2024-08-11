import { useState, useEffect, memo } from "react";

import { fetchImages } from "../services/api";

// Define the type for an image object
interface Image {
  id: string;
  download_url: string;
  author: string;
}

function ImageContainer() {
  // Type the state hooks
  const [data, setData] = useState<Image[]>([]); // Array of Image objects
  const [loadingImages, setLoadingImages] = useState<Record<string, boolean>>(
    {}
  ); // Object to track loading state for each image
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    let pageNumber = 1;

    async function getImages() {
      try {
        setErrorMsg("");
        setLoadingImages({}); // Reset loadingImages state
        const images = await fetchImages(pageNumber);

        pageNumber++;
        setLoadingImages(
          images.reduce((acc, image) => {
            acc[image.id] = true; // Set loading to true initially
            return acc;
          }, {} as Record<string, boolean>)
        );

        setData(images);
      } catch (error) {
        setErrorMsg("Something went wrong, Please try again later");
        setLoadingImages({});
      }
    }

    getImages();

    const id = setInterval(getImages, 10000);
    return () => clearInterval(id);
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id: string) => {
    setErrorMsg("Failed to load image");
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <div className="main-container">
        {data.map((ele) => (
          <div
            className={`image-container ${
              loadingImages[ele.id] ? "mini-spinner" : ""
            }`}
            key={ele.id}
          >
            <img
              src={ele.download_url}
              alt={ele.author}
              onLoad={() => handleImageLoad(ele.id)} // Mark image as loaded
              onError={() => handleImageError(ele.id)} // Handle errors
            />
          </div>
        ))}
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </>
  );
}

export default memo(ImageContainer);
