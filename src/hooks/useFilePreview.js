import { useEffect, useMemo } from "react";

export const useFilePreview = (fileObject) => {

  const preview = useMemo(() => {
    if (!fileObject) return null;

    const previews = Object.values(fileObject).map(file => {
      return URL.createObjectURL(file);
    });

    return previews;
  }, [fileObject]);

  useEffect(() => {
    return () => {
      if (preview) {
        preview.forEach(preview => {
          URL.revokeObjectURL(preview);
        });
      }
    };
  }, [preview]);

  return preview;
};