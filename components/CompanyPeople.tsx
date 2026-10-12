import {companyPeople} from "@/lib/company-people";

export default function CompanyPeople() {
  return <section className="corp-section company-people" id="people" aria-labelledby="company-people-heading">
    <div className="corp-kicker"><span>04 / OUR PEOPLE</span><span>FLURZI LIMITED</span></div>
    <div className="corp-section-heading"><h2 id="company-people-heading">The people<br/>behind Flurzi.</h2></div>
    <div className="company-people-grid">
      {companyPeople.map(person => <article className="company-person" key={person.id} aria-labelledby={"person-" + person.id}>
        <div className={"person-portrait" + (person.image ? "" : " person-portrait-placeholder")}>
          {person.image ? <img src={person.image} alt={person.name} width={640} height={800} loading="lazy" decoding="async"/> : <span className="person-initials" aria-hidden="true">{person.initials}</span>}
        </div>
        <div className="person-details">
          <h3 id={"person-" + person.id}>{person.name}</h3>
          <p className="person-role">{person.role}</p>
          {person.bio && <p className="person-bio">{person.bio}</p>}
        </div>
      </article>)}
    </div>
  </section>;
}
