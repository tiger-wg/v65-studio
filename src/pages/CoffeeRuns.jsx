import React from "react";

export default function CoffeeRuns() {
    return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* COFFEE RUNS page content */}
      <div className="coffee-wrapper">

        {/* TEAM SECTION */}
        <div className="team-section">
          <h2 className="section-heading">TEAM</h2>
          
          <div className="team-profiles-scroll">
            <div className="team-profiles-wrapper">
              <div className="team-profiles team-profiles-1">
              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team1.png"
                      alt="Team Member 1"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 1</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team2.png"
                      alt="Team Member 2"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 2</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team3.png"
                      alt="Team Member 3"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 3</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team4.png"
                      alt="Team Member 4"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 4</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team5.png"
                      alt="Team Member 5"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 5</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team6.png"
                      alt="Team Member 6"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 6</h3>
                  </div>
                </a>
              </div>
            </div>
            {/* Duplicate for seamless loop */}
            <div className="team-profiles team-profiles-2">
              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team1.png"
                      alt="Team Member 1"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 1</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team2.png"
                      alt="Team Member 2"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 2</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team3.png"
                      alt="Team Member 3"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 3</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team4.png"
                      alt="Team Member 4"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 4</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team5.png"
                      alt="Team Member 5"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 5</h3>
                  </div>
                </a>
              </div>

              <div className="team-profile-wrapper">
                <a href="#" className="team-profile-link">
                  <div className="profile-image-container">
                    <img
                      src="/pictures/team6.png"
                      alt="Team Member 6"
                      className="profile-image"
                    />
                    <div className="outline-light-chaser"/>
                  </div>
                  <div className="profile-description">
                    <h3 className="profile-name">Team Member 6</h3>
                  </div>
                </a>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* COLLECTION SECTION */}
        <div className="collection-section">
          <h2 className="section-heading">COLLECTION</h2>
          
          <div className="collection-grid">
            <div className="collection-wrapper collection-wrapper1">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c1.png"
                  alt="Coffee Collection 1"
                  className="collection-image collection-image1"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>

            <div className="collection-wrapper collection-wrapper2">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c2.png"
                  alt="Coffee Collection 2"
                  className="collection-image collection-image2"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>

            <div className="collection-wrapper collection-wrapper3">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c3.png"
                  alt="Coffee Collection 3"
                  className="collection-image collection-image3"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>

            <div className="collection-wrapper collection-wrapper4">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c4.png"
                  alt="Coffee Collection 4"
                  className="collection-image collection-image4"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>

            <div className="collection-wrapper collection-wrapper5">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c5.png"
                  alt="Coffee Collection 5"
                  className="collection-image collection-image5"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>

            <div className="collection-wrapper collection-wrapper6">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer" className="portfolio-link">
                <img
                  src="/pictures/c6.png"
                  alt="Coffee Collection 6"
                  className="collection-image collection-image6"
                />
                <div className="outline-light-chaser"/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
