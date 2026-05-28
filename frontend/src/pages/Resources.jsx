import "./Resources.css";
import { Link } from "react-router-dom";

function Resources() {

  const blogs = [
    {
      title: "10 Best Carbon Tracking Software",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      desc:
        "Explore the best carbon tracking software for reporting and emissions management.",
    },

    {
      title: "Understanding ESG Reporting",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931",
      desc:
        "Learn how ESG reporting impacts sustainability and business growth.",
    },

    {
      title: "AI in Sustainability Analytics",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      desc:
        "How artificial intelligence is changing ESG data analysis.",
    },
  ];

  return (
    <div className="resources-page">

      <nav className="navbar">

        <Link to="/" className="logo">
          Parsley
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/resources">Resources</Link>
          </li>

          <li>Contact Us</li>
        </ul>

      </nav>

      <div className="hero-section">

        <h1>
          Your ultimate knowledge <span>database</span> for
          everything ESG!
        </h1>

      </div>

      <div className="blog-container">

        {blogs.map((blog, index) => (

          <div className="blog-card" key={index}>

            <img src={blog.image} alt="" />

            <div className="blog-content">

              <h2>{blog.title}</h2>

              <p>{blog.desc}</p>

              <button>
                Read Blog
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Resources;