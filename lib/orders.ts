export interface Order {
  id?: string;
  customerName: string;
  customerPhone: string;
  productId: string;
  productName: string;
  color: string;
  amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  whatsappNumber: string;
  createdAt: Date;
}

export async function createOrder(order: Omit<Order, "id" | "createdAt">): Promise<string> {
  if (typeof window === "undefined") return "";
  const { db } = await import("./firebase");
  const { collection, addDoc, serverTimestamp } = await import("firebase/firestore");
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrders(): Promise<Order[]> {
  if (typeof window === "undefined") return [];
  const { db } = await import("./firebase");
  const { collection, getDocs, orderBy, query } = await import("firebase/firestore");
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  if (typeof window === "undefined") return;
  const { db } = await import("./firebase");
  const { doc, updateDoc } = await import("firebase/firestore");
  await updateDoc(doc(db, "orders", id), { status });
}
