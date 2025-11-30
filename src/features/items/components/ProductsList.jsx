import { Image } from "../../../components/ui/Image";
import { formatPrice } from "../../../utility/number.js";
import styles from "./ProductsList.module.css";
import { Link } from "react-router";

import HeartIcon from "../../../assets/images/icons/ic_heart.png";
import placeholder from "../../../assets/images/placeholder.svg";

export default function ProductsList({ lists }) {
  return (
    <>
      {lists.map((item) => (
        <div key={item.id} className={`${styles["section__item"]}`}>
          <Link to={`/items/${item.id}`}>
            <div className={`${styles["section__item__imageContainer"]}`}>
              {item.images.length ? (
                <Image src={item.images[0]} fallback={placeholder} />
              ) : (
                <Image src={placeholder} />
              )}
            </div>
            <div className={`${styles["section__item__text"]}`}>
              <h3 className={`${styles["section__item__title"]}`}>
                {item.name}
              </h3>
              <p className={`${styles["section__item__price"]}`}>
                {formatPrice(item.price)}원
              </p>
              <p className={`${styles["section__item__favoriteCount"]}`}>
                <img src={HeartIcon} alt="좋아요" />
                {item.favoriteCount}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
