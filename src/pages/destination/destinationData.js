export const destinationsData = [
    {
        id: "basantapur",
        name: "Basantapur",
        location: "Kathmandu, Nepal",

        description:
            "Enter the historic heart of Kathmandu and explore its courtyards, temples, and layered Newar architecture.",

        image: "/img/about.webp",

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
            ],
        },
    },

    {
        id: "patan",
        name: "Patan",
        location: "Lalitpur, Nepal",

        description:
            "Explore the intricate courtyards, temples, and metalwork traditions of Patan's historic center.",

        image: "/img/about.webp",

        available: false,

        model: {
            glbUrl: "/models/patan.glb",
            cameraPath: [],
            hotspots: [],
        },
    },

    {
        id: "kathmandu",
        name: "Kathmandu",
        location: "Kathmandu, Nepal",

        description:
            "A future exploration through another layer of Kathmandu's architectural and cultural landscape.",

        image: "/img/about.webp",

        available: false,

        model: {
            glbUrl: "/models/kathmandu.glb",
            cameraPath: [],
            hotspots: [],
        },
    },
];