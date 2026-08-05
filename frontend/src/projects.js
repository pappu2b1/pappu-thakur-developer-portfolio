export const projects = [
  {
    slug: 'leadfollow-crm', title: 'LeadFollow CRM', category: 'Full-Stack CRM', status: 'Project-Based Application', preview: 'crm', featured: true,
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    summary: 'A tenant-aware CRM application for lead capture, follow-ups, notes and business workflows.',
    problem: 'Lead information, follow-ups and business context need one clear place instead of scattered spreadsheets and messages.',
    solution: 'A tenant-aware dashboard direction with lead capture, activity tracking, templates, reports and settings.', role: 'Frontend + full-stack project development',
    features: ['Tenant-scoped lead management', 'Authentication and protected routes', 'Lead CRUD, search and filters', 'Notes, activities and follow-ups', 'Public lead-capture forms and reports'],
    limitations: 'Automated payment processing, invoices, password reset, email verification, refresh tokens and bulk WhatsApp sending are not claimed complete.'
  },
  {
    slug: 'indore-job-portal', title: 'Indore Job Portal', category: 'Full-Stack Web Application', status: 'Completed Project', preview: '/projects/indore-job-portal/indore-job-portal-home.png', featured: true,
    tech: ['React', 'Vite', 'React Router', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'],
    summary: 'A full-stack job portal built for job seekers and employers with secure authentication, job listings, applications, role-based access, and a production-ready REST API.',
    problem: 'Job seekers and employers need a secure, responsive way to publish opportunities, discover roles and manage applications through one clear workflow.',
    solution: 'A production-deployed React and Express application with role-based access, protected routes, MongoDB persistence and a secured REST API.', role: 'Full-stack project development',
    features: ['User registration and login', 'Role-based authentication and protected routes', 'Job listings and job detail pages', 'Job application workflow', 'Duplicate application prevention', 'MongoDB database integration', 'Production-ready REST API', 'Helmet security headers', 'CORS configuration and rate limiting', 'Responsive UI and production deployment'],
    architecture: ['Frontend: Vercel', 'Backend: Render', 'Database: MongoDB Atlas'],
    demoUrl: 'https://indore-job-portal.vercel.app',
    sourceUrl: 'https://github.com/pappu2b1/Indore-Job-Portal',
    limitations: 'No additional limitations are claimed beyond the documented project scope.'
  },
  {
    slug: 'ecommerce-website-demo', title: 'LUMA — Full-Stack Ecommerce Platform', category: 'Full-Stack Development · Ecommerce', status: 'Completed Project', preview: '/projects/luma-ecommerce/luma-home.jpeg', previewAlt: 'LUMA full-stack ecommerce platform homepage', featured: true,
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
    fullTech: ['React', 'Vite', 'Tailwind CSS', 'React Router', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication', 'bcrypt', 'REST API', 'Helmet', 'Express Rate Limit'],
    summary: 'A full-stack ecommerce platform with a premium responsive storefront, MongoDB-powered product catalog, JWT authentication, cart and wishlist flows, coupon-enabled COD checkout, customer order management, reviews, and a role-protected admin dashboard.',
    overview: 'LUMA is an end-to-end MERN ecommerce application spanning customer shopping journeys, backend order processing and protected administrative operations. Local full-stack workflows have been verified without claiming real online payment processing.',
    problem: 'The goal was to move beyond a static ecommerce UI and build a realistic full-stack shopping experience that demonstrates both customer-facing workflows and secure administrative operations.',
    solution: 'LUMA combines a responsive React storefront, a MongoDB-backed catalog, JWT authentication, persistent cart and wishlist workflows, server-validated COD checkout, customer order management and a role-protected admin system.', role: 'Full-stack architecture, frontend and backend development',
    features: ['MongoDB-backed product catalog', 'Product search and filtering', 'Product detail pages', 'Stable product slugs', 'Product variants', 'Persistent shopping cart', 'Guest wishlist', 'Authenticated MongoDB wishlist', 'Guest-to-account wishlist merge', 'JWT registration and login', 'Customer profile', 'Customer addresses', 'Coupon validation', 'Cash on Delivery checkout', 'Server-authoritative pricing', 'Stock validation', 'Persisted orders', 'Customer order history', 'Customer order details', 'Product reviews', 'Contact submission persistence', 'Role-protected admin dashboard', 'Product CRUD', 'Category management', 'Coupon management', 'Order management', 'Admin order-detail view', 'Review moderation', 'Responsive storefront', 'Responsive admin UI'],
    architecture: ['Frontend: React + Vite · Vercel · luma.papputhakur.com', 'Backend: Node.js + Express · Render', 'Database: MongoDB + Mongoose · MongoDB Atlas'],
    caseSections: [
      { title: 'Architecture', body: 'The frontend and backend are separated cleanly: React and Vite power the customer and admin interfaces, Node.js and Express expose the REST API, and MongoDB with Mongoose persists the catalog, customers, wishlists, coupons, orders and reviews.' },
      { title: 'Authentication & Authorization', body: 'JWT registration and login use bcrypt-hashed passwords. Protected customer routes enforce order ownership, while administrative APIs require the authenticated user to hold the admin role.' },
      { title: 'Ecommerce Logic', body: 'LUMA supports product variants, a persistent cart, guest and account wishlists, coupon validation and COD checkout. The backend recalculates prices from catalog data, validates stock and persists the resulting order instead of trusting client-submitted totals.' },
      { title: 'Admin Dashboard', body: 'The protected admin workspace covers dashboard visibility, products, orders, customers, categories, coupons and reviews, including product CRUD, order management and review moderation.' },
      { title: 'Security', body: 'Implemented protections include bcrypt password hashing, JWT validation, role-based admin authorization, customer order ownership checks, Helmet, configured CORS, authentication rate limiting, MongoDB sanitization, server-side price validation, schema validation, request-size limits and environment-based secrets.' }
    ],
    challenges: [
      { title: 'Catalog identity', body: 'MongoDB is the authoritative catalog source. Stable slugs remain readable in public product URLs, while MongoDB _id values are used for internal relationships and backend operations.' },
      { title: 'Price security', body: 'Order totals are recalculated on the server from current product and coupon data rather than trusting prices submitted by the browser.' },
      { title: 'Authorization boundaries', body: 'Order ownership checks restrict customers to their own order data, and separate role checks protect every admin-only operation.' },
      { title: 'Wishlist continuity', body: 'Guest wishlist state is merged into the authenticated MongoDB-backed wishlist after login so saved products follow the customer account.' },
      { title: 'Inventory integrity', body: 'Checkout validates requested quantities against available stock and updates inventory through guarded backend operations.' }
    ],
    demoUrl: 'https://luma.papputhakur.com',
    sourceUrl: 'https://github.com/pappu2b1/Ecommerce-Website-Demo',
    seoTitle: 'LUMA Full-Stack Ecommerce Platform | Pappu Thakur',
    seoDescription: 'Full-stack ecommerce platform built with React, Node.js, Express and MongoDB featuring authentication, cart, wishlist, checkout, orders and an admin dashboard.',
    screenshots: [{ src: '/projects/luma-ecommerce/luma-home.jpeg', alt: 'LUMA full-stack ecommerce platform homepage', caption: 'LUMA responsive storefront homepage' }],
    screenshotNote: 'One real project screenshot is currently available: the LUMA responsive storefront homepage.',
    limitations: 'Cash on Delivery is the verified checkout workflow. Real online payment processing is not claimed.'
  },
  {
    slug: 'leadflow-crm-dashboard', title: 'LeadFlow CRM Dashboard', category: 'Dashboard Interface', status: 'Additional Development Work', preview: 'crm', featured: false,
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    summary: 'A focused dashboard interface for scanning pipeline health and taking the next action quickly.',
    problem: 'Operators need a compact overview of lead activity without losing the detail needed for follow-up.',
    solution: 'A responsive dashboard layout with clear hierarchy, metrics, visual pipeline cues and concise navigation.', role: 'Frontend implementation',
    features: ['Dashboard hierarchy', 'Responsive card system', 'Pipeline and activity views'],
    limitations: 'Live deployment and repository links are not verified.'
  }
].sort((a, b) => Number(b.slug === 'ecommerce-website-demo') - Number(a.slug === 'ecommerce-website-demo'));
