# Sử dụng Node.js để build ứng dụng Angular
FROM node:20-alpine as build

# Set thư mục làm việc
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Clear cache
RUN npm cache clean --force

# Cài đặt Angular CLI
RUN npm install -g @angular/cli

# Cài đặt các dependencies
RUN npm install --force

# Cấp quyền thực thi cho Angular CLI
RUN chmod +x ./node_modules/.bin/ng

# Copy toàn bộ mã nguồn Angular vào container
COPY . .

# Build ứng dụng Angular
RUN npm run build --prod

# Sử dụng một lightweight web server để phục vụ ứng dụng Angular
FROM nginx:alpine

# Copy file cấu hình Nginx tùy chỉnh vào thư mục cấu hình của Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy file build từ step trước vào thư mục chứa trang web
COPY --from=build /app/dist/vks-fe-angular /usr/share/nginx/html

# Cấp quyền cho các tệp Nginx
RUN chmod -R 777 /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Chạy nginx server
CMD ["nginx", "-g", "daemon off;"]