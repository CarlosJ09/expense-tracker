FROM node:23-alpine

WORKDIR /app

COPY package.json ./

COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm","run","dev"]
