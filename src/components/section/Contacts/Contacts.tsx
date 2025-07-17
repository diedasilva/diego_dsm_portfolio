import React from "react";
import "./Contacts.css";
import Link from "next/link";

export default function Contacts() {
  return (
    <section className="contacts" id="contacts">
      <div className="subheading title-contacts">
        Connecting, Collaborating, Creating: Let’s Build Together !
      </div>
      <div className="contact-content">
        <Link
          href="https://www.linkedin.com/in/diegodasilvamarques/"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path
                strokeDasharray="80"
                strokeDashoffset="80"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.6s"
                  values="80;0"
                />
              </path>
              <path
                fill="currentColor"
                stroke="none"
                d="M5.5 10.07h2.77v8.37H5.5zM6.88 8.56c.93 0 1.68-.75 1.68-1.68 0-.93-.75-1.69-1.68-1.69-.93 0-1.69.76-1.69 1.69 0 .93.76 1.68 1.69 1.68zM10.93 10.07v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11z"
              >
                <animate
                  attributeName="opacity"
                  values="0;1"
                  dur="0.4s"
                  begin="0.6s"
                  fill="freeze"
                />
              </path>
            </g>
          </svg>
        </Link>
        <Link href="https://github.com/diedasilva" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path
                strokeDasharray="32"
                strokeDashoffset="32"
                d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.7s"
                  values="32;0"
                />
              </path>
              <path
                strokeDasharray="10"
                strokeDashoffset="10"
                d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.8s"
                  dur="0.2s"
                  values="10;0"
                />
              </path>
            </g>
          </svg>
        </Link>
        <Link href="mailto:dasilva.diego@outlook.com">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path
                strokeDasharray="64"
                strokeDashoffset="64"
                d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.6s"
                  values="64;0"
                />
              </path>
              <path
                strokeDasharray="24"
                strokeDashoffset="24"
                d="M3 6.5l9 5.5l9 -5.5"
              >
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.6s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
            </g>
          </svg>
        </Link>
      </div>
      <div className="contact-footer">
        <Link href="/Diego.DSM_DevFullStack_Java_Angular_React_6.pdf" className="title-p" target="_blank">You can find my resume here !</Link>
      </div>
    </section>
  );
}
