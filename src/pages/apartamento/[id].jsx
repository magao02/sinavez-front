import { useRouter } from "next/router";

import ApartmentDetails from "../../components/ApartmentDetails";

const Page = () => {
  const router = useRouter();

  return (
    <ApartmentDetails
      area={false}
      objectUrl={router.query.id}
      query={{
        adultos: router.query.adultos,
        criancas: router.query.criancas,
        bebes: router.query.bebes,
        animais: router.query.animais,
      }}
    />
  );
};

export default Page;