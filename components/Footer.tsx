export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} Your Name. Built with Next.js, Tailwind CSS and Framer Motion.
    </footer>
  );
}
