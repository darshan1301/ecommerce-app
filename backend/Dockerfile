# Use official Node.js image as base
FROM node:20.12-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080 \
DATABASE_URL='mongodb+srv://mahajandarshan76:6bfPSzFeVtol5cw6@cluster0.xfdijpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' \
JWT_SECRET=mysecretkey \
CLOUDINARY_CLOUD_NAME=hotel-booking-1301 \
CLOUDINARY_API_KEY=844635937263947 \
CLOUDINARY_API_SECRET=Nh86a_bZw5-Xob-vrCojVWirDx4 \
SRTIPE_SK=sk_test_51P12CTSEgQluV2glcsj5QjkedOxL35QqsmBzzqUNAUiBhcy2KQg4uRAy6WEqJTeL1nukOGmO33D4u67c5kXYmWX200q4E2zaqv \
PAYMENT_SUCCESS="https://ecommerce-1301.netlify.app/success" \
PAYMENT_CANCEL="https://ecommerce-1301.netlify.app/failed" 

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD npm start