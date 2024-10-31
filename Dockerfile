FROM node:22-alpine
WORKDIR /app
COPY package*.json .
COPY tsconfig.json .
RUN npm install
RUN npm build
COPY . .


EXPOSE 5173
CMD ["npm", "run", "preview"]
