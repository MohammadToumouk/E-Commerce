import React from 'react';
import './Blog.css';
import { useInView } from 'react-intersection-observer';

const blogPosts = [

  
  {
    id: 1,
    title: "Top 10 Must-Have Mobile Accessories for Every Tech Enthusiast",
    content:
      "Mobile accessories play a crucial role in enhancing the overall tech experience. Whether you're a seasoned tech enthusiast or a casual user, having the right accessories can elevate your smartphone usage to the next level. Here's a list of the top 10 must-have mobile accessories:\n\n1. Portable Power Banks: Stay charged on the go with a reliable power bank.\n2. Protective Phone Cases: Keep your device safe from drops and scratches with a sturdy phone case.\n3. Wireless Earbuds/Headphones: Enjoy a wire-free audio experience with Bluetooth earbuds or headphones.\n4. Screen Protectors: Shield your smartphone's screen from scratches and cracks with a quality screen protector.\n5. Fast Chargers: Charge your device quickly with a high-speed charging adapter.\n6. Popsockets and Phone Grips: Add convenience and comfort to your smartphone handling.\n7. Fitness Bands: Monitor your health and fitness with a smart fitness band.\n8. Camera Lenses and Accessories: Enhance your smartphone photography with external lenses and accessories.\n9. Wireless Chargers: Simplify charging with a wireless charging pad.\n10. Smartphone Holders for Cars: Stay safe on the road with a sturdy phone holder for your car.\n\nThese accessories can greatly improve your smartphone experience, making them essential additions to any tech enthusiast's collection.",
      image: "https://5.imimg.com/data5/YT/RA/MY-36315460/mobile-accessories-all-types-mobile-accessories-available.jpg",
    },
  {
    id: 2,
    title: "Choosing the Right Laptop: A Comprehensive Buyer's Guide",
    content:
      "With an overwhelming number of laptop options available in the market, finding the perfect one that suits your needs can be challenging. To make the process easier, here's a comprehensive buyer's guide to choosing the right laptop: Intended Use: Identify the primary purpose of the laptop, such as gaming, productivity, multimedia, or casual use. Processor and RAM: Consider the CPU and RAM to ensure smooth performance and multitasking capability. Storage Options: Decide between SSDs for faster speed and HDDs for higher storage capacity. Display Size and Resolution: Choose a display size and resolution that suits your work and entertainment preferences. Graphics Card: For gaming and multimedia tasks, opt for a laptop with a dedicated graphics card. Battery Life: Check the battery life to ensure it meets your mobility requirements. Portability vs. Performance: Strike a balance between portability and high-performance, depending on your needs. Operating System: Choose between Windows, macOS, or ChromeOS based on your familiarity and requirements. Connectivity Options: Ensure the laptop has the necessary ports and wireless connectivity. Budget Considerations: Set a budget and find a laptop that fits your requirements within that range.By considering these factors, you can narrow down your options and find the perfect laptop that suits your lifestyle and work demands.",
    image: "https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Blog_header_image.width-1300.png",
    },
  
  {
    id: 3,
    title: "The Evolution of Mobile Phones: From Bricks to Smartphones",
    content:
      "The evolution of mobile phones is a fascinating journey through time and technology. Let's take a glimpse into how these devices have evolved from 'bricks' to 'smartphones': The Early Days: Mobile phones, in their earliest form, were large and heavy. The Motorola DynaTAC 8000X, introduced in 1983, was one of the first commercially available mobile phones, earning the nickname 'brick' due to its size and weight. Compact Candy Bars: As technology advanced, mobile phones became more compact. In the 1990s, 'candy bar' phones with their sleek design became popular among users. The Era of Flip Phones: The late 1990s and early 2000s saw the rise of 'flip' phones, characterized by their stylish flip mechanism. Feature Phones: By the 2000s, feature phones became widespread, offering enhanced functionalities like cameras and internet access. The Smartphone Revolution: The introduction of the iPhone in 2007 marked a turning point in the mobile industry. Smartphones brought together multiple features, such as touchscreens, apps, and internet connectivity, revolutionizing how we use mobile devices. Modern-Day Smartphones: Today, smartphones are sleek, powerful, and highly versatile. They offer advanced capabilities like high-resolution cameras, AI integration, augmented reality, and 5G connectivity. From humble beginnings as 'bricks' to the pocket-sized powerhouses we carry today, mobile phones have undoubtedly come a long way, connecting people worldwide and transforming how we communicate and live.",
    image: "https://zone.binabangsaschool.com/enews/wp-content/uploads/2017/05/evolution-phone.jpg",
    },
];

const Blog = () => {
  const [ref, inView] = useInView({
    triggerOnce: true, // The fade-in animation will be triggered only once when the component enters the viewport
    threshold: 0.1, // Percentage of component visibility required to trigger the animation
  });
  return (
    <div ref={ref} className={`blog-container fade-in ${inView ? 'visible' : ''}`}>
      {blogPosts.map((post) => (
        <>
        <div className="blog-post" key={post.id}>
          <h2 className="blog-title">{post.title}</h2>
          <img src={post.image} alt={post.title} className="blog-image" />
          <p className="blog-content">{post.content}</p>
        </div>
         <hr className="w-9/12 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"></hr>
         <br/><br/>
         </>
      ))}
    </div>
  );
};

export default Blog;
