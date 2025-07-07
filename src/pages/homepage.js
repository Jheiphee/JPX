import { useEffect, useState } from "react";
import { fetchHomepage } from "../api/homepage";
import { motion } from "framer-motion";

function Homepage() {
  const [homepage, setHomepage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHomepage()
      .then((data) => {
        if (data) {
          setHomepage(data);
          console.log("🏠 Homepage fetched:", data);
        } else {
          setError("No homepage data received.");
        }
      })
      .catch((err) => {
        console.error("❌ Error fetching homepage:", err);
        setError("Error fetching homepage data.");
      });
  }, []);

  if (error) {
    return <div className="text-red-400 p-6">🚨 {error}</div>;
  }

  if (!homepage) {
    return <div className="text-white p-6">Loading homepage data...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center font-sans text-white"
      style={{
        backgroundImage: 'url("/JPX-sample-background.jpg")',
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-coffee bg-opacity-90 min-h-screen">
        {/* ✅ Tagline + Intro Section */}
        <section className="flex flex-col items-center justify-center text-center px-6 md:px-28 min-h-[80vh] pt-80">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-8xl md:text-8xl font-serif text-metallicgold font-bold mb-4 uppercase tracking-wide drop-shadow-lg"
          >
            {homepage.tagline}
          </motion.h1>

          {homepage.intro && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-xl md:text-4xl text-gray-300 leading-relaxed drop-shadow max-w-5xl"
            >
              {homepage.intro}
            </motion.p>
          )}

          {/* ✅ Image Row: Code, Creativity, Commerce */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex flex-col md:flex-row gap-8 justify-center items-center mt-20"
          >
            {/* CODE */}
            <div className="flex flex-col items-center w-80 h-72">
              <img
                src="/Crossover%20of%20Code.jpg"
                alt="Code"
                className="w-full h-52 object-cover rounded-2xl shadow-2xl"
              />
              <p className="mt-2 text-white font-serif text-xl">Code</p>
            </div>

            {/* CREATIVITY */}
            <div className="flex flex-col items-center w-80 h-72">
              <img
                src="/Creativity.jpg"
                alt="Creativity"
                className="w-full h-52 object-cover rounded-2xl shadow-2xl"
              />
              <p className="mt-2 text-white font-serif text-xl">Creativity</p>
            </div>

            {/* COMMERCE */}
            <div className="flex flex-col items-center w-80 h-72">
              <img
                src="/Commerce.jpg"
                alt="Commerce"
                className="w-full h-52 object-cover rounded-2xl shadow-2xl"
              />
              <p className="mt-2 text-white font-serif text-xl">Commerce</p>
            </div>
          </motion.div>
        </section>

        {/* ✅ Intro One Section */}
        {homepage.intro_one && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-28 py-60"
          >
            <div className="md:w-1/2">
              <h2 className="text-8xl font-serif text-metallicgold mb-6 uppercase tracking-wide">
                JPX
              </h2>
              <p className="text-lg md:text-3xl text-gray-300 leading-relaxed whitespace-pre-line">
                {homepage.intro_one}
              </p>
              <p className="text-lg md:text-3xl text-gray-300 leading-relaxed mt-6 italic">
                Let’s build something purposeful — together.
              </p>
            </div>

            <div className="md:w-1/2 flex justify-center">
              <img
                src="/JP - Pic Intro.jpg"
                alt="JPX Intro"
                className="rounded-2xl shadow-2xl w-full max-w-md md:max-w-full object-cover"
              />
            </div>
          </motion.section>
        )}

        {/* ✅ Mission and Vision */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex flex-col gap-12 px-6 md:px-28 pb-20"
        >
          <div className="bg-[#2a221e] p-10 rounded-2xl border border-metallicgold shadow-md text-left w-full">
            <h2 className="text-5xl font-serif text-metallicgold mb-4 uppercase tracking-wide">
              Mission
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed">
              {homepage.mission}
            </p>
          </div>

          <div className="bg-[#2a221e] p-10 rounded-2xl border border-metallicgold shadow-md text-left w-full">
            <h2 className="text-5xl font-serif text-metallicgold mb-4 uppercase tracking-wide">
              Vision
            </h2>
            <p className="text-2xl text-gray-300 leading-relaxed">
              {homepage.vision}
            </p>
          </div>

          {homepage.backgroundpicture && (
            <img
              src={`/${homepage.backgroundpicture}`}
              alt="Homepage Banner"
              className="rounded-2xl shadow-xl w-full"
            />
          )}
        </motion.div>

        {/* ✅ Video Section */}
        {homepage.videointro && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-20 w-full flex justify-center px-6 md:px-30"
          >
            <video
              className="w-full max-w-4x1 rounded-xl shadow-2xl"
              controls
              poster={`/${homepage.backgroundpicture || ""}`}
            >
              <source src={`/${homepage.videointro}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
