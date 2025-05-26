import Slider from "react-slick";

const photographers = [
  {
    name: "שמחוליק סלומון",
    reviews: 10,
    rating: 5,
    description: "תודה לצוות צלמים מוכשר...",
    image: "/images/photographer1.jpg",
  },
  {
    name: "כוטו ניקטוריה הפקות צילום",
    reviews: 6,
    rating: 5,
    description: "תודה שעשיתם לנו מזכרת מדהימה...",
    image: "/images/photographer2.jpg",
  },
  {
    name: "דורון לצער - סטודיו לצילום",
    reviews: 7,
    rating: 5,
    description: "הצלמים יצאו אומנותיים ומדהימים...",
    image: "/images/photographer3.jpg",
  },
    {
    name: "דורון לצער - סטודיו לצילום",
    reviews: 7,
    rating: 5,
    description: "הצלמים יצאו אומנותיים ומדהימים...",
    image: "/images/photographer3.jpg",
  },
    {
    name: "דורון לצער - סטודיו לצילום",
    reviews: 7,
    rating: 5,
    description: "הצלמים יצאו אומנותיים ומדהימים...",
    image: "/images/photographer3.jpg",
  },
    {
    name: "דורון לצער - סטודיו לצילום",
    reviews: 7,
    rating: 5,
    description: "הצלמים יצאו אומנותיים ומדהימים...",
    image: "/images/photographer3.jpg",
  },
    {
    name: "דורון לצער - סטודיו לצילום",
    reviews: 7,
    rating: 5,
    description: "הצלמים יצאו אומנותיים ומדהימים...",
    image: "/images/photographer3.jpg",
  },
  // הוסף עוד צלמים...
];

export default function PhotographerSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    rtl: true, // בשביל עברית
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Slider {...settings}>
        {photographers.map((p, index) => (
          <div key={index} className="p-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img src={p.image} alt={p.name} className="h-56 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <p key={i} className={`mx-0.5 ${i < p.rating ? "text-blue-500" : "text-gray-300"}`}>1</p>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mb-2">{p.description}</p>
                <button className="bg-blue-500 text-white rounded-full px-4 py-1 text-sm hover:bg-blue-600">צלמים</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
