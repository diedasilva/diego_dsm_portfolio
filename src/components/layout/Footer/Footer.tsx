import React from "react";
import "./Footer.css";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer>
      <div className="footer-content">
        <p className="signature-nav">
          {t("message")}
        </p>
        <p className="title-p copyright">
          {t("copyright")} <br />
          {t("rights")}
        </p>
      </div>
    </footer>
  );
}
