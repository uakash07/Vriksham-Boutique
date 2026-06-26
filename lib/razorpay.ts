declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => void;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open(): void;
}

export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiateRazorpayCheckout(options: {
  amount: number;
  productName: string;
  customerName?: string;
  customerPhone?: string;
  onSuccess: (paymentId: string, orderId: string) => void;
  onDismiss?: () => void;
}): Promise<void> {
  const loaded = await loadRazorpay();
  if (!loaded) {
    alert("Razorpay failed to load. Please check your connection.");
    return;
  }

  const res = await fetch("/api/razorpay", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: options.amount, productName: options.productName }),
  });

  const { orderId } = await res.json();

  const rzp = new window.Razorpay({
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: options.amount * 100,
    currency: "INR",
    name: "Vriksham Boutique",
    description: options.productName,
    order_id: orderId,
    handler: (response) => {
      options.onSuccess(response.razorpay_payment_id, response.razorpay_order_id);
    },
    prefill: {
      name: options.customerName,
      contact: options.customerPhone,
    },
    theme: { color: "#C4922A" },
    modal: { ondismiss: options.onDismiss },
  });

  rzp.open();
}
