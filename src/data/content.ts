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
  { label: "Prices", href: "#prices" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
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
