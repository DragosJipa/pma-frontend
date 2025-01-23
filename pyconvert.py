import pandas as pd

# Re-defining the JSON data structure as a Python object for conversion
data = [
  {
    "type": "general",
    "questions": [
      {
        "id": "role",
        "question": "What is your role?",
        "type": "select",
        "options": [
          { "value": "product_manager", "label": "Product Manager" },
          { "value": "product_owner", "label": "Product Owner" },
          { "value": "cto", "label": "Chief Technology Officer (CTO)" },
          { "value": "ceo", "label": "Chief Executive Officer (CEO)" },
          { "value": "developer", "label": "Developer" },
          { "value": "designer", "label": "Designer" },
          { "value": "marketing_manager", "label": "Marketing Manager" },
          { "value": "sales_manager", "label": "Sales Manager" },
          { "value": "business_analyst", "label": "Business Analyst" },
          { "value": "project_manager", "label": "Project Manager" },
          { "value": "other", "label": "Other" }
        ]
      },
      {
        "id": "industry",
        "question": "What industry is your organization in?",
        "type": "select",
        "options": [
          { "value": "technology", "label": "Technology" },
          { "value": "finance", "label": "Finance" },
          { "value": "healthcare", "label": "Healthcare" },
          { "value": "retail", "label": "Retail" },
          { "value": "manufacturing", "label": "Manufacturing" },
          { "value": "education", "label": "Education" },
          { "value": "transportation", "label": "Transportation" },
          { "value": "energy", "label": "Energy" },
          { "value": "entertainment", "label": "Entertainment" },
          { "value": "government", "label": "Government" },
          { "value": "non_profit", "label": "Non-Profit" },
          { "value": "other", "label": "Other" }
        ]
      },
      {
        "id": "organizationType",
        "question": "What type of organization do you work for?",
        "type": "radio",
        "options": [
          { "value": "startup", "label": "Startup (early-stage company with a focus on innovation and rapid growth)" },
          { "value": "scaleup", "label": "Scaleup (growing company, typically post-product-market fit, focusing on scaling operations)" },
          { "value": "enterprise", "label": "Enterprise (large, established company with complex structures and processes)" },
          { "value": "small_medium_business", "label": "Small/Medium Business (SMB)" }
        ]
      }
    ]
  },
    {
      "type": "dimension",
      "dimension": "Strategy",
      "questions": [
        {
          "id": "strategyQ1",
          "question": "From your role and knowledge, how clearly defined do you perceive the product strategy to be within your organization?",
          "options": [
            { "value": "1", "label": "Not defined" },
            { "value": "2", "label": "Partially defined" },
            { "value": "3", "label": "Well defined but not widely communicated" },
            { "value": "4", "label": "Well defined and widely communicated" },
            { "value": "5", "label": "Fully integrated into the business strategy" }
          ]
        },
        {
          "id": "strategyQ2",
          "question": "How frequently is the product strategy reviewed and updated?",
          "options": [
            { "value": "1", "label": "I don't know what you're talking about" },
            { "value": "2", "label": "Annually" },
            { "value": "3", "label": "Semi-annually" },
            { "value": "4", "label": "Quarterly" },
            { "value": "5", "label": "It's a living organism, continously updated" }
          ]
        },
        {
          "id": "strategyQ3",
          "question": "Considering your visibility and knowledge, how does your organization measure the success of its product strategy?",
          "options": [
            { "value": "1", "label": "We do not measure success" },
            { "value": "2", "label": "Based on project completion" },
            { "value": "3", "label": "Based on output (e.g., features delivered)" },
            { "value": "4", "label": "Based on outcome (e.g., customer satisfaction, revenue growth)" },
            { "value": "5", "label": "Based on both output and outcome, with a clear feedback loop" }
          ]
        },
        {
          "id": "strategyQ4",
          "question": "To what extent do you think customer needs and market trends are considered in your product strategy?",
          "options": [
            { "value": "1", "label": "Not considered" },
            { "value": "2", "label": "Occasionally considered" },
            { "value": "3", "label": "Regularly considered but not systematically" },
            { "value": "4", "label": "Always considered and systematically integrated" },
            { "value": "5", "label": "Proactively anticipated and drive product strategy" }
          ]
        },
        {
          "id": "strategyQ5",
          "question": "Can you suggest if conflicting priorities across teams have arisen due to a lack of strategic alignment? How often do you see this occurring?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Occasionally" },
            { "value": "2", "label": "Frequently" },
            { "value": "1", "label": "Almost always" }
          ]
        },
        {
          "id": "strategyQ6",
          "question": "Have you encountered a situation where the product strategy was primarily driven by the highest paid person's opinion (HiPPO) rather than data or customer insights? How prevalent is this in your organization?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Occasionally" },
            { "value": "2", "label": "Frequently" },
            { "value": "1", "label": "Almost always" }
          ]
        }
      ]
    },
    {
      "type": "dimension",
      "dimension": "Processes",
      "questions": [
        {
          "id": "processesQ1",
          "question": "Which product development methodology does your team primarily use?",
          "options": [
            { "value": "1", "label": "Nothing like that / No specific methodology" },
            { "value": "1.0", "label": "Waterfall" },
            { "value": "2", "label": "Hybrid (Waterfall and Agile)" },
            { "value": "5", "label": "Agile (Scrum, Kanban, etc.)" },
            { "value": "5.0", "label": "Continuous delivery with DevOps" }
          ]
        },
        {
          "id": "processesQ2",
          "question": "How well-defined and followed do you think your product development processes are?",
          "options": [
            { "value": "1", "label": "Not defined" },
            { "value": "2", "label": "Defined but not consistently followed" },
            { "value": "3", "label": "Defined and partially followed" },
            { "value": "4", "label": "Defined and consistently followed" },
            { "value": "5", "label": "Continuously improved based on feedback" }
          ]
        },
        {
          "id": "processesQ3",
          "question": "How frequently does your team conduct retrospectives or reviews to improve processes?",
          "options": [
            { "value": "1", "label": "Never" },
            { "value": "1.2", "label": "Rarely" },
            { "value": "3", "label": "Sometimes" },
            { "value": "4", "label": "Regularly" },
            { "value": "5", "label": "Always after each sprint or iteration" }
          ]
        },
        {
          "id": "processesQ4",
          "question": "How would you evaluate the collaboration and communication between cross-functional teams (e.g., development, design, marketing, sales) in your organization?",
          "options": [
            { "value": "1", "label": "Poor and siloed" },
            { "value": "2", "label": "Occasional collaboration" },
            { "value": "3", "label": "Regular collaboration but could be improved" },
            { "value": "4", "label": "Good with regular communication" },
            { "value": "5", "label": "Excellent with seamless collaboration" }
          ]
        },
        {
          "id": "processesQ5",
          "question": "Is your team’s application of Agile principles consistent, or are there signs of inflexibility in the process? How do you perceive this?",
          "options": [
            { "value": "1", "label": "Highly inconsistent with significant signs of inflexibility" },
            { "value": "2", "label": "Mostly inconsistent with frequent signs of inflexibility" },
            { "value": "3", "label": "Somewhat consistent with occasional signs of inflexibility" },
            { "value": "4", "label": "Mostly consistent with rare signs of inflexibility" },
            { "value": "5", "label": "Completely consistent with no signs of inflexibility" }
          ]
        },        
        {
          "id": "processesQ6",
          "question": "Consider a scenario where your organization claims to be Agile, but in practice, the product development process is still largely waterfall with lengthy planning phases and infrequent releases. How often have you seen this happen?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Occasionally" },
            { "value": "2", "label": "Frequently" },
            { "value": "1", "label": "Almost always, it's everywhere" }
          ]
        }
      ]
    },
    {
      "type": "dimension",
      "dimension": "Technology",
      "questions": [
        {
          "id": "technologyQ1",
          "question": "From your perspective, what is the current state of your technology infrastructure?",
          "options": [
            { "value": "1", "label": "Legacy systems with minimal integration" },
            { "value": "2", "label": "Partially modernized with some integration" },
            { "value": "3", "label": "Mostly modernized with good integration" },
            { "value": "4", "label": "Fully modernized and integrated" },
            { "value": "5", "label": "Cutting-edge, flexible, and scalable" }
          ]
        },
        {
          "id": "technologyQ2",
          "question": "How would you rate the adoption and maturity of CI/CD (Continuous Integration/Continuous Deployment) practices in your organization, based on what you see and know?",
          "options": [
            { "value": "1", "label": "No CI/CD practices in place" },
            { "value": "2", "label": "Few teams are using CI/CD practices" },
            { "value": "3", "label": "CI/CD practices are implemented but not fully optimized" },
            { "value": "4", "label": "CI/CD practices are widely adopted and optimized across most teams" },
            { "value": "5", "label": "CI/CD practices are fully integrated into our culture, with continuous deployment and automation as standard" }
          ]
        },        
        {
          "id": "technologyQ3",
          "question": "How effectively does your technology stack support rapid prototyping and experimentation, in your experience?",
          "options": [
            { "value": "1", "label": "Not at all" },
            { "value": "2", "label": "Very little" },
            { "value": "3", "label": "Moderately" },
            { "value": "4", "label": "Effectively" },
            { "value": "5", "label": "Extremely effectively, with a focus on rapid iteration" }
          ]
        },
        {
          "id": "technologyQ4",
          "question": "From a Quality Assurance (QA) perspective, how would you rate the level of automation in your testing processes and its integration with your CI/CD pipeline?",
          "options": [
            { "value": "1", "label": "No automated testing; all testing is manual" },
            { "value": "2", "label": "Minimal automated testing; most testing is manual with basic automation scripts" },
            { "value": "3", "label": "Some automated testing; automation is inconsistent and not fully integrated with CI/CD" },
            { "value": "4", "label": "Significant automated testing; well-integrated with continuous integration but limited deployment automation" },
            { "value": "5", "label": "Extensive automated testing; fully integrated with continuous integration and continuous deployment" }
          ]
        },        
        {
          "id": "technologyQ5",
          "question": "How often do you find that outdated technologies hinder your ability to innovate or deliver products on time?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Occasionally" },
            { "value": "2", "label": "Frequently" },
            { "value": "1", "label": "Almost always" }
          ]
        },
        {
          "id": "technologyQ6",
          "question": "Have you encountered situations where technology decisions were made without considering the impact on scalability or future growth? How often does this happen?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Occasionally" },
            { "value": "2", "label": "Frequently" },
            { "value": "1", "label": "Almost always" }
          ]
        }
      ]
    },
    {
      "type": "dimension",
      "dimension": "Culture",
      "questions": [
        {
          "id": "cultureQ1",
          "question": "How aligned are leadership and teams on the product vision and goals, from your perspective?",
          "options": [
            { "value": "1", "label": "Not aligned at all" },
            { "value": "2", "label": "Minimal alignment" },
            { "value": "3", "label": "Some alignment" },
            { "value": "4", "label": "Mostly aligned" },
            { "value": "5", "label": "Fully aligned with shared ownership" }
          ]
        },
        {
          "id": "cultureQ2",
          "question": "How would you describe your organization's approach to innovation and experimentation, based on your experience?",
          "options": [
            { "value": "1", "label": "Risk-averse with no focus on innovation" },
            { "value": "2", "label": "Occasionally encourages innovation" },
            { "value": "3", "label": "Supports innovation but with limited resources" },
            { "value": "4", "label": "Actively encourages and resources innovation" },
            { "value": "5", "label": "Innovation is a core value, with dedicated teams and resources" }
          ]
        },
        {
          "id": "cultureQ3",
          "question": "From your viewpoint, how customer-centric is your organization in its product development efforts?",
          "options": [
            { "value": "1", "label": "Not customer-centric at all" },
            { "value": "2", "label": "Occasionally considers customer feedback" },
            { "value": "3", "label": "Regularly incorporates customer feedback" },
            { "value": "4", "label": "Proactively seeks customer feedback" },
            { "value": "5", "label": "Deeply customer-centric, with customers involved throughout the development process" }
          ]
        },
        {
          "id": "cultureQ4",
          "question": "How would you describe the culture of ownership in your organization? Are team members empowered to take action and supported in their decisions?",
          "options": [
            { "value": "1", "label": "No culture of ownership; decisions are top-down and team members are not empowered to take action" },
            { "value": "2", "label": "Limited ownership; some empowerment but decisions are still largely top-down with little support" },
            { "value": "3", "label": "Moderate ownership; team members are somewhat empowered to take action but support is inconsistent" },
            { "value": "4", "label": "Strong culture of ownership; team members are generally empowered to take action and are well supported" },
            { "value": "5", "label": "Very strong culture of ownership; team members are fully empowered to take action and are consistently supported in their decisions" }
          ]
        },        
        {
          "id": "cultureQ5",
          "question": "Do you feel team members are discouraged from experimenting due to fear of consequences for failure? How often do you observe this?",
          "options": [
            { "value": "5", "label": "Never" },
            { "value": "4", "label": "Rarely" },
            { "value": "3", "label": "Sometimes" },
            { "value": "2", "label": "Often" },
            { "value": "1", "label": "Always" }
          ]
        },
        {
          "id": "cultureQ6",
          "question": "Consider a scenario where innovation is stifled because team members are afraid to propose new ideas due to a culture of risk aversion. How familiar does this sound in your organization?",
          "options": [
            { "value": "5", "label": "Not at all" },
            { "value": "4", "label": "Slightly" },
            { "value": "3", "label": "Moderately" },
            { "value": "2", "label": "Very" },
            { "value": "1", "label": "Exactly like this" }
          ]
        }
      ]
    },
    {
      "type": "open-ended",
      "dimension": "Open-Ended",
      "questions": [
        {
          "id": "openEndedQ1",
          "question": "Considering your role, what are the biggest challenges your organization currently faces in product development?"
        },
        {
          "id": "openEndedQ2",
          "question": "What improvements would you like to see in your product development process over the next 12 months?"
        },
        {
          "id": "openEndedQ3",
          "question": "Can you provide an example of a recent product development success and what contributed to that success?"
        },
        {
          "id": "openEndedQ4",
          "question": "How do you currently gather and use customer feedback in your product development process? What tools do you use for user analytics or feedback?"
        }
      ]
    }
  ]


# Flatten the JSON data for Excel export
rows = []
for item in data:
    q_type = item["type"]
    dimension = item.get("dimension", "")
    for question in item["questions"]:
        q_id = question["id"]
        q_text = question["question"]
        q_qtype = question.get("type", "select")
        
        # Combine option values and labels into a single string
        if "options" in question:
            option_values = [option["value"] for option in question["options"]]
            option_labels = [option["label"] for option in question["options"]]
            option_value_str = ", ".join(option_values)
            option_label_str = ", ".join(option_labels)
        else:
            option_value_str = ""
            option_label_str = ""

        # Append question details with options in a single row
        rows.append({
            "Type": q_type,
            "Dimension": dimension,
            "Question ID": q_id,
            "Question Text": q_text,
            "Question Type": q_qtype,
            "Option Values": option_value_str,
            "Option Labels": option_label_str,
        })

# Convert to DataFrame
df = pd.DataFrame(rows)

# Save to Excel
file_path = "output_file.xlsx"
df.to_excel(file_path, index=False)

file_path
