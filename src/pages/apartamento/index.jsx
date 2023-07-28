import {
    NavSpacing,
    Content,
} from "../../styles/apartamentoStyles";

import Navigation from "../../components/commom/Nav";

const Page = () => {
    return (
      <div>
        <Navigation selectedPage="apartamentos" variant="admin" />
        <NavSpacing />
        <Content>
            hello
        </Content>
      </div>
    );
};
  
export default Page;