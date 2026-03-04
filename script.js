/* =============================================================
   Spin Doctor — data & wheel logic
   ============================================================= */

// ---------------------------------------------------------------------------
// Restaurant data per Doctolib office
// ---------------------------------------------------------------------------
const OFFICES = {
  paris: {
    label: "Paris — Levallois-Perret",
    restaurants: [
      { name: "La Brasserie du Marché", type: "🥐 French brasserie", address: "12 Rue du Marché, Levallois-Perret" },
      { name: "Sushi Levallois", type: "🍣 Japanese / Sushi", address: "8 Rue Victor Hugo, Levallois-Perret" },
      { name: "Burger & Co", type: "🍔 Gourmet burgers", address: "25 Rue de la République, Levallois-Perret" },
      { name: "Le Petit Bistrot", type: "🍷 French bistro", address: "3 Rue Carnot, Levallois-Perret" },
      { name: "Pizza Artisanale", type: "🍕 Wood-fired pizza", address: "17 Avenue Sainte-Anne, Levallois-Perret" },
      { name: "Salade & Co", type: "🥗 Salad bar / healthy", address: "41 Rue du Président Wilson, Levallois-Perret" },
      { name: "Tacos Palace", type: "🌮 Street tacos", address: "6 Rue Rivay, Levallois-Perret" },
      { name: "Café de la Mairie", type: "☕ Café lunch", address: "1 Place de la Mairie, Levallois-Perret" },
      { name: "Wok Avenue", type: "🥢 Asian wok", address: "30 Rue Paul Vaillant Couturier, Levallois-Perret" },
      { name: "La Crêperie Bretonne", type: "🥞 Crêpes & galettes", address: "9 Rue du Vieux Pont de Sèvres, Levallois-Perret" },
    ]
  },
  berlin: {
    label: "Berlin — Mitte",
    restaurants: [
      { name: "Mustafas Gemüsekebab", type: "🌯 Döner / kebab", address: "Mehringdamm 32, Kreuzberg" },
      { name: "Burgermeister", type: "🍔 Burgers", address: "Oberbaumstraße 8, Friedrichshain" },
      { name: "Monsieur Vuong", type: "🍜 Vietnamese", address: "Alte Schönhauser Str. 46, Mitte" },
      { name: "The Bird", type: "🍔 American burgers", address: "Am Falkplatz 5, Prenzlauer Berg" },
      { name: "Lon Men's Noodle House", type: "🥢 Taiwanese noodles", address: "Kantstraße 33, Charlottenburg" },
      { name: "Cocolo Ramen", type: "🍜 Ramen", address: "Gipsstraße 3, Mitte" },
      { name: "Adler Berlin", type: "🥨 German tavern", address: "Friedrichstraße 206, Mitte" },
      { name: "Santa Maria", type: "🌮 Mexican", address: "Oranienstraße 170, Kreuzberg" },
      { name: "Zum Wohl", type: "🥗 Modern European", address: "Torstraße 65, Mitte" },
      { name: "Sushi Ishin", type: "🍣 Japanese / Sushi", address: "Unter den Linden 78, Mitte" },
    ]
  },
  rome: {
    label: "Rome — Prati",
    restaurants: [
      { name: "Pizzarium Bonci", type: "🍕 Pizza al taglio", address: "Via della Meloria 43, Prati" },
      { name: "Supplì Roma", type: "🍢 Roman street food", address: "Via San Francesco a Ripa 137, Trastevere" },
      { name: "Osteria dell'Angelo", type: "🍷 Roman trattoria", address: "Via G. Bettolo 24, Prati" },
      { name: "Il Sorpasso", type: "☕ Wine bar / cicchetti", address: "Via Properzio 31, Prati" },
      { name: "Tonnarello", type: "🍝 Roman pasta", address: "Via della Paglia 1, Trastevere" },
      { name: "Pinsere", type: "🫓 Pinsa romana", address: "Via Flavia 98, Prati" },
      { name: "La Pratolina", type: "🍕 Gourmet pizza", address: "Via degli Scipioni 248, Prati" },
      { name: "Roscioli Caffè", type: "🥐 Café / pastries", address: "Piazza Benedetto Cairoli 16, Centro" },
      { name: "Borghiciana Pastificio", type: "🍝 Fresh pasta", address: "Via Candia 85, Prati" },
      { name: "Lo Zozzone", type: "🥙 Flatbread sandwiches", address: "Via del Teatro Pace 32, Centro" },
    ]
  },
  amsterdam: {
    label: "Amsterdam — Grachtengordel",
    restaurants: [
      { name: "Restaurant Breda", type: "🌿 Modern European", address: "Singel 210, Amsterdam" },
      { name: "De Kas", type: "🌱 Farm-to-table", address: "Kamerlingh Onneslaan 3, Amsterdam" },
      { name: "Worst Wijncafé", type: "🥩 Wine bar / bites", address: "Weteringschans 23, Amsterdam" },
      { name: "Dignita", type: "☕ Café / healthy", address: "Haarlemmerstraat 23, Amsterdam" },
      { name: "Bak", type: "🌾 Nordic cuisine", address: "Van Diemenstraat 408, Amsterdam" },
      { name: "Gebr. Hartering", type: "🍴 Dutch bistro", address: "Peperstraat 10, Amsterdam" },
      { name: "Rijsel", type: "🐔 Flemish bistro", address: "Marcusstraat 52, Amsterdam" },
      { name: "Poke Perfect", type: "🍣 Poke bowls", address: "Utrechtsestraat 14, Amsterdam" },
      { name: "Stach Food", type: "🥗 Healthy to-go", address: "Westerstraat 130, Amsterdam" },
      { name: "Guts & Glory", type: "🥩 Nose-to-tail dining", address: "Utrechtsestraat 6, Amsterdam" },
    ]
  }
};

// ---------------------------------------------------------------------------
// Wheel colours — a palette that plays nicely with the teal/blue brand
// ---------------------------------------------------------------------------
const WHEEL_COLORS = [
  "#00c7b1", "#107180", "#2ec4b6", "#1a6b6b",
  "#3dd6c8", "#0d5e6e", "#56ddd2", "#0a4a5a",
  "#76e4dc", "#083c4a"
];

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------
let currentOffice = null;
let isSpinning    = false;
let currentAngle  = 0; // radians, cumulative rotation of the wheel

const canvas     = document.getElementById("wheel-canvas");
const ctx        = canvas.getContext("2d");
const spinBtn    = document.getElementById("spin-btn");
const officeSelect = document.getElementById("office-select");
const resultSection = document.getElementById("result-section");
const disclaimer = document.getElementById("disclaimer");

// ---------------------------------------------------------------------------
// Draw the wheel
// ---------------------------------------------------------------------------
function drawWheel(restaurants, rotationAngle) {
  const W = canvas.width;
  const H = canvas.height;
  const cx = W / 2;
  const cy = H / 2;
  const radius = W / 2 - 4;
  const n = restaurants.length;
  const sliceAngle = (2 * Math.PI) / n;

  ctx.clearRect(0, 0, W, H);

  restaurants.forEach((r, i) => {
    const startAngle = rotationAngle + i * sliceAngle;
    const endAngle   = startAngle + sliceAngle;

    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length];
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Label
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + sliceAngle / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#ffffff";
    ctx.font = `bold ${Math.min(13, Math.floor(360 / n * 1.4))}px 'Segoe UI', sans-serif`;
    ctx.shadowColor = "rgba(0,0,0,.35)";
    ctx.shadowBlur = 3;

    // Truncate long names to keep labels legible
    const maxLen = 18;
    const label  = r.name.length > maxLen ? r.name.slice(0, maxLen - 1) + "…" : r.name;
    ctx.fillText(label, radius - 12, 5);
    ctx.restore();
  });

  // Outer ring
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.stroke();
}

// ---------------------------------------------------------------------------
// Determine the winning slice given a final rotation angle
// The pointer is at the top (−π/2), so we compute which slice sits there.
// ---------------------------------------------------------------------------
function getWinner(restaurants, finalAngle) {
  const n = restaurants.length;
  const sliceAngle = (2 * Math.PI) / n;
  // Normalise angle so it's in [0, 2π)
  const normalised = (((-finalAngle) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  // The pointer is at top = −π/2 relative to standard canvas coords.
  // We offset so that angle 0 on the wheel aligns with the pointer.
  const pointerOffset = Math.PI / 2 * 3; // = 3π/2 = 270° (top in canvas coords)
  const adjusted = ((normalised + pointerOffset) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  return Math.floor(adjusted / sliceAngle) % n;
}

// ---------------------------------------------------------------------------
// Spin animation
// ---------------------------------------------------------------------------
function spin() {
  if (isSpinning || !currentOffice) return;
  isSpinning = true;
  spinBtn.disabled = true;
  resultSection.hidden = true;

  const restaurants = OFFICES[currentOffice].restaurants;

  // Random extra rotations (5–10 full turns) + a random final position
  const extraRotations = (5 + Math.random() * 5) * 2 * Math.PI;
  const finalOffset    = Math.random() * 2 * Math.PI;
  const totalSpin      = extraRotations + finalOffset;
  const targetAngle    = currentAngle + totalSpin;

  const duration  = 4000 + Math.random() * 1500; // 4–5.5 s
  const startTime = performance.now();
  const startAngle = currentAngle;

  function easeOut(t) {
    // Cubic ease-out
    return 1 - Math.pow(1 - t, 3);
  }

  function frame(now) {
    const elapsed  = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    currentAngle   = startAngle + totalSpin * easeOut(progress);

    drawWheel(restaurants, currentAngle);

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      currentAngle = targetAngle;
      isSpinning   = false;
      spinBtn.disabled = false;
      showResult(restaurants);
    }
  }

  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------------------
// Show result
// ---------------------------------------------------------------------------
function showResult(restaurants) {
  const winnerIdx = getWinner(restaurants, currentAngle);
  const winner    = restaurants[winnerIdx];

  document.getElementById("result-name").textContent    = winner.name;
  document.getElementById("result-type").textContent    = winner.type;
  document.getElementById("result-address").textContent = "📍 " + winner.address;

  resultSection.hidden = false;
  // Re-trigger animation
  resultSection.classList.remove("animate");
  void resultSection.offsetWidth; // reflow
  resultSection.classList.add("animate");

  resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ---------------------------------------------------------------------------
// Office selector change
// ---------------------------------------------------------------------------
officeSelect.addEventListener("change", () => {
  currentOffice = officeSelect.value || null;
  resultSection.hidden = true;
  currentAngle = 0;

  if (currentOffice) {
    const restaurants = OFFICES[currentOffice].restaurants;
    drawWheel(restaurants, 0);
    spinBtn.disabled = false;
    disclaimer.textContent = "Spin the wheel and follow the doctor's orders!";
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    spinBtn.disabled = true;
    disclaimer.textContent = "Choose an office above to unlock the wheel.";
  }
});

// ---------------------------------------------------------------------------
// Spin button
// ---------------------------------------------------------------------------
spinBtn.addEventListener("click", spin);

// Spin again button
document.getElementById("spin-again-btn").addEventListener("click", () => {
  resultSection.hidden = true;
  spin();
});

// ---------------------------------------------------------------------------
// Draw a placeholder wheel on load
// ---------------------------------------------------------------------------
(function drawPlaceholder() {
  const W  = canvas.width;
  const cx = W / 2;
  const cy = W / 2;
  const r  = W / 2 - 4;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, 2 * Math.PI);
  ctx.fillStyle = "#d0eaf0";
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#5a7a84";
  ctx.font = "bold 16px 'Segoe UI', sans-serif";
  ctx.fillText("Select an office", cx, cy - 10);
  ctx.fillText("to start", cx, cy + 14);
})();
