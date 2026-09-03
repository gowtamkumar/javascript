// | বিষয়                           | Regular Function       | Arrow Function      |
// | ------------------------------ | ---------------------- | ------------------- |
// | নিজের `this`                   | ✅ আছে                  | ❌ নেই               |
// | `this` কীভাবে আসে              | Call-এর ওপর নির্ভর করে | Outer scope থেকে    |
// | `call()` দিয়ে `this` পরিবর্তন  | ✅                      | ❌                   |
// | `apply()` দিয়ে `this` পরিবর্তন | ✅                      | ❌                   |
// | `bind()` দিয়ে `this` bind      | ✅                      | ❌                   |
// | Object method                  | সাধারণত ভালো           | `this` দরকার হলে নয় |
// | Callback                       | ব্যবহার করা যায়        | অনেক সময় convenient |
// | Constructor হিসেবে `new`       | ✅                      | ❌                   |
