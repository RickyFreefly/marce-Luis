import { motion } from "motion/react";
import Slider from "react-slick";
import { Camera } from "lucide-react";
import { SectionContainer } from "../ui/SectionContainer";
import { SectionTitle } from "../ui/SectionTitle";
import { DecorativeDivider } from "../ui/DecorativeDivider";

type GalleryTexts = {
  title: string;
  subtitle: string;
  imageAlt: string;
};

type GallerySectionProps = {
  images: string[];
  texts?: GalleryTexts;
};

const defaultTexts: GalleryTexts = {
  title: "Retratos de Nuestro Amor",
  subtitle: "Un minuto, un segundo, un instante que queda en la eternidad",
  imageAlt: "Galería",
};

export function GallerySection({ images, texts }: GallerySectionProps) {
  const resolvedTexts = texts ?? defaultTexts;

  const gallerySettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "0px",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: "0px",
        },
      },
    ],
  };

  return (
    <SectionContainer
      id="gallery"
      className="bg-[#F5F3EF] py-16 lg:py-24 overflow-hidden"
    >
      <DecorativeDivider />

      <SectionTitle
        title={resolvedTexts.title}
        subtitle={resolvedTexts.subtitle}
      />

      <div className="flex justify-center mb-8 lg:mb-10">
        <Camera className="w-10 h-10 lg:w-12 lg:h-12 text-[#9AA18B]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="gallery-polaroid-slider"
      >
        <Slider {...gallerySettings}>
          {images.map((img, index) => (
            <div key={index} className="gallery-slide-item">
              <div className="polaroid-card">
                <div className="polaroid-frame">
                  <img
                    src={img}
                    alt={`${resolvedTexts.imageAlt} ${index + 1}`}
                    className="polaroid-image"
                  />
                </div>
                <div className="polaroid-caption-space" />
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
    </SectionContainer>
  );
}