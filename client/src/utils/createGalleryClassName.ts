export const createGalleryClassName = (length: number, index: number) => {
  let className = 'min-w-full mb-[0.19rem] px-[0.3129rem]';

  if (length === 3) {
    if (index === 0) {
      className = 'md:min-w-full mb-[0.19rem] px-[0.3129rem]';
    }

    if (index === 1 || index === 2) {
      className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
    }
  }

  if (length === 4) {
    if (index === 0 || index === 2) {
      className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] ml-0 mx-[0.3129rem] mb-[0.19rem]';
    }

    if (index === 1 || index === 3) {
      className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
    }
  }

  if (length === 5) {
    if (index === 0) {
      className = 'order-4 md:min-w-full mb-[0.19rem] px-[0.3129rem]';
    }

    if (index === 1 || index === 2) {
      className = 'max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
    }

    if (index === 3 || index === 4) {
      className = 'order-5 max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mx-[0.3129rem] mb-[0.19rem]';
    }
  }

  if (length === 6) {
    if (index === 0) {
      className = 'order-4 md:min-w-full mb-[0.19rem] px-[0.3129rem]';
    }

    if (index === 1 || index === 2 || index === 3) {
      className = 'max-w-[calc(33.33%-0.625rem)] flex-[1_1_33.33%] mx-[0.3129rem] mb-[0.19rem]';
    }

    if (index === 4 || index === 5) {
      className = 'order-5 max-w-[calc(50%-0.625rem)] flex-[1_1_50%] mb-[0.625rem] mx-[0.3129rem]';
    }
  }

  return className;
};
