export const destinationsData = [
    {
        id: "kathmandu",
        name: "Kathmandu Durbar Square",
        location: "Kathmandu, Nepal",

        description:
            "Enter the historic heart of Kathmandu and explore its courtyards, temples, and layered Newar architecture.",

        image: "/img/kathmandu.jpeg",

        available: true,

        model: {
            glbUrl: "/models/basantapur.glb",
            scale: 5,

            cameraPath: [
                {
                    position: [8, 5, 10],
                    lookAt: [0, 0.8, 0],
                },

                {
                    position: [5.5, 3.5, 6],
                    lookAt: [-0.45, 0.35, -0.5],
                },

                {
                    position: [-4.5, 3, 5],
                    lookAt: [0.42, 0.35, 0.34],
                },

                {
                    position: [4, 4, -5],
                    lookAt: [0.5, 0.4, -0.05],
                },
            ],

            hotspots: [
                {
                    id: "kasthamandap",
                    label: "Gaddi Baithak",
                    position: [-0.45, 0.18, -0.5],
                    description:
                        "Gaddi Baithak is one of the historic European structures associated with Basantapur Durbar Square and Kathmandu's traditional architectural heritage.",
                },

                {
                    id: "kumari-ghar",
                    label: "Kumari Ghar",
                    position: [0.42, 0.16, 0.34],
                    description:
                        "Kumari Ghar is the ornate courtyard residence associated with the Kumari tradition. Its carved wooden façade is one of the distinctive architectural details of the square.",
                },

                {
                    id: "taleju",
                    label: "Taleju Temple",
                    position: [0.5, 0.22, -0.05],
                    description:
                        "Taleju Temple rises above the surrounding structures and is one of the most visually dominant monuments within the historic square.",
                },
                {
                    id: "maju-dega",
                    label: "Maju Dega",
                    position: [0.04, 0.2, -0.62],
                    description:
                        "Maju Dega is a prominent nine-stage Shiva temple offering sweeping views over Basantapur from its majestic stepped plinth.",
                },
                {
                    id: "kal-bhairav",
                    label: "Kal Bhairav",
                    position: [-0.26, 0.16, 0.12],
                    description:
                        "A fierce stone image of Lord Shiva in his destructive manifestation. It was believed that speaking a lie while standing before it would bring immediate death.",
                },
            ],
        },
    },

    {
        id: "patan",
        name: "Patan Durbar Square",
        location: "Lalitpur, Nepal",

        description:
            "Explore the stone-paved courtyards, Krishna Mandir, and the finest Newar metalwork traditions of Lalitpur.",

        image: "/img/images.jpeg",

        available: true,

        model: {
            glbUrl: "/models/patan.glb",
            scale: 5,

            cameraPath: [
                {
                    position: [8, 5, 10],
                    lookAt: [0, 0.8, 0],
                },
                {
                    position: [5.5, 3.5, 6],
                    lookAt: [0.2, 1.0, -0.4],
                },
                {
                    position: [-4.5, 3, 5],
                    lookAt: [-0.5, 0.9, 0.3],
                },
                {
                    position: [4, 4, -5],
                    lookAt: [1.1, 1.2, 0.1],
                },
            ],

            hotspots: [
                {
                    id: "krishna-mandir",
                    label: "Krishna Mandir",
                    position: [0.3, 0, 0.1],
                    description:
                        "A stunning stone temple built in the Shikhara style by King Siddhi Narsingh Malla in the 17th century, dedicated to Lord Krishna.",
                },
                {
                    id: "patan-museum",
                    label: "Patan Museum",
                    position: [-0.2, 0, 0.3],
                    description:
                        "Housed in the former royal palace, this museum showcases the finest collection of Newar bronze and repoussé metalwork in the valley.",
                },
                {
                    id: "golden-temple",
                    label: "Golden Temple",
                    position: [0.1, 0, -0.3],
                    description:
                        "Hiranya Varna Mahavihar, a 12th-century Buddhist monastery with a golden façade and intricate metalwork, located steps from the square.",
                },
            ],
        },
    },

    {
        id: "bhaktapur",
        name: "Bhaktapur Durbar Square",
        location: "Bhaktapur, Nepal",

        description:
            "Walk through Bhaktapur's palace courtyards, pagoda temples, and brick plazas shaped by centuries of Newar craftsmanship.",

        image: "/img/bhaktapur.jpg",

        available: true,

        model: {
            glbUrl: "/models/baktapur.glb",
            scale: 5,

            cameraPath: [
                {
                    position: [8, 5, 10],
                    lookAt: [0, 0.8, 0],
                },
                {
                    position: [5.5, 3.8, 5.5],
                    lookAt: [-0.44, 0.42, -0.38],
                },
                {
                    position: [-4.8, 3.6, 5.6],
                    lookAt: [0.36, 0.46, 0.32],
                },
                {
                    position: [4.2, 4.2, -5.4],
                    lookAt: [0.48, 0.55, -0.08],
                },
            ],

            hotspots: [
                {
                    id: "fifty-five-window-palace",
                    label: "55-Window Palace",
                    position: [-0.44, 0.24, -0.38],
                    description:
                        "The former royal palace is known for its long carved wooden window facade, one of Bhaktapur's most recognizable palace details.",
                },
                {
                    id: "golden-gate",
                    label: "Golden Gate",
                    position: [0.36, 0.22, 0.32],
                    description:
                        "The Golden Gate marks the entrance to the palace courtyard and is celebrated for its gilded metalwork and ornate sacred imagery.",
                },
                {
                    id: "nyatapola",
                    label: "Nyatapola Temple",
                    position: [0.48, 0.3, -0.08],
                    description:
                        "Nyatapola is Nepal's tallest pagoda temple, rising on a stepped plinth guarded by pairs of powerful stone figures.",
                },
                {
                    id: "vatsala-temple",
                    label: "Vatsala Temple",
                    position: [-0.04, 0.24, 0.55],
                    description:
                        "Vatsala Temple is a stone shikhara shrine in the square, known for its elegant profile and nearby ceremonial bell.",
                },
                {
                    id: "potters-square",
                    label: "Potters' Square",
                    position: [0.08, 0.18, -0.58],
                    description:
                        "Potters' Square reflects Bhaktapur's living craft traditions, where clay vessels dry in open courtyards around the old city.",
                },
            ],
        },
    },
];
