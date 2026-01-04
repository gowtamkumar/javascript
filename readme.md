# 🚀 Full-Stack Developer Skill Roadmap (Confidence + Mastery)

## Hello boss 👋 — this is your 90-day plan to build strong confidence in your stack.

## 🧠 Your Skills (Needs Strengthening)

- JavaScript with Prototype, DOM, BOM
- JavaScript (ES6+), TypeScript
- React.js, Next.js, Redux, Tailwind CSS
- Node.js, Express.js, Nest.js
- PostgreSQL, Redis
- Docker, NGINX
- Git, GitHub, Postman, Chrome Dev Tools, VS Code
- OOP
- WebSocket
- TypeORM (needs deeper study)
- SDLC, Networking, Testing
- AWS
- CI/CD
- DSA

---

## 🎯 Goal: Be a Confident, Job-Ready Full-Stack Engineer

> Build 1–2 real-world full-stack production-level projects with best practices.

---

## ✅ Phase 1: Core Strength (Day 1–30)

| Area | Priority | Focus  
| JavaScript (ES6+), TypeScript | ⭐⭐⭐⭐ | Closures, async/await, `this`, modules |
| ✅ | Topic | Details |
| - | --------------------- | ---------------------------------------------------------------------- |

- [ ] `let`, `const`, `var` | Scope, hoisting, block vs function scope |
- [ ] Data types | `string`, `number`, `boolean`, `null`, `undefined`, `object`, `symbol` |
- [ ] Type coercion | Implicit vs explicit, `==` vs `===`, truthy/falsy |
- [ ] Functions | Declarations, expressions, arrow functions, IIFE |
- [ ] Closures | Lexical scope, function returning function |
- [ ] `this` keyword | Global, object, arrow vs regular function, bind/apply/call |
- [ ] Prototypes | Prototype chain, inheritance, constructor function |
- [ ] Classes | `class`, `extends`, constructor, `super()`, static methods |
- [ ] Destructuring | Arrays and objects, nested values |
- [ ] Spread & Rest | Cloning, merging, rest parameters |
- [ ] Default Parameters | Function parameter defaults |
- [ ] Template Literals | `${}` interpolation, multiline strings |
- [ ] Array Methods | `map`, `filter`, `reduce`, `find`, `some`, `every`, `includes` |
- [ ] Object Methods | `Object.keys`, `Object.values`, `Object.entries`, merging |
- [ ] Optional chaining | `?.`, `??` for safe access |
- [ ] Modules | `export`, `import`, named/default, file structure |
- [ ] Promises | Creating, consuming, chaining with `.then`, `.catch` |
- [ ] Async/Await | `try/catch`, working with API calls |
- [ ] Event Loop | Call stack, microtasks, `Promise`, `setTimeout`, task queue |
- [ ] Error Handling | `try`, `catch`, custom error, finally |
- [ ] DOM Basics | `querySelector`, `addEventListener`, manipulation |
- [ ] BOM | `window`, `location`, `history`, `localStorage`, `navigator` |
      | ✅ | Typescript Topic | Details |
- [ ] Type Basics | `string`, `number`, `boolean`, `null`, `undefined`, `any`, `unknown`, `never` | |
- [ ] Type Inference | Let TS guess type or define explicitly | |
- [ ] Union & Intersection | \`string | number`, `A & B\` types |
- [ ] Literal Types | \`type Theme = "dark" | "light"\` |
- [ ] Type Alias | `type User = { id: number; name: string }` | |
- [ ] Interfaces | `interface`, extending, merging, vs type alias | |
- [ ] Enums | `enum Role { USER, ADMIN }`, `const enum` | |
- [ ] Functions | Param types, return types, optional/default params | |
- [ ] OOP with Classes | `private`, `public`, `protected`, `readonly`, `implements` | |
- [ ] Generics | `<T>`, reusable function/component, constraints | |
- [ ] Utility Types | `Partial`, `Required`, `Readonly`, `Record`, `Pick`, `Omit` | |
- [ ] Type Narrowing | `typeof`, `in`, `instanceof`, user-defined guards | |
- [ ] Type Assertions | `as`, angle brackets | |
- [ ] `never` and `unknown` | Special use cases, exhaustive checks | |
- [ ] Modules | Import/export types and interfaces | |
- [ ] Namespaces | Internal modules (less used today) | |
- [ ] Declaration Files | `.d.ts`, third-party module types | |
- [ ] `tsconfig.json` | Strict mode, compiler settings | |
- [ ] ESLint + TypeScript | Type safety with code quality | |
- [ ] Working with 3rd-party libs | Using DefinitelyTyped / `@types` | |

| OOP in JS/TS | ⭐⭐⭐ | Classes, interfaces, inheritance, abstraction |
| ✅ | Topic | Description |
| - | --------------------------- | ---------------------------------------------------------------- |

- [ ] **Object** | Key-value pairs, object literals, methods |
- [ ] **Constructor Function** | Classic way of creating objects before ES6 classes |
- [ ] **Prototype & Inheritance** | `__proto__`, `Object.create`, prototype chain |
- [ ] **Class Syntax (ES6)** | `class`, `constructor()`, `new` keyword |
- [ ] **Instance vs Static** | `static` methods vs instance methods |
- [ ] **Encapsulation** | Keep data private using closures or access modifiers |
- [ ] **Abstraction** | Hide complexity using base class and expose essential details |
- [ ] **Inheritance** | `extends`, `super()` to inherit from parent class |
- [ ] **Polymorphism** | Method overriding (runtime) and overloading (compile-time in TS) |
      | 👨‍💻 2. JavaScript OOP Patterns |
      | ✅ | Topic | Description |
- [ ] **Factory Function** | Function returns object without using `new` |
- [ ] **Constructor Function Pattern** | Use `this`, `new`, function capitalized |
- [ ] **Prototype Pattern** | Add methods to `Constructor.prototype` |
- [ ] **Class-based OOP (ES6)** | Modern way, clean syntax using `class` |
- [ ] **Mixin Pattern** | Extend multiple behaviors using object composition |
- [ ] **Composition over Inheritance** | Combine objects instead of extending classes |
- [ ] **Encapsulation using closures** | Private variables using function scope |

|🧑‍🎓 3. TypeScript-Specific OOP Features|
| ✅ | Topic | Description |
| - | ----------------------------- | ---------------------------------------------------- |

- [ ] **Access Modifiers** | `public`, `private`, `protected`, `readonly` |
- [ ] **Constructor Shorthand** | Define and initialize in constructor args |
- [ ] **Interfaces** | Class implements interface (contract enforcement) |
- [ ] **Abstract Classes** | `abstract` keyword, base class can't be instantiated |
- [ ] **Getters/Setters** | `get`, `set` to encapsulate property access |
- [ ] **Method Overloading** | Same method name with different parameters |
- [ ] **Optional Properties** | `?` in class/interface |
- [ ] **Generics in Classes** | Reusable class with `<T>` types |
- [ ] **Implements Keyword** | Force class to follow interface structure |
- [ ] **Type Narrowing in Methods** | `typeof`, `instanceof` checks inside methods |

| Git + GitHub | ⭐⭐⭐ | Branching, PR, merge, rebase |
| 📦 1. Git Basics |
| ✅ | Topic | Description |
| - | ------------ | -------------------------------------------- |

- [ ] `git init` | Initialize a new Git repo |
- [ ] `git config` | Set username/email, editor, aliases |
- [ ] `git status` | See changes (staged, unstaged, untracked) |
- [ ] `git add` | Stage files (`git add .`, `git add file.js`) |
- [ ] `git commit` | Save a snapshot (`git commit -m "message"`) |
- [ ] `.gitignore` | Exclude files/folders from tracking |
- [ ] `git log` | View commit history |
- [ ] `git diff` | View code changes (unstaged or staged) |
- [ ] `git show` | See full details of a commit |
      | 🔁 2. Branching & Merging|
      | ✅ | Topic | Description |
      | - | ----------------- | --------------------------------- |
- [ ] `git branch` | Create/list/delete branches |
- [ ] `git checkout -b` | Create and switch to a new branch |
- [ ] `git switch` | Modern way to switch branches |
- [ ] `git merge` | Merge branch into current one |
- [ ] Merge Conflicts | Handle manual conflict resolution |
- [ ] `git stash` | Save changes temporarily |
- [ ] `git stash pop` | Reapply stashed changes |
      | 🔁 3. Rewriting History |
      | ✅ | Topic | Description |
      | - | ----------------- | --------------------------------------------- |
- [ ] `git reset` | Unstage or remove commits (soft, mixed, hard) |
- [ ] `git revert` | Undo a commit safely (adds a new commit) |
- [ ] `git rebase` | Clean commit history, linearize changes |
- [ ] `git cherry-pick` | Apply a commit from one branch to another |
      | ☁️ 4. GitHub Usage |
      | ✅ | Topic | Description |
      | - | ----------------------- | ----------------------------------------------- |
- [ ] Create Repo | New repo via UI or `gh repo create` |
- [ ] `git remote add origin` | Link local repo to GitHub |
- [ ] `git push` | Push changes to GitHub (`-u origin main`) |
- [ ] `git pull` | Fetch + merge latest from remote |
- [ ] SSH vs HTTPS | Setup SSH keys for secure pushing |
- [ ] Clone | `git clone <url>` to copy a repo |
- [ ] Fork | Copy someone else’s repo under your account |
- [ ] Pull Request (PR) | Request to merge changes into main branch |
- [ ] PR Review Flow | Comment, request changes, approve, squash merge |
- [ ] GitHub Issues | Bug tracking, features |
- [ ] GitHub Projects | Kanban-style boards (optional) |
- [ ] Actions (CI/CD) | Auto-deploy/test when pushing code |
- [ ] Protected Branches | Require PR before pushing to `main` |
- [ ] GitHub README | Write docs with `README.md` + badges |

| PostgreSQL | ⭐⭐⭐⭐ | Joins, indexes, relations |
| 1. Basics & Setup |
| ✅ | Topic | Description |
| - | ------------------ | --------------------------------------------- |

- [ ] Install PostgreSQL | Locally or via Docker |
- [ ] Connect with GUI | Use tools like pgAdmin, TablePlus, DBeaver |
- [ ] `psql` CLI | Run SQL commands from terminal |
- [ ] Create DB/User | `CREATE DATABASE`, `CREATE USER`, grant roles |
- [ ] Database vs Schema | Logical DB vs namespaces for organization |
      | 📊 2. SQL Basics (DDL & DML) |
      | ✅ | Topic | Description |
      | - | ----------------------------------- | ---------------------------------------------------------- |
- [ ] `CREATE`, `ALTER`, `DROP` | Tables, columns, constraints |
- [ ] `INSERT`, `UPDATE`, `DELETE` | Modify data |
- [ ] `SELECT` | Fetch records from table |
- [ ] `WHERE`, `ORDER BY`, `LIMIT` | Filtering and sorting |
- [ ] `DISTINCT`, `BETWEEN`, `IN`, `LIKE` | Advanced filters |
- [ ] Functions | `NOW()`, `COUNT()`, `SUM()`, `AVG()` |
- [ ] Data Types | `TEXT`, `VARCHAR`, `UUID`, `BOOLEAN`, `JSONB`, `TIMESTAMP` |
      | 🔁 3. Relationships |
      | ✅ | Topic | Description |
      | - | ------------------------ | ---------------------------------------- |
- [ ] One-to-One | Foreign key with unique constraint |
- [ ] One-to-Many | Parent → children (classic blog/posts) |
- [ ] Many-to-Many | Join table with foreign keys |
- [ ] Foreign Keys | Enforce data integrity |
- [ ] `ON DELETE`, `ON UPDATE` | Cascade rules |
- [ ] `JOIN` types | `INNER`, `LEFT`, `RIGHT`, `FULL OUTER` |
- [ ] Aliases | `SELECT u.name AS username FROM users u` |
      | ⚡ 4. Advanced SQL |
      | ✅ | Topic | Description |
      | - | -------------------- | ------------------------------------------------------- |
- [ ] Aggregation | `GROUP BY`, `HAVING`, aggregate functions |
- [ ] Subqueries | In `SELECT`, `WHERE`, or `FROM` clauses |
- [ ] Views | Virtual tables for complex queries |
- [ ] Indexes | B-Tree, Composite, Unique, Partial, Gin (for JSONB) |
- [ ] Transactions | `BEGIN`, `COMMIT`, `ROLLBACK` |
- [ ] Constraints | `CHECK`, `NOT NULL`, `DEFAULT`, `UNIQUE`, `PRIMARY KEY` |
- [ ] `CASE` expressions | Conditional logic in queries |
- [ ] `COALESCE`, `NULLIF` | NULL-safe value handling |
      | 📦 5. PostgreSQL for Developers |
      | ✅ | Topic | Description |
      | - | ----------------- | ----------------------------------------------- |
- [ ] UUID Primary Keys | `uuid_generate_v4()` |
- [ ] JSON & JSONB | Store structured data, query with `->`, `->>` |
- [ ] Array Column Type | `TEXT[]`, querying with `ANY`, `ALL` |
- [ ] UPSERT | `INSERT ... ON CONFLICT ... DO UPDATE` |
- [ ] `RETURNING` | Get data back from `INSERT`, `UPDATE`, `DELETE` |
- [ ] Timezones | Store with `TIMESTAMPTZ`, use `AT TIME ZONE` |
- [ ] Generated Columns | Computed from other values (PostgreSQL 12+) |
      | 🧱 6. Performance & Best Practices |
      | ✅ | Topic | Description |
      | - | ----------------------- | ---------------------------------------------- |
- [ ] EXPLAIN ANALYZE | Query performance debugging |
- [ ] Normalize Tables | 3NF for clean schema |
- [ ] Use Indexes Wisely | Avoid over-indexing |
- [ ] Denormalize When Needed | For read-heavy workloads |
- [ ] Partitioning | Big table performance |
- [ ] Connection Pooling | Use with tools like pgBouncer or backend ORMs |
- [ ] WAL & Backups | Write-ahead logging, regular backup strategies |

| TypeORM | ⭐⭐⭐⭐ | Entities, migrations, relations |
| 🔧 1. Setup & Configuration |
| ✅ | Topic | Description |
| - | ------------------------------------ | ----------------------------------------------------------- |

- [ ] Install TypeORM | With `@nestjs/typeorm` or standalone TypeORM |
- [ ] Setup `DataSource` / `TypeOrmModule` | Use `data-source.ts` or NestJS config module |
- [ ] Connect to PostgreSQL | Define host, port, username, password, db |
- [ ] Sync vs Migrations | `synchronize: true` (dev only), production = use migrations |
- [ ] Logging | Enable SQL logging to debug queries |
      | 🏗️ 2. Entity Basics |
      | ✅ | Topic | Description |
      | - | -------------------- | ------------------------------------------------------------- |
- [ ] Define Entity | Use `@Entity()`, `@PrimaryGeneratedColumn`, `@Column` |
- [ ] Column Types | `text`, `int`, `boolean`, `timestamp`, `uuid`, `json`, `enum` |
- [ ] Optional vs Required | `nullable: true`, `default` |
- [ ] Custom Naming | `@Column({ name: "full_name" })` |
- [ ] Timestamps | `@CreateDateColumn`, `@UpdateDateColumn`, soft delete |
      | 🔗 3. Relationships |
      | ✅ | Type | Description |
      | - | --------------- | ------------------------------------------------------------- |
- [ ] OneToOne | `@OneToOne(() => Profile)` + `@JoinColumn()` |
- [ ] OneToMany | `@OneToMany(() => Post, post => post.user)` |
- [ ] ManyToOne | `@ManyToOne(() => User, user => user.posts)` |
- [ ] ManyToMany | `@ManyToMany(() => Tag)`, `@JoinTable()` |
- [ ] Cascade Options | `cascade: true`, `onDelete: 'CASCADE'` |
- [ ] Lazy Relations | Use `Promise<Type>` and `eager: false` |
- [ ] Relation ID | Use `@RelationId()` for FK access without loading full object |
      | 📦 4. Repository & Querying |
      | ✅ | Topic | Description |
      | - | ------------------------------------------- | ------------------------------------------- |
- [ ] `getRepository()` / `@InjectRepository` | Access entity repository |
- [ ] `find()`, `findOne()`, `save()`, `delete()` | CRUD methods |
- [ ] `QueryBuilder` | `.createQueryBuilder()` for complex queries |
- [ ] `findBy()` vs `findOneBy()` | Type-safe alternatives |
- [ ] Conditions & Relations | `{ where: {}, relations: [] }` |
- [ ] Soft Deletes | `softRemove`, `restore` |
- [ ] Pagination | `.take()`, `.skip()` in queries |
      | 📐 5. Advanced Features |
      | ✅ | Topic | Description |
      | - | ----------------- | --------------------------------------------- |
- [ ] Custom Repository | Extend repository with custom methods |
- [ ] Embedded Entities | `@Embedded(() => Address)` |
- [ ] Enum Columns | Use `@Column({ type: "enum", enum: Role })` |
- [ ] UUID Primary Key | `@PrimaryGeneratedColumn("uuid")` |
- [ ] Transactions | `DataSource.transaction(async manager => {})` |
- [ ] Partial Updates | `repo.update(id, { ... })` |
- [ ] `RETURNING` | Use `.returning("*")` in query builder |
      | 🧱 6. Migrations |
      | ✅ | Topic | Description |
      | - | ------------------ | ---------------------------------------------------- |
- [ ] Generate Migration | `typeorm migration:generate -n MigrationName` |
- [ ] Run Migration | `typeorm migration:run` |
- [ ] Revert Migration | `typeorm migration:revert` |
- [ ] Manual SQL | Use `queryRunner.query('...')` in migration |
- [ ] NestJS Integration | Use CLI with `data-source.ts` instead of `ormconfig` |

| React + Next.js | ⭐⭐⭐⭐ | Hooks, SSR/CSR, API routes, middleware |
| ⚛️ 1. React Fundamentals |
| ✅ | Topic | Details |
| - | ---------------------------- | ---------------------------------------------------------- |

- [ ] JSX syntax | Writing HTML-like code inside JS |
- [ ] Components | Functional components, class components (focus functional) |
- [ ] Props & State | Passing data, managing local state |
- [ ] Event handling | onClick, onChange, synthetic events |
- [ ] Conditional rendering | Ternaries, &&, conditional components |
- [ ] Lists & keys | Rendering arrays, unique keys |
- [ ] useState Hook | Local state management |
- [ ] useEffect Hook | Side effects, dependencies array |
- [ ] useRef Hook | Accessing DOM, persisting mutable values |
- [ ] useContext Hook | Context API for global state |
- [ ] React Router (if applicable) | Client-side routing basics |
      | 🚀 2. Advanced React |
      | ✅ | Topic | Details |
      | - | ----------------------- | ------------------------------------------------------ |
- [ ] useReducer Hook | Complex state logic |
- [ ] Custom Hooks | Reusable logic abstraction |
- [ ] Memoization | `React.memo`, `useMemo`, `useCallback` for performance |
- [ ] Error Boundaries | Catch JS errors in components |
- [ ] Portals | Render children into different DOM nodes |
- [ ] Suspense & Lazy Loading | Code splitting, dynamic imports |
      | 🌐 3. Next.js Core |
      | ✅ | Topic | Details |
      | - | --------------------------------- | -------------------------------------------------------- |
- [ ] Pages & Routing | File-based routing in `/pages` folder |
- [ ] Dynamic Routes | `[id].js`, catch-all routes |
- [ ] API Routes | Create backend endpoints in `/pages/api` |
- [ ] Data Fetching | `getStaticProps`, `getServerSideProps`, `getStaticPaths` |
- [ ] Image Optimization | `next/image` component |
- [ ] Middleware | Edge functions for routing, auth |
- [ ] Custom `_app.js` & `_document.js` | App-wide layout, document customization |
- [ ] Environment Variables | `.env.local`, usage in client/server |
- [ ] Static Export | `next export` for static sites |
      | 🔥 4. State Management |
      | ✅ | Topic | Details |
      | - | --------------------------- | -------------------------------------- |
- [ ] React Context API | For lightweight global state |
- [ ] Redux Toolkit | Slice, store, reducers, async thunks |
- [ ] Zustand / Recoil (optional) | Alternative state management libraries |
      | 🎨 5. Styling |
      | ✅ | Topic | Details |
      | - | --------------------------- | ---------------------------------------- |
- [ ] CSS Modules | Scoped CSS per component |
- [ ] Styled JSX | Built-in CSS-in-JS |
- [ ] Tailwind CSS | Utility-first styling, responsive design |
- [ ] Emotion / Styled Components | CSS-in-JS libraries |
      | 🧪 6. Testing |
      | ✅ | Topic | Details |
      | - | --------------------- | ------------------------------ |
- [ ] React Testing Library | Component testing, user events |
- [ ] Jest | Unit testing framework |
- [ ] Cypress / Playwright | End-to-end testing |
      | 📦 7. Deployment & Optimization |
      | ✅ | Topic | Details |
      | - | ---------------------- | ------------------------------ |
- [ ] Vercel deployment | Zero-config Next.js deployment |
- [ ] Environment variables | Secure secrets management |
- [ ] Code splitting | Dynamic imports, lazy loading |
- [ ] Performance monitoring | Lighthouse, Web Vitals |
- [ ] SEO basics | Meta tags, Open Graph, sitemap |

| Redux Toolkit | ⭐⭐⭐ | Store, async thunks |
| ⚙️ 1. Core Concepts |
| ✅ | Topic | Details |
| - | ------------------ | ------------------------------------- |

- [ ] Redux Basics | Store, actions, reducers, dispatch |
- [ ] Why Redux Toolkit? | Simplifies boilerplate, uses Immer |
- [ ] `configureStore` | Setup store with middleware, devtools |
- [ ] `createSlice` | Define reducers + actions together |
- [ ] Action Creators | Auto-generated from slice |
- [ ] `createAsyncThunk` | Handle async logic (API calls) |
- [ ] Reducer Logic | Immer-powered immutable updates |
      | 🛠️ 2. Usage Patterns |
      | ✅ | Topic | Details |
      | - | ---------------------- | --------------------------------------------- |
- [ ] Slices Structure | Organize features by slice |
- [ ] Dispatching Actions | Synchronous and async |
- [ ] Selectors | Use `useSelector` to read state |
- [ ] Middleware | Built-in thunk support, add custom middleware |
- [ ] Combining Slices | Multiple slices in one store |
- [ ] Typed Hooks (with TS) | `useAppDispatch` and `useAppSelector` |
- [ ] Error & Loading States | Manage in slices |
      | 🧪 3. Advanced |
      | ✅ | Topic | Details |
      | - | -------------------- | -------------------------------------------- |
- [ ] Entity Adapter | Manage normalized data like lists |
- [ ] RTK Query (optional) | Data fetching + caching |
- [ ] Custom Middleware | Logging, analytics |
- [ ] Redux DevTools | Time travel debugging |
- [ ] Testing | Reducers, async thunks, connected components |

| Tailwind CSS | ⭐⭐ | Utility-first styling |
| 🎨 1. Core Concepts |
| ✅ | Topic | Details |
| - | -------------------- | --------------------------------------- |

- [ ] Installation | Via npm, CDN, or with Next.js setup |
- [ ] Utility Classes | Spacing, colors, typography, layout |
- [ ] Responsive Design | Breakpoints like `sm:`, `md:`, `lg:` |
- [ ] Customizing Tailwind | `tailwind.config.js` for themes, colors |
- [ ] Dark Mode | Class-based or media query strategy |
- [ ] PurgeCSS | Remove unused CSS for production |
- [ ] Applying Styles | Inline class names, combining utilities |

| 📐 2. Layout & Flexbox/Grid |
| ✅ | Topic | Details |
| - | ----------- | -------------------------------------------------------- |

- [ ] Box Model | Padding, margin, border |
- [ ] Flexbox | `flex`, `justify-*`, `items-*`, `flex-grow`, `flex-wrap` |
- [ ] Grid | `grid`, `grid-cols-*`, `gap-*`, `auto-fit`, `auto-fill` |
- [ ] Positioning | `relative`, `absolute`, `fixed`, `sticky` |
- [ ] Z-index | Control stacking order |
      | ✍️ 3. Typography & Colors |
      | ✅ | Topic | Details |
      | - | ---------------- | ---------------------------------------- |
- [ ] Font Families | `font-sans`, `font-serif`, `font-mono` |
- [ ] Font Size | `text-xs` to `text-9xl` |
- [ ] Font Weight | `font-light` to `font-black` |
- [ ] Text Alignment | `text-left`, `text-center`, `text-right` |
- [ ] Text Color | Using default + custom colors |
- [ ] Background Color | Utility classes for BG colors |
      | ⚡ 4. States & Effects |
      | ✅ | Topic | Details |
      | - | ----------------------- | --------------------------------------- |
- [ ] Hover, Focus | `hover:`, `focus:`, `active:` states |
- [ ] Transitions & Animation | `transition`, `duration-*`, `ease-*` |
- [ ] Opacity & Visibility | `opacity-*`, `invisible`, `visible` |
- [ ] Cursor & Pointer Events | `cursor-pointer`, `pointer-events-none` |
      | 🔧 5. Advanced Usage |
      | ✅ | Topic | Details |
      | - | --------------------- | ------------------------------------------- |
- [ ] Plugins | Typography, forms, aspect-ratio, etc. |
- [ ] Custom Utilities | Extending config with new utilities |
- [ ] Variants | Group hover, responsive variants, dark mode |
- [ ] Extracting Components | Using `@apply` in CSS for reusable styles |
- [ ] CSS Variables | Integrate Tailwind with CSS variables |
- [ ] RTL Support | Right-to-left styling |

| Node.js, Express.js, NestJS | ⭐⭐⭐⭐ | APIs, modules, guards, middleware |
| 🟢 1. Node.js Core |
| ✅ | Topic | Details |
| - | ---------------------- | --------------------------------------------- |

- [ ] Node.js runtime basics | Event loop, non-blocking I/O |
- [ ] Modules | CommonJS (`require`) vs ES Modules (`import`) |
- [ ] File System | `fs` module, streams, buffers |
- [ ] EventEmitter | Custom events, listeners |
- [ ] Process & Environment | `process.env`, argv, exit codes |
- [ ] Async Patterns | Callbacks, Promises, async/await |
- [ ] Built-in APIs | HTTP, HTTPS, Path, OS |
      | ⚡ 2. Express.js Essentials |
      | ✅ | Topic | Details |
      | - | ------------------------- | -------------------------------------------------------- |
- [ ] Setup & Middleware | `express()`, `app.use()`, built-in and custom middleware |
- [ ] Routing | `app.get()`, `app.post()`, router modularization |
- [ ] Request & Response | `req.params`, `req.body`, `res.json()`, status codes |
- [ ] Error Handling Middleware | Centralized error handling |
- [ ] Serving Static Files | `express.static()` |
- [ ] Query Params & URL Params | Access and validate |
- [ ] Body Parsing | `express.json()`, `express.urlencoded()` |
- [ ] CORS | Cross-origin resource sharing setup |
- [ ] Authentication Middleware | JWT, Passport.js integration |
- [ ] Logging | Morgan or custom logs |
      |🏗️ 3. NestJS Framework |
      | ✅ | Topic | Details |
      | - | -------------------- | ---------------------------------------------------------------------- |
- [ ] Architecture | Modules, Controllers, Providers (Services) |
- [ ] Dependency Injection | Providers injection, lifecycle hooks |
- [ ] Routing | Decorators like `@Controller()`, `@Get()`, `@Post()` |
- [ ] Pipes | Validation and transformation (`class-validator`, `class-transformer`) |
- [ ] Guards | Auth guards with `@UseGuards()` (JWT, Roles) |
- [ ] Interceptors | Logging, transforming responses |
- [ ] Middleware | Custom middleware in NestJS context |
- [ ] Exception Filters | Custom error handling |
- [ ] Microservices | TCP, Redis, NATS integrations |
- [ ] WebSockets | Gateway support with `@WebSocketGateway()` |
- [ ] CLI | Generate modules, services, controllers |
- [ ] Configuration | `@nestjs/config`, environment variables |
- [ ] Testing | Unit, e2e testing with Jest |
      | 🔨 4. Practical Backend Features |
      | ✅ | Feature | Description |
      | - | ------------------------------ | -------------------------------------- |
- [ ] REST API Design | CRUD operations, status codes |
- [ ] Authentication & Authorization | JWT, OAuth, Role-based access control |
- [ ] Validation & Sanitization | DTOs, class-validator |
- [ ] Database Integration | TypeORM or Prisma with PostgreSQL |
- [ ] File Upload | Multer middleware |
- [ ] Caching | Redis integration |
- [ ] Rate Limiting | Prevent abuse |
- [ ] API Documentation | Swagger/OpenAPI with `@nestjs/swagger` |
- [ ] Logging & Monitoring | Winston, Morgan, or custom solutions |

| Docker | ⭐⭐⭐⭐ | Dockerfile, Compose, local container setup |
| 🐳 1. Docker Basics |
| ✅ | Topic | Details |
| - | ----------------- | --------------------------------------------------------- |

- [ ] What is Docker? | Containers vs VMs concept |
- [ ] Install Docker | Setup on Linux, Windows, Mac |
- [ ] Docker CLI | Basic commands (`docker run`, `docker ps`, `docker stop`) |
- [ ] Docker Images | What are images? `docker pull`, `docker build` |
- [ ] Docker Containers | Running isolated containers |
- [ ] Dockerfile | Syntax, layers, `FROM`, `RUN`, `CMD`, `COPY`, `EXPOSE` |
- [ ] Docker Hub | Push & pull images |
- [ ] Volumes | Persist data outside container |
- [ ] Networking | Container communication, ports mapping |
      | 📦 2. Dockerfile Deep Dive |
      | ✅ | Topic | Details |
      | - | ------------------- | ----------------------------- |
- [ ] Writing Dockerfiles | Multi-stage builds, caching |
- [ ] Layer caching | Optimize build speed |
- [ ] ENV variables | Using `ENV` and `.env` files |
- [ ] Healthchecks | `HEALTHCHECK` instruction |
- [ ] Entry point vs CMD | Differences and usage |
- [ ] Best Practices | Small images, `.dockerignore` |
      | ⚙️ 3. Docker Compose |
      | ✅ | Topic | Details |
      | - | ----------------------- | ------------------------------------------- |
- [ ] What is Docker Compose? | Define multi-container apps |
- [ ] `docker-compose.yml` | Syntax, version, services |
- [ ] Define services | App, DB, cache, etc. |
- [ ] Volumes & Networks | Shared data and container communication |
- [ ] Environment Variables | Using `.env` with Compose |
- [ ] `depends_on` | Service dependencies |
- [ ] Scaling services | `docker-compose up --scale` |
- [ ] Logs & monitoring | `docker-compose logs` |
- [ ] Commands | `docker-compose up/down`, `restart`, `exec` |
      | 🔨 4. Practical Use Cases |
      | ✅ | Use Case | Details |
      | - | ------------------------ | ------------------------------------- |
- [ ] Containerize Node.js app | Dockerfile + Docker Compose with DB |
- [ ] Multi-container app | App + PostgreSQL + Redis + NGINX |
- [ ] Local development | Hot reload with volume mounts |
- [ ] Production setup | Docker Compose for staging/production |
- [ ] CI/CD integration | Build and push images in pipeline |
      | 🧰 5. Tools & Ecosystem |
      | ✅ | Tool | Use |
      | - | ------------------ | ---------------------------- |
- [ ] Docker Desktop | GUI + CLI for Docker |
- [ ] Docker Compose CLI | Compose commands integration |
- [ ] Portainer | Docker GUI management |
- [ ] Dive | Analyze Docker image layers |
- [ ] Hadolint | Dockerfile linter |

| Redis | ⭐⭐⭐ | Caching, sessions, rate limiting |
| ⚡ 1. Redis Basics |
| ✅ | Topic | Details |
| - | -------------- | ----------------------------------------------- |

- [ ] What is Redis? | In-memory key-value store, data structures |
- [ ] Installation | Local install or Docker container |
- [ ] Redis CLI | Basic commands like `GET`, `SET`, `DEL`, `KEYS` |
- [ ] Data types | Strings, Hashes, Lists, Sets, Sorted Sets |
- [ ] Persistence | RDB snapshots, AOF logs |
- [ ] Expiration | TTL for keys with `EXPIRE`, `TTL` commands |
      | 🛠️ 2. Common Use Cases |
      | ✅ | Use Case | Details |
      | - | --------------- | ---------------------------------------- |
- [ ] Caching | Cache DB query results, API responses |
- [ ] Session Storage | Store user sessions in Redis |
- [ ] Rate Limiting | Track API call counts with expiry |
- [ ] Pub/Sub | Real-time messaging, event notifications |
- [ ] Queues | Task queues with Lists and Sorted Sets |
- [ ] Leaderboards | Use Sorted Sets for ranking |

| ⚙️ 3. Integration with Node.js |
| ✅ | Topic | Details |
| - | ------------------------------- | ---------------------------------------- |

- [ ] Redis Client | Using `ioredis` or `redis` npm packages |
- [ ] Connection Setup | Host, port, auth, retry strategies |
- [ ] Basic Commands | `get`, `set`, `hgetall`, `lpush`, `zadd` |
- [ ] Promises & Async/Await | Handling async Redis calls |
- [ ] Error Handling | Detect and reconnect on failures |
- [ ] Using Redis with Express/NestJS | Session stores, caching middleware |
      | 🔐 4. Security & Performance |
      | ✅ | Topic | Details |
      | - | ------------------- | --------------------------------------- |
- [ ] Redis ACLs | User roles and permissions |
- [ ] Password Protection | `requirepass` in config |
- [ ] TLS Encryption | Secure Redis connections |
- [ ] Memory Management | Maxmemory policies, eviction strategies |
- [ ] Monitoring | `INFO` command, RedisInsight tool |
      | 🔄 5. Advanced Topics |
      | ✅ | Topic | Details |
      | - | ---------------- | ----------------------------------- |
- [ ] Lua Scripting | Atomic operations, custom commands |
- [ ] Redis Streams | Event streaming and consumer groups |
- [ ] Redis Cluster | Scaling Redis horizontally |
- [ ] Transactions | MULTI, EXEC, WATCH commands |
- [ ] Pub/Sub Patterns | Message brokers and listeners |
      | 🧪 6. Mini Project Ideas |
      | ✅ | Idea | Description |
      | - | ------------------------ | ------------------------------------- |
- [ ] Cache layer for REST API | Cache expensive DB queries |
- [ ] Session management | Implement user login sessions |
- [ ] Rate limiter | Limit API requests per user/IP |
- [ ] Real-time chat pub/sub | Messaging system using Redis Pub/Sub |
- [ ] Task queue | Background job queue with Redis Lists |
      | NGINX | ⭐⭐⭐ |
      | 🌐 1. NGINX Basics |
      | ✅ | Topic | Details |
      | - | ------------------- | -------------------------------------------------------------------- |
- [ ] What is NGINX? | High-performance web server and reverse proxy |
- [ ] Installation | Install on Linux (Ubuntu/Debian/CentOS), Docker container |
- [ ] Configuration file | Understand `/etc/nginx/nginx.conf` and sites-available/sites-enabled |
- [ ] Basic directives | `server`, `location`, `listen`, `root`, `index` |
- [ ] Reverse proxy setup | Proxy_pass to backend services (Node, Nest, Next.js) |
- [ ] Load balancing | Round robin, IP hash methods |

| 🔒 2. SSL/TLS Setup |
| ✅ | Topic | Details |
| - | --------------------- | --------------------------------------------------- |

- [ ] What is SSL/TLS? | Encrypt communication between client & server |
- [ ] Certificates | Self-signed vs CA-signed (Let’s Encrypt) |
- [ ] Generate CSR & Key | Using OpenSSL or tools like Certbot |
- [ ] Install Certbot | Automated Let’s Encrypt certificate issuance |
- [ ] Auto-renewal | Set up cron job or systemd timer for renewal |
- [ ] Configure NGINX SSL | `ssl_certificate`, `ssl_certificate_key` directives |
- [ ] Strong SSL config | Protocols, ciphers, HSTS headers |
- [ ] Redirect HTTP → HTTPS | Force secure traffic with 301 redirect |
      | ⚙️ 3. Advanced NGINX Features |
      | ✅ | Topic | Details |
      | - | -------------------- | ---------------------------------- |
- [ ] Gzip compression | `gzip on;` for faster loads |
- [ ] Caching | Proxy cache to improve performance |
- [ ] Rate limiting | Protect against DDoS & abuse |
- [ ] HTTP/2 support | Faster multiplexed connections |
- [ ] WebSocket proxy | Support upgrade headers |
- [ ] Access control | IP whitelist/blacklist |
- [ ] Logging & monitoring | Access logs, error logs setup |
      | 🔨 4. Practical Setup Example |
      | ✅ | Setup Step | Details |
      | - | ------------------- | -------------------------------------------------- |
- [ ] Basic reverse proxy | Proxy Next.js/NestJS backend on port 3000 |
- [ ] Serve static files | From `/var/www/html` or project folder |
- [ ] Enable HTTPS | Use Let’s Encrypt cert with Certbot |
- [ ] Redirect HTTP | Permanent redirect to HTTPS |
- [ ] Setup HSTS | Add `Strict-Transport-Security` header |
- [ ] Reload NGINX | `sudo nginx -t` then `sudo systemctl reload nginx` |
      | 🧪 5. Mini Project Ideas |
      🔨 **Mini Project:**  
       Build a Full-Stack LMS App:

- Stack: Next.js + NestJS + PostgreSQL + Redis + Docker
- Features: Auth, posts, comments
- Deployment: NGINX + Docker + SSL
- Testing: Unit + API tests
- Push to GitHub ✅

---

## 🚀 Phase 2: Real-World Engineering (Day 31–60)

| Area                                     | Priority                                                  | Focus                                              |
| ---------------------------------------- | --------------------------------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| SDLC                                     | ⭐⭐                                                      | Agile, GitFlow, deployments                        |
| 1. SDLC Phases (7 Core Stages)           |
| ✅                                       | Phase                                                     | Description                                        | Your Role as a Dev                                 |
| -                                        | ---------------------------                               | -------------------------------------------        | -------------------------------------------------- |
| - [ ] **1. Planning**                    | Define scope, budget, timeline, feasibility               | Give technical input (stack, time estimate)        |
| - [ ] **2. Requirement Analysis**        | Gather business/user needs                                | Translate to user stories or features              |
| - [ ] **3. Design**                      | System architecture, database, UI/UX                      | Design DB schema, APIs, wireframes                 |
| - [ ] **4. Development**                 | Actual coding phase                                       | Write frontend/backend code, follow best practices |
| - [ ] **5. Testing**                     | Verify everything works as expected                       | Write & run unit, integration, e2e tests           |
| - [ ] **6. Deployment**                  | Push to production/staging                                | Dockerize, setup CI/CD, deploy on AWS/VPS          |
| - [ ] **7. Maintenance**                 | Fix bugs, monitor performance                             | Log errors, handle feedback, patch updates         |
| 🔹 2. Development Methodologies          |
| ✅                                       | Method                                                    | Description                                        | Notes                                              |
| -                                        | -------------                                             | ------------------------------------------         | -------------------------------------------        |
| - [ ] **Agile**                          | Iterative, fast feedback loops                            | Most common in startups/teams                      |
| - [ ] **Scrum**                          | Agile framework: sprints, standups                        | Daily syncs, sprint planning                       |
| - [ ] **Kanban**                         | Visual task board (Trello/GitHub Projects)                | Continuous delivery-focused                        |
| - [ ] **Waterfall**                      | Linear phase-by-phase                                     | Rare today, used in fixed-contract projects        |
| 🔹 3. Deliverables You Should Know       |
| ✅                                       | Document                                                  | Description                                        | Tool                                               |
| -                                        | ----------------------------------                        | -------------------------------                    | ------------------------------                     |
| - [ ] Product Requirement Document (PRD) | Business features/goals                                   | Notion, Google Docs                                |
| - [ ] Technical Design Document (TDD)    | DB schema, APIs, tech choices                             | Markdown, diagrams                                 |
| - [ ] User Stories                       | Features from user's POV                                  | Jira, Trello                                       |
| - [ ] Acceptance Criteria                | "Done" definition for each task                           | GitHub Issues                                      |
| - [ ] Sprint Reports                     | Summary of what's completed                               | Optional but valuable in teams                     |
| 🔹 4. Dev Team Roles in SDLC             |
| Role                                     | Responsibility                                            |
| -----------------------                  | -----------------------------------------------           |
| Product Manager                          | Defines business goals, prioritizes features              |
| Project Manager                          | Manages timelines, deadlines, team coordination           |
| Software Engineer (You)                  | Builds and maintains system                               |
| QA Engineer                              | Writes and runs test cases                                |
| DevOps Engineer                          | Handles deployment, CI/CD, monitoring                     |
| 🔹 5. Best Practices for You             |
| ✅                                       | Practice                                                  | Why                                                |
| -                                        | -----------------------------                             | --------------------------------                   |
| - [ ] Always clarify requirements        | Avoid building the wrong feature                          |
| - [ ] Break down tasks                   | Easier tracking + testing                                 |
| - [ ] Use version control (Git)          | Track changes, rollbacks                                  |
| - [ ] Automate testing                   | Confidence with every change                              |
| - [ ] Automate deployment                | Fast, consistent releases                                 |
| - [ ] Track bugs & feature requests      | Maintain project quality                                  |
| - [ ] Monitor live apps                  | Use logging + uptime tools                                |
| 🔹 6. Tools to Use                       |
| Area                                     | Tools                                                     |
| ------------                             | ----------------------------------                        |
| Project Mgmt                             | Jira, Trello, GitHub Projects                             |
| Diagrams                                 | draw\.io, Excalidraw, Lucidchart                          |
| CI/CD                                    | GitHub Actions, GitLab CI, Jenkins                        |
| Docs                                     | Notion, Google Docs, Obsidian                             |
| Monitoring                               | LogRocket, Sentry, UptimeRobot                            |
| 🔹 7. Mini Project Simulation            |
| Task                                     | Apply This                                                |
| ---------------                          | --------------------------------------------------------- |
| Plan a chat app                          | Define features: Auth, 1-1 chat, group chat               |
| Design system                            | Create DB schema, API routes, app flow                    |
| Sprint plan                              | Break into stories: `login`, `send message`, `join group` |
| Code                                     | Use GitHub for tracking                                   |
| Test                                     | Write Jest/unit + e2e tests                               |
| Deploy                                   | CI/CD to Docker + VPS                                     |
| Maintain                                 | Setup logs, uptime monitor, fix bugs                      |

| WebSocket | ⭐⭐⭐ | Real-time chat/notification |
| 🌐 1. WebSocket Fundamentals |
| ✅ | Topic | Description |
| - | ------------------ | ------------------------------------------------------ |

- [ ] What is WebSocket? | Full-duplex communication over a single TCP connection |
- [ ] WebSocket vs HTTP | Real-time, persistent vs request/response |
- [ ] WebSocket Protocol | `ws://` or `wss://` over TCP (port 80/443) |
- [ ] Lifecycle | `open`, `message`, `error`, `close` events |
      | 🧰 2. WebSocket in Node.js (Low-level) |
      | ✅ | Task | Details |
      | - | --------------------- | --------------------------------------- |
- [ ] Use `ws` npm package | Lightweight WebSocket server |
- [ ] Create server | `new WebSocket.Server({ port: 8080 })` |
- [ ] Handle connections | `.on("connection", socket => {...})` |
- [ ] Send/receive messages | `socket.send()`, `socket.on("message")` |
- [ ] Broadcast to clients | Loop over `wss.clients` |
- [ ] Graceful close | `socket.close()` with cleanup |
      | ⚡ 3. Socket.IO with Express/NestJS |
      | ✅ | Topic | Description |
      | - | ------------------------- | ----------------------------------------------------- |
- [ ] Install & setup | `socket.io` (server) and `socket.io-client` (client) |
- [ ] Events | Custom events with `emit`, `on`, `broadcast`, `rooms` |
- [ ] Express Integration | Attach `io` to your HTTP server |
- [ ] NestJS Gateway | Use `@WebSocketGateway()`, `@SubscribeMessage()` |
- [ ] Message DTOs | Type-safe communication with interfaces |
- [ ] Namespace & Rooms | Separate features or channels by scope |
- [ ] Middleware | Auth with JWT on connection |
- [ ] Disconnection & Reconnect | Handle cleanup or retry logic |
- [ ] Rate limiting | Avoid flooding the server |
      | 🧠 4. Real-World WebSocket Use Cases |
      | ✅ | Use Case | Description |
      | - | ----------------------- | ------------------------------------ |
- [ ] 1:1 Chat App | Emit/send messages between users |
- [ ] Group Chat | Join/leave rooms, broadcast messages |
- [ ] Notifications | Push alerts to users in real time |
- [ ] Live Typing Indicator | Emit `typing` events |
- [ ] Online Presence | Track connected users |
- [ ] Realtime Collaboration | Like Google Docs sync |
- [ ] Live Feeds / Dashboards | Push stock prices, metrics, logs |
- [ ] Multiplayer Game | Sync player positions/states |
      | 📦 7. Tools & Debugging |
      | Tool | Purpose |
      | ----------------------------- | --------------------------------------------------- |
      | `socket.io-client` | Frontend WebSocket testing |
      | `wscat` | Terminal WebSocket testing tool |
      | Chrome DevTools → Network Tab | Inspect WebSocket frames |
      | `nestjs/websockets` package | Native NestJS support for WebSockets |
      | Redis Pub/Sub | Scalable WebSocket broadcasts with multiple servers |

| CI/CD | ⭐⭐⭐ | GitHub Actions or GitLab CI |
| 🔧 1. CI/CD Fundamentals |
| ✅ | Task | Description |
| - | --------------------- | ------------------------------------------------------------- |

- [ ] Understand CI/CD | CI = test/build, CD = deploy automatically |
- [ ] GitHub Actions Basics | `.github/workflows/` folder + `.yml` files |
- [ ] Trigger Types | `push`, `pull_request`, `workflow_dispatch`, `schedule` |
- [ ] Jobs & Steps | Each `job:` runs on a runner, has `steps:` (actions, scripts) |
- [ ] Runners | Use `ubuntu-latest` for Node/Docker apps |
      | 🔐 5. GitHub Secrets (Secure Config) |
      | ✅ | Secret | Description |
      | - | ---------------------------------- | ------------------------------- |
- [ ] `DOCKER_USERNAME` | Docker Hub username |
- [ ] `DOCKER_PASSWORD` | Docker Hub password |
- [ ] `VPS_HOST` | Your server IP |
- [ ] `VPS_USER` | Server login username |
- [ ] `VPS_SSH_KEY` | Private SSH key (no passphrase) |
- [ ] `DATABASE_URL`, `JWT_SECRET`, etc. | Your app env variables |
      | 🧪 6. Best Practices |
      | ✅ | Practice | Benefit |
      | - | -------------------- | ------------------------------------ |
- [ ] Use `npm ci` | Clean, fast install for CI |
- [ ] Cache `node_modules` | Speed up builds with `actions/cache` |
- [ ] Lint + Format check | Fail fast for code issues |
- [ ] Use `.env.example` | Show required environment variables |
- [ ] Use matrix builds | Test on multiple Node versions |
- [ ] Run tests on PRs | Avoid merging broken code |
- [ ] Auto-deploy on main | Ship fast after tests pass |
      | 📦 7. Tools and Actions to Know |
      | ✅ | Action | Use |
      | - | -------------------------- | ------------------------- |
- [ ] `actions/checkout` | Clone code into runner |
- [ ] `actions/setup-node` | Set Node.js version |
- [ ] `docker/login-action` | Login to DockerHub |
- [ ] `docker/build-push-action` | Build & push images |
- [ ] `appleboy/ssh-action` | Deploy via SSH to VPS |
- [ ] `actions/cache` | Speed up build with cache |

| NGINX | ⭐⭐⭐ | SSL, reverse proxy, routing |
| Testing | ⭐⭐⭐ | Jest, Supertest, Playwright |
| AWS | ⭐⭐ | EC2, S3, RDS (basic use) |
| Networking | ⭐⭐ | Ports, HTTP, TCP/IP, SSL, DNS |
| 🌐 1. Basic Networking Concepts |
| ✅ | Topic | Description |
| - | ---------------------------- | ---------------------------------------------------------------------------------- |

- [ ] **IP Address** | Unique identifier for a device on a network (IPv4/IPv6) |
- [ ] **MAC Address** | Hardware-level address used in LAN |
- [ ] **Port Number** | Identifies a specific service on a device (e.g., 80 = HTTP, 443 = HTTPS) |
- [ ] **DNS (Domain Name System)** | Resolves domain names to IP addresses |
- [ ] **HTTP vs HTTPS** | HTTP is plaintext, HTTPS is secure (SSL/TLS encrypted) |
- [ ] **TCP vs UDP** | TCP is reliable (chat, web), UDP is fast but less reliable (video, games) |
- [ ] **Private vs Public IPs** | Private used in local networks (e.g., 192.168.x.x), public is routable on internet |
      | 🌍 2. OSI Model (7 Layers) |
      | Layer | Purpose | Dev Impact |
      | ------------------- | -------------------------------- | -------------------------------- |
      | 7. **Application** | User interface (HTTP, WebSocket) | You build this (Next.js, NestJS) |
      | 6. **Presentation** | Encryption, encoding (TLS, SSL) | HTTPS certs |
      | 5. **Session** | Open/close sessions | WebSocket/session mgmt |
      | 4. **Transport** | TCP/UDP, ports, reliability | Connection errors, socket drops |
      | 3. **Network** | IP routing, firewalls | Ping, traceroute |
      | 2. **Data Link** | Ethernet, MAC, frames | Mostly handled by OS |
      | 1. **Physical** | Cables, NIC, wifi | Not dev concern |
      | 🔗 3. Protocols You Must Know |
      | ✅ | Protocol | Use Case |
      | - | ------------------ | ------------------------------------ |
- [ ] HTTP/HTTPS | Web requests/responses |
- [ ] WebSocket (WS/WSS) | Real-time communication |
- [ ] TCP | Reliable data transfer (chat, APIs) |
- [ ] UDP | Video streaming, games |
- [ ] DNS | Domain to IP resolution |
- [ ] SSH | Secure access to remote servers |
- [ ] FTP/SFTP | File transfer |
- [ ] ICMP | Ping/traceroute (connectivity check) |
      | 🧠 4. Developer Essentials |
      | ✅ | Concept | Why It Matters |
      | - | ------------------- | ----------------------------------------------- |
- [ ] **CORS** | Cross-domain restrictions in browser |
- [ ] **Reverse Proxy** | Forwarding requests with NGINX |
- [ ] **Load Balancing** | Distribute traffic (HAProxy, NGINX) |
- [ ] **Firewall Ports** | Open/close ports like 80, 443, 3000 |
- [ ] **DNS Propagation** | Time it takes DNS changes to apply |
- [ ] **Traceroute/Ping** | Diagnose network delays or failures |
- [ ] **NAT** | Allows private IPs to access internet |
- [ ] **CDN** | Deliver static assets from closest edge servers |
      | 🔒 5. Security & SSL |
      | ✅ | Topic | Description |
      | - | ------------------------ | ----------------------------------- |
- [ ] **SSL/TLS Certificates** | Encrypt HTTP traffic (HTTPS) |
- [ ] **HTTPS Redirection** | Force HTTPS via NGINX or Express |
- [ ] **Port Scanning** | Detect open ports (e.g., with Nmap) |
- [ ] **JWT Security** | Encrypt tokens for user sessions |
- [ ] **CSRF/XSS Defense** | Secure client-server interactions |
- [ ] **Helmet.js** | Secure Express.js headers |
      | 🛠️ 6. Tools to Learn |
      | Tool | Use |
      | ----------------------------- | ---------------------------- |
      | `ping` | Test connectivity |
      | `traceroute` | Trace network hops |
      | `curl` or `httpie` | Test APIs |
      | `netstat` / `lsof` | Check open ports |
      | `nmap` | Port scanning |
      | Chrome DevTools → Network tab | Inspect API calls |
      | Wireshark | Deep network packet analysis |
      | Postman | API testing |
      | 🧪 7. Mini Projects / Exercises |
      | ✅ | Task | Learn By |
      | - | ---------------------- | ----------------------------------------- |
- [ ] Setup HTTPS with NGINX | SSL certificate and reverse proxy |
- [ ] Build WebSocket server | Real-time messaging (NestJS + Socket.IO) |
- [ ] DNS + SSL setup | Configure custom domain + HTTPS |
- [ ] Create API with CORS | Enable frontend/backend secure connection |
- [ ] SSH into VPS | Deploy your app to a remote server |
- [ ] Use `curl` for APIs | Test endpoints and headers |

| Security | ⭐⭐ | XSS, CSRF, JWT, Helmet, HTTPS |
| 🧱 1. Core Web Security Concepts |
| ✅ | Topic | Description |
| - | ------------------------------------- | ----------------------------------------------------------------- |

- [ ] **CIA Triad** | Confidentiality, Integrity, Availability — foundation of security |
- [ ] **Authentication vs Authorization** | Who you are vs what you're allowed to do |
- [ ] **Encryption (at rest & in transit)** | Encrypt tokens, passwords, HTTPS communication |
- [ ] **Hashing vs Encryption** | Hash = one-way (e.g., bcrypt), Encrypt = reversible (e.g., AES) |
- [ ] **OWASP Top 10** | List of most critical web security risks (e.g., XSS, SQLi) |
      | 🔐 2. Authentication (Auth) |
      | ✅ | Task | Details |
      | - | ------------------ | ------------------------------------------------------------- |
- [ ] JWT Authentication | Access + Refresh tokens with expiration |
- [ ] Store JWT Securely | In **HttpOnly cookies**, not localStorage |
- [ ] Refresh Token Flow | Re-issue access tokens via secure endpoints |
- [ ] Password Hashing | Use **bcrypt** or **argon2** (never store plaintext) |
- [ ] Rate Limiting | Prevent brute-force login attempts (e.g., Redis + middleware) |
- [ ] 2FA (Optional) | Implement TOTP-based two-factor authentication |
      | 🌐 3. Frontend Security (Next.js / React) |
      | ✅ | Task | Protection |
      | - | ---------------------------------- | ------------------------------------------------- |
- [ ] Sanitize User Input | Prevent script injection via forms |
- [ ] Prevent XSS (Cross-site Scripting) | Escape user input, use libraries like `dompurify` |
- [ ] Use `next/head` securely | Avoid injecting unsafe scripts |
- [ ] Avoid Inline JS/CSS | Use CSP to block inline scripts |
- [ ] Use `Content-Security-Policy` | Define what scripts and styles are allowed |
- [ ] Use HTTPS Everywhere | All frontend connections via `https://` |
      | 🔐 4. Backend Security (Node.js / NestJS / Express) |
      | ✅ | Task | Details |
      | - | ------------------------ | ---------------------------------------------------------------------------- |
- [ ] Helmet.js | Adds secure HTTP headers (`X-Frame-Options`, `X-Content-Type-Options`, etc.) |
- [ ] CORS Settings | Only allow trusted domains (`origin`, `credentials`) |
- [ ] CSRF Protection | Required when using cookies (NestJS has CSRF middleware) |
- [ ] Secure APIs with Guards | Use `@UseGuards(JwtAuthGuard)` in NestJS |
- [ ] Rate Limiting | e.g., `express-rate-limit`, or Redis-backed in NestJS |
- [ ] Input Validation | Use `class-validator` and DTOs to validate all inputs |
- [ ] Escape/validate DB input | Avoid SQL injection with ORM (TypeORM, Prisma) |
      | 🧑‍💻 5. API Security (REST & WebSocket) |
      | ✅ | Task | Protect Against |
      | - | -------------------------- | ------------------------------------------- |
- [ ] Use HTTPS for API | Data confidentiality |
- [ ] Validate all inputs | Avoid injection attacks |
- [ ] Secure WebSocket handshake | Authenticate with token in headers or query |
- [ ] Use DTOs in NestJS | Enforce structure & validation |
- [ ] Limit rate of requests | Prevent DoS via excessive calls |
- [ ] Log suspicious behavior | Detect abuse or exploits |
      | 🧰 6. Secure Deployment Practices |
      | ✅ | Task | Description |
      | - | --------------------- | --------------------------------------------- |
- [ ] Use HTTPS (SSL) | Certbot + NGINX reverse proxy |
- [ ] Environment Variables | Never hardcode secrets; use `.env` |
- [ ] Secret Rotation | Change API keys, tokens periodically |
- [ ] Limit Server Access | Use SSH key auth only (no password login) |
- [ ] Disable root login | Prevent full-access account hacking |
- [ ] Firewall (UFW) | Only allow required ports (80, 443, 22, etc.) |
      | 📦 7. Database Security (PostgreSQL) |
      | ✅ | Task | Why |
      | - | ------------------------- | ------------------------------ |
- [ ] Never expose DB directly | Only access from backend |
- [ ] Use DB roles/permissions | Read/write access separation |
- [ ] Sanitize input | Prevent SQL injection |
- [ ] Keep backup & snapshots | Disaster recovery |
- [ ] Encrypt sensitive columns | If storing PII (emails, names) |
      | 📊 8. Monitoring & Logging |
      | ✅ | Tool | Use |
      | - | ------------------------- | ------------------------------------ |
- [ ] Sentry | Error tracking (frontend/backend) |
- [ ] LogRocket | Frontend session replay |
- [ ] Winston / Pino | Node.js backend logging |
- [ ] UptimeRobot / BetterStack | Uptime monitoring |
- [ ] Fail2Ban | Block brute-force attempts on server |
      | 🧪 9. Practice Projects / Exercises |
      | ✅ | Challenge | Skill Practiced |
      | - | --------------------------- | --------------------------------- |
- [ ] JWT Auth with Refresh Token | Auth system in NestJS |
- [ ] CSRF-Protected Form | With cookies |
- [ ] WebSocket Auth with JWT | Real-time secure chat |
- [ ] Secure Cookie Login | Use `httpOnly`, `SameSite=Strict` |
- [ ] Rate limit login route | Redis-backed limiter |
- [ ] Add CSP + Helmet | Hardening headers in Express/Nest |

| DSA | ⭐⭐⭐ | Arrays, strings, trees, recursion, hashmaps |
| 🧱 1. Basics of DSA |
| ✅ | Topic | What to Know |
| - | ----------------------- | ------------------------------------- |

- [ ] Time & Space Complexity | Big O notation, best/avg/worst cases |
- [ ] Recursion | Base case, call stack, tail recursion |
- [ ] Iteration vs Recursion | Pros and cons |
      | 📦 2. Data Structures |
      | Arrays & Strings |
      | ✅ | Topic | Practice |
      | - | --------------------------------- | -------------------------------- |
- [ ] Basics: traversal, insert, delete | `for`, `splice`, `slice` |
- [ ] Two pointers | Reverse, duplicates, sum pairs |
- [ ] Sliding window | Max subarray, longest substring |
- [ ] Prefix sum | Range sum, balanced strings |
- [ ] String manipulation | Palindromes, rotations, anagrams |
      | 🔹 HashMap / Set |
      | ✅ | Topic | Practice |
      | - | ----------------------- | ------------------------------------------- |
- [ ] Map, Set basics | Count, frequency maps |
- [ ] Hashing tricks | Two-sum, group anagrams, isomorphic strings |
- [ ] HashSet for fast lookup | Remove duplicates, intersection |
      | 🔹 Stack & Queue |
      | ✅ | Topic | Use Case |
      | - | ----- | ---------------------------------------- |
- [ ] Stack | Valid parentheses, min stack |
- [ ] Queue | BFS, sliding window |
- [ ] Deque | Monotonic queue (for sliding window max) |
      | 🔹 Linked List |
      | ✅ | Topic | Problem Types |
      | - | ------------------- | -------------------------- |
- [ ] Singly/Doubly | Traverse, insert, delete |
- [ ] Fast/slow pointers | Detect cycle, middle node |
- [ ] Reverse linked list | Iterative + recursive |
- [ ] Merge two lists | Sorted merge, intersection |
      | 🔹 Trees & Graphs |
      | ✅ | Topic | Key Skills |
      | - | ---------------- | ----------------------------------- |
- [ ] Binary Tree | DFS, BFS, height, invert |
- [ ] BST | Insert, search, delete |
- [ ] Traversals | Pre/In/Post-order |
- [ ] Graphs | Adjacency list, matrix |
- [ ] DFS, BFS | Connected components, shortest path |
- [ ] Topological Sort | Course schedule |
- [ ] Union-Find | Disjoint sets, cycle detection |
      | 🧠 3. Algorithms |
      | 🔹 Sorting & Searching |
      | ✅ | Algorithm | Notes |
      | - | ---------------------------- | ---------------------------- |
- [ ] Bubble, Selection, Insertion | Basics |
- [ ] Merge Sort | Divide & conquer |
- [ ] Quick Sort | Pivot-based partition |
- [ ] Binary Search | Classic and variants |
- [ ] Search in Rotated Array | Tricky binary search variant |
      | 🔹 Recursion & Backtracking |
      | ✅ | Task | Practice |
      | - | -------------------- | ------------------------------ |
- [ ] Backtracking | N-Queens, permutations, sudoku |
- [ ] Subsets/Combinations | DFS with pruning |
- [ ] Memoization | Top-down DP |
      | 🔹 Dynamic Programming (DP) |
      | ✅ | Pattern | Examples |
      | - | ------------------ | ------------------------------ |
- [ ] 1D DP | Fib, climbing stairs |
- [ ] 2D DP | Grid paths, unique ways |
- [ ] Knapsack | 0/1 knapsack, subsets |
- [ ] String DP | LCS, edit distance, palindrome |
- [ ] State Optimization | Space-optimized DP |
      | 🔹 Greedy Algorithms |
      | ✅ | Problem | Idea |
      | - | ------------------- | ------------------------- |
- [ ] Activity selection | Always pick best current |
- [ ] Jump game | Minimum jumps |
- [ ] Gas station | Circular problems |
- [ ] Interval scheduling | Merge intervals, overlaps |
      | 🎯 4. Practice Patterns |
      | ✅ | Pattern | Practice With |
      | - | ------------------ | ------------------------ |
- [ ] Two pointers | Sorted arrays, strings |
- [ ] Sliding window | Substrings, subarrays |
- [ ] Fast/slow pointers | Cycle detection |
- [ ] DFS/BFS | Trees, graphs, recursion |
- [ ] Top-down DP | Recursion + memo |
- [ ] Bottom-up DP | Table building |
- [ ] Backtracking | All paths, permutations |
      | 💻 5. Platforms to Practice |
      | Platform | Use |
      | --------------------- | ---------------------------------------------------------------- |
      | **LeetCode** | Most popular for interview prep |
      | **NeetCode.io** | Best structured roadmap |
      | **HackerRank** | Beginner-friendly |
      | **Codeforces** | Competitive DSA |
      | **Excalidraw** | Visualize trees, recursion |
      | **Big-O Cheat Sheet** | [https://www.bigocheatsheet.com](https://www.bigocheatsheet.com) |
      | 🏁 6. 90-Day Plan (Daily) |
      | Day | Focus |
      | ----- | ---------------------------------------- |
      | 1–30 | Arrays, strings, hash, stack/queue |
      | 31–60 | Linked lists, trees, recursion, graphs |
      | 61–90 | DP, backtracking, greedy, mixed patterns |
      | 📌 Solve 2–3 problems/day, track in Trello/Notion. |

🔨 **Main Project:**  
Build WhatsApp-Style Chat App:

- Auth (JWT + Refresh Token)
- Realtime chat via WebSocket
- Group chat & file upload
- Admin dashboard
- PostgreSQL + Redis
- Full Docker + NGINX + SSL
- CI/CD Pipeline
- Tests: Unit + e2e
- Public GitHub Repo + Docs ✅

---

## 🧠 Phase 3: Job-Readiness & Portfolio (Day 61–90)

| Task            | Goal                           |
| --------------- | ------------------------------ |
| Portfolio Site  | Next.js + Tailwind + Projects  |
| Public Repos    | Well-documented + Readme       |
| Resume          | Highlight projects + stack     |
| Mock Interviews | Practice behavior + tech       |
| GitHub Profile  | Clean, pinned repos            |
| DSA             | Daily 1–2 questions (LeetCode) |

---

## 🔧 Tools

| Tool                | Use                   |
| ------------------- | --------------------- |
| LeetCode / NeetCode | DSA                   |
| DevDocs.io          | Fast docs             |
| Swagger Editor      | API Docs              |
| Docker Playground   | Docker practice       |
| GitHub Projects     | Progress tracking     |
| Roadmap.sh          | Topic guidance        |
| ChatGPT             | Fast debugging + tips |

---

## 💡 Final Tips

- Focus on depth over breadth.
- Build real projects, not tutorials.
- Push everything to GitHub.
- Document your code and systems.
- Apply for jobs after Project 2 is done 💼

---

🧭 Need Trello/Notion version or daily checklist? Ask boss. I’ve got your back 💪
