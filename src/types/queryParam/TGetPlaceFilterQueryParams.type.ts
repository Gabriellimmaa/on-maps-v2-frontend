export type TGetPlaceFilterQueryParams =
  | { placeId: number; campusId?: never; placeName?: never; category?: never }
  | { placeId?: never; campusId: number; placeName?: never; category?: never }
  | { placeId?: never; campusId?: never; placeName: string; category?: never }
  | { placeId?: never; campusId: number; placeName: string; category?: never }
  | { placeId?: never; campusId: number; placeName: string; category: string }
  | { placeId?: never; campusId: number; placeName?: never; category: string }
  | {}
