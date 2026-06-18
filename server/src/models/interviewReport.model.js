// const mongoose = require("mongoose");

// const technicalQuestionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "Technical question is required"],
//     },

//     intention: {
//       type: String,
//       required: [true, "Intention is required"],
//     },

//     answer: {
//       type: String,
//       required: [true, "Answer is required"],
//     },
//   },
//   { _id: false },
// );

// const behavioralQuestionSchema = new mongoose.Schema(
//   {
//     question: {
//       type: String,
//       required: [true, "Behavioral question is required"],
//     },

//     intention: {
//       type: String,
//       required: [true, "Intention is required"],
//     },

//     answer: {
//       type: String,
//       required: [true, "Answer is required"],
//     },
//   },
//   { _id: false },
// );

// const skillGapSchema = new mongoose.Schema(
//   {
//     skill: {
//       type: String,
//       required: [true, "Skill gap is required"],
//     },

//     severity: {
//       type: String,
//       enum: ["low", "medium", "high"],
//       required: [true, "Severity is required"],
//     },
//   },
//   { _id: false },
// );

// const preparationPlanSchema = new mongoose.Schema(
//   {
//     day: {
//       type: Number,
//       required: [true, "Day is required"],
//     },
//     focusArea: {
//       type: String,
//       required: [true, "Focus area is required"],
//     },
//     tasks: [
//       {
//         type: String,
//         required: [true, "Task is required"],
//       },
//     ],
//   },
//   { _id: false },
// );




// const interviewReportSchema = new mongoose.Schema(
//   {
//     resume: {
//       type: String,
//       required: [true, "Resume is required"],
//     },

//     jobDescription: {
//       type: String,
//       required: [true, "Job description is required"],
//     },

//     selfDescription: {
//       type: String,
//       required: [true, "Self-description is required"],
//     },

//     matchScore: {
//       type: Number,
//       min: 0,
//       max: 100,
//     },

//     technicalQuestions: [technicalQuestionSchema],
//     behavioralQuestions: [behavioralQuestionSchema],
//     skillGaps: [skillGapSchema],
//     preparationPlan: [preparationPlanSchema],
//     candidate: candidateSchema,
//     aiFeedback: feedbackSchema,

//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "users",
//     },
//     title: {
//       type: String,
//       required: [true, "Job title is required"],
//     },
//   },
//   { timestamps: true },
// );

// const interviewReportModel = mongoose.model(
//   "interviewReport",
//   interviewReportSchema,
// );

// module.exports = interviewReportModel;

















const mongoose = require("mongoose");

const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required"],
    },

    intention: {
      type: String,
      required: [true, "Intention is required"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { _id: false },
);

const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill gap is required"],
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      required: [true, "Severity is required"],
    },
  },
  { _id: false },
);

const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required"],
    },
    focusArea: {
      type: String,
      required: [true, "Focus area is required"],
    },
    tasks: [
      {
        type: String,
        required: [true, "Task is required"],
      },
    ],
  },
  { _id: false },
);


const educationSchema = new mongoose.Schema(
  {
    institute: {
      type: String,
      required: true,
    },

    degree: {
      type: String,
      required: true,
    },

    year: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    period: {
      type: String,
    },

    technologies: [String],
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name: String,

    technologies: [String],

    description: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    name: String,

    issuer: String,

    issuedAt: String,
  },
  { _id: false }
);

const candidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    summary: String,

    skills: {
      type: [String],
      default: [],
    },

    education: {
      type: [educationSchema],
      default: [],
    },

    experience: {
      type: [experienceSchema],
      default: [],
    },

    projects: {
      type: [projectSchema],
      default: [],
    },

    certifications: {
      type: [certificationSchema],
      default: [],
    },
  },
  { _id: false }
);

const feedbackSchema = new mongoose.Schema(
  {
    projectImprovements: {
      type: [String],
      default: [],
    },

    resumeImprovements: {
      type: [String],
      default: [],
    },

    finalAdvice: {
      type: String,
      required: [true, "Final advice is required"],
    },
  },
  { _id: false }
);



const interviewReportSchema = new mongoose.Schema(
  {
    resume: {
      type: String,
      required: [true, "Resume is required"],
    },

    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
    },

    selfDescription: {
      type: String,
      required: [true, "Self-description is required"],
    },

    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],

    behavioralQuestions: {
      type: [behavioralQuestionSchema],
      default: [],
    },

    skillGaps: {
      type: [skillGapSchema],
      default: [],
    },

    preparationPlan: {
      type: [preparationPlanSchema],
      default: [],
    },

    candidate: candidateSchema,

    aiFeedback: feedbackSchema,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    title: {
      type: String,
      required: [true, "Job title is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "interviewReport",
  interviewReportSchema
);