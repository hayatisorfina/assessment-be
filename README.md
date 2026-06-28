# Assessment — Backend

NestJS REST API backed by PostgreSQL. Provides endpoints for products, categories, brands, colors, and orders.

## Prerequisites

- Node.js 18+
- A PostgreSQL database (local or hosted, e.g. Neon)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3001

POSTGRES_HOST=your_db_host
POSTGRES_PORT=5432
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name
```

### 3. Seed the database

Populate the database with sample data (categories, brands, products, colors):

```bash
npm run seed
```

> Run this once after first setup, or any time you want to reset the data back to its default state.

### 4. Start the development server

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001/api`.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run start:dev` | Start with hot reload (development) |
| `npm run start` | Start without hot reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start:prod` | Run the compiled production build |
| `npm run seed` | Seed the database with sample data |
| `npm run lint` | Lint and auto-fix source files |
| `npm test` | Run unit tests |

---

## API Endpoints

All routes are prefixed with `/api`.

### Categories
| Method | Route | Description |
|---|---|---|
| GET | `/api/categories` | List all categories |

### Brands
| Method | Route | Description |
|---|---|---|
| GET | `/api/brands` | List all brands |

### Product Colors
| Method | Route | Description |
|---|---|---|
| GET | `/api/product-colors` | List all colors |

### Products
| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | List products (supports filtering & pagination) |

**Query parameters for `GET /api/products`:**

| Param | Type | Description |
|---|---|---|
| `page` | number | Page number (default: 1) |
| `limit` | number | Items per page (default: 10) |
| `product_name` | string | Filter by product name (partial match) |
| `category` | number | Filter by category ID |
| `brand` | number | Filter by brand ID |
| `color` | number | Filter by color ID |

### Orders
| Method | Route | Description |
|---|---|---|
| GET | `/api/orders` | List all orders (supports pagination) |
| POST | `/api/orders` | Place a new order |
| PATCH | `/api/orders/:id` | Mark an order as Completed |

**Request body for `POST /api/orders`:**
```json
{
  "variant_id": 1,
  "quantity": 1
}
```

> `variant_id` is the product color variant ID returned from `GET /api/products`.

---

## Project Structure

```
src/
├── modules/
│   ├── categories/        # Category entity & endpoints
│   ├── brands/            # Brand entity & endpoints
│   ├── product-colors/    # Product color entity & endpoints
│   ├── products/          # Product & product color variant entities & endpoints
│   ├── orders/            # Order & order item entities & endpoints
│   └── database/
│       └── seeder/        # Database seeder
├── app.module.ts
└── main.ts
```
