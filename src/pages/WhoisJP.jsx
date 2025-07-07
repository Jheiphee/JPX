import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function WhoisJP() {
  const [jpList, setJPList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8000/whoisjp')
      .then((res) => setJPList(res.data))
      .catch((err) => console.error('Error fetching JP data:', err));
  }, []);

  const handleImageClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!jpList.length)
    return <div className="text-white text-center mt-10">Loading Who is JP...</div>;

  return (
    <div className="relative min-h-screen font-sans text-white overflow-hidden">
      {/* ✅ BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-2xl brightness-50"
        style={{ backgroundImage: "url('/JP 4.jpg')" }}
      ></div>

      {/* ✅ MODAL (Updated — removed personal details) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center px-4">
          <div className="bg-[#1a0e04] border border-metallicgold rounded-xl p-6 md:p-10 w-full max-w-4xl shadow-lg flex flex-col md:flex-row gap-6 md:gap-10 items-center">
            <div className="text-white text-left flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-metallicgold mb-4">
                John Paul J. Almoroto
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                A dedicated and passionate creative professional with a strong foundation in both technology and design. Known for his initiative, versatility, and commitment to excellence in every project.
              </p>
              <button
                onClick={closeModal}
                className="mt-6 bg-metallicgold text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
              >
                Close
              </button>
            </div>

            <div className="flex-shrink-0">
              <img
                src="/JP 4.jpg"
                alt="JP Full"
                className="w-[280px] md:w-[350px] h-auto object-cover rounded-xl border border-yellow-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* ✅ CONTENT */}
      <div className="relative z-10 w-full px-4 md:px-10 lg:px-20 py-20">
        <motion.h1
          className="text-5xl md:text-8xl font-bold text-metallicgold text-center mt-20 mb-16 font-serif uppercase tracking-wide"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Who is JP?
        </motion.h1>

        {jpList.map((jp, index) => (
          <motion.div
            key={jp.id || index}
            className="mb-24"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Description + Image */}
            <motion.div
              className="flex flex-col md:flex-row items-start md:items-center mt-20 justify-between gap-10 px-6 md:px-28 py-9"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="md:w-1/2"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-white text-xl md:text-3xl leading-relaxed max-w-5xl">
                  {jp.description || 'N/A'}
                </p>
              </motion.div>

              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src="/JP 4.jpg"
                  alt="JP"
                  onClick={handleImageClick}
                  className="cursor-pointer h-full w-full max-w-md object-cover rounded-2xl border border-metallicgold shadow-xl hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>

            {/* Family Values */}
            <motion.section
              className="bg-[#1a0e04] p-8 rounded-2xl border border-metallicgold mt-20 shadow-md mb-10"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-3xl text-yellow-400 font-semibold mb-4">Family Values</h3>
              <div className="text-xl text-gray-300 leading-loose space-y-3">
                {jp.family_values?.length > 0 ? (
                  jp.family_values.map((item, i) => <p key={i}>{item}</p>)
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </div>
            </motion.section>

            {/* Hobbies & Personality */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 mt-20 gap-8 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.section
                className="bg-[#1a0e04] p-6 rounded-2xl border border-metallicgold shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-5xl text-yellow-400 font-semibold mb-4">Hobbies</h3>
                <div className="grid grid-cols-2 gap-2">
                  {jp.hobbies?.length > 0 ? (
                    jp.hobbies.map((item, i) => (
                      <motion.span
                        key={i}
                        className="bg-metallicgold text-black text-base md:text-lg px-4 py-2 rounded-full w-fit font-medium"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </div>
              </motion.section>

              <motion.section
                className="bg-[#1a0e04] p-6 rounded-2xl border border-metallicgold shadow-md"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-5xl text-yellow-400 font-semibold mb-4">Personality</h3>
                <div className="grid grid-cols-2 gap-2">
                  {jp.personality?.length > 0 ? (
                    jp.personality.map((item, i) => (
                      <motion.span
                        key={i}
                        className="bg-metallicgold text-black text-base md:text-lg px-4 py-2 rounded-full w-fit font-medium"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {item}
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </div>
              </motion.section>
            </motion.div>

            {/* Short Stories with Image */}
            <motion.section
              className="bg-[#1a0e04] p-6 rounded-xl border border-metallicgold shadow-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl text-yellow-400 font-semibold mb-4">Short Stories</h3>
              <div className="space-y-6">
                {jp.short_stories?.length > 0 ? (
                  jp.short_stories.map((item, i) => {
                    const [title, ...rest] = item.split(' - ');
                    const content = rest.join(' - ');
                    const storyImages = [
                      'GK10years.jpg',
                      'GKpresident.jpg',
                      'Bosswings.jpg',
                      'PaknersPares.jpg'
                    ];
                    const image = storyImages[i % storyImages.length];

                    return (
                      <motion.div
                        key={i}
                        className="flex flex-col md:flex-row items-start gap-6 bg-gray-900 border border-gray-600 rounded-xl p-4"
                        whileHover={{ scale: 1.01 }}
                      >
                        <img
                          src={`/${image}`}
                          alt={`Story ${i + 1}`}
                          className="w-full md:w-72 h-auto object-cover rounded-md border border-yellow-500 shadow-md"
                        />
                        <div>
                          <p className="text-yellow-400 font-bold text-xl md:text-2xl mb-2">{title}</p>
                          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">{content || 'N/A'}</p>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <span className="text-gray-400">N/A</span>
                )}
              </div>
            </motion.section>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
