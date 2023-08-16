import { useRouter } from "next/router";

import ApartmentDetails from "../../components/ApartmentDetails";

const Page = () => {
  const router = useRouter();

  return (
    <ApartmentDetails
      area={false}
      objectUrl={router.query.id}
      query={router.query}
    />
  );
};

export default Page;