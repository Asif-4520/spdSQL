// Demo data index with metadata and lazy loading
import type { DemoTableData } from './demo-data';

export interface TableInfo {
    id: string;
    name: string;
    displayName: string;
    description: string;
    category: string;
    rowCount: number;
    columns: string[];
    dependencies: string[];
    icon: string;
}

// Table metadata for UI
export const DEMO_TABLES: TableInfo[] = [
    {
        id: 'users',
        name: 'users',
        displayName: 'Users',
        description: 'User accounts with contact information',
        category: 'Core',
        rowCount: 40,
        columns: ['id', 'name', 'age', 'city', 'email', 'phone'],
        dependencies: [],
        icon: '👤',
    },
    {
        id: 'products',
        name: 'products',
        displayName: 'Products',
        description: 'Product catalog with pricing and inventory',
        category: 'E-Commerce',
        rowCount: 30,
        columns: ['id', 'name', 'category', 'price', 'stock', 'brand'],
        dependencies: [],
        icon: '📦',
    },
    {
        id: 'orders',
        name: 'orders',
        displayName: 'Orders',
        description: 'Customer orders with status tracking',
        category: 'E-Commerce',
        rowCount: 40,
        columns: [
            'id',
            'user_id',
            'product_id',
            'quantity',
            'order_date',
            'status',
            'total_amount',
        ],
        dependencies: ['users', 'products'],
        icon: '🛒',
    },
    {
        id: 'employees',
        name: 'employees',
        displayName: 'Employees',
        description: 'Employee records with department and salary',
        category: 'HR',
        rowCount: 25,
        columns: [
            'id',
            'first_name',
            'last_name',
            'department',
            'salary',
            'hire_date',
            'is_active',
            'manager_id',
        ],
        dependencies: [],
        icon: '👔',
    },
    {
        id: 'categories',
        name: 'categories',
        displayName: 'Categories',
        description: 'Product categories hierarchy',
        category: 'E-Commerce',
        rowCount: 20,
        columns: ['id', 'name', 'description', 'parent_id', 'is_active'],
        dependencies: [],
        icon: '📁',
    },
    {
        id: 'countries',
        name: 'countries',
        displayName: 'Countries',
        description: 'World countries with population data',
        category: 'Reference',
        rowCount: 20,
        columns: [
            'id',
            'name',
            'code',
            'continent',
            'population',
            'capital',
            'currency',
        ],
        dependencies: [],
        icon: '🌍',
    },
    {
        id: 'departments',
        name: 'departments',
        displayName: 'Departments',
        description: 'Company departments with budgets',
        category: 'HR',
        rowCount: 12,
        columns: ['id', 'name', 'location', 'budget', 'employee_count'],
        dependencies: [],
        icon: '🏢',
    },
    {
        id: 'reviews',
        name: 'reviews',
        displayName: 'Reviews',
        description: 'Product reviews and ratings',
        category: 'E-Commerce',
        rowCount: 20,
        columns: [
            'id',
            'product_id',
            'user_id',
            'rating',
            'title',
            'comment',
            'review_date',
        ],
        dependencies: ['users', 'products'],
        icon: '⭐',
    },
    {
        id: 'payments',
        name: 'payments',
        displayName: 'Payments',
        description: 'Payment transactions for orders',
        category: 'Finance',
        rowCount: 20,
        columns: [
            'id',
            'order_id',
            'amount',
            'payment_method',
            'payment_status',
            'transaction_id',
            'payment_date',
        ],
        dependencies: ['orders'],
        icon: '💳',
    },
];

// Categories for grouping tables
export const TABLE_CATEGORIES = [
    {
        id: 'Core',
        name: 'Core Tables',
        description: 'Essential base tables',
        icon: '⚡',
    },
    {
        id: 'E-Commerce',
        name: 'E-Commerce',
        description: 'Online store tables',
        icon: '🛍️',
    },
    {
        id: 'HR',
        name: 'Human Resources',
        description: 'HR management tables',
        icon: '👥',
    },
    {
        id: 'Finance',
        name: 'Finance',
        description: 'Financial data tables',
        icon: '💰',
    },
    {
        id: 'Reference',
        name: 'Reference Data',
        description: 'Lookup and reference tables',
        icon: '📚',
    },
];

// Presets for quick selection
export const TABLE_PRESETS = {
    minimal: {
        id: 'minimal',
        name: 'Minimal',
        description: 'Basic tables for simple queries',
        tables: ['users', 'products'],
        icon: '🎯',
    },
    ecommerce: {
        id: 'ecommerce',
        name: 'E-Commerce',
        description: 'Complete online store dataset',
        tables: [
            'users',
            'products',
            'categories',
            'orders',
            'reviews',
            'payments',
        ],
        icon: '🛒',
    },
    hr: {
        id: 'hr',
        name: 'HR Management',
        description: 'Human resources tables',
        tables: ['employees', 'departments'],
        icon: '👔',
    },
    analytics: {
        id: 'analytics',
        name: 'Analytics',
        description: 'Tables for data analysis practice',
        tables: ['users', 'products', 'orders', 'countries', 'payments'],
        icon: '📊',
    },
    all: {
        id: 'all',
        name: 'All Tables',
        description: 'Load all available demo tables',
        tables: DEMO_TABLES.map((t) => t.id),
        icon: '📚',
    },
};

// Get table data by ID
export async function getTableData(
    tableId: string
): Promise<DemoTableData | null> {
    const {
        usersData,
        productsData,
        ordersData,
        employeesData,
        categoriesData,
        countriesData,
        departmentsData,
        reviewsData,
        paymentsData,
    } = await import('./demo-data');

    const dataMap: Record<string, DemoTableData> = {
        users: usersData,
        products: productsData,
        orders: ordersData,
        employees: employeesData,
        categories: categoriesData,
        countries: countriesData,
        departments: departmentsData,
        reviews: reviewsData,
        payments: paymentsData,
    };

    return dataMap[tableId] || null;
}

// Resolve dependencies for a list of tables
export function getTablesWithDependencies(tableIds: string[]): string[] {
    const result = new Set<string>();
    const toProcess = [...tableIds];

    while (toProcess.length > 0) {
        const tableId = toProcess.pop()!;
        if (result.has(tableId)) continue;

        const tableInfo = DEMO_TABLES.find((t) => t.id === tableId);
        if (!tableInfo) continue;

        // Add dependencies first
        for (const dep of tableInfo.dependencies) {
            if (!result.has(dep)) {
                toProcess.push(dep);
            }
        }
        result.add(tableId);
    }

    // Return in dependency order
    return DEMO_TABLES.filter((t) => result.has(t.id)).map((t) => t.id);
}

// Get table info by ID
export function getTableInfo(tableId: string): TableInfo | undefined {
    return DEMO_TABLES.find((t) => t.id === tableId);
}

// Get tables by category
export function getTablesByCategory(categoryId: string): TableInfo[] {
    return DEMO_TABLES.filter((t) => t.category === categoryId);
}
