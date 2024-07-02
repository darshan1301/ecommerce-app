import { faker } from "@faker-js/faker";

const generateProduct = () => ({
  id: faker.string.uuid(),
  title: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price()),
  description: faker.commerce.productDescription(),
  category: faker.commerce.department(),
  image: faker.image.urlLoremFlickr({ category: "products" }),
  rating: {
    rate: faker.number.float({ min: 1, max: 5 }),
    count: faker.number.float({ min: 1, max: 100 }),
  },
});

export const createProducts = (num) => {
  const createdProducts = [];

  for (let i = 0; i < num; i++) {
    const product = generateProduct();
    createdProducts.push(product);
  }

  return createdProducts;
};

console.log(createProducts(3));
