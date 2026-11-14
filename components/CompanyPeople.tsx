import {companyPeople} from "@/lib/company-people";

export default function CompanyPeople() {
  return <section className="hq-section hq-company-people" id="people" aria-labelledby="company-people-heading">
    <div className="hq-kicker"><span>04 / OUR PEOPLE</span><span>FLURZIHQ</span></div>
    <div className="hq-section-heading"><h2 id="company-people-heading">The people<br/>behind FLURZIHQ.</h2></div>
    <div className="hq-company-people-grid">
      {companyPeople.map(person => <article className="hq-company-person" key={person.id} aria-labelledby={"person-" + person.id}>
        <div className={"hq-person-portrait" + (person.image ? "" : " hq-hq-person-portrait-placeholder")}>
          {person.image ? <img src={person.image} alt={person.name} width={640} height={800} loading="lazy" decoding="async"/> : <span className="hq-person-initials" aria-hidden="true">{person.initials}</span>}
        </div>
        <div className="hq-person-details">
          <h3 id={"person-" + person.id}>{person.name}</h3>
          <p className="hq-person-role">{person.role}</p>
          {person.bio && <p className="hq-person-bio">{person.bio}</p>}
        </div>
      </article>)}
    </div>
  </section>;
}
