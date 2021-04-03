FROM node:14.16.0

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./

# Install Node Packages
RUN npm install

# Copying app source
COPY . ./

EXPOSE 3000

CMD ["npm", "start"]

