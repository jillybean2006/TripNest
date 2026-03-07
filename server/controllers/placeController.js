const axios = require("axios");

exports.searchPlaces = async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    
    const places = [
      { name: `${query} City`, country: query },
      { name: `${query} Beach`, country: query },
      { name: `${query} Downtown`, country: query }
    ];

    res.json({ places });

  } catch (error) {
    console.error("SEARCH PLACES ERROR:", error);
    res.status(500).json({ places: [] });
  }
};

exports.getPlacesToVisit = async (req, res) => {

  const place = req.query.place;

  try {

    const wikiResponse = await axios.get("https://en.wikipedia.org/w/api.php", {
      params: {
        action: "query",
        prop: "extracts|pageimages",
        exintro: true,
        explaintext: true,
        piprop: "thumbnail",
        pithumbsize: 400,
        titles: place,
        format: "json",
        origin: "*"
      }
    });

    const pages = wikiResponse.data.query.pages;
    const firstPage = Object.values(pages)[0];

    res.json({
      place,
      description: firstPage?.extract || "Not available",
      image: firstPage?.thumbnail?.source || null,
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
    });

  } catch (error) {

    res.json({
      place,
      description: "Not available",
      image: null,
      googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`
    });

  }
};