import getProductData from './api/getProductData.js';
import ProductList from './components/ProductList.js';
import CartList from './components/CartList.js';

const $productListGrid = document.getElementById('product-card-grid');
const $openCartBtn = document.getElementById('open-cart-btn');
const $closeCartBtn = document.getElementById('close-cart-btn');
const $shoppingCart = document.getElementById('shopping-cart');
const $backdrop = document.getElementById('backdrop');
const $cartList = document.getElementById('cart-list');
const $paymentBtn = document.getElementById('payment-btn');

// 제품 데이터 선언
let productData = [];

const initialCartState = localStorage.getItem('cartState')
  ? JSON.parse(localStorage.getItem('cartState'))
  : [];

// 제품 리스트 인스턴스화
const productList = new ProductList($productListGrid, []);
// 카트 리스트 인스턴스
const cartList = new CartList($cartList, initialCartState);

// 장바구니 토글 기능
const openCloseCart = () => {
  $shoppingCart.classList.toggle('translate-x-0');
  $shoppingCart.classList.toggle('translate-x-full');
  // 백드롭 토글 기능
  $backdrop.hidden = !$backdrop.hidden;
};

// API 호출
const fetchProductData = async () => {
  const result = await getProductData(); //호출 함수 실행
  productList.setState(result); // 제품리스트 상태에 추가
  productData = result;
};

// 장바구니에 상품 추가
const addCartItem = (e) => {
  //클릭한 상품
  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  );
  // 캡쳐링으로 인한 클릭 방어
  if (!clickedProduct) return;

  // 장바구니에 추가
  cartList.addCartItem(clickedProduct);

  // 장바구니 열기
  openCloseCart();
};

const modifyCartItem = (e) => {
  const currentProductId = parseInt(e.target.closest('li').id);
  switch (e.target.className) {
    case 'increase-btn':
      cartList.increaseCartItem(currentProductId);
      break;
    case 'decrease-btn':
      cartList.decreaseCartItem(currentProductId);
      break;
    case 'remove-btn':
      cartList.removeCartItem(currentProductId);
      break;
    default:
      return;
  }
};

const saveToLocalStorage = () => {
  cartList.saveToLocalStorage();
};

fetchProductData();

$openCartBtn.addEventListener('click', openCloseCart);
$closeCartBtn.addEventListener('click', openCloseCart);
$backdrop.addEventListener('click', openCloseCart);
$productListGrid.addEventListener('click', addCartItem);
$cartList.addEventListener('click', modifyCartItem);
$paymentBtn.addEventListener('click', saveToLocalStorage);
