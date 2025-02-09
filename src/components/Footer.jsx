const Footer = () => {
  return (
    <footer className="text-center mt-5 bg-dark text-light p-3">
      <p>&copy; {new Date().getFullYear()} Creditor. All rights reserved.</p>
      <div className="fs-4">
        <a href="https://www.facebook.com" className="me-2">
          <i className="bi bi-facebook text-danger"></i>
        </a>
        <a href="https://www.whatsapp.com" className="me-2">
          <i className="bi bi-whatsapp text-danger"></i>
        </a>
        <a href="https://www.messenger.com" className="me-2">
          <i className="bi bi-messenger text-danger"></i>
        </a>
        <a href="https://www.instagram.com" className="me-2">
          <i className="bi bi-instagram text-danger"></i>
        </a>
        <a href="https://www.telegram.com" className="me-2">
          <i className="bi bi-telegram text-danger"></i>
        </a>
        <a href="https://www.wechat.com" className="me-2">
          <i className="bi bi-wechat text-danger"></i>
        </a>
        <a href="https://www.twitter.com" className="me-2">
          <i className="bi bi-twitter text-danger"></i>
        </a>
      </div>
      <blockquote className="blockquote mt-3">
        <p className="fst-italic">Footer matters</p>
        <p className="blockquote-footer">Lloyd Chambrier</p>
      </blockquote>
    </footer>
  );
};

export default Footer;
