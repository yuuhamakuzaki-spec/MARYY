export type CameraCategory =
  | "DSLR"
  | "Mirrorless"
  | "Cinema"
  | "Drone"
  | "Action"
  | "Film";

export interface Camera {
  id: string;
  name: string;
  brand: string;
  category: CameraCategory;
  pricePerDay: number;
  image: string;
  gallery: string[];
  rating: number;
  reviews: number;
  description: string;
  specs: {
    sensor: string;
    resolution: string;
    video: string;
    weight: string;
    mount: string;
    battery: string;
  };
  features: string[];
  available: boolean;
  tag?: string;
}

export interface CartItem {
  camera: Camera;
  startDate: string;
  endDate: string;
  days: number;
  total: number;
}
