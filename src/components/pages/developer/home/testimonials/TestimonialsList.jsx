import React from "react";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import CardTestimonial from "../../../../partials/CardTestimonial";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
//TABLE STEP 4
const TestimonialsList = ({
  isLoading,
  isFetching,
  error,
  dataTestimonials,
  handleAdd,
  handleEdit,
  handleDelete,
}) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const prevTestimonialCountRef = React.useRef(0);
  const hasInitializedRef = React.useRef(false);

  React.useEffect(() => {
    const testimonials = dataTestimonials?.data ?? [];
    const testimonialCount = testimonials.length;
    const prevCount = prevTestimonialCountRef.current;

    // First time we get non-empty data (on load or refresh)
    if (!hasInitializedRef.current && testimonialCount > 0) {
      setCurrentSlide(0); // Always go to first slide on initial load
      hasInitializedRef.current = true;
    } else if (testimonialCount > prevCount) {
      setCurrentSlide(testimonialCount - 1); // New testimonial added
    } else if (testimonialCount < prevCount) {
      setCurrentSlide((prev) => Math.max(prev - 1, 0)); // Testimonial removed
    } else if (testimonialCount === 0) {
      setCurrentSlide(0); // No testimonials
    }

    prevTestimonialCountRef.current = testimonialCount;
  }, [dataTestimonials?.data]);

  return (
    <>
      {/* TABLE STEP 5 */}
      {/* Testimonial Slider */}
      <div className="relative max-w-4xl mx-auto">
        {/* Slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {dataTestimonials?.data.map((item, key) => {
              return (
               
                  <React.Fragment key={key}>
                    {/* UPDATE STEP 1 */}
                    <div key={key} className="relative">
                      <div className="absolute flex left-[52rem] top-7">
                        <button
                          type="button"
                          data-tooltip="Edit"
                          className="tooltip text-white "
                          // UPDATE STEP 3
                          onClick={() => handleEdit(item)}
                        >
                          <FaPencil className="p-1 bg-primary rounded-full" />
                        </button>
                        {/* DELETE STEP 3 -> ModalDeleteTestimonials.jsx */}
                        <button
                          type="button"
                          data-tooltip="Delete"
                          className="tooltip text-red-600 "
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash className="p-1 bg-primary rounded-full" />
                        </button>
                      </div>
                    </div>
                    <CardTestimonial item={item} />
                  </React.Fragment>
            
              );
            })}

            {/* Testimonial 1 */}
            {/* <CardTestimonial
                  image={"./images/testimonials-1.webp"}
                  alt={"Sarah Johnson"}
                  name={"Sarah Johnson"}
                  testimony={
                    '"The team delivered our project ahead of schedule with exceptional quality. Our online sales increased by 120% within three months!"'
                  }
                  company={"Marketing Director, TechCorp"}
                /> */}
            {/* Testimonial 2 */}
            {/* <CardTestimonial
                  image={"./images/testimonials-2.webp"}
                  alt={"Michael Chen"}
                  name={"Michael Chen"}
                  testimony={
                    '"From design to deployment, their attention to detail was impressive. They became true partners in our digital transformation journey."'
                  }
                  company={"CEO, StartupHub"}
                /> */}

            {/* Testimonial 3 */}
            {/* <CardTestimonial
                  image={"./images/testimonials-3.webp"}
                  alt={"Emma Rodriguez"}
                  name={"Emma Rodriguez"}
                  testimony={
                    '"Their SEO strategy tripled our organic traffic in six months. We\'ve seen a dramatic improvement in lead quality and conversion rates."'
                  }
                  company={"CMO, GrowthSolutions"}
                /> */}
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() =>
            // setCurrentSlide((prev) => (prev === 0 ? 5 : prev - 1))
            setCurrentSlide((prev) =>
              prev == 0 ? dataTestimonials.count - 1 : prev - 1
            )
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <HiOutlineChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={() =>
            // setCurrentSlide((prev) => (prev === 0 ? 5 : prev + 1))
            setCurrentSlide((prev) =>
              prev == dataTestimonials.count - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 -ml-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
        >
          <HiOutlineChevronRight className="w-6 h-6 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {/* {[0, 1, 2].map((index) => ( */}
          {dataTestimonials?.data.map((item, index) => (
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
    </>
  );
};

export default TestimonialsList;
