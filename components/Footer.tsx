export default function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8 text-center text-xs text-on-surface-muted">
      © {new Date().getFullYear()} Huda Setiawan. Built with Next.js, Tailwind CSS and Framer Motion.
    </footer>
  );
}
