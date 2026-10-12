/** Corporate content: founder's October 2026 reply; see docs/CORPORATE-TRANSFORMATION.md. */
export const COMPANY={name:"Flurzi Limited",meaning:"Fear Limits Us, Rising Zeal Imprints",number:"16640198",address:"Suite G04 1 Quality Court, Chancery Lane, London, England, WC2A 1HR",record:"https://find-and-update.company-information.service.gov.uk/company/16640198",email:"",phone:"",phoneHref:""};
export const MISSION="To develop accessible, intelligent and dependable technology that empowers individuals, businesses and organisations to overcome limitations, simplify complex processes and unlock new opportunities.";
export const VISION="To establish Flurzi Limited as a globally recognised technology company delivering innovative digital products and solutions across e-commerce, financial technology, workforce management, entertainment and emerging technologies.";
export const SITE_LINKS=[{href:"/about",label:"Company"},{href:"/products",label:"Ecosystem"},{href:"/innovation",label:"Technology & Innovation"},{href:"/partnerships",label:"Partnerships"},{href:"/contact",label:"Contact"}];
export const LEGAL_LINKS=[{href:"/privacy-policy",label:"Privacy policy"},{href:"/terms",label:"Terms of service"},{href:"/disclaimer",label:"Disclaimer"},{href:"/data-protection",label:"Data protection"}];
export type Platform={slug:string;name:string;category:string;sector:string;audience:string;url:string;linkLabel:string;image:string;imageCaption:string;brandArtwork?:{thumbnail:string;thumbnailWidth?:number;thumbnailHeight?:number;mobileArtwork?:string;width:number;height:number;background:string};colour:string;accent:string;status:string;stage:"operational"|"launch"|"expansion"|"development";summary:string;description:string;features:{title:string;body:string;release:"v1"|"development"}[];downloads?:{label:string;url:string}[];loginUrl?:string;note:string;enquiry:string};
export const platforms:Platform[]=[
  {
    "slug": "endnovel",
    "name": "EndNovel",
    "category": "Reading & audio",
    "sector": "Entertainment",
    "audience": "Readers and listeners",
    "url": "https://endnovel-flurzi.com/",
    "linkLabel": "Visit EndNovel",
    "image": "/media/endnovel.webp",
    "imageCaption": "EndNovel · Operational platform",
    "colour": "#e5d9be",
    "accent": "#a2783b",
    "status": "Version 1 available",
    "stage": "operational",
    "summary": "A home for digital reading, storytelling and audiobook entertainment.",
    "description": "EndNovel brings stories to readers and listeners. The operational platform is part of Flurzi's work in digital culture: helping people discover stories and return to the worlds that interest them.",
    "features": [
      {
        "title": "Digital reading",
        "body": "Explore stories and continue through chapters at your own pace.",
        "release": "v1"
      },
      {
        "title": "Story discovery",
        "body": "Find titles and build a reading journey around your interests.",
        "release": "v1"
      },
      {
        "title": "Audiobook entertainment",
        "body": "Discover the platform's audio storytelling offering and current access options.",
        "release": "v1"
      }
    ],
    "note": "Visit EndNovel for its current catalogue, availability, account options and platform terms.",
    "enquiry": "EndNovel enquiry",
    "downloads": [
      {
        "label": "Download for Android",
        "url": "https://play.google.com/store/apps/details?id=com.endnovel.endnovel_app"
      },
      {
        "label": "Download for iPhone and iPad",
        "url": "https://apps.apple.com/app/id6782002330"
      }
    ]
  },
  {
    "slug": "flurzi360",
    "name": "Flurzi360",
    "category": "Workforce technology",
    "sector": "Business",
    "audience": "Businesses, HR teams and workforce administrators",
    "url": "https://app.sponsorsafe-hr.com/signup",
    "linkLabel": "Register for Version 1",
    "image": "/media/flurzi360-brand.webp",
    "imageCaption": "Flurzi360 · Brand identity",
    "brandArtwork": {"thumbnail":"/media/flurzi360-preview.webp","thumbnailWidth":800,"thumbnailHeight":334,"mobileArtwork":"/media/flurzi360-mobile","width":1600,"height":667,"background":"#fbfcfd"},
    "colour": "#dbe7ed",
    "accent": "#217ac0",
    "status": "Version 1 available",
    "stage": "expansion",
    "summary": "A global business workforce operating system spanning HR, compliance, finance and operations.",
    "description": "Flurzi360 is the new identity of SponsorSafe HR. Version 1 is available through the existing workforce platform, while the expanded global business workforce operating system is being developed. The current release focuses on employee records and compliance administration; the broader HR, finance and operations scope is a development programme.",
    "features": [
      {
        "title": "Employee records & documents",
        "body": "The existing workforce platform provides employee records and document storage for business administration.",
        "release": "v1"
      },
      {
        "title": "Compliance administration",
        "body": "The current platform advertises expiry reminders, evidence tracking and audit exports. Availability depends on the selected plan and jurisdiction.",
        "release": "v1"
      },
      {
        "title": "HR & people operations",
        "body": "The expansion includes broader recruitment, onboarding, scheduling and attendance workflows. These are development areas, not a claim of availability in Version 1.",
        "release": "development"
      },
      {
        "title": "Finance & operations",
        "body": "Payroll-related workflows, workforce finance and wider business operations form part of the expanded platform direction. They are still in development.",
        "release": "development"
      }
    ],
    "note": "Register directly through the existing SponsorSafe HR application while the Flurzi360 identity is introduced. No mandatory demonstration or sales call is required. The new branded domain and complete Version 1 feature matrix await confirmation. Flurzi360 does not offer jobs or visa sponsorship.",
    "enquiry": "Flurzi360 business enquiry",
    "loginUrl": "https://app.sponsorsafe-hr.com/login"
  },
  {
    "slug": "commit",
    "name": "Flurzi Commit",
    "category": "Financial commitments",
    "sector": "Finance",
    "audience": "People working towards structured savings and financial commitments",
    "url": "https://www.flurzicommit.com/landing",
    "linkLabel": "View current website",
    "image": "/media/commit-brand.webp",
    "imageCaption": "Flurzi Commit · Brand identity",
    "brandArtwork": {"thumbnail":"/media/commit-mark.webp","width":1024,"height":682,"background":"#122344"},
    "colour": "#d9e8df",
    "accent": "#277762",
    "status": "Preparing for launch",
    "stage": "launch",
    "summary": "A structured savings and financial commitment platform preparing for launch.",
    "description": "Flurzi Commit is a structured savings and financial commitment concept designed to help people organise goals and follow through on commitments. It is preparing for launch, with financial integrations still pending. Flurzi does not hold customer funds or provide regulated financial services through this website or the announced product concept.",
    "features": [
      {
        "title": "Structured savings",
        "body": "The product direction centres on bringing structure to savings goals and commitments.",
        "release": "development"
      },
      {
        "title": "Financial commitment",
        "body": "A focused platform for organising the commitments people choose to work towards.",
        "release": "development"
      },
      {
        "title": "Launch preparation",
        "body": "Financial integrations remain pending. Confirmed access, service scope and applicable terms will accompany availability.",
        "release": "development"
      }
    ],
    "note": "No deposits, transfers, investments or fund-custody services are available here. Any future financial functionality depends on confirmed provider arrangements, applicable requirements and published platform terms.",
    "enquiry": "Flurzi Commit enquiry"
  },
  {
    "slug": "flurzix",
    "name": "FlurziX",
    "category": "Digital commerce",
    "sector": "Business",
    "audience": "Shoppers, independent sellers, retailers and merchants",
    "url": "",
    "linkLabel": "",
    "image": "",
    "imageCaption": "",
    "colour": "#dceaff",
    "accent": "#2862bd",
    "status": "Under development",
    "stage": "development",
    "summary": "A commerce platform being developed around trust, verification, inspection and traceability.",
    "description": "FlurziX is a commerce initiative for shoppers and businesses, with trust at the centre of its intended experience. Its development direction brings together verification, inspection information and traceability to help people make better-informed trading decisions. These capabilities are planned and are not being presented as operational.",
    "features": [
      {
        "title": "Trust & verification",
        "body": "Planned verification workflows are intended to help people assess who they are dealing with. Verification criteria and service scope remain under development.",
        "release": "development"
      },
      {
        "title": "Inspection information",
        "body": "Inspection-related workflows form part of the intended product concept. Coverage, providers and the inspection process will be confirmed before availability.",
        "release": "development"
      },
      {
        "title": "Traceability",
        "body": "The product direction includes traceable information and records to support transparency in commerce. No certification, guarantee or specific tracking technology is being claimed.",
        "release": "development"
      }
    ],
    "note": "FlurziX is under development. Verification, inspection and traceability are intended capabilities; the detailed operating model, commercial terms and launch timing are not yet confirmed.",
    "enquiry": "FlurziX enquiry"
  },
  {
    "slug": "flurzirush",
    "name": "FlurziRush",
    "category": "Gaming & interaction",
    "sector": "Entertainment",
    "audience": "Players seeking accessible gaming and interactive entertainment",
    "url": "",
    "linkLabel": "",
    "image": "/media/flurzirush-brand.webp",
    "imageCaption": "FlurziRush · Brand artwork; platform under development",
    "brandArtwork": {"thumbnail":"/media/flurzirush-thumb.webp","width":1000,"height":1000,"background":"#000000"},
    "colour": "#e5ebbe",
    "accent": "#65771b",
    "status": "Under development",
    "stage": "development",
    "summary": "Gaming and interactive entertainment, with room for future community experiences.",
    "description": "Previously known as PlayVault, FlurziRush is being developed for accessible gaming across web and mobile. The direction includes younger audiences as well as a broader player community, with a focus on discovery and personalisation.",
    "features": [
      {
        "title": "Play & discovery",
        "body": "Planned areas include games, discovery, recommendations, player profiles and personalisation.",
        "release": "development"
      },
      {
        "title": "Web & mobile",
        "body": "The roadmap includes web, iOS and Android experiences, supported by advertising and rewarded-ad options.",
        "release": "development"
      },
      {
        "title": "Future community",
        "body": "Community, streamer, follower and live-interaction features are future directions, not available launch features.",
        "release": "development"
      }
    ],
    "note": "FlurziRush is under development. The initial launch is not intended to pay users cash for playing. The PlayVault identity was renamed FlurziRush in October 2026.",
    "enquiry": "FlurziRush enquiry"
  },
  {
    "slug": "cortex",
    "name": "Flurzi Cortex",
    "category": "Intelligent systems",
    "sector": "Technology",
    "audience": "Future technology and infrastructure use cases",
    "url": "",
    "linkLabel": "",
    "image": "",
    "imageCaption": "",
    "colour": "#d9eaf0",
    "accent": "#227888",
    "status": "Under development",
    "stage": "development",
    "summary": "Intelligent technology systems and supporting infrastructure.",
    "description": "Flurzi Cortex represents the company's development work in intelligent technology systems and supporting infrastructure. More detailed product specifications will define its capabilities and intended applications.",
    "features": [
      {
        "title": "Intelligent systems",
        "body": "The approved direction is the development of intelligent technology systems.",
        "release": "development"
      },
      {
        "title": "Supporting infrastructure",
        "body": "Supporting infrastructure is part of the initiative's stated scope. Detailed specifications remain to be confirmed.",
        "release": "development"
      }
    ],
    "note": "Flurzi Cortex is under development. Specific models, APIs, cloud services, access arrangements and launch timing have not been announced.",
    "enquiry": "Flurzi Cortex enquiry"
  },
  {
    "slug": "cinema",
    "name": "Flurzi Cinema",
    "category": "Film & entertainment",
    "sector": "Entertainment",
    "audience": "Film and digital entertainment audiences",
    "url": "https://flurzicinema.com/",
    "linkLabel": "View current website",
    "image": "/media/cinema.webp",
    "imageCaption": "Flurzi Cinema · Development website",
    "colour": "#e5ddd1",
    "accent": "#956d3b",
    "status": "In development",
    "stage": "development",
    "summary": "A digital film and entertainment platform in development.",
    "description": "Flurzi Cinema is part of the company's expanding entertainment direction. It is being developed around digital film and entertainment experiences. A public website is available, while the service itself remains in development.",
    "features": [
      {
        "title": "Digital film",
        "body": "Film forms the core of the intended entertainment experience.",
        "release": "development"
      },
      {
        "title": "Entertainment experience",
        "body": "The platform is being developed to bring digital entertainment to its audiences.",
        "release": "development"
      }
    ],
    "note": "A public website does not indicate an operational viewing service. Catalogue, features, licensing, access and launch availability will be confirmed by the platform.",
    "enquiry": "Flurzi Cinema enquiry"
  }
];
export const directions=[{title:"Business & workforce",body:"Tools for organisations, people and commerce. Flurzi360 has an available Version 1 and a broader workforce programme in development. FlurziX explores trust, verification, inspection and traceability in commerce.",slugs:["flurzi360","flurzix"]},{title:"Culture & entertainment",body:"Stories people return to and new ways to play and watch. EndNovel is operational; FlurziRush and Flurzi Cinema are in development.",slugs:["endnovel","flurzirush","cinema"]},{title:"Financial commitments",body:"A structured approach to savings and financial commitments through Flurzi Commit, with financial integrations pending.",slugs:["commit"]},{title:"Intelligent technology",body:"Intelligent technology systems and supporting infrastructure through the development of Flurzi Cortex.",slugs:["cortex"]}];
export const ventures=platforms.filter(p=>p.stage==="development").map(p=>({...p,areas:p.features.map(f=>f.title)}));
