import { Image } from "../../../components/ui/Image";
import { formatPrice } from "../../../utility/number.js";
import styles from "./lists/lists.module.css";

import placeholder from '../../../assets/images/placeholder.svg'

export default function AllProducts({ lists }) {
  return (
    <>
      {lists.map((item) => (
        <div key={item.id} className={`${styles["section__item"]}`}>
          <div className={`${styles["section__item__imageContainer"]}`}>
            {item.images.length ? <Image src={item.images[0]} fallback={placeholder} /> : <Image src={placeholder} />}
          </div>
          <div className={`${styles["section__item__text"]}`}>
            <h3 className={`${styles["section__item__title"]}`}>{item.name}</h3>
            <p className={`${styles["section__item__price"]}`}>
              {formatPrice(item.price)}원
            </p>
            <p className={`${styles["section__item__favoriteCount"]}`}>
              {item.favoriteCount}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
