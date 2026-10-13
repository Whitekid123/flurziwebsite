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
  {id: "praise", name: "Praise", role: "Manager, EndNovel Coordinator", initials: "P", image: "", bio: ""},
  {id: "sharon-bungei", name: "Sharon Jebet Bungei", role: "Social Media Manager", initials: "SJB", image: "/media/team/sharon-jebet-bungei.jpg", bio: "Sharon Jebet Bungei is the Social Media Manager at Flurzi Limited, responsible for strengthening the company’s digital presence through strategic content creation, social media management, and audience engagement. She combines creativity and digital communication skills to enhance Flurzi’s brand visibility, connect with its target audience, and support its growth."},
  {id: "dessie", name: "Dessie", role: "Authoress", initials: "D", image: "", bio: ""},
];
