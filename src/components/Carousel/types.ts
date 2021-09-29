export type CarouselSlide = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
};

export type CarouselProps = {
  data: CarouselSlide[];
};
