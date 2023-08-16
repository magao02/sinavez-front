import { useRouter } from "next/router";

import ApartmentDetails from "../../components/ApartmentDetails";

const Page = () => {
  const router = useRouter();

  return (
    <ApartmentDetails
      area={true}
      objectUrl={router.query.id}
      query={router.query}
    />
  );
};

export default Page;