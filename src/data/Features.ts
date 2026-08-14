export const WM = "https://commons.wikimedia.org/wiki/Special:FilePath/";
export const IMG = {
    heroBasantapur: WM + "Kathmandu%20Durbar%20Square,%20Maju%20Dega%202,%20Nepal.jpg",
    patan: WM + "Patan%20Durbar%20Square,%20Lalitpur,%20Nepal%205.jpg",
    patanNight: WM + "Patan%20Durbar%20Square%20at%20Night.jpg",
    bhaktapur: WM + "Bhaktapur%20Durbar%20Square%20Nepal%202024%2010.jpg",
    boudhanath: WM + "Boudhanath%20stupa,%20Kathmandu%2001.jpg",
    pashupatinath: WM + "Picturesque%20view%20of%20Pashupatinath%20Temple.jpg",
    pokhara: WM + "Phewa%20lake,%20Pokhara.jpg",
};

const trending = [
    {
        name: "Boudhanath Stupa",
        location: "Kathmandu",
        stat: "3.2k check-ins / mo",
        image: IMG.boudhanath,
    },
    {
        name: "Pashupatinath Temple",
        location: "Kathmandu",
        stat: "UNESCO listed, 1979",
        image: IMG.pashupatinath,
    },
    {
        name: "Phewa Lake, Pokhara",
        location: "Pokhara",
        stat: "Annapurna reflections",
        image: IMG.pokhara,
    },
];

export default trending

export const heritageSites = [
    {
        name: "Kathmandu Durbar Square",
        location: "Kathmandu · Hanuman Dhoka",
        description: "The old royal seat of the Malla and Shah kings, wedged between Freak Street and the Kasthamandap crossroads. Climb the tiered plinths of the Maju Dega for a rooftop view over the square.",
        era: "12th – 18th century",
        known: "Kumari Ghar & Maju Dega",
        image: IMG.heroBasantapur,
        mapQuery: "Kathmandu+Durbar+Square,+Basantapur,+Nepal",
    },
    {
        name: "Patan Durbar Square",
        location: "Lalitpur · City of Fine Arts",
        description: "Across the Bagmati river, Patan's square is tighter and denser than Kathmandu's — one stone-paved courtyard ringed by temples. The Krishna Mandir, carved entirely in stone, anchors the square.",
        era: "16th – 17th century",
        known: "Krishna Mandir & metalwork",
        image: IMG.patan,
        mapQuery: "Patan+Durbar+Square,+Lalitpur,+Nepal",
    },
    {
        name: "Bhaktapur Durbar Square",
        location: "Bhaktapur · City of Devotees",
        description: "The furthest of the three from central Kathmandu, and the best preserved — cars stop at the city gates. The 55-Window Palace faces the Golden Gate, and a short walk leads to Nyatapola, Nepal's tallest pagoda.",
        era: "12th – 15th century",
        known: "Nyatapola & Potters' Square",
        image: IMG.bhaktapur,
        mapQuery: "Bhaktapur+Durbar+Square,+Nepal",
    },
];