# Step 1: Use Node.js base image
FROM node:22

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY vedio-viewer/package*.json /app/

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the frontend code
COPY vedio-viewer/ /app/

# Step 6: Build the React app using Vite
RUN npm run build

# Step 7: Expose port 5173 for the Vite dev server
EXPOSE 5173

# Step 8: Start the development server
CMD ["npm", "run", "dev", "--", "--host"]

