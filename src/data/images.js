// SFam Logistics — official branded image library.
// ONLY uses files in /public/images/. No external URLs.
// 11 unique branded photos. Aliases below remap legacy keys to local images.

// === Canonical local files ===
const peterbiltHighway = '/images/peterbilt-highway.jpg'  // SFam blue Peterbilt cruising — main hero
const ownTruck         = '/images/truck-hero.jpg'         // original truck on lot
const truckYardNight   = '/images/truck-yard-night.jpg'   // aerial yard, Vegas at night
const handshake        = '/images/handshake-driver.jpg'   // owner + driver handshake
const femaleDriver     = '/images/female-driver.jpg'      // female SFam driver portrait
const dispatchTeam     = '/images/dispatch-team.jpg'      // SFam dispatch office team
const opsTablet        = '/images/ops-tablet.jpg'         // operations / route planning tablet
const flatbedLA        = '/images/flatbed-la.jpg'         // flatbed steel coils, LA skyline
const reeferLoading    = '/images/reefer-loading.jpg'     // SFam reefer at cold storage
const dryvanLoading    = '/images/dryvan-loading.jpg'     // SFam dry van loading dock
const ltlWarehouse     = '/images/ltl-warehouse.jpg'      // LTL hub, multiple SFam trucks

export const IMG = {
  // Canonical
  peterbiltHighway, ownTruck, truckYardNight, handshake,
  femaleDriver, dispatchTeam, opsTablet,
  flatbedLA, reeferLoading, dryvanLoading, ltlWarehouse,

  // === Aliases (legacy keys → local files) ===
  // Hero variants
  heroHighway: peterbiltHighway,
  heroDusk: handshake,
  heroFleet: truckYardNight,
  cityLights: truckYardNight,
  roadMountains: peterbiltHighway,

  // People
  driverPortrait: femaleDriver,
  cabInterior: peterbiltHighway,
  teamMeeting: dispatchTeam,
  dispatchDesk: dispatchTeam,
  laptopMap: opsTablet,

  // Equipment / services
  ftlTruck: peterbiltHighway,
  ltlPallets: dryvanLoading,
  reeferTrailer: reeferLoading,
  flatbedLoad: flatbedLA,
  dedicatedFleet: ltlWarehouse,
  expeditedVan: ownTruck,
  warehouseLoad: dryvanLoading,
  shippingPort: ltlWarehouse,

  // Blog
  blogShipping: dryvanLoading,
  blogIndustry: opsTablet,
  blogCarriers: ltlWarehouse
}

export default IMG
