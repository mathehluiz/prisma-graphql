# GraphQL with Prisma - Proof of Concept

This project is a **proof of concept** to test the integration between **GraphQL** and **Prisma**. The goal is to determine whether using `include` for table relations is necessary or if **`ResolveField`** alone can handle the relationships efficiently.

## 🚀 Technologies Used

- **GraphQL**: For API structure, queries, and mutations.
- **Prisma**: ORM for database access.
- **TypeScript**: Main language of the project.
- **Postgres**: For testing purposes.

---

## 📂 Project Structure

```bash
  /database # Database communication
  │ └── prisma # Database schema definition
  │    └── migrations
  │    └── schema.prisma
  /src # Main source folder
  ├── module/ # Project modules
  │ └── posts/ # Posts bounded context
  │    └── core/ # Core business logic
  │       └── service/ # Services
  │          ├── user-management.service.ts # Responsible for user operations
  │          └── post-management.service.ts # Responsible for post operations
  │       └── model/ # Model entities
  │          ├── user.model.ts # Domain user representation
  │          └── post.model.ts # Domain post representation
  │    └── http/ # Http layer
  │       └── graphql/ # Graphql implementations
  │          └── resolver/ # Graphql implementations
  │             └── user.resolver.ts # Graphql user resolver
  │          └── type/ # Object types
  │             ├── create-post-input.type.ts # Create user mutation type
  │             ├── create-user-input.type.ts # Create post mutation type
  │             ├── post.type.ts
  │             └── user.type.ts
  │    └── persistence/ # Database layer
  │       └── repostiory/ # Repositories for domain-infra communication
  │             ├── user.repository.ts
  │             └── post.repository.ts
  ├── shared/ # Shared libs and helpers
  ├── main.ts # Application entrypoint
```

---

## 🔧 Setup and Execution

### Prerequisites

- **Node.js 20+**
- **Prisma CLI**: Install with `npm install prisma --save-dev`

### Installation

```bash
git clone <REPO_URL>
cd <REPO_DIR>
npm install
```

### Database setup

1. Apply migrations to generate the database

```bash
npx prisma migrate dev
```

2. (Optional) Start Prisma Studio to explore the database:

```bash
npx prisma studio
```

### Running the Application

```bash
npm run start
```

---

# Implementation Details

### GraphQL Schema

```graphql
type User {
  id: ID!
  email: String!
  name: String!
  posts: [Post!]
  createdAt: Date!
  updatedAt: Date!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
  createdAt: Date!
  updatedAt: Date!
}
```

### Using `@ResolveField()` to Fetch Relations

Below is an example resolver to fetch posts related to a user. With ResolveField, relationships can be resolved dynamically:

```typescript
@ResolveField('posts')
async posts(@Parent() user: User) {
  return this.postManagementService.getPostsByAuthor(user.id);
}
```

### Fetching with include

Alternatively, you can use include in Prisma to fetch related entities directly:

```typescript
const userWithPosts = await prisma.user.findUnique({
  where: { id: userId },
  include: { posts: true },
});
```

---

# 📋 Conclusion

It is possible to efficiently use **`ResolveField()`** to manage relationships between entities without the need for **`include`** in Prisma queries. This approach ensures better separation of concerns, as each field is resolved only when needed, avoiding over-fetching data. Additionally, it lessens the **cognitive load**, making the code easier to understand, maintain, and extend in the future.

---

# 🛑 Known Issues

- Performance: Using many ResolveField operations may trigger too many database queries.
- Overfetching: include might retrieve unnecessary data.
