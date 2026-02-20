export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Health & Fitness Blog. All rights reserved.</p>
        <p className="text-sm mt-2">Empowering your wellness journey.</p>
      </div>
    </footer>
  );
}
