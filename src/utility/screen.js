// 브레이크 포인트 상수
export const BREAK_POINTS = {
  DESKTOP: '1200',
  TABLET: '1199',
  MOBILE: '768',
}

export function getResponsive({desktop, tablet, mobile}) {
  const desktopMedia = window.matchMedia(`(min-width: ${BREAK_POINTS.DESKTOP}px)`);
  const tabletMedia = window.matchMedia(`(max-width: ${BREAK_POINTS.TABLET}px)`);
  const mobileMedia = window.matchMedia(`(max-width: ${BREAK_POINTS.MOBILE}px)`);

  if ( mobileMedia.matches ) return mobile;
  if ( tabletMedia.matches ) return tablet;
  if ( desktopMedia.matches ) return desktop;  

  return desktop;
}