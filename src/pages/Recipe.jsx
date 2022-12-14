import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_MY_API}`
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData);
  };
  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <div
          className="btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredient" ? "active" : ""}
            onClick={() => setActiveTab("ingredient")}
          >
            Ingredients
          </Button>
        </div>
        {activeTab === "instructions" && (
          <div>
            <h2>Instructions:</h2>
            <h4
              className="instructions"
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            ></h4>
          </div>
        )}

        {activeTab === "ingredient" && (
          <div>
            <h2>Ingredients required to make "{details.title}":</h2>
            <ul>
              {details.extendedIngredients.map((ingredient) => (
                <li key={ingredient.id}>
                  <h4>{ingredient.original}</h4>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin-top: 2rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: #feba83;
    color: #282c3f;
  }

  h2 {
    margin: 1.5rem 0rem;
  }
  img {
    height: 15rem;
  }
  li {
    font-size: 1rem;
  }
  ul {
    margin-top: 2rem;
  }
  .instructions {
  }
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      height: 12rem;
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #282c3f;
  background: white;
  border: 2px solid #282c3f;
  margin-right: 2rem;
  margin-top: 4.7rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  @media (max-width: 900px) {
    margin-right: 1rem;
    margin-top: 2rem;
    padding: 1rem 1rem;
  }
`;

const Info = styled.div`
  margin-left: 4rem;
  @media (max-width: 900px) {
    margin-left: 1.5rem;
  }
`;

export default Recipe;
