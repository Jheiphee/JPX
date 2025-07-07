import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

export default function ViewMyWork() {
  const [workList, setWorkList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/view-my-work")
      .then((res) => setWorkList(res.data))
      .catch((err) => console.error("Error fetching work data:", err));
  }, []);

  const workExperiences = workList
    .filter((item) => item.work_experiences)
    .map((item) => item.work_experiences)
    .flat();

  const skills = Array.from(
    new Set(workList.map((item) => item.skills).filter(Boolean).flat())
  );

  const projects = workList
    .map((item) => item.projects)
    .filter(Boolean)
    .flat();

  const techStack = Array.from(
    new Set(workList.map((item) => item.tech_stack).filter(Boolean).flat())
  );

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="relative min-h-screen font-sans text-white bg-transparent z-10">
      {/* ✅ BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10 flex justify-center items-start overflow-hidden">
        <img
          src="/excelsior-family.jpg"
          alt="Background"
          className="min-w-full min-h-full object-cover blur-sm brightness-[0.35]"
        />
      </div>

      {/* ✅ CONTENT */}
      <Navbar />

      <motion.div
        className="px-6 md:px-28 mt-24 pb-16 space-y-12 relative z-10"
        initial="hidden"
        animate="visible"
        variants={sectionVariant}
      >
        {/* ✅ Work Experiences */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 className="text-2xl md:text-5xl mt-20 font-bold text-yellow-400 mb-6">
            Work Experiences
          </motion.h2>
          <ul className="space-y-6 text-lg md:text-xl">
            {workExperiences.map((exp, index) => {
              const cleanedExp = exp.replace(/\s{2,}/g, " ").trim();
              const regex = /^(.*?)\s*–\s*(.*?)\s*Role:\s*(.*?)\s*Value Gained:\s*(.*?)\s*Impact:\s*(.*)$/i;
              const match = cleanedExp.match(regex);

              if (match) {
                const [, company, position, role, valueGained, impact] = match;
                return (
                  <motion.li
                    key={index}
                    className="bg-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <p className="font-bold text-white">{company} – {position}</p>
                    <p><span className="text-yellow-400 font-semibold">Role:</span> {role.trim()}</p>
                    <p><span className="text-yellow-400 font-semibold">Value Gained:</span> {valueGained.trim()}</p>
                    <p><span className="text-yellow-400 font-semibold">Impact:</span> {impact.trim()}</p>
                  </motion.li>
                );
              } else {
                return (
                  <li key={index} className="text-gray-400 italic">
                    {exp || "Work experience format unrecognized."}
                  </li>
                );
              }
            })}
          </ul>
        </motion.section>

        {/* ✅ Skills */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">
            Skills
          </h2>
          <ul className="list-disc list-inside space-y-2 text-[20px] text-gray-200">
            {skills.map((skill, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* ✅ Projects */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">
            Projects
          </h2>
          <ul className="list-disc list-inside space-y-2 text-[20px] text-gray-200">
            {projects.map((proj, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {proj}
              </motion.li>
            ))}
          </ul>
        </motion.section>

        {/* ✅ Tech Stack */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-6">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {techStack.map((tool, index) => (
              <motion.span
                key={index}
                className="border border-yellow-500 text-yellow-300 px-3 py-1 rounded-full text-sm md:text-base"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.section>

        {/* ✅ Sample Videos */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-5xl font-bold mt-40 text-yellow-400 mb-6">
            Sample Videos
          </h2>
          <div className="w-full max-w-4xl mx-auto space-y-8">
            <video controls className="w-full rounded-lg shadow-lg border border-yellow-500">
              <source src="/JPXsamplevideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <video controls className="w-full rounded-lg shadow-lg border border-yellow-500">
              <source src="/badmintonmontage.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.section>

        {/* ✅ T-shirt Designs */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-5xl mt-60 font-bold text-yellow-400 mb-10">
            T-shirt Designs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.img
                key={num}
                src={`/Tshirt ${num}.jpg`}
                alt={`Tshirt ${num}`}
                className="rounded-lg shadow-md border border-yellow-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: num * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.section>

        {/* ✅ Animated Pictures */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-5xl mt-60 font-bold text-yellow-400 mb-6">
            Animated Pictures
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((num) => (
              <motion.img
                key={num}
                src={`/Animated ${num}.jpg`}
                alt={`Animated ${num}`}
                className="rounded-lg shadow-md border border-yellow-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: num * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.section>

        {/* ✅ Movie Posters */}
        <motion.section className="p-2" variants={sectionVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-2xl md:text-5xl mt-60 font-bold text-yellow-400 mb-6">
            Movie Poster
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1].map((num) => (
              <motion.img
                key={num}
                src={`/Movieposter ${num}.jpg`}
                alt={`Movie Poster ${num}`}
                className="rounded-lg shadow-md border border-yellow-500"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: num * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
