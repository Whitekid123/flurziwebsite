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
  {id: "rayzin", name: "Rayzin", role: "Social Media Manager", initials: "R", image: "", bio: ""},
  {id: "dessie", name: "Dessie", role: "Authoress", initials: "D", image: "", bio: ""},
];
