// components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-base-200 text-center py-4 text-sm text-gray-500">
      © {new Date().getFullYear()} MoneyTrack. All rights reserved.
    </footer>
  );
};

export default Footer;
