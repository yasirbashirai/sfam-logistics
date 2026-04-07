// ~80 major US ZIP centroids (lat, lng) for haversine distance estimation.
// Real production app would use full USPS/Census ZIP centroid DB or a mileage API.
export const zipCentroids = {
  // Pacific NW
  '98011': [47.7623, -122.2054, 'Bothell, WA'],
  '98101': [47.6097, -122.3331, 'Seattle, WA'],
  '98401': [47.2529, -122.4443, 'Tacoma, WA'],
  '97201': [45.5152, -122.6784, 'Portland, OR'],
  '97401': [44.0521, -123.0868, 'Eugene, OR'],
  // California
  '90001': [33.9731, -118.2479, 'Los Angeles, CA'],
  '90210': [34.0901, -118.4065, 'Beverly Hills, CA'],
  '92101': [32.7157, -117.1611, 'San Diego, CA'],
  '94102': [37.7793, -122.4192, 'San Francisco, CA'],
  '95814': [38.5816, -121.4944, 'Sacramento, CA'],
  '93701': [36.7468, -119.7726, 'Fresno, CA'],
  '92501': [33.9533, -117.3962, 'Riverside, CA'],
  // Southwest
  '85001': [33.4484, -112.074, 'Phoenix, AZ'],
  '85701': [32.2226, -110.9747, 'Tucson, AZ'],
  '87101': [35.0844, -106.6504, 'Albuquerque, NM'],
  '89101': [36.1699, -115.1398, 'Las Vegas, NV'],
  '84101': [40.7608, -111.891, 'Salt Lake City, UT'],
  '80202': [39.7392, -104.9903, 'Denver, CO'],
  // Texas
  '75201': [32.7767, -96.797, 'Dallas, TX'],
  '77002': [29.7604, -95.3698, 'Houston, TX'],
  '78701': [30.2672, -97.7431, 'Austin, TX'],
  '78201': [29.4241, -98.4936, 'San Antonio, TX'],
  '79901': [31.7619, -106.485, 'El Paso, TX'],
  // Midwest
  '60601': [41.8781, -87.6298, 'Chicago, IL'],
  '63101': [38.627, -90.1994, 'St. Louis, MO'],
  '64101': [39.0997, -94.5786, 'Kansas City, MO'],
  '55401': [44.9778, -93.265, 'Minneapolis, MN'],
  '53201': [43.0389, -87.9065, 'Milwaukee, WI'],
  '46201': [39.7684, -86.1581, 'Indianapolis, IN'],
  '43201': [39.9612, -82.9988, 'Columbus, OH'],
  '44101': [41.4993, -81.6944, 'Cleveland, OH'],
  '48201': [42.3314, -83.0458, 'Detroit, MI'],
  '45201': [39.1031, -84.512, 'Cincinnati, OH'],
  '50301': [41.5868, -93.625, 'Des Moines, IA'],
  '68101': [41.2565, -95.9345, 'Omaha, NE'],
  // Southeast
  '30301': [33.749, -84.388, 'Atlanta, GA'],
  '32801': [28.5383, -81.3792, 'Orlando, FL'],
  '33101': [25.7617, -80.1918, 'Miami, FL'],
  '33602': [27.9506, -82.4572, 'Tampa, FL'],
  '32202': [30.3322, -81.6557, 'Jacksonville, FL'],
  '28201': [35.2271, -80.8431, 'Charlotte, NC'],
  '27601': [35.7796, -78.6382, 'Raleigh, NC'],
  '29401': [32.7765, -79.9311, 'Charleston, SC'],
  '37201': [36.1627, -86.7816, 'Nashville, TN'],
  '38101': [35.1495, -90.049, 'Memphis, TN'],
  '40202': [38.2527, -85.7585, 'Louisville, KY'],
  '70112': [29.9511, -90.0715, 'New Orleans, LA'],
  '35201': [33.5186, -86.8104, 'Birmingham, AL'],
  // Northeast
  '10001': [40.7506, -73.9972, 'New York, NY'],
  '10019': [40.7656, -73.9864, 'New York, NY'],
  '11201': [40.6943, -73.9903, 'Brooklyn, NY'],
  '02101': [42.3601, -71.0589, 'Boston, MA'],
  '19101': [39.9526, -75.1652, 'Philadelphia, PA'],
  '15201': [40.4406, -79.9959, 'Pittsburgh, PA'],
  '21201': [39.2904, -76.6122, 'Baltimore, MD'],
  '20001': [38.9072, -77.0369, 'Washington, DC'],
  '23218': [37.5407, -77.436, 'Richmond, VA'],
  '14201': [42.8864, -78.8784, 'Buffalo, NY'],
  '06101': [41.7658, -72.6734, 'Hartford, CT']
}

export function haversineMiles(z1, z2) {
  const a = zipCentroids[z1]
  const b = zipCentroids[z2]
  if (!a || !b) return null
  const [lat1, lon1] = a
  const [lat2, lon2] = b
  const R = 3958.8
  const toRad = d => d * Math.PI / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const aa = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  // Approximate ground/road distance ~20% more than great-circle
  return Math.round(R * 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1 - aa)) * 1.2)
}

export function lookupZip(z) {
  return zipCentroids[z]?.[2] || null
}
