import { MenuCategories } from "@/sanity/types";
import { MENU_QUERY_RESULT } from "@/sanity/types";

type MenuCardProps = {
  menuData: MENU_QUERY_RESULT;
};

const MenuCard = ({ menuData }: MenuCardProps) => {
  return (
    <>
      {menuData?.map((category, idx) => (
        <div key={category._id || idx}>
          <h2>{category.title}</h2>
          <div>
            {category.items?.map((item, itemIdx) => (
              <div key={item._key || itemIdx}>
                <h3>{item.name}</h3>
                <p>{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuCard;
