window.PORTFOLIO_DATA = {
  person: {
    name: "Juner Tadlip",
    initials: "JT",
    role: "Independent software developer",
    email: "junertadlip@gmail.com",
    year: "2026"
  },
  categories: [
    { key: "all", label: "All work" },
    { key: "winforms", label: "Windows Forms" },
    { key: "services", label: "Windows Services" },
    { key: "aspnet", label: "ASP.NET" },
    { key: "web", label: "Websites" },
    { key: "lab", label: "Lab" }
  ],
  projects: [
    {
      id: "cashflow",
      number: "01",
      title: "Cashflow",
      category: "winforms",
      year: "2025",
      role: "Product design + development",
      summary: "System that monitors the movement of money into and out of a company over a certain period of time",
      description: [
        "Integrated WinForms System used to track, categorize, forecast, and optimize the movement of money entering and leaving a business or personal account "
      ],
      highlights: [
        "Assess Liquidity",
        "Evaluate Core Operations",
        "Provide Financial Visibility",
        "Improve Forecasting"
      ],
      stack: ["C#", "WinForms", ".NET framework", "MySQL Server"]
    },
    {
      id: "bankrecon",
      number: "02",
      title: "BankRecon",
      category: "winforms",
      year: "2024",
      role: "Design + development",
      summary: "Ensure the accuracy and integrity of financial records",
      description: [
        "Integrated WinForms System to ensure financial accuracy and integrity by automatically matching internal ledger accounts against external bank statements.",
        "It acts as a critical internal control to verify that a company’s recorded cash balances precisely reflect its actual bank position."
      ],
      highlights: [
        "Catch Errors Early",
        "Detect and Prevent Fraud",
        "Reveal Your True Cash Position"
      ],
      stack: ["C#", "WinForms", "MySQL Server", ".NET"]
    },
    {
      id: "fixedasset",
      number: "03",
      title: "Fixed Asset Management",
      category: "winforms",
      year: "2024",
      role: "Interface design + development",
      summary: "Track, monitor, and optimize an organization's long-term physical assets.",
      description: [
        "to centralize, automate, and optimize how an organization tracks and maintains its high-value, long-term physical assets across their entire lifecycle",
        "from initial procurement to final disposal"
      ],
      highlights: [
        "Accurate Tracking",
        "Financial Precision",
        "Cost Reduction",
        "Better Decision-Making"
      ],
      stack: ["C#", "WinForms", "MySQL Server", ".Net"]
    },
    {
      id: "budgetmonitoring",
      number: "04",
      title: "Budget Monitoring",
      category: "winforms",
      year: "2023",
      role: "Product design + development",
      summary: "Track financial performance in real time to ensure an organizations actual spending and revenue align with its planned financial targets",
      description: [
        "It serves as an early-warning system that prevents overspending, uncovers financial inefficiencies, and ensures strategic goals are funded predictably."
      ],
      highlights: [
        "Real-Time Variance Analysis",
        "Cost Control & Deficit Prevention",
        "Strategic Resource Allocation",
        "Accountable & Data-Driven Decisions"
      ],
      stack: ["C#", "WinForms", "MySQL Server", ".Net"]
    },
    {
      id: "syncbridge",
      number: "06",
      title: "SyncBridge",
      category: "services",
      year: "2025",
      role: "Architecture + development",
      summary: "A scheduled Windows Service that keeps an internal database and a cloud API in step.",
      description: [
        "A background service for moving records between an internal system and a cloud API without manual exports.",
        "Retry queues, structured logs, and a small health endpoint make the service easier to operate when a remote dependency is unavailable."
      ],
      highlights: [
        "Scheduled pull-and-push synchronization",
        "Retry queue with failure isolation",
        "Structured logs and service health checks"
      ],
      stack: ["C#", ".NET Worker", "Windows Service", "REST"]
    },
    {
      id: "sentinel",
      number: "07",
      title: "Sentinel",
      category: "services",
      year: "2024",
      role: "Design + development",
      summary: "Endpoint health monitoring with service checks and alert forwarding.",
      description: [
        "A lightweight Windows Service that watches local services, disk capacity, and heartbeat files, then forwards meaningful alerts to a central channel.",
        "The configuration is deliberately plain: readable rules, predictable intervals, and an audit trail of every alert state change."
      ],
      highlights: [
        "Service, disk, and heartbeat monitors",
        "Rule-based alert forwarding",
        "Local event history for troubleshooting"
      ],
      stack: ["C#", "Windows Service", "Serilog", "PowerShell"]
    },
    {
      id: "deskflow",
      number: "08",
      title: "DeskFlow",
      category: "aspnet",
      year: "2025",
      role: "Full-stack development",
      summary: "A support ticket portal with role-based queues and a clear service view.",
      description: [
        "An ASP.NET portal for an internal support team, covering ticket intake, assignment, attachments, and resolution notes.",
        "Queues are organized by team and priority, with a compact detail view that keeps the conversation and the work history together."
      ],
      highlights: [
        "Role-based queues and assignment views",
        "Threaded notes, attachments, and status history",
        "Responsive layouts for desk and mobile use"
      ],
      stack: ["ASP.NET Core", "Razor Pages", "EF Core", "SQL Server"]
    },
    {
      id: "northline",
      number: "09",
      title: "Northline",
      category: "web",
      year: "2024",
      role: "Design + front-end development",
      summary: "A restrained portfolio site for an independent architecture studio.",
      description: [
        "A marketing site built around a quiet project index, large-format project notes, and a straightforward enquiry path.",
        "The layout gives the work room to breathe while keeping navigation fast and the studio voice consistent across every page."
      ],
      highlights: [
        "Editorial project index and detail layouts",
        "Responsive type and image-led pacing",
        "Accessible navigation and enquiry form"
      ],
      stack: ["HTML", "CSS", "JavaScript", "CMS"]
    },
    {
      id: "cedar-circuit",
      number: "10",
      title: "Cedar & Circuit",
      category: "web",
      year: "2023",
      role: "Design + front-end development",
      summary: "An editorial storefront for an independent electronics shop.",
      description: [
        "A small retail site that pairs product stories with a practical catalogue, stock status, and store details.",
        "The visual system leans on strong typography and careful spacing rather than a dense grid of promotional tiles."
      ],
      highlights: [
        "Product catalogue with category browsing",
        "Stock status and store information",
        "Editorial feature layouts and responsive product views"
      ],
      stack: ["HTML", "CSS", "JavaScript", "Commerce"]
    },
    {
      id: "openbench",
      number: "11",
      title: "OpenBench",
      category: "lab",
      year: "2026",
      role: "Ongoing experiments",
      summary: "A small lab for desktop utilities, automation scripts, and interface ideas.",
      description: [
        "A working space for the smaller tools that do not need a product name: file helpers, automation scripts, and interface experiments.",
        "Some ideas stay small. Others become the starting point for a larger application. This is where the useful ones begin."
      ],
      highlights: [
        "Desktop utility prototypes and workflow experiments",
        "Automation scripts for repetitive internal tasks",
        "Interface patterns tested before they join a larger build"
      ],
      stack: ["C#", ".NET", "PowerShell", "WinForms"]
    }
  ]
};
