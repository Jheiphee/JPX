export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-28 border-t border-metallicgold mt-20">
      <div className="flex flex-col md:flex-row justify-between items-start gap-10">
        {/* Left: Logo + Motto */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src="/JPX LOGO.jpg"
            alt="JPX Logo"
            className="w-32 md:w-40 rounded-xl shadow-lg mb-4"
          />
          <p className="italic text-gray-400 text-sm max-w-xs">
            “One Brand, Many Roles — Crossover of Code, Creativity, and Commerce.”
          </p>
          <p className="text-sm text-gray-300 mt-2">📍 Las Piñas City, Philippines</p>
        </div>

        {/* Middle: Quick Links */}
        <div className="text-sm md:text-base text-center md:text-left">
          <p className="uppercase font-semibold text-white mb-2">Quick Links</p>
          <ul className="space-y-1">
            <li><a href="/" className="text-metallicgold hover:underline">Home</a></li>
            <li><a href="/whoisjp" className="text-metallicgold hover:underline">Who is JP?</a></li>
            <li><a href="/view-my-work" className="text-metallicgold hover:underline">View My Work</a></li>
            <li><a href="/services" className="text-metallicgold hover:underline">Services</a></li>
            <li><a href="/contact" className="text-metallicgold hover:underline">Contact Me</a></li>
          </ul>
        </div>

        {/* Right: Contact Info */}
        <div className="text-sm md:text-base space-y-1 text-center md:text-right">
          <p>📧 Email: <a href="mailto:paulalmoroto@gmail.com" className="text-metallicgold">paulalmoroto@gmail.com</a></p>
          <p>📱 Phone: <a href="tel:+639568552794" className="text-metallicgold">+63956 855 2794</a></p>
          <p>🔗 LinkedIn: <button onClick={(e) => e.preventDefault()} className="text-metallicgold hover:underline">John Paul Almoroto</button></p>
          <p>📘 Facebook: <button onClick={(e) => e.preventDefault()} className="text-metallicgold hover:underline">Paul Almoroto</button></p>
          <p>📷 Instagram: <button onClick={(e) => e.preventDefault()} className="text-metallicgold hover:underline">@jheiphee</button></p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center text-xs text-gray-500 space-y-1">
        <p>&copy; {new Date().getFullYear()} JPX. All rights reserved.</p>
        <div className="space-x-4">
          <button onClick={(e) => e.preventDefault()} className="hover:underline">Privacy Policy</button>
          <button onClick={(e) => e.preventDefault()} className="hover:underline">Terms of Use</button>
        </div>
      </div>
    </footer>
  );
}
