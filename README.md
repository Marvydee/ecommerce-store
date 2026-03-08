# E-commerce Store

| Feature       | Detail                                                  |
| ------------- | ------------------------------------------------------- |
| Product data  | Fake Store API (fakestoreapi.com)                       |
| Filtering     | Dynamic — categories pulled from the API, not hardcoded |
| Cart          | Add, remove, quantity controls, running total           |
| Wishlist      | Toggle per product, stored in a Set for O(1) lookup     |
| Loading state | Skeleton loaders, not a spinner                         |

The part I'm most proud of is the cart logic. Adding the same product
twice increases the quantity instead of creating a duplicate. Took a
bit of thinking to get right with the prev state pattern.

---

    npm install
    npm start

No API key needed. Stack: React · CSS
Live → https://ecomstore.pages.dev/
