/**
 * 안전한 이미지 컴포넌트
 *
 * - src가 없으면 렌더링 자체를 하지 않음.
 * - 이미지 로딩 실패(onError) 시 fallback 이미지로 대체.
 * - fallback 이미지도 실패하지 않도록 onerror 핸들러를 제거해 무한 루프 방지.
 * - rest porps를 받아서 더 폭넓게 대응할 수 있지만 지금은 진행하지않음.
 */
export function Image({ src, alt = "", className = "", fallback = "https://placehold.co/400" }) {

  if(!src) return null;

  const handleImageError = (e) => {
    // fallback에서도 onError가 계속 발생해 무한 루프 도는 걸 방지
    e.target.onerror = null;
    // 실패한 이미지를 fallback으로 교체
    e.currentTarget.src = fallback;
  };

  return <img className={className} src={src} alt={alt} onError={handleImageError} />;
}