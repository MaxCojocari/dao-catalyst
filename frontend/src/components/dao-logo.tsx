import styled from "styled-components";

interface DaoLogoProps {
  imageUri: string;
  name: string;
}

export const DaoLogo = ({ imageUri, name }: DaoLogoProps) => {
  return (
    <Logo>
      <img src={imageUri} alt={`${name}-logo`} /> {name}
    </Logo>
  );
};

const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 17px;
  letter-spacing: -0.02em;

  color: #292933;

  img {
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;
