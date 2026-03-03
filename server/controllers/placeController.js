const axios = require('axios');


exports.searchPlaces = async (req, res) => {
  try {
    const response = await axios.get('https://api.opentripmap.com/0.1/en/places/radius', {
      params: {
        q: req.params.query,
        format: 'json',
        limit: 10,
        
      },

        headers: {
            "User-Agent": "TripNext"
        }
    });

    const places = response.data
    .filter(
        (item) => 
            item.type === 'town' ||
            item.type === 'city' ||
            item.type === 'nature'
)         

    .map((item) => ({
        name: item.display_name.split(',')[0],
        country: item.address.country || '',
    }));

    res.json(places);
  } catch (error) {
    res.status(500).json({ places: [] });
  }
};


exports.getPlacesToVisit = async (req, res) => {

    const places = req.params.places;

    try {
        const WikiResponse = await axios.get(`https://en.wikipedia.org/w/api.php`, {
           params: {
            action: 'query',
            format: 'json',
            titles: places,
           },
        });

        res.json({
            places: WikiResponse.data.title,
            description: WikiResponse.data.extract,
            image: WikiResponse.data.thumbnail ? WikiResponse.data.thumbnail.source : null,
        googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places
        )}`,
        });
    } catch (error) {
        res.json({ 
            places,
            description: 'Not available',
            image: null,
            googleMaps: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(places)}`,
        });
    }
        };


