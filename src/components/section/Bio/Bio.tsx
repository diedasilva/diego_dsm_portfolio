import React from "react";
import "./Bio.css";
import Image from "next/image";

export default function Bio() {
  return (
    <section className="bio" id="bio">
      <div className="subheading title-bio">
        Lifting, Learning, Coding: A Journey of Passion
      </div>
      <div className="bio-content">
        <p>
          I’ve always been driven by a deep curiosity and a desire to explore
          different worlds. Sports are an essential part of my balance: whether
          it’s on a football field, in the gym, or during an intense training
          session, I find discipline, resilience, and energy that motivate me
          every day. <br />
          Video games also play an important role in my life. Beyond
          entertainment, they have taught me patience, logic, and the ability to
          stay focused on a goal while enjoying the process of learning and
          improving. <br />
          Programming naturally became part of this journey. I see it as the
          same dynamic: taking on challenges, building step by step, finding
          solutions, and seeing the concrete results of my work. Every line of
          code feels like a piece of a bigger picture that gradually takes
          shape. <br />
          I chose this profession because development allows me to combine my
          passion for creating with my desire to make things simpler, more
          efficient, and more meaningful for others. <br /> Today, I put my
          expertise into projects that matter, with the ambition to keep
          learning, growing, and sharing what I love to do.
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
