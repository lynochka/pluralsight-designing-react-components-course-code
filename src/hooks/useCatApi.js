import { useState, useEffect } from "react";

function useCatApi(data) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(async () => {
    setImageUrls(await getCatUrls(data.length));
  }, []);

  const dataWithImageUrls = data.map((record, index) => {
    return { ...record, imageUrl: imageUrls[index] };
  });
  return { dataWithImageUrls };
}

async function getCatUrls(number) {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?limit=${number}`
  );
  const responseJson = await response.json();
  const imageUrls = responseJson.map(function (item) {
    return item.url;
  });
  return imageUrls;
}

export default { useCatApi, getCatUrls };
