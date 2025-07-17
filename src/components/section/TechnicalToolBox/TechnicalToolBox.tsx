import "./TechnicalToolBox.css";
import React from "react";

interface TechnicalCategory {
  title: string;
  items: string[];
}

const technicalData: TechnicalCategory[] = [
  {
    title: "Languages",
    items: ["Java", "JavaScript", "TypeScript", "SQL", "VBA"]
  },
  {
    title: "Frameworks & Libraries",
    items: ["Spring Framework (Spring Boot)", "AngularJS", "Angular CLI", "ReactJS", "React Native", "Next.js", "Express.js"]
  },
  {
    title: "Databases",
    items: ["SQL Server", "PostgreSQL", "MongoDB", "SQL Azure"]
  },
  {
    title: "Tools & Environments",
    items: ["Jira", "Confluence", "Figma", "Suite Adobe (notions)", "Notion", "Visual Studio Code", "Windows", "Linux", "Nodejs"]
  },
  {
    title: "Methodologies & Soft Skills",
    items: ["Agile / Scrum (Scrum Master 1)", "Analyse & conception logicielle", "Résolution de problèmes complexes", "Autonomie", "Persévérance", "Polyvalence"]
  }
];

export default function TechnicalToolBox() {
  return (
    <section className="technicalToolBox">
      <div className="subheading">
        Building, Shipping, Mastering: My Technical Toolbox
      </div>
      <div className="technical-content">
        {technicalData.map((category, index) => (
          <div key={index}>
            <h2 className="title-p color-orange">{category.title}</h2>
            <p>
              {category.items.map((item, itemIndex) => (
                <React.Fragment key={`${index}-${itemIndex}`}>
                  <span>
                    {item}
                  </span>
                  {itemIndex < category.items.length - 1 && " | "}
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
