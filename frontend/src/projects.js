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
    slug: 'indore-job-portal', title: 'Indore Job Portal', category: 'Full-Stack Job Portal', status: 'Project-Based Application', preview: 'jobs', featured: true,
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    summary: 'A role-based job portal experience for discovering opportunities and managing applications.',
    problem: 'Candidates and employers need a straightforward flow from listing to application.',
    solution: 'A responsive portal direction with authentication, job listings, role-aware workflows and duplicate-application prevention.', role: 'Full-stack project development',
    features: ['Registration and login', 'Role-based workflows and JWT protection', 'Job discovery and details', 'User dashboards and applications', 'Duplicate-application prevention'],
    limitations: 'Exhaustive admin CRUD, complete employer management and full file-upload workflows are not claimed complete.'
  },
  {
    slug: 'ecommerce-website-demo', title: 'Ecommerce Website Demo', category: 'Frontend Ecommerce', status: 'Completed Demo', preview: 'shop', featured: true,
    tech: ['React', 'Vite', 'Tailwind CSS'],
    summary: 'A responsive storefront focused on product discovery, filtering and a clear cart journey.',
    problem: 'A small ecommerce product needs an interface that makes browsing and purchase intent easy to understand.',
    solution: 'A responsive catalogue with search, filtering, product details, persistent cart behavior and validated checkout feedback.', role: 'Frontend implementation',
    features: ['Seven responsive pages', 'Search, category filtering and price sorting', 'Product details and related products', 'Persistent local-storage cart', 'Checkout validation and order feedback'],
    limitations: 'Payment processing and production commerce integrations are not included.'
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
];
