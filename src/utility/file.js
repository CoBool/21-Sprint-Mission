const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];

export const validateFile = (file) => {
  if (!file) return;

  if( file.size > MAX_SIZE ) return '파일 크기는 5MB 이하여야 합니다.';
  if( !ALLOWED_TYPES.includes(file.type)) return '지원하지 않는 파일 형식입니다.';

  return null;
}