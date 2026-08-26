// siteData.ts - Central Data configuration for NIRDESH
export interface NavItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Home', href: 'home' },
  { name: 'Features', href: 'features', hasMegaMenu: true },
  { name: 'Capabilities', href: 'capabilities' },
  { name: 'Pricing', href: 'pricing' },
  { name: 'Docs', href: 'docs' },
  { name: 'Support', href: 'support' },
];

export const MEGA_MENU_CATEGORIES = [
  {
    title: 'Intelligence',
    items: [
      { name: 'AI Core', desc: 'Reasoning and natural language execution engine.', href: 'features#ai-core' },
      { name: 'Memory Graph', desc: 'Maintains context across desktop sessions.', href: 'features#memory' },
      { name: 'Context Awareness', desc: 'Understands active apps and screen state.', href: 'features#context' },
    ],
  },
  {
    title: 'Computer Control',
    items: [
      { name: 'App Control', desc: 'Launch, manage, and arrange desktop apps.', href: 'features#app-control' },
      { name: 'File Intelligence', desc: 'Find, organize, and summarize documents.', href: 'features#files' },
      { name: 'Workflow Automation', desc: 'Turn repetitive steps into single commands.', href: 'features#automation' },
    ],
  },
  {
    title: 'Interaction',
    items: [
      { name: 'Voice Mode', desc: 'Speak naturally to instruct your PC.', href: 'features#voice' },
      { name: 'Vision Engine', desc: 'OCR and screen visual understanding.', href: 'features#vision' },
      { name: 'Natural Language', desc: 'Zero command syntax required.', href: 'features#natural' },
    ],
  },
  {
    title: 'Trust & Safety',
    items: [
      { name: 'Permission Control', desc: 'Granular prompt approvals before actions.', href: 'features#security' },
      { name: 'Privacy First', desc: 'Encrypted storage and local processing option.', href: 'features#privacy' },
      { name: 'Action History', desc: 'Complete audit log of executed routines.', href: 'features#audit' },
    ],
  },
];

export const HERO_CAPABILITY_CARDS = [
  {
    title: 'Understand',
    desc: 'Understands your commands and context like a human.',
    icon: 'Brain',
    color: '#00C8FF',
  },
  {
    title: 'Execute',
    desc: 'Executes tasks, opens apps, controls system and more.',
    icon: 'CheckCircle2',
    color: '#168BFF',
  },
  {
    title: 'Secure',
    desc: '100% private, runs on your PC with full data protection.',
    icon: 'ShieldCheck',
    color: '#2855FF',
  },
  {
    title: 'Automate',
    desc: 'Automate repetitive tasks and boost your productivity.',
    icon: 'Zap',
    color: '#7437FF',
  },
  {
    title: 'Manage',
    desc: 'Manage files, apps, settings and workflows easily.',
    icon: 'PieChart',
    color: '#A760FF',
  },
];

export const BENTO_CARDS = [
  {
    title: 'AI Core Reasoning',
    desc: 'Translates complex human instructions into sequential execution plans with fail-safe error handling.',
    badge: 'Core Engine',
    colSpan: 'col-span-1 md:col-span-2',
    gradient: 'from-blue-600/20 to-cyan-500/10'
  },
  {
    title: 'Visual Screen OCR',
    desc: 'Understands text, elements, buttons, and layouts on any active screen in real-time.',
    badge: 'Vision v2',
    colSpan: 'col-span-1',
    gradient: 'from-violet-600/20 to-purple-500/10'
  },
  {
    title: 'Persistent Context Memory',
    desc: 'Remembers past conversations, file locations, preferences, and project goals across reboots.',
    badge: 'Memory Net',
    colSpan: 'col-span-1',
    gradient: 'from-purple-600/20 to-blue-500/10'
  },
  {
    title: 'Workflow Automation',
    desc: 'Chain complex desktop actions (VS Code + Browser + Spotify + Notes) into a single trigger word.',
    badge: 'Macro Engine',
    colSpan: 'col-span-1 md:col-span-2',
    gradient: 'from-cyan-600/20 to-emerald-500/10'
  },
  {
    title: 'Natural Voice Control',
    desc: 'Sub-300ms latency voice interface with customizable activation keyword.',
    badge: 'Voice Live',
    colSpan: 'col-span-1',
    gradient: 'from-blue-600/20 to-indigo-500/10'
  },
  {
    title: 'Zero-Trust Permission Guard',
    desc: 'Every system modification, file write, or terminal script requires your explicit click approval.',
    badge: 'Security',
    colSpan: 'col-span-1 md:col-span-2',
    gradient: 'from-emerald-600/20 to-cyan-500/10'
  }
];

export const INTEGRATIONS = [
  { name: 'VS Code', icon: 'Code' },
  { name: 'Chrome', icon: 'Globe' },
  { name: 'Edge', icon: 'Globe' },
  { name: 'Terminal', icon: 'Terminal' },
  { name: 'File Explorer', icon: 'Folder' },
  { name: 'GitHub', icon: 'GitBranch' },
  { name: 'Notion', icon: 'FileText' },
  { name: 'Spotify', icon: 'Music' },
  { name: 'Discord', icon: 'MessageSquare' },
  { name: 'Slack', icon: 'Slack' },
  { name: 'MS Office', icon: 'Briefcase' },
  { name: 'Google Drive', icon: 'Cloud' }
];

export const PRICING_TIERS = [
  {
    name: 'Free',
    priceMonthly: '$0',
    priceYearly: '$0',
    desc: 'Essential desktop AI commands & basic file assistance.',
    features: [
      'Core natural language commands',
      'Basic file search & open',
      'Local context memory (100 items)',
      'Community Discord support',
      'Manual task approval'
    ],
    highlight: false,
    cta: 'Get Started Free'
  },
  {
    name: 'Pro',
    priceMonthly: '$19',
    priceYearly: '$15',
    desc: 'Full power desktop agent with vision, voice & endless workflows.',
    features: [
      'Everything in Free',
      'Unlimited Workflow Automations',
      'Real-time Screen Vision & OCR',
      'Sub-300ms Voice Mode',
      'Infinite Context Memory Graph',
      'Cloudflare Sync & Backup',
      'Priority Support'
    ],
    highlight: true,
    badge: 'Most Popular',
    cta: 'Launch Pro Trial'
  },
  {
    name: 'Team / Enterprise',
    priceMonthly: '$49',
    priceYearly: '$39',
    desc: 'Centralized admin controls, shared workflows & enterprise privacy.',
    features: [
      'Everything in Pro',
      'Shared Team Automation Library',
      'Centralized Access Security Rules',
      'Custom LLM & Private Server Binding',
      'Dedicated Account Manager',
      '99.9% Service SLA'
    ],
    highlight: false,
    cta: 'Contact Sales'
  }
];

export const FAQ_ITEMS = [
  {
    q: 'What is Nirdesh?',
    a: 'Nirdesh is an intelligent AI PC Agent designed to run on your local machine. It understands natural language instructions, manages files, launches applications, executes complex routines, and sees your screen.'
  },
  {
    q: 'Does Nirdesh require an internet connection?',
    a: 'Nirdesh can operate with local offline models for core file management and app execution. Cloud services (like web search or high-tier vision) utilize secure API bridges.'
  },
  {
    q: 'How does Nirdesh ensure security and privacy?',
    a: 'Security is paramount. Nirdesh will prompt you for explicit approval before executing file alterations, system setting changes, or running shell commands. You remain in 100% control.'
  },
  {
    q: 'What operating systems are supported?',
    a: 'Nirdesh is optimized for Windows 10 and Windows 11 (64-bit). macOS and Linux client versions are currently in active beta.'
  },
  {
    q: 'Can I integrate my own custom API keys or local LLM?',
    a: 'Yes! Pro and Team accounts allow binding custom OpenAI, Anthropic, Gemini, or local Ollama endpoints directly inside the settings hub.'
  }
];
