import React from "react";

import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiPencil,
} from "react-icons/hi";
import CardTestimonial from "../../../../partials/CardTestimonial";
import { FaPlus } from "react-icons/fa";
import ModalAddTestimonials from "./ModalAddTestimonials";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const [
    isModalTestimonials, //getter = get data
    setIsModalTestimonials, //setter = set data
  ] = React.useState(false);

  const handleAdd = () => {
    setIsModalTestimonials(true);
  };

  return (
    <>
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="relative container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Client Testimonials
          </h2>
          <div
            className="absolute right-0 top-9 hover:underline hover:text-primary"
            type="button"
          >
            <div className="flex items-center gap-x-3">
              <button className="flex items-center gap-2" onClick={handleAdd}>
                <FaPlus className="size-3" />
                Add
              </button>
            </div>
          </div>

          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Testimonial 1 */}
                <CardTestimonial
                  src={"../images/testimonials-1.webp"}
                  alt={"Sarah Johnson Image"}
                  comment={
                    "The team delivered our project ahead of schedule with exceptional quality. Our online sales increased by 120% within three months!"
                  }
                  name={"Sarah Johnson"}
                  position={"Marketing Director, TechCorp"}
                />

                {/* Testimonial 2 */}
                <CardTestimonial
                  src={"../images/testimonials-2.webp"}
                  alt={"Michael Chen Image"}
                  comment={
                    "From design to deployment, their attention to detail was  impressive. They became true partners in our digital transformation journey."
                  }
                  name={"Michael Chen"}
                  position={"CEO, StartupHub"}
                />

                {/* Testimonial 3 */}
                <CardTestimonial
                  src={"../images/testimonials-3.webp"}
                  alt={"Emma Rodriguez Image"}
                  comment={
                    "Their SEO strategy tripled our organic traffic in 6 months. We've seen a dramatic improvement in lead quality and conversion rates."
                  }
                  name={"Emma Rodriguez"}
                  position={"CMO, GrowthSolutions"}
                />
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1))
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <HiOutlineChevronLeft className="w-6 h-6 text-gray-600 " />
            </button>

            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            >
              <HiOutlineChevronRight className="w-6 h-6 text-gray-600 " />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {isModalTestimonials && (
        <ModalAddTestimonials setIsModal={setIsModalTestimonials} />
      )}
    </>
  );
};

export default Testimonials;
