/** All site copy in one place. ⚑ marks placeholders to confirm with the client. */
export const SITE = {
  name: "Barton's Grooming",
  phone: "01632 960 412", // ⚑
  address: "12 Mill Lane", // ⚑
  hours: "Open Tue–Sat, 8am–5pm", // ⚑
  email: "hello@bartonsgrooming.co.uk", // ⚑
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Area", href: "#area" },
  { label: "Barton", href: "#barton" },
  { label: "Prices", href: "#prices" },
];

export const HERO = {
  metaLeft: "Good dogs. Great hair.",
  metaRight: "Independent spirit / gentle hands",
  kicker: "A little scruffy. A lot of character.",
  title1: "Less shaggy.",
  title2: "More swagger.",
  intro: "For the muddy adventurers. The sofa snoozers. The very good dogs who deserve a little extra.",
  cta: "Let's get you looking good",
  explore: "Explore the grooms",
  signoff: "All character. No bad hair days.",
  signoffSmall: "Bath, cut & a whole lot of love",
  note1: "excellent hair.",
  note2: "questionable manners.",
  badgeRing: "LOOK GOOD ✦ FEEL FETCH ✦ BE YOURSELF ✦ ",
  badgeCentre: "Yeah baby!",
  replay: "Another bubble bath?",
  pickerLabel: "One studio. Four grooves.",
};

export const TICKER_ITEMS = [
  "Bath & Blow-dry",
  "Breed Cuts",
  "Nail Trims",
  "Teeth Brushing",
  "Puppy Intros",
  "De-shedding",
];

export const SERVICES_SECTION = {
  title: "Pick a pamper.",
  sub: "Every groom includes a nose-to-tail health check and a treat of their choosing.",
};

export type Dog = { id: string; name: string; breed: string; before: string; after: string };
export const DOGS: Dog[] = [
  { id: "bella", name: "Bella", breed: "cockapoo", before: "/images/bella.jpg", after: "/images/bella.jpg" },
  { id: "murphy", name: "Murphy", breed: "border collie", before: "/images/murphy.jpg", after: "/images/murphy.jpg" },
  { id: "pip", name: "Pip", breed: "puppy", before: "/images/pip.jpg", after: "/images/pip.jpg" },
];

export const BEFORE_AFTER = {
  eyebrow: "The Barton's effect",
  title: "Drag to see the glow-up.",
  sub: "Real dogs from this week. Slide the handle to compare before and after.",
};

export const ESTIMATOR = {
  title: "How much for my pup?",
  sub: "Pick a size and a groom. You'll see a price before you book, with no surprises at pickup.",
};

export const BOOKING = {
  times: ["8:30am", "10:00am", "11:30am", "1:00pm", "2:30pm", "4:00pm"],
  pet: { src: "/images/booking-pet.jpg", alt: "Your dog", caption: "pet photo" },
  afterNote: "We'll text you when your dog is ready to collect.",
};

/** Finished grooms for the gallery. Holding photos until the client supplies real ones. ⚑ */
export type GalleryItem = { src: string; name: string; groom: string; alt: string };
export const GALLERY: GalleryItem[] = [
  {
    src: "/images/gallery/goggles.jpg",
    name: "Biscuit",
    groom: "Full groom + goggles",
    alt: "A white dog in swimming goggles",
  },
  {
    src: "/images/gallery/hearts.jpg",
    name: "Dolly",
    groom: "Bath & blow-dry",
    alt: "A white dog in heart-shaped sunglasses",
  },
  { src: "/images/gallery/golden.jpg", name: "Sunny", groom: "De-shed + fluff", alt: "A smiling golden retriever" },
  {
    src: "/images/gallery/frenchie.jpg",
    name: "Gus",
    groom: "Bath & nails",
    alt: "A French bulldog grinning in the garden",
  },
  { src: "/images/gallery/cloud.jpg", name: "Marshmallow", groom: "Puppy intro", alt: "A fluffy white puppy" },
  { src: "/images/gallery/pug.jpg", name: "Olive", groom: "Bath & teeth", alt: "A pug lying down" },
  { src: "/images/gallery/husky.jpg", name: "Nanook", groom: "De-shedding", alt: "A husky puppy in the snow" },
  { src: "/images/gallery/corgi.jpg", name: "Pickle", groom: "Beach-ready trim", alt: "A corgi on the sand" },
  { src: "/images/gallery/party.jpg", name: "Fergus", groom: "Birthday groom", alt: "A French bulldog in a party hat" },
  { src: "/images/gallery/snowy.jpg", name: "Snowy", groom: "Hand strip", alt: "A white puppy on a bench" },
];

export const GALLERY_SECTION = {
  eyebrow: "Fresh out of the tub",
  title: "The done pile.",
  sub: "Every one of these walked in a bit shaggy and strutted out. Hover a photo to straighten it up.",
};

/** Area covered: centred on SW15 with a 15-mile ring. ⚑ confirm the radius and the collection offer. */
export const AREA = {
  eyebrow: "Area covered",
  title: "Where we roam.",
  sub: "Home base is Putney, SW15. We look after dogs anywhere within about fifteen miles, from Richmond and Kingston out to Croydon, Harrow and Epsom.",
  note: "Not sure if you're in range? Send a postcode and we'll tell you straight away.",
  centre: { label: "SW15", name: "Putney" },
  radiusMiles: 15,
  highlights: [
    "Putney",
    "Wimbledon",
    "Richmond",
    "Kingston",
    "Fulham",
    "Clapham",
    "Barnes",
    "Twickenham",
    "Ealing",
    "Croydon",
    "Sutton",
    "Epsom",
  ],
};

/** Places on the sketched map as miles east and north of Putney. */
export type Place = { name: string; dx: number; dy: number; big?: boolean; left?: boolean };
export const PLACES: Place[] = [
  { name: "Wimbledon", dx: 0.4, dy: -2.8, big: true },
  { name: "Richmond", dx: -3.8, dy: 0, big: true },
  { name: "Kingston", dx: -3.6, dy: -3.4, big: true },
  { name: "Fulham", dx: 0.9, dy: 1.2 },
  { name: "Clapham", dx: 3.4, dy: -0.3 },
  { name: "Twickenham", dx: -5.4, dy: -1.0 },
  { name: "Croydon", dx: 5.1, dy: -6.2, big: true },
  { name: "Sutton", dx: 0.9, dy: -6.9 },
  { name: "Epsom", dx: -2.2, dy: -8.7 },
  { name: "Hounslow", dx: -6.4, dy: 0.8 },
  { name: "Ealing", dx: -3.8, dy: 3.6, left: true },
  { name: "Esher", dx: -6.4, dy: -6.4 },
  { name: "Westminster", dx: 4.0, dy: 2.9 },
  { name: "Heathrow", dx: -10.3, dy: 0.6 },
  { name: "Bromley", dx: 10.0, dy: -3.9 },
  { name: "Leatherhead", dx: -4.9, dy: -11.5 },
  { name: "Walton", dx: -8.5, dy: -5.2 },
  { name: "Staines", dx: -12.7, dy: -1.9 },
  { name: "Uxbridge", dx: -11.3, dy: 5.9 },
  { name: "Harrow", dx: -5.4, dy: 8.2 },
  { name: "Wembley", dx: -3.5, dy: 6.4 },
  { name: "Camden", dx: 3.1, dy: 5.4 },
  { name: "Greenwich", dx: 9.3, dy: 1.5 },
  { name: "Lewisham", dx: 8.9, dy: -0.6 },
  { name: "Barnet", dx: 0.7, dy: 13.3 },
  { name: "Stratford", dx: 9.2, dy: 5.7 },
];
/** The Thames, west to east, in the same miles-from-Putney coordinates. */
export const THAMES: [number, number][] = [
  [-16, -2.4],
  [-12.7, -1.9],
  [-10.4, -3.6],
  [-8.5, -5.2],
  [-6.8, -5.0],
  [-5.4, -4.0],
  [-3.6, -3.4],
  [-3.9, -1.6],
  [-3.8, 0],
  [-3.1, 1.5],
  [-1.4, 0.9],
  [0, 0],
  [1.5, 0.5],
  [2.6, 1.0],
  [3.3, 2.0],
  [4.3, 2.7],
  [5.4, 3.1],
  [6.6, 2.2],
  [7.6, 3.0],
  [9.3, 1.5],
  [11.2, 2.6],
  [13.5, 2.0],
  [16, 3.0],
];

/** Natalie Barton, the groomer. ⚑ The bio is placeholder copy: LinkedIn blocks automated reading, so confirm every fact with Natalie. */
export const NATALIE = {
  eyebrow: "The groomer",
  title: "Natalie Barton.",
  tagline: "Scissors in one hand, a treat in the other.",
  portrait: { src: "/images/natalie.jpg", alt: "Natalie Barton", caption: "portrait: Natalie Barton" },
  bio: [
    "Natalie is the Barton in Barton's. She has spent her working life around animals and started grooming because she wanted every dog to leave a salon the way she'd want her own to: calm, clean and pleased with itself.",
    "She grooms one dog at a time, with no cages and no rush, and reads every coat before she picks up a tool. Nervous dogs, first-timers and old-timers get all the time they need.",
  ],
  facts: ["Based in Putney, SW15", "One dog at a time", "Nervous dogs welcome", "First-aid trained"], // ⚑
  linkedin: "https://www.linkedin.com/in/natalie-barton-92961a4b/",
  linkedinLabel: "Natalie on LinkedIn",
};

/** Her love for all animals. ⚑ The list is placeholder colour; swap in Natalie's real menagerie. */
export const ANIMALS = {
  eyebrow: "Not just dogs",
  title: "No creature too small.",
  sub: "Dogs are the day job. The soft spot is for anything with a heartbeat. If it scurries, flutters, hops or snoozes in a sunbeam, Natalie has probably rescued one, fostered one or named one.",
  stamps: [
    { icon: "Dog", line: "Dogs, obviously.", note: "Every shape and temperament." },
    { icon: "Cat", line: "Cats.", note: "Honorary clients who book nothing." },
    { icon: "Rabbit", line: "Rabbits.", note: "The fluffiest cuddles going." },
    { icon: "Bird", line: "Birds.", note: "Garden regulars, fed daily." },
    { icon: "Turtle", line: "Tortoises.", note: "Slow, stubborn, adored." },
    { icon: "Fish", line: "Fish.", note: "Yes, they get names too." },
    { icon: "Squirrel", line: "Squirrels.", note: "Uninvited. Welcome anyway." },
    { icon: "Snail", line: "Snails.", note: "Rehomed, never squashed." },
    { icon: "Rat", line: "Rats.", note: "Cleverer than you'd think." },
    { icon: "Bug", line: "Bugs.", note: "Carried outside in a glass." },
  ],
  parade: [
    "Dog",
    "Cat",
    "Rabbit",
    "Bird",
    "Turtle",
    "Fish",
    "Squirrel",
    "Snail",
    "Rat",
    "Bug",
    "PawPrint",
    "Worm",
    "Shrimp",
    "Bone",
  ],
  sticker: "All welcome",
};
