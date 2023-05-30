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
            Web Scraper
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
              <li className="nav-item">
                <Link className="nav-link" href="/linkedin">
                  LinkedIn
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/twitter">
                  Twitter
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
                  Resources
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" href="/linkedin/list">
                      LinkedIn Profiles
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="/twitter/list">
                      Twitter Profiles
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      Something else here
                    </Link>
                  </li>
                </ul>
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
