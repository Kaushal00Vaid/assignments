function Card({ name, description, interests, linkedIn, twitter }) {
  return (
    <>
      <div class="card">
        <h1 class="card-header">{name}</h1>
        <div class="card-body">
          <h5 class="card-title">{description}</h5>
          <h3 class="card-text">Interests</h3>
          <ul>
            {interests.map((inter) => (
              <li>{inter}</li>
            ))}
          </ul>
          <a href={linkedIn} class="btn btn-primary mx-5">
            LinkedIn
          </a>
          <a href={twitter} class="btn btn-primary mx-5">
            Twitter
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
