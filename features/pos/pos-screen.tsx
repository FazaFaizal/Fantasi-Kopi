import { AppCard } from "@/components/ui/app-card";
import { Colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  code: string;
};

type CartItem = {
  productId: string;
  quantity: number;
};

const categories = ["Semua", "Kopi", "Non Kopi", "Makanan", "Dessert"];

const products: Product[] = [
  {
    id: "p-001",
    name: "Es Kopi Susu",
    category: "Kopi",
    price: 28000,
    stock: 32,
    code: "KOP-01",
  },
  {
    id: "p-002",
    name: "Americano",
    category: "Kopi",
    price: 24000,
    stock: 25,
    code: "KOP-02",
  },
  {
    id: "p-003",
    name: "Cappuccino",
    category: "Kopi",
    price: 32000,
    stock: 18,
    code: "KOP-03",
  },
  {
    id: "p-004",
    name: "Matcha Latte",
    category: "Non Kopi",
    price: 34000,
    stock: 20,
    code: "NKO-01",
  },
  {
    id: "p-005",
    name: "Lemon Tea",
    category: "Non Kopi",
    price: 22000,
    stock: 30,
    code: "NKO-02",
  },
  {
    id: "p-006",
    name: "Croissant",
    category: "Makanan",
    price: 26000,
    stock: 14,
    code: "MAK-01",
  },
  {
    id: "p-007",
    name: "Chicken Toast",
    category: "Makanan",
    price: 38000,
    stock: 10,
    code: "MAK-02",
  },
  {
    id: "p-008",
    name: "Brownies",
    category: "Dessert",
    price: 25000,
    stock: 16,
    code: "DES-01",
  },
];

const initialCart: CartItem[] = [
  { productId: "p-001", quantity: 2 },
  { productId: "p-006", quantity: 1 },
];

function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export default function PosScreen() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "Semua" || product.category === activeCategory;
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.code.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const cartDetails = useMemo(() => {
    return cart
      .map((item) => {
        const product = products.find((candidate) => candidate.id === item.productId);

        if (!product) {
          return null;
        }

        return {
          ...item,
          product,
          total: product.price * item.quantity,
        };
      })
      .filter((item): item is CartItem & { product: Product; total: number } =>
        Boolean(item),
      );
  }, [cart]);

  const subtotal = cartDetails.reduce((sum, item) => sum + item.total, 0);
  const service = subtotal > 0 ? 3000 : 0;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + service + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  function addToCart(productId: string) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentCart, { productId, quantity: 1 }];
    });
  }

  function decreaseFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function checkout() {
    Alert.alert("Transaksi dummy", `Total pembayaran ${formatCurrency(total)}`);
  }

  return (
    <View className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-14 pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-text">POS</Text>
            <Text className="text-gray-500 mt-1">Order #MGN-2408 - Meja 03</Text>
          </View>

          <View className="bg-surface border border-gray-100 rounded-2xl px-4 py-3 items-end">
            <Text className="text-xs text-gray-500">Kasir</Text>
            <Text className="text-text font-semibold mt-1">Bayu</Text>
          </View>
        </View>

        <View className="bg-surface rounded-2xl px-4 py-3 mt-6 border border-gray-100 flex-row items-center">
          <Ionicons name="search" size={20} color={Colors.muted} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Cari menu atau kode"
            placeholderTextColor={Colors.muted}
            className="flex-1 ml-3 text-text"
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch("")} activeOpacity={0.8}>
              <Ionicons name="close-circle" size={20} color={Colors.muted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-5"
          contentContainerClassName="gap-2 pr-5"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveCategory(category)}
                activeOpacity={0.85}
                className={`px-4 py-3 rounded-2xl border ${
                  isActive ? "bg-primary border-primary" : "bg-surface border-gray-100"
                }`}
              >
                <Text
                  className={`font-semibold ${
                    isActive ? "text-white" : "text-text"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View className="mt-6 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-text">Menu</Text>
          <Text className="text-gray-500">{filteredProducts.length} item</Text>
        </View>

        <View className="mt-4 gap-3">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.productId === product.id);

            return (
              <AppCard key={product.id}>
                <View className="flex-row items-center">
                  <View className="h-14 w-14 rounded-2xl bg-background items-center justify-center mr-4">
                    <Ionicons
                      name={
                        product.category === "Makanan" ||
                        product.category === "Dessert"
                          ? "restaurant"
                          : "cafe"
                      }
                      size={24}
                      color={Colors.primary}
                    />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row items-center">
                      <Text className="text-text font-bold flex-1">
                        {product.name}
                      </Text>
                      <Text className="text-primary font-bold">
                        {formatCurrency(product.price)}
                      </Text>
                    </View>

                    <View className="flex-row items-center mt-2">
                      <Text className="text-gray-500 text-xs">{product.code}</Text>
                      <View className="h-1 w-1 rounded-full bg-gray-300 mx-2" />
                      <Text className="text-gray-500 text-xs">
                        Stok {product.stock}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row items-center justify-between mt-4">
                  <Text className="text-gray-500 text-sm">{product.category}</Text>

                  {cartItem ? (
                    <View className="flex-row items-center">
                      <TouchableOpacity
                        onPress={() => decreaseFromCart(product.id)}
                        activeOpacity={0.85}
                        className="h-9 w-9 rounded-full bg-gray-100 items-center justify-center"
                      >
                        <Ionicons name="remove" size={18} color={Colors.text} />
                      </TouchableOpacity>

                      <Text className="w-10 text-center text-text font-bold">
                        {cartItem.quantity}
                      </Text>

                      <TouchableOpacity
                        onPress={() => addToCart(product.id)}
                        activeOpacity={0.85}
                        className="h-9 w-9 rounded-full bg-primary items-center justify-center"
                      >
                        <Ionicons name="add" size={18} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => addToCart(product.id)}
                      activeOpacity={0.85}
                      className="h-10 px-4 rounded-full bg-primary flex-row items-center"
                    >
                      <Ionicons name="add" size={18} color="#FFFFFF" />
                      <Text className="text-white font-semibold ml-1">Tambah</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </AppCard>
            );
          })}
        </View>

        <View className="mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-lg font-bold text-text">Keranjang</Text>
            <Text className="text-gray-500">{totalItems} item</Text>
          </View>

          <View className="gap-3">
            {cartDetails.map((item) => (
              <AppCard key={item.productId}>
                <View className="flex-row items-center justify-between">
                  <View className="flex-1 pr-3">
                    <Text className="text-text font-semibold">
                      {item.product.name}
                    </Text>
                    <Text className="text-gray-500 text-sm mt-1">
                      {item.quantity} x {formatCurrency(item.product.price)}
                    </Text>
                  </View>

                  <Text className="text-text font-bold">
                    {formatCurrency(item.total)}
                  </Text>
                </View>
              </AppCard>
            ))}

            {!cartDetails.length ? (
              <AppCard>
                <View className="items-center py-6">
                  <Ionicons name="cart-outline" size={32} color={Colors.muted} />
                  <Text className="text-gray-500 mt-3">Keranjang kosong</Text>
                </View>
              </AppCard>
            ) : null}
          </View>
        </View>

        <AppCard>
          <View className="gap-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Subtotal</Text>
              <Text className="text-text font-semibold">
                {formatCurrency(subtotal)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Service</Text>
              <Text className="text-text font-semibold">
                {formatCurrency(service)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Pajak 10%</Text>
              <Text className="text-text font-semibold">{formatCurrency(tax)}</Text>
            </View>
            <View className="h-px bg-gray-100" />
            <View className="flex-row justify-between items-center">
              <Text className="text-text font-bold text-lg">Total</Text>
              <Text className="text-primary font-bold text-xl">
                {formatCurrency(total)}
              </Text>
            </View>
          </View>
        </AppCard>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-white px-5 pt-4 pb-6 border-t border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-500 text-xs">Total Bayar</Text>
            <Text className="text-text text-xl font-bold mt-1">
              {formatCurrency(total)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={checkout}
            disabled={!cartDetails.length}
            activeOpacity={0.85}
            className={`rounded-2xl px-6 py-4 flex-row items-center ${
              cartDetails.length ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <Ionicons name="card" size={20} color="#FFFFFF" />
            <Text className="text-white font-bold ml-2">Bayar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
