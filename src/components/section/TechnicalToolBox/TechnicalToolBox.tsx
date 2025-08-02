import "./TechnicalToolBox.css";
import React from "react";
import { useTranslations } from "next-intl";

interface TechnicalCategory {
  title: string;
  items: string[];
}

export default function TechnicalToolBox() {
  const t = useTranslations("TechnicalToolBox");

  const technicalData = t.raw("technicalData") as TechnicalCategory[];

  return (
    <section className="technicalToolBox">
      <div className="subheading">
        {t("heading")}
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
