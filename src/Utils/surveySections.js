
const surveySectionsArray = [
    {
        title: "Employee Happiness Survey (Periodic)",
        fields: [
            {
                label: "Job Satisfaction",
                name: "jobSatisfaction",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Work Life Balance",
                name: "workLifeBalance",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Work Environment",
                name: "workEnvironment",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Recognition",
                name: "recognition",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Trust",
        fields: [
            {
                label: "I am confident in the leadership's ability to make good decisions for the future of the company.",
                name: "leadershipConfidence",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have a clear understanding of what is expected of me in my role.",
                name: "roleUnderstanding",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel management keeps me informed about important company news and decisions.",
                name: "managementCommunication",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I believe people are treated fairly at this company, regardless of their background or position.",
                name: "fairTreatment",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Respect",
        fields: [
            {
                label: "I feel valued as an employee at this company.",
                name: "valuedEmployee",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am given the opportunity to use my skills and abilities to their full potential.",
                name: "useSkills",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have the resources and support I need to do my job effectively.",
                name: "resourcesSupport",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am encouraged to share my ideas and opinions at work.",
                name: "shareIdeas",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Fairness",
        fields: [
            {
                label: "I believe promotions and opportunities for advancement are based on merit.",
                name: "meritBasedPromotions",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel confident that I will be rewarded for my hard work and performance.",
                name: "rewardedForPerformance",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am treated with respect by my colleagues and manager.",
                name: "treatedWithRespect",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I have a fair workload and am not expected to work unreasonable hours.",
                name: "fairWorkload",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Camaraderie",
        fields: [
            {
                label: "I have a good working relationship with my colleagues.",
                name: "goodWorkingRelationship",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I feel like I am part of a team that supports each other.",
                name: "teamSupport",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I enjoy the people I work with.",
                name: "enjoyColleagues",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "There is a sense of camaraderie and teamwork at this company.",
                name: "senseOfCamaraderie",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Pride",
        fields: [
            {
                label: "I am proud of the work that I do at this company.",
                name: "proudOfWork",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I take pride in the quality of the products or services we offer.",
                name: "prideInQuality",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I believe the company has a positive impact on the community.",
                name: "positiveImpact",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            },
            {
                label: "I am proud to tell others that I work for this company.",
                name: "proudToTell",
                options: ["Yes", "No"],
                colors: ["#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Work Load",
        fields: [
            {
                label: "Workload Distribution",
                name: "workloadDistribution",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Task Clarity",
                name: "taskClarity",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Stress Levels",
                name: "stressLevels",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Overtime",
                name: "overtime",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Resource Availibility",
                name: "resourceAvailibility",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Time Management",
                name: "timeManagement",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            }
        ]
    },
    {
        title: "Team Relationship",
        fields: [
            {
                label: "Team Relationship",
                name: "teamRelationship",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
        ]
    },
    {
        title: "Management Support",
        fields: [
            {
                label: "Management Support",
                name: "managementSupport",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
        ]
    },
    {
        title: "Career Development",
        fields: [
            {
                label: "Oppurtunities For Growth",
                name: "growthOpputinities",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Training And Development",
                name: "trainingAndDevelopment",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Compensation And Benefits",
                name: "compensationAndBenefits",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
        ]
    },
    {
        title: "Salary Satisfaction",
        fields: [
            {
                label: "Benefits Package",
                name: "benefitsPackage",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Communication",
                name: "communication",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Communication Effectiveness",
                name: "communicationEffectiveness",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Feedback Mechanism",
                name: "feedbackMechanism",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Company Culture",
                name: "companyCulture",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
        ]
    },
    {
        title: "Job Stability",
        fields: [
            {
                label: "Future Prospects",
                name: "futureProspects",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Decision Making",
                name: "decisionMaking",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Responsibility",
                name: "responsibility",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            }
        ]
    },

    {
        title: "Physical And Mental Health",
        fields: [
            {
                label: "Wellness Programs",
                name: "wellnessPrograms",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
            {
                label: "Mental Health Support",
                name: "mentalHealthSupport",
                options: ["Very Unhappy", "Unhappy", "Satisfactory", "Happy", "Very Happy"],
                values: [-2, -1, 0, 1, 2],
                colors: ["#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6", "#DEECF6"]
            },
        ]
    },
];

module.exports = surveySectionsArray
