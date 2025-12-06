import { useEffect, useMemo } from "react";

export const useFilePreview = (fileObject) => {

  const preview = useMemo(() => {
    if (!fileObject) return null;

    const previews = Object.values(fileObject).map(file => {
      return URL.createObjectURL(file);
    });

    return previews;
  }, [fileObject]);

  // 의존성 배열을 []로 고정! 오직 언마운트 시에만 revoke
  useEffect(() => {
    return () => {
      if (preview) {
        preview.forEach(preview => {
          URL.revokeObjectURL(preview);
        });
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return preview;
};