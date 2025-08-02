import React from "react";
import "./Bio.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Bio() {
  const t = useTranslations("Bio");

  const descriptionLines = t.raw("description") as string[];

  return (
    <section className="bio" id="bio">
      <div className="subheading title-bio">
        {t("heading")}
      </div>
      <div className="bio-content">
        <p>
          {descriptionLines.map((paragraph, index) => (
            <React.Fragment key={index}>
              {paragraph}
              {index < descriptionLines.length - 1 && <br />}
            </React.Fragment>
          ))}
        </p>
        <div className="card">
          <Image
            alt="Photo de Diego Da Silva Marques"
            src="/img/Image2_modif.png"
            width={380}
            height={350}
            className="bio-image"
          />
        </div>
      </div>
    </section>
  );
}
