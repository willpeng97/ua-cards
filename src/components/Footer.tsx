import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: white;
  padding: 0.5rem;
  text-align: center;
  width: 100%;
  position: relative;
  bottom: 0;
`;

const FooterText = styled.p`
  color: var(--neutral-600);
  font-size: 0.8rem;
`;

const FooterLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: var(--primary-dark);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        The copyright of all cards' images are belong to BANDAI CO.,LTD.
      </FooterText>
      <FooterText>
        The website will be removed if there is any loss incurred to your copyrighted product.
      </FooterText>
      <FooterText>
        Please contact me by Email <FooterLink href="mailto:youfcard@gmail.com">youfcard@gmail.com</FooterLink>.
      </FooterText>
    </FooterContainer>
  );
};

export default Footer; 