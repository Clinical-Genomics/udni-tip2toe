FROM node:22-alpine
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install

COPY . .

RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
