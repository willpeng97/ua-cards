import styled from 'styled-components';

const NoticeContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: var(--neutral-800);
  font-size: var(--font-size-xxl);
  margin-bottom: 2.5rem;
  text-align: center;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const Content = styled.div`
  color: var(--neutral-600);
  line-height: 2;
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const List = styled.ol`
  list-style-type: decimal;
  padding-left: 2rem;
  margin: 1.5rem 0;
`;

const ListItem = styled.li`
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const NoticePage = () => {
  return (
    <NoticeContainer>
      <Title>購買規範</Title>
      
      <Section>
        <Content>
          買家在此平台或賣貨便訂購卡片即代表同意以下規範：
        </Content>
        <List>
          <ListItem>
            為避免交易糾紛，買家收到商品後，請在提醒貼紙（每個包裝上都有貼提醒您開封錄影的貼紙，很大張）完整狀況下進行錄影開封，提供相關影片給我們後，若有缺少卡片的情況將會補償。若買家沒有錄影，或是影片開始時貼紙已遭毀損，我方有權利不予以補償。
          </ListItem>
          <ListItem>
            除非卡片有重大瑕疵（如卡損），證明方式同第一點，不然拆封後我方將有權利不接受退換貨。
          </ListItem>
          <ListItem>
            本平台皆透過賣貨便進行實際買賣，下訂後請於20分鐘內在賣貨便填入電話及總金額，若未填入則商品將重新記入庫存，若金額不正確則會取消賣貨便訂單，不另行通知。
          </ListItem>
        </List>
      </Section>
    </NoticeContainer>
  );
};

export default NoticePage; 