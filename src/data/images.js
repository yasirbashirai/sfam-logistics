// SFam Logistics — image library.
// ONLY uses files in /public/images/. No external URLs.
// Uses owner-provided real photos + clean stock truck images.

// === Owner-provided photos ===
const truckRedWhite    = '/images/truck-redwhite.jpg'      // Red & white Peterbilt show truck
const truckSnowRoad    = '/images/truck-snow-road.jpg'     // Trucks on snowy highway
const trailerLoaded    = '/images/trailer-loaded.jpg'      // Loaded trailer at dock
const whitePeterbilt   = '/images/white-peterbilt.jpg'     // White Peterbilt cab
const highwayMountains = '/images/highway-mountains.jpg'   // Highway through mountain pass

// === Clean stock truck images ===
const whiteFreightliner = '/images/white-freightliner.jpg'  // White Freightliner on highway
const whiteVolvoSunset  = '/images/white-volvo-sunset.jpg'  // White Volvo trucks at sunset
const whiteVolvoMotion  = '/images/white-volvo-motion.jpg'  // White Volvo in motion, green fields
const whitePeterbiltRural = '/images/white-peterbilt-rural.jpg' // White Peterbilt on rural road
const blueKenworthDesert = '/images/blue-kenworth-desert.jpg'  // Blue Kenworth in desert

// Keep logo reference
const sfamLogo = '/images/sfam-logo.jpg'

export const IMG = {
  // Owner photos
  truckRedWhite, truckSnowRoad, trailerLoaded, whitePeterbilt, highwayMountains,

  // Stock images
  whiteFreightliner, whiteVolvoSunset, whiteVolvoMotion, whitePeterbiltRural, blueKenworthDesert,

  // Logo
  sfamLogo,

  // === Aliases (used across pages) ===

  // Hero variants
  heroHighway: highwayMountains,
  heroDusk: whiteVolvoSunset,
  heroFleet: blueKenworthDesert,
  cityLights: blueKenworthDesert,
  roadMountains: highwayMountains,

  // People / team (replaced branded with clean trucks)
  driverPortrait: whitePeterbilt,
  cabInterior: trailerLoaded,
  teamMeeting: whiteVolvoSunset,
  dispatchDesk: whiteFreightliner,
  laptopMap: whitePeterbiltRural,

  // Equipment / services
  ftlTruck: whiteFreightliner,
  ltlPallets: trailerLoaded,
  reeferTrailer: whiteVolvoMotion,
  flatbedLoad: blueKenworthDesert,
  dedicatedFleet: whiteVolvoSunset,
  expeditedVan: whitePeterbiltRural,
  warehouseLoad: trailerLoaded,
  shippingPort: whiteFreightliner,

  // Blog
  blogShipping: whiteFreightliner,
  blogIndustry: whitePeterbiltRural,
  blogCarriers: whiteVolvoSunset
}

export default IMG
