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
    overview: 'LUMA is an end-to-end production MERN ecommerce application spanning customer shopping journeys, backend order processing and protected administrative operations. The deployed storefront, Render API and MongoDB Atlas catalog have been verified without claiming real online payment processing.',
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
    slug: 'leadflow-crm-dashboard', title: 'LeadFlow CRM', category: 'Full-Stack CRM / SaaS Dashboard', status: 'Production-Deployed Project', preview: '/projects/leadflow-crm-dashboard/leadflow-crm-dashboard.jpeg', previewAlt: 'LeadFlow CRM dashboard preview', featured: true,
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    fullTech: ['React', 'Vite', 'JavaScript', 'Tailwind CSS', 'React Router', 'Axios', 'Recharts', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Authentication', 'REST API', 'Helmet', 'Express Rate Limit', 'Vercel', 'Render'],
    summary: 'A production-deployed CRM dashboard with lead management, reporting, authentication, MongoDB persistence and a secure read-only public demo.',
    overview: 'LeadFlow CRM is a full-stack lead management application for organizing prospects, follow-ups, activity notes and sales insights. It combines a responsive React dashboard with a secured Express API, MongoDB persistence for private administration and a dedicated synthetic dataset for public portfolio exploration.',
    problem: 'Sales activity becomes difficult to manage when lead details, follow-up dates, notes and pipeline reporting are spread across disconnected tools.',
    solution: 'LeadFlow brings lead records, workflow statuses, follow-up queues, activity notes and reports into one responsive workspace backed by an authenticated REST API.', role: 'Full-Stack Developer',
    features: ['CRM dashboard and sales insights', 'Lead management, details and workflow statuses', 'Search, filtering, sorting and pagination', 'Follow-up queues for overdue, today and upcoming work', 'Activity notes and lead timelines', 'Reports and pipeline analytics', 'JWT authentication and protected API routes', 'Separate private admin and public demo modes', 'Backend-enforced read-only demo authorization', 'Static synthetic demo dataset isolated from private records', 'Production-safe API errors and health monitoring', 'Responsive desktop, tablet and mobile interface'],
    architecture: ['Frontend: React + Vite · Vercel · leadflow.papputhakur.com', 'Backend: Node.js + Express · Render Web Service', 'Database: MongoDB + Mongoose · MongoDB Atlas', 'Authentication: JWT · private admin and read-only demo roles'],
    caseSections: [
      { title: 'Architecture', body: 'React and Vite power the responsive dashboard, Axios communicates with the Node.js and Express REST API over HTTPS, and Mongoose connects private admin workflows to MongoDB Atlas. Vercel hosts the frontend and Render hosts the backend service.' },
      { title: 'Authentication & Security', body: 'JWT authentication protects API access. Production configuration uses environment-controlled secrets, restricted CORS, Helmet security headers, rate limiting, safe error responses and health endpoints for service and database checks.' },
      { title: 'Read-Only Public Demo', body: 'Portfolio visitors can choose Open Live Demo without receiving private credentials. A dedicated short-lived demo role can browse dashboards, leads, follow-ups and reports, while backend authorization rejects every persistent mutation with HTTP 403.' },
      { title: 'Data Isolation', body: 'The public demo reads from a static synthetic fixture rather than MongoDB, preventing future private lead records from appearing in the portfolio experience. Private administrators retain the separate MongoDB-backed management workflow.' },
      { title: 'Deployment', body: 'The production frontend runs on Vercel with a custom LeadFlow subdomain. The Express API runs as a Render Web Service and connects to MongoDB Atlas through production environment configuration.' }
    ],
    challenges: [
      { title: 'Safe public access', body: 'The demo needed to remain useful to visitors without sharing an admin password or allowing writes. Separate JWT claims and centralized backend authorization establish that boundary.' },
      { title: 'Private data isolation', body: 'Demo reads are served from a synthetic in-memory fixture, so the public interface cannot accidentally reveal MongoDB-backed private records.' },
      { title: 'Consistent analytics', body: 'Dashboard, follow-up and report responses preserve the same API shapes for both modes, allowing the frontend to reuse its existing views safely.' }
    ],
    demoUrl: 'https://leadflow.papputhakur.com',
    sourceUrl: 'https://github.com/pappu2b1/leadflow-crm-dashboard',
    seoTitle: 'LeadFlow CRM Dashboard Case Study | Pappu Thakur',
    seoDescription: 'Full-stack CRM dashboard built with React, Node.js, Express and MongoDB, featuring lead management, reporting, secure authentication and a read-only live demo.',
    screenshots: [{ src: '/projects/leadflow-crm-dashboard/leadflow-crm-dashboard.jpeg', alt: 'LeadFlow CRM dashboard preview', caption: 'LeadFlow CRM dashboard interface' }],
    screenshotNote: 'One real project screenshot is published as the LeadFlow CRM card cover and case-study preview.',
    limitations: 'The public portfolio experience is intentionally read-only. Private administrative access and persistent CRM changes are not exposed to visitors.'
  }
].sort((a, b) => { const featuredOrder = ['ecommerce-website-demo', 'leadflow-crm-dashboard']; const rank = (project) => { const index = featuredOrder.indexOf(project.slug); return index === -1 ? featuredOrder.length : index; }; return rank(a) - rank(b); });
