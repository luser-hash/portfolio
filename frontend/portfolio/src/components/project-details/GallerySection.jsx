import { useEffect, useState } from "react";
import SafeImage from "@/components/SafeImage";

const GallerySection = ({ images = [], sectionNumber }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  useEffect(() => {
    if (!hasImages || images.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [hasImages, images]);

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % images.length);
  };

  return (
    <section
      className="pd-overview-card pd-active-panel"
      aria-labelledby="gallery-title"
    >
      <div className="pd-section-eyebrow">{sectionNumber}</div>
      <h1 id="gallery-title" className="pd-section-title">
        Gallery
      </h1>

      {hasImages ? (
        <>
          <div className="pd-gallery-stage">
            <div className="pd-gallery-window">
              {images.map((image, index) => (
                <figure
                  key={image.id}
                  className={`pd-gallery-slide ${
                    index === activeIndex ? "pd-gallery-slide-active" : ""
                  }`}
                  aria-hidden={index !== activeIndex}
                >
                  <SafeImage
                    src={image.image}
                    alt={image.alt_text || image.caption || "Project gallery image"}
                    className="pd-gallery-image"
                    fallback={
                      <div className="pd-visual-placeholder pd-gallery-placeholder">
                        This gallery image is not available right now.
                      </div>
                    }
                  />
                </figure>
              ))}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  className="pd-gallery-nav pd-gallery-nav-prev"
                  onClick={showPrevious}
                  aria-label="Show previous image"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="pd-gallery-nav pd-gallery-nav-next"
                  onClick={showNext}
                  aria-label="Show next image"
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="pd-gallery-meta">
            <div className="pd-gallery-copy">
              {activeImage?.caption && (
                <p className="pd-gallery-caption">{activeImage.caption}</p>
              )}
              <span className="pd-gallery-counter">
                {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
            </div>

            {images.length > 1 && (
              <div className="pd-gallery-thumbs" aria-label="Gallery thumbnails">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    className={`pd-gallery-thumb ${
                      index === activeIndex ? "pd-gallery-thumb-active" : ""
                    }`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                  >
                    <SafeImage
                      src={image.image}
                      alt=""
                      aria-hidden="true"
                      className="pd-gallery-thumb-image"
                      fallback={
                        <span
                          className="pd-gallery-thumb-image"
                          aria-hidden="true"
                        />
                      }
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="pd-visual-placeholder pd-gallery-placeholder">
          No gallery images have been added for this project yet.
        </div>
      )}
    </section>
  );
};

export default GallerySection;
