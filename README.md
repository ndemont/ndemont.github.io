# 🎡 Spin Doctor

> **"The cure for your lunch indecision."**

Tired of the same *"Where do we eat?"* debate every day at noon?
Let **Spin Doctor** diagnose your hunger and prescribe the perfect lunch spot — no appointment needed.

## How it works

1. **Select** your Doctolib office
2. **Spin** the wheel
3. **Follow** the doctor's orders 🩺

Whether it's sushi, a burger, or that little bistro around the corner, Spin Doctor has the remedy.

## 🏃 Quick Start

### Requirements
- Python 3 (for local server)
- Any modern web browser

### Run Locally

```bash
# Using the provided script (macOS/Linux)
./serve.sh

# Or manually with Python
python3 -m http.server 8000

# Then open http://localhost:8000 in your browser
```

## 📍 Locations

- **K11**: Kurfürstendamm 11, 10719 Berlin
- **M51**: Mehringdamm 51, 10961 Berlin

## 🍽️ Restaurants

Spin Doctor automatically fetches **real restaurants** near both Berlin offices using OpenStreetMap data. The app loads restaurants within 500m of each location and displays them on the wheel.

### K11 Kurfürstendamm
Restaurants fetched from OpenStreetMap (52.5033°N, 13.3307°E)

### M51 Mehringdamm
Restaurants fetched from OpenStreetMap (52.4980°N, 13.3913°E)

## 🛠️ Customization

### Change Location Coordinates
Edit the coordinates in `index.html` to add new locations:

```javascript
const locations = {
    k11: {
        name: 'K11 - Kurfürstendamm',
        lat: 52.5033,      // Change these
        lng: 13.3307,      // to your location
        address: 'Kurfürstendamm 11, 10719 Berlin',
        restaurants: []
    }
};
```

### Use Manual Restaurant Lists
To use a fixed list instead of fetching from OpenStreetMap, comment out the fetch call and set restaurants directly:

```javascript
// locations.k11.restaurants = await fetchRestaurants(locations.k11);

// Or set manually:
locations.k11.restaurants = [
    '🍣 Umami Sushi',
    '🍔 Burger Station',
    // ... your restaurants
];
```

## 🚀 Deployment

Simply upload `index.html` and `serve.sh` to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- Any web server

No database, no backend, no dependencies!

---

*One spin. Zero regrets. 🩺*
