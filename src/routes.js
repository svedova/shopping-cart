import ListView from "@/views/List";
import CheckoutView from "@/views/Checkout";
import PaymentView from "@/views/Payment";

const exact = true;

export default [
  { path: "/", component: ListView, exact },
  { path: "/checkout", component: CheckoutView, exact },
  { path: "/payment", component: PaymentView, exact },
  { path: "*", render: () => "Not found" }
];
