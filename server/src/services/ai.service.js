const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "A score between 0 and 100 indicating how well the candidate's profile matches the job describe",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of interviewer behind asking this question"),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover, what approach to take etc.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),
  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances",
          ),
      }),
    )
    .describe(
      "List of skill gaps in the candidate's profile along with their severity",
    ),
  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in the preparation plan, starting from 1"),
        focusArea: z
          .string()
          .describe(
            "The main focus area of this day in the preparation plan, e.g. data structures, system design, mock interviews etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.",
          ),
      }),
    )
    .describe(
      "A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively",
    ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),

  candidate: z
    .object({
      name: z
        .string()
        .describe("Candidate's full name extracted from the resume"),

      role: z
        .string()
        .describe(
          "Candidate's current or target job title, e.g. Backend Developer, Full Stack Developer",
        ),
      summary: z
        .string()
        .describe(
          "Professional summary generated from resume content in concise recruiter-friendly language",
        ),

      skills: z
        .array(z.string())
        .describe(
          "Technical skills extracted from resume. Include only relevant technologies, languages, frameworks and tools",
        ),

      education: z
        .array(
          z.object({
            institute: z
              .string()
              .describe("Educational institute or university name"),

            degree: z.string().describe("Degree or qualification completed"),

            year: z.string().describe("Year range or graduation year"),
          }),
        )
        .describe("Education history of the candidate"),

      experience: z
        .array(
          z.object({
            title: z.string().describe("Job title held by the candidate"),

            company: z.string().describe("Company or organization name"),

            period: z
              .string()
              .describe(
                "Employment duration in readable format such as 2025–Present",
              ),

            technologies: z
              .array(z.string())
              .describe("Main technologies used during this experience"),
          }),
        )
        .describe("Professional experience extracted from resume"),

      projects: z
        .array(
          z.object({
            name: z.string().describe("Project name"),

            technologies: z
              .array(z.string())
              .describe("Technology stack used in project"),

            description: z
              .string()
              .describe(
                "Short project explanation focusing on architecture, impact and implementation",
              ),
          }),
        )
        .describe("Important projects that strengthen candidate profile"),

      certifications: z
        .array(
          z.object({
            name: z.string().describe("Certification title"),

            issuer: z.string().describe("Organization issuing certification"),

            issuedAt: z
              .string()
              .describe("Certification issue date if available"),
          }),
        )
        .describe("Professional certifications extracted from resume"),
    })
    .describe("Complete candidate profile generated by scanning the resume"),
  aiFeedback: z
    .object({
      projectImprovements: z
        .array(z.string())
        .describe(
          "Specific improvements candidate should make in projects before adding or presenting them on resume",
        ),

      resumeImprovements: z
        .array(z.string())
        .describe(
          "Resume recommendations including ATS friendliness, formatting, measurable achievements and recruiter expectations",
        ),

      finalAdvice: z
        .string()
        .describe(
          "Final AI recommendation summarizing candidate strengths, weaknesses and next best actions before interviews",
        ),
    })
    .describe(
      "AI generated feedback and actionable career guidance for the candidate",
    ),
});

const SYSTEM_PROMPT = `You are a senior technical recruiter and career coach with 15+ years of experience across software engineering roles.

Your job is to analyze a candidate's resume and self-description against a job description, then produce a structured interview prep report.

Guidelines:
- Be specific — avoid generic advice; tie every question and task to the actual JD
- Severity of skill gaps: high = role-blocking, medium = noticeable weakness, low = nice-to-have
- Preparation plan should be 7 days with concrete, actionable daily tasks
- Questions should reflect what a real interviewer at this level would actually ask`;

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `Analyze this candidate and produce their interview preparation report.

<resume>
${resume}
</resume>

<self_description>
${selfDescription}
</self_description>

<job_description>
${jobDescription}
</job_description>

  Match Score: Provide a score between 0 and 100 indicating how well the candidate's profile matches the job description. A higher score indicates a better match. This score should be calculated based on the analysis of the candidate's resume, self-description, and the job description provided.
  Technical Questions: Generate a list of technical questions that can be asked during the interview, along with their intention and suggested answers. The intention should explain why the interviewer might ask this question, and the answer should provide guidance on how to answer this question in the interview, including what points to cover and what approach to use.
  Behavioral Questions: Generate a list of behavioral questions that can be asked during the interview, along with their intention and suggested answers. Similar to technical questions, the intention should explain why the interviewer might ask this question, and the answer should provide guidance on how to answer this question in the interview.
  Skill Gaps: Identify any skill gaps that the candidate needs to work on, along with their severity (low, medium, high). This should be based on the analysis of the candidate's resume and self-description in relation to the job description.
  Preparation Plan: Provide a day-wise preparation plan for the candidate to follow, including the focus area and tasks for each day. This plan should be designed to help the candidate improve their chances of success in the interview.
 Generate concise, role-specific AI feedback that can be helpfull for creer: projectImprovements, resumeImprovements, finalAdvice, aiEraCompetitiveness, and growthAcceleration; prioritize high-impact, actionable recommendations.
 Generate readiness percentages.

* 0–100 only
* evaluate confidence per skill
* avoid giving everyone high scores

Consider:

* technical depth
* experience
* projects
* resume evidence

Example areas: Node.js MongoDB React Testing Cloud System Design Generate: 5–10 readiness metrics

Focus on the gaps between the candidate's current profile and the job's real requirements.
For questions, prioritize what a senior interviewer would actually ask — not textbook questions.
Assume the interview is in 7 days when building the preparation plan`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });

  return JSON.parse(response.text);
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "7mm",
      bottom: "7mm",
      left: "5mm",
      right: "5mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}

async function generateResumePdf({ resume, jobDescription, selfDescription }) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of the resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtml(jsonContent.html);

  return pdfBuffer;
}

module.exports = { generateInterviewReport, generateResumePdf };
