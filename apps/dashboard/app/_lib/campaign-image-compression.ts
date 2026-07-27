const TARGET_IMAGE_SIZE = 480 * 1024;
const MAX_IMAGE_EDGE = 1600;
const JPEG_QUALITIES = [0.82, 0.7, 0.58] as const;
const DIRECT_UPLOAD_TYPES = new Set(["image/gif", "image/jpeg", "image/png", "image/webp"]);

export async function compressCampaignImage(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) {
    throw new Error(`${file.name} 파일은 이미지 형식이 아니에요.`);
  }

  if (file.size <= TARGET_IMAGE_SIZE && DIRECT_UPLOAD_TYPES.has(file.type)) {
    return file;
  }

  const image = await loadImage(file);
  let { width, height } = getResizedDimensions(
    image.naturalWidth,
    image.naturalHeight,
    MAX_IMAGE_EDGE,
  );

  for (let resizeAttempt = 0; resizeAttempt < 5; resizeAttempt += 1) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (context == null) {
      throw new Error("이 브라우저에서는 이미지를 압축할 수 없어요.");
    }

    canvas.width = width;
    canvas.height = height;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    for (const quality of JPEG_QUALITIES) {
      const blob = await canvasToBlob(canvas, quality);

      if (blob.size <= TARGET_IMAGE_SIZE) {
        return new File([blob], getCompressedFileName(file.name), {
          lastModified: Date.now(),
          type: "image/jpeg",
        });
      }
    }

    width = Math.max(Math.round(width * 0.78), 1);
    height = Math.max(Math.round(height * 0.78), 1);
  }

  throw new Error(`${file.name} 파일을 업로드 가능한 크기로 줄이지 못했어요.`);
}

export async function compressCampaignImages(files: File[]): Promise<File[]> {
  const compressedFiles: File[] = [];

  for (const file of files) {
    compressedFiles.push(await compressCampaignImage(file));
  }

  return compressedFiles;
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(
        new Error(
          `${file.name} 파일을 읽지 못했어요. HEIC 사진이라면 JPG로 변환한 뒤 다시 선택해 주세요.`,
        ),
      );
    };
    image.src = objectUrl;
  });
}

function getResizedDimensions(width: number, height: number, maxEdge: number) {
  const scale = Math.min(1, maxEdge / Math.max(width, height));

  return {
    height: Math.max(Math.round(height * scale), 1),
    width: Math.max(Math.round(width * scale), 1),
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob == null) {
          reject(new Error("이미지 압축에 실패했어요. 잠시 후 다시 시도해 주세요."));
          return;
        }

        resolve(blob);
      },
      "image/jpeg",
      quality,
    );
  });
}

function getCompressedFileName(fileName: string) {
  const baseName = fileName.replace(/\.[^.]+$/, "").trim() || "campaign-image";
  return `${baseName}.jpg`;
}
