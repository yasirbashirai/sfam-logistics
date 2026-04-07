// Curated logistics & trucking imagery (Unsplash). 25+ unique photos used across pages.
// Each constant has a single owner — never reuse the same image in two places.
const u = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const IMG = {
  // Hero / brand (user's own photos — never replaced by stock)
  ownTruck:      '/images/truck-hero.jpg',
  handshake:     '/images/handshake-driver.jpg',            // user's branded handshake
  heroHighway:   u('1543465077-db45d34b88a5'),              // highway perspective
  heroDusk:      u('1494412519320-aa613dfb7738'),           // truck at dusk
  heroFleet:     u('1601584115197-04ecc0da31d7'),           // fleet of trucks
  // About / story
  driverPortrait:u('1573497019418-b400bb3ab074'),           // truck driver portrait
  cabInterior:   u('1568772585407-9361f9bf3a87'),           // truck cab
  roadMountains: u('1469854523086-cc02fe5d8800'),           // open road mountains
  teamMeeting:   u('1521737604893-d14cc237f11d'),           // team meeting
  // Services
  ftlTruck:      u('1605559424843-9e4c228bf1c2'),           // FTL semi
  ltlPallets:    u('1601598851547-4302969d0614'),           // LTL pallets
  reeferTrailer: u('1580674684081-7617fbf3d745'),           // refrigerated
  flatbedLoad:   u('1601584115197-04ecc0da31d7'),           // flatbed
  dedicatedFleet:u('1612838320302-4b3b3b3b3b3b'),           // dedicated fleet
  expeditedVan:  u('1586528116493-a029325540fa'),           // expedited
  // Operations & warehouse
  warehouseRows: u('1553413077-190dd305871c'),              // warehouse rows
  warehouseLoad: u('1606191055015-2a8a3eb8fb33'),           // warehouse loading
  forklift:      u('1565891741441-64926e441838'),           // forklift
  loadingDock:   u('1611956425642-d5a8169abd63'),           // loading dock
  shippingPort:  u('1577415124269-fc1140a69e91'),           // shipping containers
  // Tech / dispatch
  dispatchDesk:  u('1556761175-5973dc0f32e7'),              // dispatch desk
  laptopMap:     u('1551288049-bebda4e38f71'),              // laptop with map
  trackingScreen:u('1460925895917-afdab827c52f'),           // analytics screen
  // People / partnership
  partnership:   u('1556761175-b413da4baf72'),              // partnership
  driverWave:    u('1547036967-23d11aacaee0'),              // driver waving
  carriersBg:    u('1601584115197-04ecc0da31d7'),           // carriers backdrop
  // Misc
  cityLights:    u('1502920917128-1aa500764cbd'),           // city lights
  sunsetHwy:     u('1542315192-1f61a1792f33'),              // sunset highway
  americaMap:    u('1524661135-423995f22d0b'),              // map
  blogShipping:  u('1566576721346-d4a3b4eaeb55'),           // shipping blog
  blogCarriers:  u('1592434134753-a70baf7979d5'),           // carriers blog
  blogIndustry:  u('1486406146926-c627a92ad1ab')            // industry insights
}

export default IMG
