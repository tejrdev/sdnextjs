FROM node:22-alpine AS runner

WORKDIR /app

# Copy production dependencies
COPY node_modules ./node_modules

# Copy built app and public folder
COPY .next/ ./.next/
COPY public/ ./public/

# Copy package files
COPY package.json ./
COPY package-lock.json ./

COPY .env .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"]
