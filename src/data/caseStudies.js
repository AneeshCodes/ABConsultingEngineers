export const caseStudies = [
    {
        id: "retrofit-residential",
        title: "Retrofit of a Residential Building",
        client: "Private Residential",
        location: "New Zealand",
        category: "Structural Strengthening",
        heroImage: "https://images.unsplash.com/photo-1541888081696-6e1d51a6ee82?q=80&w=2670&auto=format&fit=crop",
        challenge: {
            title: "Stage 1: Assessment and Deficiencies",
            description: "AB Consulting Engineers conducted an independent evaluation of a partially constructed three-storey main house and joining single-storey granny flat. The previous structural design presented significant inadequacies that blocked the issuance of a required PS1 certificate.",
            points: [
                "Inadequacy in the roof ridge beam",
                "Insufficient capacity in the floor beams at the loft floor level",
                "Deficiencies in the design for posi-strut floor beams",
                "Inadequate capacity of lintels and insufficient lateral bracing"
            ]
        },
        solution: {
            title: "Stage 2: Engineered Strengthening",
            description: "Because the structure was nearly fully constructed, extensive modifications were impossible without massive cost and disruption. We developed a highly optimized strengthening scheme that minimized intervention while achieving compliance.",
            points: [
                "Negotiated loading restrictions on the loft floor with the Council to avoid tearing out undersized beams",
                "Designed custom steel portal frames that could be manually assembled inside existing walls",
                "Provided splices in columns at ceiling/floor levels allowing bolted assembly instead of heavy lifting",
                "Introduced additional posi-strut below the first floor to increase capacity"
            ]
        },
        results: [
            {
                metric: "Zero",
                label: "Heavy machinery required (manual assembly)"
            },
            {
                metric: "Minimal",
                label: "Disruption to existing envelope"
            },
            {
                metric: "Approved",
                label: "PS1 Certification granted"
            }
        ]
    }
];
