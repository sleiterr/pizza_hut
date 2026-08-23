import SectionPage from "@/components/Section/SectionPage";
import Cart from "@/components/Cart/Cart";
import CartPageHeader from "@/components/Cart/CartPageHeader";

const Page = () => {
  return (
    <SectionPage classSection="bg-bg-cart min-h-screen" className="w-full">
      <div className="mb-20">
        <CartPageHeader />
      </div>
      <Cart />
    </SectionPage>
  );
};

export default Page;
