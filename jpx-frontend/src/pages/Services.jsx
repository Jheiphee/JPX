import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Services() {
  const [groupedServices, setGroupedServices] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/services-offered")
      .then((res) => {
        const data = res.data;
        const grouped = data.reduce((acc, service) => {
          const category = service.category || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(service);
          return acc;
        }, {});
        setGroupedServices(grouped);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setError("Failed to load services.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div
      className="relative bg-black text-white py-16 px-6 md:px-28 min-h-screen"
      style={{
        backgroundImage: "url('/Movieposter 2.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center 1px",
        backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      {/* Optional overlay to dim background for better text contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-metallicgold mb-12 uppercase text-center">
          Our Services
        </h1>

        {loading ? (
          <p className="text-center text-gray-400">Loading services...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          Object.keys(groupedServices).map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl font-semibold text-metallicgold mb-6 border-b border-metallicgold pb-1">
                {category}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {groupedServices[category].map((service) => (
                  <motion.div
                    key={service.id}
                    className="bg-[#1c1c1c] border border-metallicgold p-6 rounded-2xl shadow-md transition hover:scale-[1.02]"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-bold text-metallicgold mb-2">
                      {service.service_title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {service.description}
                    </p>
                    <div className="text-sm text-metallicgold font-medium">
                      Price: {service.price_range}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}