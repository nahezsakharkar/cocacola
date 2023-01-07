import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="d-sm-flex justify-content-center justify-content-sm-between">
        <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
          Copyright © 2023{" "}
          <Link to="">
            Coca-Cola
          </Link>
          . All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
