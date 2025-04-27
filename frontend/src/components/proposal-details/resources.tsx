import styled from "styled-components";
import emptyIcon from "../../assets/images/empty-state.svg";
import { Container } from "../common-styles";

export const ResourcesSection = ({
  resources,
}: {
  resources: { label: string; url: string }[];
}) => {
  const hasValidResources = resources?.some(
    (r) => r.label.trim() !== "" || r.url.trim() !== ""
  );

  return (
    <Container
      style={{ justifyContent: !hasValidResources ? "center" : "flex-start" }}
    >
      {hasValidResources ? (
        <>
          <h1>Resources</h1>
          <List>
            {resources?.map((resource, i) =>
              resource?.label || resource?.url ? (
                <Link key={i}>
                  <p>{resource.label}</p>
                  <a href={resource.url} target="_blank" rel="noreferrer">
                    {resource.url}
                  </a>
                </Link>
              ) : null
            )}
          </List>
        </>
      ) : (
        <Empty>
          <img src={emptyIcon} alt="No resources" width="150px" />
          <p>No resources were added</p>
        </Empty>
      )}
    </Container>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

export const Link = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;

  p {
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #6c63ff;
    margin-bottom: 7px;
  }

  a {
    color: #292933;
    text-decoration: none;
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    letter-spacing: -0.02em;
    cursor: pointer;
    display: inline-block;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Empty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 32px 0;
  width: 100%;

  p {
    font-weight: 300;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #4f4f5c;
  }
`;
