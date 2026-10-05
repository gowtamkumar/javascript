import { EventEmitter } from "node:events";

// ২. EventEmitter ক্লাস এক্সটেন্ড করে কাস্টম সার্ভিস তৈরি
class OrderProcessingSystem extends EventEmitter {
  constructor() {
    super();
    // প্রয়োজনবোধে লিসেনারের সংখ্যা বাড়ানো (ডিফল্ট সীমা ১০টি)
    this.setMaxListeners(15);
  }

  async processOrder(order) {
    console.log(`\n--- [Order ${order.orderId}] প্রসেসিং শুরু হয়েছে ---`);

    try {
      // বিজনেস ভ্যালিডেশন
      if (order.amount <= 0) {
        throw new Error(`ইনভ্যালিড অর্ডার অ্যামাউন্ট: $${order.amount}`);
      }

      // অর্ডার ডাটাবেসে সেভ হওয়ার পর ইভেন্ট ফায়ার (Emit) করা
      console.log(`[Database]: অর্ডার ${order.orderId} সফলভাবে সেভ হয়েছে।`);
      this.emit("order:created", order);
    } catch (err) {
      // কোনো সমস্যা হলে স্পেশাল 'error' ইভেন্ট ট্রিগার করা
      this.emit("error", err);
    }
  }
}

// ৩. ইনস্ট্যান্স তৈরি
const orderService = new OrderProcessingSystem();

// ==========================================
// ৪. বিভিন্ন লিসেনার রেজিস্টার করা (Subscribers)
// ==========================================

// ক. .on() — প্রতিটি অর্ডারের সাথে বারবার এক্সিকিউট হবে
orderService.on("order:created", (data) => {
  console.log(
    `[Email Service]: "${data.customerEmail}"-এ কনফার্মেশন ইমেইল পাঠানো হয়েছে।`,
  );
});

orderService.on("order:created", (data) => {
  console.log(
    `[Inventory Service]: স্টক থেকে ${data.itemCount}টি আইটেম কমানো হয়েছে।`,
  );
});

// খ. .once() — এটি শুধুমাত্র প্রথম অর্ডারের জন্য একবারই চলবে
orderService.once("order:created", (data) => {
  console.log(
    `[Admin Alert]: আজকের দিনের প্রথম অর্ডারের সূচনা হয়েছে! (Order ID: ${data.orderId})`,
  );
});

// গ. .prependListener() — সাধারণ লিসেনারদের আগেই এটিকে অগ্রাধিকার দিয়ে চালানো
orderService.prependListener("order:created", (data) => {
  console.log(
    `[Audit Logger - High Priority]: ট্রানজ্যাকশন আইডি ${data.orderId} সিকিউরিটি লগে লিপিবদ্ধ করা হলো।`,
  );
});

// ঘ. .on('error', ...) — এরর হ্যান্ডলার (সার্ভার ক্র্যাশ রোধে এটি আবশ্যক)
orderService.on("error", (err) => {
  console.error(
    `[Handled Error Safely]: সিস্টেমে ত্রুটি ধরা পড়েছে -> ${err.message}`,
  );
});

// ==========================================
// ৫. এক্সিকিউশন ও টেস্ট রান
// ==========================================

async function runDemo() {
  // প্রথম অর্ডার (এখানে .once() লিসেনারটি রান হবে)
  await orderService.processOrder({
    orderId: "ORD-101",
    customerEmail: "gowtam@example.com",
    amount: 1200,
    itemCount: 2,
  });

  // দ্বিতীয় অর্ডার (এখানে .once() লিসেনারটি আর চলবে না, কারণ সেটি মেমরি থেকে মুছে গেছে)
  await orderService.processOrder({
    orderId: "ORD-102",
    customerEmail: "rahim@example.com",
    amount: 450,
    itemCount: 1,
  });

  // তৃতীয় অর্ডার: ইনভ্যালিড ডেটা (এটি 'error' ইভেন্ট ট্রিগার করবে)
  await orderService.processOrder({
    orderId: "ORD-103",
    customerEmail: "bad_order@example.com",
    amount: -50,
    itemCount: 1,
  });
}

runDemo();
