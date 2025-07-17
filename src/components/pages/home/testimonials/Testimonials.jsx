import React from "react";
import CardTestimonial from "../../../partials/CardTestimonial";

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  return (
    <>
      {/* <section className="bg-gray-50 py-12 md:py-20">
        <div className="container">
          <h2 className="title text-center">Client Testimonials</h2>

          <div className="max-w-3xl mx-auto">
            <div className="testimonialsSlider">
              <CardTestimonial
                src={"../images/testimonials-1.webp"}
                alt={"Sarah Johnson Image"}
                comment={
                  "The team delivered our project ahead of schedule with exceptional quality. Our online sales increased by 120% within three months!"
                }
                name={"Sarah Johnson"}
                position={"Marketing Director, TechCorp"}
              />

              <CardTestimonial
                src={"../images/testimonials-2.webp"}
                alt={"Michael Chen Image"}
                comment={
                  "From design to deployment, their attention to detail was  impressive. They became true partners in our digital transformation journey."
                }
                name={"Michael Chen"}
                position={"CEO, StartupHub"}
              />

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

            <div id="controls" className="relative">
              <a className="prev">
                <div className="absolute bottom-40 -left-5 transform -translate-y-1/2 z-30">
                  <button className="bg-white shadow-md size-10 rounded-full flex items-center justify-center text-2xl text-black/90 hover:text-black/80">
                    &lt;
                  </button>
                </div>
              </a>
              <a className="next">
                <div className="absolute bottom-40 -right-5 transform -translate-y-1/2 z-30">
                  <button className="bg-white shadow-md size-10 rounded-full flex items-center justify-center text-2xl text-black/90 hover:text-black/80">
                    &gt;
                  </button>
                </div>
              </a>
            </div>

            <div className="tns-nav"></div>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Client Testimonials
          </h2>

          {/* Testimonial Slider */}
          <div className="relative max-w-4xl mx-auto">
            {/* Slides */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Testimonial 1 */}
                <div className="w-full flex shrink-0 px-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;
