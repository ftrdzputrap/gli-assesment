<script setup>
import ProtectLayout from '@/layouts/Protect/ProtectLayout.vue';
import Table from '@/components/Table/index.vue';

import Card from './components/Card.vue';

const data = [
  {
    id: 1,
    product_name: 'iPhone 13 Pro',
    category: 'Electronics',
    price: 999.99,
    stock: 45,
    status: 'Active',
    sku: 'IP13P-256',
    last_updated: '2024-03-15'
  },
  {
    id: 2,
    product_name: 'MacBook Pro M1',
    category: 'Electronics',
    price: 1299.99,
    stock: 23,
    status: 'Active',
    sku: 'MBP-M1-512',
    last_updated: '2024-03-14'
  },
  {
    id: 3,
    product_name: 'AirPods Pro',
    category: 'Electronics',
    price: 249.99,
    stock: 0,
    status: 'Out of Stock',
    sku: 'APP-2022',
    last_updated: '2024-03-13'
  },
  {
    id: 4,
    product_name: 'Nike Air Max',
    category: 'Footwear',
    price: 129.99,
    stock: 78,
    status: 'Active',
    sku: 'NK-AM-2024',
    last_updated: '2024-03-12'
  },
  {
    id: 5,
    product_name: 'Samsung Galaxy S21',
    category: 'Electronics',
    price: 799.99,
    stock: 15,
    status: 'Low Stock',
    sku: 'SGS21-128',
    last_updated: '2024-03-11'
  }
];

const getStatusClass = (status) => {
  const statusClasses = {
    'Active': 'bg-green-100 text-green-800',
    'Out of Stock': 'bg-red-100 text-red-800',
    'Low Stock': 'bg-yellow-100 text-yellow-800'
  };
  return statusClasses[status] || 'bg-gray-100 text-gray-800';
};

const table_columns = [
  {
    id: "product_name",
    title: "Product",
    render: (value, row) => value
  },
  {
    id: "category",
    title: "Category",
    render: (value, row) => value
  },
  {
    id: "price",
    title: "Price",
    render: (value, row) => value
  },
  {
    id: "stock",
    title: "Stock",
    render: (value, row) => value
  },
  {
    id: "last_updated",
    title: "Last Updated",
    render: (value, row) => value
  },
];
</script>

<template>
  <ProtectLayout>
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card name="Total Products" value="1000" />
      <Card name="Total Products" value="1000" />
      <Card name="Total Products" value="1000" />
    </div>

    <!-- <div class="mt-8">
      <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
      <Table :rows="data" :headers="table_columns" />
    </div> -->
  </ProtectLayout>
</template>
