export const destinationsData = [
    {
        id: "kathmandu",
        name: "Kathmandu Darbar Square",
        location: "Kathmandu, Nepal",

        description:
            "Enter the historic heart of Kathmandu and explore its courtyards, temples, and layered Newar architecture.",

        image: "/img/bhaktapur.jpg",

        available: true,

        model: {
            glbUrl: "/models/basantapur.glb",

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
                    id: "kasthamandap",
                    label: "Kasthamandap",
                    position: [0.2, 0, -0.4],
                    description:
                        "Kasthamandap is one of the historic wooden structures associated with Basantapur Durbar Square and Kathmandu's traditional architectural heritage.",
                },

                {
                    id: "kumari-ghar",
                    label: "Kumari Ghar",
                    position: [0, 0, 0.3],
                    description:
                        "Kumari Ghar is the ornate courtyard residence associated with the Kumari tradition. Its carved wooden façade is one of the distinctive architectural details of the square.",
                },

                {
                    id: "taleju",
                    label: "Taleju Temple",
                    position: [0.5, 0, 0.1],
                    description:
                        "Taleju Temple rises above the surrounding structures and is one of the most visually dominant monuments within the historic square.",
                },
                {
                    id: "maju-dega",
                    label: "Maju Dega",
                    position: [0.4, 0, -0.2],
                    description:
                        "Maju Dega is a prominent nine-stage Shiva temple offering sweeping views over Basantapur from its majestic stepped plinth.",
                },
                {
                    id: "kal-bhairav",
                    label: "Kal Bhairav",
                    position: [0.1, 0, -0.1],
                    description:
                        "A fierce stone image of Lord Shiva in his destructive manifestation. It was believed that speaking a lie while standing before it would bring immediate death.",
                },
            ],
        },
    },

    {
        id: "basantapur",
        name: "Basantapur Darbar Square",
        location: "Kathmandu, Nepal",

        description:
            "Explore the intricate courtyards, temples, and metalwork traditions of Basantapur's historic center.",

        image: "/img/kathmandu.jpeg",

        available: true,

        model: {},
    },


    {
        id: "patan",
        name: "Patan Darbar Square",
        location: "Lalitpur, Nepal",

        description:
            "Explore the stone-paved courtyards, Krishna Mandir, and the finest Newar metalwork traditions of Lalitpur.",

        image: "/img/pashupatinath.jpg",

        available: true,

        model: {
            glbUrl: "/models/patan.glb",

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
];