/*
 * Items 페이지
 * 아이템 목록 페이지
 *
 *
 * 미션4 까지는 container padding 조정해줬는데 이번 미션은 또 수정이안되있는데...
 * axios 없이 일단 fetch로 먼저 작업했으니 리팩토링 필요.
 * 디자인이고 뭐고 일단 데이터부터 출력하는 방향으로 처리.
 *
 * @returns {JSX.Element} Items 페이지
 */

import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { useState, useEffect } from 'react';

export default function Items() {
  const [BestProduct, setBestProduct] = useState([]);
  const [products, setProduct] = useState([]);

  const handleError = (e) => {
    console.log(e);
    console.log(e.currentTarget)
  }

  const getBestProduct = async() => {
    try {
      // 이 부분 일단 대충 가지고와서 리팩토링 해야함.
      const res = await fetch('https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite');
      if (res.ok) {
        const {list} = await res.json();
        
        setBestProduct(list);
      }  
    } catch (error) {
      throw new Error(`에러 발생: ${error}`);
    } finally {
      // console.log('일단 종료');
    }
  }

  const AllProduct = async() => {
    try {
      const res = await fetch('https://panda-market-api.vercel.app/products?page=1&pageSize=10');
      if (res.ok) {
        const {list} = await res.json();
        
        setProduct(list);
        console.log(list);
      } else {
        throw new Error(`에러 발생`);  
      }
    } catch (error) {
      throw new Error(`에러 발생: ${error}`);
    } finally {
      // console.log('일단 종료');
    }
  }

  useEffect(() => {
    // useEffect 내부에서 async가 불가하므로, 즉시실행함수로 async await 처리.
    getBestProduct()
    AllProduct();
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="container">
          <section>
            <h1>베스트 상품</h1>
            {BestProduct.map(item => 
              <div key={item.id}>
                <div className="이미지 박스">
                  <img src={item['images'][0]} width="50"/>
                </div>
                <div className="제목 들어가는곳">
                  {item.name} 
                </div>
                <div className="가격 들어가는곳">
                  {item.price}원
                </div>
                <div className="좋아요 들어가는곳">
                  {item.favoriteCount}
                </div>
              </div>
            )}
          </section>
          <section style={{marginTop: '300px'}}>
            <h1>전체 상품</h1>
            {products.map(item => 
              <div key={item.id} style={{marginBottom: '50px'}}>
                <div className="이미지 박스">
                  { !!item['images'].length && <img src={item['images'][0]} width="50" onError={handleError}/> }
                  
                </div>
                <div className="제목 들어가는곳">
                  {item.name} 
                </div>
                <div className="가격 들어가는곳">
                  {item.price}원
                </div>
                <div className="좋아요 들어가는곳">
                  {item.favoriteCount}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}