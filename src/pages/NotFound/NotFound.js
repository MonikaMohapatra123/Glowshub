import "./NotFound.css";

function NotFound() {
  return (
    <div className="display">
        <h1 className="display-notfound">404 Not found</h1>;
      <div className="display__img">
        <img src="/images/Scarecrow.webp" alt="404-Scarecrow" />
      </div>
      <div className="display__content">
        <h2 className="display__content--info">I have bad news for you</h2>
        <p className="display__content--text">
          The page you are looking for might not exist or is temporarily
          unavailable
        </p>
      </div>
    </div>
  );
}

export default NotFound;