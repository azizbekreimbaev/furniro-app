const VideoSection = () => {
    const youtubeVideoId = "qYvljZavxqQ";

    const youtubeUrl =
        `https://www.youtube.com/embed/${youtubeVideoId}` +
        `?autoplay=1` +
        `&mute=1` +
        `&loop=1` +
        `&playlist=${youtubeVideoId}` +
        `&controls=0` +
        `&rel=0` +
        `&playsinline=1` +
        `&disablekb=1`;

    return (
        <section className="home-video-section">
            {/* =========================
          YOUTUBE BACKGROUND
      ========================= */}

            <div className="home-video-background">
                <iframe
                    src={youtubeUrl}
                    title="Furniro Interior Inspiration"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={-1}
                />
            </div>

            {/* =========================
          OVERLAY
      ========================= */}

            <div className="home-video-overlay" />

            {/* =========================
          CONTENT
      ========================= */}

            <div className="home-video-container">
                <div className="home-video-content">
                    <div className="home-video-eyebrow">
                        <span />

                        <p>INSIDE FURNIRO</p>
                    </div>

                    <h2>
                        BEAUTIFUL SPACES
                        <span>
                            START WITH DESIGN.
                        </span>
                    </h2>

                    <p className="home-video-description">
                        Explore interiors where thoughtful
                        furniture, natural materials and
                        timeless details come together to
                        create spaces made for everyday living.
                    </p>

                    <div className="home-video-bottom-info">
                        <div>
                            <span>
                                OUR PHILOSOPHY
                            </span>

                            <strong>
                                TIMELESS DESIGN
                            </strong>
                        </div>

                        <div>
                            <span>
                                OUR APPROACH
                            </span>

                            <strong>
                                NATURAL COMFORT
                            </strong>
                        </div>

                        <div>
                            <span>
                                OUR STYLE
                            </span>

                            <strong>
                                MODERN LIVING
                            </strong>
                        </div>
                    </div>
                </div>
            </div>

            {/* =========================
          SIDE TEXT
      ========================= */}

            <div className="home-video-side-text">
                <span>
                    FURNIRO
                </span>

                <i />

                <span>
                    INTERIOR INSPIRATION
                </span>
            </div>

            {/* =========================
          SCROLL
      ========================= */}

            <div className="home-video-scroll">
                <span />

                <small>
                    KEEP EXPLORING
                </small>
            </div>
        </section>
    );
};

export default VideoSection;