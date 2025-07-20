# Stage 1: Build
FROM oven/bun:1.1.0 as builder

WORKDIR /app

# Salin semua file
COPY . .

# Install dependencies
RUN bun install

# Build TypeScript (optional jika kamu compile secara manual)
# RUN bun build

# Stage 2: Production
FROM oven/bun:1.1.0

WORKDIR /app

# Copy dari builder
COPY --from=builder /app /app

# Pastikan file env tersedia (jika dibutuhkan)
# COPY .env .env

EXPOSE 3000

# Jalankan aplikasi
CMD ["bun", "run", "index.ts"]
