export function readAndOptimizeImage(
  file: File,
  maxDimension = 1600,
  quality = 0.84
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      reject(new Error('Выберите файл изображения (JPEG, PNG или WebP).'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => {
      reject(new Error('Не удалось прочитать файл изображения.'));
    };

    reader.onload = () => {
      const rawDataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!rawDataUrl) {
        reject(new Error('Пустой файл изображения.'));
        return;
      }

      if (file.type === 'image/svg+xml') {
        resolve(rawDataUrl);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const largestSide = Math.max(width, height);
        const scale =
          largestSide > maxDimension ? maxDimension / largestSide : 1;
        const targetWidth = Math.max(1, Math.round(width * scale));
        const targetHeight = Math.max(1, Math.round(height * scale));

        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(rawDataUrl);
          return;
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        try {
          const compressed = canvas.toDataURL('image/jpeg', quality);
          resolve(compressed.length < rawDataUrl.length ? compressed : rawDataUrl);
        } catch {
          resolve(rawDataUrl);
        }
      };

      img.onerror = () => {
        reject(new Error('Повреждённое или неподдерживаемое изображение.'));
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
