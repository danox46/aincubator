import { ServiceHandler } from "../service-handler";

export class Employee {
  readonly role: Role;
  constructor(role: string) {
    this.role = roleInfo[role];
  }

  #plan = async (instruction: string, role: string) => {
    const content =
      "Pretend you are a " +
      role +
      " planing a startup, We need a list of steps to finish " +
      instruction +
      " only return a js array with the steps we would need to take to finish the document";

    const steps: any = await ServiceHandler.post("/gpt/chat", "dron", {
      messages: [{ role: "user", content }],
    });

    const message = steps.choices[0].message.content.replace(/\\n/g, "\n");

    return JSON.parse(message) as Array<string>;
  };

  do = async (staff: Record<string, Employee>, projectPrameters: any) => {
    const premise =
      "Pretend you are planing a stratup with the main idea of: " +
      projectPrameters.mainIdea +
      " you have support from the other founders, here is a list of the roles: " +
      Object.keys(staff).map((e) => staff[e].role.name);
    return await Promise.all(
      this.role.deliverables.map(async (deliverable): Promise<any> => {
        const steps = await this.#plan(deliverable, this.role.name);

        let record = "";

        for (const step of steps) {
          const content =
            premise +
            " your role is " +
            this.role.name +
            " which means you " +
            this.role.description +
            " Right now, we're working on: " +
            deliverable +
            " In this step we need you to: " +
            step +
            " Only send the requested content in Markdown format, it will be appended to a file.";
          const initialTry: any = await ServiceHandler.post(
            "/gpt/chat",
            "dron",
            {
              messages: [{ role: "user", content }],
            }
          );

          let reviewedDoc = initialTry.choices[0].message.content;

          for (const key in staff) {
            if (Object.prototype.hasOwnProperty.call(staff, key)) {
              const member = staff[key];
              const feedbackContent =
                premise +
                "You are the " +
                member.role.name +
                "which means you " +
                this.role.description +
                " the " +
                this.role.name +
                " of the company is working on " +
                step +
                " he needs your feedback, here is his current attempt: " +
                reviewedDoc;

              const feedback: any = await ServiceHandler.post(
                "/gpt/chat",
                "dron",
                {
                  messages: [{ role: "user", content: feedbackContent }],
                }
              );

              const currentReview: any = await ServiceHandler.post(
                "/gpt/chat",
                "dron",
                {
                  messages: [
                    { role: "assistant", content: reviewedDoc },
                    {
                      role: "user",
                      content:
                        "here is the feedback from " +
                        member.role.name +
                        " " +
                        feedback.choices[0].message.content +
                        "Please address the recommendations on the current version and Only send the new version in markdown format, it will be appended to a file.",
                    },
                  ],
                }
              );

              reviewedDoc = currentReview.choices[0].message.content;
            }
          }

          record = record + reviewedDoc;
        }

        return record;
      })
    );
  };
}

type Role = {
  name: string;
  description: string;
  deliverables: Array<string>;
};

type RoleInfo = {
  [key: string]: Role;
};

const roleInfo: RoleInfo = {
  ceo: {
    name: "Chief Executive Officer",
    description:
      "responsible for providing overall leadership, vision, and direction for the company. They make strategic decisions, manage resources, and represent the company to stakeholders such as investors, customers, and partners",
    deliverables: [
      "A comprehensive business plan document that includes the company's mission, vision, goals, target market analysis, revenue model, and growth strategy.",
      //"A roadmap document outlining the startup's development stages, key milestones, and associated timelines.",
      //"Documentation of the recommended legal structure for the company, report of compliance with relevant regulations.",
      //"A document describing how to secure initial funding or investment for the startup's launch and growth, such as investor agreements or funding contracts.",
      //"Documentation of identified and recruited key team members and advisors, including resumes, contracts, or agreements.",
    ],
  },
  cto: {
    name: "Chief Technology Officer",
    description:
      "in charge of the company's technology strategy and development. They oversee the technological aspects of the product or service, lead the engineering team, and ensure that the technology infrastructure supports the company's goals",
    deliverables: [
      //   "Documentation of the defined technology stack and architecture for the product or service.",
      //   "A detailed development roadmap document of the prototype or minimum viable product (MVP) showcasing the concept.",
      //   "A detailed development roadmap document outlining iterations, features, and associated timelines.",
      //   "Established processes documentation for software development, testing, and deployment.",
      //   "Documentation ensuring that the technology infrastructure supports scalability, security, and performance.",
    ],
  },
  coo: {
    name: "Chief Operating Officer",
    description:
      "responsible for the day-to-day operations of the company. They oversee functions such as finance, human resources, marketing, and sales, ensuring that processes run smoothly and efficiently",
    deliverables: [
      //   "Documented operational processes and procedures for finance, human resources, marketing, and sales functions.",
      //   "A budget and financial plan document for the startup, including revenue projections, expense breakdowns, and cash flow management strategies.",
      //   "Documentation of established relationships with suppliers, vendors, and partners, including agreements or contracts.",
      //   "Systems documentation for inventory management, logistics operations, and customer support procedures.",
      //   "Documentation ensuring compliance with regulations and industry standards relevant to the startup's operations.",
    ],
  },
  cfo: {
    name: "Chief Financial Officer",
    description:
      "responsible for managing the company's finances and financial risks. They oversee financial planning, budgeting, fundraising, and financial reporting, ensuring that the company remains financially healthy and compliant with regulations",
    deliverables: [
      //   "Templates of the financial statements, including income statements, balance sheets, and cash flow statements, accurately reflecting the financial status of the startup.",
      //   "Developed financial models and forecasts supporting decision-making processes, including projections for revenue, expenses, and cash flow.",
      //   "Documentation of secured funding from sources such as venture capital, angel investors, or loans, including agreements or contracts.",
      //   "Established accounting systems and controls documentation to track expenses, revenue, and investments effectively.",
      //   "Documentation of how to manage taxation, audits, and compliance with financial reporting requirements, ensuring adherence to relevant regulations.",
    ],
  },
  cmo: {
    name: "Chief Marketing Officer",
    description:
      "responsible for developing and executing the company's marketing strategy. They oversee marketing campaigns, branding, customer acquisition, and market research, working to increase awareness and drive sales",
    deliverables: [
      //   "Documentation of market research findings identifying target customers, competitors, and relevant trends.",
      //   "A developed marketing strategy document outlining messaging that resonates with the target audience.",
      //   "Created marketing materials and campaigns across various channels, including digital, social media, and traditional advertising, with documentation.",
      //   "Implemented analytics and tracking systems documentation to measure the effectiveness of marketing efforts accurately.",
      //   "Document planing how to build relationships with media, influencers, and partners, enhancing the startup's reach.",
    ],
  },
  cso: {
    name: "Chief Strategy Officer",
    description:
      "responsible for developing and executing the company's overall strategy for growth and expansion. They analyze market trends, identify opportunities for innovation, and develop long-term strategic plans to achieve the company's objectives",
    deliverables: [
      //   "Documentation of the analysis of market trends, industry dynamics, and the competitive landscape.",
      //   "Identification of opportunities for innovation, differentiation, and growth, documented for reference.",
      //   "A developed strategic plan document outlining key initiatives, priorities, and goals for the startup.",
      //   "Defined metrics and key performance indicators (KPIs) to track progress and performance against strategic objectives, documented for monitoring.",
      //   "Communication of the strategy to internal stakeholders, investors, and partners, including presentations or reports.",
    ],
  },
  cpo: {
    name: "Chief Product Officer",
    description:
      "responsible for the development and management of the company's products or services. They oversee product design, development, and delivery, working closely with the engineering and design teams to ensure that the product meets the needs of customers and aligns with the company's vision",
    deliverables: [
      //   "A defined product roadmap and feature set document based on market research and customer feedback.",
      //   "Documentation of leadership in the design and development of the product or service, ensuring usability, functionality, and quality standards are met.",
      //   "Documentation of user testing processes and iterations on the product based on feedback and data analysis.",
      //   "Coordination documentation with engineering, design, and other teams to deliver updates and releases on schedule.",
      //   "Developed documentation, training materials, and support resources for users and customers.",
    ],
  },
};
