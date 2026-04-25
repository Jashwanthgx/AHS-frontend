export const JOBS = [
  // Stripe
  { 
    id: 1, title: "Senior Staff Software Engineer", company: "Stripe", location: "Bangalore, KA (Hybrid)", salary: "₹45L - ₹65L", icon: "code", domain: "Backend", type: "Full-time",
    description: "Help us build the pipes that move money around India. You'll be working on our core payment stack, making sure every transaction is safe and lightning fast.",
    requirements: ["Deep experience with backend systems", "You actually like solving hard infrastructure problems", "Previous FinTech work is great, but not a dealbreaker"]
  },
  { 
    id: 2, title: "Payment Systems Architect", company: "Stripe", location: "Remote (India)", salary: "₹35L - ₹55L", icon: "account_balance", domain: "Backend", type: "Contract",
    description: "Design scalable architectures for global payment processing. Focus on reliability, latency, and security across multiple jurisdictions.",
    requirements: ["Expertise in microservices architecture", "Strong understanding of SQL and NoSQL databases", "Experience with AWS or GCP"]
  },
  { 
    id: 3, title: "Data Engineer", company: "Stripe", location: "Hyderabad, TS", salary: "₹25L - ₹40L", icon: "database", domain: "Data", type: "Full-time",
    description: "Build and maintain data pipelines that power Stripe's analytics and reporting products.",
    requirements: ["Proficiency in SQL and Python", "Experience with Spark or Flink", "Knowledge of data warehousing concepts"]
  },
  { 
    id: 4, title: "Product Marketing Manager", company: "Stripe", location: "Mumbai, MH", salary: "₹20L - ₹35L", icon: "campaign", domain: "Product", type: "Full-time",
    description: "Develop and execute go-to-market strategies for new Stripe features and products in the Indian market.",
    requirements: ["5+ years in product marketing", "Excellent communication skills", "Experience in B2B SaaS"]
  },
  
  // Vercel
  { 
    id: 5, title: "Frontend Developer", company: "Vercel", location: "Pune, MH (Remote)", salary: "₹22L - ₹38L", icon: "web", domain: "Frontend", type: "Full-time",
    description: "Join the team building the future of the web. Work on Next.js and the Vercel platform to deliver incredible developer experiences.",
    requirements: ["Deep expertise in React and Next.js", "Strong CSS skills (Tailwind preferred)", "Experience with edge computing"]
  },
  { 
    id: 6, title: "Developer Advocate", company: "Vercel", location: "Bangalore, KA", salary: "₹25L - ₹45L", icon: "record_voice_over", domain: "Other", type: "Full-time",
    description: "Engage with the developer community in India, create tutorials, and help users get the most out of Vercel.",
    requirements: ["Strong public speaking skills", "Deep technical knowledge of the web stack", "Experience creating technical content"]
  },
  { 
    id: 7, title: "Infrastructure Engineer", company: "Vercel", location: "Remote (India)", salary: "₹28L - ₹50L", icon: "dns", domain: "Backend", type: "Full-time",
    description: "Maintain and scale the global infrastructure that powers millions of websites.",
    requirements: ["Experience with Kubernetes and Terraform", "Strong networking knowledge", "Proficiency in Rust or Go"]
  },
  { 
    id: 8, title: "Technical Writer", company: "Vercel", location: "Chennai, TN", salary: "₹15L - ₹25L", icon: "edit_document", domain: "Other", type: "Contract",
    description: "Create clear, concise documentation for Vercel's products and APIs.",
    requirements: ["Experience writing technical documentation", "Familiarity with Markdown and Git", "Ability to explain complex concepts simply"]
  },
  
  // OpenAI
  { 
    id: 9, title: "Machine Learning Researcher", company: "OpenAI", location: "Hyderabad, TS (Remote)", salary: "₹60L - ₹95L", icon: "science", domain: "AI", type: "Full-time",
    description: "Research and develop state-of-the-art machine learning models to advance artificial general intelligence.",
    requirements: ["Ph.D. in Computer Science or related field", "Track record of publications at ICML, NeurIPS, etc.", "Proficiency in PyTorch"]
  },
  { 
    id: 10, title: "AI Alignment Engineer", company: "OpenAI", location: "Bangalore, KA", salary: "₹50L - ₹80L", icon: "policy", domain: "AI", type: "Full-time",
    description: "Ensure AI systems behave according to human values and safety constraints.",
    requirements: ["Strong background in reinforcement learning", "Experience with interpretability research", "Passion for AI safety"]
  },
  { 
    id: 11, title: "Fullstack Engineer", company: "OpenAI", location: "Pune, MH", salary: "₹35L - ₹60L", icon: "code", domain: "Frontend", type: "Full-time",
    description: "Build the interfaces and APIs that allow users to interact with our advanced AI models.",
    requirements: ["Proficiency in React and Node.js", "Experience with large-scale API design", "Knowledge of vector databases"]
  },
  { 
    id: 12, title: "Research Scientist", company: "OpenAI", location: "Delhi NCR (Gurgaon)", salary: "₹55L - ₹90L", icon: "biotech", domain: "AI", type: "Full-time",
    description: "Collaborate on groundbreaking research projects to push the boundaries of what AI can do.",
    requirements: ["Deep understanding of neural networks", "Strong mathematical foundation", "Excellent problem-solving skills"]
  },
  
  // Anthropic
  { id: 13, title: "Data Scientist", company: "Anthropic", location: "Mumbai, MH", salary: "₹30L - ₹55L", icon: "data_exploration", domain: "Data", type: "Full-time", description: "Analyze large datasets to improve model training and evaluation.", requirements: ["Strong statistics background", "Expertise in Python and SQL"] },
  { id: 14, title: "Trust and Safety Analyst", company: "Anthropic", location: "Remote (India)", salary: "₹18L - ₹32L", icon: "security", domain: "Other", type: "Full-time", description: "Monitor AI outputs and develop safety guidelines.", requirements: ["Experience in content moderation or trust and safety", "Strong analytical skills"] },
  { id: 15, title: "Prompt Engineer", company: "Anthropic", location: "Pune, MH", salary: "₹25L - ₹45L", icon: "keyboard", domain: "AI", type: "Contract", description: "Design and optimize prompts for our latest models.", requirements: ["Excellent linguistic skills", "Creative problem-solving ability"] },
  { id: 16, title: "Backend Systems Engineer", company: "Anthropic", location: "Bangalore, KA", salary: "₹35L - ₹65L", icon: "memory", domain: "Backend", type: "Full-time", description: "Build high-performance systems for model inference.", requirements: ["Experience with C++ or Rust", "Low-latency systems design"] },
  
  // Google
  { id: 17, title: "Product Manager", company: "Google", location: "Bangalore, KA (Hybrid)", salary: "₹40L - ₹75L", icon: "assignment", domain: "Product", type: "Full-time", description: "Lead product development for one of Google's core products in India.", requirements: ["Experience leading cross-functional teams", "Strong technical background"] },
  { id: 18, title: "UX Designer", company: "Google", location: "Hyderabad, TS", salary: "₹25L - ₹45L", icon: "design_services", domain: "Design", type: "Full-time", description: "Create intuitive and beautiful user experiences for millions of people.", requirements: ["Expertise in Figma or Adobe XD", "Strong portfolio of user-centric design"] },
  { id: 19, title: "Cloud Solutions Architect", company: "Google", location: "Delhi NCR (Noida)", salary: "₹30L - ₹55L", icon: "cloud", domain: "Backend", type: "Full-time", description: "Help customers design and implement cloud architectures.", requirements: ["Deep knowledge of GCP", "Excellent presentation skills"] },
  { id: 20, title: "Hardware Engineer", company: "Google", location: "Bangalore, KA", salary: "₹30L - ₹60L", icon: "developer_board", domain: "Other", type: "Full-time", description: "Design the next generation of hardware for our data centers.", requirements: ["Background in electrical engineering", "Experience with FPGA design"] },
  
  // Meta
  { id: 21, title: "VR Interaction Designer", company: "Meta", location: "Gurgaon, HR", salary: "₹28L - ₹50L", icon: "view_in_ar", domain: "Design", type: "Full-time", description: "Design the future of social interaction in virtual reality.", requirements: ["Experience with Unity or Unreal Engine", "Strong 3D design skills"] },
  { id: 22, title: "iOS Developer", company: "Meta", location: "Hyderabad, TS (Hybrid)", salary: "₹32L - ₹60L", icon: "phone_iphone", domain: "Frontend", type: "Full-time", description: "Build feature-rich iOS applications for the Metaverse.", requirements: ["Expertise in Swift and UIKit", "Experience with mobile performance optimization"] },
  { id: 23, title: "Data Analytics Manager", company: "Meta", location: "Bangalore, KA", salary: "₹45L - ₹80L", icon: "analytics", domain: "Data", type: "Full-time", description: "Manage a team of data analysts to drive business decisions.", requirements: ["Experience in team leadership", "Strong proficiency in SQL and Tableau"] },
  { id: 24, title: "Content Strategist", company: "Meta", location: "Mumbai, MH", salary: "₹18L - ₹35L", icon: "feed", domain: "Product", type: "Full-time", description: "Develop content strategies to engage users across our platforms.", requirements: ["Experience in digital marketing", "Excellent writing and editing skills"] },
];

export const COMPANIES = [
  {
    id: "stripe",
    name: "Stripe",
    logo: "https://www.vectorlogo.zone/logos/stripe/stripe-icon.svg",
    bgImage: "/ceo_collison_stripe_1777120567404.png",
    description: "Everything you need to accept payments and grow your business online. We power some of India's biggest startups like Zomato and Swiggy.",
    about: "We're a team of engineers and designers building the financial infrastructure for the internet. If you've ever paid for something online in India, there's a good chance we helped make it happen.",
    location: "Bangalore, KA",
    website: "https://stripe.com"
  },
  {
    id: "vercel",
    name: "Vercel",
    logo: "https://www.vectorlogo.zone/logos/vercel/vercel-icon.svg",
    bgImage: "/ceo_rauch_vercel_1777120586712.png",
    description: "Platform for frontend developers, with a strong engineering presence in Pune and Bangalore.",
    about: "Vercel is the platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. Our India team is core to our global infrastructure.",
    location: "Pune, MH",
    website: "https://vercel.com"
  },
  {
    id: "openai",
    name: "OpenAI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg",
    bgImage: "/ceo_altman_openai_1777120602550.png",
    description: "We're a research lab working to build safe and powerful AI. Our Hyderabad hub is growing fast.",
    about: "We're a team of researchers and engineers working to make sure AI benefits everyone. We focus on building models that are safe, useful, and aligned with human values.",
    location: "Hyderabad, TS",
    website: "https://openai.com"
  },
  {
    id: "anthropic",
    name: "Anthropic",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Anthropic_logo.svg",
    bgImage: "/ceo_amodei_anthropic_1777120687566.png",
    description: "Building reliable AI systems with significant data science operations in Mumbai.",
    about: "Anthropic is an AI safety and research company that’s working to build reliable, interpretable, and steerable AI systems. Our Mumbai office leads our global data analytics and evaluation efforts.",
    location: "Mumbai, MH",
    website: "https://anthropic.com"
  },
  {
    id: "google",
    name: "Google",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
    bgImage: "/ceo_pichai_google_1777120653293.png",
    description: "Google India is a major hub for global product engineering and cloud solutions.",
    about: "Google's mission is to organize the world's information and make it universally accessible and useful. Google India has major offices in Bangalore, Hyderabad, Gurgaon, and Mumbai.",
    location: "Bangalore, KA",
    website: "https://google.com"
  },
  {
    id: "meta",
    name: "Meta",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    bgImage: "/ceo_zuck_meta_1777120669884.png",
    description: "Meta India builds technologies that connect millions across the subcontinent.",
    about: "Meta builds technologies that help people connect, find communities, and grow businesses. Meta India is at the forefront of digital transformation in the region.",
    location: "Gurgaon, HR",
    website: "https://meta.com"
  },
  {
    id: "razorpay",
    name: "Razorpay",
    logo: "https://www.vectorlogo.zone/logos/razorpay/razorpay-icon.svg",
    bgImage: "/ceo_kumar_razorpay_1777120635474.png",
    description: "Converging payments and banking for India's digital economy.",
    about: "Razorpay is India's leading full-stack financial services company that helps Indian businesses with comprehensive and innovative solutions.",
    location: "Bangalore, KA",
    website: "https://razorpay.com"
  },
  {
    id: "zomato",
    name: "Zomato",
    logo: "https://www.vectorlogo.zone/logos/zomato/zomato-icon.svg",
    bgImage: "/ceo_dhar_zomato_1777120618659.png",
    description: "Better food for more people. Technology that powers India's hunger.",
    about: "Launched in 2010, our mission is to ensure nobody has a bad meal. We are one of the world's largest food aggregators.",
    location: "Gurgaon, HR",
    website: "https://zomato.com"
  }
];
