const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Disease risk thresholds
const FUNGAL_HUMIDITY_THRESHOLD = 70;   // %
const BACTERIAL_RAINFALL_THRESHOLD = 8; // mm

function computeDiseaseRisk(humidity, rainfall, temp) {
  let score = 0;
  if (humidity > 80) score += 3;
  else if (humidity > 70) score += 2;
  else if (humidity > 60) score += 1;

  if (rainfall > 15) score += 2;
  else if (rainfall > 8) score += 1;

  if (temp >= 20 && temp <= 30) score += 1; // Ideal for many pathogens

  if (score >= 5) return { level: 'Very High', color: '#c0392b' };
  if (score >= 4) return { level: 'High', color: '#e74c3c' };
  if (score >= 3) return { level: 'Moderate', color: '#e9a319' };
  return { level: 'Low', color: '#40916c' };
}

function getRiskReason(humidity, rainfall, risk) {
  const reasons = [];
  if (humidity > FUNGAL_HUMIDITY_THRESHOLD) reasons.push(`High humidity (${humidity}%) promotes fungal spore spread`);
  if (rainfall > BACTERIAL_RAINFALL_THRESHOLD) reasons.push(`Recent rainfall (${rainfall}mm) creates bacterial infection conditions`);
  if (reasons.length === 0) reasons.push('Current conditions are favorable for crop health');
  return reasons.join('. ');
}

// Realistic mock weather data with slight daily variation
function generateMockWeather(location = 'Maharashtra') {
  // Seasonal base (India, April–May = hot+humid pre-monsoon)
  const now = new Date();
  const seed = now.getDate() + now.getMonth() * 31; // Changes daily
  const rand = (min, max) => min + ((seed * 17 + max * 3) % (max - min + 1));

  const temp = rand(26, 34);
  const humidity = rand(58, 80);
  const rainfall = rand(0, 18);
  const wind = rand(8, 22);
  const uvIndex = rand(5, 10);
  const risk = computeDiseaseRisk(humidity, rainfall, temp);
  const riskReason = getRiskReason(humidity, rainfall, risk);

  const conditions = [
    { emoji: '☀️', label: 'Clear Sky' },
    { emoji: '🌤', label: 'Partly Cloudy' },
    { emoji: '⛅', label: 'Mostly Cloudy' },
    { emoji: '🌧', label: 'Light Rain' },
    { emoji: '🌩', label: 'Thunderstorm' },
  ];
  const condition = conditions[seed % conditions.length];

  // 4-day forecast
  const forecast = [0, 1, 2, 3].map(offset => {
    const fSeed = seed + offset * 7;
    const fHumidity = Math.min(95, humidity + (fSeed % 15) - 7);
    const fTemp = temp + (fSeed % 6) - 3;
    const fRainfall = offset === 1 ? rand(10, 30) : rand(0, 12);
    const fRisk = computeDiseaseRisk(fHumidity, fRainfall, fTemp);
    const dayLabels = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
    const dayEmojis = ['🌤', '🌧', '⛅', '☀️'];
    return {
      label: dayLabels[offset],
      emoji: dayEmojis[offset % dayEmojis.length],
      temp: fTemp,
      humidity: fHumidity,
      rainfall: fRainfall,
      riskLevel: fRisk.level,
      riskColor: fRisk.color,
    };
  });

  // Proactive advice based on risk
  let advice = '';
  if (risk.level === 'High' || risk.level === 'Very High') {
    advice = `Apply Mancozeb (75% WP) at 2.5g/litre as preventive spray before tomorrow. Avoid spraying during rain.`;
  } else if (risk.level === 'Moderate') {
    advice = `Monitor crops closely today. Inspect leaves for early signs of discoloration or lesions.`;
  } else {
    advice = `Good conditions today. Regular watering schedule and weekly crop inspection recommended.`;
  }

  return {
    location,
    temp,
    feelsLike: temp - 2,
    condition: condition.label,
    conditionEmoji: condition.emoji,
    humidity,
    rainfall,
    wind,
    uvIndex,
    visibility: rand(6, 12),
    diseaseRisk: risk.level,
    diseaseRiskColor: risk.color,
    riskReason,
    proactiveAdvice: advice,
    alerts: humidity > FUNGAL_HUMIDITY_THRESHOLD
      ? [{ type: 'Fungal Risk', severity: 'High', message: `Humidity at ${humidity}% — fungal spore spread risk is elevated` }]
      : [],
    forecast,
    updatedAt: new Date().toISOString(),
    source: 'CropDr. Environmental Model (Mock)',
  };
}

// ─── GET /api/weather ────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  const location = req.query.location || 'Maharashtra';
  
  try {
    // 1. Geocoding via Open-Meteo
    let lat = 18.52; // Default Pune
    let lon = 73.85;
    let resolvedLocation = location;

    const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`);
    const geoData = await geoRes.json();
    if (geoData.results && geoData.results.length > 0) {
      lat = geoData.results[0].latitude;
      lon = geoData.results[0].longitude;
      resolvedLocation = `${geoData.results[0].name}, ${geoData.results[0].admin1 || geoData.results[0].country}`;
    }

    // 2. Weather via Open-Meteo
    const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
    if (!weatherRes.ok) throw new Error('Weather API returned ' + weatherRes.status);
    
    const wData = await weatherRes.json();
    const current = wData.current;
    const daily = wData.daily;

    const temp = Math.round(current.temperature_2m);
    const humidity = current.relative_humidity_2m;
    const rainfall = current.precipitation;
    const wind = Math.round(current.wind_speed_10m);
    const risk = computeDiseaseRisk(humidity, rainfall, temp);

    const forecast = [0, 1, 2, 3].map(offset => {
      const fHumidity = humidity; 
      const fTemp = Math.round(daily.temperature_2m_max[offset]);
      const fRainfall = daily.precipitation_sum[offset];
      const fRisk = computeDiseaseRisk(fHumidity, fRainfall, fTemp);
      const dayLabels = ['Today', 'Tomorrow', 'Day 3', 'Day 4'];
      
      let emoji = '🌤';
      if (fRainfall > 5) emoji = '🌧';
      else if (fTemp > 35) emoji = '☀️';
      else if (fRainfall > 0) emoji = '🌦';

      return {
        label: dayLabels[offset],
        emoji: emoji,
        temp: fTemp,
        humidity: fHumidity,
        rainfall: fRainfall,
        riskLevel: fRisk.level,
        riskColor: fRisk.color,
      };
    });

    let condition = 'Clear';
    let conditionEmoji = '☀️';
    if (rainfall > 5) { condition = 'Rain'; conditionEmoji = '🌧'; }
    else if (rainfall > 0) { condition = 'Light Rain'; conditionEmoji = '🌦'; }
    else if (humidity > 70) { condition = 'Cloudy'; conditionEmoji = '🌥'; }
    else if (humidity > 50) { condition = 'Partly Cloudy'; conditionEmoji = '🌤'; }

    // 3. Gemini Alerts Generation
    let alerts = [];
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
      try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `You are an expert Indian agricultural advisor. Given the current weather conditions for a farm in ${resolvedLocation}: Temperature: ${temp}°C, Humidity: ${humidity}%, Rainfall: ${rainfall}mm. Provide 1 to 2 very brief, urgent agricultural alerts or recommendations. Return ONLY a valid JSON array of objects, with each object having properties: "title" (short), "message" (1 sentence advice), "severity" ("High", "Moderate", or "Low"), and "type" (e.g. "Fungal Risk", "Heat Stress"). Do NOT use markdown code blocks like \`\`\`json, just return the raw JSON array.`;
        
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim().replace(/```json/gi, '').replace(/```/g, '');
        alerts = JSON.parse(text);
        
        // Ensure format and add timeAgo
        alerts = alerts.map(a => ({ ...a, timeAgo: 'Just now' }));
      } catch (err) {
        console.error('Gemini alert generation failed:', err);
      }
    }

    // Fallback alerts if Gemini fails or is not configured
    if (!alerts || alerts.length === 0) {
      if (humidity > FUNGAL_HUMIDITY_THRESHOLD) {
        alerts.push({ type: 'Fungal Risk', severity: 'High', title: 'Fungal spread risk — Act today!', message: `High humidity (${humidity}%) detected. Apply preventive fungicide before tomorrow.`, timeAgo: 'Just now' });
      } else if (temp > 35 && rainfall === 0) {
        alerts.push({ type: 'Heat Stress', severity: 'Moderate', title: 'High Heat Warning', message: `Temperature is ${temp}°C. Ensure adequate irrigation to prevent heat stress.`, timeAgo: 'Just now' });
      } else {
        alerts.push({ type: 'Status', severity: 'Low', title: 'Conditions Normal', message: 'Current weather is favorable for most crops.', timeAgo: 'Just now' });
      }
    }

    let advice = '';
    if (risk.level === 'High' || risk.level === 'Very High') {
      advice = `High disease risk today. Apply preventive organic or chemical fungicides immediately.`;
    } else if (risk.level === 'Moderate') {
      advice = `Monitor crops closely today for any early signs of discoloration.`;
    } else {
      advice = `Good conditions today. Continue regular crop maintenance.`;
    }

    const data = {
      location: resolvedLocation,
      temp,
      feelsLike: temp + (humidity > 60 ? 2 : -1),
      condition: condition,
      conditionEmoji: conditionEmoji,
      humidity,
      rainfall,
      wind: wind,
      uvIndex: 6,
      visibility: 10,
      diseaseRisk: risk.level,
      diseaseRiskColor: risk.color,
      riskReason: getRiskReason(humidity, rainfall, risk),
      proactiveAdvice: advice,
      alerts: alerts,
      forecast,
      updatedAt: new Date().toISOString(),
      source: 'Open-Meteo & AI'
    };

    res.json(data);
  } catch (error) {
    console.error('Weather API failed, falling back to mock:', error.message);
    res.json(generateMockWeather(location));
  }
});

module.exports = router;
