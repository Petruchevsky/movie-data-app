import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function CarouselRFC() {
  return (
    <Carousel
      interval={1000}
      fade={true}
      pauseOnHover={false}
      pause="false"
      nextIcon={null}
      prevIcon={null}
      indicators={false}
      
    >
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/wolverine.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/spiderman.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/scarface2.avif"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/rocky.jpg"
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/pulp-fiction.jpg"
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/el-padrino.jpg"
          alt="Sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item className="carouselItem">
        <img
          className="d-block w-100"
          src="../img/bohemian-rapsody.jpg"
          alt="Seventh slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselRFC;
