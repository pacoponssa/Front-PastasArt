const Footer = () => {
  return (
      <footer className="bg-orange-200 text-center p-4">
          {/* <div className="text-lg font-bold">PastasArt</div> */}
          
          <nav className="mt-2">
              <a href="/terms" className="mx-2 hover:text-orange-600">Términos</a>
              <a href="/privacy" className="mx-2 hover:text-orange-600">Privacidad</a>
          </nav>
          
          <div className="mt-4 flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
                  <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                  <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">
                  <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                  <i className="fab fa-linkedin"></i>
              </a>
          </div>

          <div className="mt-2">© 2024 PastasArt</div>
      </footer>
  );
};

export default Footer;
