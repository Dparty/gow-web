import { Configuration, ConfigurationParameters, RestaurantApi } from "@dparty/restaurant-ts-sdk";

export const token = localStorage.getItem("token");

// export const basePath = "https://ordering-api-uat.sum-foods.com";
export const basePath = "https://restaurant-uat.sum-foods.com";
// if (window.location.hostname === "ordering-uat.sum-foods.com") {
//   basePath = "https://ordering-api-uat.sum-foods.com";
// }

export const restaurantApi = new RestaurantApi(
  new Configuration({
    basePath: basePath,
  } as ConfigurationParameters)
);