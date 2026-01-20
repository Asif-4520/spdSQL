export type DemoTableData = {
    schema: {
        columns: { name: string; type: string }[];
    };
    data: Record<string, any>[];
};

export type TableInfo = {
    id: string;
    displayName: string;
    icon: string;
    category: string;
    description: string;
    rowCount: number;
};

export const CSV_BASE_URL = import.meta.env.PROD
    ? "https://spdsql.vercel.app/demo-data"
    : "/demo-data";

export const TABLE_CATEGORIES = [
    { id: "ecommerce", name: "E-commerce", icon: "🛒" },
    { id: "users", name: "Users & Social", icon: "👥" },
    { id: "content", name: "Content & Media", icon: "📰" },
];

export const DEMO_TABLES: TableInfo[] = [
    {
        id: "users",
        displayName: "Users",
        icon: "👤",
        category: "users",
        description:
            "User profiles with social and e-commerce data (50 records).",
        rowCount: 50,
    },
    {
        id: "products",
        displayName: "Products",
        icon: "📦",
        category: "ecommerce",
        description:
            "Product catalog with categories, prices, and inventory (50 records).",
        rowCount: 50,
    },
    {
        id: "orders",
        displayName: "Orders",
        icon: "🛍️",
        category: "ecommerce",
        description: "Order transactions with user references (55 records).",
        rowCount: 55,
    },
    {
        id: "order_items",
        displayName: "Order Items",
        icon: "📋",
        category: "ecommerce",
        description: "Individual items within each order (97 records).",
        rowCount: 97,
    },
    {
        id: "reviews",
        displayName: "Reviews",
        icon: "⭐",
        category: "ecommerce",
        description: "Product reviews and ratings by users (55 records).",
        rowCount: 55,
    },
    {
        id: "posts",
        displayName: "Posts",
        icon: "📝",
        category: "content",
        description: "User-generated posts and articles (55 records).",
        rowCount: 55,
    },
    {
        id: "comments",
        displayName: "Comments",
        icon: "💬",
        category: "content",
        description: "Comments on posts (55 records).",
        rowCount: 55,
    },
    {
        id: "categories",
        displayName: "Categories",
        icon: "🏷️",
        category: "content",
        description: "Product and content categories (20 records).",
        rowCount: 20,
    },
];

export const TABLE_PRESETS = {
    all: {
        id: "all",
        name: "All Tables",
        icon: "📚",
        description: "Import all demo tables",
        tables: DEMO_TABLES.map((t) => t.id),
    },
};

export const getTablesWithDependencies = (tableIds: string[]): string[] => {
    const ordered: string[] = [];
    const add = (id: string) => {
        if (!ordered.includes(id)) {
            ordered.push(id);
        }
    };

    const dependencies: Record<string, string[]> = {
        orders: ["users", "products"],
        order_items: ["orders", "products"],
        reviews: ["products", "users"],
        comments: ["posts", "users"],
        posts: ["users", "categories"],
    };

    for (const id of tableIds) {
        if (dependencies[id]) {
            for (const dep of dependencies[id]) {
                add(dep);
            }
        }
        add(id);
    }

    return ordered;
};

export const getTableInfo = (tableId: string): TableInfo | undefined => {
    return DEMO_TABLES.find((t) => t.id === tableId);
};

export const getTablesByCategory = (categoryId: string): TableInfo[] => {
    return DEMO_TABLES.filter((t) => t.category === categoryId);
};

export const fetchTableCSV = async (tableId: string): Promise<string> => {
    const url = `${CSV_BASE_URL}/${tableId}.csv`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to load ${tableId}.csv: ${response.statusText}`
        );
    }

    return response.text();
};

const DEMO_DATA_SCHEMAS: Record<
    string,
    { columns: { name: string; type: string }[] }
> = {
    users: {
        columns: [
            { name: "user_id", type: "INTEGER PRIMARY KEY" },
            { name: "username", type: "VARCHAR" },
            { name: "email", type: "VARCHAR" },
            { name: "bio", type: "TEXT" },
            { name: "followers_count", type: "INTEGER" },
            { name: "following_count", type: "INTEGER" },
            { name: "verified", type: "BOOLEAN" },
            { name: "created_at", type: "TIMESTAMP" },
            { name: "city", type: "VARCHAR" },
            { name: "country", type: "VARCHAR" },
            { name: "membership_level", type: "VARCHAR" },
            { name: "joined_at", type: "DATE" },
        ],
    },
    products: {
        columns: [
            { name: "product_id", type: "INTEGER PRIMARY KEY" },
            { name: "name", type: "VARCHAR" },
            { name: "category_id", type: "INTEGER" },
            { name: "category_name", type: "VARCHAR" },
            { name: "price", type: "DECIMAL(10,2)" },
            { name: "stock", type: "INTEGER" },
            { name: "rating", type: "DECIMAL(3,1)" },
            { name: "created_at", type: "TIMESTAMP" },
        ],
    },
    orders: {
        columns: [
            { name: "order_id", type: "INTEGER PRIMARY KEY" },
            { name: "user_id", type: "INTEGER" },
            { name: "total_amount", type: "DECIMAL(10,2)" },
            { name: "status", type: "VARCHAR" },
            { name: "shipping_fee", type: "DECIMAL(10,2)" },
            { name: "tax", type: "DECIMAL(10,2)" },
            { name: "order_date", type: "TIMESTAMP" },
        ],
    },
    order_items: {
        columns: [
            { name: "order_item_id", type: "INTEGER PRIMARY KEY" },
            { name: "order_id", type: "INTEGER" },
            { name: "product_id", type: "INTEGER" },
            { name: "quantity", type: "INTEGER" },
            { name: "unit_price", type: "DECIMAL(10,2)" },
            { name: "discount", type: "DECIMAL(10,2)" },
        ],
    },
    reviews: {
        columns: [
            { name: "review_id", type: "INTEGER PRIMARY KEY" },
            { name: "product_id", type: "INTEGER" },
            { name: "user_id", type: "INTEGER" },
            { name: "rating", type: "INTEGER" },
            { name: "title", type: "VARCHAR" },
            { name: "comment", type: "TEXT" },
            { name: "helpful_count", type: "INTEGER" },
            { name: "verified_purchase", type: "BOOLEAN" },
            { name: "created_at", type: "DATE" },
        ],
    },
    posts: {
        columns: [
            { name: "post_id", type: "INTEGER PRIMARY KEY" },
            { name: "user_id", type: "INTEGER" },
            { name: "category_id", type: "INTEGER" },
            { name: "title", type: "VARCHAR" },
            { name: "content", type: "TEXT" },
            { name: "likes_count", type: "INTEGER" },
            { name: "shares_count", type: "INTEGER" },
            { name: "views_count", type: "INTEGER" },
            { name: "published_at", type: "TIMESTAMP" },
        ],
    },
    comments: {
        columns: [
            { name: "comment_id", type: "INTEGER PRIMARY KEY" },
            { name: "post_id", type: "INTEGER" },
            { name: "user_id", type: "INTEGER" },
            { name: "parent_comment_id", type: "INTEGER" },
            { name: "content", type: "TEXT" },
            { name: "likes_count", type: "INTEGER" },
            { name: "created_at", type: "TIMESTAMP" },
        ],
    },
    categories: {
        columns: [
            { name: "category_id", type: "INTEGER PRIMARY KEY" },
            { name: "name", type: "VARCHAR" },
            { name: "parent_id", type: "INTEGER" },
            { name: "description", type: "TEXT" },
            { name: "item_count", type: "INTEGER" },
        ],
    },
};

export const getTableSchema = (tableId: string) => {
    return DEMO_DATA_SCHEMAS[tableId] || null;
};
