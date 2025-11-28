/*
 * Items 페이지
 * 아이템 목록 페이지
 *
 * @returns {JSX.Element} Items 페이지
 */

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import styles from "./Items/Items.module.css";

import { useEffect, useState } from "react";

import { instance } from "../lib/axios";

// 페이지네이션 커스텀 hooks
import { usePagination } from "../hooks/usePagination";

export default function Items() {
  const [bestProducts, setBestProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [orderBy, setOrderBy] = useState('recent');

  const { hasPrev, pages, hasNext } = usePagination({
    totalItems: totalCount,
    currentPage: currentPage,
    pageSize
  });

  useEffect(() => {
    const fetchBestProducts = async () => {
      try {
        const { data } = await instance({
          url: "products",
          params: {
            page: 1,
            pageSize: 4,
            orderBy: "favorite",
          },
        });

        setBestProducts(data.list);

        console.log(data.list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBestProducts();
  }, []);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await instance({
          url: "products",
          params: {
            page: currentPage,
            pageSize: pageSize,
            orderBy
          },
        });

        setAllProducts(data.list);
        setTotalCount(data.totalCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, [currentPage, pageSize, orderBy]);

  useEffect(() => {
    const mobileMedia = window.matchMedia("(max-width: 768px)");
    const tabletMedia = window.matchMedia(
      "(min-width: 768px) and (max-width: 1200px)"
    );
    const pcMedia = window.matchMedia("(min-width: 1200px)");

    function handleMobileChange(e) {
      if (e.matches) {
        setPageSize(4);
      }
    }

    function handleTabletChange(e) {
      if (e.matches) {
        setPageSize(6);
      }
    }

    function handlePCChange(e) {
      if (e.matches) {
        setPageSize(10);
      }
    }

    handleMobileChange(mobileMedia);
    handleTabletChange(tabletMedia);
    handlePCChange(pcMedia);

    mobileMedia.addEventListener("change", handleMobileChange);
    tabletMedia.addEventListener("change", handleTabletChange);
    pcMedia.addEventListener("change", handlePCChange);
  }, []);

  const handlePage = (type, value) => {
    switch (type) {
      case "prev":
        setCurrentPage(prev => prev - 1);
        break;
      case "next":
        setCurrentPage(prev => prev + 1);
        break;
      case "number":
        setCurrentPage(value);
        break;
    }
  };

  const handleImageLoad = (e) => {
    if (e.target.naturalWidth === 0) {
      e.target.src = "https://placehold.co/400";
    }
  }
  const handleImageError = (e) => {
    e.currentTarget.src = "https://placehold.co/400";
    e.target.onerror = null;
  }

  const formatPrice = (value) => {
    return new Intl.NumberFormat("ko-KR").format(value);
  };

  return (
    <>
      <Header />
      <main>
        <div className={`container ${styles['items__container']}`}>
          <section className={`${styles['section']} ${styles['bestProducts']}`}>
            <h1 className={`${styles['section__title']}`}>베스트 상품</h1>
            {bestProducts.map((item) => (
              <div key={item.id} className={`${styles['section__item']}`}>
                <div className={`${styles['section__item__imageContainer']}`}>
                  <img className={`${styles['section__item__image']}`} src={item.images[0]} alt={item.description} onLoad={handleImageLoad} onError={handleImageError} />
                </div>
                <div className={`${styles['section__item__text']}`}>
                  <h3 className={`${styles['section__item__title']}`}>{item.name}</h3>
                  <p className={`${styles['section__item__description']}`}>{item.description}</p>
                  <p className={`${styles['section__item__price']}`}>{formatPrice(item.price)}원</p>
                  <p className={`${styles['section__item__favoriteCount']}`}>
                    {item.favoriteCount}
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section className={`${styles['section']} ${styles['allProducts']}`}>
            <div className={`${styles['section__header']}`}>
              <h1 className={`${styles['section__title']}`}>전체 상품</h1>
              <div className={`${styles['section__filter']}`}>
                <ul className={`${styles['section__filter__list']}`}>
                  <li>
                    <button className={`${styles['section__filter__button']} ${orderBy === 'recent' ? styles['section__filter__button--active'] : ''}`} onClick={() => {
                      setOrderBy('recent');
                    }}>최신순</button>
                  </li>
                  <li>
                    <button className={`${styles['section__filter__button']} ${orderBy === 'favorite' ? styles['section__filter__button--active'] : ''}`} onClick={() => {
                      setOrderBy('favorite');
                    }}>인기순</button>
                  </li>
                </ul>
                
              </div>
            </div>
            {allProducts.map((item) => (
              <div key={item.id} className={`${styles['section__item']}`}>
                <div className={`${styles['section__item__imageContainer']}`}>
                  <img className={`${styles['section__item__image']}`} src={item.images[0]} alt={item.description} onLoad={handleImageLoad} onError={handleImageError} />
                </div>
                <div className={`${styles['section__item__text']}`}>
                  <h3 className={`${styles['section__item__title']}`}>{item.name}</h3>
                  <p className={`${styles['section__item__description']}`}>{item.description}</p>
                  <p className={`${styles['section__item__price']}`}>{formatPrice(item.price)}원</p>
                  <p className={`${styles['section__item__favoriteCount']}`}>
                    {item.favoriteCount}
                  </p>
                </div>
              </div>
            ))}
            <div className={`${styles['pagination__container']}`}>
              <ul className={`${styles['pagination__list']}`}>
                {
                  hasPrev && (
                    <li>
                      <button className={`${styles['pagination__button']} ${styles['pagination__item--prev']}`} onClick={() => {
                        handlePage('prev')
                      }}>이전페이지</button>
                    </li>
                  )
                }
                {
                  pages.map((page) => (
                    <li key={page}>
                      <button className={`${styles['pagination__button']} ${page === currentPage ? styles['pagination__item--current'] : ''}`} onClick={() => {
                        handlePage('number', page)
                      }}>{page}</button>
                    </li>
                  ))
                }
                {
                  hasNext && (
                    <li>
                      <button className={`${styles['pagination__button']} ${styles['pagination__item--next']}`} onClick={() => {
                        handlePage('next')
                      }}>다음페이지</button>
                    </li>
                  )
                }
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
