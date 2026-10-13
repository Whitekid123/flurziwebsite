export type CompanyPerson = {
  id: string;
  name: string;
  role: string;
  initials: string;
  image: string;
  bio: string;
};

// Names and roles supplied in the founder's October 2026 reply.
// Add approved photo paths (for example /media/team/josh.webp) and biographies here.
// Empty fields show an initials placeholder and omit the biography.
export const companyPeople: CompanyPerson[] = [
  {id: "david", name: "Kamsiriochi David Emmanuel", role: "Founder and Director", initials: "KDE", image: "", bio: ""},
  {id: "josh", name: "Josh", role: "Senior Developer and Operational Manager", initials: "J", image: "", bio: ""},
  {id: "praise", name: "Praise Oshin", role: "Manager | EndNovel Coordinator | Software Developer", initials: "PO", image: "/media/team/praise-oshin.jpg", bio: "Praise Oshin is a Manager, EndNovel Coordinator, and Software Developer at Flurzi Limited, responsible for coordinating EndNovel's operations, supporting platform development, and ensuring the smooth execution of digital projects. He combines technical expertise, leadership, and project management skills to improve platform functionality, streamline workflows, and deliver innovative digital solutions. Through his work, he contributes to Flurzi's technological advancement, operational efficiency, and continued growth."},
  {id: "sharon-bungei", name: "Sharon Jebet Bungei", role: "Social Media Manager", initials: "SJB", image: "/media/team/sharon-jebet-bungei.jpg", bio: "Sharon Jebet Bungei is the Social Media Manager at Flurzi Limited, responsible for strengthening the company’s digital presence through strategic content creation, social media management, and audience engagement. She combines creativity and digital communication skills to enhance Flurzi’s brand visibility, connect with its target audience, and support its growth."},
  {id: "modesola-oguntuyo", name: "Modesola Oguntuyo", role: "Creative Writer and Authoress", initials: "MO", image: "/media/team/modesola-oguntuyo.png", bio: "Modesola Oguntuyo is a creative writer and authoress at Flurzi Limited, responsible for developing engaging literary content and crafting compelling stories that captivate diverse audiences. She combines creativity, imagination, and storytelling expertise to create memorable characters, emotionally engaging narratives, and unique reading experiences. Through her work, she contributes to Flurzi Limited’s creative vision, strengthens its digital content offerings, and supports the company’s commitment to delivering innovative and engaging experiences."},
];
