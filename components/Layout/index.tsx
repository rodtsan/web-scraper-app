import Link from "next/link";

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="main-layout">
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            Web Scraper App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* <div className="d-flex" role="search"></div> */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" href="/">
                  Home
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  LinkedIn
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <Link className="dropdown-item" href="/linkedin">
                      Web Scraper
                    </Link>
                  </li>
                  <li className="dropdown-item">
                    <Link className="dropdown-item" href="/linkedin/list">
                      LinkedIn Profiles
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/twitter">
                  Twitter
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" href="/">
                  About
                </Link>
              </li>
              <li>
                <span className="avatar d-block"></span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">{children}</div>
    </div>
  );
}
