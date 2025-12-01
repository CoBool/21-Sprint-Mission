import { useParams } from "react-router";

import { fetchItem, fetchItemComment } from '../features/items/api/itemsApi'
import { useEffect } from "react";
import { useState } from "react";

const ListComments = function ({comments}) {
  if ( !comments.length ) {
    return (<div>코멘트가 없습니다.</div>)
  }

  if ( comments.length ) {
    return (
      comments.map(comment => <div key={comment.id}>{comment.content}</div>)
    )
  }
}

export default function ItemDetail() {
  const { itemId } = useParams();

  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    fetchItem(itemId).then((data) => {
      setDetail(data);
    });

    fetchItemComment(itemId).then(({list, nextCursor}) => {
      if ( list ) {
        setComments(list);
      }

      if ( nextCursor ) {
        setCursor(nextCursor);
      }
    })
  }, [itemId]);

  /** 
   * 코멘트 더 가지고 오는 로직 잘못된거같음.
   * 이 부분 조건부 렌더링이 제대로 작동안하는걸 보니 null 값을 설정했음에도 불구하고 버튼이 계속 보이는중.
   * 나중에 수정.
   * ..? 내가 문제가 아닌데 이건.. 서버에서 nextCursor를 더 주는데..?
  */
  const moreComments = function() {
    fetchItemComment(itemId, 5, cursor).then(({list, nextCursor}) => {
      if ( list ) {
        setComments(prev => [...prev, ...list]);
      }

      setCursor(nextCursor);
    })
  };
  
  return (
    <>
      <main>
        <div className={`container`}>
          <h1>ItemDetail 임시 데이터 표현!</h1>
          
          <p>상품명 : {detail.name}</p>
          <p>상품설명 : {detail.description}</p>
          <p>좋아요 : {detail.favoriteCount}</p>
          <p>가격 : {detail.price}</p>
          <div>
            <p>상품 태그</p>
            { !!detail?.tags?.length && detail?.tags?.map((tag) => <div key={tag}># {tag}</div>)}
          </div>
          <div>
            <p>이미지 목록</p>
            { !!detail?.images?.length && detail?.images?.map((image, idx) => <div key={image + idx}>이미지 링크 : {image}</div>) }
          </div>
          <p>등록 : {detail.ownerNickname}</p>

          <div>
            <h1>코멘트 목록</h1>
            <ListComments comments={comments}/>
            { cursor && <button onClick={moreComments}>코멘트 더 가지고오기{cursor}</button> }
          </div>
        </div>
      </main>
    </>
  );
}
